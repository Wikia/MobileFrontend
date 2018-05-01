( function ( M ) {
	var util = M.require( 'mobile.startup/util' );

	/**
	 * API for managing clickable watchstar
	 *
	 * @class WatchstarGateway
	 *
	 * @constructor
	 * @param {mw.Api} api
	 */
	function WatchstarGateway( api ) {
		this.api = api;
	}

	WatchstarGateway.prototype = {
		_cache: {},

		/**
		 * Cache API response
		 * @method
		 * @private
		 * @param {Object} resp Response from the server
		 */
		_loadIntoCache: function ( resp ) {
			var cache = this._cache;
			if ( resp.query && resp.query.pages ) {
				resp.query.pages.forEach( function ( page ) {
					cache[ page.pageid ] = page.watched;
				} );
			}
		},
		/**
		 * Loads the watch status for a given list of page ids in bulk
		 * @method
		 * @param {Array} ids A list of page ids
		 * @param {boolean} markAsAllWatched When true will assume all given ids are watched without a lookup.
		 * @return {jQuery.Deferred}
		 */
		loadWatchStatus: function ( ids, markAsAllWatched ) {
			var self = this;

			if ( markAsAllWatched ) {
				ids.forEach( function ( id ) {
					self._cache[ id ] = true;
				} );
				return util.Deferred().resolve();
			}
			return this.api.get( {
				formatversion: 2,
				action: 'query',
				prop: 'info',
				inprop: 'watched',
				pageids: ids
			} ).then( function ( resp ) {
				self._loadIntoCache( resp );
			} );
		},

		/**
		 * Marks whether a given page is watched or not to avoid an API call
		 * @method
		 * @param {Page} page Page view object
		 * @param {boolean} isWatched True if page is watched
		 */
		setWatchedPage: function ( page, isWatched ) {
			this._cache[ page.getId() ] = isWatched;
		},

		/**
		 * Check if a given page is watched
		 * @method
		 * @param {Page} page Page view object
		 * @return {boolean|undefined} undefined when the watch status is not known.
		 */
		isWatchedPage: function ( page ) {
			var id = page.getId();
			return this._cache[id];
		},

		/**
		 * Toggle the watch status of a known page
		 * @method
		 * @param {Page} page Page view object
		 * @return {jQuery.Deferred}
		 */
		toggleStatus: function ( page ) {
			var data,
				self = this,
				id = page.getId();

			data = {
				action: 'watch'
			};
			if ( !page.isMissing ) {
				data.pageids = id;
			} else {
				// it's a new page use title instead
				data.title = page.getTitle();
			}

			if ( this.isWatchedPage( page ) ) {
				data.unwatch = true;
			}
			return this.api.postWithToken( 'watch', data ).done( function () {
				var newStatus = !self.isWatchedPage( page );
				self.setWatchedPage( page, newStatus );
			} );
		}
	};

	M.define( 'mobile.watchstar/WatchstarGateway', WatchstarGateway );

}( mw.mobileFrontend ) );

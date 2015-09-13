( function ( M, $ ) {
	var api = M.require( 'mobile.startup/api' ),
		Api = api.Api,
		ForeignApi;

	/**
	 * Extends API for cross origin requests
	 * @class ForeignApi
	 * @extends Api
	 */
	ForeignApi = Api.extend( {
		/**
		 * Get a central auth token from the current host for use on the foreign api.
		 * @return {jQuery.Deferred}
		 */
		getCentralAuthToken: function () {
			var data = {
				action: 'centralauthtoken'
			};
			// central auth token must be requested from the Api (not ForeignApi)
			return api.get( data ).then( function ( resp ) {
				if ( resp.error ) {
					return false;
				} else {
					return resp.centralauthtoken.centralauthtoken;
				}
			} );
		},
		/**
		 * Get a token from a foreign API
		 * @param {String} type of token you want to retrieve
		 * @param {String} centralAuthToken to help get it
		 * @return {jQuery.Deferred}
		 */
		getToken: function ( type, centralAuthToken ) {
			var data = {
				action: 'query',
				meta: 'tokens',
				origin: this.getOrigin(),
				centralauthtoken: centralAuthToken,
				type: type
			};
			return this.ajax( data ).then( function ( resp ) {
				return resp.query.tokens[type + 'token'];
			} );
		},
		/**
		 * Post to API with support for central auth tokens
		 * If the user is anonymous, then post using the csrftoken received from the remote wiki.
		 * @param {String} tokenType Ignored. `'csrf'` is always used
		 * @param {Object} data Data to be preprocessed and added to options
		 * @param {Object} options Parameters passed to $.ajax()
		 * @return {jQuery.Deferred}
		 */
		postWithToken: function ( tokenType, data, options ) {
			var self = this,
				d = $.Deferred();

			options = options || {};
			options.xhrFields = {
				withCredentials: true
			};
			// In case it is a file upload we need to append origin to query string.
			options.url = self.apiUrl + '?origin=' + self.getOrigin();

			data.origin = self.getOrigin();

			// first let's sort out the token
			self.getCentralAuthToken().done( function ( centralAuthTokenOne ) {
				self.getToken( tokenType, centralAuthTokenOne ).done( function ( token ) {
					self.getCentralAuthToken().done( function ( centralAuthTokenTwo ) {
						data.centralauthtoken = centralAuthTokenTwo;
						data.token = token;
						Api.prototype.post.call( self, data, options ).done( function ( resp ) {
							d.resolve( resp );
						} ).fail( $.proxy( d, 'reject' ) );
					} ).fail( $.proxy( d, 'reject' ) );
				} ).fail( $.proxy( d, 'reject' ) );
			} ).fail( function ( code ) {
				if ( code !== 'notloggedin' ) {
					d.reject();
					return;
				}
				// So the user is not logged in locally.
				// Get the remote CSRF token
				Api.prototype.ajax.call(
					self, {
						action: 'query',
						meta: 'tokens',
						type: 'csrf'
					}, {
						url: options.url
					}
				).done( function ( resp ) {
					if ( resp.query && resp.query.tokens && resp.query.tokens.csrftoken ) {
						data.token = resp.query.tokens.csrftoken;
						Api.prototype.post.call( self, data, options ).done( function ( resp ) {
							d.resolve( resp );
						} ).fail( $.proxy( d, 'reject' ) );
					} else {
						d.reject();
					}
				} ).fail( $.proxy( d, 'reject' ) );
			} );
			return d;
		},
		/** @inheritdoc */
		ajax: function ( data, options ) {
			options = options || {};
			if ( !options.url ) {
				options.url = this.apiUrl;
			}
			// Tokens need to be requested without jsonp
			if ( options.type !== 'POST' && data.action !== 'tokens' && data.meta !== 'tokens' ) {
				options.dataType = 'jsonp';
			}
			return Api.prototype.ajax.call( this, data, options );
		},
		/** @inheritdoc */
		initialize: function () {
			Api.prototype.initialize.apply( this, arguments );
		}
	} );

	M.define( 'mobile.foreignApi/ForeignApi', ForeignApi ).deprecate( 'modules/ForeignApi' );

}( mw.mobileFrontend, jQuery ) );

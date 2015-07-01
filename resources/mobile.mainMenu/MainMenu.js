( function ( M, $ ) {
	var MainMenu,
		browser = M.require( 'browser' ),
		View = M.require( 'View' );

	/**
	 * Representation of the main menu
	 *
	 * @class MainMenu
	 * @extends View
	 */
	MainMenu = View.extend( {
		/** @inheritdoc */
		isTemplateMode: true,
		/** @inheritdoc */
		template: mw.template.get( 'mobile.mainMenu', 'menu.hogan' ),

		/**
		 * @cfg {Object} defaults Default options hash.
		 * @cfg {String} defaults.activator selector for element that when clicked can open or close the menu
		 */
		defaults: {
			activator: undefined
		},

		/**
		 * Advertise a new feature in the main menu.
		 * @param {String} selector to an element inside the main menu
		 * @param {String} msg a message to show in the pointer
		 * @param {Skin} skin that the feature lives in, will allow pointer to update when skin gets redrawn.
		 * @throws exception when you try to advertise more than one feature.
		 */
		advertiseNewFeature: function ( selector, msg, skin ) {
			var self = this;
			if ( this._hasNewFeature ) {
				throw 'A new feature is already being advertised.';
			} else {
				this._hasNewFeature = true;
			}
			$( function () {
				var $activator = $( self.activator );
				$activator.addClass( 'indicator-circle' );
				mw.loader.using( 'mobile.contentOverlays' ).done( function () {
					$activator.one( 'click', function () {
						var po,
							PointerOverlay = M.require( 'mobile.contentOverlays/PointerOverlay' );

						po = new PointerOverlay( {
							appendToElement: self.$el.parent(),
							alignment: 'left',
							skin: skin,
							summary: msg,
							target: self.$( selector )
						} );
						po.show();
						$activator.removeClass( 'indicator-circle' );
					} );
				} );
			} );
		},

		/** @inheritdoc **/
		initialize: function ( options ) {
			var // FIXME: move to MainMenu.prototype.defaults when we no longer care about cached data.
				defaults = this._handleCachedMenuData(
					mw.config.get( 'wgMFMenuData' ) || {}
				);
			$.extend( this.defaults, defaults );

			this.activator = options.activator;
			View.prototype.initialize.call( this, options );
		},

		// FIXME: [CACHE] Remove when cache clears.
		/**
		 * Translates the old, but cached, format of `wgMFMenuData` to the new
		 * new format.
		 *
		 * @param {Object[]} menu The value of the `wgMFMenuData` config variable
		 * @private
		 */
		_handleCachedMenuData: function ( menu ) {
			var result = {};

			$.each( menu, function ( key, entries ) {

				// New format?
				if ( entries[0].components ) {
					result = menu;

					return false;
				}

				result[key] = $.map( entries, function ( entry ) {
					// We don't have to address T98759 here as this bug only
					// affects logged out users who are seeing a cached version
					// of the page.
					return {
						name: entry.name,
						components: [ entry ]
					};
				} );
			} );

			return result;
		},

		/**
		 * Turn on event logging on the existing main menu by reading `event-name` data
		 * attributes on elements.
		 * @param {SchemaMobileWebClickTracking} schema to use
		 */
		enableLogging: function ( schema ) {
			this.$( 'a' ).each( function () {
				var $link = $( this ),
					eventName = $link.data( 'event-name' );
				if ( eventName ) {
					schema.hijackLink( $link, eventName );
				}
			} );
		},
		/**
		 * @inheritdoc
		 * Remove the nearby menu entry if the browser doesn't support geo location
		 */
		postRender: function () {
			if ( !browser.supportsGeoLocation() ) {
				this.$el.find( '.nearby' ).parent().remove();
			}

			// FIXME: Remove when cache clears https://phabricator.wikimedia.org/T102868
			this.$el.addClass( 'view-border-box' );
			this.registerClickEvents();
		},

		/**
		 * Registers events for opening and closing the main menu
		 */
		registerClickEvents: function () {
			var self = this;

			// Listen to the main menu button clicks
			$( this.activator )
				.off( 'click' )
				.on( 'click', function ( ev ) {
					if ( self.isOpen() ) {
						self.closeNavigationDrawers();
					} else {
						self.openNavigationDrawer();
					}
					ev.preventDefault();
					// Stop propagation, otherwise the Skin will close the open menus on page center click
					ev.stopPropagation();
				} );
		},

		/**
		 * Check whether the navigation drawer is open
		 * @return {Boolean}
		 */
		isOpen: function () {
			// FIXME: We should be moving away from applying classes to the body
			return $( 'body' ).hasClass( 'navigation-enabled' );
		},

		/**
		 * Close all open navigation drawers
		 */
		closeNavigationDrawers: function () {
			// FIXME: We should be moving away from applying classes to the body
			$( 'body' ).removeClass( 'navigation-enabled' )
				.removeClass( 'secondary-navigation-enabled' )
				.removeClass( 'primary-navigation-enabled' );
		},

		/**
		 * Toggle open navigation drawer
		 * @param {String} [drawerType] A name that identifies the navigation drawer that
		 *     should be toggled open. Defaults to 'primary'.
		 */
		openNavigationDrawer: function ( drawerType ) {
			// close any existing ones first.
			this.closeNavigationDrawers();
			drawerType = drawerType || 'primary';
			// FIXME: We should be moving away from applying classes to the body
			$( 'body' ).toggleClass( 'navigation-enabled' )
				.toggleClass( drawerType + '-navigation-enabled' );
			/**
			 * @event open emitted when navigation drawer is opened
			 */
			this.emit( 'open' );
		}
	} );

	M.define( 'MainMenu', MainMenu );

}( mw.mobileFrontend, jQuery ) );

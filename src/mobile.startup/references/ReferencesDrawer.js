var Drawer = require( './../Drawer' ),
	util = require( './../util' ),
	icons = require( './../icons' ),
	mfExtend = require( './../mfExtend' ),
	ReferencesGateway = require( './ReferencesGateway' ),
	Icon = require( './../Icon' );

/**
 * Drawer for references
 * @class ReferencesDrawer
 * @extends Drawer
 * @uses Icon
 * @param {Object} props
 */
function ReferencesDrawer( props ) {
	Drawer.call(
		this,
		util.extend(
			{
				className: 'drawer position-fixed text references-drawer',
				events: { 'click sup a': 'showNestedReference' }
			},
			props
		)
	);
}

mfExtend( ReferencesDrawer, Drawer, {
	/**
	 * @memberof ReferencesDrawer
	 * @instance
	 * @mixes Drawer#defaults
	 * @property {Object} defaults Default options hash.
	 * @property {boolean} defaults.error whether an error message is being shown
	 */
	defaults: util.extend( {}, Drawer.prototype.defaults, {
		errorClassName: new Icon( {
			name: 'error',
			hasText: true,
			isSmall: true
		} ).getClassName()
	} ),
	/**
	 * @inheritdoc
	 * @memberof ReferencesDrawer
	 * @instance
	 */
	show: function () {
		return Drawer.prototype.show.apply( this, arguments );
	},
	/**
	 * @memberof ReferencesDrawer
	 * @instance
	 */
	template: util.template( `
<div class="references-drawer__header"></div>
{{#error}}
	<div class="{{errorClassName}}">
{{/error}}
<sup>{{title}}</sup>
{{#text}}
	{{{text}}}
{{/text}}
{{#error}}</div>{{/error}}
	` ),
	/**
	 * @inheritdoc
	 * @memberof ReferencesDrawer
	 * @instance
	 */
	closeOnScroll: false,
	/**
	 * @inheritdoc
	 * @memberof ReferencesDrawer
	 * @instance
	 */
	postRender: function () {
		Drawer.prototype.postRender.apply( this );
		this.$el.find( '.references-drawer__header' ).append( [
			new Icon( {
				isSmall: true,
				name: 'citation-invert',
				additionalClassNames: 'references-drawer__title',
				hasText: true,
				label: mw.msg( 'mobile-frontend-references-citation' )
			} ).$el,
			icons.cancel( 'gray' ).$el
		] );
		// For lazy loading references - if no text append a spinner
		if ( !this.options.text ) {
			this.$el.append( icons.spinner().$el );
		}

		this.on( 'show', this.onShow.bind( this ) );
		this.on( 'hide', this.onHide.bind( this ) );
	},
	/**
	 * Make body not scrollable
	 * @memberof ReferencesDrawer
	 * @instance
	 */
	onShow: function () {
		util.getDocument().find( 'body' ).addClass( 'drawer-enabled' );
	},
	/**
	 * Restore body scroll
	 * @memberof ReferencesDrawer
	 * @instance
	 */
	onHide: function () {
		util.getDocument().find( 'body' ).removeClass( 'drawer-enabled' );
	},
	/**
	 * Fetch and render nested reference upon click
	 * @memberof ReferencesDrawer
	 * @instance
	 * @param {string} id of the reference to be retrieved
	 * @param {Page} page to locate reference for
	 * @param {string} refNumber the number it identifies as in the page
	 * @param {PageHTMLParser} pageHTMLParser
	 * @return {jQuery.Deferred}
	 */
	showReference: function ( id, page, refNumber, pageHTMLParser ) {
		var drawer = this,
			gateway = this.options.gateway;

		// Save the page in case we have to show a nested reference.
		this.options.page = page;
		this.options.pageHTMLParser = pageHTMLParser;
		// If API is being used we want to show the drawer with the spinner while query runs
		drawer.show();
		return gateway.getReference( id, page, pageHTMLParser ).then( function ( reference ) {
			drawer.render( {
				title: refNumber,
				text: reference.text
			} );
		}, function ( err ) {
			if ( err === ReferencesGateway.ERROR_NOT_EXIST ) {
				drawer.hide();
			} else {
				drawer.render( {
					error: true,
					title: refNumber,
					text: mw.msg( 'mobile-frontend-references-citation-error' )
				} );
			}
		} );
	},
	/**
	 * Fetch and render nested reference upon click
	 * @memberof ReferencesDrawer
	 * @instance
	 * @param {jQuery.Event} ev
	 * @return {boolean} False to cancel the native event
	 */
	showNestedReference: function ( ev ) {
		var $dest = this.$el.find( ev.target );

		this.showReference( $dest.attr( 'href' ), this.options.page, $dest.text(), this.options.pageHTMLParser );
		// Don't hide the already shown drawer via propagation
		// and stop default scroll behaviour.
		return false;
	}
} );

module.exports = ReferencesDrawer;

this.mfModules=this.mfModules||{},this.mfModules["mobile.startup"]=(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"./src/mobile.startup/LanguageInfo.js":function(e,t,r){var n=r("./src/mobile.startup/util.js"),s=r("./src/mobile.startup/actionParams.js");function a(e){this.api=e}a.prototype={getLanguages:function(){return this.api.get(s({meta:"languageinfo",liprop:"code|autonym|name|bcp47"})).then((function(e){var t=[];return Object.keys(e.query.languageinfo).forEach((function(r){var n=e.query.languageinfo[r];n.code.toLowerCase()===n.bcp47.toLowerCase()&&n.autonym&&t.push(n)})),t}),(function(){return n.Deferred().reject()})).then((function(e){return{languages:e.map((function(e){return e.url="#",e.lang=e.code,e.langname=e.name,e.title=e.name,e}))}}),(function(){return n.Deferred().reject()}))}},e.exports=a},"./src/mobile.startup/languageOverlay/getDeviceLanguage.js":function(e,t){e.exports=function(e){var t=e.languages?e.languages[0]:e.language||e.userLanguage||e.browserLanguage||e.systemLanguage;return t?t.toLowerCase():void 0}},"./src/mobile.startup/languageOverlay/languageInfoOverlay.js":function(e,t,r){var n=r("./src/mobile.startup/moduleLoaderSingleton.js"),s=r("./src/mobile.startup/languageOverlay/getDeviceLanguage.js"),a=r("./src/mobile.startup/Overlay.js"),o=r("./src/mobile.startup/promisedView.js");function i(e,t){return mw.loader.using("mobile.languages.structured").then((function(){return e.getLanguages()})).then((function(e){return new(n.require("mobile.languages.structured/LanguageSearcher"))({languages:e.languages,variants:e.variants,showSuggestedLanguages:t,deviceLanguage:s(navigator)})}))}function c(e,t){return a.make({heading:mw.msg("mobile-frontend-language-heading"),className:"overlay language-info-overlay"},o(i(e,t)))}c.test={loadLanguageInfoSearcher:i},e.exports=c},"./src/mobile.startup/languageOverlay/languageOverlay.js":function(e,t,r){var n=r("./src/mobile.startup/moduleLoaderSingleton.js"),s=r("./src/mobile.startup/languageOverlay/getDeviceLanguage.js"),a=r("./src/mobile.startup/Overlay.js"),o=r("./src/mobile.startup/promisedView.js");function i(e){return mw.loader.using("mobile.languages.structured").then((function(){return e.getPageLanguages(mw.config.get("wgPageName"),mw.config.get("wgUserLanguage"))})).then((function(e){return new(n.require("mobile.languages.structured/LanguageSearcher"))({languages:e.languages,variants:e.variants,showSuggestedLanguages:!0,deviceLanguage:s(navigator),onOpen:function(e){mw.hook("mobileFrontend.languageSearcher.onOpen").fire(e)},onBannerClick:function(){mw.hook("mobileFrontend.languageSearcher.onBannerClick").fire()}})}))}function c(e){return a.make({heading:mw.msg("mobile-frontend-language-heading"),className:"overlay language-overlay"},o(i(e)))}c.test={loadLanguageSearcher:i},e.exports=c},"./src/mobile.startup/loadingOverlay.js":function(e,t,r){var n=r("./src/mobile.startup/icons.js"),s=r("./src/mobile.startup/Overlay.js");e.exports=function(){var e=new s({className:"overlay overlay-loading",noHeader:!0});return n.spinner().$el.appendTo(e.$el.find(".overlay-content")),e}},"./src/mobile.startup/mediaViewer/overlay.js":function(e,t,r){var n=r("./src/mobile.startup/moduleLoaderSingleton.js"),s=r("./src/mobile.startup/promisedView.js"),a=r("./src/mobile.startup/util.js"),o=r("./src/mobile.startup/headers.js").header,i=r("./src/mobile.startup/icons.js"),c=r("./src/mobile.startup/Overlay.js");e.exports=function(e){return c.make({headers:[o("",[],i.cancel("gray"))],className:"overlay media-viewer"},s(a.Promise.all([mw.loader.using("mobile.mediaViewer")]).then((function(){return new(0,n.require("mobile.mediaViewer").ImageCarousel)(e)}))))}},"./src/mobile.startup/mobile.startup.js":function(e,t,r){var n=r("./src/mobile.startup/moduleLoaderSingleton.js"),s=r("./src/mobile.startup/util.js");e.exports={moduleLoader:n,mfExtend:r("./src/mobile.startup/mfExtend.js"),time:r("./src/mobile.startup/time.js"),util:s,headers:r("./src/mobile.startup/headers.js"),View:r("./src/mobile.startup/View.js"),PageGateway:r("./src/mobile.startup/PageGateway.js"),LanguageInfo:r("./src/mobile.startup/LanguageInfo.js"),Browser:r("./src/mobile.startup/Browser.js"),Button:r("./src/mobile.startup/Button.js"),Icon:r("./src/mobile.startup/Icon.js"),ReferencesGateway:r("./src/mobile.startup/references/ReferencesGateway.js"),ReferencesHtmlScraperGateway:r("./src/mobile.startup/references/ReferencesHtmlScraperGateway.js"),icons:r("./src/mobile.startup/icons.js"),Page:r("./src/mobile.startup/Page.js"),currentPage:r("./src/mobile.startup/currentPage.js"),PageHTMLParser:r("./src/mobile.startup/PageHTMLParser.js"),currentPageHTMLParser:r("./src/mobile.startup/currentPageHTMLParser.js"),Anchor:r("./src/mobile.startup/Anchor.js"),Skin:r("./src/mobile.startup/Skin.js"),OverlayManager:r("./src/mobile.startup/OverlayManager.js"),Overlay:r("./src/mobile.startup/Overlay.js"),loadingOverlay:r("./src/mobile.startup/loadingOverlay.js"),Drawer:r("./src/mobile.startup/Drawer.js"),CtaDrawer:r("./src/mobile.startup/CtaDrawer.js"),showOnPageReload:r("./src/mobile.startup/showOnPageReload.js"),toast:r("./src/mobile.startup/showOnPageReload.js"),Watchstar:r("./src/mobile.startup/watchstar/watchstar.js"),eventBusSingleton:r("./src/mobile.startup/eventBusSingleton.js"),promisedView:r("./src/mobile.startup/promisedView.js"),toc:{TableOfContents:function(){return{$el:s.parseHTML("<div>")}}},references:r("./src/mobile.startup/references/references.js"),search:{SearchOverlay:r("./src/mobile.startup/search/SearchOverlay.js"),SearchGateway:r("./src/mobile.startup/search/SearchGateway.js")},lazyImages:{lazyImageLoader:r("./src/mobile.startup/lazyImages/lazyImageLoader.js")},languageOverlay:r("./src/mobile.startup/languageOverlay/languageOverlay.js"),languageInfoOverlay:r("./src/mobile.startup/languageOverlay/languageInfoOverlay.js"),mediaViewer:{overlay:r("./src/mobile.startup/mediaViewer/overlay.js")},amcOutreach:r("./src/mobile.startup/amcOutreach/amcOutreach.js"),Section:r("./src/mobile.startup/Section.js")},mw.mobileFrontend=n,n.define("mobile.startup",e.exports)},"./src/mobile.startup/references/ReferencesGateway.js":function(e,t){function r(e){this.api=e}r.prototype.getReference=null,r.ERROR_NOT_EXIST="NOT_EXIST_ERROR",r.ERROR_OTHER="OTHER_ERROR",e.exports=r},"./src/mobile.startup/references/ReferencesHtmlScraperGateway.js":function(e,t,r){var n=r("./src/mobile.startup/references/ReferencesGateway.js"),s=r("./src/mobile.startup/mfExtend.js"),a=r("./src/mobile.startup/util.js");function o(){n.apply(this,arguments)}s(o,n,{EXTERNAL_LINK_CLASS:"external--reference",getReferenceFromContainer:function(e,t){var r,s,o,i=a.Deferred();return(r=t.find("#"+a.escapeSelector(e))).length?((s=r.closest("ol")).hasClass("mw-extended-references")&&(o=s.parent()),(o||r).find(".external").addClass(this.EXTERNAL_LINK_CLASS),i.resolve({text:this.getReferenceHtml(r),parentText:this.getReferenceHtml(o)})):i.reject(n.ERROR_NOT_EXIST),i.promise()},getReferenceHtml:function(e){return e?e.find(".mw-reference-text, .reference-text").first().html():""},getReference:function(e,t,r){var n=mw.util.percentDecodeFragment(e.slice(1));return this.getReferenceFromContainer(n,r.$el.find("ol.references"))}}),e.exports=o},"./src/mobile.startup/references/references.js":function(e,t,r){var n,s=r("./src/mobile.startup/Drawer.js"),a=r("./src/mobile.startup/util.js"),o=r("./src/mobile.startup/icons.js"),i=r("./src/mobile.startup/references/ReferencesGateway.js"),c=r("./src/mobile.startup/Icon.js");function u(e){return function(t){var r=t.currentTarget.querySelector("a");if(r)return e(r.getAttribute("href"),r.textContent),!1}}function l(e){var t=e.error?new c({name:"error",isSmall:!0}).$el:null;return new s(a.extend({showCollapseIcon:!1,className:"drawer position-fixed text references-drawer",events:{"click sup a":function(e){e.preventDefault()},"click sup":e.onNestedReferenceClick&&u(e.onNestedReferenceClick)},children:[a.parseHTML("<div>").addClass("references-drawer__header").append([new c({isSmall:!0,name:"reference",type:""}).$el,a.parseHTML("<span>").addClass("references-drawer__title").text(mw.msg("mobile-frontend-references-citation")),o.cancel("gray",{isSmall:!0,type:"element",additionalClassNames:"mw-ui-icon-flush-right"}).$el]),a.parseHTML("<div>").addClass("mw-parser-output").append([t,e.parentText?a.parseHTML("<div>").html(e.parentText):"",a.parseHTML("<sup>").text(e.title),e.text?a.parseHTML("<span>").html(" "+e.text):o.spinner().$el])]},e))}n={test:{makeOnNestedReferenceClickHandler:u},referenceDrawer:l,showReference:function(e,t,r,s,o,c,u){return o.getReference(e,t,s).then((function(e){var i=l(a.extend({title:r,text:e.text,parentText:e.parentText,onNestedReferenceClick:function(e,r){n.showReference(e,t,r,s,o).then((function(e){c.onShowNestedReference?u(i,e):(mw.log.warn("Please provide onShowNestedReferences parameter."),document.body.appendChild(e.$el[0]),i.hide(),e.show())}))}},c));return i}),(function(e){if(e!==i.ERROR_NOT_EXIST)return l({error:!0,title:r,text:mw.msg("mobile-frontend-references-citation-error")})}))}},e.exports=n},"./src/mobile.startup/search/SearchGateway.js":function(e,t,r){var n=r("./src/mobile.startup/page/pageJSONParser.js"),s=r("./src/mobile.startup/util.js"),a=r("./src/mobile.startup/extendSearchParams.js");function o(e){this.api=e,this.searchCache={},this.generator=mw.config.get("wgMFSearchGenerator")}o.prototype={searchNamespace:0,getApiData:function(e){var t=this.generator.prefix,r=a("search",{generator:this.generator.name});return r.redirects="",r["g"+t+"search"]=e,r["g"+t+"namespace"]=this.searchNamespace,r["g"+t+"limit"]=15,r.pilimit&&(r.pilimit=15,r.pithumbsize=mw.config.get("wgMFThumbnailSizes").tiny),r},_createSearchRegEx:function(e){return e=e.replace(/[-\[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),new RegExp("^("+e+")","ig")},_highlightSearchTerm:function(e,t){return e=s.parseHTML("<span>").text(e).html(),t=s.parseHTML("<span>").text(t).html(),e.replace(this._createSearchRegEx(t),"<strong>$1</strong>")},_getPage:function(e,t){var r=n.parse(t);return r.displayTitle=this._highlightSearchTerm(t.displaytext?t.displaytext:r.title,e),r.index=t.index,r},_processData:function(e,t){var r=this,n=[];return t.query&&(n=t.query.pages||{},(n=Object.keys(n).map((function(t){return r._getPage(e,n[t])}))).sort((function(e,t){return e.index-t.index}))),n},search:function(e){var t,r,n=this;return this.isCached(e)||(r=(t=this.api.get(this.getApiData(e))).then((function(t,r){return{query:e,results:n._processData(e,t),searchId:r&&r.getResponseHeader("x-search-id")}}),(function(){n.searchCache[e]=void 0})),this.searchCache[e]=r.promise({abort:function(){t.abort()}})),this.searchCache[e]},isCached:function(e){return Boolean(this.searchCache[e])}},e.exports=o},"./src/mobile.startup/search/SearchHeaderView.js":function(e,t,r){function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function a(e,t){return(a=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function o(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=c(e);if(t){var s=c(this).constructor;r=Reflect.construct(n,arguments,s)}else r=n.apply(this,arguments);return i(this,r)}}function i(e,t){if(t&&("object"===n(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var u=r("./src/mobile.startup/util.js"),l=r("./src/mobile.startup/View.js"),p=r("./src/mobile.startup/Icon.js"),f=function(e){"use strict";!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&a(e,t)}(c,e);var t,r,n,i=o(c);function c(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),i.call(this,u.extend({},e,{events:{"input input":"onInput"}}))}return t=c,(r=[{key:"onInput",value:function(e){var t=e.target.value;this.options.onInput(t),t?this.clearIcon.$el.show():this.clearIcon.$el.hide()}},{key:"isTemplateMode",get:function(){return!0}},{key:"template",get:function(){return u.template('<div class="overlay-title search-header-view">\n\t\t<form method="get" action="{{action}}" class="search-box">\n\t\t<input class="search mw-ui-background-icon-search" type="search" name="search" autocomplete="off" placeholder="{{placeholderMsg}}" aria-label="{{placeholderMsg}}" value="{{searchTerm}}">\n\t\t<input type="hidden" name="title" value="{{defaultSearchPage}}">\n\t\t</form>\n</div>')}},{key:"postRender",value:function(){var e=new p({tagName:"button",name:"clear",isSmall:!0,label:mw.msg("mobile-frontend-clear-search"),additionalClassNames:"clear",events:{click:function(){return this.$el.find("input").val("").trigger("focus"),this.options.onInput(""),e.$el.hide(),!1}.bind(this)}});this.clearIcon=e,e.$el.hide(),e.$el.attr("aria-hidden","true"),this.$el.find("form").append(e.$el)}}])&&s(t.prototype,r),n&&s(t,n),c}(l);e.exports=f},"./src/mobile.startup/search/SearchOverlay.js":function(e,t,r){var n=r("./src/mobile.startup/mfExtend.js"),s=r("./src/mobile.startup/Overlay.js"),a=r("./src/mobile.startup/util.js"),o=r("./src/mobile.startup/search/searchHeader.js"),i=r("./src/mobile.startup/search/SearchResultsView.js"),c=r("./src/mobile.startup/watchstar/WatchstarPageList.js");function u(e){var t=o(e.placeholderMsg,e.action||mw.config.get("wgScript"),function(e){this.performSearch(e)}.bind(this),e.defaultSearchPage||""),r=a.extend(!0,{headerChrome:!0,isBorderBox:!1,className:"overlay search-overlay",headers:[t],events:{"click .search-content":"onClickSearchContent","click .overlay-content":"onClickOverlayContent","click .overlay-content > div":function(e){e.stopPropagation()},"touchstart .results":"hideKeyboardOnScroll","mousedown .results":"hideKeyboardOnScroll","click .results a":"onClickResult"}},e);this.header=t,s.call(this,r),this.api=r.api,this.gateway=r.gateway||new r.gatewayClass(this.api),this.router=r.router,this.currentSearchId=null}n(u,s,{onClickSearchContent:function(){var e=this.$el.find("form"),t=e[0].parentNode;this.parseHTML("<input>").attr({type:"hidden",name:"fulltext",value:"search"}).appendTo(e),setTimeout((function(){e[0].parentNode||e.appendTo(t),e.trigger("submit")}),0)},onClickOverlayContent:function(){this.$el.find(".cancel").trigger("click")},hideKeyboardOnScroll:function(){this.$input.trigger("blur")},onClickResult:function(e){var t=this,r=this.$el.find(e.currentTarget);e.preventDefault(),this.router.back().then((function(){if(this.currentSearchId){var e=new mw.Uri(location.href);e.query.searchToken=this.currentSearchId,t.router.navigateTo(document.title,{path:e.toString(),useReplaceState:!0}),this.currentSearchId=null}window.location.href=r.attr("href")}))},postRender:function(){var e,t=this,r=this,n=new i({searchContentLabel:mw.msg("mobile-frontend-search-content"),noResultsMsg:mw.msg("mobile-frontend-search-no-results"),searchContentNoResultsMsg:mw.message("mobile-frontend-search-content-no-results").parse()});function a(){r.$spinner.hide(),clearTimeout(e)}this.$el.find(".overlay-content").append(n.$el),s.prototype.postRender.call(this),this.$input=this.$el.find(this.header).find("input"),this.$searchContent=n.$el.hide(),this.$resultContainer=n.$el.find(".results-list-container"),this.$resultContainer[0].addEventListener("touchstart",(function(e){document.activeElement===t.$input[0]&&e.stopPropagation()})),this.$spinner=n.$el.find(".spinner-container"),this.on("search-start",(function(t){e&&a(),e=setTimeout((function(){r.$spinner.show()}),2e3-t.delay)})),this.on("search-results",a)},showKeyboard:function(){var e=this.$input.val().length;this.$input.trigger("focus"),this.$input[0].setSelectionRange&&this.$input[0].setSelectionRange(e,e)},show:function(){s.prototype.show.apply(this,arguments),this.showKeyboard()},performSearch:function(e){var t=this,r=this.api,n=this.gateway.isCached(e)?0:300;e!==this.lastQuery&&(t._pendingQuery&&t._pendingQuery.abort(),clearTimeout(this.timer),e.length?this.timer=setTimeout((function(){var n;n=t.gateway.search(e),t._pendingQuery=n.then((function(e){this.currentSearchId=e.searchId,e&&e.query===t.$input.val()&&(t.$el.toggleClass("no-results",0===e.results.length),t.$searchContent.show().find("p").hide().filter(e.results.length?".with-results":".without-results").show(),new c({api:r,funnel:"search",pages:e.results,el:t.$resultContainer}),t.$results=t.$resultContainer.find("li"))})).promise({abort:function(){n.abort()}})}),n):t.resetSearch(),this.lastQuery=e)},resetSearch:function(){this.$el.find(".overlay-content").children().hide()}}),e.exports=u},"./src/mobile.startup/search/SearchResultsView.js":function(e,t,r){function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function o(e,t,r){return(o="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,r){var n=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=l(e)););return e}(e,t);if(n){var s=Object.getOwnPropertyDescriptor(n,t);return s.get?s.get.call(r):s.value}})(e,t,r||e)}function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function c(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=l(e);if(t){var s=l(this).constructor;r=Reflect.construct(n,arguments,s)}else r=n.apply(this,arguments);return u(this,r)}}function u(e,t){if(t&&("object"===n(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var p=r("./src/mobile.startup/View.js"),f=r("./src/mobile.startup/Icon.js"),h=r("./src/mobile.startup/Anchor.js"),m=r("./src/mobile.startup/icons.js").spinner().$el,d=r("./src/mobile.startup/util.js"),g=function(e){"use strict";!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&i(e,t)}(p,e);var t,r,n,u=c(p);function p(){return s(this,p),u.apply(this,arguments)}return t=p,(r=[{key:"isTemplateMode",get:function(){return!0}},{key:"template",get:function(){return d.template('\n<div class="search-results-view">\n\t<div class="search-content">\n\t\t<div class="caption">\n\t\t\t<p class="with-results">{{searchContentLabel}}</p>\n\t\t\t<p class="without-results">{{noResultsMsg}}</p>\n\t\t\t<p class="without-results">{{{searchContentNoResultsMsg}}}</p>\n\t\t</div>\n\t</div>\n\t<div class="spinner-container position-fixed"></div>\n\t<div class="results">\n\t\t<div class="results-list-container"></div>\n\t\t{{#feedback}}\n\t\t\t<div class="search-feedback">\n\t\t\t\t{{prompt}}\n\t\t\t</div>\n\t\t{{/feedback}}\n\t</div>\n</div>')}},{key:"preRender",value:function(){mw.config.get("wgCirrusSearchFeedbackLink")&&(this.options.feedback={prompt:mw.msg("mobile-frontend-search-feedback-prompt")})}},{key:"postRender",value:function(e){var t=mw.config.get("wgCirrusSearchFeedbackLink");o(l(p.prototype),"postRender",this).call(this,e),this.$el.find(".search-content").prepend(new f({tagName:"a",href:"#",name:"articlesSearch",additionalClassNames:"mw-ui-icon-flush-left",label:mw.msg("mobile-frontend-search-content")}).$el),this.$el.find(".spinner-container").append(m),t&&this.$el.find(".search-feedback").append(new h({label:mw.msg("mobile-frontend-search-feedback-link-text"),href:t}).$el)}}])&&a(t.prototype,r),n&&a(t,n),p}(p);e.exports=g},"./src/mobile.startup/search/searchHeader.js":function(e,t,r){var n=r("./src/mobile.startup/headers.js").formHeader,s=r("./src/mobile.startup/search/SearchHeaderView.js"),a=r("./src/mobile.startup/icons.js");e.exports=function(e,t,r,o){return n(new s({placeholderMsg:e,action:t,onInput:r,defaultSearchPage:o}),[a.cancel()],!1)}},"./src/mobile.startup/time.js":function(e,t,r){var n=["seconds","minutes","hours","days","months","years"],s=r("./src/mobile.startup/util.js"),a=[1,60,3600,86400,2592e3,31536e3];function o(e){for(var t=0;t<a.length&&e>a[t+1];)++t;return{value:Math.round(e/a[t]),unit:n[t]}}function i(e){return o(Math.round(Date.now()/1e3)-e)}function c(e){return"seconds"===e.unit&&e.value<10}e.exports={getLastModifiedMessage:function(e,t,r,n){var a,o,u,l=void 0===n,p=[];return r=r||"unknown",c(a=i(e))?p.push("mobile-frontend-last-modified-with-user-just-now",r,t):p.push({seconds:"mobile-frontend-last-modified-with-user-seconds",minutes:"mobile-frontend-last-modified-with-user-minutes",hours:"mobile-frontend-last-modified-with-user-hours",days:"mobile-frontend-last-modified-with-user-days",months:"mobile-frontend-last-modified-with-user-months",years:"mobile-frontend-last-modified-with-user-years"}[a.unit],r,t,mw.language.convertNumber(a.value)),o=l?s.parseHTML("<strong>").attr("class","last-modified-text-accent"):s.parseHTML("<a>").attr("href",n||"#"),u=l?s.parseHTML("<span>").attr("class","last-modified-text-accent"):s.parseHTML("<a>").attr("href",mw.util.getUrl("User:"+t)),p.push(o,mw.language.convertNumber(t?1:0),t?u:""),mw.message.apply(this,p).parse()},getRegistrationMessage:function(e,t){var r,n=[];return t=t||"unknown",c(r=i(parseInt(e,10)))?n.push("mobile-frontend-joined-just-now",t):n.push({seconds:"mobile-frontend-joined-seconds",minutes:"mobile-frontend-joined-minutes",hours:"mobile-frontend-joined-hours",days:"mobile-frontend-joined-days",months:"mobile-frontend-joined-months",years:"mobile-frontend-joined-years"}[r.unit],t,mw.language.convertNumber(r.value)),mw.message.apply(this,n).parse()},timeAgo:o,getTimeAgoDelta:i,isNow:c,isRecent:function(e){return["seconds","minutes","hours"].indexOf(e.unit)>-1}}}},[["./src/mobile.startup/mobile.startup.js",0,1]]]);
//# sourceMappingURL=mobile.startup.js.map.json
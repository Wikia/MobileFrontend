this[void 0]=(window.webpackJsonp=window.webpackJsonp||[]).push([[3],[function(e,t){e.exports={escapeSelector:function(e){return $.escapeSelector(e)},grep:function(){return $.grep.apply($,arguments)},docReady:function(e){return $(e)},when:function(){return $.when.apply($,arguments)},Deferred:function(){var e=$.Deferred(),t="Use Promise compatible methods `then` and `catch` instead.";return mw.log.deprecate(e,"fail",e.fail,t),mw.log.deprecate(e,"always",e.always,t),mw.log.deprecate(e,"done",e.done,t),e},getDocument:function(){return $(document.documentElement)},getWindow:function(){return $(window)},parseHTML:function(e,t){return $($.parseHTML(e,t))},isNumeric:function(){return $.isNumeric.apply($,arguments)},extend:function(){return $.extend.apply($,arguments)},escapeHash:function(e){return e.replace(/(:|\.)/g,"\\$1")},isModifiedEvent:function(e){return e.altKey||e.ctrlKey||e.metaKey||e.shiftKey},repeatEvent:function(e,t,i,n){return e.on(i,function(e){return t.emit(i,e)},n)}}},function(e,t){e.exports=function(e,t,i){var n;for(n in i?OO.inheritClass(e,t):(OO.initClass(e),i=t),i)e.prototype[n]=i[n]}},function(e,t,i){var n=i(0),o=i(1),s=/^(\S+)\s*(.*)$/,a=0;function r(){this.initialize.apply(this,arguments)}OO.mixinClass(r,OO.EventEmitter),o(r,{className:void 0,tagName:"div",isTemplateMode:!1,isBorderBox:!0,template:void 0,templatePartials:{},defaults:{},events:null,initialize:function(e){var t=this;OO.EventEmitter.call(this),e=n.extend({},this.defaults,e),this.options=e,this.cid=function(e){var t=(++a).toString();return e?e+t:t}("view"),"string"==typeof this.template&&(this.template=mw.template.compile(this.template)),e.el?this.$el=$(e.el):this.$el=this.parseHTML("<"+this.tagName+">"),this.$el.length?this._postInitialize():n.docReady(function(){t.$el=$(e.el),t._postInitialize()})},_postInitialize:function(){this.$el.addClass(this.className),this.isBorderBox&&this.$el.addClass("view-border-box"),this.render(this.options)},preRender:function(){},postRender:function(){},render:function(e){var t;return n.extend(this.options,e),this.preRender(),this.undelegateEvents(),this.template&&!this.options.skipTemplateRender&&(t=this.template.render(this.options,this.templatePartials),this.isTemplateMode?this.$el=$(t):this.$el.html(t)),this.postRender(),this.delegateEvents(),this},$:function(e){return this.$el.find(e)},delegateEvents:function(e){var t,i,n;if(e=e||this.events)for(i in this.undelegateEvents(),e)"function"!=typeof(n=e[i])&&(n=this[e[i]]),n&&(t=i.match(s),this.delegate(t[1],t[2],n.bind(this)))},delegate:function(e,t,i){this.$el.on(e+".delegateEvents"+this.cid,t,i)},undelegateEvents:function(){this.$el&&this.$el.off(".delegateEvents"+this.cid)},undelegate:function(e,t,i){this.$el.off(e+".delegateEvents"+this.cid,t,i)},parseHTML:n.parseHTML}),["append","prepend","appendTo","prependTo","after","before","insertAfter","insertBefore","remove","detach"].forEach(function(e){r.prototype[e]=function(){return this.$el[e].apply(this.$el,arguments),this}}),e.exports=r},,,function(e,t,i){var n,o=i(0);function s(e){var t=function(){var i=this["__cache"+t.cacheId]||(this["__cache"+t.cacheId]={}),n=[].join.call(arguments,"|");return Object.prototype.hasOwnProperty.call(i,n)?i[n]:i[n]=e.apply(this,arguments)};return t.cacheId=Date.now().toString()+Math.random().toString(),t}function a(e,t){this.userAgent=e,this.$el=t,this._fixIosLandscapeBug()}a.prototype={_fixIosLandscapeBug:function(){var e=this;this.$el.find('meta[name="viewport"]')[0]&&(this.isIos(4)||this.isIos(5))&&(this.lockViewport(),document.addEventListener("gesturestart",function(){e.lockViewport()},!1))},isIos:s(function(e){var t=this.userAgent,i=/ipad|iphone|ipod/i.test(t);if(!i||!e)return i;switch(e){case 8:return/OS 8_/.test(t)||/Version\/8/.test(t);case 4:return/OS 4_/.test(t);case 5:return/OS 5_/.test(t);default:return!1}}),lockViewport:function(){this.$el&&this.$el.find('meta[name="viewport"]').attr("content","initial-scale=1.0, maximum-scale=1.0, user-scalable=no")},isWideScreen:s(function(){var e=parseInt(mw.config.get("wgMFDeviceWidthTablet"),10);return window.innerWidth>=e||window.innerHeight>=e}),supportsAnimations:s(function(){var e=document.createElement("foo").style;function t(t){return t in e||"webkit"+t[0].toUpperCase()+t.slice(1)in e}return t("animationName")&&t("transform")&&t("transition")}),supportsTouchEvents:s(function(){return"ontouchstart"in window}),supportsGeoLocation:s(function(){return"geolocation"in window.navigator})},a.getSingleton=function(){var e;return n||(e=o.getDocument(),n=new a(window.navigator.userAgent,e)),n},e.exports=a},,,function(e,t,i){var n=i(12),o=i(0);e.exports={spinner:function(e){return e=e||{},new n(o.extend(e,{name:"spinner",label:mw.msg("mobile-frontend-loading-message"),additionalClassNames:"spinner loading"}))}}},,,function(e,t,i){var n=mw.html,o=i(1),s=i(13),a=i(0),r=i(16),l=i(17),c=i(2),d=mw.config.get("wgMFMobileFormatterHeadings").join(","),h=["noviewer","metadata"];function u(e){var t;void 0===e.thumbnail&&(e.thumbnail=!1),this.options=e,e.languageUrl=mw.util.getUrl("Special:MobileLanguages/"+e.title),c.call(this,e),e.displayTitle=this.getDisplayTitle(),this.title=e.title,this.displayTitle=e.displayTitle,this.thumbnail=e.thumbnail,this.url=e.url||mw.util.getUrl(e.title),this.id=e.id,this.isMissing=void 0!==e.isMissing?e.isMissing:0===e.id,(t=this.thumbnail)&&t.width&&(this.thumbnail.isLandscape=t.width>t.height),this.wikidataDescription=e.wikidataDescription}o(u,c,{defaults:{id:0,title:"",displayTitle:"",namespaceNumber:0,protection:{edit:["*"]},sections:[],isMissing:!1,isMainPage:!1,url:void 0,thumbnail:{isLandscape:void 0,source:void 0,width:void 0,height:void 0}},isBorderBox:!1,getDisplayTitle:function(){return this.options.displayTitle||n.escape(this.options.title)},inNamespace:function(e){return this.options.namespaceNumber===mw.config.get("wgNamespaceIds")[e]},findSectionHeadingByIndex:function(e){return e<1?this.$():this.$(d).filter('.mw-parser-output > *, [class^="mf-section-"] > *').eq(e-1)},findChildInSectionLead:function(e,t){var i,n,o,s,a=d;function r(e){return e.find(t).addBack()}return 0===e?(s=this.getLeadSectionElement())&&s.length?r(s.children(t)):(i=this.findSectionHeadingByIndex(1)).length?r(i.prevAll(t)):this.$(t):(i=this.findSectionHeadingByIndex(e)).hasClass("section-heading")?(n=(o=i.next()).find(a).eq(0)).length?r(n.prevAll(t)):r(o.children(t)):(n=i.eq(0).nextAll(a).eq(0),i.nextUntil(n,t))},getLeadSectionElement:function(){return this.$(".mf-section-0").length?this.$(".mf-section-0"):null},isWikiText:function(){return"wikitext"===mw.config.get("wgPageContentModel")},isMainPage:function(){return this.options.isMainPage},isWatched:function(){return this.options.isWatched},getRevisionId:function(){return this.options.revId},getTitle:function(){return this.options.title},getId:function(){return this.options.id},getNamespaceId:function(){var e=this.options.title.split(":");return e[1]&&mw.config.get("wgNamespaceIds")[e[0].toLowerCase().replace(" ","_")]||0},isTalkPage:function(){var e=this.getNamespaceId();return e>0&&e%2==1},preRender:function(){this.sections=[],this._sectionLookup={},this.title=this.options.title,this.options.sections.forEach(function(e){var t=new r(e);this.sections.push(t),this._sectionLookup[t.id]=t}.bind(this))},getThumbnails:function(){var e=this.$el,t="."+h.join(",."),i=[];return this._thumbs||(e.find("a.image, a.thumbimage").not(t).each(function(){var n=e.find(this),o=n.find(".lazy-image-placeholder"),s=0===n.parents(t).length&&0===n.find(t).length,a=n.attr("href").match(/title=([^/&]+)/),r=n.attr("href").match(/[^/]+$/);o.length&&s&&(s=!new RegExp("\\b("+h.join("|")+")\\b").test(o.data("class"))),s&&(a||r)&&i.push(new l({el:n,filename:decodeURIComponent(a?a[1]:r[0])}))}),this._thumbs=i),this._thumbs},getSection:function(e){return this._sectionLookup[e]},getSections:function(){return this.sections},getRedLinks:function(){return this.$(".new")}}),u.newFromJSON=function(e){var t,i,o=e.thumbnail,r=e.pageprops||{displaytitle:n.escape(e.title)},l=e.terms;return(r||l)&&(i=l&&l.label?n.escape(l.label[0]):r.displaytitle),e.wikidataDescription=e.description||void 0,o&&(e.thumbnail.isLandscape=o.width>o.height),e.revisions&&e.revisions[0]&&(t=e.revisions[0],e.lastModified=s.getLastModifiedMessage(new Date(t.timestamp).getTime()/1e3,t.user)),new u(a.extend(e,{id:e.pageid,isMissing:!!e.missing,url:mw.util.getUrl(e.title),displayTitle:i}))},u.HEADING_SELECTOR=d,e.exports=u},function(e,t,i){var n=i(1),o=i(2);function s(e){e.hasText&&(e.modifier="mw-ui-icon-before"),e.href&&(e.tagName="a"),o.call(this,e)}n(s,o,{preRender:function(){this.setRotationClass()},setRotationClass:function(){var e=this.options;if(e.rotation)switch(e.rotation){case-180:case 180:e._rotationClass="mf-mw-ui-icon-rotate-flip";break;case-90:e._rotationClass="mf-mw-ui-icon-rotate-anti-clockwise";break;case 90:e._rotationClass="mf-mw-ui-icon-rotate-clockwise";break;case 0:break;default:throw new Error("Bad value for rotation given. Must be ±90, 0 or ±180.")}},isTemplateMode:!0,defaults:{rotation:0,hasText:!1,href:void 0,glyphPrefix:"mf",tagName:"div",isSmall:!1,base:"mw-ui-icon",name:"",modifier:"mw-ui-icon-element",title:""},getClassName:function(){return this.$el.attr("class")},getGlyphClassName:function(){return this.options.base+"-"+this.options.glyphPrefix+"-"+this.options.name},toHtmlString:function(){return this.parseHTML("<div>").append(this.$el).html()},template:mw.template.get("mobile.startup","icon.hogan")}),e.exports=s},function(e,t,i){var n=["seconds","minutes","hours","days","months","years"],o=i(0),s=[1,60,3600,86400,2592e3,31536e3];function a(e){for(var t=0;t<s.length&&e>s[t+1];)++t;return{value:Math.round(e/s[t]),unit:n[t]}}function r(e){return a(Math.round((new Date).getTime()/1e3)-e)}function l(e){return"seconds"===e.unit&&e.value<10}e.exports={getLastModifiedMessage:function(e,t,i,n){var s,a,c=[];return i=i||"unknown",l(s=r(e))?c.push("mobile-frontend-last-modified-with-user-just-now",i,t):c.push({seconds:"mobile-frontend-last-modified-with-user-seconds",minutes:"mobile-frontend-last-modified-with-user-minutes",hours:"mobile-frontend-last-modified-with-user-hours",days:"mobile-frontend-last-modified-with-user-days",months:"mobile-frontend-last-modified-with-user-months",years:"mobile-frontend-last-modified-with-user-years"}[s.unit],i,t,mw.language.convertNumber(s.value)),c.push(n||"#",mw.language.convertNumber(t?1:0),t?mw.util.getUrl("User:"+t):""),a=mw.message.apply(this,c).parse(),n?a:o.parseHTML("<div>").html(a).text()},getRegistrationMessage:function(e,t){var i,n=[];return t=t||"unknown",l(i=r(parseInt(e,10)))?n.push("mobile-frontend-joined-just-now",t):n.push({seconds:"mobile-frontend-joined-seconds",minutes:"mobile-frontend-joined-minutes",hours:"mobile-frontend-joined-hours",days:"mobile-frontend-joined-days",months:"mobile-frontend-joined-months",years:"mobile-frontend-joined-years"}[i.unit],t,mw.language.convertNumber(i.value)),mw.message.apply(this,n).parse()},timeAgo:a,getTimeAgoDelta:r,isNow:l,isRecent:function(e){return["seconds","minutes","hours"].indexOf(e.unit)>-1}}},,function(e,t){function i(){this._register={},OO.EventEmitter.call(this)}i.prototype={require:function(e){var t,i,n=this._register;function o(){if(!Object.hasOwnProperty.call(n,e))throw new Error("MobileFrontend Module not found: "+e);return n[e]}i=e.split("/");try{return(t=mw.loader.require(i[0]))[i[1]]?t[i[1]]:o()}catch(e){return o()}},define:function(e,t){var i=this;if(Object.hasOwnProperty.call(this._register,e))throw new Error("Module already exists: "+e);return this._register[e]=t,{deprecate:function(n){i.deprecate(n,t,e)}}},deprecate:function(e,t,i){var n;i&&(n="Use "+i+" instead."),mw.log.deprecate(this._register,e,t,n)}},OO.mixinClass(i,OO.EventEmitter),e.exports=i},function(e,t,i){var n=i(1),o=i(8),s=i(2);function a(e){var t=this;e.tag="h"+e.level,this.line=e.line,this.text=e.text,this.hasReferences=e.hasReferences||!1,this.id=e.id||null,this.anchor=e.anchor,this.subsections=[],(e.subsections||[]).forEach(function(e){t.subsections.push(new a(e))}),s.call(this,e)}n(a,s,{template:mw.template.get("mobile.startup","Section.hogan"),defaults:{line:void 0,text:"",spinner:o.spinner().toHtmlString()}}),e.exports=a},function(e,t,i){var n=i(1),o=i(2);function s(){o.apply(this,arguments)}n(s,o,{defaults:{filename:void 0},isBorderBox:!1,postRender:function(){this.options.description=this.$el.siblings(".thumbcaption").text()},getDescription:function(){return this.options.description},getFileName:function(){return this.options.filename}}),e.exports=s},function(e,t,i){var n=i(15);e.exports=new n},,,function(e,t){function i(){this._cache={}}function n(){}i.prototype.get=function(e){return this._cache[e]},i.prototype.set=function(e,t){this._cache[e]=t},n.prototype.get=function(){},n.prototype.set=function(){},e.exports={MemoryCache:i,NoCache:n}},function(e,t,i){var n=i(0);function o(e){e.on("route",this._checkRoute.bind(this)),this.router=e,this.entries={},this.stack=[],this.hideCurrent=!0}i(1)(o,{_onHideOverlay:function(){this.hideCurrent=!1,this.router.back()},_showOverlay:function(e){e.once("_om_hide",this._onHideOverlay.bind(this)),e.show()},_hideOverlay:function(e){var t;return e.off("_om_hide"),(t=e.hide(this.stack.length>1))||e.once("_om_hide",this._onHideOverlay.bind(this)),t},_processMatch:function(e){var t,i=this;function n(e){e.on("hide",function(){e.emit("_om_hide")})}e&&(e.overlay?i._showOverlay(e.overlay):"function"==typeof(t=e.factoryResult).promise?t.then(function(t){e.overlay=t,n(t),i._showOverlay(t)}):(e.overlay=t,n(e.overlay),i._showOverlay(t)))},_checkRoute:function(e){var t,i=this.stack[0];i||(this.scrollTop=window.pageYOffset),t=Object.keys(this.entries).reduce(function(t,i){return t||this._matchRoute(e.path,this.entries[i])}.bind(this),null),i&&void 0!==i.overlay&&this.hideCurrent&&!this._hideOverlay(i.overlay)?e.preventDefault():t||(this.stack=[],window.scrollTo(window.pageXOffset,this.scrollTop)),this.hideCurrent=!0,this._processMatch(t)},_matchRoute:function(e,t){var i,n=e.match(t.route),o=this.stack[1],s=this;function a(){return{path:e,factoryResult:t.factory.apply(s,n.slice(1))}}return n?o&&o.path===e?o.overlay&&o.overlay.hasLoadError?(s.stack.shift(),s.stack[0]=a(),s.stack[0]):(s.stack.shift(),o):(i=a(),this.stack[0]&&i.path===this.stack[0].path?s.stack[0]=i:s.stack.unshift(i),i):null},add:function(e,t){var i=this,o={route:e,factory:t};this.entries[e]=o,n.docReady(function(){i._processMatch(i._matchRoute(i.router.getPath(),o))})},replaceCurrent:function(e){if(0===this.stack.length)throw new Error("Trying to replace OverlayManager's current overlay, but stack is empty");this._hideOverlay(this.stack[0].overlay),this.stack[0].overlay=e,this._showOverlay(e)}}),e.exports=o},function(e,t,i){var n=mw.template.get("mobile.startup","Section.hogan"),o=i(0),s={};function a(e){var t,i=e.map(function(e){return e.level}).filter(function(e){return!!e}),o=Math.min.apply(this,i).toString(),s=[];return e.forEach(function(e){void 0!==e.line&&(e.line=e.line.replace(/<\/?a\b[^>]*>/g,"")),e.subsections=[],!t||!e.level||e.level===o||t.subsections.length&&t.subsections[0].level>e.level||t.level&&t.level>=e.level?(s.push(e),t=e):(!function e(t,i){var n;0===t.length?t.push(i):(n=t[t.length-1],parseInt(n.level,10)===parseInt(i.level,10)?t.push(i):e(n.subsections,i))}(t.subsections,e),t.text+=n.render(e))}),s}function r(e){this.api=e}r.prototype={getPage:function(e,t,i){var n,r=o.Deferred(),l=t?{url:t,dataType:"jsonp"}:{},c={edit:["*"]};return s[e]||(s[e]=this.api.get({action:"mobileview",page:e,variant:mw.config.get("wgPageContentLanguage"),redirect:"yes",prop:"id|sections|text|lastmodified|lastmodifiedby|languagecount|hasvariants|protection|displaytitle|revision",noheadings:"yes",sectionprop:"level|line|anchor",sections:i?0:"all"},l).then(function(t){var i,s,l,d;return t.error?r.reject(t.error):t.mobileview.sections?(i=a((d=t.mobileview).sections),n=new Date(d.lastmodified).getTime()/1e3,s=d.lastmodifiedby,c=Array.isArray(d.protection)?c:o.extend(c,d.protection),l={title:e,id:d.id,revId:d.revId,protection:c,lead:i[0].text,sections:i.slice(1),isMainPage:void 0!==d.mainpage,historyUrl:mw.util.getUrl(e,{action:"history"}),lastModifiedTimestamp:n,languageCount:d.languagecount,hasVariants:void 0!==d.hasvariants,displayTitle:d.displaytitle},s&&o.extend(l,{lastModifiedUserName:s.name,lastModifiedUserGender:s.gender}),l):r.reject("No sections")},function(e){return r.reject(e)})),s[e]},invalidatePage:function(e){delete s[e]},_getLanguageVariantsFromApiResponse:function(e,t){var i=t.query.general,n=i.variantarticlepath,o=[];return!!i.variants&&(Object.keys(i.variants).forEach(function(t){var s=i.variants[t],a={autonym:s.name,lang:s.code};a.url=n?n.replace("$1",e).replace("$2",s.code):mw.util.getUrl(e,{variant:s.code}),o.push(a)}),o)},getPageLanguages:function(e,t){var i=this,n={action:"query",meta:"siteinfo",siprop:"general",prop:"langlinks",lllimit:"max",titles:e,formatversion:2};return t?(n.llprop="url|autonym|langname",n.llinlanguagecode=t):n.llprop="url|autonym",this.api.get(n).then(function(t){return{languages:t.query.pages[0].langlinks||[],variants:i._getLanguageVariantsFromApiResponse(e,t)}},function(){return o.Deferred().reject()})},_getAPIResponseFromHTML:function(e){var t=[];return e.find("h1,h2,h3,h4,h5,h6").each(function(){var i=this.tagName.substr(1),n=e.find(this).find(".mw-headline");n.length&&t.push({level:i,line:n.html(),anchor:n.attr("id")||"",text:""})}),t},getSectionsFromHTML:function(e){return a(this._getAPIResponseFromHTML(e))}},e.exports=r},function(e,t,i){var n=i(5).getSingleton(),o=i(2),s=i(0),a=i(11),r=s.Deferred,l=s.when,c=i(8),d=mw.viewport,h=c.spinner(),u=i(1),p=i(18);function m(e){var t,i=a.HEADING_SELECTOR,n=e.parent(),o=e.prevAll(i).eq(0);return o.length&&(t=o.find(".mw-headline").attr("id"))?t:n.length?m(n):null}function f(e){var t=this;this.page=e.page,this.name=e.name,e.mainMenu&&(this.mainMenu=e.mainMenu,mw.log.warn("Skin: Use of mainMenu is deprecated.")),o.call(this,e),this.referencesGateway=e.referencesGateway,mw.config.get("wgMFLazyLoadImages")&&s.docReady(function(){t.setupImageLoading()}),mw.config.get("wgMFLazyLoadReferences")&&p.on("before-section-toggled",this.lazyLoadReferences.bind(this))}u(f,o,{isBorderBox:!1,defaults:{page:void 0},events:{},postRender:function(){var e=this.$el;n.supportsAnimations()&&e.addClass("animations"),n.supportsTouchEvents()&&e.addClass("touch-events"),s.parseHTML('<div class="transparent-shield cloaked-element">').appendTo(e.find("#mw-mf-page-center")),this.emit("changed"),this.$("#mw-mf-page-center").on("click",this.emit.bind(this,"click"))},getUnloadedImages:function(e){return(e=e||this.$("#content")).find(".lazy-image-placeholder").toArray()},setupImageLoading:function(e){var t=this,i=1.5*s.getWindow().height(),n=this.loadImagesList.bind(this),o=this.getUnloadedImages(e);function a(){var e=[];return(o=s.grep(o,function(n){var o=t.$(n);return!o.length||!function(e){return d.isElementCloseToViewport(e[0],i)&&(e.is(":visible")||0===e.height())}(o)||(e.push(n),!1)})).length||(p.off("scroll:throttled",a),p.off("resize:throttled",a),p.off("section-toggled",a),t.off("changed",a)),n(e)}return p.on("scroll:throttled",a),p.on("resize:throttled",a),p.on("section-toggled",a),this.on("changed",a),a()},loadImagesList:function(e){var t,i=this.$.bind(this),n=this.loadImage.bind(this);return t=(e=e||this.getUnloadedImages()).map(function(e){return n(i(e))}),l.apply(null,t)},loadImage:function(e){var t=r(),i=e.attr("data-width"),n=e.attr("data-height"),o=s.parseHTML("<img>",this.$el[0].ownerDocument);return o.on("load",function(){o.addClass("image-lazy-loaded"),e.replaceWith(o),t.resolve()}),o.on("error",function(){t.reject()}),o.attr({class:e.attr("data-class"),width:i,height:n,src:e.attr("data-src"),alt:e.attr("data-alt"),style:e.attr("style"),srcset:e.attr("data-srcset")}),t},lazyLoadReferences:function(e){var t,i,n=this.referencesGateway,o=this.getUnloadedImages.bind(this),s=this.loadImagesList.bind(this),a=this;if(!e.wasExpanded&&e.isReferenceSection)return(t=e.$heading.next()).data("are-references-loaded")?r().reject().promise():(t.children().addClass("hidden"),i=h.$el.prependTo(t),n.getReferencesLists(e.page).then(function(){var o;t.find(".mf-lazy-references-placeholder").each(function(){var i=0,s=t.find(this),a=m(s);o!==a?(i=0,o=a):i++,a&&n.getReferencesList(e.page,a).then(function(e){e&&e[i]&&s.replaceWith(e[i])})}),i.remove(),t.children().removeClass("hidden"),a.emit("references-loaded",a.page),l()},function(){i.remove(),t.children().removeClass("hidden"),l()}));function l(){s(o(t)),t.data("are-references-loaded",1)}},getLicenseMsg:function(){var e,t=mw.config.get("wgMFLicense"),i=mw.language.convertNumber(t.plural);return t.link&&(e=this.$("#footer-places-terms-use").length>0?mw.msg("mobile-frontend-editor-licensing-with-terms",mw.message("mobile-frontend-editor-terms-link",this.$("#footer-places-terms-use a").attr("href")).parse(),t.link,i):mw.msg("mobile-frontend-editor-licensing",t.link,i)),e}}),f.getSectionId=m,e.exports=f},function(e,t,i){var n=i(1),o=i(2);function s(e){e.href&&(e.tagName="a"),o.call(this,e)}n(s,o,{isTemplateMode:!0,defaults:{tagName:"a",block:void 0,progressive:void 0,destructive:void 0,quiet:void 0,additionalClassNames:"",href:void 0,label:void 0},template:mw.template.get("mobile.startup","button.hogan")}),e.exports=s},function(e,t,i){var n=i(2);function o(){n.apply(this,arguments)}i(1)(o,n,{isTemplateMode:!0,defaults:{progressive:void 0,destructive:void 0,additionalClassNames:"",href:void 0,label:void 0},template:mw.template.get("mobile.startup","anchor.hogan")}),e.exports=o},,,function(e,t,i){var n=i(1),o=i(2);function s(){o.apply(this,arguments)}n(s,o,{className:"panel",minHideDelay:10,events:{"click .cancel":"onCancel"},onCancel:function(e){e.preventDefault(),this.hide()},show:function(){var e=this;e.isVisible()||setTimeout(function(){e.$el.addClass("visible animated"),e.emit("show")},e.minHideDelay)},hide:function(){var e=this;setTimeout(function(){e.$el.removeClass("visible"),e.emit("hide")},e.minHideDelay)},isVisible:function(){return this.$el.hasClass("visible")},toggle:function(){this.isVisible()?this.hide():this.show()}}),e.exports=s},function(e,t,i){var n=i(2),o=i(12),s=i(25),a=i(26),r=i(8),l=i(0),c=i(5).getSingleton();function d(){this.isIos=c.isIos(),this.useVirtualKeyboardHack=c.isIos(4)||c.isIos(5),this.hasLoadError=!1,n.apply(this,arguments)}i(1)(d,n,{hasFixedHeader:!0,fullScreen:!0,hideOnExitClick:!0,appendToElement:"#mw-mf-viewport",className:"overlay",templatePartials:{header:mw.template.get("mobile.startup","header.hogan"),anchor:a.prototype.template,button:s.prototype.template},template:mw.template.get("mobile.startup","Overlay.hogan"),defaults:{saveMsg:mw.msg("mobile-frontend-editor-save"),cancelButton:new o({tagName:"button",name:"overlay-close",additionalClassNames:"cancel",label:mw.msg("mobile-frontend-overlay-close")}).toHtmlString(),backButton:new o({tagName:"button",name:"back",additionalClassNames:"back",label:mw.msg("mobile-frontend-overlay-close")}).toHtmlString(),headerButtonsListClassName:"",headerChrome:!1,fixedHeader:!0,spinner:r.spinner().toHtmlString()},events:{"click .cancel, .confirm, .initial-header .back":"onExitClick",click:"stopPropagation"},closeOnContentTap:!1,showSpinner:function(){this.$spinner.removeClass("hidden")},hideSpinner:function(){this.$spinner.addClass("hidden")},postRender:function(){this.$overlayContent=this.$(".overlay-content"),this.$spinner=this.$(".spinner"),this.isIos&&this.$el.addClass("overlay-ios"),this.$(".overlay-header h2 span").addClass("truncated-text"),this.setupEmulatedIosOverlayScrolling()},setupEmulatedIosOverlayScrolling:function(){var e=this;this.isIos&&this.hasFixedHeader&&(this.$(".overlay-content").on("touchstart",this.onTouchStart.bind(this)).on("touchmove",this.onTouchMove.bind(this)),setTimeout(function(){e._fixIosHeader(e.$("textarea, input"))},0))},onExitClick:function(e){e.preventDefault(),e.stopPropagation(),this.hideOnExitClick&&this.hide(),this.emit(d.EVENT_EXIT)},onTouchStart:function(e){this.startY=e.originalEvent.touches[0].pageY},onTouchMove:function(e){var t=e.originalEvent.touches[0].pageY,i=this.$overlayContent.outerHeight(),n=this.$overlayContent.prop("scrollHeight")-i;e.stopPropagation(),(0===this.$overlayContent.scrollTop()&&this.startY<t||this.$overlayContent.scrollTop()===n&&this.startY>t)&&e.preventDefault()},stopPropagation:function(e){e.stopPropagation()},show:function(){var e=this,t=l.getDocument(),i=l.getWindow();this.$el.appendTo(this.appendToElement),this.scrollTop=window.pageYOffset,this.fullScreen&&(t.addClass("overlay-enabled"),window.scrollTo(0,1)),this.closeOnContentTap&&t.find("#mw-mf-page-center").one("click",this.hide.bind(this)),this.isIos&&this.hasFixedHeader&&i.on("touchmove.ios",function(e){e.preventDefault()}).on("resize.ios",function(){e._resizeContent(i.height())}),this.$el.addClass("visible")},hide:function(){var e=l.getWindow(),t=l.getDocument();return this.fullScreen&&(t.removeClass("overlay-enabled"),window.scrollTo(window.pageXOffset,this.scrollTop)),this.$el.detach(),this.isIos&&e.off(".ios"),this.emit("hide"),!0},_resizeContent:function(e){this.$overlayContent.height(e-this.$(".overlay-header-container").outerHeight()-this.$(".overlay-footer-container").outerHeight())},_fixIosHeader:function(e){var t=this,i=l.getWindow();this.isIos&&(this._resizeContent(i.height()),e.on("focus",function(){setTimeout(function(){var e=0;t.useVirtualKeyboardHack&&(i.scrollTop(999),e=i.scrollTop(),i.scrollTop(0)),i.height()>e&&t._resizeContent(i.height()-e)},0)}).on("blur",function(){t._resizeContent(i.height()),i.scrollTop(0)}))},showHidden:function(e){this.$(".hideable").addClass("hidden"),this.$(e).removeClass("hidden")}}),d.EVENT_EXIT="Overlay-exit",e.exports=d},function(e,t,i){var n=i(30);function o(){n.apply(this,arguments)}i(1)(o,n,{className:"overlay overlay-loading",template:mw.template.get("mobile.startup","LoadingOverlay.hogan")}),e.exports=o},function(e,t,i){var n=i(1),o=i(29),s=i(0),a=i(12);function r(){o.apply(this,arguments)}n(r,o,{defaults:s.extend({},o.prototype.defaults,{cancelButton:new a({tagName:"a",name:"close-invert",additionalClassNames:"cancel",label:mw.msg("mobile-frontend-overlay-close")}).toHtmlString(),collapseIcon:new a({name:"arrow",additionalClassNames:"cancel"}).options}),templatePartials:s.extend({},o.prototype.templatePartials,{icon:a.prototype.template}),className:"drawer position-fixed",appendToElement:"body",closeOnScroll:!0,events:s.extend({},o.prototype.events,{click:"stopPropagation"}),postRender:function(){var e=this;s.docReady(function(){e.appendTo(e.appendToElement),e.$el.parent().addClass("has-drawer")}),this.on("show",this.onShowDrawer.bind(this)),this.on("hide",this.onHideDrawer.bind(this))},stopPropagation:function(e){e.stopPropagation()},onShowDrawer:function(){var e=this;this.$el.parent().addClass("drawer-visible"),setTimeout(function(){var t=s.getWindow();t.one("click.drawer",e.hide.bind(e)),e.closeOnScroll&&t.one("scroll.drawer",e.hide.bind(e))},e.minHideDelay)},onHideDrawer:function(){this.$el.parent().removeClass("drawer-visible"),s.getWindow().off(".drawer")}}),e.exports=r},,,,,,,,,,,,,,,,,,,,,,function(e,t,i){var n=i(18),o=i(1),s=i(55),a=i(13),r=i(56),l=i(0),c=i(2),d=i(23),h=i(5),u=i(21),p=i(25),m=i(12),f=i(8),g=i(29),v=i(16),w=i(17),b=i(11),y=i(26),x=i(24),$=i(22),T=i(30),C=i(31),k=i(32),_=i(57),I=i(58),M=i(59),O=i(60);mw.mobileFrontend=n,mw.log.deprecate(n,"on",n.on,"The global EventEmitter should not be used (T156186)."),OO.mfExtend=o,mw.mobileFrontend.define("mobile.startup/util",l),mw.mobileFrontend.define("mobile.startup/View",c),mw.mobileFrontend.define("mobile.startup/Browser",h),mw.mobileFrontend.define("mobile.startup/cache",u),mw.mobileFrontend.define("mobile.startup/time",a),mw.mobileFrontend.define("mobile.startup/context",s),mw.mobileFrontend.define("mobile.startup/user",r),mw.mobileFrontend.define("mobile.startup/PageGateway",d),mw.mobileFrontend.define("mobile.startup/Button",p),mw.mobileFrontend.define("mobile.startup/Icon",m),mw.mobileFrontend.define("mobile.startup/icons",f),mw.mobileFrontend.define("mobile.startup/Panel",g),mw.mobileFrontend.define("mobile.startup/Section",v),mw.mobileFrontend.define("mobile.startup/Thumbnail",w),mw.mobileFrontend.define("mobile.startup/Page",b),mw.mobileFrontend.define("mobile.startup/Anchor",y),mw.mobileFrontend.define("mobile.startup/Skin",x),mw.mobileFrontend.define("mobile.startup/OverlayManager",$),mw.mobileFrontend.define("mobile.startup/Overlay",T),mw.mobileFrontend.define("mobile.startup/LoadingOverlay",C),mw.mobileFrontend.define("mobile.startup/Drawer",k),mw.mobileFrontend.define("mobile.startup/CtaDrawer",_),mw.mobileFrontend.define("mobile.startup/PageList",I),mw.mobileFrontend.define("mobile.startup/toast",M),mw.mobileFrontend.define("mobile.startup/rlModuleLoader",O),e.exports={moduleLoader:n,time:a,util:l,View:c,Browser:h,context:s,cache:u,Button:p,Icon:m,icons:f,Panel:g,Section:v,Page:b,Anchor:y,Skin:x,OverlayManager:$,Overlay:T,LoadingOverlay:C,Drawer:k,CtaDrawer:_,PageList:I,toast:M,rlModuleLoader:O}},function(e,t){var i={getMode:function(){return mw.config.get("wgMFMode")}};e.exports=i},function(e,t,i){var n,o=mw.user,s=i(0);n={tokens:o.tokens,isAnon:o.isAnon,getName:o.getName,getId:o.getId,getEditCount:function(){return mw.config.get("wgUserEditCount")},getGroups:function(){return s.Deferred().resolve(mw.config.get("wgUserGroups"))},getSessionId:function(){return o.sessionId()},inUserBucketA:function(){return mw.config.get("wgUserId")%2==0}},e.exports=n},function(e,t,i){var n=i(1),o=i(32),s=i(0),a=i(25),r=i(26);function l(){o.apply(this,arguments)}n(l,o,{defaults:s.extend({},o.prototype.defaults,{progressiveButton:new a({progressive:!0,label:mw.msg("mobile-frontend-watchlist-cta-button-login")}).options,actionAnchor:new r({progressive:!0,label:mw.msg("mobile-frontend-watchlist-cta-button-signup")}).options}),templatePartials:s.extend({},o.prototype.templatePartials,{button:a.prototype.template,anchor:r.prototype.template}),template:mw.template.get("mobile.startup","Cta.hogan"),events:s.extend({},o.prototype.events,{"click .hide":"hide"}),preRender:function(){var e=s.extend({returnto:this.options.returnTo||mw.config.get("wgPageName")},this.options.queryParams),t=s.extend({type:"signup"},this.options.signupQueryParams);this.options.progressiveButton.href||(this.options.progressiveButton.href=mw.util.getUrl("Special:UserLogin",e)),this.options.actionAnchor.href||(this.options.actionAnchor.href=mw.util.getUrl("Special:UserLogin",s.extend(e,t)))}}),e.exports=l},function(e,t,i){var n=i(1),o=i(2),s=i(5).getSingleton();function a(){o.apply(this,arguments)}n(a,o,{defaults:{pages:[]},renderPageImages:function(){var e=this;setTimeout(function(){e.$(".list-thumb").each(function(){var t=e.$(this).data("style");e.$(this).attr("style",t)})},s.isWideScreen()?0:1e3)},postRender:function(){this.renderPageImages()},template:mw.template.get("mobile.startup","PageList.hogan"),templatePartials:{item:mw.template.get("mobile.startup","PageListItem.hogan")}}),e.exports=a},function(e,t,i){var n=i(0),o="mobileFrontend/toast";function s(){mw.requestIdleCallback(this._showPending.bind(this))}s.prototype.show=function(e,t){"string"==typeof t&&(mw.log.warn("The use of the cssClass parameter of Toast.show is deprecated, please convert it to an options object."),t={type:t}),t=n.extend({tag:"toast"},t),this.notification=mw.notify(e,t)},s.prototype.hide=function(){void 0!==this.notification&&this.notification.then(function(e){e.close()})},s.prototype.showOnPageReload=function(e,t){mw.storage.get(o)?mw.log.warn("A pending toast message already exits. The page should have been reloaded by now."):mw.storage.set(o,JSON.stringify({content:e,className:t}))},s.prototype._showPending=function(){var e=mw.storage.get(o);e&&(e=JSON.parse(e),this.show(e.content,e.className),mw.storage.remove(o))},e.exports=new s},function(e,t,i){var n=i(31);e.exports={loadModule:function(e,t,i){var o=new n;function s(){!t&&i&&o.hide()}return(i=void 0===i||i)&&o.show(),mw.loader.using(e).then(function(){return s(),o},function(){s()})}}}],[[54,0]]]);
//# sourceMappingURL=mobile.startup.js.map.json
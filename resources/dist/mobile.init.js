this.mfModules=this.mfModules||{},this.mfModules["mobile.init"]=(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"./src/mobile.init/editor.js":function(e,t,i){var o=i("./src/mobile.startup/moduleLoaderSingleton.js"),n=i("./src/mobile.startup/util.js"),a=i("./src/mobile.init/editorLoadingOverlay.js"),r=i("./src/mobile.startup/OverlayManager.js"),s=$("#ca-edit, .mw-editsection a, .edit-link"),c=mw.user,m=i("./src/mobile.startup/CtaDrawer.js"),l=mw.config.get("wgPageContentModel"),d=mw.config.get("wgVisualEditorConfig"),g=mw.config.get("wgUserEditCount"),u=/^\/editor\/(\d+|T-\d+|all)$/;function w(e,t,i,m){var l,w,f,p=r.getSingleton(),v=0===e.id,h=!1;s.on("click",(function(e){!function(e,t,i){var o;o=1===s.length?"all":mw.util.getParamValue("section",e.href)||"all",mw.config.get("wgPageName")===mw.util.getParamValue("title",e.href)&&(i.navigate("#/editor/"+o),t.preventDefault())}(this,e,p.router)})),p.add(u,(function(r){var s,m,l,u,w=window.pageYOffset,b=$("#mw-content-text"),S={overlayManager:p,currentPageHTMLParser:i,fakeScroll:0,api:new mw.Api,licenseMsg:t.getLicenseMsg(),title:e.title,titleObj:e.titleObj,isAnon:c.isAnon(),isNewPage:v,editCount:g,oldId:mw.util.getParamValue("oldid"),contentLang:b.attr("lang"),contentDir:b.attr("dir"),sessionId:mw.config.get("wgWMESchemaEditAttemptStepSessionId")||mw.Uri().query.editingStatsId||c.generateRandomSessionId()},E=mw.util.getParamValue("redlink")?"new":"click";function y(e){h&&(S.sessionId=c.generateRandomSessionId()),mw.track("mf.schemaEditAttemptStep",{action:"init",type:"section",mechanism:E,editor_interface:e,editing_session_id:S.sessionId}),h=!0}function k(){var t=!!d,i=function(){var e,t,i=mw.user.options.get("mobile-editor")||mw.storage.get("preferredEditor");if(i)return i;switch(e=mw.config.get("wgMFDefaultEditor"),(t=mw.storage.getObject("MFDefaultEditorABToken"))&&t.expires<Date.now()&&(mw.storage.remove("MFDefaultEditorABToken"),t=null),"abtest"===e&&(mw.user.isAnon()?(t||(t={token:mw.user.generateRandomSessionId(),expires:Date.now()+7776e6},mw.storage.setObject("MFDefaultEditorABToken",t)),mw.config.set("wgMFSchemaEditAttemptStepAnonymousUserId",t.token),e=parseInt(t.token.slice(0,8),16)%2==0?"source":"visual",mw.config.set("wgMFSchemaEditAttemptStepBucket","default-"+e)):mw.config.get("wgUserEditCount")<=100?(e=mw.user.getId()%2==0?"source":"visual",mw.config.set("wgMFSchemaEditAttemptStepBucket","default-"+e)):e="preference"),e){case"source":return"SourceEditor";case"visual":return"VisualEditor";case"preference":return(mw.user.options.get("visualeditor-hidebetawelcome")||mw.user.options.get("visualeditor-hideusered"))&&"visualeditor"===mw.user.options.get("visualeditor-editor")?"VisualEditor":"SourceEditor"}return"SourceEditor"}(),o=d&&d.namespaces||[];return t&&e.isWikiText()&&-1!==o.indexOf(mw.config.get("wgNamespaceNumber"))&&"translation"!==mw.config.get("wgTranslatePageTranslation")&&("VisualEditor"===i||"VisualEditor"===f)&&"SourceEditor"!==f}function A(){return y("wikitext"),mw.hook("mobileFrontend.editorOpening").fire(),mw.loader.using("mobile.editor.overlay").then((function(){return new(o.require("mobile.editor.overlay/SourceEditorOverlay"))(S)}))}return"all"!==r&&(S.sectionId=e.isWikiText()?r:void 0),s=n.Deferred(),l=a((function(){var e,t,i,o,n;$(document.body).addClass("ve-loading"),e=$("#mw-mf-page-center"),t=$("#content"),"0"===r||"all"===r?i=$("#bodyContent"):(i=$('[data-section="'+r+'"]').closest("h1, h2, h3, h4, h5, h6")).length||(i=$("#bodyContent")),e.prop("scrollTop",w),o=i[0].getBoundingClientRect().top,o-=48,k()?(n=!0===d.enableVisualSectionEditing||"mobile"===d.enableVisualSectionEditing,("0"===r||"all"===r||n)&&(o-=16)):"0"!==r&&"all"!==r||(o-=16),t.css({transform:"translate( 0, "+-o+"px )","padding-bottom":"+="+o,"margin-bottom":"-="+o}),S.fakeScroll=o,setTimeout(s.resolve,500)}),(function(){m&&m.abort&&m.abort(),$("#content").css({transform:"","padding-bottom":"","margin-bottom":""}),$(document.body).removeClass("ve-loading")})),k()?(y("visualeditor"),mw.hook("mobileFrontend.editorOpening").fire(),S.mode="visual",S.dataPromise=mw.loader.using("ext.visualEditor.targetLoader").then((function(){return m=mw.libs.ve.targetLoader.requestPageData(S.mode,S.titleObj.getPrefixedDb(),{sessionStore:!0,section:void 0===S.sectionId?null:S.sectionId,oldId:S.oldId||void 0,targetName:"mobile"})})),u=mw.loader.using("ext.visualEditor.targetLoader").then((function(){return mw.libs.ve.targetLoader.addPlugin("mobile.editor.ve"),mw.libs.ve.targetLoader.loadModules(S.mode)})).then((function(){var e=o.require("mobile.editor.overlay/VisualEditorOverlay"),t=o.require("mobile.editor.overlay/SourceEditorOverlay");return S.SourceEditorOverlay=t,new e(S)}),(function(){return A()}))):u=A(),n.Promise.all([u,s]).then((function(e){e.getLoadingPromise().then((function(){var t=p.stack[0];t&&t.overlay===l&&p.replaceCurrent(e)}),(function(e,t){p.router.back(),e.show?(document.body.appendChild(e.$el[0]),e.show()):t?mw.notify(S.api.getErrorMessage(t)):mw.notify(mw.msg("mobile-frontend-editor-error-loading"))}))})),l})),$("#ca-edit a").prop("href",(function(e,t){try{var i=new mw.Uri(t);return i.query.section="0",i.toString()}catch(e){return t}})),m.getPath()||!mw.util.getParamValue("veaction")&&"edit"!==mw.util.getParamValue("action")||("edit"===mw.util.getParamValue("veaction")?f="VisualEditor":"editsource"===mw.util.getParamValue("veaction")&&(f="SourceEditor"),w="#/editor/"+(mw.util.getParamValue("section")||"edit"===mw.util.getParamValue("action")&&"all"||"0"),window.history&&history.pushState?(delete(l=mw.Uri()).query.action,delete l.query.veaction,delete l.query.section,history.replaceState(null,document.title,l.toString()+w)):m.navigate(w))}function f(e,t,i,o){var n,a;if(!(n=mw.config.get("wgMinervaReadOnly"))&&mw.config.get("wgIsProbablyEditable"))w(e,i,t,o);else if(function(e){e.$el.find(".mw-editsection").hide()}(t),a=mw.config.get("wgRestrictionEdit"),mw.user.isAnon()&&Array.isArray(a)&&-1!==a.indexOf("*"))!function(e){var t;function i(){t||(t=new m({content:mw.msg("mobile-frontend-editor-disabled-anon"),signupQueryParams:{warning:"mobile-frontend-watchlist-signup-action"}})),t.show()}s.on("click",(function(e){i(),e.preventDefault()})),e.route(u,(function(){i()})),e.checkRoute()}(o);else{var r=$("<a>").attr("href","/wiki/"+mw.config.get("wgPageName")+"?action=edit");p(n?mw.msg("apierror-readonly"):mw.message("mobile-frontend-editor-disabled",r).parseDom(),o)}}function p(e,t){s.on("click",(function(t){mw.notify(e),t.preventDefault()})),t.route(u,(function(){mw.notify(e)})),t.checkRoute()}e.exports=function(e,t,i){var o=0===e.id,n=mw.loader.require("mediawiki.router"),a=n.isSupported();"wikitext"===l&&(mw.util.getParamValue("undo")||a&&(e.inNamespace("file")&&o?p(mw.msg("mobile-frontend-editor-uploadenable"),n):f(e,t,i,n)))}},"./src/mobile.init/editorLoadingOverlay.js":function(e,t,i){var o=i("./src/mobile.init/fakeToolbar.js"),n=i("./src/mobile.startup/Overlay.js");e.exports=function(e,t){var i=o(),a=new n({className:"overlay overlay-loading",noHeader:!0,isBorderBox:!1,onBeforeExit:function(e){e(),t()}});return a.show=function(){n.prototype.show.call(this),e()},i.appendTo(a.$el.find(".overlay-content")),i.addClass("toolbar-hidden"),setTimeout((function(){i.addClass("toolbar-shown"),setTimeout((function(){i.addClass("toolbar-shown-done")}),250)})),a}},"./src/mobile.init/eventLogging/schemaEditAttemptStep.js":function(e,t){e.exports=function(){var e,t,i,o,n,a,r=!!mw.util.getParamValue("trackdebug");mw.config.exists("wgWMESchemaEditAttemptStepSamplingRate")&&(e=mw.eventLog.Schema,t=mw.user,i=mw.config.get("wgWMESchemaEditAttemptStepSamplingRate"),o={firstChange:"first_change",saveIntent:"save_intent",saveAttempt:"save_attempt",saveSuccess:"save_success",saveFailure:"save_failure"},n={},a=new e("EditAttemptStep",i,{page_id:mw.config.get("wgArticleId"),revision_id:mw.config.get("wgRevisionId"),page_title:mw.config.get("wgPageName"),page_ns:mw.config.get("wgNamespaceNumber"),user_id:t.getId(),user_class:t.isAnon()?"IP":void 0,user_editcount:mw.config.get("wgUserEditCount",0),mw_version:mw.config.get("wgVersion"),platform:"phone",integration:"page",page_token:t.getPageviewToken(),session_token:t.sessionId(),version:1}),mw.trackSubscribe("mf.schemaEditAttemptStep",(function(e,t){var s=o[t.action]||t.action,c=mw.now(),m=0;if(mw.storage.get("preferredEditor")||(mw.config.get("wgMFSchemaEditAttemptStepAnonymousUserId")&&(t.anonymous_user_token=mw.config.get("wgMFSchemaEditAttemptStepAnonymousUserId")),mw.config.get("wgMFSchemaEditAttemptStepBucket")&&(t.bucket=mw.config.get("wgMFSchemaEditAttemptStepBucket"))),"init"!==t.action&&"abort"!==t.action&&"saveFailure"!==t.action||(t[s+"_type"]=t.type),"init"!==t.action&&"abort"!==t.action||(t[s+"_mechanism"]=t.mechanism),"init"!==t.action&&(m=Math.round(function(e,t,i){if(void 0!==t.timing)return t.timing;switch(e){case"ready":case"loaded":return i-n.init;case"firstChange":case"saveIntent":return i-n.ready;case"saveAttempt":return i-n.saveIntent;case"saveSuccess":case"saveFailure":return mw.log.warn("mf.schemaEditAttemptStep: Do not rely on default timing value for saveSuccess/saveFailure"),-1;case"abort":switch(t.abort_type){case"preinit":return i-n.init;case"nochange":case"switchwith":case"switchwithout":case"switchnochange":case"abandon":return i-n.ready;case"abandonMidsave":return i-n.saveAttempt}return mw.log.warn("mf.schemaEditAttemptStep: Unrecognized abort type",t.type),-1}return mw.log.warn("mf.schemaEditAttemptStep: Unrecognized action",e),-1}(t.action,t,c)),t[s+"_timing"]=m),"saveFailure"===t.action&&(t[s+"_message"]=t.message),delete t.type,delete t.mechanism,delete t.timing,delete t.message,t.is_oversample=!mw.eventLog.inSample(1/i),"abort"===t.action&&"switchnochange"!==t.abort_type?n={}:n[t.action]=c,"switchnochange"!==t.abort_type){if(n.abort){if("ready"===t.action)return;if("loaded"===t.action)return void delete n.abort}r?function(){console.log.apply(console,arguments)}(e+"."+t.action,m+"ms",t,a.defaults):a.log(t,mw.config.get("wgWMESchemaEditAttemptStepOversample")||"all"===mw.config.get("wgMFSchemaEditAttemptStepOversample")||t.editor_interface===mw.config.get("wgMFSchemaEditAttemptStepOversample")?1:i)}})))}},"./src/mobile.init/eventLogging/schemaVisualEditorFeatureUse.js":function(e,t){e.exports=function(){var e,t,i,o,n=!!mw.util.getParamValue("trackdebug");mw.config.exists("wgWMESchemaEditAttemptStepSamplingRate")&&(e=mw.eventLog.Schema,t=mw.user,i=mw.config.get("wgWMESchemaEditAttemptStepSamplingRate"),o=new e("VisualEditorFeatureUse",i,{user_id:t.getId(),user_editcount:mw.config.get("wgUserEditCount",0),platform:"phone",integration:"page"}),mw.trackSubscribe("mf.schemaVisualEditorFeatureUse",(function(e,t){var a={feature:t.feature,action:t.action,editingSessionId:t.editing_session_id,editor_interface:t.editor_interface};n?function(){console.log.apply(console,arguments)}(e,a,o.defaults):o.log(a,mw.config.get("wgWMESchemaEditAttemptStepOversample")||"visualeditor"===mw.config.get("wgMFSchemaEditAttemptStepOversample")||"all"===mw.config.get("wgMFSchemaEditAttemptStepOversample")?1:i)})))}},"./src/mobile.init/lazyLoadedImages.js":function(e,t,i){var o=i("./src/mobile.startup/lazyImages/lazyImageLoader.js");e.exports=function(){if(mw.config.get("wgMFLazyLoadImages")){var e=o.queryPlaceholders(document.getElementById("mw-content-text"));if("IntersectionObserver"in window){var t=new IntersectionObserver((function(e){e.forEach((function(e){var i=e.target;e.isIntersecting&&(o.loadImage(i),t.unobserve(i))}))}),{rootMargin:"0px 0px 50% 0px",threshold:0});e.forEach((function(e){t.observe(e)}))}else $(e).addClass("".concat(o.placeholderClass,"--tap")),document.addEventListener("click",(function(t){e.indexOf(t.target)>-1&&o.loadImage(t.target)}))}}},"./src/mobile.init/mobile.init.js":function(e,t,i){var o,n=mw.storage,a=i("./src/mobile.init/lazyLoadedImages.js"),r=mw.config.get("skin"),s=mw.config.get("wgMFIsPageContentModelEditable"),c=i("./src/mobile.init/editor.js"),m=i("./src/mobile.startup/currentPage.js")(),l=i("./src/mobile.startup/currentPageHTMLParser.js")(),d=i("./src/mobile.startup/util.js"),g=d.getWindow(),u=d.getDocument(),w=i("./src/mobile.startup/Skin.js"),f=i("./src/mobile.startup/eventBusSingleton.js"),p=i("./src/mobile.init/eventLogging/schemaEditAttemptStep.js"),v=i("./src/mobile.init/eventLogging/schemaVisualEditorFeatureUse.js");function h(e,t){return function(){e.apply(this,arguments),t.apply(this,arguments)}}function b(){var e=n.get("userFontSize","regular");u.addClass("mf-font-size-"+e)}o=w.getSingleton(),g.on("resize",h(mw.util.debounce(100,(function(){f.emit("resize")})),$.throttle(200,(function(){f.emit("resize:throttled")})))).on("scroll",h(mw.util.debounce(100,(function(){f.emit("scroll")})),$.throttle(200,(function(){f.emit("scroll:throttled")})))),g.on("pageshow",(function(){b()})),b(),window.console&&window.console.log&&window.console.log.apply&&mw.config.get("wgMFEnableJSConsoleRecruitment")&&console.log(mw.msg("mobile-frontend-console-recruit")),!m.inNamespace("special")&&s&&"minerva"===r&&null!==mw.config.get("wgMFMode")&&c(m,l,o),a(),mw.loader.using("ext.eventLogging").then((function(){p(),v()}))}},[["./src/mobile.init/mobile.init.js",0,1]]]);
//# sourceMappingURL=mobile.init.js.map.json
this.mfModules=this.mfModules||{},this.mfModules["mobile.init"]=(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"./src/mobile.init/BetaOptinPanel.js":function(e,t,n){var o=n("./src/mobile.startup/Button.js"),i=n("./src/mobile.startup/util.js"),s=n("./src/mobile.startup/mfExtend.js"),l=n("./src/mobile.startup/Panel.js"),a=mw.user;function r(e){l.call(this,i.extend({className:"panel panel-inline visible"},e))}s(r,l,{templatePartials:i.extend({},l.prototype.templatePartials,{button:o.prototype.template}),template:mw.template.get("mobile.init","Panel.hogan"),defaults:i.extend({},l.prototype.defaults,{postUrl:void 0,editToken:a.tokens.get("editToken"),text:mw.msg("mobile-frontend-panel-betaoptin-msg"),buttons:[new o({progressive:!0,additionalClassNames:"optin",label:mw.msg("mobile-frontend-panel-ok")}).options,new o({additionalClassNames:"cancel",label:mw.msg("mobile-frontend-panel-cancel")}).options]}),events:i.extend({},l.prototype.events,{"click .optin":"onOptin"}),onOptin:function(e){this.$(e.currentTarget).closest("form").submit()}}),e.exports=r},"./src/mobile.init/mobile.init.js":function(e,t,n){var o,i,s=mw.storage,l=n("./src/mobile.startup/PageGateway.js"),a=n("./src/mobile.init/BetaOptinPanel.js"),r=new l(new mw.Api),m=mw.util,c=n("./src/mobile.startup/util.js"),p=c.getWindow(),g=c.getDocument(),u=mw.user,w=n("./src/mobile.startup/context.js"),b=n("./src/mobile.startup/Page.js"),d=mw.experiments,f=mw.config.get("wgMFExperiments")||{},h=n("./src/mobile.startup/Skin.js"),x=n("./src/mobile.startup/eventBusSingleton.js"),y=n("./src/mobile.startup/references/ReferencesMobileViewGateway.js");function j(e,t){return function(){return[e.apply(this,arguments),t.apply(this,arguments)]}}function v(){return o||function(){var e=mw.config.get("wgRestrictionEdit",[]),t=$("#content #bodyContent");0===e.length&&e.push("*");return o=new b({el:t,title:mw.config.get("wgPageName").replace(/_/g," "),protection:{edit:e},revId:mw.config.get("wgRevisionId"),isMainPage:mw.config.get("wgIsMainPage"),isWatched:$("#ca-watch").hasClass("watched"),sections:r.getSectionsFromHTML(t),isMissing:0===mw.config.get("wgArticleId"),id:mw.config.get("wgArticleId"),namespaceNumber:mw.config.get("wgNamespaceNumber")})}()}function P(){var e=s.get("userFontSize","regular");g.addClass("mf-font-size-"+e)}i=new h({el:"body",page:v(),referencesGateway:y.getSingleton(),eventBus:x}),p.on("resize",j($.debounce(100,$.proxy(x,"emit","resize")),$.throttle(200,$.proxy(x,"emit","resize:throttled")))).on("scroll",j($.debounce(100,$.proxy(x,"emit","scroll")),$.throttle(200,$.proxy(x,"emit","scroll:throttled")))),p.on("pageshow",function(){P()}),P(),f.betaoptin&&function(e,t){var n,o,i,l=s.get("mobile-betaoptin-token");!1===l||"~"===l||t.isMainPage()||t.inNamespace("special")||(l||(l=u.generateRandomSessionId(),s.set("mobile-betaoptin-token",l)),o="stable"===w.getMode(),i="A"===d.getBucket(e,l),o&&(i||m.getParamValue("debug"))&&(n=new a({postUrl:m.getUrl("Special:MobileOptions",{returnto:t.title})})).on("hide",function(){s.set("mobile-betaoptin-token","~")}).appendTo(t.getLeadSectionElement()),mw.track("mobile.betaoptin",{isPanelShown:void 0!==n}))}(f.betaoptin,v()),window.console&&window.console.log&&window.console.log.apply&&mw.config.get("wgMFEnableJSConsoleRecruitment")&&console.log(mw.msg("mobile-frontend-console-recruit")),t={getCurrentPage:v},c.extend(mw.mobileFrontend,t),mw.mobileFrontend.define("mobile.init/skin",i),e.exports=t}},[["./src/mobile.init/mobile.init.js",0,1]]]);
//# sourceMappingURL=mobile.init.js.map.json
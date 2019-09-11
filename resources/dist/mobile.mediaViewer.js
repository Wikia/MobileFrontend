this.mfModules=this.mfModules||{},this.mfModules["mobile.mediaViewer"]=(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"./src/mobile.mediaViewer/ImageCarousel.js":function(e,t,i){var a=i("./src/mobile.startup/View.js"),s=i("./src/mobile.startup/util.js"),n=i("./src/mobile.startup/mfExtend.js"),r=i("./src/mobile.startup/Icon.js"),o=i("./src/mobile.startup/icons.js"),l=new(i("./src/mobile.startup/Button.js"))({label:mw.msg("mobile-frontend-media-details"),additionalClassNames:"button",progressive:!0}),d=new r({rotation:90,name:"expand-invert"}),h=new r({rotation:-90,name:"expand-invert"}),m=i("./src/mobile.mediaViewer/LoadErrorMessage.js"),u=i("./src/mobile.mediaViewer/ImageGateway.js"),c=mw.loader.require("mediawiki.router");function p(e){this.gateway=e.gateway||new u({api:e.api}),this.router=e.router||c,this.eventBus=e.eventBus,this.hasLoadError=!1,a.call(this,s.extend({className:"image-carousel",events:{"click .image-wrapper":"onToggleDetails","click .slider-button":"onSlide"}},e))}n(p,a,{template:s.template('\n<button class="prev slider-button"></button>\n<div class="main">\n\t<div class="image-wrapper">\n\t\t<div class="image"></div>\n\t</div>\n\t\x3c!-- cancel button will go here --\x3e\n\t<div class="image-details">\n\t\t\x3c!-- details button will go here --\x3e\n\t\t<p class="truncated-text">{{caption}}</p>\n\t\t<p class="license"><a href="#">{{licenseLinkMsg}}</a></p>\n\t</div>\n</div>\n<button class="next slider-button"></button>\n\t'),defaults:s.extend({},a.prototype.defaults,{licenseLinkMsg:mw.msg("mobile-frontend-media-license-link"),thumbnails:[]}),onSlide:function(e){var t,i=this.$el.find(e.target).closest(".slider-button").data("thumbnail"),a=i.options.filename;this.router.navigateTo(null,{path:"#/media/"+a,useReplaceState:!0}),this.options.title=i.options.filename,t=new p(this.options),this.$el.replaceWith(t.$el),this.$el=t.$el},preRender:function(){var e=this;this.options.thumbnails.forEach(function(t,i){t.getFileName()===e.options.title&&(e.options.caption=t.getDescription(),e.galleryOffset=i)})},_enableArrowImages:function(e){var t,i,a=this.galleryOffset;void 0===this.galleryOffset?(t=e[e.length-1],i=e[0]):(t=e[0===a?e.length-1:a-1],i=e[a===e.length-1?0:a+1]),this.$el.find(".prev").data("thumbnail",t),this.$el.find(".next").data("thumbnail",i)},_disableArrowImages:function(){this.$el.find(".prev, .next").remove()},_handleRetry:function(){this.router.emit("hashchange")},postRender:function(){var e,t=this.$el,i=o.spinner().$el,a=this.options.thumbnails||[],s=this;function n(){s.hasLoadError=!0,i.hide(),t.find(".image img").hide(),0===t.find(".load-fail-msg").length&&new m({retryPath:s.router.getPath()}).on("retry",s._handleRetry.bind(s)).prependTo(t.find(".image"))}function r(){e.addClass("image-loaded")}a.length<2?this._disableArrowImages():this._enableArrowImages(a),this.$details=t.find(".image-details"),t.find(".image").append(i),this.$details.prepend(l.$el),this.gateway.getThumb(s.options.title).then(function(a){var o,l=a.descriptionurl+"#mw-jump-to-license";i.hide(),s.thumbWidth=a.thumbwidth,s.thumbHeight=a.thumbheight,s.imgRatio=a.thumbwidth/a.thumbheight,(e=s.parseHTML("<img>",document)).on("load",r).on("error",n),e.attr("src",a.thumburl).attr("alt",s.options.caption),t.find(".image").append(e),s.$details.addClass("is-visible"),s._positionImage(),t.find(".image-details a").attr("href",l),a.extmetadata&&(a.extmetadata.LicenseShortName&&t.find(".license a").text(a.extmetadata.LicenseShortName.value).attr("href",l),a.extmetadata.Artist&&(o=a.extmetadata.Artist.value.replace(/<.*?>/g,""),t.find(".license").prepend(o+" &bull; "))),s.adjustDetails()},function(){n()}),this.eventBus.on("resize:throttled",this._positionImage.bind(this)),this._positionImage()},onToggleDetails:function(){this.hasLoadError||(this.$el.find(".cancel, .slider-button").toggle(),this.$details.toggle(),this._positionImage())},_positionImage:function(){var e,t,i,a,n,r=s.getWindow();this.adjustDetails(),e=this.$details.is(":visible")?this.$details.outerHeight():0,a=(t=r.width())/(i=r.height()-e),n=this.$el.find("img"),this.imgRatio>a?t<this.thumbWidth&&n.css({width:t,height:"auto"}):i<this.thumbHeight&&n.css({width:"auto",height:i}),this.$el.find(".image-wrapper").css("bottom",e),this.$el.find(".slider-button.prev").append(d.$el),this.$el.find(".slider-button.next").append(h.$el)},adjustDetails:function(){var e=s.getWindow().height();this.$el.find(".image-details").height()>.5*e&&this.$el.find(".image-details").css("max-height",.5*e)}}),e.exports=p},"./src/mobile.mediaViewer/ImageGateway.js":function(e,t,i){var a=[320,640,800,1024,1280,1920,2560,2880],s=i("./src/mobile.startup/actionParams.js"),n=i("./src/mobile.startup/util.js");function r(e){for(var t=0;e>a[t]&&t<a.length-1;)++t;return a[t]}function o(e){this._cache={},this.api=e.api}o.prototype.getThumb=function(e){var t=this._cache[e],i=n.getWindow(),a=window.devicePixelRatio&&window.devicePixelRatio>1?window.devicePixelRatio:1;return t||(this._cache[e]=this.api.get(s({prop:"imageinfo",titles:e,iiprop:["url","extmetadata"],iiurlwidth:r(i.width()*a),iiurlheight:r(i.height()*a)})).then(function(e){if(e.query&&e.query.pages&&e.query.pages[0]&&e.query.pages[0].imageinfo)return e.query.pages[0].imageinfo[0];throw new Error("The API failed to return any pages matching the titles.")})),this._cache[e]},o._findSizeBucket=r,e.exports=o},"./src/mobile.mediaViewer/LoadErrorMessage.js":function(e,t,i){var a=i("./src/mobile.startup/util.js"),s=i("./src/mobile.startup/mfExtend.js"),n=i("./src/mobile.startup/icons.js"),r=i("./src/mobile.startup/View.js");function o(e){if(!e.retryPath)throw new Error("'retryPath' must be set in options param. Received: "+e.retryPath);r.call(this,{events:{"click .load-fail-msg-link a":"onRetry"}},e)}s(o,r,{template:a.template('\n<div class="load-fail-msg">\n  <div class="load-fail-msg-text">{{msgToUser}}</div>\n  <div class="load-fail-msg-link">\n    <a href="#">{{retryTxt}}</a>\n  </div>\n</div>\n\t'),isTemplateMode:!0,defaults:a.extend({},o.prototype.defaults,{msgToUser:mw.msg("mobile-frontend-media-load-fail-message"),retryTxt:mw.msg("mobile-frontend-media-load-fail-retry")}),postRender:function(){this.$el.prepend(n.error().$el),this.$el.find(".load-fail-msg-link a").attr("href","#"+this.options.retryPath)},onRetry:function(){return this.emit("retry"),!1}}),e.exports=o},"./src/mobile.mediaViewer/mobile.mediaViewer.js":function(e,t,i){var a=i("./src/mobile.startup/moduleLoaderSingleton.js"),s=i("./src/mobile.mediaViewer/ImageCarousel.js");a.define("mobile.mediaViewer",{ImageCarousel:s})}},[["./src/mobile.mediaViewer/mobile.mediaViewer.js",0,1]]]);
//# sourceMappingURL=mobile.mediaViewer.js.map.json
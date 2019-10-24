this.mfModules=this.mfModules||{},this.mfModules["mobile.talk.overlays"]=(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"./src/mobile.talk.overlays/AddTopicForm.js":function(t,e,i){var o=i("./src/mobile.startup/mfExtend.js"),s=i("./src/mobile.startup/View.js"),n=i("./src/mobile.startup/util.js");function a(t){var e=new s({className:"panel"});return e.$el.append(t),e}function r(t){s.call(this,n.extend(t,{topicTitlePlaceHolder:mw.msg("mobile-frontend-talk-add-overlay-subject-placeholder"),topicContentPlaceHolder:mw.msg("mobile-frontend-talk-add-overlay-content-placeholder"),className:"add-topic-form",events:{"input .wikitext-editor, input":"onTextInput","change .wikitext-editor, input":"onTextInput"}}))}o(r,s,{postRender:function(){var t=this.options,e=t.disabled,i=n.parseHTML("<input>").attr({class:"mw-ui-input",type:"text",disabled:e,value:t.subject,placeholder:t.topicTitlePlaceHolder}),o=n.parseHTML("<textarea>").attr({class:"wikitext-editor mw-ui-input",cols:40,rows:10,disabled:e,placeholder:t.topicContentPlaceHolder}).val(t.body),r=[a(n.parseHTML("<p>").addClass("license").html(t.licenseMsg)),a(i),a(o)];this.$el.append(r.map(function(t){return t.$el})),this.$subject=i,this.$messageBody=o,s.prototype.postRender.apply(this,arguments)},onTextInput:function(){this.options.onTextInput&&this.options.onTextInput(this.$subject.val().trim(),this.$messageBody.val().trim())}}),r.test={makePanel:a},t.exports=r},"./src/mobile.talk.overlays/TalkSectionAddOverlay.js":function(t,e,i){var o=i("./src/mobile.startup/mfExtend.js"),s=i("./src/mobile.startup/headers.js"),n=i("./src/mobile.startup/Overlay.js"),a=i("./src/mobile.startup/PageGateway.js"),r=i("./src/mobile.startup/util.js"),l=i("./src/mobile.talk.overlays/makeAddTopicForm.js"),c=i("./src/mobile.startup/toast.js");function d(t){this.editorApi=t.api,this.pageGateway=new a(t.api),n.call(this,r.extend(t,{className:"talk-overlay overlay",onBeforeExit:this.onBeforeExit.bind(this),events:{"click .save":"onSaveClick"}})),this.onSaveComplete=t.onSaveComplete,this.title=t.title,this.currentPageTitle=t.currentPageTitle,this._saveHit=!1}o(d,n,{preRender:function(){this.options.headers=[s.saveHeader(mw.msg("mobile-frontend-talk-add-overlay-submit"),"initial-header save-header"),s.savingHeader(mw.msg("mobile-frontend-talk-topic-wait"))]},postRender:function(){var t;n.prototype.postRender.call(this),t=l({subject:"",body:"",disabled:!1,licenseMsg:this.options.licenseMsg,onTextInput:this.onTextInput.bind(this)}),this.showHidden(".initial-header"),this.$confirm=this.$el.find("button.save"),this.$el.find(".overlay-content").append(t.$el),this.$subject=t.$el.find("input"),this.$ta=t.$el.find(".wikitext-editor")},onBeforeExit:function(t){var e,i=mw.msg("mobile-frontend-editor-cancel-confirm");e=!this.$subject.val()&&!this.$ta.val(),(this._saveHit||e||window.confirm(i))&&t()},onTextInput:function(t,e){this.subject=t,this.body=e,clearTimeout(this.timer),this.timer=setTimeout(function(){e&&t?this.$confirm.prop("disabled",!1):this.$confirm.prop("disabled",!0)}.bind(this),250)},onSaveClick:function(){this.showHidden(".saving-header"),this.save().then(function(t){"ok"===t&&this.options.onSaveComplete&&this.onSaveComplete()}.bind(this),function(t){var e=mw.msg("mobile-frontend-talk-topic-error");switch(this.$confirm.prop("disabled",!1),t.details){case"protectedpage":e=mw.msg("mobile-frontend-talk-topic-error-protected");break;case"noedit":case"blocked":e=mw.msg("mobile-frontend-talk-topic-error-permission");break;case"spamdetected":e=mw.msg("mobile-frontend-talk-topic-error-spam");break;case"badtoken":e=mw.msg("mobile-frontend-talk-topic-error-badtoken");break;default:e=mw.msg("mobile-frontend-talk-topic-error")}c.show(e,{type:"error"}),this.showHidden(".save-header, .save-panel")}.bind(this))},save:function(){var t=this.subject,e=r.Deferred();return this.$ta.removeClass("error"),this.$subject.removeClass("error"),this._saveHit=!0,this.$el.find(".content").empty().addClass("loading"),this.editorApi.postWithToken("csrf",{action:"edit",section:"new",sectiontitle:t,title:this.title,summary:mw.msg("newsectionsummary",t),text:this.body}).then(function(){return"ok"},function(t){return e.reject({type:"error",details:t})})}}),t.exports=d},"./src/mobile.talk.overlays/TalkSectionOverlay.js":function(t,e,i){var o=mw.user,s=i("./src/mobile.startup/icons.js"),n=s.spinner().$el,a=i("./src/mobile.startup/mfExtend.js"),r=i("./src/mobile.startup/Overlay.js"),l=i("./src/mobile.startup/headers.js").header,c=i("./src/mobile.startup/util.js"),d=i("./src/mobile.startup/toast.js"),p=i("./src/mobile.talk.overlays/autosign.js"),m=i("./src/mobile.startup/Button.js");function u(t){var e=this.onBeforeExit.bind(this);this.editorApi=t.api,this.state={text:""},r.call(this,c.extend(!0,t,{className:"talk-overlay overlay",onBeforeExit:e,events:{click:function(t){"A"===t.target.tagName&&-1===t.target.className.indexOf("save-button")&&e(function(){},function(){t.preventDefault()})},"input textarea":"onInputTextarea","focus textarea":"onFocusTextarea","click .save-button":"onSaveClick"}}))}a(u,r,{templatePartials:c.extend({},r.prototype.templatePartials,{content:c.template('\n<div class="content talk-section">\n\t{{{section.text}}}\n\t<div class="comment">\n\t\t<div class="list-header">{{reply}}</div>\n\t\t<div class="comment-content">\n\t\t\t<textarea class="wikitext-editor"></textarea>\n\t\t\t<p class="license">\n\t\t\t\t{{info}}\n\t\t\t\t{{{licenseMsg}}}\n\t\t\t</p>\n\t\t</div>\n\t</div>\n</div>\n\t\t')}),defaults:c.extend({},r.prototype.defaults,{saveButton:new m({block:!0,additionalClassNames:"save-button",progressive:!0,label:c.saveButtonMessage()}),title:void 0,section:void 0,reply:mw.msg("mobile-frontend-talk-reply"),info:mw.msg("mobile-frontend-talk-reply-info")}),onInputTextarea:function(t){this.state.text=t.target.value},onBeforeExit:function(t,e){var i=mw.msg("mobile-frontend-editor-cancel-confirm");!this.state.text||window.confirm(i)?t():e()},preRender:function(){var t=this.options;this.options.headers=[l(t.section?t.section.line:"",[],s.back(),"initial-header")]},postRender:function(){r.prototype.postRender.apply(this),this.$el.find(".talk-section").prepend(n),this.$saveButton=this.options.saveButton.$el,this.$el.find(".comment-content").append(this.$saveButton),this.hideSpinner(),this._enableComments()},_enableComments:function(){this.$commentBox=this.$el.find(".comment"),o.isAnon()?this.$commentBox.remove():this.$textarea=this.$commentBox.find("textarea")},onFocusTextarea:function(){this.$textarea.removeClass("error")},onSaveClick:function(){var t=this.state.text,e=this;t?(this.showSpinner(),this.$saveButton.prop("disabled",!0),t="\n\n"+p(t),this.editorApi.postWithToken("csrf",{action:"edit",title:this.options.title,section:this.options.id,appendtext:t,redirect:!0}).then(function(){e.options.onSaveComplete&&e.options.onSaveComplete()},function(t,i){var o;o=i.error&&["readonly","blocked","autoblocked"].indexOf(i.error.code)>-1?i.error.info:mw.msg("mobile-frontend-editor-error"),e.hideSpinner(),d.show(o,"toast error"),e.$saveButton.prop("disabled",!1)})):this.$textarea.addClass("error")}}),t.exports=u},"./src/mobile.talk.overlays/autosign.js":function(t,e){t.exports=function(t){return/~{3,5}/.test(t)?t:t+" ~~~~"}},"./src/mobile.talk.overlays/makeAddTopicForm.js":function(t,e,i){var o=i("./src/mobile.talk.overlays/AddTopicForm.js"),s=i("./src/mobile.talk.overlays/autosign.js");t.exports=function(t){var e=t.licenseMsg,i=t.onTextInput,n=t.subject,a=t.body,r=t.disabled;return new o({licenseMsg:e,disabled:r,subject:n,body:a,onTextInput:i?function(t,e){e&&(e=s(e)),i.call(this,t,e)}:void 0})}},"./src/mobile.talk.overlays/mobile.talk.overlays.js":function(t,e,i){var o=i("./src/mobile.startup/moduleLoaderSingleton.js"),s=i("./src/mobile.talk.overlays/TalkSectionAddOverlay.js"),n=i("./src/mobile.talk.overlays/TalkSectionOverlay.js");o.define("mobile.talk.overlays/TalkSectionAddOverlay",s),o.define("mobile.talk.overlays/TalkSectionOverlay",n)}},[["./src/mobile.talk.overlays/mobile.talk.overlays.js",0,1]]]);
//# sourceMappingURL=mobile.talk.overlays.js.map.json
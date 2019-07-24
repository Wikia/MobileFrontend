this.mfModules=this.mfModules||{},this.mfModules["mobile.talk.overlays"]=(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"./src/mobile.talk.overlays/AddTopicForm.js":function(t,e,i){var s=i("./src/mobile.startup/mfExtend.js"),o=i("./src/mobile.startup/View.js"),n=i("./src/mobile.startup/util.js");function a(t){var e=new o({className:"panel"});return e.$el.append(t),e}function r(t){o.call(this,n.extend(t,{topicTitlePlaceHolder:mw.msg("mobile-frontend-talk-add-overlay-subject-placeholder"),topicContentPlaceHolder:mw.msg("mobile-frontend-talk-add-overlay-content-placeholder"),className:"add-topic-form",events:{"input .wikitext-editor, input":"onTextInput","change .wikitext-editor, input":"onTextInput"}}))}s(r,o,{postRender:function(){var t=this.options,e=t.disabled,i=n.parseHTML("<input>").attr({class:"mw-ui-input",type:"text",disabled:e,value:t.subject,placeholder:t.topicTitlePlaceHolder}),s=n.parseHTML("<textarea>").attr({class:"wikitext-editor mw-ui-input",cols:40,rows:10,disabled:e,placeholder:t.topicContentPlaceHolder}).val(t.body),r=[a(n.parseHTML("<p>").addClass("license").html(t.licenseMsg)),a(i),a(s)];this.$el.append(r.map(function(t){return t.$el})),this.$subject=i,this.$messageBody=s,o.prototype.postRender.apply(this,arguments)},onTextInput:function(){this.options.onTextInput&&this.options.onTextInput(this.$subject.val().trim(),this.$messageBody.val().trim())}}),r.test={makePanel:a},t.exports=r},"./src/mobile.talk.overlays/TalkSectionAddOverlay.js":function(t,e,i){var s=i("./src/mobile.startup/mfExtend.js"),o=i("./src/mobile.startup/headers.js"),n=i("./src/mobile.startup/Overlay.js"),a=i("./src/mobile.startup/PageGateway.js"),r=i("./src/mobile.startup/util.js"),l=i("./src/mobile.talk.overlays/makeAddTopicForm.js"),c=i("./src/mobile.startup/toast.js");function d(t){this.editorApi=t.api,this.pageGateway=new a(t.api),n.call(this,r.extend(t,{className:"talk-overlay overlay",onBeforeExit:this.onBeforeExit.bind(this),events:{"click .save":"onSaveClick"}})),this.onSaveComplete=t.onSaveComplete,this.title=t.title,this.currentPageTitle=t.currentPageTitle,this.eventBus=t.eventBus,this._saveHit=!1}s(d,n,{preRender:function(){this.options.headers=[o.saveHeader(mw.msg("mobile-frontend-talk-add-overlay-submit"),"initial-header save-header"),o.savingHeader(mw.msg("mobile-frontend-talk-topic-wait"))]},postRender:function(){var t;n.prototype.postRender.call(this),t=l({subject:"",body:"",disabled:!1,licenseMsg:this.options.licenseMsg,onTextInput:this.onTextInput.bind(this)}),this.showHidden(".initial-header"),this.$confirm=this.$el.find("button.save"),this.$el.find(".overlay-content").append(t.$el),this.$subject=t.$el.find("input"),this.$ta=t.$el.find(".wikitext-editor")},onBeforeExit:function(t){var e,i=mw.msg("mobile-frontend-editor-cancel-confirm");e=!this.$subject.val()&&!this.$ta.val(),(this._saveHit||e||window.confirm(i))&&t()},onTextInput:function(t,e){this.subject=t,this.body=e,clearTimeout(this.timer),this.timer=setTimeout(function(){e&&t?this.$confirm.prop("disabled",!1):this.$confirm.prop("disabled",!0)}.bind(this),250)},onSaveClick:function(){var t=this.title===this.currentPageTitle;this.showHidden(".saving-header"),this.save().then(function(e){"ok"===e&&(t?this.eventBus.emit("talk-added-wo-overlay"):this.onSaveComplete())}.bind(this),function(t){var e=mw.msg("mobile-frontend-talk-topic-error");switch(this.$confirm.prop("disabled",!1),t.details){case"protectedpage":e=mw.msg("mobile-frontend-talk-topic-error-protected");break;case"noedit":case"blocked":e=mw.msg("mobile-frontend-talk-topic-error-permission");break;case"spamdetected":e=mw.msg("mobile-frontend-talk-topic-error-spam");break;case"badtoken":e=mw.msg("mobile-frontend-talk-topic-error-badtoken");break;default:e=mw.msg("mobile-frontend-talk-topic-error")}c.show(e,{type:"error"}),this.showHidden(".save-header, .save-panel")}.bind(this))},save:function(){var t=this.subject,e=r.Deferred();return this.$ta.removeClass("error"),this.$subject.removeClass("error"),this._saveHit=!0,this.$el.find(".content").empty().addClass("loading"),this.editorApi.postWithToken("csrf",{action:"edit",section:"new",sectiontitle:t,title:this.title,summary:mw.msg("newsectionsummary",t),text:this.body}).then(function(){return"ok"},function(t){return e.reject({type:"error",details:t})})}}),t.exports=d},"./src/mobile.talk.overlays/TalkSectionOverlay.js":function(t,e,i){var s=mw.user,o=i("./src/mobile.startup/icons.js"),n=o.spinner().$el,a=i("./src/mobile.startup/mfExtend.js"),r=i("./src/mobile.startup/PageGateway.js"),l=i("./src/mobile.startup/Overlay.js"),c=i("./src/mobile.startup/headers.js").header,d=i("./src/mobile.startup/util.js"),p=i("./src/mobile.startup/toast.js"),m=i("./src/mobile.talk.overlays/autosign.js"),u=i("./src/mobile.startup/Page.js"),h=i("./src/mobile.startup/Button.js");function v(t){this.editorApi=t.api,this.pageGateway=new r(t.api),this.state={text:""},l.call(this,d.extend(!0,t,{className:"talk-overlay overlay",onBeforeExit:this.onBeforeExit.bind(this),events:{"input textarea":"onInputTextarea","focus textarea":"onFocusTextarea","click .save-button":"onSaveClick"}}))}a(v,l,{templatePartials:d.extend({},l.prototype.templatePartials,{content:d.template('\n<div class="content talk-section">\n\t{{{section.text}}}\n\t<div class="comment">\n\t\t<div class="list-header">{{reply}}</div>\n\t\t<div class="comment-content">\n\t\t\t<textarea class="wikitext-editor"></textarea>\n\t\t\t<p class="license">\n\t\t\t\t{{info}}\n\t\t\t\t{{{licenseMsg}}}\n\t\t\t</p>\n\t\t</div>\n\t</div>\n</div>\n\t\t')}),defaults:d.extend({},l.prototype.defaults,{saveButton:new h({block:!0,additionalClassNames:"save-button",progressive:!0,label:d.saveButtonMessage()}),title:void 0,section:void 0,reply:mw.msg("mobile-frontend-talk-reply"),info:mw.msg("mobile-frontend-talk-reply-info")}),onInputTextarea:function(t){this.state.text=t.target.value},onBeforeExit:function(t){var e=mw.msg("mobile-frontend-editor-cancel-confirm");this.state.text&&!window.confirm(e)||t()},preRender:function(){var t=this.options;this.options.headers=[c(t.section?t.section.line:"",[],o.back(),"initial-header")]},postRender:function(){l.prototype.postRender.apply(this),this.$el.find(".talk-section").prepend(n),this.$saveButton=this.options.saveButton.$el,this.$el.find(".comment-content").append(this.$saveButton),this.options.section?(this.hideSpinner(),this._enableComments()):this.renderFromApi(this.options)},_enableComments:function(){this.$commentBox=this.$el.find(".comment"),s.isAnon()?this.$commentBox.remove():this.$textarea=this.$commentBox.find("textarea")},renderFromApi:function(t){var e=this;this.pageGateway.getPage(t.title).then(function(i){var s=new u(i);t.section=s.getSection(t.id),e.render(t),e.hideSpinner()})},onFocusTextarea:function(){this.$textarea.removeClass("error")},onSaveClick:function(){var t=this.state.text,e=this;function i(){e.$saveButton.prop("disabled",!1)}t?(this.showSpinner(),this.$saveButton.prop("disabled",!0),t="\n\n"+m(t),this.editorApi.postWithToken("csrf",{action:"edit",title:this.options.title,section:this.options.id,appendtext:t,redirect:!0}).then(function(){p.show(mw.msg("mobile-frontend-talk-reply-success")),e.pageGateway.invalidatePage(e.options.title),e.renderFromApi(e.options),i()},function(t,s){var o;o=s.error&&["readonly","blocked","autoblocked"].indexOf(s.error.code)>-1?s.error.info:mw.msg("mobile-frontend-editor-error"),e.hideSpinner(),p.show(o,"toast error"),i()})):this.$textarea.addClass("error")}}),t.exports=v},"./src/mobile.talk.overlays/autosign.js":function(t,e){t.exports=function(t){return/~{3,5}/.test(t)?t:t+" ~~~~"}},"./src/mobile.talk.overlays/makeAddTopicForm.js":function(t,e,i){var s=i("./src/mobile.talk.overlays/AddTopicForm.js"),o=i("./src/mobile.talk.overlays/autosign.js");t.exports=function(t){var e=t.licenseMsg,i=t.onTextInput,n=t.subject,a=t.body,r=t.disabled;return new s({licenseMsg:e,disabled:r,subject:n,body:a,onTextInput:i?function(t,e){e&&(e=o(e)),i.call(this,t,e)}:void 0})}},"./src/mobile.talk.overlays/mobile.talk.overlays.js":function(t,e,i){var s=i("./src/mobile.startup/moduleLoaderSingleton.js"),o=i("./src/mobile.talk.overlays/talkBoard.js"),n=i("./src/mobile.talk.overlays/TalkSectionAddOverlay.js"),a=i("./src/mobile.talk.overlays/TalkSectionOverlay.js");s.define("mobile.talk.overlays/talkBoard",o),s.define("mobile.talk.overlays/TalkSectionAddOverlay",n),s.define("mobile.talk.overlays/TalkSectionOverlay",a)},"./src/mobile.talk.overlays/talkBoard.js":function(t,e,i){var s=i("./src/mobile.startup/util.js"),o=i("./src/mobile.startup/View.js");t.exports=function(t){var e,i=t.length>0?mw.msg("mobile-frontend-talk-explained"):mw.msg("mobile-frontend-talk-explained-empty");return(e=new o({className:"talk-board"})).append([s.parseHTML('<p class="content-header">').text(i),s.parseHTML('<ul class="topic-title-list">').append(t.map(function(t){return s.parseHTML("<li>").append(s.parseHTML("<a>").attr("href","#/talk/"+t.id).text(t.line))}))]),e}}},[["./src/mobile.talk.overlays/mobile.talk.overlays.js",0,1]]]);
//# sourceMappingURL=mobile.talk.overlays.js.map.json
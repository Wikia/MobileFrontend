this.mfModules=this.mfModules||{},this.mfModules["mobile.editor.ve"]=(window.jsonElo123=window.jsonElo123||[]).push([[7],{"./src/mobile.editor.ve/mobile.editor.ve.js":function(e,t,i){var o=i("./src/mobile.editor.ve/schemaVisualEditorFeatureUse.js");ve.init.mw.MobileArticleTarget.static.parseSaveError=i("./src/mobile.editor.overlay/parseSaveError.js"),o(),ve.trackSubscribe("activity.",function(e,t){mw.track("mf.schemaVisualEditorFeatureUse",ve.extendObject(t,{feature:e.split(".")[1],editing_session_id:ve.init.target.overlay.sessionId}))})},"./src/mobile.editor.ve/schemaVisualEditorFeatureUse.js":function(e,t){e.exports=function(){var e=!!mw.util.getParamValue("trackdebug");(null!==mw.loader.getState("schema.VisualEditorFeatureUse")||e)&&mw.loader.using(["ext.eventLogging.subscriber"]).then(function(){var t=mw.eventLog.Schema,i=mw.config.get("wgWMESchemaEditAttemptStepSamplingRate"),o=new t("VisualEditorFeatureUse",i);mw.trackSubscribe("mf.schemaVisualEditorFeatureUse",function(t,s){var r={feature:s.feature,action:s.action,editingSessionId:s.editing_session_id};e?function(){console.log.apply(console,arguments)}(t,r):o.log(r,mw.config.get("wgWMESchemaEditAttemptStepOversample")||"visualeditor"===mw.config.get("wgMFSchemaEditAttemptStepOversample")||"all"===mw.config.get("wgMFSchemaEditAttemptStepOversample")?1:i)})})}}},[["./src/mobile.editor.ve/mobile.editor.ve.js",0,1]]]);
//# sourceMappingURL=mobile.editor.ve.js.map.json
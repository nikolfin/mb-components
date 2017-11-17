LinearAd = function() {

 	this._slot = null;


 	this._videoSlot = null;

 };

 LinearAd.prototype.initAd = function(width, height, viewMode, desiredBitrate,
 creativeData, environmentVars) {
 // slot and videoSlot are passed as part of the environmentVars
 this._slot = environmentVars.slot;
 this._videoSlot = environmentVars.videoSlot;
 console.log("initAd");
 };
 LinearAd.prototype.startAd = function() {
 console.log("Starting ad");
 
 };

 LinearAd.prototype.stopAd = function(e, p) {
 console.log("Stopping ad");
 };
 LinearAd.prototype.setAdVolume = function(val) {
 console.log("setAdVolume");
 };
 LinearAd.prototype.getAdVolume = function() {
 console.log("getAdVolume");
 };
 LinearAd.prototype.resizeAd = function(width, height, viewMode) {
 console.log("resizeAd");
 };
 LinearAd.prototype.pauseAd = function() {
 console.log("pauseAd");
 };
 LinearAd.prototype.resumeAd = function() {
 console.log("resumeAd");
 };
 LinearAd.prototype.expandAd = function() {
 console.log("expandAd");
 };
 LinearAd.prototype.getAdExpanded = function(val) {
 console.log("getAdExpanded");
 };
 LinearAd.prototype.getAdSkippableState = function(val) {
 console.log("getAdSkippableState");
 };
 LinearAd.prototype.collapseAd = function() {
 console.log("collapseAd");
 };
 LinearAd.prototype.skipAd = function() {
 console.log("skipAd");
 };

 // Callbacks for events are registered here
 LinearAd.prototype.subscribe = function(aCallback, eventName, aContext) {
 console.log("Subscribe");
 };
 // Callbacks are removed based on the eventName
 LinearAd.prototype.unsubscribe = function(eventName) {
 console.log("unsubscribe");
 }
getVPAIDAd = function() {
 return new LinearAd();
};

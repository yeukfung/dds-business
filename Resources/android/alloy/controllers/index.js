function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __alloyId0 = [];
    $.__views.__alloyId2 = Alloy.createController("qrscan", {
        id: "__alloyId2"
    });
    $.__views.__alloyId1 = Ti.UI.createTab({
        window: $.__views.__alloyId2.getViewEx({
            recurse: true
        }),
        title: "掃瞄器",
        id: "__alloyId1"
    });
    __alloyId0.push($.__views.__alloyId1);
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId0,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/common/events.js");
    var cLogin = Alloy.createController("login");
    Ti.App.addEventListener(Event.login.requireLogin, function() {
        cLogin.getView().open();
    });
    Ti.App.addEventListener(Event.login.ok, function(e) {
        Ti.API.debug("login ok: " + JSON.stringify(e));
    });
    Ti.App.addEventListener(Event.login.err, function(e) {
        Ti.API.debug("login err: " + JSON.stringify(e));
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
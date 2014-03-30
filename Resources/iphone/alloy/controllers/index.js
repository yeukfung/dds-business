function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __alloyId0 = [];
    $.__views.__alloyId1 = Alloy.createController("qrscan", {
        id: "__alloyId1"
    });
    $.__views.tab = Ti.UI.createTab({
        window: $.__views.__alloyId1.getViewEx({
            recurse: true
        }),
        id: "tab",
        title: "掃瞄器"
    });
    __alloyId0.push($.__views.tab);
    $.__views.tgMain = Ti.UI.createTabGroup({
        tabs: __alloyId0,
        id: "tgMain",
        navBarHidden: "true"
    });
    $.__views.tgMain && $.addTopLevelView($.__views.tgMain);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/common/events.js");
    Ti.API.info("Ti.Locale.currentLanguage = " + Ti.Locale.currentLanguage);
    Ti.API.info("Ti.Locale.currentLocale = " + Ti.Locale.currentLocale);
    Ti.include("common/nav.js");
    var nav = new navClass($.tgMain);
    Alloy.Globals.nav = nav;
    var currentTabGroup = $.tgMain;
    cLogin = Alloy.createController("login");
    Ti.App.addEventListener(Event.login.requireLogin, function() {
        Ti.Network.online && cLogin.getView().open({
            modal: true
        });
    });
    Ti.App.addEventListener(Event.login.ok, function() {
        currentTabGroup.open();
    });
    Ti.App.addEventListener(Event.login.err, function(e) {
        Ti.API.debug("login err: " + JSON.stringify(e));
    });
    var offlinedScreen = Alloy.createController("offlined").getView();
    Ti.Network.addEventListener("change", function(e) {
        if (e.networkType == Ti.Network.NETWORK_LAN || e.networkType == Ti.Network.NETWORK_MOBILE || e.networkType == Ti.Network.NETWORK_WIFI) {
            Ti.API.log("network detected");
            offlinedScreen.close();
        } else {
            Ti.API.log("no network detected");
            offlinedScreen.open();
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
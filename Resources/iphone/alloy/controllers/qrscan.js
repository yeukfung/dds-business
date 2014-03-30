function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "qrscan";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.qrscan = Ti.UI.createWindow({
        backgroundColor: "white",
        tabBarHidden: "true",
        title: L("app.title"),
        id: "qrscan"
    });
    $.__views.qrscan && $.addTopLevelView($.__views.qrscan);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/common/ut.js");
    arguments[0] || {};
    var redeemURL = Alloy.CFG.host + "api/user/orders/redeem/";
    var scanditsdk = require("com.mirasense.scanditsdk");
    ("iphone" == Ti.Platform.osname || "ipad" == Ti.Platform.osname) && (Titanium.UI.iPhone.statusBarHidden = true);
    var picker;
    var window = Titanium.UI.createWindow({
        title: "Scandit SDK",
        navBarHidden: true
    });
    var openScanner = function() {
        picker = scanditsdk.createView({
            width: "100%",
            height: "100%"
        });
        picker.init("0+OchrNuEeOP8y+m2ymMb5zL9SzGzVyAs3mX2A6oKm8", 0);
        picker.showSearchBar(true);
        picker.showToolBar(true);
        picker.setToolBarButtonCaption(L("btn.cancel"));
        picker.setSearchBarActionButtonCaption(L("btn.confirm"));
        picker.setSearchBarCancelButtonCaption(L("btn.cancel"));
        picker.setSearchBarPlaceholderText(L("qrscan.hint"));
        picker.setSuccessCallback(function(qrEvent) {
            var dialog = Ti.UI.createAlertDialog({
                cancel: 1,
                buttonNames: [ L("btn.confirm"), L("btn.cancel") ],
                message: L("qrscan.confirm.message"),
                title: L("qrscan.confirm.title")
            });
            dialog.addEventListener("click", function(e) {
                if (e.index === e.source.cancel) Ti.API.info("The cancel button was clicked"); else {
                    ut.apiCall({
                        type: "GET",
                        url: redeemURL + qrEvent.barcode
                    }, function(data) {
                        data.success ? alert(L("qrscan.verfied")) : alert(data.responseJSON.errMsg);
                    });
                    closeScanner();
                }
            });
            dialog.show();
        });
        picker.setCancelCallback(function() {
            closeScanner();
        });
        window.add(picker);
        window.addEventListener("open", function() {
            "iphone" == Ti.Platform.osname || "ipad" == Ti.Platform.osname ? picker.setOrientation(Ti.UI.orientation) : picker.setOrientation(window.orientation);
            picker.setSize(Ti.Platform.displayCaps.platformWidth, Ti.Platform.displayCaps.platformHeight);
            picker.startScanning();
        });
        window.open();
    };
    var closeScanner = function() {
        if (null != picker) {
            picker.stopScanning();
            window.remove(picker);
        }
        window.close();
    };
    Ti.Gesture.addEventListener("orientationchange", function(e) {
        window.orientationModes = [ Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT ];
        if (null != picker) {
            picker.setOrientation(e.orientation);
            picker.setSize(Ti.Platform.displayCaps.platformWidth, Ti.Platform.displayCaps.platformHeight);
        }
    });
    var button = Titanium.UI.createButton({
        width: 200,
        height: 80,
        title: L("qrscan.start")
    });
    button.addEventListener("click", function() {
        openScanner();
    });
    var rootWindow = $.qrscan;
    rootWindow.add(button);
    rootWindow.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
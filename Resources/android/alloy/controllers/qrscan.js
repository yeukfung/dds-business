function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "qrscan";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.qrscan = Ti.UI.createWindow({
        id: "qrscan"
    });
    $.__views.qrscan && $.addTopLevelView($.__views.qrscan);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/common/ut.js");
    arguments[0] || {};
    var scanditsdk = require("com.mirasense.scanditsdk");
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
        picker.setSuccessCallback(function(qrEvent) {
            var dialog = Ti.UI.createAlertDialog({
                cancel: 1,
                buttonNames: [ "Confirm", "Cancel" ],
                message: "訂單一經確認，不能重新確認，是否繼續?",
                title: "確認訂單?"
            });
            dialog.addEventListener("click", function(e) {
                if (e.index === e.source.cancel) Ti.API.info("The cancel button was clicked"); else {
                    ut.apiCall({
                        type: "GET",
                        url: "http://jessnruss.dyndns.org:9000/api/user/orders/redeem/" + qrEvent.barcode
                    }, function(data) {
                        data.success ? alert("success") : alert("error");
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
            picker.setOrientation(window.orientation);
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
        title: "start scanner"
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
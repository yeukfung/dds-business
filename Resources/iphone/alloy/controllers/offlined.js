function Controller() {
    function retry() {
        Ti.Network.fireEvent("change", {
            networkType: Ti.Network.networkType
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "offlined";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.offlined = Ti.UI.createWindow({
        backgroundColor: "white",
        modal: "true",
        id: "offlined"
    });
    $.__views.offlined && $.addTopLevelView($.__views.offlined);
    $.__views.__alloyId3 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId3"
    });
    $.__views.offlined.add($.__views.__alloyId3);
    $.__views.lblTextTitle = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        id: "lblTextTitle",
        text: L("offlined.title")
    });
    $.__views.__alloyId3.add($.__views.lblTextTitle);
    $.__views.lblTextContent = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        id: "lblTextContent",
        text: L("offlined.content")
    });
    $.__views.__alloyId3.add($.__views.lblTextContent);
    $.__views.btnOk = Ti.UI.createButton({
        id: "btnOk",
        title: L("btn.retry")
    });
    $.__views.__alloyId3.add($.__views.btnOk);
    retry ? $.__views.btnOk.addEventListener("click", retry) : __defers["$.__views.btnOk!click!retry"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.btnOk!click!retry"] && $.__views.btnOk.addEventListener("click", retry);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
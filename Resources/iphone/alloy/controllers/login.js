function Controller() {
    function confirmLogin(json) {
        Ti.API.log(json);
        $.login.close();
        Ti.App.fireEvent(Event.login.ok, json);
    }
    function checkLogin() {
        Ti.API.debug("checkLogin invoked");
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.log("onLoad: " + this.responseText);
                if ("{}" == this.responseText) {
                    Ti.App.fireEvent(Event.login.requireLogin, {});
                    wv.visible = true;
                } else confirmLogin(JSON.parse(this.responseText));
            },
            onerror: function(e) {
                Ti.App.fireEvent(Event.login.err, e);
                Ti.API.log("onError");
                $.login.close();
            },
            timeout: 5e3
        });
        client.open("GET", checkLoginUrl);
        client.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.login = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "登入",
        id: "login"
    });
    $.__views.login && $.addTopLevelView($.__views.login);
    $.__views.wvLogin = Ti.UI.createWebView({
        id: "wvLogin"
    });
    $.__views.login.add($.__views.wvLogin);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/common/events.js");
    arguments[0] || {};
    $.login.title = L("login.title");
    Ti.API.log("login.js");
    var targetUrl = Alloy.CFG.host + "m/login";
    var checkLoginUrl = Alloy.CFG.host + "m/checklogined";
    var wv = $.wvLogin;
    wv.url = targetUrl;
    wv.visible = false;
    wv.addEventListener("beforeload", function(e) {
        Ti.API.log("beforeload: " + e.url);
    });
    wv.addEventListener("load", function(e) {
        Ti.API.log("load: " + e.url);
        if (0 == e.url.indexOf(checkLoginUrl)) {
            wv.visible = false;
            checkLogin();
        }
    });
    checkLogin();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
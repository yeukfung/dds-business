Ti.include("/common/events.js");
var args = arguments[0] || {};

$.login.title = L("login.title");

Ti.API.log("login.js");

var targetUrl = Alloy.CFG.host + "m/login";

var checkLoginUrl = Alloy.CFG.host + "m/checklogined";

/**
 * init
 */
var wv = $.wvLogin;
wv.url = targetUrl;
wv.visible = false;

/**
 * webview on load
 */
wv.addEventListener("beforeload", function(e) {
	Ti.API.log("beforeload: " + e.url);
});

wv.addEventListener("load", function(e) {
	Ti.API.log("load: " + e.url);
	if (e.url.indexOf(checkLoginUrl) == 0) {
		wv.visible = false;
		// clone http session to android.
		checkLogin();
	}
});

function confirmLogin(json) {
	Ti.API.log(json);
	$.login.close();
	Ti.App.fireEvent(Event.login.ok, json);
}

function checkLogin() {
	Ti.API.debug("checkLogin invoked");

	if (OS_ANDROID) {
		Ti.API.log("android machine");

		var cookies = Ti.Network.getSystemCookies("jessnruss.dyndns.org", "/", "id");
		Ti.API.log("trying to get some cookies1 to apply to HTTP: ");

		for (var key in cookies) {
			var targetCookie = cookies[key];
			targetCookie.domain = "jessnruss.dyndns.org";
			targetCookie.path = "/";
			Ti.API.log("got some cookies1 to apply to HTTP: " + JSON.stringify(targetCookie));
			Ti.Network.addHTTPCookie(targetCookie);
		}

		var cookies2 = Ti.Network.getHTTPCookies("jessnruss.dyndns.org", "/", "id");
		Ti.API.log("trying to get some cookies2 to apply to HTTP: ");
		for (var key in cookies2) {
			Ti.API.log("got some cookies2 to apply to HTTP: " + JSON.stringify(cookies[key]));
		}
	}

	// check login
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			Ti.API.log("onLoad: " + this.responseText);
			// check result either {} or {"identityId":{"userId":"633210900","providerId":"facebook"},"firstName":"Russell","lastName":"Kwok","fullName":"Russell Kwok","email":"yeukfung@gmail.com","avatarUrl":"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/t5.0-1/623629_633210900_1837722525_q.jpg","authMethod":{"method":"oauth2"},"oAuth2Info":{"accessToken":"CAADjGhw0ZAfkBAAfmYgZAJdo9hsyEs4bbZBuJ2wBpMXlIAZCssSd3A2dobPeU9K1W5W9QlSvMHKZClIYe8GJmHKS4l6ZAobDlFDsUAzpCDXCOpXiXc67XIkpwzwHiDqi3iZChKIQrFtkoyrEwgfpTkVvjjcEvZBxC2879FrzgS5dft5W1igHjgg2","expiresIn":5183211},"id":"5327c0c98d00000c01f2c130"}
			if ("{}" == this.responseText) {
				// require login
				Ti.App.fireEvent(Event.login.requireLogin, {});
				wv.visible = true;
			} else {
				// already logined, close this browser
				confirmLogin(JSON.parse(this.responseText));
			}
		},
		onerror : function(e) {
			Ti.App.fireEvent(Event.login.err, e);
			Ti.API.log("onError");
			$.login.close();
		},
		timeout : 5000 // in milliseconds
	});
	client.open("GET", checkLoginUrl);
	client.send();
};

checkLogin();

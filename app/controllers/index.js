Ti.include("/common/events.js");

Ti.API.info("Ti.Locale.currentLanguage = " + Ti.Locale.currentLanguage);
Ti.API.info("Ti.Locale.currentLocale = " + Ti.Locale.currentLocale);

Ti.include("common/nav.js");

var nav = new navClass($.tgMain);
Alloy.Globals.nav = nav;

var currentTabGroup = $.tgMain;

cLogin = Alloy.createController("login");

Ti.App.addEventListener(Event.login.requireLogin, function(e) {
	if (Ti.Network.online)
		cLogin.getView().open({
			modal : true
		});
});

Ti.App.addEventListener(Event.login.ok, function(e) {
	currentTabGroup.open();
});

Ti.App.addEventListener(Event.login.err, function(e) {
	Ti.API.debug("login err: " + JSON.stringify(e));
});

// Network state changed
var offlinedScreen = Alloy.createController("offlined").getView();
Ti.Network.addEventListener("change", function(e) {

	if (e.networkType == Ti.Network.NETWORK_LAN || e.networkType == Ti.Network.NETWORK_MOBILE || e.networkType == Ti.Network.NETWORK_WIFI) {
		// has network
		Ti.API.log("network detected");
		offlinedScreen.close();
	} else {
		// no network
		Ti.API.log("no network detected");
		offlinedScreen.open();

	}
});

// Ti.Network.fireEvent("change", {
// 'networkType' : Ti.Network.NETWORK_NONE
// });


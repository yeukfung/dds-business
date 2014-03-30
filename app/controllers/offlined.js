var args = arguments[0] || {};

function retry() {
	Ti.Network.fireEvent("change", {
		networkType : Ti.Network.networkType
	});
};

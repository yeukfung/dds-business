Ti.include("events.js");

var DDSUtil = function() {
	return {
		apiCall : function(_options, _callback) {
			if (Ti.Network.online) {
				var xhr = Ti.Network.createHTTPClient({
					timeout : _options.timeout || 7000
				});

				//Prepare the request
				xhr.open(_options.type, _options.url);

				xhr.onload = function() {
					var responseJSON, success = true, error;

					try {
						responseJSON = JSON.parse(xhr.responseText);
					} catch (e) {
						Ti.API.error('[REST API] apiCall ERROR: ' + e.message);
						success = false;
						error = e.message;
					}

					_callback({
						success : success,
						status : success ? (xhr.status == 200 ? "ok" : xhr.status) : 'error',
						code : xhr.status,
						data : error,
						responseText : xhr.responseText || null,
						responseJSON : responseJSON || null
					});
				};

				//Handle error
				xhr.onerror = function(e) {
					Ti.API.log("xhr event: " + JSON.stringify(e));
					if (xhr.status == 401) {
						// login required.
						alert("請登入");
						Ti.App.fireEvent(Event.login.loginRequired);
					} else {
						var responseJSON;

						try {
							responseJSON = JSON.parse(xhr.responseText);
						} catch (e) {
						}

						_callback({
							success : false,
							status : "error",
							code : xhr.status,
							data : e.error || e.errMsg || e.errCode,
							responseText : xhr.responseText,
							responseJSON : responseJSON || null
						});
						Ti.API.error('[REST API] apiCall ERROR: ' + xhr.responseText);
						Ti.API.error('[REST API] apiCall ERROR CODE: ' + xhr.status);
					}
				};

				// headers
				for (var header in _options.headers) {
					xhr.setRequestHeader(header, _options.headers[header]);
				}

				xhr.setRequestHeader('Content-Type', 'application/json');

				if (_options.beforeSend) {
					_options.beforeSend(xhr);
				}

				//				if (_options.type != "get" && _options.type != "GET")
				xhr.send(_options.data || null);
				//				else
				//					xhr.send();

			} else {
				// Offline
				_callback({
					success : false,
					status : "offline",
					responseText : null
				});
			}
		}
	};
};

var ut = new DDSUtil();

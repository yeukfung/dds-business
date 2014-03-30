Ti.include("events.js");

var DDSUtil = function() {
    return {
        apiCall: function(_options, _callback) {
            if (Ti.Network.online) {
                var xhr = Ti.Network.createHTTPClient({
                    timeout: _options.timeout || 7e3
                });
                xhr.open(_options.type, _options.url);
                xhr.onload = function() {
                    var responseJSON, error, success = true;
                    try {
                        responseJSON = JSON.parse(xhr.responseText);
                    } catch (e) {
                        Ti.API.error("[REST API] apiCall ERROR: " + e.message);
                        success = false;
                        error = e.message;
                    }
                    _callback({
                        success: success,
                        status: success ? 200 == xhr.status ? "ok" : xhr.status : "error",
                        code: xhr.status,
                        data: error,
                        responseText: xhr.responseText || null,
                        responseJSON: responseJSON || null
                    });
                };
                xhr.onerror = function(e) {
                    Ti.API.log("xhr event: " + JSON.stringify(e));
                    if (401 == xhr.status) {
                        alert("請登入");
                        Ti.App.fireEvent(Event.login.loginRequired);
                    } else {
                        var responseJSON;
                        try {
                            responseJSON = JSON.parse(xhr.responseText);
                        } catch (e) {}
                        _callback({
                            success: false,
                            status: "error",
                            code: xhr.status,
                            data: e.error,
                            responseText: xhr.responseText,
                            responseJSON: responseJSON || null
                        });
                        Ti.API.error("[REST API] apiCall ERROR: " + xhr.responseText);
                        Ti.API.error("[REST API] apiCall ERROR CODE: " + xhr.status);
                    }
                };
                for (var header in _options.headers) xhr.setRequestHeader(header, _options.headers[header]);
                xhr.setRequestHeader("Content-Type", "application/json");
                _options.beforeSend && _options.beforeSend(xhr);
                xhr.send(_options.data || null);
            } else _callback({
                success: false,
                status: "offline",
                responseText: null
            });
        }
    };
};

var ut = new DDSUtil();
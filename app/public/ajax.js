var $ = require("jquery");
var constants = require("./resources/constants.js");

function AJAX(method, url, onSuccess, onError, body)
{
	var URL = "https://" + constants.HostName + ":" + constants.APIPort + url;

	$.ajax({
		async: true,
		contentType: "application/json",
		xhrFields: { withCredentials: true },
		method: method,
		url: URL,
		data: body,
		success: onSuccess,
		error: onError
	});
}

module.exports = AJAX;
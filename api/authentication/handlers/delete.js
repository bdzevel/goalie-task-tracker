// ROOT/api/authentication/handlers
"use strict";

let TS = require("../../../diagnostics/trace-sources").Get("Request-Handlers");

function DELETE(request, response)
{
	// Log user out
	request.session = { };
	response.status(200).end();
};

module.exports = DELETE;
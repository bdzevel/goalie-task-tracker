// ROOT/api/users/handlers
"use strict";

let TS = require("../../../diagnostics/trace-sources").Get("Request-Handlers");

function PUT(request, response)
{
	// Update user info
	TS.TraceWarning(__filename, "Not Implemented");
	response.status(200).end();
};

module.exports = PUT;
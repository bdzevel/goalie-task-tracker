// ROOT/api/users/handlers
"use strict";

let TS = require("../../../diagnostics/trace-sources").Get("Request-Handlers");

function DELETE(request, response)
{
	// Delete user and user's goals
	TS.TraceWarning(__filename, "Not Implemented");
	response.status(200).end();
};

module.exports = DELETE;
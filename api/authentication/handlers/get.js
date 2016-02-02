// ROOT/api/authentication/handlers
"use strict";

let TS = require("../../../diagnostics/trace-sources").Get("Request-Handlers");

function GET(request, response)
{
	response.status(200).end();
};

module.exports = GET;
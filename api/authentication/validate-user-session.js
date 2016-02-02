// ROOT/api/authentication
"use strict";

let User = require("../users/user");
let TS = require("../../diagnostics/trace-sources").Get("Request-Handlers");

function ValidateUserSession(request, response, next)
{
	if (!request.session || !request.session.userid)
	{
		TS.TraceWarning(__filename, "Invalid user session");
		response.status(401).end();
		return;
	}

	User.findById(request.session.userid, OnUserFound);

	function OnUserFound(err, user)
	{
		if (err)
		{
			TS.TraceWarning(__filename, err);
			response.status(500).send({ error: err });
			return;
		}

		if (!user)
		{
			TS.TraceWarning(__filename, "Invalid user session");
			response.status(401).end();
			return;
		}
		
		next();
	}
}

module.exports = ValidateUserSession;
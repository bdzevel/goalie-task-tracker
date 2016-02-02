// ROOT/api/goals/handlers
"use strict";

let Goal = require("../goal");
let TS = require("../../../diagnostics/trace-sources").Get("Request-Handlers");

function GET(request, response)
{
	// Get goals
	let userID = request.session.userid;

	Goal.find({ UserID: userID }, OnGoalFound);

	function OnGoalFound(err, goals)
	{
		if (err)
		{
			TS.TraceWarning(__filename, err);
			response.status(500).send({ error: err });
			return;
		}

		response.status(200).send({ goals: goals });
	}
};

module.exports = GET;
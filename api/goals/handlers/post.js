// ROOT/api/goals/handlers
"use strict";

let Goal = require("../goal");
let TS = require("../../../diagnostics/trace-sources").Get("Request-Handlers");

function POST(request, response)
{
	// Create new goalValidateUserSession
	let userID = request.session.userid;
	let goal = request.body["goal"];

	if (!goal)
	{
		let errmsg = "Invalid goal";
		TS.TraceWarning(__filename, errmsg);
		response.status(400).send({ error: errmsg });
		return;
	}

	let newGoal = new Goal();
	newGoal.UserID = userID;
	newGoal.Description = goal.Description;
	newGoal.Reason = goal.Reason;
	newGoal.Priority = goal.Priority || 1;
	newGoal.IsComplete = false;
	newGoal.save(OnGoalSaved);

	function OnGoalSaved(err, goal)
	{
		if (err)
		{
			TS.TraceWarning(__filename, err);
			response.status(500).send({ error: err });
			return;
		}

		response.status(200).send({ goal: goal });
	}
};

module.exports = POST;
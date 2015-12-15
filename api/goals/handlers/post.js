// ROOT/api/goals/handlers

var Goal = require("../goal");
var TS = require("../../diagnostics/trace-sources").Get("Request-Handlers");

function POST(request, response)
{
	// Create new goalValidateUserSession
	var userID = request.session.userid;
	var goal = request.body["goal"];

	if (!goal)
	{
		var errmsg = "Invalid goal";
		TS.TraceWarning(__filename, errmsg);
		response.status(400).send({ error: errmsg });
		return;
	}

	var newGoal = new Goal();
	newGoal.UserID = userID;
	newGoal.Description = goal.Description;
	newGoal.Reason = goal.Reason;
	newGoal.Priority = goal.Priority;
	newGoal.save(OnGoalSaved);

	function OnGoalSaved(err, goal)
	{
		if (err)
		{
			TS.TraceWarning(__filename, err);
			response.status(500).send({ error: err });
			return;
		}

		response.status(200).end();
	}
};

module.exports = POST;
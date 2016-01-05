// ROOT/api/goals/handlers

var Goal = require("../goal");
var TS = require("../../diagnostics/trace-sources").Get("Request-Handlers");

function PUT(request, response)
{
	// Update goal
	var userID = request.session.userid;
	var updatedGoal = request.body["goal"];

	if (!updatedGoal)
	{
		var errmsg = "Invalid goal";
		TS.TraceWarning(__filename, errmsg);
		response.status(400).send({ error: errmsg });
		return;
	}

	Goal.findById(updatedGoal._id, OnGoalFound);

	function OnGoalFound(err, goal)
	{
		if (err)
		{
			TS.TraceWarning(__filename, err);
			response.status(500).send({ error: err });
			return;
		}

		if (!goal || goal.UserID != userID)
		{
			var errmsg = "Goal not found";
			TS.TraceWarning(__filename, errmsg);
			response.status(500).send({ error: errmsg });
			return;
		}

		goal.Description = updatedGoal.Description;
		goal.Reason = updatedGoal.Reason;
		goal.Priority = updatedGoal.Priority;
		goal.save(OnGoalSaved);

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
	}
};

module.exports = PUT;
// ROOT/api/goals/handlers

var Goal = require("../../../models/goal");

function POST(request, response)
{
	// Create new goalValidateUserSession
	var userID = request.session.userid;
	var goal = request.body["goal"];

	if (!goal)
	{
		response.status(400).send({ error: "Invalid goal" });
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
			console.error(err);
			response.status(500).send({ error: err });
			return;
		}

		response.status(200).end();
	}
};

module.exports = POST;
// ROOT/api/goals/handlers

var Goal = require("../../../models/goal");

function PUT(request, response)
{
	// Update goal
	var userID = request.session.userid;
	var goalID = request.params["id"];
	var updatedGoal = request.body["goal"];

	if (!updatedGoal)
	{
		response.status(400).send({ error: "Invalid goal" });
		return;
	}

	Goal.findByID(goalID, OnGoalFound);

	function OnGoalFound(err, goal)
	{
		if (err)
		{
			console.error(err);
			response.status(500).send({ error: err });
			return;
		}

		if (!goal || goal.UserID != userID)
		{
			var err = "Goal not found";
			console.error(err);
			response.status(500).send({ error: err });
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
				console.error(err);
				response.status(500).send({ error: err });
				return;
			}

			response.status(200).end();
		}
	}
};

module.exports = PUT;
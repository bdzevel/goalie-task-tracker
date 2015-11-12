// ROOT/api/goals/handlers

var Goal = require("../../../models/goal");

function DELETE(request, response)
{
	// Delete goal
	var userID = request.session.userid;
	var goalID = request.params["id"];

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

		goal.remove(OnGoalDeleted);

		function OnGoalDeleted(err, goal)
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

module.exports = DELETE;
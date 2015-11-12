// ROOT/api/goals/handlers

var Goal = require("../../../models/goal");

function GET(request, response)
{
	// Get goals
	var userID = request.session.userid;

	Goal.find({ UserID: userID }, OnGoalFound);

	function OnGoalFound(err, goals)
	{
		if (err)
		{
			console.error(err);
			response.status(500).send({ error: err });
			return;
		}

		response.status(200).send({ goals: goals });
	}
};

module.exports = GET;
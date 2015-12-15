// ROOT/api/goals/handlers

var Goal = require("../goal");
var TS = require("../../diagnostics/trace-sources").Get("Request-Handlers");

function GET(request, response)
{
	// Get goals
	var userID = request.session.userid;

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
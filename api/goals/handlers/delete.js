// ROOT/api/goals/handlers
"use strict";

let Goal = require("../goal");
let TS = require("../../../diagnostics/trace-sources").Get("Request-Handlers");

function DELETE(request, response)
{
	// Delete goal
	let userID = request.session.userid;
	let goalID = request.params["id"];

	Goal.findById(goalID, OnGoalFound);

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
			let errmsg = "Goal not found";
			TS.TraceWarning(__filename, errmsg);
			response.status(500).send({ error: errmsg });
			return;
		}

		goal.remove(OnGoalDeleted);

		function OnGoalDeleted(err, goal)
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

module.exports = DELETE;
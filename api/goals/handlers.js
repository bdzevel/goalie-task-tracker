// ROOT/api/goals

var ValidateUserSession = require("../authentication/validate-user-session");
var Goal = require("../../models/goal");

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

var express = require("express");
var router = express.Router();

router.get("/", ValidateUserSession, GET);
router.post("/", ValidateUserSession, POST);
router.put("/:id", ValidateUserSession, PUT);
router.delete("/:id", ValidateUserSession, DELETE);

module.exports = router;
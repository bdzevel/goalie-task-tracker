// ROOT/api/users

var bcrypt = require("bcrypt");

var ValidateUserSession = require("../authentication/validate-user-session");
var User = require("../../models/user");

function GET(request, response)
{
	// Get user info
	response.status(200).end();
};

function POST(request, response)
{
	// Register new user
	var username = request.body["username"];
	var emailAddress = request.body["email"];
	var password = request.body["password"];
	
	if (!username || username == "")
	{
		var err = "Invalid username";
		console.error(err);
		response.status(400).send({ error: err });
		return;
	}
	User.findOne({ "UserName": username }, OnUserFound);

	function OnUserFound(err, user)
	{
		if (err)
		{
			console.error(err);
			response.status(500).send({ error: err });
			return;
		}

		if (user)
		{
			var err = "User '" + user.UserName + "' already exists!";
			console.error(err);
			response.status(409).send({ error: err });
			return;
		}

		// No user found with this name, we can register it
		var newUser = new User();
		newUser.UserName = username;
		newUser.EMail = emailAddress;
		console.log("3");
		bcrypt.hash(password, 10, OnHashGenerated);
		
		function OnHashGenerated(err, hash)
		{
			if (err)
			{
				console.error(err);
				response.status(500).send({ error: err });
				return;
			}
			newUser.PasswordHash = hash;
			newUser.save(OnUserSaved);
		}

		function OnUserSaved(err, user)
		{
			if (err)
			{
				console.error(err);
				response.status(500).send({ error: err });
				return;
			}
			request.session.userid = user._id;
			response.status(200).end();
		}
	}
};

function PUT(request, response)
{
	// Update user info
	response.status(200).end();
};

function DELETE(request, response)
{
	// Delete user and user's goals
	response.status(200).end();
};

var express = require("express");
var router = express.Router();

router.post("/", POST);

router.get("/:id", ValidateUserSession, GET);
router.put("/:id", ValidateUserSession, PUT);
router.delete("/:id", ValidateUserSession, DELETE);

module.exports = router;
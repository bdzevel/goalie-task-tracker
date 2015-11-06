// ROOT/api/authentication

var bcrypt = require("bcrypt");

var User = require("../../models/user");

function POST(request, response)
{
	// Validate username / password and store session data
	var username = request.body["username"];
	var password = request.body["password"];
	
	if (!username)
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

		if (!user)
		{
			var err = "Invalid username";
			console.error(err);
			response.status(400).send({ error: err });
			return;
		}

		if (!bcrypt.compareSync(password, user.PasswordHash))
		{
			var err = "Invalid password";
			console.error(err);
			response.status(400).send({ error: err });
			return;
		}

		// Correct username and password provided, store session data
		request.session.userid = user._id;
		response.status(200).end();
	}
};

var express = require("express");
var router = express.Router();

router.post("/", POST);

module.exports = router;
// ROOT/api/users/handlers

var bcrypt = require("bcrypt");

var User = require("../../../models/user");

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

module.exports = POST;
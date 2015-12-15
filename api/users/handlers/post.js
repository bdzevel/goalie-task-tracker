// ROOT/api/users/handlers

var bcrypt = require("bcrypt");

var User = require("../user");
var TS = require("../../diagnostics/trace-sources").Get("Request-Handlers");

function POST(request, response)
{
	// Register new user
	var username = request.body["username"];
	var emailAddress = request.body["email"];
	var password = request.body["password"];
	
	if (!username || username == "")
	{
		var errmsg = "Invalid username";
		TS.TraceWarning(__filename, errmsg);
		response.status(400).send({ error: errmsg });
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
			var errmsg = "User '" + user.UserName + "' already exists!";
			TS.TraceWarning(__filename, errmsg);
			response.status(409).send({ error: err });
			return;
		}

		// No user found with this name, we can register it
		var newUser = new User();
		newUser.UserName = username;
		newUser.EMail = emailAddress;
		bcrypt.hash(password, 10, OnHashGenerated);
		
		function OnHashGenerated(err, hash)
		{
			if (err)
			{
				TS.TraceWarning(__filename, err);
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
				TS.TraceWarning(__filename, err);
				response.status(500).send({ error: err });
				return;
			}
			request.session.userid = user._id;
			response.status(200).end();
		}
	}
};

module.exports = POST;
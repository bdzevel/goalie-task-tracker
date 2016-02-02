// ROOT/api/users/handlers
"use strict";

let bcrypt = require("bcrypt");

let User = require("../user");
let TS = require("../../../diagnostics/trace-sources").Get("Request-Handlers");

function POST(request, response)
{
	// Register new user
	let username = request.body["username"];
	let emailAddress = request.body["email"];
	let password = request.body["password"];
	
	if (!username || username == "")
	{
		let errmsg = "Invalid username";
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
			let errmsg = "User '" + user.UserName + "' already exists!";
			TS.TraceWarning(__filename, errmsg);
			response.status(409).send({ error: errmsg });
			return;
		}

		// No user found with this name, we can register it
		let newUser = new User();
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
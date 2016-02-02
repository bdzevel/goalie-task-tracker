// ROOT/api/authentication/handlers
"use strict";

let bcrypt = require("bcrypt");

let User = require("../../users/user");
let TS = require("../../../diagnostics/trace-sources").Get("Request-Handlers");

function POST(request, response)
{
	// Validate username / password and store session data
	let username = request.body["username"];
	let password = request.body["password"];
	
	if (!username)
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
			TS.TraceWarning(__filename, err);
			response.status(500).send({ error: err });
			return;
		}

		if (!user)
		{
			let errmsg = "Invalid username";
			TS.TraceWarning(__filename, errmsg);
			response.status(400).send({ error: errmsg });
			return;
		}

		if (!bcrypt.compareSync(password, user.PasswordHash))
		{
			let errmsg = "Invalid password";
			TS.TraceWarning(__filename, errmsg);
			response.status(400).send({ error: errmsg });
			return;
		}

		// Correct username and password provided, store session data
		request.session.userid = user._id;
		response.status(200).end();
	}
};

module.exports = POST;
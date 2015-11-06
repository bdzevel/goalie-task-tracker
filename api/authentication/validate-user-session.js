// ROOT/api/authentication

var User = require("../../models/user");

function ValidateUserSession(request, response, next)
{
	if (!request.session || !request.session.userid)
	{
		response.status(401).end();
		return;
	}

	User.findById(request.session.userid, OnUserFound);

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
			response.status(401).end();
			return;
		}

		next();
	}
}

module.exports = ValidateUserSession;
// ROOT/api/users/handlers

function DELETE(request, response)
{
	// Delete user and user's goals
	response.status(200).end();
};

module.exports = DELETE;
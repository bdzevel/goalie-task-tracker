var constants = require("../resources/constants.js");
var Dispatcher = require("../dispatcher/dispatcher.js");

var actions = { };

actions.Fetch = function()
{
	Dispatcher.dispatch({ Type: constants.Goals.Actions.Fetch });
}

actions.Create = function(goal)
{
	Dispatcher.dispatch({ Type: constants.Goals.Actions.Create, Payload: goal });
}

actions.Update = function(goal)
{
	Dispatcher.dispatch({ Type: constants.Goals.Actions.Update, payload: goal });
}

actions.Delete = function(goal)
{
	Dispatcher.dispatch({ Type: constants.Goals.Actions.Delete, Payload: goal });
}

actions.Clear = function()
{
	Dispatcher.dispatch({ Type: constants.Goals.Actions.Clear });
}

module.exports = actions;
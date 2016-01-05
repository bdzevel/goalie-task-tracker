var $ = require("jquery");
var AJAX = require("../ajax.js");
var EventEmitter = require("events").EventEmitter;
var constants = require("../resources/constants.js");
var Dispatcher = require("../dispatcher/dispatcher.js");

var _Goals = [];

function GoalStore() { }
GoalStore.prototype = new EventEmitter();

GoalStore.prototype.GetGoals = function()
{
	return _Goals;
}

GoalStore.prototype.NotifyUpdated = function()
{
	this.emit(constants.Goals.Events.Updated);
}
GoalStore.prototype.AddUpdateListener = function(callback)
{
	this.on(constants.Goals.Events.Updated, callback);
}
GoalStore.prototype.RemoveUpdateListener = function(callback)
{
	this.removeListener(constants.Goals.Events.Updated, callback);
}

var store = new GoalStore();
Dispatcher.register(GoalActionHandler);

function GoalActionHandler(action)
{
	if (action.Type === constants.Goals.Actions.Fetch)
	{
		Fetch();
	}
	else if (action.Type == constants.Goals.Actions.Create)
	{
		Create(action.Payload);
	}
	else if (action.Type == constants.Goals.Actions.Update)
	{
		Update(action.Payload);
	}
	else if (action.Type == constants.Goals.Actions.Delete)
	{
		Delete(action.Payload);
	}
	else if (action.Type == constants.Goals.Actions.Clear)
	{
		for (var i in _Goals)
		{
			var goal = _Goals[i];
			Delete(goal);
		}
	}
	else
	{
		console.error("Not Implemented: " + action.Type);
	}
}

function OnError(result)
{
	console.error("ERROR");
	console.error(result);
}

function Fetch()
{
	AJAX("GET", constants.Goals.URL, OnFetched, OnError);
}
function OnFetched(result)
{
	_Goals = result.goals;
	store.NotifyUpdated();
}

function Create(goal)
{
	var body = JSON.stringify({ goal: goal});
	AJAX("POST", constants.Goals.URL, OnCreated, OnError, body);
}
function OnCreated(result)
{
	_Goals.push(result.goal);
	store.NotifyUpdated();
}

function Update(goal)
{
	var body = JSON.stringify({ goal: goal});
	AJAX("PUT", constants.Goals.URL + "/" + goal._id, OnUpdated, OnError, body);
}
function OnUpdated(result)
{
	_Goals = $.grep(_Goals, function(g) { return (g._id !== result.goal._id); });
	_Goals.push(result.goal);
	store.NotifyUpdated();
}

function Delete(goal)
{
	var body = JSON.stringify({ id: goal._id});
	AJAX("DELETE", constants.Goals.URL + "/" + goal._id, OnDeleted, OnError, body);
}
function OnDeleted(result)
{
	_Goals = $.grep(_Goals, function(g) { return (g._id !== result.goal._id); });
	store.NotifyUpdated();
}

module.exports = store;
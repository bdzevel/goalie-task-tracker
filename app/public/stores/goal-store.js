var $ = require("jquery");
var AJAX = require("../ajax.js");
var EventEmitter = require("events").EventEmitter;
var Dispatcher = require("../dispatcher/dispatcher.js");
var constants = require("../resources/constants.js").Goals;

var _Goals = [];

function GoalStore() { }
GoalStore.prototype = new EventEmitter();

GoalStore.prototype.GetGoals = function()
{
	return _Goals;
}

GoalStore.prototype.NotifyUpdate = function(goal)
{
	this.emit(constants.Events.OnUpdate, goal);
}
GoalStore.prototype.AddUpdateListener = function(callback)
{
	this.on(constants.Events.OnUpdate, callback);
}
GoalStore.prototype.RemoveUpdateListener = function(callback)
{
	this.removeListener(constants.Events.OnUpdate, callback);
}

GoalStore.prototype.NotifyUpdateAll = function()
{
	this.emit(constants.Events.OnUpdateAll);
}
GoalStore.prototype.AddUpdateAllListener = function(callback)
{
	this.on(constants.Events.OnUpdateAll, callback);
}
GoalStore.prototype.RemoveUpdateAllListener = function(callback)
{
	this.removeListener(constants.Events.OnUpdateAll, callback);
}

var store = new GoalStore();
Dispatcher.register(GoalActionHandler);

function GoalActionHandler(action)
{
	if (action.Type === constants.Actions.Fetch)
	{
		Fetch();
	}
	else if (action.Type == constants.Actions.Create)
	{
		Create(action.Payload);
	}
	else if (action.Type == constants.Actions.Update)
	{
		Update(action.Payload);
	}
	else if (action.Type == constants.Actions.Delete)
	{
		Delete(action.Payload);
	}
	else if (action.Type == constants.Actions.CompleteAll)
	{
		for (var i in _Goals)
		{
			let goal = _Goals[i];
			if (goal.IsComplete)
				continue;
			goal.IsComplete = true;
			Update(goal);
		}
	}
	else if (action.Type == constants.Actions.Clear)
	{
		for (var i in _Goals)
		{
			let goal = _Goals[i];
			Delete(goal);
		}
	}
}

function OnError(result)
{
	console.error("ERROR");
	console.error(result);
}

function Fetch()
{
	AJAX("GET", constants.URL, OnFetched, OnError);
}
function OnFetched(result)
{
	_Goals = result.goals.map(NormalizeDate);
	store.NotifyUpdateAll();
}

function Create(goal)
{
	let body = JSON.stringify({ goal: goal});
	AJAX("POST", constants.URL, OnCreated, OnError, body);
}
function OnCreated(result)
{
	let goal = NormalizeDate(result.goal);
	_Goals.push(goal);
	store.NotifyUpdateAll();
}

function Update(goal)
{
	let body = JSON.stringify({ goal: goal });
	AJAX("PUT", constants.URL + "/" + goal._id, OnUpdated, OnError, body);
}
function OnUpdated(result)
{
	let goal = NormalizeDate(result.goal);
	_Goals = $.grep(_Goals, function(g) { return (g._id !== goal._id); });
	_Goals.push(goal);
	store.NotifyUpdate(goal);
}

function Delete(goal)
{
	let body = JSON.stringify({ id: goal._id});
	AJAX("DELETE", constants.URL + "/" + goal._id, OnDeleted, OnError, body);
}
function OnDeleted(result)
{
	_Goals = $.grep(_Goals, function(g) { return (g._id !== result.goal._id); });
	store.NotifyUpdateAll();
}

function NormalizeDate(goal)
{
	goal.Date = new Date(goal.Date);
	return goal;
}

module.exports = store;
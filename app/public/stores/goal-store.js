var $ = require('jquery');
var EventEmitter = require('events').EventEmitter;
var Dispatcher = require("../dispatcher/dispatcher.js");

var UPDATED_EVENT = "GOALS.UPDATED";
var POPULATED_EVENT = "GOALS.POPULATED";

var GoalStore = { };
GoalStore.prototype = Object.create(EventEmitter.prototype);
GoalStore.prototype.Get = function()
{
	$.ajax({
		async: true,
		method: "GET",
		url: "https://localhost:444/api/goals",
		contentType: "application/json",
		success: this.PopulateGoals,
		error: this.HandleError
	});
}
GoalStore.prototype.PopulateGoals = function(result)
{
	var goals = result.responseJSON;
	console.log(goals);
}
GoalStore.prototype.HandleError = function(result)
{
	console.log("ERROR");
	console.log(result);
}
GoalStore.prototype.NotifyPopulated = function()
{
	this.emit(POPULATED_EVENT);
}
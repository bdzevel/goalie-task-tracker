var $ = require('jquery');
var EventEmitter = require('events').EventEmitter;
var Dispatcher = require("../dispatcher/dispatcher.js");

var UPDATED_EVENT = "GOAL.UPDATED";

var GoalStore = { };
GoalStore.prototype = Object.create(EventEmitter.prototype);
GoalStore.prototype.Get = function(session)
{
	$.ajax({
		async: true,
		method: "POST",
		url: "https://localhost:444/api/goals",
		contents: { username: this.state.username, password: this.state.password },
		contentType: "application/json",
		success: this.SetSuccess,
		error: this.OnError
	});
}
GoalStore.prototype.NotifyUpdated = function()
{
	this.emit(UPDATED_EVENT);
}
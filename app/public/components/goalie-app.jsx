var $ = require('jquery');
var NavBar = require("./navbar.jsx");
var Content = require("./content.jsx");

var GoalieAppSpec = { };
GoalieAppSpec.ValidateSession = function()
{
	console.log(window.location.hostname);
	$.ajax({
		async: true,
		method: "GET",
		url: "https://" + window.location.hostname + ":444/api/authentication",
		contentType: "application/json",
		xhrFields: { withCredentials: true },
		success: this.InitializeValidSession,
		error: this.InitializeCleanSession
	});
}
GoalieAppSpec.LogOut = function()
{
	$.ajax({
		async: true,
		method: "DELETE",
		url: "https://" + window.location.hostname + ":444/api/authentication",
		contentType: "application/json",
		xhrFields: { withCredentials: true },
		success: this.ResetState,
		error: this.ResetState
	});
}
GoalieAppSpec.InitializeValidSession = function(result)
{
	// The user does has a valid session,
	//	so we are initializing as logged-in
	this.HandleLogIn();
}
GoalieAppSpec.InitializeCleanSession = function(result)
{
	// The user does not have a valid session,
	//	so we are initializing a "blank slate"
}
GoalieAppSpec.ResetState = function(result)
{
	this.setState(this.getInitialState());
}
GoalieAppSpec.HandleNavigation = function(type)
{
	if (type == "Sign Out")
		this.HandleLogOut();
	this.setState({ type: type });
}
GoalieAppSpec.HandleLogIn = function(session)
{
	this.setState({ type: "Home", hasUserSession: true });
}
GoalieAppSpec.HandleLogOut = function()
{
	this.LogOut();
}
GoalieAppSpec.getInitialState = function()
{
	return { type: "Home", hasUserSession: false };
}
GoalieAppSpec.componentDidMount = function()
{
	this.ValidateSession();
}
GoalieAppSpec.render = function()
{
	return (
		<div className="goalieApp">
			<NavBar hasUserSession={this.state.hasUserSession}
				onClick={this.HandleNavigation} />
			<Content hasUserSession={this.state.hasUserSession} type={this.state.type}
				onLogIn={this.HandleLogIn} />
		</div>
	);
}

var React = require('react');
var GoalieApp = React.createClass(GoalieAppSpec);
module.exports = GoalieApp;
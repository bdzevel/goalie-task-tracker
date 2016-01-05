var AJAX = require("../ajax.js");
var NavBar = require("./navbar.jsx");
var Content = require("./content.jsx");
var actions = require("../actions/goal-actions.js");
var GoalStore = require("../stores/goal-store.js");
var constants = require("../resources/constants.js");

var GoalieAppSpec = { };

GoalieAppSpec.ValidateSession = function()
{
	AJAX("GET", constants.Authentication.URL, this.InitializeValidSession, this.InitializeCleanSession);
}

GoalieAppSpec.LogOut = function()
{
	AJAX("DELETE", constants.Authentication.URL, this.ResetState, this.ResetState);
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

GoalieAppSpec.HandleLogIn = function()
{
	this.setState({ type: "Home", hasUserSession: true, goals: [] });
	actions.Fetch();
}

GoalieAppSpec.HandleLogOut = function()
{
	this.LogOut();
}

GoalieAppSpec.UpdateGoals = function()
{
	this.setState({ goals: GoalStore.GetGoals() });
}

GoalieAppSpec.getInitialState = function()
{
	return { type: "Home", hasUserSession: false, goals: [] };
}

GoalieAppSpec.componentDidMount = function()
{
	GoalStore.AddUpdateListener(this.UpdateGoals);
	this.ValidateSession();
}

GoalieAppSpec.componentWillUnmount = function()
{
	GoalStore.RemoveUpdateListener(this.UpdateGoals);
}

GoalieAppSpec.render = function()
{
	return (
		<div className="goalieApp">
			<NavBar hasUserSession={this.state.hasUserSession}
				onClick={this.HandleNavigation} />
			<Content hasUserSession={this.state.hasUserSession} type={this.state.type}
				onLogIn={this.HandleLogIn} goals={this.state.goals} />
		</div>
	);
}

var React = require('react');
var GoalieApp = React.createClass(GoalieAppSpec);
module.exports = GoalieApp;
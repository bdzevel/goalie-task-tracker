var NavBar = require("./navbar/navbar.jsx");
var Content = require("./content/content.jsx");

var GoalieAppSpec = { };
GoalieAppSpec.HandleNavigation = function(type)
{
	this.setState({ type: type });
};
GoalieAppSpec.HandleLogIn = function(session)
{
	this.UserSession = session;
	this.setState(this.getInitialState());
};
GoalieAppSpec.HandleLogOut = function()
{
	this.UserSession = "";
	this.setState(this.getInitialState());
};
GoalieAppSpec.getInitialState = function()
{
	return { type: "Home" };
};
GoalieAppSpec.componentDidMount = function()
{
	this.setState(this.getInitialState());
};
GoalieAppSpec.render = function()
{
	return (
		<div className="goalieApp">
			<h1>HELLO, GOALIE-APP</h1>
			<NavBar onClick={this.HandleNavigation} />
			<Content type={this.state.type} onLogIn={this.HandleLogIn} onLogOut={this.HandleLogOut} />
		</div>
	);
};

var React = require('react');
var ReactDOM = require('react-dom');
var GoalieApp = React.createClass(GoalieAppSpec);
ReactDOM.render(<GoalieApp />, document.getElementById("goalie-app"));
var NavBar = require("./navbar/navbar.jsx");
var Content = require("./content/content.jsx");

var GoalieAppSpec = { };
GoalieAppSpec.HandleNavigation = function(type)
{
	this.setState({ type: type });
}
GoalieAppSpec.getInitialState = function() {
	return { };
};
GoalieAppSpec.componentDidMount = function() {
	this.setState({ });
};
GoalieAppSpec.render = function()
{
	return (
		<div className="goalieApp">
			<h1>HELLO, GOALIE-APP</h1>
			<NavBar onClick={this.HandleNavigation} />
			<Content type={this.state.type} />
		</div>
	);
};

var React = require('react');
var ReactDOM = require('react-dom');
var GoalieApp = React.createClass(GoalieAppSpec);
ReactDOM.render(<GoalieApp />, document.getElementById("goalie-app"));
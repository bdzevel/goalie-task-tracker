require("./content/content.jsx");

var GoalieAppSpec = { };
GoalieAppSpec.render = function()
{
	return (
		<div className="goalieApp">
			<div id="navbar" />
			<div id="content" />
		</div>
	);
};

var GoalieApp = React.createClass(GoalieAppSpec);
ReactDOM.render(<GoalieApp />, document.getElementById("goalie-app"));
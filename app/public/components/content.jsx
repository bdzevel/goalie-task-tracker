var LoginForm = require("./login.jsx");
var GoalList = require("./goal-list.jsx");
var NewGoalForm = require("./new-goal.jsx");
var RegisterForm = require("./register.jsx");

var ContentSpec = { };
ContentSpec.HandleLogIn = function()
{
	this.props.onLogIn();
};
ContentSpec.render = function()
{
	var dynamicContent = (
		<br />
	);
	if (this.props.type)
	{
		if (this.props.type == "Home")
		{
			if (this.props.hasUserSession && this.props.goals && this.props.goals !== [])
			{
				var goals = this.props.goals;
				dynamicContent = (
					<div>
						<GoalList goals={goals} />
						<NewGoalForm />
					</div>
				);
			}
			else if (this.props.hasUserSession)
			{
				dynamicContent = (
					<div>
						<h3>No goals! Submit one!!</h3>
						<NewGoalForm />
					</div>
				);
			}
			else
			{
				dynamicContent = (
					<h3>Please sign in</h3>
				);
			}
		}
		else if (this.props.type == "Sign In")
		{
			dynamicContent = (
				<LoginForm onSuccess={this.HandleLogIn} />
			);
		}
		else if (this.props.type == "Register")
		{
			dynamicContent = (
				<RegisterForm onSuccess={this.HandleLogIn} />
			);
		}
		else if (this.props.type == "Sign Out")
		{
			dynamicContent = (
				<h3>You have clicked on {this.props.type}!</h3>
			);
		}
	}
	return (
		<div className="content">
			{dynamicContent}
		</div>
	);
};

var React = require("react");
var Content = React.createClass(ContentSpec);
module.exports = Content;
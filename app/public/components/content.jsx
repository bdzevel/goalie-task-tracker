var LoginForm = require("./login.jsx");
var RegisterForm = require("./register.jsx");

var ContentSpec = { };
ContentSpec.HandleLogIn = function(session)
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
			dynamicContent = (
				<h3>You have clicked on {this.props.type}!</h3>
			);
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
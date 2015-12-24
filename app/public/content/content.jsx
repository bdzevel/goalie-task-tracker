var LoginForm = require("./login/login.jsx");
var RegisterForm = require("./register/register.jsx");

var ContentSpec = { };
ContentSpec.HandleLogIn(session)
{
	this.props.onLogIn(session);
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
				<LoginForm onSuccess=this.HandleLogIn />
			);
		}
		else if (this.props.type == "Register")
		{
			dynamicContent = (
				<RegisterForm onSuccess=this.HandleLogIn />
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
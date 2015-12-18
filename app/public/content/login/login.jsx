var $ = require('jquery');

var LoginFormSpec = { };
LoginFormSpec.ValidateCredentials = function()
{
	$.ajax({
		async: true,
		method: "POST",
		url: "https://localhost:444/api/authentication",
		contents: { username: this.state.username, password: this.state.password },
		contentType: "application/json",
		success: this.SetSuccess,
		error: this.SetError
	});
};
LoginFormSpec.SetSuccess = function(result)
{
	this.setState({ success: "Success!" });
};
LoginFormSpec.SetError = function(result)
{
	this.setState({ error: result.responseJSON.error });
};
LoginFormSpec.HandleLogIn = function(e)
{
	e.preventDefault();
	this.ValidateCredentials();
};
LoginFormSpec.HandleUserNameChange = function(e)
{
	this.setState({ username: e.target.value });
};
LoginFormSpec.HandlePasswordChange = function(e)
{
	this.setState({ password: e.target.value });
};
LoginFormSpec.getInitialState = function()
{
	return ({ });
};
LoginFormSpec.componentDidMount = function()
{
	this.setState({ });
};
LoginFormSpec.render = function()
{
	var message = "";
	if (this.state.success)
	{
		message = (
			<p><font color="green">Success!</font></p>
		);
	}
	if (this.state.error)
	{
		message = (
			<p><font color="red">{this.state.error}</font></p>
		);
	}
	return (
		<form className="loginForm" onSubmit={this.HandleLogIn}>
			<p><input type="text" placeholder="Username" value={this.state.username} onChange={this.HandleUserNameChange} /></p>
			<p><input type="password" placeholder="Password" value={this.state.password} onChange={this.HandlePasswordChange} /></p>
			<p><input type="submit" value="Log In" /></p>
			{message}
		</form>
	);
};

var React = require("react");
var LoginForm = React.createClass(LoginFormSpec);
module.exports = LoginForm;
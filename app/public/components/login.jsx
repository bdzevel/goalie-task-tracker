var $ = require('jquery');

var LoginFormSpec = { };
LoginFormSpec.ValidateCredentials = function()
{
	var body = { username: this.state.username, password: this.state.password };
	var jsonBody = JSON.stringify(body);
	$.ajax({
		async: true,
		method: "POST",
		url: "https://" + window.location.hostname + ":444/api/authentication",
		data: jsonBody,
		contentType: "application/json",
		xhrFields: { withCredentials: true },
		success: this.SetSuccess,
		error: this.SetError
	});
}
LoginFormSpec.SetSuccess = function(result)
{
	this.setState({ success: "Success!" , error: "" });
	this.props.onSuccess(result.session);
}
LoginFormSpec.SetError = function(result)
{
	this.setState({ success: "", error: result.responseJSON.error });
}
LoginFormSpec.HandleLogIn = function(e)
{
	e.preventDefault();
	this.ValidateCredentials();
}
LoginFormSpec.HandleUserNameChange = function(e)
{
	this.setState({ username: e.target.value });
}
LoginFormSpec.HandlePasswordChange = function(e)
{
	this.setState({ password: e.target.value });
}
LoginFormSpec.getInitialState = function()
{
	return ({ });
}
LoginFormSpec.componentDidMount = function() { }
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
			<p className="error">{this.state.error}</p>
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
}

var React = require("react");
var LoginForm = React.createClass(LoginFormSpec);
module.exports = LoginForm;
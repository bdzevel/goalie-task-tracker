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
	this.setState({ success: "Success!" , error: "" });
	console.log(result);
	this.props.onSuccess(result.session);
};
LoginFormSpec.SetError = function(result)
{
	this.setState({ success: "", error: result.responseJSON.error });
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
	this.setState(this.getInitialState());
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
			<p class="error">{this.state.error}</p>
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
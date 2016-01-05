var AJAX = require("../ajax.js");
var constants = require("../resources/constants.js");

var RegisterFormSpec = { };

RegisterFormSpec.NewUser = function()
{
	var body = JSON.stringify({ username: this.state.username, email: this.state.email, password: this.state.password });
	AJAX("POST", constants.Users.URL, this.SetSuccess, this.SetError, body);
}

RegisterFormSpec.SetSuccess = function(result)
{
	this.setState({ success: "Success!", error: undefined });
	this.props.onSuccess(result.session);
}

RegisterFormSpec.SetError = function(result)
{
	this.setState({ success: undefined, error: result.responseJSON.error });
}

RegisterFormSpec.HandleRegister = function(e)
{
	e.preventDefault();
	this.NewUser();
}

RegisterFormSpec.HandleUserNameChange = function(e)
{
	this.setState({ username: e.target.value });
}

RegisterFormSpec.HandleEmailChange = function(e)
{
	
	this.setState({ email: e.target.value });
}
RegisterFormSpec.HandlePasswordChange = function(e)
{
	this.setState({ password: e.target.value });
}

RegisterFormSpec.getInitialState = function()
{
	return { };
}

RegisterFormSpec.componentDidMount = function() { }

RegisterFormSpec.render = function() {
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
		<form className="registerForm" onSubmit={this.HandleRegister}>
			<p><input type="text" placeholder="Username" value={this.state.username} onChange={this.HandleUserNameChange} /></p>
			<p><input type="text" placeholder="E-Mail" value={this.state.email} onChange={this.HandleEmailChange} /></p>
			<p><input type="password" placeholder="Password" value={this.state.password} onChange={this.HandlePasswordChange} /></p>
			<p><input type="submit" value="Register" /></p>
			{message}
		</form>
	);
}

var React = require("react");
var RegisterForm = React.createClass(RegisterFormSpec);
module.exports = RegisterForm;
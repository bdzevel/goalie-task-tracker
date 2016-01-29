var Input = require("react-bootstrap").Input;
var ButtonInput = require("react-bootstrap").ButtonInput;

var UserStore = require("../stores/user-store.js");
var UserActions = require("../actions/user-actions.js");

var RegisterFormSpec = { };

RegisterFormSpec.HandleRegister = function(e)
{
	e.preventDefault();
	if (!this.Validate())
		return;
	this.setState({ error: null });
	UserActions.Create(this.state);
}

RegisterFormSpec.Validate = function()
{
	if (!this.state.username || this.state.username.length === 0)
	{
		this.setState({ password: "", confirmPassword: "", error: "Enter a username." });
		return false;
	}
	if (!this.state.password || this.state.password.length === 0)
	{
		this.setState({ password: "", confirmPassword: "", error: "Enter a password." });
		return false;
	}
	if (this.state.password !== this.state.confirmPassword)
	{
		this.setState({ password: "", confirmPassword: "", error: "Passwords don't match." });
		return false;
	}
	return true;
}

RegisterFormSpec.HandleError = function(error)
{
	this.setState({ password: "", confirmPassword: "", error: error });
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

RegisterFormSpec.HandleConfirmPasswordChange = function(e)
{
	this.setState({ confirmPassword: e.target.value });
}

RegisterFormSpec.getUsernameValidity = function()
{
	if (!this.state.username)
		return "error";
	if (this.state.username.length === 0)
		return "error";
	return "success";
}

RegisterFormSpec.getPasswordValidity = function()
{
	if (!this.state.password)
		return "error";
	if (this.state.password.length === 0)
		return "error";
	return "success";
}

RegisterFormSpec.getConfirmPasswordValidity = function()
{
	if (!this.state.confirmPassword)
		return "error";
	if (this.state.confirmPassword.length === 0)
		return "error";
	if (this.state.password !== this.state.confirmPassword)
		return "error";
	return "success";
}

RegisterFormSpec.componentDidMount = function()
{
	UserStore.AddErrorListener(this.HandleError);
}

RegisterFormSpec.componentWillUnmount = function()
{
	UserStore.RemoveErrorListener(this.HandleError);
}

RegisterFormSpec.getInitialState = function()
{
	return { };
}

RegisterFormSpec.render = function()
{
	var message = "";
	if (this.state.error)
		message = <p className="error">{this.state.error}</p>;
	return (
		<form onSubmit={this.HandleRegister}>
			<Input className="user-input" label="Username" type="text" bsStyle={this.getUsernameValidity()} value={this.state.username} onChange={this.HandleUserNameChange} />
			<Input className="user-input" label="Email Address" type="text" placeholder="Optional" value={this.state.email} onChange={this.HandleEmailChange} />
			<Input className="user-input" label="Password" type="password" bsStyle={this.getPasswordValidity()} value={this.state.password} onChange={this.HandlePasswordChange} />
			<Input className="user-input" label="Confirm Password" type="password" bsStyle={this.getConfirmPasswordValidity()} value={this.state.confirmPassword} onChange={this.HandleConfirmPasswordChange} />
			<ButtonInput type="submit" value="Register" />
			{message}
		</form>
	);
}

var React = require("react");
var RegisterForm = React.createClass(RegisterFormSpec);
module.exports = RegisterForm;
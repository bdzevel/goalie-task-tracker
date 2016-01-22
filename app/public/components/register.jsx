var UserStore = require("../stores/user-store.js");
var UserActions = require("../actions/user-actions.js");

var RegisterFormSpec = { };

RegisterFormSpec.HandleRegister = function(e)
{
	e.preventDefault();
	this.setState({ error: null });
	UserActions.Create(this.state);
}

RegisterFormSpec.HandleError = function(error)
{
	this.setState({ error: error });
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

RegisterFormSpec.componentDidMount = function()
{
	UserStore.AddErrorListener(this.HandleError);
}

RegisterFormSpec.componentWillUnmount = function()
{
	UserStore.RemoveErrorListener(this.HandleError);
}

RegisterFormSpec.render = function() {
	var message = "";
	if (this.state.error)
		message = <p className="error">{this.state.error}</p>;
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
var AuthStore = require("../stores/auth-store.js");
var AuthActions = require("../actions/auth-actions.js");

var LoginFormSpec = { };

LoginFormSpec.HandleLogIn = function(e)
{
	e.preventDefault();
	this.setState({ error: null });
	AuthActions.SignIn(this.state);
}

LoginFormSpec.HandleError = function(error)
{
	this.setState({ error: error });
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

LoginFormSpec.componentDidMount = function()
{
	AuthStore.AddErrorListener(this.HandleError);
}

LoginFormSpec.componentWillUnmount = function()
{
	AuthStore.RemoveErrorListener(this.HandleError);
}

LoginFormSpec.render = function()
{
	var message = "";
	if (this.state.error)
		message = <p className="error">{this.state.error}</p>;
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
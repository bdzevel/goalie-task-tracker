var jquery = require("jquery");

var RegisterFormSpec = { };
RegisterFormSpec.NewUser = function()
{
	$.ajax({
		async: true,
		method: "POST",
		url: "https://localhost:444/api/users",
		contents: { username: this.state.username, email: this.state.email, password: this.state.password },
		contentType: "application/json",
		success: this.SetSuccess,
		error: this.SetError
	});
};
LoginFormSpec.SetSuccess = function(result)
{
	this.setState({ success: "Success!" });
	console.log(result);
	this.props.onSuccess(result.session);
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
LoginFormSpec.HandleEmailChange = function(e)
{
	this.setState({ email: e.target.value });
};
LoginFormSpec.HandlePasswordChange = function(e)
{
	this.setState({ password: e.target.value });
};
RegisterFormSpec.getInitialState = function() {
	return { };
};
RegisterFormSpec.componentDidMount = function() {
	this.setState({ });
};
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
			<p class="error">{this.state.error}</p>
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
};

var React = require("react");
var RegisterForm = React.createClass(RegisterFormSpec);
module.exports = RegisterForm;
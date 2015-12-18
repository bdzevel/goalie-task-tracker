var NavBarSpec = { };
NavBarSpec.OnClickHome = function(e)
{
	this.setState({text: "HOME CLICKED" });
	this.props.onClick("Home");
};
NavBarSpec.OnClickSignIn = function(e)
{
	this.setState({text: "SIGN IN CLICKED" });
	this.props.onClick("Sign In");
};
NavBarSpec.OnClickRegister = function(e)
{
	this.setState({text: "REGISTER CLICKED" });
	this.props.onClick("Register");
};
NavBarSpec.getInitialState = function() {
	return { text: "" };
};
NavBarSpec.componentDidMount = function() {
	this.setState({ text: "" });
};
NavBarSpec.render = function()
{
	return (
		<div className="navbar">
			<a onClick={this.OnClickHome}>Home</a> | <a onClick={this.OnClickSignIn}>Sign In</a> | <a onClick={this.OnClickRegister}>Register</a>
			<br />
			<h3>{this.state.text}</h3>
		</div>
	);
};

var React = require("react");
var NavBar = React.createClass(NavBarSpec);
module.exports = NavBar;
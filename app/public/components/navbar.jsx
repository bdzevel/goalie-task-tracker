var NavBarSpec = { };

NavBarSpec.CanGoHome = function()
{
	return true;
}
NavBarSpec.OnClickHome = function(e)
{
	this.props.onClick("Home");
}

NavBarSpec.CanSignIn = function()
{
	return !this.props.hasUserSession;
}
NavBarSpec.OnClickSignIn = function(e)
{
	this.props.onClick("Sign In");
}

NavBarSpec.CanRegister = function()
{
	return !this.props.hasUserSession;
}
NavBarSpec.OnClickRegister = function(e)
{
	this.props.onClick("Register");
}

NavBarSpec.CanSignOut = function()
{
	return this.props.hasUserSession;
}
NavBarSpec.OnClickSignOut = function(e)
{
	this.props.onClick("Sign Out");
}
NavBarSpec.getInitialState = function()
{
	return { };
}
NavBarSpec.componentWillMount = function()
{
	this.CurrentID = 0;
	this.Actions = [];
	this.RegisterAction("Home", this.CanGoHome, this.OnClickHome);
	this.RegisterAction("Sign In", this.CanSignIn, this.OnClickSignIn);
	this.RegisterAction("Register", this.CanRegister, this.OnClickRegister);
	this.RegisterAction("Sign Out", this.CanSignOut, this.OnClickSignOut);
}
NavBarSpec.RegisterAction = function(name, canExecuteCallback, executeCallback)
{
	this.Actions.push({ Name: name, ID: this.CurrentID++, CanExecute: canExecuteCallback, Execute: executeCallback });
}
NavBarSpec.componentDidMount = function() { }
NavBarSpec.render = function()
{
	var links = this.Actions.map(function(action)
	{
		if (action.CanExecute())
		{
			return (
				<a key={action.Name} onClick={action.Execute}>{action.Name}&nbsp;&nbsp;</a>
			);
		}
		else
		{
			return null;
		}
	});
	var navBar = (
		<div className="navbar">
			{links}
		</div>
	);
	return navBar;
}

var React = require("react");
var NavBar = React.createClass(NavBarSpec);
module.exports = NavBar;
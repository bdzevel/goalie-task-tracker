var AuthStore = require("../stores/auth-store.js");
var NavActions = require("../actions/nav-actions.js");
var AuthActions = require("../actions/auth-actions.js");

var NavBarSpec = { };

NavBarSpec.CanGoHome = function()
{
	return true;
}
NavBarSpec.OnClickHome = function(e)
{
	e.preventDefault();
	NavActions.NavigateHome();
}

NavBarSpec.CanSignIn = function()
{
	return !this.state.isSignedIn;
}
NavBarSpec.OnClickSignIn = function(e)
{
	e.preventDefault();
	NavActions.NavigateSignIn();
}

NavBarSpec.CanRegister = function()
{
	return !this.state.isSignedIn;
}
NavBarSpec.OnClickRegister = function(e)
{
	e.preventDefault();
	NavActions.NavigateRegister();
}

NavBarSpec.CanSignOut = function()
{
	return this.state.isSignedIn;
}
NavBarSpec.OnClickSignOut = function(e)
{
	e.preventDefault();
	
	// This is the only nav-bar option that doesn't "navigate"
	//	There's no "sign out" page - it just signs out
	AuthActions.SignOut();
}

NavBarSpec.OnSignIn = function()
{
	this.setState({ isSignedIn: true });
}
NavBarSpec.OnSignOut = function()
{
	this.setState({ isSignedIn: false });
}

NavBarSpec.getInitialState = function()
{
	return { };
}

NavBarSpec.componentWillMount = function()
{
	this.Actions = [];
	this.RegisterAction("Home", this.CanGoHome, this.OnClickHome);
	this.RegisterAction("Sign In", this.CanSignIn, this.OnClickSignIn);
	this.RegisterAction("Register", this.CanRegister, this.OnClickRegister);
	this.RegisterAction("Sign Out", this.CanSignOut, this.OnClickSignOut);
}

NavBarSpec.RegisterAction = function(name, canExecuteCallback, executeCallback)
{
	this.Actions.push({ Name: name, CanExecute: canExecuteCallback, Execute: executeCallback });
}

NavBarSpec.componentDidMount = function()
{
	AuthStore.AddSignInListener(this.OnSignIn);
	AuthStore.AddSignOutListener(this.OnSignOut);
}

NavBarSpec.componentWillUnmount = function()
{
	AuthStore.RemoveSignInListener(this.OnSignIn);
	AuthStore.RemoveSignOutListener(this.OnSignOut);
}

NavBarSpec.render = function()
{
	var links = this.Actions.map(function(action)
	{
		if (action.CanExecute())
		{
			return (
				<b key={action.Name} ><a href="#" onClick={action.Execute}>{action.Name}</a>&nbsp;&nbsp;</b>
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
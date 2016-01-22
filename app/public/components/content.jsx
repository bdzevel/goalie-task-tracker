var LoginForm = require("./login.jsx");
var GoalList = require("./goal-list.jsx");
var NewGoalForm = require("./new-goal.jsx");
var RegisterForm = require("./register.jsx");

var NavStore = require("../stores/nav-store.js");
var AuthStore = require("../stores/auth-store.js");
var constants = require("../resources/constants.js");

var ContentSpec = { };

ContentSpec.Navigate = function(action)
{
	this.setState({ type: action });
}

ContentSpec.OnSignIn = function()
{
	this.setState({ type: constants.Navigation.Pages.Home, isSignedIn: true });
}

ContentSpec.OnSignOut = function()
{
	this.setState(this.getInitialState());
}

ContentSpec.componentDidMount = function()
{
	NavStore.AddNavigateListener(this.Navigate);
	
	AuthStore.AddSignInListener(this.OnSignIn);
	AuthStore.AddSignOutListener(this.OnSignOut);
}

ContentSpec.componentWillUnmount = function()
{
	NavStore.RemoveNavigateListener(this.Navigate);
	
	AuthStore.RemoveSignInListener(this.OnSignIn);
	AuthStore.RemoveSignOutListener(this.OnSignOut);
}

ContentSpec.getInitialState = function()
{
	return { type: constants.Navigation.Pages.Home, isSignedIn: false };
}

ContentSpec.render = function()
{
	var dynamicContent = <br />;
	if (this.state.type == constants.Navigation.Pages.Home)
	{
		if (this.state.isSignedIn)
		{
			var goals = this.props.goals;
			dynamicContent = (
				<div>
					<GoalList />
					<NewGoalForm />
				</div>
			);
		}
		else
		{
			dynamicContent = <h3>Please sign in...</h3>;
		}
	}
	else if (this.state.type == constants.Navigation.Pages.SignIn)
	{
		dynamicContent = <LoginForm />;
	}
	else if (this.state.type == constants.Navigation.Pages.Registration)
	{
		dynamicContent = <RegisterForm />;
	}
	return (
		<div className="content">
			{dynamicContent}
		</div>
	);
};

var React = require("react");
var Content = React.createClass(ContentSpec);
module.exports = Content;
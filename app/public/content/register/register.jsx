var jquery = require("jquery");

var LoginFormSpec = { };
LoginFormSpec.NewUser = function()
{
	$.ajax({
		async: true,
		method: "POST",
		url: "https://localhost:444/api/users",
		contents: { username: user, email: email, password: pass },
		contentType: "application/json",
		success: function(result) { console.log(result); },
		error: function(result) { console.log(result); }
	});
	this.state.data.push({ id: ++curid, author: "rando" + curid, text: "forgettable comment " + curid});
	this.setState(this.state);
};
	
LoginFormSpec.getInitialState = function() {
		return {data: []};
	},
LoginFormSpec.componentDidMount = function() {
		this.setState({ data: internalData });
	},
LoginFormSpec.render = function() {
		return (
		<div className="loginForm">
		<h1>Log In</h1>
		<form className="commentForm" onSubmit={this.handleSubmit}>
		<p><input type="text" placeholder="Name" value={this.state.author} onChange={this.handleAuthorChange} /></p>
		<p><input type="text" placeholder="say something..." value={this.state.text} onChange={this.handleTextChange} /></p>
		<p><input type="submit" value="Post" /></p>
		</form>
		</div>
	);
};

var React = require("react");
var LoginForm = React.createClass(LoginFormSpec);
module.exports = LoginForm;
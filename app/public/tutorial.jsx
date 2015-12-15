var curid = 0;
var internalData =
[
	{id: ++curid, author: "Pete Hunt", text: "This is one comment"},
	{id: ++curid, author: "Jordan Walke", text: "This is *another* comment"},
	{id: ++curid, author: "bdzevel", text: "this app sucks"},
	{id: ++curid, author: "rando", text: "it's just so meaningless"}
];

function AJAX()
{
	$.ajax({
		async: true,
		method: "POST",
		url: "https://localhost:444/api/authentication",
		contents: { username: "Hello", password: "World" },
		contentType: "application/json",
		success: function(result) { console.log(result); },
		error: function(result) { console.log(result); }
	});
}

var CommentBox = React.createClass({
	addComment: function() {
		this.state.data.push({ id: ++curid, author: "rando" + curid, text: "forgettable comment " + curid});
		this.setState(this.state);
	},
	
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		this.setState({ data: internalData });
		setInterval(this.addComment, 5000);
	},
	handleNewComment: function(e) {
		this.state.data.push({id: ++curid, author: e.author, text: e.text});
		this.setState(this.state);
		AJAX();
	},
	render: function() {
		return (
			<div className="commentBox">
			<h1>Comments</h1>
			<CommentForm onNewComment={this.handleNewComment} />
			<CommentList data={this.state.data} />
			</div>
		);
	}
});

var CommentForm = React.createClass({
	getInitialState: function() {
		return {author: "", text: ""};
	},
	handleAuthorChange: function(e) {
		this.setState({author: e.target.value});
	},
	handleTextChange: function(e) {
		this.setState({text: e.target.value});
	},
	handleSubmit: function(e) {
		e.preventDefault();
		this.props.onNewComment({author: this.state.author, text: this.state.text});
		this.setState({author: "", text: ""});
	},
	render: function() {
		return (
			<form className="commentForm" onSubmit={this.handleSubmit}>
			<p><input type="text" placeholder="Name" value={this.state.author} onChange={this.handleAuthorChange} /></p>
			<p><input type="text" placeholder="say something..." value={this.state.text} onChange={this.handleTextChange} /></p>
			<p><input type="submit" value="Post" /></p>
			</form>
		);
	}
});

var CommentList = React.createClass({
	render: function() {
		var commentNodes = this.props.data.map(function(comment) {
			return (
				<Comment author={comment.author} key={comment.id}>
				{comment.text}
				</Comment>
			);
		});

		return (
			<div className="commentList">
			{commentNodes}
			</div>
		);
	}
});

var Comment = React.createClass({
	render: function() {
		return (
			<div className="comment">
			<h2 className="author">{this.props.author}</h2>
			{this.props.children}
			</div>
		);
	}
});

ReactDOM.render(
	<CommentBox />,
	document.getElementById("content")
);
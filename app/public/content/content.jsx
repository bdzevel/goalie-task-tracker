var ContentSpec = { };
ContentSpec.render = function()
{
	return (
		<div className="content">
			<h1>Welcome to Goalie!</h1>
		</div>
	);
};

var Content = React.createClass(ContentSpec);
ReactDOM.render(<Content />, document.getElementById("content"));
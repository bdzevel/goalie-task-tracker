var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Grid = require("react-bootstrap").Grid;
var GoalListItem = require("./goal-list-item.jsx");
var ListGroup = require("react-bootstrap").ListGroup;

var GoalActions = require("../actions/goal-actions.js");
var GoalStore = require("../stores/goal-store.js");

var GoalListSpec = { };

GoalListSpec.UpdateGoals = function()
{
	this.setState({ goals: GoalStore.GetGoals() });
}

GoalListSpec.MarkAllDone = function(e)
{
	e.preventDefault();
	GoalActions.CompleteAll();
}

GoalListSpec.ClearAll = function(e)
{
	e.preventDefault();
	GoalActions.Clear();
}

GoalListSpec.getInitialState = function()
{
	return { goals: [] };
}

GoalListSpec.componentDidMount = function()
{
	GoalStore.AddUpdateAllListener(this.UpdateGoals);
	GoalActions.Fetch();
}

GoalListSpec.componentWillUnmount = function()
{
	GoalStore.AddUpdateAllListener(this.UpdateGoals);
}

GoalListSpec.render = function()
{
	let content = <h3>You have no goals... Please submit one.</h3>;
	if (this.state.goals && this.state.goals.length != 0)
	{
		let goals = this.state.goals;
		content = (
			<ListGroup>
				{ goals.map(function(goal) { return <GoalListItem key={goal._id} goal={goal} />; }) }
			</ListGroup>
		);
	}
	
	// Note: "goal-list" class found in our own app.css
	//	It limits the width of this element so it doesn't look too stretched out with not enough content.
	return (
		<div class="goal-list">
			{content}
			<p><a href="#" onClick={this.ClearAll}>CLEAR ALL</a> <em>(CLICK AT YOUR OWN RISK)</em></p>
		</div>
	);
}

var React = require("react");
var GoalList = React.createClass(GoalListSpec);
module.exports = GoalList;
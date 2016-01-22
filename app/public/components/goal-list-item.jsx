var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Grid = require("react-bootstrap").Grid;
var ListGroupItem = require("react-bootstrap").ListGroupItem;

var GoalStore = require("../stores/goal-store.js");
var GoalActions = require("../actions/goal-actions.js");

var GoalListItemSpec = { };

GoalListItemSpec.Update = function(goal)
{
	if (this.props.goal._id != goal._id)
		return;
		
	// Force re-render of this item
	this.setState({ });
}

GoalListItemSpec.Delete = function(e)
{
	e.preventDefault();
	GoalActions.Delete(this.props.goal);
}

GoalListItemSpec.HandleIsCompleteChanged = function(e)
{
	this.setState({ isComplete: e.target.checked });
	this.props.goal.IsComplete = e.target.checked;
	GoalActions.Update(this.props.goal);
}

GoalListItemSpec.getInitialState = function()
{
	return { isComplete: this.props.goal.IsComplete };
}

GoalListItemSpec.componentDidMount = function()
{
	GoalStore.AddUpdateListener(this.Update);
}

GoalListItemSpec.componentWillUnmount = function()
{
	GoalStore.RemoveUpdateListener(this.Update);
}

GoalListItemSpec.render = function()
{
	// TODO: Find a good way to "complete" a task
	// TODO: Find a good way to indicate task is "completed"
	let goal = this.props.goal;
	return (
		<ListGroupItem header={goal.Description} bsStyle={this.state.isComplete ? "success" : "info"}>
			<Grid fluid>
				<Row>
					<Col md={7}>
						{goal.Reason}
					</Col>
					<Col md={4}>
						{goal.Date.toDateString()}
					</Col>
					<Col md={1}>
						<input type="checkbox" name="isComplete" checked={this.state.isComplete} onChange={this.HandleIsCompleteChanged} /> <a href="#" onClick={this.Delete}>x</a>
					</Col>
				</Row>
			</Grid>
		</ListGroupItem>
	);
}

var React = require("react");
var GoalListItem = React.createClass(GoalListItemSpec);
module.exports = GoalListItem;
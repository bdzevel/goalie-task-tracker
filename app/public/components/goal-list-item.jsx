var GoalActions = require("../actions/goal-actions.js");

var GoalListItemSpec = { };

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

GoalListItemSpec.render = function()
{
	var goal = this.props.goal;
	return <li><input type="checkbox" name="isComplete" checked={this.state.isComplete} onChange={this.HandleIsCompleteChanged} /> {goal.Description} : {goal.Reason} | <a href="#" onClick={this.Delete}>x</a></li>;
}

var React = require("react");
var GoalListItem = React.createClass(GoalListItemSpec);
module.exports = GoalListItem;
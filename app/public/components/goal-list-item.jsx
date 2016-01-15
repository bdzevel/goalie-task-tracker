var ReactTooltip = require("react-tooltip");

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
	GoalStore.AddUpdateListener(this.Update);
}

GoalListItemSpec.render = function()
{
	var goal = this.props.goal;
	var goalText = (
		<a data-tip data-for={goal._id}>{goal.Description}</a>
	);
	if (this.state.isComplete)
	{
		goalText = <del>{goalText}</del>;
	}
	return (
		<li>
			<input type="checkbox" name="isComplete" checked={this.state.isComplete} onChange={this.HandleIsCompleteChanged} /> {goalText} | <a href="#" onClick={this.Delete}>x</a>
			<ReactTooltip id={goal._id} place="right" type="dark" effect="float">{goal.Reason}</ReactTooltip>
		</li>
	);
}

var React = require("react");
var GoalListItem = React.createClass(GoalListItemSpec);
module.exports = GoalListItem;
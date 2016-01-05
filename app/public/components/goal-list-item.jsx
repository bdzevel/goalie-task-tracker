var actions = require("../actions/goal-actions.js");

var GoalListItemSpec = { };

GoalListItemSpec.Delete = function(e)
{
	e.preventDefault();
	actions.Delete(this.props.goal);
}

GoalListItemSpec.render = function()
{
	var goal = this.props.goal;
	return <li>{goal.Description} : {goal.Reason}</li>;
}

var React = require("react");
var GoalListItem = React.createClass(GoalListItemSpec);
module.exports = GoalListItem;
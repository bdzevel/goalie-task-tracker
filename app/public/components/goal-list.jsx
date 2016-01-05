var actions = require("../actions/goal-actions.js");
var GoalListItem = require("./goal-list-item.jsx");

var GoalListSpec = { };

GoalListSpec.ClearAll = function(e)
{
	e.preventDefault();
	actions.Clear();
}

GoalListSpec.render = function()
{
	var goals = this.props.goals;
	return (
		<div className="goalList">
			<ul>
				{
					goals.map(function(goal) {
						return <GoalListItem key={goal._id} goal={goal} />;
					})
				}
			</ul>
			<a href="#" onClick={this.ClearAll}>CLEAR_ALL_CLICK_AT_OWN_RISK</a>
		</div>
	);
}

var React = require("react");
var GoalList = React.createClass(GoalListSpec);
module.exports = GoalList;
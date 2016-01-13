var GoalListItem = require("./goal-list-item.jsx");

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
	GoalStore.AddUpdateListener(this.UpdateGoals);
	GoalActions.Fetch();
}

GoalListSpec.componentWillUnmount = function()
{
	GoalStore.RemoveUpdateListener(this.UpdateGoals);
}

GoalListSpec.render = function()
{
	var content = (
		<h3>You have no goals... Please submit one.</h3>
	);
	if (this.state.goals && this.state.goals.length != 0)
	{
		var goals = this.state.goals;
		content = (
			<ul>
				{
					goals.map(function(goal) {
						return <GoalListItem key={goal._id} goal={goal} />;
					})
				}
			</ul>
		);
	}
	return (
		<div className="goalList">
			{content}
			<p><a href="#" onClick={this.MarkAllDone}>Mark All Done</a></p>
			<p><a href="#" onClick={this.ClearAll}>CLEAR ALL</a> <em>(CLICK AT YOUR OWN RISK)</em></p>
		</div>
	);
}

var React = require("react");
var GoalList = React.createClass(GoalListSpec);
module.exports = GoalList;
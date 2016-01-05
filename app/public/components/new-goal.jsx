var actions = require("../actions/goal-actions.js");

var NewGoalFormSpec = { };

NewGoalFormSpec.NewGoal = function(e)
{
	e.preventDefault();
	var goal = { Description: this.state.description, Reason: this.state.reason };
	actions.Create(goal);
	this.setState(this.getInitialState());
}

NewGoalFormSpec.HandleDescriptionChange = function(e)
{
	this.setState({ description: e.target.value });
}

NewGoalFormSpec.HandleReasonChange = function(e)
{
	this.setState({ reason: e.target.value });
}

NewGoalFormSpec.getInitialState = function()
{
	return ({ description: "", reason: "" });
}

NewGoalFormSpec.render = function()
{
	var message = "";
	if (this.state.success)
	{
		message = (
			<p><font color="green">Success!</font></p>
		);
	}
	if (this.state.error)
	{
		message = (
			<p className="error">{this.state.error}</p>
		);
	}
	return (
		<form className="newGoalForm" onSubmit={this.NewGoal}>
			<p><input type="text" placeholder="Description" value={this.state.description} onChange={this.HandleDescriptionChange} /></p>
			<p><input type="text" placeholder="Reason" value={this.state.reason} onChange={this.HandleReasonChange} /></p>
			<p><input type="submit" value="Submit New Goal" /></p>
			{message}
		</form>
	);
}

var React = require("react");
var NewGoalForm = React.createClass(NewGoalFormSpec);
module.exports = NewGoalForm;
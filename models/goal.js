// ROOT/data/models

var mongoose = require("mongoose");

var fields =
{
	UserID: mongoose.Schema.Types.ObjectId,
	Description: String,
	Reason: String,
	Priority: Number,
	Date: { type: Date, default: Date.now }
};
var schema = new mongoose.Schema(fields);
var model = mongoose.model("Goal", schema);

module.exports = model;
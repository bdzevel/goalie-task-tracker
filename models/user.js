// ROOT/data/models

var mongoose = require("mongoose");

var fields =
{
	UserName: String,
	EMail: String,
	DateJoined: { type: Date, default: Date.now },
	PasswordHash: String
};
var schema = new mongoose.Schema(fields);
var model = mongoose.model("User", schema);

module.exports = model;
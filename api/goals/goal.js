// ROOT/api/goals
"use strict";

let mongoose = require("mongoose");

let fields =
{
	UserID: mongoose.Schema.Types.ObjectId,
	Description: String,
	Reason: String,
	Priority: Number,
	IsComplete: Boolean,
	Date: { type: Date, default: Date.now }
};
let schema = new mongoose.Schema(fields);
let model = mongoose.model("Goal", schema);

module.exports = model;
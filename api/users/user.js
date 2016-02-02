// ROOT/api/users
"use strict";

let mongoose = require("mongoose");

let fields =
{
	UserName: String,
	EMail: String,
	DateJoined: { type: Date, default: Date.now },
	PasswordHash: String
};
let schema = new mongoose.Schema(fields);
let model = mongoose.model("User", schema);

module.exports = model;
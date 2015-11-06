var mongoose = require("mongoose");
var env = require("../config/environment");

var dbUser = env.get("DB_USER");
var dbPass = env.get("DB_PASS");
var dbHost = env.get("DB_HOST");
var dbName = env.get("DB_NAME");
var mongoURL = "mongodb://" + dbUser + ":" + dbPass + "@" + dbHost + "/" + dbName;
mongoose.connect(mongoURL);

module.exports = mongoose;
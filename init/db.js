// ROOT/init
"use strict";

let TS = require("../diagnostics/trace-sources").Get("Database");

TS.TraceVerbose(__filename, "Initializing database...");

let mongoose = require("mongoose");
let env = require("../config/environment");

let dbUser = env.get("DB_USER");
let dbPass = env.get("DB_PASS");
let dbHost = env.get("DB_HOST");
let dbName = env.get("DB_NAME");
let mongoURL = "mongodb://" + dbUser + ":" + dbPass + "@" + dbHost + "/" + dbName;
mongoose.connect(mongoURL);

TS.TraceVerbose(__filename, "Database initialized");

module.exports = mongoose;
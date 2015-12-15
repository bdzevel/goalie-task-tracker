// ROOT/api

var TS = require("./diagnostics/trace-sources").Get("HTTPS-Server");

TS.TraceVerbose(__filename, "Initializing request handlers...");

var express = require("express");
var app = express();

var env = require("../config/environment");

var logger = require("morgan");
app.use(logger("dev"));

var bodyParser = require("body-parser");
app.use(bodyParser.json());

// Enable Cross-Origin Resource Sharing (CORS)
//	so our front end (HTTP) can make HTTP requests to the secure API (HTTPS)
var cors = require("cors");
app.use(cors());

var session = require("client-sessions");
var args = 
{
	cookieName: "session",
	secret: env.get("SECRET_KEY"),
	duration: 1000 * 60 * 60,			// 30 minutes
	activeDuration: 1000 * 60 * 10,		// 10 minutes
	cookie:
	{
		path: "/api",
		ephemeral: false,
		httpOnly: false,
		secure: false
	}
};
app.use(session(args));

var authRoutes = require("./authentication/routes");
app.use("/api/authentication", authRoutes);
var usersRoutes = require("./users/routes");
app.use("/api/users", usersRoutes);
var goalRoutes = require("./goals/routes");
app.use("/api/goals", goalRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next)
{
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// development error handler
// will print stacktrace
if (env.get("ENVIRONMENT") === "development")
{
	app.use(function (err, req, res, next)
	{
		TS.TraceError(__filename, err.message);
		res.status(err.status || 500);
		res.end({ error: err.message });
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next)
{
	TS.TraceError(__filename, err.message);
	res.status(err.status || 500);
	res.end({ error: err.message });
});

TS.TraceVerbose(__filename, "Request handlers initialized...");

module.exports = app;
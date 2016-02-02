// ROOT/init
"use strict";

let TS = require("../diagnostics/trace-sources").Get("Web-Server");

TS.TraceVerbose(__filename, "Initializing request handlers...");

let express = require("express");
let app = express();

let logger = require("morgan");
app.use(logger("dev"));

let cookieParser = require("cookie-parser");
app.use(cookieParser());

let bodyParser = require("body-parser");
app.use(bodyParser.json());

let env = require("../config/environment");
let session = require("client-sessions");
let args = 
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

let path = require("path");
app.use(express.static(path.join(__dirname, "..", "public")));

// if (env.get("ENVIRONMENT") == "heroku")
// {
// 	// In Heroku we want to disable non-SSL traffic
// 	app.use(function (req, res, next) {
// 		if (req.headers["x-forwarded-proto"] !== "https")
// 			return res.redirect(["https://", req.get("Host"), req.url].join(""));
// 		return next();
// 	});
// }

// Front end
app.get("/", function (req, res) { res.sendFile("index.html"); });

// API
let authRoutes = require("../api/authentication/routes");
app.use("/api/authentication", authRoutes);
let usersRoutes = require("../api/users/routes");
app.use("/api/users", usersRoutes);
let goalRoutes = require("../api/goals/routes");
app.use("/api/goals", goalRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next)
{
	let err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use(function (err, req, res, next)
{
	TS.TraceError(__filename, err.message);
	res.status(err.status || 500).send({ error: err.message });
});

TS.TraceVerbose(__filename, "Request handlers initialized...");

module.exports = app;
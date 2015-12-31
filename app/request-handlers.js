// ROOT/app

var express = require("express");
var app = express();

var env = require("../config/environment");

var logger = require("morgan");
app.use(logger("dev"));

var cookieParser = require("cookie-parser");
app.use(cookieParser());

var path = require("path");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) { res.sendFile("index.html"); });

// catch 404 and forward to error handler
app.use(function(req, res, next)
{
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next)
{
	console.error(err);
	res.status(err.status || 500);
	res.end({ error: err.message });
});

module.exports = app;

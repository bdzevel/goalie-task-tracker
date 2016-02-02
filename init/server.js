// ROOT/init
"use strict";

let TS = require("../diagnostics/trace-sources").Get("Web-Server");

let env = require("../config/environment");
let environment = env.get("ENVIRONMENT");

let server = InitializeServer();
const port = env.get("PORT") || 3000;

TS.TraceVerbose(__filename, "Starting web server on port " + port);

server.listen(port);
server.on("error", OnError);

TS.TraceVerbose(__filename, "Started web server");

function InitializeServer()
{
	if (environment === "heroku")
	{
		let server = require("./http-server");
		return server;
	}
	else
	{
		let server = require("./https-server");
		return server;
	}
}

function OnError(error)
{
	if (error.syscall !== "listen")
	{
		throw error;
	}

	var bind = typeof port === "string"
		? "Pipe " + port
		: "Port " + port;

	// handle specific listen errors with friendly messages
	switch (error.code)
	{
		case "EACCES":
			TS.TraceError(__filename, bind + " requires elevated privileges");
			process.exit(1);
			break;
		case "EADDRINUSE":
			TS.TraceError(__filename, bind + " is already in use");
			process.exit(1);
			break;
		default:
			throw error;
	}
}
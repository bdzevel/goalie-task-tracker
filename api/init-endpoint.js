// ROOT/api

var TS = require("./diagnostics/trace-sources").Get("HTTPS-Server");

TS.TraceVerbose(__filename, "Initializing HTTPS endpoint...");

var https = require("https");
var handlers = require("./request-handlers");
require("ssl-root-cas").inject().addFile("root-ca.crt.pem");

var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));

var httpsOptions = { };
fs.readFileAsync("server.key.pem")
.then(function (data)
{
	httpsOptions.key = data;
	return fs.readFileAsync("server.crt.pem");
}).then(function (data)
{
	httpsOptions.cert = data;
	return Promise.promisify(SetupHTTPSEndpoint)(httpsOptions);
}).then(null, HandleFileError);

function SetupHTTPSEndpoint(options)
{
	const port = 444;
	var httpsServer = https.createServer(options, handlers);
	httpsServer.listen(port);
	httpsServer.on("error", OnError);

	TS.TraceVerbose(__filename, "HTTPS endpoint initialized");

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
}

function HandleFileError(e)
{
	TS.TraceError(__filename, e.toString());
	if (e.code == "ENOENT")
	{
		process.exit(1);
	}
	throw e;
}
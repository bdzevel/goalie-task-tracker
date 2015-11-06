// ROOT/init

var https = require("https");
var api = require("../api/api");

var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));

var httpsOptions = { };
fs.readFileAsync("key.pem")
.then(function (data)
{
	httpsOptions.key = data;
	return fs.readFileAsync("cert.pem");
}).then(function (data)
{
	httpsOptions.cert = data;
	return Promise.promisify(SetupHTTPSEndpoint)(httpsOptions);
}).then(null, HandleError);

function SetupHTTPSEndpoint(options)
{
	const port = 443;
	var httpsServer = https.createServer(options, api);
	httpsServer.listen(port);
	httpsServer.on('error', onError);

	function onError(error)
	{
		if (error.syscall !== 'listen')
		{
			throw error;
		}

		var bind = typeof port === 'string'
		  ? 'Pipe ' + port
		  : 'Port ' + port;

		// handle specific listen errors with friendly messages
		switch (error.code)
		{
			case 'EACCES':
				console.error(bind + ' requires elevated privileges');
				process.exit(1);
				break;
			case 'EADDRINUSE':
				console.error(bind + ' is already in use');
				process.exit(1);
				break;
			default:
				throw error;
		}
	}
}

function HandleError(e)
{
	console.error(e.toString());
	if (e.code == "ENOENT")
	{
		process.exit(1);
	}
	throw e;
}
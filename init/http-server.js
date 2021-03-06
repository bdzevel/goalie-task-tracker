// ROOT/init
"use strict";

let TS = require("../diagnostics/trace-sources").Get("Web-Server");

TS.TraceVerbose(__filename, "Initializing HTTP server...");

let http = require("http");
let handlers = require("./request-handlers");
let server = http.createServer(handlers);

TS.TraceVerbose(__filename, "HTTP server initialized");

module.exports = server;
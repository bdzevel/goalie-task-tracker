var TraceSource = require("./trace-source");

var TraceSources = { };
TraceSources.Get = function(name)
{
	if (!this[name])
		this[name] = new TraceSource(name);
	return this[name];
}

module.exports = TraceSources;
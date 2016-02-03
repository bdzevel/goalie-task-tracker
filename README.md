Goalie
=====

A to-do list application written in JavaScript, for practice.

* Node.js is the back end
* Mongo DB is the back end database
* Heroku is used for cloud hosting
* MongoLab is used for cloud DB hosting

Authored by Boris Dzevel

NOTES:

The "util" folder contains some helpful scripts:

1)

	generate-certificates.ps1
	A PowerShell script to generate the appropriate certificates that could be used for testing.
	It's not recommended to use these certificates for anything real because they won't be trusted by anyone.
	
2)

	install-cli-utils.ps1
	A PowerShell script that will install the necessary CLI utilities like grunt.
	This is easy enough to do manually. I just wanted a reminder of what I needed.
	
Heroku handles SSL and routes internally to an "http" endpoint, so code was added in to handle this. Essentially, if the environment is "heroku," there is no need to handle SSL in my code.

Outside of Heroku, the app needs root-ca.crt.pem, server.key.pem, and server.crt.pem files at root (not checked in), for SSL. You can generate these using the script mentioned above and just move them to the root.

Needs .env file at root (not checked in), with following (JSON) structure:

	{
		"GOALIE_ENVIRONMENT": "development/production/heroku",
		"GOALIE_SECRET_KEY": "just some kind of secret string for client session crypto stuff",
	
		"GOALIE_DB_USER": "mongo db username",
		"GOALIE_DB_PASS": "mongo db password",
		"GOALIE_DB_HOST": "mongo db hostname:port",
		"GOALIE_DB_NAME": "mongo db instance name"
	}

The "public" folder contains the entire front end. The handler serves "index.html" for "GET /" requests. Currently this is built with ReactJS, but could potentially be any other framework, though there may need to be some changes in what is being served, exactly.
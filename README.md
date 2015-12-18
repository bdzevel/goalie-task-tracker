Goalie
=====

A to-do list application written in JavaScript, for practice.

* ReactJS is the framework used for the front end
* Node.js is the back end
* Mongo DB is the back end database
* Heroku will be used for cloud hosting
* MongoLab is used for cloud DB hosting

Authored by Boris Dzevel

NOTES:

To install all of the dependencies for both the front end and back end, you should run the "install-packages.ps1" script. This will install all dependencies and move - in the case of the front end - will also copy them to the appropriate location.

Needs root-ca.crt.pem, server.key.pem, and server.crt.pem files at root (not checked in), for HTTPS. You can generate these using the PowerShell script in the "util" folder and just move them to the root.

Needs .env file at root (not checked in), with following (JSON) structure:

	{
		"GOALIE_ENVIRONMENT": "development/production - turns stack traces on/off",
		"GOALIE_SECRET_KEY": "just some kind of secret string for client session crypto stuff",
	
		"GOALIE_DB_USER": "mongo db username",
		"GOALIE_DB_PASS": "mongo db password",
		"GOALIE_DB_HOST": "mongo db hostname:port",
		"GOALIE_DB_NAME": "mongo db instance name"
	}

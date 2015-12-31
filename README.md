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

The "util" folder contains some helpful scripts:

1)
	install-packages.ps1
	A PowerShell script that will install all npm packages for the front and back end (they have separate package.json files).
	npm does the hard work, so it's easy enough to do manually too.
	Must be run from the root folder.
2)
	generate-certificates.ps1
	A PowerShell script to generate the appropriate certificates that could be used for testing.
	It's not recommended to use these certificates for anything real because they won't be trusted by anyone.
3)
	build.ps1
	A PowerShell script that will build the front end.
	This just runs an npm script saved in package.json, so it's easy enough to do manually.
	
Needs root-ca.crt.pem, server.key.pem, and server.crt.pem files at root (not checked in), for HTTPS. You can generate these using the script mentioned above and just move them to the root.

Needs .env file at root (not checked in), with following (JSON) structure:

	{
		"GOALIE_ENVIRONMENT": "development/production",
		"GOALIE_SECRET_KEY": "just some kind of secret string for client session crypto stuff",
	
		"GOALIE_DB_USER": "mongo db username",
		"GOALIE_DB_PASS": "mongo db password",
		"GOALIE_DB_HOST": "mongo db hostname:port",
		"GOALIE_DB_NAME": "mongo db instance name"
	}

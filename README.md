Goalie

A to-do list application written in Javascript, for practice.

Node.js is the backend
Mongo DB is the backend database
Heroku will be used for cloud hosting
MongoLab is used for cloud DB hosting

Authored by Boris Dzevel

NOTES:

Needs key.pem and cert.pem files at root (not checked in), for HTTPS

Needs .env file at root (not checked in), with following (JSON) structure:

	{
		"GOALIE_ENVIRONMENT": "development/production - turns stack traces on/off",
		"GOALIE_SECRET_KEY": "just some kind of secret string for client session crypto stuff",
	
		"GOALIE_DB_USER": "mongo db username",
		"GOALIE_DB_PASS": "mongo db password",
		"GOALIE_DB_HOST": "mongo db hostname:port",
		"GOALIE_DB_NAME": "mongo db instance name"
	}

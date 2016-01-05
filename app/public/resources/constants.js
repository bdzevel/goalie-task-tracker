var constants = 
{
	HostName: window.location.hostname,
	APIPort: 444,
	Authentication:
	{
		URL: "/api/authentication"
	},
	Users:
	{
		URL: "/api/users"	
	},
	Goals:
	{
		URL: "/api/goals",
		Events:
		{
			Updated: "GOALS.EVENT.UPDATED"
		},
		Actions:
		{
			Fetch: "GOALS.ACTION.FETCH",
			Create: "GOALS.ACTION.CREATE",
			Update: "GOALS.ACTION.UPDATE",
			Delete: "GOALS.ACTION.DELETE",
			Clear: "GOALS.ACTION.CLEAR"
		}
	}
};

module.exports = constants;
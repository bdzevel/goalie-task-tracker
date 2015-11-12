(function()
{

	var AppComponent = ng
		.Component({ selector: "goalie", template: "<h1>My Angular 2.0 Goalie App!</h1>" })
		.Class({ constructor: function () { } });

	document.addEventListener('DOMContentLoaded', function() { ng.bootstrap(AppComponent); });

})();
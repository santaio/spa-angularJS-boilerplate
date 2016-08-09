(function() {
	'use strict';

	angular.module("app")
	.controller("MainController", MainController);

	MainController.$inject = ['$rootScope'];

	function MainController($rootScope)
	{
		var vm = this;

		$rootScope.trackEvent = trackEvent;

		function trackEvent(category, action, label){
	      label = label.toLowerCase();
	      ga('send', 'event', category, action, label);
	      console.log("Tracking Event" + ": ga(send, event, "+category+", "+action+", "+label+")");
	    }
	}
})();
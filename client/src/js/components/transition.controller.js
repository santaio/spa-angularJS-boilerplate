angular.module("app")
.controller("TransitionController", TransitionController);

TransitionController.$inject = ['$rootScope', '$location', '$state', '$scope'];

function TransitionController($rootScope, $location, $state, $scope)
{
	var containerShapes = $("#transition-shapes-container");
	var shape1 = containerShapes.find("#shape1");
	var shape2 = containerShapes.find("#shape2");
	var shape3 = containerShapes.find("#shape3");

	var vm = this;
	$rootScope.isTransitioning = false;

	console.log("Transition Controller >>>>>");

	$rootScope.$on('$stateChangeStart',
	function(event, toState, toParams, fromState, fromParams){
		
		if(!$rootScope.isTransitioning){
			event.preventDefault();
			shape1.animate({"top" : "100%"}, 0);
	    	shape2.animate({"top" : "100%"}, 0);
	    	shape3.animate({"top" : "100%"}, 0);
	    	containerShapes.css("top", "0%");
	    	$rootScope.isTransitioning = true;
			containerShapes.show();

		    shape1.animate({"top": "0%"}, 1000, 'easeInOutQuart', function(){
		    	$state.go(toState, toParams);
		    });

		    shape2.delay(300).animate({"top": "0%"}, 1000, 'easeInOutQuart');

		    shape3.delay(500).animate({"top": "0%"}, 1000, 'easeInOutQuart', function(){
		    	containerShapes.animate({"top": "-100%"}, 1000, 'easeOutQuart', function(){
			    	shape1.animate({"top" : "100%"}, 0);
			    	shape2.animate({"top" : "100%"}, 0);
			    	shape3.animate({"top" : "100%"}, 0);
			    	containerShapes.hide();
			    	$rootScope.isTransitioning = false;	
				});
		    });

		}
	    
	    // transitionTo() promise will be rejected with
	    // a 'transition prevented' error
	});

	$rootScope.$on('$stateChangeSuccess',
	function(){
		//console.log('Entrou na stateChangeSuccess');
				
	});

	$rootScope.changeArea = function(route, orientation)
	{
		console.log("Change AREA : route :: ", route);
		console.log("Change AREA : orientation :: ", orientation);


		$location.path(route);

		// containerShapes.show();
		// shape1.animate({})
	}

	vm.init = function()
	{
		containerShapes.hide();
        $scope.htmlReady();      		
	}

	vm.init();
}
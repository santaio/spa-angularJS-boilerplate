(function() {
  
  'use strict';

  angular
    .module('app')
    .run([
      '$rootScope',
      '$state',
      '$stateParams',
      function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        console.log("$stateParams", $stateParams);
      }
    ]);
})();

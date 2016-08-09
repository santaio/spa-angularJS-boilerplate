(function() {

  'use strict';

  angular
    .module('app.home')
    .service('HomeService', HomeService);

  HomeService.$inject = [
    '$http',
    'CONST'
  ];

  function HomeService($http, CONST) {
    var self = this;

    ///////////// Public Properties
    self.data = {};

    ///////////// Public Methods
    self.getData       = getData;

    ///////////// Function Declarations
    function getData() {
      return $http
        .get('api/url')
        .then(function(payload) {

          var data = payload.data;

          self.data = data;
        });
    }

    
  }
})();

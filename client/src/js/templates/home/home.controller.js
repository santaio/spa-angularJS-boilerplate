(function() {

  'use strict';

  angular
    .module('app.home')
    .controller('HomeController', HomeController);

  HomeController.$inject = [
    'HomeService',
    '$scope',
    '$rootScope'
  ];

  function HomeController(HomeService, $scope, $rootScope) {
    var vm = this;

    ///////////// Public Properties
    vm.data        = {};

    ///////////// Private Properties
    
    ///////////// Public Methods

    ///////////// Private Methods
    var _init          = _init;
    var _getData       = _getData;

    ///////////// Events

    ///////////// Bootstrap
    _init();

    ///////////// Function Declarations
    function _init() {
      //_getData();
    }

    function _getData() {
      HomeService
        .getData()
        .then(function() {
          vm.data = HomeService.data;
        })
        .catch(function(err) {
          console.log('Error in home controller > service');
        });
    }


  }
})();

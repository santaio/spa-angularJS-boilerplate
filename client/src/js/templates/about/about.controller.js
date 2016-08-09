(function() {

  'use strict';

  angular
    .module('app.about')
    .controller('AboutController', AboutController);

  AboutController.$inject = [
    'AboutService',
    '$scope',
    '$rootScope',
  ];

  function AboutController(AboutService, $scope, $rootScope) {
    var vm = this;

    ///////////// Public Properties

    ///////////// Private Properties

    ///////////// Public Methods
    vm.getData      = getData;

    ///////////// Private Methods
    var _init = _init;

    /////////////
    
    _init();

    ///////////// Function Declarations

    function _init() {
      console.log('Init about.controller.js >>>>>>>');
      //vm.getData();
    }

    function getData() {
      AboutService
        .getData()
        .then(function() {
          vm.data = AboutService.data;
        })
        .catch(function(err) {
          console.log('Error on about controller > service');
        });
    }

  }
})();

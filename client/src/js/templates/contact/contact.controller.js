(function() {

  'use strict';

  angular
    .module('app.contact')
    .controller('ContactController', ContactController);

  ContactController.$inject = [
    'ContactService',
    '$scope',
    '$rootScope'
  ];

  function ContactController(ContactService, $scope, $rootScope) {
    var vm = this;

    ///////////// Public Properties
    vm.message   = {};
    vm.data      = {};

    ///////////// Private Properties

    ///////////// Public Methods
    vm.sendMessage  = sendMessage;

    ///////////// Private Methods
    var _init      = _init;
    var _getData   = _getData;

    ///////////// Events

    ///////////// Bootstrap
    _init();

    ///////////// Function Declarations
    function _init() {
      console.log('Initialized contact controler >>>>');
      //_getData();   
    }

    function _getData() {
      ContactService
        .getData()
        .then(function() {
          vm.data = ContactService.data;
        })
        .catch(function(err) {
          console.log('Error in contact controller > service');
        });
    }


    function sendMessage(message) {
      ContactService
        .sendMessage(message);
    }

  }
})();

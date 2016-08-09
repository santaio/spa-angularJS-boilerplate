(function() {

  'use strict';

  angular
    .module('app.contact')
    .service('ContactService', ContactService);

  ContactService.$inject = [
    '$http',
    'CONST'
  ];

  function ContactService($http, CONST) {
    var vm = this;

    ///////////// Public Properties
    vm.states = [];

    ///////////// Private Properties

    ///////////// Public Methods
    vm.getData     = getData;
    vm.sendMessage = sendMessage;

    ///////////// Private Methods

    ///////////// Events

    ///////////// Function Declarations

    function getData() {
      return $http
        .get('api/url')
        .then(function(payload) {

          var data = payload.data.data;

          vm.data = data;

        });
    }

    function sendMessage(message) {
      $http({
        method: 'POST', 
        url: 'message/destination/url',
        data: message,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(function(response) {
         console.log(response);
           
      }, function(err) {
        console.log('An error occurred to send message');
      });
    }

    
  }
})();

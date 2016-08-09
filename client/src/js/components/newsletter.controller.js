(function() {

  'use strict';

  angular
    .module('app')
    .controller('NewsletterController', NewsletterController);

  NewsletterController.$inject = [
    '$http',
    '$timeout',
    '$scope',
    'CONST'
  ];

  function NewsletterController($http, $timeout, $scope, CONST) {
    var vm = this;

    ///////////// Public Properties
    vm.news = {};

    ///////////// Private Properties

    ///////////// Public Methods
    vm.send = send;
    vm.showMessage = false;

    ///////////// Private Methods

    ///////////// Events

    ///////////// Bootstrap

    ///////////// Function Declarations
    function send(news) {
      $http({
        method: 'POST', 
        url: CONST.API.homolog() + '/admin/site/api/newsletter',
        data: news,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(function(response) {
        vm.showMessage = true;
        $scope.htmlReady();
        $timeout(function() {
          vm.showMessage = false;
        }, 5000);
      }, function(err) {
        console.log('An error occurred to register in the newsletter');
      });
    }
  }
})();

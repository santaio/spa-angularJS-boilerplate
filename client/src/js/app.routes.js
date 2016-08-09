(function() {
  
  'use strict';

  angular
    .module('app')
    .config([
      '$stateProvider',
      '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider, $locationProvider) {

        ///////////// Redirects and Otherwise
        $urlRouterProvider
          .otherwise('/');
        ///////////// State Configurations
        $stateProvider
          .state('about', {
            url: '/about',
            templateUrl: 'views/about/about.html',
            controller: 'AboutController as vm'
          })
          .state('contact', {
            url: '/contact',
            templateUrl: 'views/contact/contact.html',
            controller: 'ContactController as vm'
          })
          .state('home', {
            url: '/',
            templateUrl: 'views/home/home.html',
            controller: 'HomeController as vm'
          });
          
      }
    ]);
})();

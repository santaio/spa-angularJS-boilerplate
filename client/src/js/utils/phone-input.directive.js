(function() {

  'use strict';

  angular
    .module('app.utils')
    .directive('phoneInput', phoneInput);

  phoneInput.$inject = [
    '$filter',
    '$browser'
  ];

  function phoneInput($filter, $browser) {
    return {
      require: 'ngModel',
      link: function($scope, $element, $attrs, ngModelCtrl) {
        var listener = function() {
          var value = $element.val().replace(/[^0-9]/g, '');
          $element.val($filter('tel')(value, false));
        };

        ngModelCtrl.$parsers.push(function(viewValue) {
          return viewValue.replace(/[^0-9]/g, '').slice(0,10);
        });

        ngModelCtrl.$render = function() {
          $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
        };

        $element.bind('change', listener);
        $element.bind('keydown', function(event) {
          var key = event.keyCode;

          if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){
            return;
          }

          $browser.defer(listener);
        });

        $element.bind('paste cut', function() {
          $browser.defer(listener);
        });
      }
    };   
  }
})();

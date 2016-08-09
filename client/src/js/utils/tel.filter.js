(function() {

  'use strict';

  angular
    .module('app.utils')
    .filter('tel', tel);

  tel.$inject = [];

  function tel() {
    return function (tel) {

      if (!tel) { return ''; }

      var value = tel.toString().trim().replace(/^\+/, '');

      if (value.match(/[^0-9]/)) {
        return tel;
      }

      var country, city, number;

      switch (value.length) {
        case 1:
        case 2:
        case 3:
          city = value;
          break;

        default:
          city = value.slice(0, 2);
          number = value.slice(2);
      }

      if (number) {

        if (number.length > 8) {
          number = number.slice(0, 5) + '-' + number.slice(5,9);
        } else if (number.length > 4) {
          number = number.slice(0, 4) + '-' + number.slice(4,8);
        } else {
          number = number;
        }

        return ("(" + city + ") " + number).trim();
      } else {
        return "(" + city;
      }

    };
  }
})();

'use strict';

/**
 * @ngdoc function
 * @name tripsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tripsApp
 */
angular.module('tripsApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

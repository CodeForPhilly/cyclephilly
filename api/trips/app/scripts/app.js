/* global app:true */
'use strict';

/**
 * @ngdoc overview
 * @name tripsApp
 * @description
 * # tripsApp
 *
 * Main module of the application.
 */
 ;(function(){

      // Menu settings
      $('#menuToggle, .menu-close').on('click', function(){
        $('#menuToggle').toggleClass('active');
        $('body').toggleClass('body-push-toleft');
        $('#theMenu').toggleClass('menu-open');
      });

      $.stellar({
        horizontalScrolling: false,
        verticalOffset: 540
      });


})(jQuery)

var app = angular.module('tripsApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'firebase',
  'google-maps'
]);
app.constant('FIREBASE_URL', 'https://cyclephilly.firebaseio.com/');
app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

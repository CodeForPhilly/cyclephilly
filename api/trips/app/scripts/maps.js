'use strict';

;(function(){
var totalPoints = 0;
var styles = [
  {
    "featureType": "road.local",
    "stylers": [
      { "visibility": "simplified" }
    ]
  },{
    "featureType": "road.local",
    "stylers": [
      { "color": "#808080" },
      { "lightness": -48 }
    ]
  },{
    "featureType": "landscape.man_made",
    "stylers": [
      { "visibility": "on" },
      { "lightness": -35 }
    ]
  },{
    "featureType": "road.arterial",
    "stylers": [
      { "visibility": "on" },
      { "lightness": -16 }
    ]
  },{
    "featureType": "poi",
    "stylers": [
      { "invert_lightness": true }
    ]
  },{
    "featureType": "poi.medical",
    "stylers": [
      { "invert_lightness": true }
    ]
  },{
    "featureType": "poi.school",
    "stylers": [
      { "invert_lightness": true }
    ]
  },{
    "featureType": "poi.business",
    "stylers": [
      { "invert_lightness": true }
    ]
  },{
    "featureType": "transit",
    "stylers": [
      { "invert_lightness": true },
      { "lightness": 17 },
      { "weight": 4.6 }
    ]
  },{
    "featureType": "administrative.neighborhood",
    "stylers": [
      { "hue": "#ff3300" },
      { "saturation": 100 }
    ]
  },{
    "featureType": "poi.attraction",
    "stylers": [
      { "hue": "#0066ff" },
      { "lightness": 33 }
    ]
  }
];

var line;
var styledMap = new google.maps.StyledMapType(styles,
    {name: "Cycle Map"});

var chatRef = new Firebase('https://cyclephilly.firebaseio.com');
var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
  if (error) {
    // an error occurred while attempting login
    console.log(error);
  } else if (user) {
    // user authenticated with Firebase
    //var chatRef = new Firebase('https://cyclephilly.firebaseio.com');
    console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
    //chatRef.set('User Logged In: '+user.id);
  } else {
    // user is logged out
  }
});

})(jQuery)

angular.module('tripsApp')
  .controller('MapsCtrl', function ($scope) {
        $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14 };
        $scope.options = {scrollwheel: false};
  });
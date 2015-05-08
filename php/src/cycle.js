(function(){
  angular
    .module('cycleApp', ['cycle.home','ngNewRouter','ngMaterial','ngMessages','firebase'])
    .config(function($mdThemingProvider, $mdIconProvider,$sceDelegateProvider,$httpProvider){

        $mdIconProvider
            .defaultIconSet("./bower_components/angular-material/demos/icon/demoSvgIconSets/assets/core-icons.svg", 128)
            .icon("menu"       , "./assets/svg/menu.svg"        , 24)
            .icon("results"       , "http://google.github.io/material-design-icons/action/svg/ic_receipt_24px.svg" , 24)
            .icon("noteadd"       , "http://google.github.io/material-design-icons/action/svg/ic_note_add_24px.svg" , 24)

            .icon("star"      , "./assets/svg/star.svg"       , 24)
            .icon("help"      , "./assets/svg/help.svg"       , 24)
            .icon("shopping"      , "./assets/svg/shopping.svg"       , 24)
            .icon("map"      , "./assets/svg/map.svg"       , 24)
            .icon("share"      , "./assets/svg/share.svg"       , 24)
            .icon("home"      , "./assets/svg/home.svg"       , 24)
            .icon("event-available"      , "./assets/svg/event-available.svg"       , 24)
            .icon("search"      , "./assets/svg/search.svg"       , 24)
            .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
            .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
            .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
            .icon("home"    , "//google.github.io/material-design-icons/action/svg/ic_home_24px.svg"     , 24)
            .icon("list"    , "//google.github.io/material-design-icons/action/svg/ic_list_24px.svg"     , 24)
            .icon("more-vert"    , "//google.github.io/material-design-icons/navigation/svg/ic_more_vert_24px.svg"     , 24)
            .icon("search"    , "//google.github.io/material-design-icons/action/svg/ic_search_24px.svg"     , 24)
            .icon("phone"      , "./assets/svg/phone.svg"       , 512)


            $mdThemingProvider.theme('default')
                 .primaryPalette('grey', {
                  'default': 'A100', // by default use shade 400 from the pink palette for primary intentions
                  'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
                  'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
                  'hue-3': '900' // use shade A100 for the <code>md-hue-3</code> class
                })
                .accentPalette('light-blue', {
                  'default': 'A100', // by default use shade 400 from the pink palette for primary intentions
                  'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
                  'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
                  'hue-3': '900' // use shade A100 for the <code>md-hue-3</code> class
                });
            $mdThemingProvider.theme('green')
                .primaryPalette('green')
                .accentPalette('grey');

            $sceDelegateProvider.resourceUrlWhitelist(['self', 'http://cycle.li/**']);

            delete $httpProvider.defaults.headers.common["X-Requested-With"]

    })
    .controller('CycleController', [
      '$router', '$mdSidenav', '$mdBottomSheet','$mdDialog','$mdToast', '$log', '$q','$filter','$scope','$rootScope', '$http',
      CycleController
    ])
    .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
      $scope.close = function () {
        $mdSidenav('right').close()
          .then(function () {
            $log.debug("close RIGHT is done");
          });
      };
    });

  /**
   * Main Controller for the Cycle_ App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function CycleController( $router, $mdSidenav, $mdBottomSheet,$mdDialog,$mdToast, $log, $q,$filter,$scope,$rootScope,$http) {
    var self = this;
    self.ApplicationTitle = "CyclePhilly";
    // var ref = new Firebase("https://platformx.firebaseio.com");
    self.toggleList = function (){
      $mdSidenav('right').toggle()
    }
    $router.config([
     { path: '/', redirectTo: '/home' },
     { path: '/home', component: 'home' },
     { path: '/dashboard/:id', component: 'dashboard' },
     { path: '/login', component: 'login' },
     { path: '/profile', component: 'profile' },
     { path: '/auth', component: 'auth' },
     { path: '/register', component: 'register' }
    ]);
    

  }

})();

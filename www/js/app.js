// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

//isels1 ionic login dingens
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ionic-datepicker', 'ionic-timepicker', 'formlyIonic', 'nvd3', 'i4mi','jsonFormatter'])

.constant('APPNAME', 'HelloI4MI')
.constant('APPSECRET', '8385bee7542099b10315dcb7b803b61a')

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  
  //zyssm4 einteilung & isels1 controller
  $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'templates/home.html',
            controller : 'homeCtrl'
        })
        .state('tel', {
        url: '/tel',
        templateUrl: 'templates/tel.html',
          controller : 'telCtrl'
        })
        .state('medplan', {
        url: '/medplan',
        templateUrl: 'templates/medplan.html',
          controller : 'medplanCtrl'
        })
        .state('login', {
               url: '/login',
               templateUrl: 'templates/login.html',
               controller: 'loginCtrl'
        });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});

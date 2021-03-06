// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

//isels1 ionic login dingens

angular.module('starter', ['ionic', 'starter.controllers', 'starter.medicationController', 'starter.obsControllers', 'starter.services', 'starter.ownServices', 'ionic-datepicker', 'ionic-timepicker', 'formlyIonic', 'nvd3', 'i4mi','jsonFormatter', 'ngCordova', 'ngStorage'])

.constant('APPNAME', 'MIAU')
.constant('APPSECRET', '39gxbt9ge8zdz3s940ftb4fwhnl634uu')

//needed constant during the directive call (with this it is possible to easily step trought the generated elements)
.constant(loopNr = 0)


.config(['$compileProvider', function($compileProvider) {
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content):|data:image\//);
        }])


//zyssm4 init call for collection all generated objects of the medplan.
.directive('myDir', function () {
    return function (scope, element, attrs) {
      var morningElement = new Array;
      var noonElement = new Array;
      var eveningElement = new Array;
      var nightElement = new Array;

      //get each generated element in the html, and then fill it into the given arrays
      for(i = 0; i < 29 ; i++){
        if(i%4 === 1){
          morningElement.push(element.parent().parent().children()["1"])
          noonElement.push(element.parent().parent().children()["2"])
          eveningElement.push(element.parent().parent().children()["3"])
          nightElement.push(element.parent().parent().children()["4"])
        }
      }
      loopNr = loopNr + 1;
      scope.toTakeClickAction(morningElement, noonElement, eveningElement, nightElement , loopNr)
  }
  })

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
    .state('menu', {
      url: "/",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller : 'homeCtrl'
    })

    .state('menu.home', {
      url: '/home',
      views: {
      'menuContent' :{
        templateUrl: 'templates/home.html',
        controller : 'homeCtrl'
      }}
    })

    //Side-Menus Views
    .state('menu.einstellungen', {
      url: '/einstellungen',
      views: {
      'menuContent' :{
        templateUrl: 'templates/einstellungen.html',
        controller : 'settingsCtrl'
      }}
    })

    .state('menu.impressum', {
      url: '/impressum',
      views: {
      'menuContent' :{
        templateUrl: 'templates/impressum.html',
        controller : 'homeCtrl'
      }}
    })

    .state('menu.dashboard', {
           url: '/weight',
       views: {
       'menuContent' :{
       templateUrl: 'templates/dashboard.html',
       controller : 'DashboardCtrl'
       }}
     })


    //Views
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
        .state('createMedi', {
          url: '/createMedi',
          templateUrl: 'templates/createMedi.html',
          controller : 'createMediCtrl'
        })
        .state('login', {
          url: '/login',
          templateUrl: 'templates/login.html',
          controller: 'loginCtrl'
        });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});

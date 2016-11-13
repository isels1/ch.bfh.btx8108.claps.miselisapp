angular.module('starter.controllers', [])

//zyssm4 nav-funktionen & isels1 aufteilung und login/logout
.controller('homeCtrl', function ($scope, $state, I4MIMidataService) {
    $scope.opentel = function () {
            $state.go('tel');
    }
    $scope.openmedi = function () {
            $state.go('medplan');
    }
    var isLoggedIn = I4MIMidataService.loggedIn();
        if (isLoggedIn) {
            $scope.logout = function() {
                I4MIMidataService.logout();
                $state.go('login'); };
        } else {
            $state.go('login')
        }
})

.controller('telCtrl', function ($scope, $state, I4MIMidataService) {
    $scope.openmedi = function () {
        $state.go('medplan');
    }
    $scope.openhome = function () {
        $state.go('home');
    }
    var isLoggedIn = I4MIMidataService.loggedIn();
        if (isLoggedIn) {
            $scope.logout = function() {
                I4MIMidataService.logout();
                $state.go('login'); };
        } else {
            $state.go('login')
        }
})

.controller('medplanCtrl', function ($scope, $state, I4MIMidataService) {
    $scope.opentel = function () {
        $state.go('tel');
    }
    $scope.openhome = function () {
        $state.go('home');
    }
    
    var isLoggedIn = I4MIMidataService.loggedIn();
        if (isLoggedIn) {
            $scope.logout = function() {
                I4MIMidataService.logout();
                $state.go('login'); };
        } else {
            $state.go('login')
        }
})

.controller('loginCtrl', function ($scope, I4MIMidataService, $timeout, $state) {
            // Use for testing the development environment
            $scope.user = {
                username: 'stefandaniel.iseli@gmail.com',
                server: 'https://test.midata.coop:9000'
            }
            // Connect with MIDATA
            $scope.loggedIn = I4MIMidataService.loggedIn();
            
            var timer = $timeout(function refresh() {
                if (I4MIMidataService.loggedIn()) {
                    $state.go('home');
                } else {
                    timer = $timeout(refresh, 1000);}
                }, 1000);
});

angular.module('starter.controllers', [])

//zyssm4 nav-funktionen & isels1 aufteilung und login/logout
.controller('homeCtrl', function ($scope, $state, I4MIMidataService,$cordovaNativeAudio) {
    $scope.opentel = function () {
            $state.go('tel');
    }
    $scope.openmedi = function () {
            $state.go('medplan');
    }

    $scope.openeinstellungen = function () {
        $state.go('menu.einstellungen');
    }

    $scope.openimpressum = function () {
        $state.go('menu.impressum');
    }

    $scope.openhome = function () {
        $state.go('menu.home');
    }

    var isLoggedIn = I4MIMidataService.loggedIn();
        if (isLoggedIn) {
            $scope.logout = function() {
                window.localStorage.setItem("password", '');
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
        $state.go('menu.home');
    }
    var isLoggedIn = I4MIMidataService.loggedIn();
        if (isLoggedIn) {
            $scope.logout = function() {
            window.localStorage.setItem("password", '');
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
        $state.go('menu.home');
    }

    var isLoggedIn = I4MIMidataService.loggedIn();
        if (isLoggedIn) {
            $scope.logout = function() {
            window.localStorage.setItem("password", '');
                I4MIMidataService.logout();
                $state.go('login'); };
        } else {
            $state.go('login')
        }
})

.controller('loginCtrl', function ($scope, I4MIMidataService, $timeout, $state) {
            var un = window.localStorage.getItem("username");
            var pw = window.localStorage.getItem("password");
            var srv = window.localStorage.getItem("server");

            if(un != (undefined || "" || null) &&
               pw != (undefined || "" || null) &&
               srv != (undefined || "" || null)) {

            $scope.user = {
            username: un,
            password: pw,
            server: srv
            }

            I4MIMidataService.login(un, pw, srv);

            } else {

            // Use for testing the development environment
            $scope.user = {
            username: 'miau.claps@gmail.com',
            server: 'https://test.midata.coop:9000'
            }

            }

            // Connect with MIDATA
            $scope.loggedIn = I4MIMidataService.loggedIn();

            var timer = $timeout(function refresh() {
                if (I4MIMidataService.loggedIn()) {

                    window.localStorage.setItem("username", $scope.user.username);
                    window.localStorage.setItem("password", $scope.user.password);
                    window.localStorage.setItem("server", $scope.user.server);

                    $state.go('menu.home');
                } else {
                    timer = $timeout(refresh, 1000);}
                }, 1000);
});

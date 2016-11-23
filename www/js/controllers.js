angular.module('starter.controllers', ['ngCordova'])

//zyssm4 nav-funktionen & isels1 aufteilung und login/logout
.controller('homeCtrl', function ($scope, $state, I4MIMidataService) {


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

    $scope.data = {
        phoneNumber: "041788722744"
    };

    $scope.dialNumber = function (number) {
        window.open('tel:' + number, '_system');
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

.controller('telCtrl', function ($scope, $state, I4MIMidataService, $cordovaContacts, $cordovaNativeAudio) {

        $scope.getContacts = function () {
            $scope.phoneContacts = [];
            function onSuccess(contacts) {
                for (var i = 0; i < contacts.length; i++) {
                    var contact = contacts[i];
                    $scope.phoneContacts.push(contact);
                    console.log(contact);
                }
            };
            function onError(contactError) {
                alert(contactError);
                console.log("ITS NOT ALLIVVVEEEEEEE!!!!!!!�");
            };
            var options = {};
            options.multiple = true;
            $cordovaContacts.find(options).then(onSuccess, onError);
        };

        $scope.getContactList = function () {
            $scope.contacts = [];
            var options = {};
            options.multiple = true;
            $cordovaContacts.find(options).then(function (result) {
                for (var i = 0; i < result.length; i++) {
                    var contact = result[i];
                    if (contact.phoneNumbers != null)
                        $scope.contacts.push(contact);
                        console.log(contact);
                }

            }, function (error) {
                console.log("ERROR: " + error);
            });
        }
      

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

            if(un == undefined || un == "" || un == null ||
               pw == undefined || pw == "" || pw == null ||
               srv == undefined || srv == "" || srv == null) {

            
            // Use for testing the development environment
            $scope.user = {
            username: 'miau.claps@gmail.com',
            server: 'https://test.midata.coop:9000'
            }
            
            } else {
            $scope.user = {
            username: un,
            password: pw,
            server: srv
            }
            
            I4MIMidataService.login(un, pw, srv);

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

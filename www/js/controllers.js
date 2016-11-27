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

            $scope.dashboard = function () {
                $state.go('menu.dashboard');
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
    //vlads1 & zyssm4 getContactList & addContact
    //Get all contacts from the device. Save them in an array and show them in the console
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

    //Add the pre defined contact below on the device
    $scope.addContact = function() {
        $cordovaContacts.save($scope.contactForm).then(function(result) {
            // Contact saved
        }, function(err) {
            // Contact error
        });

    $scope.contactForm = {

        "displayName": "jones",
        "name": {
            "givenName": "jones",
            "formatted": "jones "
        },
        "nickname": null,
        "phoneNumbers": [
            {
                "value": "0333367465",
                "type": "mobile"
            }
        ],
        "emails": [
            {
                "value": "miau@gmail.com",
                "type": "home"
            }
        ],
        "addresses": [
            {
                "type": "home",
                "formatted": "Hoenweg 80",
                "streetAddress": "Hoehenweg 80"
            }
        ],
        "ims": null,
        "organizations": null,
        "birthday": null,
        "note": "",
        "photos": null,
        "categories": null,
        "urls": null
    }
};



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
            })

// Controller for the dashboard (isels1)
// --> shows different charts for vital data
.controller('DashboardCtrl', function($scope) {

            var $configLine = {
            name: '.ct-chartLine',
            labels: 'Week',
            series: "[12, 9, 7, 8, 5, 9, 0]",
            fullWidth: "true",
            showArea: "true",
            };

            var chartLine = new ChartJS($configLine);
            chartLine.line();


            var $configPie = {
            name: '.ct-chartPie',
            };

            var data = {
            series: [5, 3, 4]
            };
            var chartPie = new ChartJS($configPie);
            chartPie.pie(data);



            var $configBar = {
            name: '.ct-chartBar',
            labels: 'Year',
            series: '[5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8]',
            };
            var chartBar = new ChartJS($configBar);
            chartBar.bar();

            });

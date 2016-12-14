angular.module('starter.controllers', ['ngCordova'])

//zyssm4 nav-funktionen & isels1 aufteilung und login/logout
.controller('homeCtrl', function ($scope, $state, ownMidataService, $cordovaMedia) {

   $scope.play = function(src) {
    // Play the audio file at url
    var my_media = new Media(src,
        // success callback
        function () {
            console.log("playAudio():Audio Success");
        },
        // error callback
        function (err) {
            console.log("playAudio():Audio Error: " + err);
        }
    );

    // Play audio
    my_media.play();
}
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

    var isLoggedIn = ownMidataService.loggedIn();
    if (isLoggedIn) {
        $scope.logout = function() {
            window.localStorage.setItem("password", '');
            ownMidataService.logout();
            $state.go('login'); };
    } else {
        $state.go('login');
    }

})

.controller('telCtrl', function ($scope, $compile,$state, $ionicPopup, ownMidataService, $cordovaContacts, $cordovaNativeAudio) {
    //vlads1 & zyssm4 getContactList & addContact
    //Get all contacts from the device. Reads the Phonenumber, Name and picture. These are then put into the html
    $scope.getContactList = function () {
        $scope.contacts = [];
        var options = {};
        options.multiple = true;
        options.hasPhoneNumber = true;
        options.fields = ['displayName', 'phoneNumbers', 'emails', 'photos'];

        $cordovaContacts.find(options).then(function (result) {
            for (var i = 0; i < result.length; i++) {
                 $scope.contacts = result;
            }
            console.log($scope.contacts);
        }, function (error) {
            console.log("ERROR: " + error);
        });


    }
    //Add the pre defined contact below on the device
    $scope.addContact = function () {
        $cordovaContacts.save($scope.dummyContacts).then(function (result) {
            console.log(result.phoneNumbers["0"].value);
        }, function (err) {
            // Contact error
        });
    }

    $scope.dummyContacts = {
            "displayName": "jones",
            "name": {
                "givenName": "jones",
                "formatted": "jones "
            },
            "nickname": null,
            "phoneNumbers": [
                {
                    "value": "0311234567",
                    "type": "mobile"
                }
            ],
            "emails": [
                {
                    "value": "xddf@dd.com",
                    "type": "home"
                }
            ],
            "addresses": [
                {
                    "type": "home",
                    "formatted": "This Address, An Address",
                    "streetAddress": "This Address, An Address"
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

    // Ausgew�hlten Kontaktund ausgew�hlte Feld ID speichern Iselis1 und Vlads1
    $scope.selectContacts = function (Contact) {
      var contactList = new Array();
      if (window.localStorage.getItem("selectedContacts") != null) {
           contactList = JSON.parse(window.localStorage.getItem("selectedContacts"));
      }

      var existing = false;
      var selectedContact = JSON.parse(Contact.contact);
      for (var i = 0; i < contactList.length; i++) {
          var contactObj = JSON.parse(contactList[i]);
          if (JSON.parse(contactObj.contact).id == selectedContact.id) {
              existing = true;
          }
      }

      if (!existing) {

          var fieldId = Contact.id;
          for (var i = 0; i < contactList.length; i++) {
              var contactObj = JSON.parse(contactList[i]);
              if (contactObj.id === fieldId) {
                  contactList.splice(i, 1);
              }
          }
          contactList.push(JSON.stringify(Contact));
      }
      window.localStorage.setItem("selectedContacts", JSON.stringify(contactList));

    }


    // Kontakt ausw�hlen Iselis1 und Vlads1
    $scope.pickContact = function (Contact, fieldId) {
        var localContact = {
            id: fieldId,
            contact: JSON.stringify(Contact)
        }

        $scope.contactToSave = localContact;
    }

    $scope.setContacttoButton = function (){
        var id = $scope.contactToSave.id
        $scope.contactforFill = JSON.parse($scope.contactToSave.contact);
        document.getElementById(id).childNodes[0].nextSibling.setAttribute('ng-src', '{{$scope.contactforFill.photos[0].value}}');
        document.getElementById(id).childNodes[0].nextSibling.setAttribute('src', '{{$scope.contactforFill.photos[0].value}}');
        console.log( document.getElementById(id).childNodes[0].nextSibling.setAttribute('src', '{{$scope.contactforFill.photos[0].value}}'));
    }


    // Popup Kontaktauswahl Iselis1 und Vlads1
    $scope.TelPopup = function (event) {
        $scope.fieldId = event.target.parentElement.id;
        $scope.data = {
            vm: [
              $scope.contacts,
            ]

        };
        $ionicPopup.show({
            template: '<div class="list listlength" ng-show="contacts"> <div class="card" ng-repeat="Contact in contacts" ng-click="pickContact(Contact, fieldId)"> <div class="item item-divider"> {{ Contact.displayName }} </div> <div class="item item-text-wrap"> <p><strong>Foto</strong></p> <p><img src="{{Contact.photos[0].value}}"></img></p> </div> </div> </div>',
            title: 'Telefonliste:',
            subTitle: 'Bitte waehlen Sie einen Kontakt aus',
            scope: $scope,
            cssClass: 'TelPopup',
            buttons: [
              { text: 'Abbrechen' },
              {
                  text: '<b>Fertig</b>',
                  onTap: function (e) {
                      $scope.selectContacts($scope.contactToSave);
                      $scope.setContacttoButton();
                  }
              }
            ]
        });
    }

    $scope.openmedi = function () {
    $state.go('medplan');
}
    $scope.openhome = function () {
    $state.go('menu.home');
}
    var isLoggedIn = ownMidataService.loggedIn();
    if (isLoggedIn) {
        $scope.logout = function() {
        window.localStorage.setItem("password", '');
        ownMidataService.logout();
        $state.go('login'); };
} else {
    $state.go('login');
    }
})

.controller('loginCtrl', function ($scope, ownMidataService, $timeout, $state) {
    $scope.newLogin = function() {
    ownMidataService.login($scope.user.username,
             $scope.user.password,
             $scope.user.role);
    }

    var un = window.localStorage.getItem("username");
    var pw = window.localStorage.getItem("password");
    var srv = window.localStorage.getItem("server");

    if(un == undefined || un == "" || un == null ||
       pw == undefined || pw == "" || pw == null ||
       srv == undefined || srv == "" || srv == null) {


        // Use for testing the development environment
        $scope.user = {
            username: 'miau.claps@gmail.com',
            server: 'https://test.midata.coop:9000',
            role: 'member'

        }

    } else {
        $scope.user = {
            username: un,
            password: pw,
            server: srv,
            role: 'member'
        }

        $scope.newLogin();

    }

    // Connect with MIDATA
    $scope.loggedIn = ownMidataService.loggedIn();

    var timer = $timeout(function refresh() {
        if (ownMidataService.loggedIn()) {

            window.localStorage.setItem("username", $scope.user.username);
            window.localStorage.setItem("password", $scope.user.password);
            window.localStorage.setItem("server", $scope.user.server);

            $state.go('menu.home');
        } else {
            timer = $timeout(refresh, 1000);}
    }, 1000);
            })

.controller('settingsCtrl', function($scope, ionicTimePicker) {
  var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        if($scope.selectedTime == 'morning') {
          window.localStorage.setItem('morningTime', selectedTime.getUTCHours() + ':' + selectedTime.getUTCMinutes());
          document.getElementById('setTimeMorning').innerHTML = window.localStorage.getItem('morningTime');

        } else if ($scope.selectedTime == 'noon') {
          window.localStorage.setItem('noonTime', selectedTime.getUTCHours() + ':' + selectedTime.getUTCMinutes());
          document.getElementById('setTimeNoon').innerHTML = window.localStorage.getItem('noonTime');

        } else if ($scope.selectedTime == 'evening') {
          window.localStorage.setItem('eveningTime', selectedTime.getUTCHours() + ':' + selectedTime.getUTCMinutes());
          document.getElementById('setTimeEvening').innerHTML = window.localStorage.getItem('eveningTime');

        } else if ($scope.selectedTime == 'night') {
          window.localStorage.setItem('nightTime', selectedTime.getUTCHours() + ':' + selectedTime.getUTCMinutes());
          document.getElementById('setTimeNight').innerHTML = window.localStorage.getItem('nightTime');

        }
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
      }
    },
    inputTime: 50400,   //Optional
    format: 24,         //Optional
    step: 15,           //Optional
    setLabel: 'Fertig',    //Optional
    closeLabel: 'Abbrechen'
  };

  var morningTime = window.localStorage.getItem('morningTime');
  var noonTime = window.localStorage.getItem('noonTime');
  var eveningTime = window.localStorage.getItem('eveningTime');
  var nightTime = window.localStorage.getItem('nightTime');

  if (morningTime != null) {
    document.getElementById('setTimeMorning').innerHTML = morningTime;
  } else {
    document.getElementById('setTimeMorning').innerHTML = 'Noch keine Einnahmezeit gesetzt.';
  }
  if (noonTime != null) {
    document.getElementById('setTimeNoon').innerHTML = noonTime;
  } else {
    document.getElementById('setTimeNoon').innerHTML = 'Noch keine Einnahmezeit gesetzt.';
  }
  if (morningTime != null) {
    document.getElementById('setTimeEvening').innerHTML = eveningTime;
  } else {
    document.getElementById('setTimeEvening').innerHTML = 'Noch keine Einnahmezeit gesetzt.';
  }
  if (morningTime != null) {
    document.getElementById('setTimeNight').innerHTML = nightTime;
  } else {
    document.getElementById('setTimeNight').innerHTML = 'Noch keine Einnahmezeit gesetzt.';
  }

  $scope.changeTime = function(time) {
    $scope.selectedTime = time;
    ionicTimePicker.openTimePicker(ipObj1);
  }





});

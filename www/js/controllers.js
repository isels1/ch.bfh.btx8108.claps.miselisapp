angular.module('starter.controllers', ['ngCordova'])

//zyssm4 nav-funktionen & isels1 aufteilung und login/logout
.controller('homeCtrl', function ($scope, $state, ownMidataService, $cordovaLocalNotification) {

   $scope.play = function() {

       $cordovaLocalNotification.schedule({
         id: 1,
         text: 'Easter Egg',
         title: 'MIAU',
         sound: 'file://sounds/miau.mp3'
       }).then(function() {
         console.log("Instant Notification set");
       });
     };



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

.controller('telCtrl', function ($scope, $compile,  $state, $ionicPopup, ownMidataService, $cordovaContacts, $cordovaNativeAudio) {

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


    // Save choosen and the field-ID created by vlads1 & iselis1
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

    // take the choosen contact and save it (in a JSON-Object) in the localStorage, created by Iselis1 und Vlads1
    $scope.pickContact = function (Contact, fieldId) {
        var localContact = {
            id: fieldId,
            contact: JSON.stringify(Contact)
        }
        $scope.contactToSave = localContact;
        window.localStorage.setItem("pickedContacts", JSON.stringify(localContact));

    }

    $scope.loadContactFromLocal = function(){
      $scope.ContactInLocalstorage = JSON.parse(window.localStorage.getItem("selectedContacts"));
      for(i = 1; i < 11; i++){
        for(j = 0; j < $scope.ContactInLocalstorage.length; j++){
          var id = JSON.parse($scope.ContactInLocalstorage[j]);
          var obj = JSON.parse(id.contact);
          $scope.buttonId = "button" + i;

          if($scope.buttonId == id.id){

          var photo = obj.photos[0].value;

          if (photo != null) {
            document.getElementById($scope.buttonId).childNodes[0].nextSibling.setAttribute('src', obj.photos[0].value);
          }

          var contactName = document.getElementById($scope.buttonId).childNodes[3];
              contactName.textContent = obj.displayName;

          $scope.contactButton = document.getElementById($scope.buttonId);
          $scope.contactButton.setAttribute("data-phoneNumber", obj.phoneNumbers[0].value);
          $scope.contactButton.removeAttribute("data-toSet");
          $scope.contactButton.setAttribute("data-toSet", "false");

        }
      }
    }
  }
    //sets the choosen Button with the contact which is saved in the localStorage.. and has the same buttonId
    $scope.setContacttoButton = function (){
        $scope.ContactInLocalstorage = JSON.parse(window.localStorage.getItem("pickedContacts"));

        var contact = JSON.parse($scope.ContactInLocalstorage.contact);
        var id = $scope.ContactInLocalstorage.id

        var photo = contact.photos;
        if (photo != null) {
            document.getElementById(id).childNodes[0].nextSibling.setAttribute('src', photo[0].value);
        }

        var contactName = document.getElementById(id).childNodes[3];
            contactName.textContent = contact.displayName;

        $scope.contactButton = document.getElementById(id);
        $scope.contactButton.setAttribute("data-phoneNumber", contact.phoneNumbers[0].value);
        $scope.contactButton.removeAttribute("data-toSet");
        $scope.contactButton.setAttribute("data-toSet", "false");



    }

    $scope.Edit = true;

    $scope.changeEditMode = function () {
      if($scope.Edit == true){
        for(i = 1; i < 9; i++){
            document.getElementById("button" + i).setAttribute("data-toSet", true);
            }
        $scope.Edit = false;
        document.getElementById("editButton1").className = "editButton colorEditButton"
      }
      else if($scope.Edit == false){
        for(i = 1; i < 9; i++){
            document.getElementById("button" + i).setAttribute("data-toSet", false);
            }
        $scope.Edit = true;
        document.getElementById("editButton1").className = "editButton"
      }
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
            template: '<div class="list listlength contactSize" ng-show="contacts"> <div class="card divs " ng-repeat="Contact in contacts" ng-click="pickContact(Contact, fieldId); higlight($event)" id = {{$index}}> <div class="item item-divider custom-item-divider contactName"> {{ Contact.displayName }} </div> <div class="item item-text-wrap"><p><img class="contactPicture" src="{{Contact.photos[0].value}}"></img></p> </div> </div> </div>',
            title: 'Telefonliste:',
            subTitle: 'Bitte w&auml;hlen Sie einen Kontakt aus',
            scope: $scope,
            cssClass: 'TelpopUp',
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

    //highlights the choosen Contact in the contactList,  created zyssm4
    $scope.higlight = function(event){
    $scope.tester = event.target.parentElement.parentElement.parentElement.id;
    $scope.id = event.target.parentElement.parentElement.parentElement;
    if($scope.tester == ""){
      $scope.id = event.target.parentElement.parentElement;
    }

    if($scope.id.id != undefined){
      if($scope.lastID != null){
      document.getElementById($scope.lastID).childNodes[3].className = "item item-text-wrap whitecolor"
      }
      $scope.id.childNodes[3].className = "item item-text-wrap color"
      $scope.lastID = $scope.id.id;
    }
  }

    $scope.DialNumberPopup = function (event) {
        $scope.fieldId = event.target.parentElement.id;
        $scope.data = event.target.parentElement;
        $scope.telNr = $scope.data.getAttribute("data-phoneNumber");
        $scope.emergencyNr = "112";
        $ionicPopup.show({
            template: '',
            title: 'Anrufen?',
            subTitle: '',
            scope: $scope,
            cssClass: 'DialNumberPopUpSytle',
            buttons: [
              { text: 'Nein' },
              {
                    text: '<b>Ja</b>',
                    onTap: function () {
                      if($scope.data.getAttribute("id") == "emergencyButtonCall"){
                          document.location.href = "tel:"  + $scope.emergencyNr ;
                        }else{
                          document.location.href = "tel:" + $scope.telNr ;
                        }

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

    $scope.clickAction = function (event) {
      editMode = event.target.parentElement.getAttribute("data-toSet");
        if (editMode === "true") {
            event.target.parentElement.setAttribute("data-toSet", false);
            $scope.getContactList();
            $scope.TelPopup(event);

        } else {
            $scope.DialNumberPopup(event);
        }
    }
})

.controller('loginCtrl', function ($scope, $window, $compile, ownMidataService, $timeout, $state) {
  $scope.newLogin = function() {

    var user = document.getElementById("user").value;
    var pass = document.getElementById("pw").value;

    if (user != '' && $scope.user.username !== user) {
      $scope.user.username = user;
    }

    if (pass != '' && $scope.user.password !== pass) {
      $scope.user.password = pass;
    }

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
              //username: 'gruppe4@bfh.ch',
              //password: 'PW4clapps@midata',
              username: 'miau.claps@gmail.com',
              password: 'Miau123456!',
              //username: 'sina@midata.coop',
              //password: 'Sina123456',
              server: 'https://test.midata.coop:9000',
              role: 'member'
          }

          document.getElementById("user").value = $scope.user.username;
          document.getElementById("pw").value = $scope.user.password;

      } else {
          $scope.user = {
              username: un,
              password: pw,
              server: srv,
              role: 'member'
          }

          document.getElementById("user").value = $scope.user.username;
          document.getElementById("pw").value = $scope.user.password;

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

.controller('settingsCtrl', function($scope, ionicTimePicker, $cordovaLocalNotification) {
  var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        var currentMinutes = selectedTime.getUTCMinutes();
        if (currentMinutes.toString().length == 1) {
          currentMinutes = "0" + currentMinutes;
        }
        var currentHours = selectedTime.getUTCHours();
        if (currentHours.toString().length == 1) {
          currentHours = "0" + currentHours;
        }

        if($scope.selectedTime == 'morning') {
          window.localStorage.setItem('morningTime', currentHours + ':' + currentMinutes);
          document.getElementById('setTimeMorning').innerHTML = window.localStorage.getItem('morningTime');

        } else if ($scope.selectedTime == 'noon') {
          window.localStorage.setItem('noonTime', currentHours + ':' + currentMinutes);
          document.getElementById('setTimeNoon').innerHTML = window.localStorage.getItem('noonTime');

        } else if ($scope.selectedTime == 'evening') {
          window.localStorage.setItem('eveningTime', currentHours + ':' + currentMinutes);
          document.getElementById('setTimeEvening').innerHTML = window.localStorage.getItem('eveningTime');

        } else if ($scope.selectedTime == 'night') {
          window.localStorage.setItem('nightTime', currentHours + ':' + currentMinutes);
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
    if(time == 'morning'){
      ipObj1.inputTime = 28800;
    }else if(time == 'noon') {
      ipObj1.inputTime = 43200;
    }else if(time == 'evening'){
      ipObj1.inputTime = 64800;
    }else{
      ipObj1.inputTime = 79200;
    }
    ionicTimePicker.openTimePicker(ipObj1);
  }

  var value = true;

  $scope.getSettings = function(){
    var statusLocal = localStorage.getItem('ColorBLindMode');
    if(statusLocal == "true"){
      $scope.state = { checked: true };
    }else if(statusLocal == "false"){
      $scope.state = { checked: false };
    }else{
      $scope.state = { checked: false };
    }
    return $scope.state.checked

  };

  value = $scope.getSettings();
  $scope.colorBlindModeStatus = { checked : value};


  $scope.colorBlindMode = function(event) {
    if($scope.colorBlindModeStatus.checked == true){
      localStorage.setItem("ColorBLindMode", JSON.stringify(true));
    }
    else if($scope.colorBlindModeStatus.checked == false){
      localStorage.setItem("ColorBLindMode", JSON.stringify(false));
    }
    location.reload();
  };

  $scope.scheduleInstantNotification = function() {
    $cordovaLocalNotification.schedule({
      id: 1,
      text: 'Instant Notification',
      title: 'Instant',
      icon: 'res:/icon.png'
    }).then(function() {
      console.log("Instant Notification set");
    });
  };

});

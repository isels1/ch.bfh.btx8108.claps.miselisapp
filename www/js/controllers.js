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
        $state.go('login');
    }

})


.controller('telCtrl', function ($scope, $state, $ionicPopup, I4MIMidataService, $cordovaContacts, $cordovaNativeAudio) {
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

    // An alert dialog
    $scope.TelPopup = function () {
        $scope.data = {
            vm: [
              $scope.contacts,
            ]

        };
        $ionicPopup.show({
            template: '<div class="list listlength" ng-show="contacts"> <div class="card" ng-repeat="Contact in contacts"> <div class="item item-divider"> {{ Contact.displayName }} </div> <div class="item item-text-wrap"> <p><strong>Foto</strong></p> <p><img src="{{Contact.photos[0].value}}"></img></p> </div> </div> </div>',
            title: 'Telefonliste:',
            subTitle: 'Bitte waehlen Sie einen Kontakt aus',
            scope: $scope,
            cssClass: 'TelPopup',
            buttons: [
              { text: 'Abbrechen' },
              {
                  text: '<b>Fertig</b>',
                  onTap: function (e) {
                      // add your action
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
    var isLoggedIn = I4MIMidataService.loggedIn();
    if (isLoggedIn) {
        $scope.logout = function() {
        window.localStorage.setItem("password", '');
        I4MIMidataService.logout();
        $state.go('login'); };
} else {
    $state.go('login');
    }
})

.controller('medplanCtrl', function ($scope, $state, $ionicPopup, I4MIMidataService) {

  $scope.header = [{title:'', class:'HeaderBlock'},
                  {title:'Morgen',class:'MorningColor'},
                  {title:'Mittag',class:'NoonColor'},
                  {title:'Abend',class:'EveningColor'},
                  {title:'Nacht',class:'NightColor'}]

  $scope.days = [{title:'Mo.'},
                {title:'Di.'},
                {title:'Mi.'},
                {title:'Do.'},
                {title:'Fr..'},
                {title:'Sa.'},
                {title:'So.'}]

  $scope.time = [{title:'Morgen',text:'',class:'MorningColor '},
                {title:'Mittag',class:'NoonColor '},
                {title:'Abend',class:'EveningColor '},
                {title:'Nacht',class:'NightColor'}]


  $scope.showLocalStorage = function(){
    $scope.data =[];

    for(var i = 0; i < localStorage.length; i++){
        $scope.data.push(JSON.parse(localStorage.getItem("Medi".concat(i))));
    };

    for(var i = $scope.data.length - 1; i >= 0; i--) {
    if($scope.data[i] === null) {
       $scope.data.splice(i, 1);
    }};
    console.log($scope.data)


    var customTemplate =
    '<div class="row mediPopUp"><img class="smallMediPic"></img>'+ $scope.data[3].name +
    '<ion-toggle></ion-toggle></div>' ;

  $ionicPopup.show({
        template: customTemplate,
        title: 'Medikamente',
        subTitle: 'Bitte tragen Sie die eingenommenen Medikamente ein',
        scope: $scope,
        cssClass: 'styleMedPlan',
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Fertig</b>',
            type: 'button-positive',
            onTap: function(e) {
              // add your action
            }
          }
        ]
      });


    };



  $scope.changeCSS = function (){
    var css = document.getElementById("original")
    if(css.getAttribute('href') == "css/styleMedPlanColorNormal.css"){
    css.setAttribute('href', "css/styleMedPlanColorBlind.css");
  }else{
    css.setAttribute('href', "css/styleMedPlanColorNormal.css");
  }
  }


    $scope.opentel = function () {
        $state.go('tel');
    }
    $scope.openhome = function () {
        $state.go('menu.home');
    }

    $scope.opencreateMedi = function () {
        $state.go('createMedi');
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

            })

.controller('createMediCtrl', function($scope, $compile ,I4MIMidataService, $timeout, $state, $ionicPopup) {

   $scope.loadMediList = function(divName) {
    for(var i = 0; i < localStorage.length; i++){
    document.getElementById(divName).innerHTML =   "<div class='row'><div class='row {{header.class}}' ng-repeat='header in header'>{{header.title}}</div></div><div class='row'><div class='col mediBoxImg' ng-repeat='img in img'>{{img.imagePath}}</div><div class='col'><div class='row'><img ng-repeat='imgSchema in imgSchema' class='row {{imgSchema.class}} mediBoxImg' id='{{ 'imgSchema'+$index}}' ng-src='{{imgSchema.source}}'></div><div class='row'><div class='row {{timeSchema.class}}' ng-repeat='timeSchema in timeSchema' id='{{ 'timeSchema'+$index}}'>{{timeSchema.title}}</div></div><div class='row'><div class='row {{buttonSchema.class}} buttonStatusIMG' ng-repeat='buttonSchema in buttonSchema' ng-click='changeStatus()' id='{{ 'buttonSchema'+$index}}'>{{buttonSchema.title}}</div></div></div><div class='col '><div class='row'><div class='row {{lableIntervall.class}}' ng-repeat='lableIntervall in lableIntervall' id='{{ 'lableIntervall'+$index}}'>{{lableIntervall.title}}</div></div><div class='row'><div class='row {{buttonIntervall.class}} buttonStatusIMG' ng-repeat='buttonIntervall in buttonIntervall' ng-click='changeStatus()' id='{{ 'buttonIntervall'+$index}}'>{{buttonIntervall.title}}</div></div></div></div>"
      $compile( document.getElementById(divName) )($scope);
  }

    };




  $scope.header = [{title:'MediName', class:'HeaderBlock'},
                  {title:'Häufigkeit',class:'HeaderBlock'},
                  {title:'Intervall',class:'HeaderBlock'},
                  {title:'DeleteButton', source:'/img/trash-logo-icon-61182.png', class:'HeaderBlock' }]

  $scope.img = [{imagePath:'', class:'mediImage'}]

  $scope.imgSchema = [{source:'/img/Morning.png' , class:'HeaderBlock'},
                      {source:'/img/Noon.png' , class:'HeaderBlock'},
                      {source:'/img/Night.png' , class:'HeaderBlock'},
                      {source:'/img/moon.png' , class:'HeaderBlock'}]

  $scope.timeSchema = [{title: "Morgen" , class:'HeaderBlock'},
                      {title: "Mittag" , class:'HeaderBlock'},
                      {title: "Abend" , class:'HeaderBlock'},
                      {title: "Nacht" , class:'HeaderBlock'}]


  $scope.buttonSchema = [{title: "Morgen" , class:'HeaderBlock'},
                        {title: "Mittag" , class:'HeaderBlock'},
                        {title: "Abend" , class:'HeaderBlock'},
                        {title: "Nacht" , class:'HeaderBlock'}]

  $scope.lableIntervall = [{title:"Mo.", class:'HeaderBlock'},
                          {title:"Di.", class:'HeaderBlock'},
                          {title:"Mi.", class:'HeaderBlock'},
                          {title:"Do.", class:'HeaderBlock'},
                          {title:"Fr.", class:'HeaderBlock'},
                          {title:"Sa.", class:'HeaderBlock'},
                          {title:"So.", class:'HeaderBlock'}]

  $scope.buttonIntervall = [{title:"Mo.", class:'HeaderBlock'},
                          {title:"Di.", class:'HeaderBlock'},
                          {title:"Mi.", class:'HeaderBlock'},
                          {title:"Do.", class:'HeaderBlock'},
                          {title:"Fr.", class:'HeaderBlock'},
                          {title:"Sa.", class:'HeaderBlock'},
                          {title:"So.", class:'HeaderBlock'}]


$scope.Medi1 = {
  name: "Antibiotika",
  dose: "1"
}

$scope.Medi2 = {
  name: "Antibiotika",
  dose: "2"
}

$scope.addMedicament = function(){

  var customTemplate =
  '<div class="row mediPopUp"><button>Zurück</button><label>Ein neues Medikament erfassen</label></div><div class="row mediPopUp"/><label>Name</label><input type="text"><input><label>Foto des Medikamentes</label><button></button></div><div class="row mediPopUp"><div class="row mediPopUp"><label>Einnahmezeit</label><label>Intervall</label></div><div class="row mediPopUp"><div class="row mediPopUp"><img src="img/Morning.png"><img src="img/Noon.png"><<imgsrc="img/Night.png"><imgsrc="img/moon.png"><label>Mo.</label><label>Di.</label><label>Mi.</label><label>Do.</label><label>Fr.</label><label>Sa.</label><label>So.</label></div><div class="row mediPopUp"><img src="img/Xnormal.png" ng-click="CheckboxStatchange"/><img src="img/Xnormal.png" ng-click="CheckboxStatchange"><img src="img/Xnormal.png" ng-click="CheckboxStatchange"><img src="img/Xnormal.png" ng-click="CheckboxStatchange"><img src="img/Xnormal.png" ng-click="CheckboxStatchange"><img src="img/Xnormal.png" ng-click="CheckboxStatchange"><img src="img/Xnormal.png" ng-click="CheckboxStatchange"><img src="img/Xnormal.png" ng-click="CheckboxStatchange"><img src="img/Xnormal.png" ng-click="CheckboxStatchange"><img src="img/Xnormal.png" ng-click="CheckboxStatchange"><img src="img/Xnormal.png" ng-click="CheckboxStatchange"></div></div></div><div class="row mediPopUp"><div class="col mediPopUp"><label>Wiederholung</label></div><div class="col mediPopUp"><div class="row mediPopUp"><label>Startdatum</label><input type="date"><input></div><div class="row mediPopUp"><label>Enddatum</label><input type="date"><input></div></div></div><div class="row mediPopUp"><button>Speichern</button></div>'

  $ionicPopup.show({
        template: customTemplate,
        title: 'Medikamente',
        subTitle: 'Bitte tragen Sie die eingenommenen Medikamente ein',
        scope: $scope,
        cssClass: 'styleMedPlan',
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Fertig</b>',
            type: 'button-positive',
            onTap: function(e) {
              // add your action
            }
          }
        ]
      });


    };

/*  <div class="row"><div class="row {{header.class}}" ng-repeat="header in header">{{header.title}} </div> </div>
  <div class="row">
    <div class="col mediBoxImg" ng-repeat="img in img">{{img.imagePath}}</div>
    <div class="col">
      <div class="row"><img ng-repeat="imgSchema in imgSchema" class="row {{imgSchema.class}} mediBoxImg" id="{{ 'imgSchema'+$index}}" ng-src="{{imgSchema.source}}"></div>
      <div class="row"> <div class="row {{timeSchema.class}}" ng-repeat="timeSchema in timeSchema" id="{{ 'timeSchema'+$index}}">{{timeSchema.title}}</div></div>
      <div class="row"> <div class="row {{buttonSchema.class}} buttonStatusIMG" ng-repeat="buttonSchema in buttonSchema" ng-click="changeStatus()" id="{{ 'buttonSchema'+$index}}">{{buttonSchema.title}}</div></div>
    </div>
    <div class="col ">
      <div class="row"><div class="row {{lableIntervall.class}}" ng-repeat="lableIntervall in lableIntervall" id="{{ 'lableIntervall'+$index}}">{{lableIntervall.title}}</div></div>
      <div class="row"> <div class="row {{buttonIntervall.class}} buttonStatusIMG" ng-repeat="buttonIntervall in buttonIntervall" ng-click="changeStatus()" id="{{ 'buttonIntervall'+$index}}">{{buttonIntervall.title}}</div></div>
    </div>
  </div>*/


$scope.saveLocalStorage = function(divName){
  localStorage.setItem("Medi1", JSON.stringify($scope.Medi1) );
  localStorage.setItem("Medi2", JSON.stringify($scope.Medi2) );
}




    for(var i = 0; i < localStorage.length; i++){
      //data.push(localStorage.getItem("Medi".concat(i)));
      $scope.data = JSON.parse(localStorage.getItem("Medi".concat(i)));
    };

    /*for(var i = data.length - 1; i >= 0; i--) {
    if(data[i] === null) {
       data.splice(i, 1);
    }};

  };*/

  $scope.openmedi = function () {
      $state.go('medplan');
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

});

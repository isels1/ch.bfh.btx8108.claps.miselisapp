angular.module('starter.medicationController', ['ngCordova'])


.controller('medplanCtrl', function ($scope, $state, $ionicPopup, I4MIMidataService) {
            $scope.header = [{title:'', class:'HeaderBlock'},
                             {title:'Morgen',class:'MorningColor'},
                             {title:'Mittag',class:'NoonColor'},
                             {title:'Abend',class:'EveningColor'},
                             {title:'Nacht',class:'NightColor'}];

            $scope.days = [{title:'Mo'},
                           {title:'Di'},
                           {title:'Mi'},
                           {title:'Do'},
                           {title:'Fr'},
                           {title:'Sa'},
                           {title:'So'}];

            $scope.time = [{title:'Morgen',text:'',class:'MorningColor '},
                           {title:'Mittag',class:'NoonColor '},
                           {title:'Abend',class:'EveningColor '},
                           {title:'Nacht',class:'NightColor'}];


            $scope.showLocalStorage = function(){


            $scope.data =[];

            var medList = JSON.parse(localStorage.getItem("MedicationList"));

            for(var i = 0; i < medList.medication.length; i++) {
                var obj = medList.medication[i];
                console.log(obj);
                $scope.data.push(obj);
            }

            //for(var i = 0; i < localStorage.length; i++){
            //$scope.data.push(JSON.parse(localStorage.getItem("Medi".concat(i))));
            //};

            //for(var i = $scope.data.length - 1; i >= 0; i--) {
            //if($scope.data[i] === null) {
            //$scope.data.splice(i, 1);
            //}};

            var customTemplate = "";

            for(var i = 0; i < $scope.data.length; i++) {
                customTemplate += '<div class="row mediPopUp"><img class="smallMediPic"></img>'+ $scope.data[i].name +
                '<ion-toggle></ion-toggle></div>' ;
            }

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

            $scope.toTakeClickAction = function (event) {
            var dayTime = this.$index;
            var day = this.$parent.days.title;
            console.log(day + " " + dayTime);

            $scope.data =[];

            var medList = JSON.parse(localStorage.getItem("MedicationList"));

            for(var i = 0; i < medList.medication.length; i++) {
            var obj = medList.medication[i];

            if (obj.interval.indexOf(day) !== -1)
            {
            if(dayTime == 0 &&
               obj.schema.Morning.state != 0) {
            $scope.data.push(obj);
            }
            if(dayTime == 1 &&
               obj.schema.Noon.state != 0) {
            $scope.data.push(obj);
            }
            if(dayTime == 2 &&
               obj.schema.Evening.state != 0) {
            $scope.data.push(obj);
            }
            if(dayTime == 3 &&
               obj.schema.Night.state != 0) {
            $scope.data.push(obj);
            }
            }

            }

            //TEST
            for (var i = 0; i < $scope.data.length; i++) {
            console.log($scope.data[i])
            }

            }

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


.controller('createMediCtrl', function($scope, $compile ,I4MIMidataService, $timeout, $state, $ionicPopup, $cordovaCamera) {

            $scope.MedTempelate =
            "<div class='row'>"+
              "<div class='row {{header.class}}' ng-repeat='header in header'>{{header.title}}</div>"+
            "</div>"+
            "<div class='row'>"+
                "<div class='col mediBoxImg' ng-repeat='img in img'>{{img.imagePath}}</div>"+
              "<div class='col'>"+
                "<div class='row'>"+
                  "<img ng-repeat='imgSchema in imgSchema' class='row {{imgSchema.class}} mediBoxImg' id='{{ 'imgSchema'+$index}}' ng-src='{{imgSchema.source}}'>"+
                "</div>"+
                "<div class='row'>"+
                  "<div class='row {{timeSchema.class}}' ng-repeat='timeSchema in timeSchema' id='{{ 'timeSchema'+$index}}'>{{timeSchema.title}}</div>"+
                "</div>"+
                "<div class='row'>"+
                  "<div class='row {{buttonSchema.class}} buttonStatusIMG' ng-repeat='buttonSchema in buttonSchema' ng-click='changeStatus()' id='{{ 'buttonSchema'+$index}}'>{{buttonSchema.title}}</div>"+
                "</div>"+
              "</div>"+
              "<div class='col'>"+
                "<div class='row'>"+
                  "<div class='row {{lableIntervall.class}}' ng-repeat='lableIntervall in lableIntervall' id='{{ 'lableIntervall'+$index}}'>{{lableIntervall.title}}</div>"+
                "</div>"+
                "<div class='row'>"+
                  "<div class='row {{buttonIntervall.class}} buttonStatusIMG' ng-repeat='buttonIntervall in buttonIntervall' ng-click='changeStatus()' id='{{ 'buttonIntervall'+$index}}'>{{buttonIntervall.title}}</div>"+
                "</div>"+
              "</div>"+
            "</div>";

            $scope.loadMediList = function(divName) {
            var p = null;
            for(var i = 0; i < localStorage.length; i++){
            if(localStorage.key(i) == "Medi".concat(i + 1 )){
            var newElement = document.createElement('div');
            newElement.innerHTML = $scope.MedTempelate;
            $compile(document.getElementById(divName).appendChild(newElement))($scope);
            }}

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
            id: '0',
            name: 'Antibiotika',
            dose: 25,
            unit: 'mg',
            schema: {
            Morning: {
            amount: 'state',
            state: 1,
            },
            Noon: {
            amount: 'state',
            state: 0,
            },
            Evening: {
            amount: 'state',
            state: 1,
            },
            Night: {
            amount: 'state',
            state: 0,
            }
            },
            interval: ["Mo", "Di", "Mi", "Do", "Fr"],
            startDate: '12.12.2016',
            endDate: '31.12.2016',
            img: 'url-goes-here'
            }

            $scope.Medi2 = {
            id: '1',
            name: 'Parazetamol',
            dose: 25,
            unit: 'mg',
            schema: {
            Morning: {
            amount: 'state',
            state: 3,
            },
            Noon: {
            amount: 'state',
            state: 1,
            },
            Evening: {
            amount: 'state',
            state: 0,
            },
            Night: {
            amount: 'state',
            state: 2,
            }
            },
            interval: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
            startDate: '12.12.2016',
            endDate: '18.12.2016',
            img: 'url-goes-here'
            }

            $scope.CheckboxStatchange = function(event){
                 var targetID = event.target.id;
                 var img1 = "img/Xnormal.png";

                 if(document.getElementById(targetID).getAttribute("data-id") == "unchecked"){
                  document.getElementById(targetID).src = "img/checked-checkbox-512.png";
                  document.getElementById(targetID).setAttribute("data-id", "checked")
                }else{
                    document.getElementById(targetID).src = "img/Xnormal.png";
                    document.getElementById(targetID).setAttribute("data-id", "unchecked")
                }
            }

            $scope.addMedicament = function(){

            var customTemplate =
            '<div>'+
            //Header
            '<div class="row MediPopUpStyle"/>'+
              '<div class="row">'+
                //Name
                '<div class="col PopUpLabel">'+
                  '<label class="font">Name</label>'+
                  '<input type="text" id="MediName">'+
                '</div>'+
                //Camera
                '<div class="col PopUpLabel">'+
                '<img ng-show="imgURI !== undefined" ng-src="{{imgURI}}">' +
                '<img ng-show="imgURI === undefined" ng-src="img/camera.png" ng-click="takePicture()>' +
                '</div>'+
              '</div>'+
            '</div>'+

            //Labelrow
            '<div class="row MediPopUpStyle">'+
              '<div class="row " id="top">'+
                '<div class="col PopUpLabel">'+
                  '<label class="font">Einnahmezeit</label>'+
                '</div>'+
                '<div class="col PopUpLabel">'+
                  '<label class="font">Intervall</label>'+
                '</div>'+
              '</div>'+
            '</div>'+

              //DayTime
              '<div class="row DayTimeRow">'+
              //moring
                '<div class="col gg">'+
                  '<div class="row">'+
                    '<label class="Spacer">Morgen</label>'+
                  '</div>'+
                  '<div class="row">'+
                    '<img class="ImgDayPopUp Spacer" src="img/Xnormal.png" ng-click="CheckboxStatchange($event)"  data-id="unchecked" id="DayTimeMoring">'+
                  '</div>'+
                '</div>'+
              //Noon
                '<div class="col gg">'+
                  '<div class="row">'+
                    '<label class="Spacer">Mittag</label>'+
                  '</div>'+
                  '<div class="row">'+
                    '<img class="ImgDayPopUp Spacer" src="img/Xnormal.png" ng-click="CheckboxStatchange($event)"  data-id="unchecked" id="DayTimeNoon">'+
                  '</div>'+
                '</div>'+
              //Evening
                '<div class="col gg">'+
                  '<div class="row">'+
                    '<label class="Spacer">Abend</label>'+
                  '</div>'+
                  '<div class="row">'+
                    '<img class="ImgDayPopUp Spacer" src="img/Xnormal.png" ng-click="CheckboxStatchange($event)"  data-id="unchecked" id="DayTimeEvening">'+
                  '</div>'+
                '</div>'+
              //Noon
                '<div class="col gg">'+
                  '<div class="row">'+
                    '<label class="Spacer">Nacht</label>'+
                  '</div>'+
                  '<div class="row">'+
                    '<img class="ImgDayPopUp Spacer" src="img/Xnormal.png" ng-click="CheckboxStatchange($event)" data-id="unchecked" id="DayTimeNight">'+
                  '</div>'+
                '</div>'+
              '</div>'+//DayTime div
              //Day
              '<div class="row DayTimeRow">'+
              //Montag
                '<div class="col gg">'+
                  '<div class="row">'+
                    '<label class="BigSpacer">Mo.</label>'+
                  '</div>'+
                  '<div class="row">'+
                    '<img class="ImgDayPopUp Spacer" src="img/Xnormal.png" ng-click="CheckboxStatchange($event)" data-id="unchecked" id="DayMo">'+
                  '</div>'+
                '</div>'+
              //Montag
                '<div class="col gg">'+
                  '<div class="row">'+
                    '<label class="Spacer">Di.</label>'+
                  '</div>'+
                  '<div class="row">'+
                    '<img class="ImgDayPopUp Spacer" src="img/Xnormal.png" ng-click="CheckboxStatchange($event)" data-id="unchecked" id="DayDi" >'+
                  '</div>'+
                '</div>'+
              //Mittwoch
                '<div class="col gg">'+
                  '<div class="row">'+
                    '<label class="Spacer">Mi.</label>'+
                  '</div>'+
                  '<div class="row">'+
                    '<img class="ImgDayPopUp Spacer" src="img/Xnormal.png" ng-click="CheckboxStatchange($event)" data-id="unchecked" id="DayMi">'+
                  '</div>'+
                '</div>'+
              //Donnerstag
                '<div class="col gg">'+
                  '<div class="row">'+
                    '<label class="Spacer">Do.</label>'+
                  '</div>'+
                  '<div class="row">'+
                    '<img class="ImgDayPopUp Spacer" src="img/Xnormal.png" ng-click="CheckboxStatchange($event)" data-id="unchecked" id="DayDo">'+
                  '</div>'+
                '</div>'+
              //Freitag
                '<div class="col gg">'+
                  '<div class="row">'+
                    '<label class="Spacer">Fr.</label>'+
                  '</div>'+
                  '<div class="row">'+
                    '<img class="ImgDayPopUp Spacer" src="img/Xnormal.png" ng-click="CheckboxStatchange($event)" data-id="unchecked" id="DayFr">'+
                  '</div>'+
                '</div>'+
              //Samstag
                '<div class="col gg">'+
                  '<div class="row">'+
                    '<label class="Spacer">Sa.</label>'+
                  '</div>'+
                  '<div class="row">'+
                    '<img class="ImgDayPopUp Spacer" src="img/Xnormal.png" ng-click="CheckboxStatchange($event)" data-id="unchecked" id="DaySa">'+
                  '</div>'+
                '</div>'+
              //Sonntag
                '<div class="col gg">'+
                  '<div class="row">'+
                    '<label class="Spacer ">So.</label>'+
                  '</div>'+
                  '<div class="row">'+
                    '<img class="ImgDayPopUp Spacer" src="img/Xnormal.png" ng-click="CheckboxStatchange($event)" data-id="unchecked" id="DaySo">'+
                '</div>'+ //Sonntag div
              '</div>'+ //Day div
              '</div>'+

            '<div class="row">'+
              '<div class="col">'+
                '<div class="row MediPopUpStyle">'+
                  '<label>Startdatum</label>'+
                  '<input type="date" id="MediStartDate">'+
                '</div>'+
                '<div class="row MediPopUpStyle">'+
                  '<label>Enddatum</label>'+
                  '<input type="date" id="MediEndDate">'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'

            $ionicPopup.show({
                             template: customTemplate,
                             title: 'Medikament erfassen',
                             subTitle: 'Bitte geben Sie die Daten des neuen Mediamentes ein',
                             scope: $scope,
                             cssClass: 'my-custom-popup',
                             buttons: [
                                       { text: 'Zurück' },
                                       {
                                       text: '<b>Speichern</b>',
                                       type: 'button-positive',
                                       onTap: function(e) {
                                         var MediEndDate = document.getElementById("MediEndDate").value;
                                       console.log(MediEndDate);
                                       }
                                       }
                                       ]
                             });


            };

//camera example
$scope.takePicture = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    };



            $scope.saveLocalStorage = function(divName){
            var medList =  {
                medication: []
            }
            medList.medication.push($scope.Medi1);
            medList.medication.push($scope.Medi2);

            localStorage.setItem("MedicationList", JSON.stringify(medList));
            //localStorage.setItem("Medi1", JSON.stringify($scope.Medi1) );
            //localStorage.setItem("Medi2", JSON.stringify($scope.Medi2) );
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

angular.module('starter.medicationController', ['ngCordova'])


.controller('medplanCtrl', function ($scope, $state, $ionicPopup, I4MIMidataService) {
            $scope.header = [{title:'', class:'HeaderBlock'},
                             {title:'Morgen',class:'MorningColor'},
                             {title:'Mittag',class:'NoonColor'},
                             {title:'Abend',class:'EveningColor'},
                             {title:'Nacht',class:'NightColor'}];
            
            $scope.days = [{title:'Mo.'},
                           {title:'Di.'},
                           {title:'Mi.'},
                           {title:'Do.'},
                           {title:'Fr..'},
                           {title:'Sa.'},
                           {title:'So.'}];
            
            $scope.time = [{title:'Morgen',text:'',class:'MorningColor '},
                           {title:'Mittag',class:'NoonColor '},
                           {title:'Abend',class:'EveningColor '},
                           {title:'Nacht',class:'NightColor'}];
            
            
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


.controller('createMediCtrl', function($scope, $compile ,I4MIMidataService, $timeout, $state, $ionicPopup) {
            
            $scope.MedTempelate = "<div class='row'><div class='row {{header.class}}' ng-repeat='header in header'>{{header.title}} </div> </div>"+
            "<div class='row'>"+
            "<div class='col mediBoxImg' ng-repeat='img in img'>{{img.imagePath}}</div>"+
            "<div class='col'>"+
            "<div class='row'><img ng-repeat='imgSchema in imgSchema' class='row {{imgSchema.class}} mediBoxImg' id='{{ 'imgSchema'+$index}}' ng-src='{{imgSchema.source}}'></div>"+
            "<div class='row'> <div class='row {{timeSchema.class}}' ng-repeat='timeSchema in timeSchema' id='{{ 'timeSchema'+$index}}'>{{timeSchema.title}}</div></div>"+
            "<div class='row'> <div class='row {{buttonSchema.class}} buttonStatusIMG' ng-repeat='buttonSchema in buttonSchema' ng-click='changeStatus()' id='{{ 'buttonSchema'+$index}}'>{{buttonSchema.title}}</div></div>"+
            "</div>"+
            "<div class='col '>"+
            "<div class='row'><div class='row {{lableIntervall.class}}' ng-repeat='lableIntervall in lableIntervall' id='{{ 'lableIntervall'+$index}}'>{{lableIntervall.title}}</div></div>"+
            "<div class='row'> <div class='row {{buttonIntervall.class}} buttonStatusIMG' ng-repeat='buttonIntervall in buttonIntervall' ng-click='changeStatus()' id='{{ 'buttonIntervall'+$index}}'>{{buttonIntervall.title}}</div></div>"+
            "</div>"+
            "</div>"
            
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
            state: 1,
            },
            Evening: {
            amount: 'state',
            state: 1,
            },
            Night: {
            amount: 'state',
            state: 1,
            }
            },
            interval: {
            Mo: true,
            Di: true,
            Mi: true,
            Do: true,
            Fr: true,
            Sa: true,
            So: false
            },
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
            state: 1,
            },
            Noon: {
            amount: 'state',
            state: 1,
            },
            Evening: {
            amount: 'state',
            state: 1,
            },
            Night: {
            amount: 'state',
            state: 1,
            }
            },
            interval: {
            Mo: true,
            Di: true,
            Mi: true,
            Do: true,
            Fr: true,
            Sa: true,
            So: true
            },
            startDate: '12.12.2016',
            endDate: '18.12.2016',
            img: 'url-goes-here'
            }
            
            $scope.addMedicament = function(){
            
            var customTemplate =
            '<div class="row mediPopUp">'+
            '<button>Zurück</button>'+
            '<label>Ein neues Medikament erfassen</label>'+
            '</div>'+
            '<div class="row mediPopUp"/>'+
            '<label>Name</label><input type="text"><input><label>Foto des Medikamentes</label><button></button></div>'+
            '<div class="row mediPopUp"><div class="row mediPopUp"><label>Einnahmezeit</label><label>Intervall</label></div>'+
            '<div class="row mediPopUp"><div class="row mediPopUp"><img src="img/Morning.png"><img src="img/Noon.png"><<imgsrc="img/Night.png"><imgsrc="img/moon.png">'+
            '<label>Mo.</label><label>Di.</label><label>Mi.</label><label>Do.</label><label>Fr.</label><label>Sa.</label><label>So.</label></div>'+
            '<div class="row mediPopUp"><img src="img/Xnormal.png" ng-click="CheckboxStatchange"/><img src="img/Xnormal.png" ng-click="CheckboxStatchange">'+
            '<img src="img/Xnormal.png" ng-click="CheckboxStatchange"><img src="img/Xnormal.png" ng-click="CheckboxStatchange">'+
            '<img src="img/Xnormal.png" ng-click="CheckboxStatchange"><img src="img/Xnormal.png" ng-click="CheckboxStatchange">'+
            '<img src="img/Xnormal.png" ng-click="CheckboxStatchange"><img src="img/Xnormal.png" ng-click="CheckboxStatchange">'+
            '<img src="img/Xnormal.png" ng-click="CheckboxStatchange"><img src="img/Xnormal.png" ng-click="CheckboxStatchange">'+
            '<img src="img/Xnormal.png" ng-click="CheckboxStatchange"></div></div></div><div class="row mediPopUp">'+
            '<div class="col mediPopUp"><label>Wiederholung</label></div>'+
            '<div class="col mediPopUp"><div class="row mediPopUp"><label>Startdatum</label>'+
            '<input type="date"><input></div><div class="row mediPopUp"><label>Enddatum</label>'+
            '<input type="date"><input></div></div></div><div class="row mediPopUp"><button>Speichern</button></div>'
            
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

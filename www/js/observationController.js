angular.module('starter.obsControllers', ['ngCordova'])

// Controller for the dashboard (isels1)
// --> shows different charts for vital data
.controller('DashboardCtrl', function($scope, $state, ownMidataService, $ionicPopup) {
/*
  var $configLine = {
    name: '.ct-chartLine',
    labels: 'Week',
    series: "[12, 9, 7, 8, 5, 9, 0]",
    fullWidth: "true",
    showArea: "true"
  };

  var chartLine = new ChartJS($configLine);
  chartLine.line();


  /*var $configPie = {
    name: '.ct-chartPie',
  };

  var data = {
    series: [5, 3, 4]
  };

  var chartPie = new ChartJS($configPie);
  chartPie.pie(data);
*/
  /*var $configBar = {
    name: '.ct-chartBar',
    labels: 'Year',
    series: '[5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8]'
  };
  var chartBar = new ChartJS($configBar);
  chartBar.bar();*/

  $scope.saveWeight = function () {
    var val = document.getElementById('obsWheigtInput').value;

    if (val == "") {
      $scope.showNoValPopup();
    } else if (isNaN(val)) {
      $scope.showNotNumeric();
    } else {
      var type = 'weight';

      ownMidataService.save(val, type).then(function(e){
        console.log('Resource Created: ' + e);
        //HARD CODED WEIGHT
        $scope.getObservation('w');
      });
    }
  }

  $scope.showNoValPopup = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Keinen Wert eingetragen!',
     template: 'Bitte gib dein Gewicht im dafür vorgesehenen Feld ein.'
   });
  }

   $scope.showNotNumeric = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Ungültiger Wert eingetragen!',
      template: 'Bitte gib dein Gewicht in kg an. Beispiel: 75'
    });
    }

    $scope.getObservation = function(resource) {
      res = "Observation";
      params = {};
      ownMidataService.search(res, params).then(function(observations) {
        result = [];
        //--> only pulses
        if(resource == "p") {
          for (var i = 0; i < observations.length; i++) {
            if(observations[i]._fhir == null) {
              if(observations[i].code.coding["0"].display == "Herzschlag" ||
                  observations[i].code.coding["0"].display == "Herzfrequenz")
              {
                result.push({time: observations[i].effectiveDateTime,
                            value: observations[i].valueQuantity.value});
              }
            }
          }
          console.log(result); //return
        //--> only weights
        } else if (resource == "w") {
          for (var i = 0; i < observations.length; i++) {
            if(observations[i]._fhir != null) {
              if(observations[i]._fhir.code.coding["0"].display == "Weight Measured" ||
                  observations[i]._fhir.code.coding["0"].display == "Body weight Measured" ||
                  observations[i]._fhir.code.coding["0"].display == "Gewicht")
              {
                result.push({time: observations[i]._fhir.effectiveDateTime,
                            value: observations[i]._fhir.valueQuantity.value});
              }
            }
          }
          console.log(result); //return
        //--> only blood pressures
        } else if (resource == "bp") {
          for (var i = 0; i < observations.length; i++) {
            if(observations[i]._fhir == null) {
              if(observations[i].code.coding["0"].display == "Blood Pressure") {
                result.push({time: observations[i].effectiveDateTime,
                            valueSys: observations[i].component["0"].valueQuantity.value,
                            valueDia: observations[i].component["1"].valueQuantity.value});
              }
            }
          }
          console.log(result); //return
        } else {
          //return all obs
        }

        var dates = new Array();
        var vals = new Array();
        for (var i = 0; i < result.length; i++){
          vals.push(result[i].value);
          var d = new Date(result[i].time);
          var currentMinutes = d.getMinutes();
          if (currentMinutes.toString().length == 1) {
            currentMinutes = "0" + currentMinutes;
          }
          dates.push(d.getDate() + "." + d.getMonth() + "." + d.getFullYear() + " - " + d.getHours() + ":" + currentMinutes + " Uhr");
        }

        var vals = vals.reverse();
        var $configBar = {
          name: '.ct-chartBar',
          labels: 'Custom',
          series: vals
        };
        var chartBar = new ChartJS($configBar, dates.reverse());
        chartBar.bar(vals);
      });
    }

    //HARD CODED WEIGHT
    $scope.getObservation("w");
});

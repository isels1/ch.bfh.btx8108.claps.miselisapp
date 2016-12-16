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

    $scope.drawChartCallback = function(result) {
      var dates = new Array();
      var vals = new Array();
      result = result.reverse();

      if (result.length > 5) {
        result = result.slice(Math.max(result.length - 5, 1));
      }

      for (var i = 0; i < result.length; i++){
        vals.push(result[i].value);
        var d = new Date(result[i].time);
        var currentMinutes = d.getMinutes();
        if (currentMinutes.toString().length == 1) {
          currentMinutes = "0" + currentMinutes;
        }
        dates.push(d.getDate() + "." + d.getMonth() + "." + d.getFullYear() + " - " + d.getHours() + ":" + currentMinutes + " Uhr");
      }

      var $configBar = {
        name: '.ct-chartBar',
        labels: 'Custom',
        series: vals
      };
      var chartBar = new ChartJS($configBar, dates);
      chartBar.bar(vals);
    }

    $scope.getObservation = function() {
      params = {};
      ownMidataService.getWeight(params, $scope.drawChartCallback);
    }

    //HARD CODED WEIGHT
    $scope.getObservation();
});

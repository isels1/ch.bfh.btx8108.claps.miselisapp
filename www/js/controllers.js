angular.module('starter.controllers', [])

//zyssm4 nav-funktionen & isels1 aufteilung und nav-bar-logik
.controller('homeCtrl', function ($scope, $state) {
    $scope.opentel = function () {
            $state.go('tel');
    }
    $scope.openmedi = function () {
            $state.go('medplan');
    }
})

.controller('telCtrl', function ($scope, $state) {
  $scope.openmedi = function () {
    $state.go('medplan');
  }
  $scope.openhome = function () {
    $state.go('home');
  }
})

.controller('medplanCtrl', function ($scope, $state) {
    $scope.opentel = function () {
        $state.go('tel');
    }
    $scope.openhome = function () {
        $state.go('home');
    }
});

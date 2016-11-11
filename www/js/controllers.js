angular.module('starter.controllers', [])

.controller('lgctrl', function ($scope, $state) {

  $scope.opentel = function () {

    $state.go('tel');

  }

  $scope.openmedi = function () {

    $state.go('medi');

  }

  $scope.opendash = function () {

    $state.go('dash');

  }

});

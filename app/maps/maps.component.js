'use strict';
angular.module('maps')
    .component('maps', {
        templateUrl: 'maps/maps.template.html',
        controller: ['$scope', function mapsController ($scope) {
            $scope.test = "hello from mapsController"
        }]
    })
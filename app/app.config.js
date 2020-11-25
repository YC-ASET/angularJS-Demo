'use strict';

angular.module('demoApp')
.config(['$routeProvider',
    function config($routeProvider) {
        $routeProvider
            .when('/maps/facilityId/:facilityId', {
                template: '<maps></maps>'
            })
            .when('/maps/suborgId/:suborgId', {
                template: '<maps></maps>'
            })
            .when('/tables', {
                template: '<tables></tables>'
            })
            .when('/', {
                template: '<tables></tables>'
            })
            .otherwise('/');
    }
]);
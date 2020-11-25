'use strict';

angular.module('demoApp')
.config(['$routeProvider',
    function config($routeProvider) {
        $routeProvider
            .when('/maps', {
                template: '<maps></maps>'
            })
            .when('/tables', {
                template: '<tables></tables>'
            })
            .otherwise('/tables');
    }
]);
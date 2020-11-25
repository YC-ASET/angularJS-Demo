'use strict';

angular.module('servicesModule', ['ngResource'])
    .constant('ApiBasePath', "http://localhost:3000")
    .factory('httpService', ['$http', 'ApiBasePath', httpService])

function httpService($http, ApiBasePath) {
    let service = this;

    service.getFacilities = function() {
        var response = $http({
            method: "GET",
            url: (ApiBasePath + "/orgs/2")
        });
        return response;
    }
    


}
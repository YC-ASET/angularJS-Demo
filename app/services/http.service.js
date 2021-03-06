'use strict';

angular.module('servicesModule', [])
    .constant('ApiBasePath', "http://localhost:3000")
    .service('HttpService', ['$http', 'ApiBasePath', HttpService])

function HttpService($http, ApiBasePath) {
    
    this.getFacilities = function() {
        var response = $http({
            method: "GET",
            url: (ApiBasePath + "/orgs/2")
        });
        return response;
    };

    // add CRUD methods here following the above GET format
    this.getFacilitiesBySuborgId = function(params) {
        var response = $http({
            method: "GET",
            url: (`${ApiBasePath}/facilities/bysuborgid/${params}`)
        });
        return response;
    }

}


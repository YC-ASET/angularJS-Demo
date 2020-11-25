'use strict';

angular.module('servicesModule')
    .constant('ApiBasePath', "http://localhost:3000")
    .factory('Http', ['$resource', 'ApiBasePath', Http])

function Http ($resource, ApiBasePath) {

    return $resource(ApiBasePath + "/orgs/2", {}, {
        query: {
            method: 'GET',
            isArray: true
        }
    })

    
    // let service = this;

    // service.getFacilities = function () {
    //     return $resource(ApiBasePath + "/orgs/2", {}, {
    //         query: {
    //           method: 'GET',
    //           isArray: true
    //         }
    //       })

    // }
}

// angular.
//   module('servicesModule').
//   factory('Http', ['$resource',
//     function($resource) {
//       return $resource("http://localhost:3000/orgs/2", {}, {
//         query: {
//           method: 'GET',
//           isArray: true
//         }
//       });
//     }
//   ]);
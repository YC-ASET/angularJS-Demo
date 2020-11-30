'use strict';

angular.module('maps')
    .component('maps', {
        templateUrl: 'maps/maps.template.html',
        controller: ['$scope', '$routeParams', 'HttpService', mapsController]
    })

function mapsController($scope, $routeParams, HttpService) {
    $scope.suborgId = $routeParams.suborgId;
    $scope.facilities;

    // 
    HttpService.getFacilitiesBySuborgId($scope.suborgId)
        .then(response => {
            console.log(response.data);
            let facilitiesData = response.data
            drawMap(facilitiesData)
        })


    function drawMap(facilitiesData) {

        // adjust setView to display all points 
        let mymap = L.map('mapid').setView([facilitiesData[0].coordinate.y, facilitiesData[0].coordinate.x], 13);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoieWNjaGkiLCJhIjoiY2tpMjc3ZGN0MHE0NzJ0bjVncm52cXdvNyJ9.VweBrj2vaUYXUiQBOK4tLg', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoieWNjaGkiLCJhIjoiY2tpMjc3ZGN0MHE0NzJ0bjVncm52cXdvNyJ9.VweBrj2vaUYXUiQBOK4tLg'
        }).addTo(mymap);
       
        function plotPoints(facilitiesData) {
            let markers = [];
            facilitiesData.forEach(e => {
                markers.push(
                    L.marker([e.coordinate.y, e.coordinate.x])
                    .bindPopup(e.facilityName)
                    .openPopup()
                )
            })

            let group = L.featureGroup(markers).addTo(mymap)

            // promise
            // setTimeout(() => {
            //     mymap.fitBounds(group.getBounds())
            // }, 1000)

            mymap.fitBounds(group.getBounds())


        }

        plotPoints(facilitiesData);


    }
}
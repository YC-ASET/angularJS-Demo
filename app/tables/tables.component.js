'use strict';
angular.module('tables')
    .component('tables', {
        templateUrl: 'tables/tables.template.html',
        controller: ['$scope', 'HttpService', function tableController($scope, HttpService) {
            $scope.test = "test from tableController"
            $scope.data;
            
            HttpService.getFacilities()
                .then(data => {
                    $scope.data = data.data    
                })

        }]
    })

    // orgController.$inject = ['FacilitiesService'];
    // function orgController(FacilitiesService) {
    //   var data = this;
    
    //   FacilitiesService.getFacilities()
    //   .then(response => {
    //     data.org = response.data;
    //     return data.org;
    //   })
    //   .then(data => {
    //     return getTotalNumberFacilities(data)
    //   })
    //   .then(totalNumberFacilities => {
    //     data.totalFacilities = totalNumberFacilities;
    //   })
    //   .catch(function (error) {
    //     console.log("Something went terribly wrong.");
    //   })
    
    //   const getTotalNumberFacilities = (data) => {
    //     let totalNumberFacilities = 0;
    //     data["suborgs"].forEach(e => {
    //       totalNumberFacilities += e["facilities"].length;
    //     });
    //     console.log(totalNumberFacilities)
    //     return totalNumberFacilities;
    //   }
    // }
    
    // // fix it to use two-way binding here
    // formController.$inject = ['FacilitiesService'];
    // function formController(FacilitiesService) {
    //   let facility = this;
    
    //   facility.name = "";
    //   facility.suborgId;
    //   facility.orgId;
    
    //   facility.addFacility = function () {
    //     FacilitiesService.addFacility(facility.name, facility.suborgId, facility.orgId)
    //     .then(() => FacilitiesService.getFacilities())
    //   }
    // }
    
    
    // tableController.$inject = ['$scope','FacilitiesService'];
    // function tableController($scope, FacilitiesService) {
    //   $scope.org = {};
    //   $scope.suborgs = [];
    
    
    //   FacilitiesService.getFacilities()
    //   .then(response => {
    //     $scope.org = response.data;
    //     $scope.suborgs = response.data.suborgs;
    //     return $scope;
    //   })
    //   .then(data => drawTable(data))
    //   // event watch to trigger 
    //   // $scope.$watch('suborgs', function () {
    //   //   setupDataTable($scope.suborgs);
    //   // }, true);
    
    //   $scope.expandCollapseAll = () => {
    //     expandCollapseAll();
    //   }
    // }
    
    
    // FacilitiesService.$inject = ['$http', 'ApiBasePath']
    // function FacilitiesService($http, ApiBasePath) {
    //   var service = this;
    
    //   service.getFacilities = function () {
    //     var response = $http({
    //       method: "GET",
    //       url: (ApiBasePath + "/orgs/2")
    //     });
    
    //     return response;
    //   };
    
    
    //   service.addFacility = function (name, suborgId, orgId) {
    //     var response = $http({
    //       method: "POST",
    //       url: (ApiBasePath + "/facilities/add"),
    //       data: {
    //         "facilityName": name,
    //         "suborgId": suborgId,
    //         "orgId": orgId
    //       }
    //     });
    //     return response;
    //   };
    // }
    
    
    // function loadTableData (suborgs) {
    //   console.log(suborgs)
    //   dataTable = $('#dataTable').DataTable({
    //     data: suborgs,
    //     "isExpanded": true,
    //     columns: [
    //       {
    //         "className": 'details-control',
    //         "orderable": false,
    //         "data": null,
    //         "defaultContent": '',
    //         "render": function () {
    //             return '<i class="fa fa-plus-square" aria-hidden="true"></i>';
    //         },
    //         width:"15px"
    //       },
    //       { data: "suborgId" },
    //       { data: "suborgName" },
    //       { data: "totalFacilities" },
    //       // {title: "suborgId"},
    //       // {title: "Name"},
    //       // {title: "Number of Facilities"},
    //     ]
    //   });
    
    //   // click to expand/collapse each row
    //   $('#dataTable tbody').on('click', 'td.details-control', function () {
    //     var tr = $(this).closest('tr');
    //     var row = dataTable.row( tr );
    //     var tdi = tr.find("i.fa");
    
    //     if ( row.child.isShown() ) {
    //         // This row is already open - close it
    //         row.child.hide();
    //         tr.removeClass('shown');
    //         tdi.first().removeClass('fa-minus-square');
    //         tdi.first().addClass('fa-plus-square');
    //     }
    //     else {
    //         // Open this row
    //         row.child( format(row.data()) ).show();
    //         tr.addClass('shown');
    //         tdi.first().removeClass('fa-plus-square');
    //         tdi.first().addClass('fa-minus-square');
    //     }
    //   });
    
    //   $(document).ready(function () {
    //     console.log(`###on load`);
    //     expandCollapseAll();
    
    //   });
    // };
    
    // function expandCollapseAll () {
      
    //   let allExpandButtons = $(".details-control");
    //   let expandCollapseButton = $("#expandCollapse");
    
    //   for(let i = 1; i < allExpandButtons.length; i++) {
    
    //     let tr = $(allExpandButtons[i]).closest('tr');
    //     let row = dataTable.row( tr );
    //     let tdi = tr.find("i.fa");
    
    //     //read custom attribute on row/table then if true, execute the same for all row
    //     if ( row.child.isShown() ) {
    
    //       // This row is already open - close it
    //       row.child.hide();
    //       tr.removeClass('shown');
    //       tdi.first().removeClass('fa-minus-square');
    //       tdi.first().addClass('fa-plus-square');
    //       expandCollapseButton.val("Expand All")
    //     } else {
    //       // Open this row
    //       expandCollapseButton.val("Collapse All")
    //       row.child( format(row.data()) ).show();
    //       tr.addClass('shown');
    //       tdi.first().removeClass('fa-plus-square');
    //       tdi.first().addClass('fa-minus-square');
    //     }
    //   }
    // }
    
    
    // function format ( d ) {
    //   // `d` is the original data object for the row
    
    //   // format child Row to display in a single row following the parent heading
    //   // return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
    //   //     '<tr>'+
    //   //         '<td>Full name:</td>'+
    //   //         '<td>'+d.name+'</td>'+
    //   //     '</tr>'+
    //   //     '<tr>'+
    //   //         '<td>Extension number:</td>'+
    //   //         '<td>'+d.extn+'</td>'+
    //   //     '</tr>'+
    //   //     '<tr>'+
    //   //         '<td>Extra info:</td>'+
    //   //         '<td>And any further details here (images etc)...</td>'+
    //   //     '</tr>'+
    //   // '</table>';
    //   let nametest = `jet Propulsion Lab`
    //   return `<table>
    //             <tr>
    //             <td></td>
    //             <td></td>
    //             <td></td>
    //             <td>${nametest}</td>
    //             <td>${5}</td>
    //             </tr>
    //           </table>`
    // }
    
    // function drawTable (data) {
    //   let suborgs = data.suborgs
    //   jQuery(loadTableData(suborgs));
    // }
    
    
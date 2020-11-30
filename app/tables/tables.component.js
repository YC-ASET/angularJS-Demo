'use strict';
angular.module('tables')
    .component('tables', {
        templateUrl: 'tables/tables.template.html',
        controller: ['$scope', 'HttpService', tableController]
    })

function tableController($scope, HttpService) {
    $scope.data;
    $scope.clickTest = function clickTest() {
        console.log(`click test`)
    }


    HttpService.getFacilities()
        .then(response => {
            $scope.data = response.data;
            return $scope.data;
        })
        .then(orgData => {
            $scope.totalFacilities = getTotalNumberFacilitiesOrg(orgData)
            return getTotalNumberFacilitiesSubOrg(orgData)
        })
        .then(processedData => drawTable(processedData))
        .catch(error => console.log(error))

    const getTotalNumberFacilitiesOrg = (data) => {
        let totalNumberFacilities = 0;
        data["suborgs"].forEach(e => {
            totalNumberFacilities += e["facilities"].length;
        });
        console.log(totalNumberFacilities)
        return totalNumberFacilities;
    }

    const getTotalNumberFacilitiesSubOrg = (data) => {

        data["suborgs"].forEach(e => {
            // totalNumberFacilities += e["facilities"].length;
            e.totalFacilities = e["facilities"].length;
            console.log(e.totalFacilities)
        });
        return data

    }

    function drawTable(data) {
        jQuery(loadTableData(data.suborgs));
    }

    function loadTableData(suborgs) {
        console.log(suborgs)
        var dataTable = $('#dataTable').DataTable({
            data: suborgs,
            "isExpanded": true,
            columns: [
                {
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": '',
                    "render": function () {
                        return '<i class="fa fa-plus-square" aria-hidden="true"></i>';
                    },
                    width: "15px"
                },
                { data: "suborgName" },
                { data: "totalFacilities" },
                { 
                    data: "suborgId", 
                    name: "location",
                    fnCreatedCell: function (cell, cellData, rowData, rowIndex, colIndex) {
                        $(cell).html(`<a href='#!/maps/suborgId/${rowData.suborgId}'>View All on Map</a>`);
                    }
                },
                
                // {title: "suborgId"},
                // {title: "Name"},
                // {title: "Number of Facilities"},
            ]
        });

        expandCollapseEachRow(dataTable);
        expandCollapseAllRows(dataTable);
        // $(document).ready(function () {
        //     console.log(`###on load`);
        //     expandCollapseAll();
        // });

        // Handle click on "Expand All" button
        $('#btn-show-all-children').on('click', function () {
            // Expand row details
            dataTable.rows(':not(.parent)').nodes().to$().find('td:first-child').trigger('click');
        });

        // Handle click on "Collapse All" button
        // $('#btn-hide-all-children').on('click', function () {
        //     // Collapse row details
        //     dataTable.rows('.parent').nodes().to$().find('td:first-child').trigger('click');
        // });
    };

    function expandCollapseEachRow(dataTable) {
        // click to expand/collapse each row
        $('#dataTable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
            var row = dataTable.row(tr);
            var tdi = tr.find("i.fa");

            if (row.child.isShown()) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
                tdi.first().removeClass('fa-minus-square');
                tdi.first().addClass('fa-plus-square');
            }
            else {
                // Open this row
                row.child(format(row.data())).show();
                tr.addClass('shown');
                tdi.first().removeClass('fa-plus-square');
                tdi.first().addClass('fa-minus-square');
            }
        });
    }

    function expandCollapseAllRows(dataTable) {
        // refer to this: https://www.gyrocode.com/articles/jquery-datatables-how-to-expand-collapse-all-child-rows/

        let allExpandButtons = $(".details-control");
        let expandCollapseButton = $("#expandCollapse");

        for (let i = 1; i < allExpandButtons.length; i++) {

            let tr = $(allExpandButtons[i]).closest('tr');
            let row = dataTable.row(tr);
            let tdi = tr.find("i.fa");

            //read custom attribute on row/table then if true, execute the same for all row
            if (row.child.isShown()) {

                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
                tdi.first().removeClass('fa-minus-square');
                tdi.first().addClass('fa-plus-square');
                expandCollapseButton.val("Expand All")
            } else {
                // Open this row
                expandCollapseButton.val("Collapse All")
                row.child(format(row.data())).show();
                tr.addClass('shown');
                tdi.first().removeClass('fa-plus-square');
                tdi.first().addClass('fa-minus-square');
            }
        }
    }

    function format(d) {

        let facilitiesData = d.facilities;
        let tableRows = '';
        facilitiesData.forEach(e => {
            tableRows += `<tr>
                            <td>${e.facilityName}</td>
                            <td>${e.coordinate.x}, ${e.coordinate.y}</td>
                            <td><a href='#!/maps/facility/${e.facilityName}/${e.coordinate.y}/${e.coordinate.x}'>View on Map</a></td>
                          </tr>`
        })

        return `<table>
                    <tr>
                        <th>Facility</th>
                        <th>Coordinate</th>
                        <th>Map</th>
                    </tr>
                    ${tableRows}
                </table>`
    }
}



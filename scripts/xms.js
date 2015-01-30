var app = angular.module("XK_XMS", []); 

var xms = {};

app.controller("IncidentForm", ['$http', '$scope', function($http, $scope) {
    
    $scope.clients = getClientList(); 
    
    $scope.reportIncident = function() {
        console.log($scope.incident);
        $http.post('/submit/incident', $scope.incident)
            .success(function(data, status) {
                console.log(data);
            })
            .error(function(data, status) {
                console.log(status + " :( " + data);    
            });
    };
    
    $scope.select = function(selected) {
        $scope.incident = $scope.incident || {};
        $scope.incident.client = selected.id;
    };
}]);

$(document).ready(function(){
    $('.ui.dropdown').dropdown();
});

function getClientList() {
    // TODO: This is the function to implement when we have a client-hosting system
    return xms.dev.clients;
}

/* FOR USE DURING DEVELOPMENT ONLY */

xms.dev = {};

xms.dev.clients = [
    {
        name: "LATAM",
        id: "latam"
    },
    {
        name: "Citrix",
        id: "citrix"
    },
    {
        name: "ClearPath",
        id: "clearpath"
    },
    {
        name: "Digicel",
        id: "digicel"
    }
];

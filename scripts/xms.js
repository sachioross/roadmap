var app = angular.module("XK_XMS", []);

var xms = {};

app.controller("IncidentForm", ['$http', '$scope', function($http, $scope) {

    $scope.clients = getClientList();

    $scope.reportIncident = function() {
        $http.post('/submit/incident', $scope.incident)
            .success(function(data, status) {
              $('.standard.support.modal').modal('show');
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

app.controller("SupportNumberController", ['$http', '$scope', function($http, $scope) {
  $scope.people = getSupportList();
}])

$(document).ready(function(){
    $('.ui.dropdown').dropdown();
});

function getClientList() {
    // TODO: This is the function to implement when we have a client-hosting system
    return xms.dev.clients;
}

function getSupportList() {
  // TODO: This is the function to implement when we have a client-hosting system
  return xms.dev.supportList;
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

xms.dev.supportList = [
  {
    name: "Chepe",
    phone: "1234-5678",
    skype: "chepe.xumak"
  },
  {
    name: "Federico",
    phone: "1234-5678",
    skype: "federico.xumak"
  },
  {
    name: "Dulio",
    phone: "1234-5678",
    skype: "dulio.xumak"
  }
]

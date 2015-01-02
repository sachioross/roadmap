var app = angular.module("XK_Roadmap", []); 

var trello = {
    boardsUrl: "https://trello.com/1/boards/",
    listsUrl: "https://trello.com/1/lists/",
    bedrockBoardId: "54401ff4d3f56f85f5daeadb",
    queryParamMark: "?",
    queryParamConcat: "&",
    key: "key=cb23c0648098dd2dcdd2964359d4b5ba",
    token: "token=3a7193245ac9022c730f3c828b1ba942bd4e28bae32b11b5a72d243d84097f47", 
    cardsAllParam: "cards=all",
    listAllParam: "lists=all",
    writeToken: "token=6491b479ab617f1a5b38307202cd6f5151e563570bca24dd284d3d9d2289a4bd",
    requestedListId: "54a360f7f59a9f0bedce16f9",
    keyValue: "cb23c0648098dd2dcdd2964359d4b5ba",
    tokenValue: "3a7193245ac9022c730f3c828b1ba942bd4e28bae32b11b5a72d243d84097f47",
    writeTokenValue: "6491b479ab617f1a5b38307202cd6f5151e563570bca24dd284d3d9d2289a4bd"
}

trello.keyAndToken = trello.key + trello.queryParamConcat + trello.token;
trello.keyAndWriteToken = trello.key + trello.queryParamConcat + trello.writeToken;

function concat() {
    var concatenated = "";
    for(i in arguments) {
        concatenated += arguments[i];
    }
    return concatenated;
}

function createPromiseSuccessForIndex($scope, promise, index) {
    promise.success(function(data, status){
        $scope.lists[index].cards = data;
    })
}

app.controller("RoadmapBoard", ['$http', '$scope', function($http, $scope) {
    var trelloBoardAddress = concat(trello.boardsUrl,
                      trello.bedrockBoardId,
                      trello.queryParamMark,
                      trello.keyAndToken,
                      trello.queryParamConcat,
                      trello.cardsAllParam,
                      trello.queryParamConcat, 
                      trello.listAllParam);
    
    $http.get(trelloBoardAddress)
        .success(function(data, status){
        
            $scope.lists = new Array();
        
            for(i in data.lists) {    
                if (data.lists[i].name !== "Requested") {
                    $scope.lists.push(data.lists[i]);
                }
            }
            
            for (var i in $scope.lists) {
                var promise = $http.get(concat(trello.listsUrl,
                       $scope.lists[i].id,
                       "/cards",
                       trello.queryParamMark,
                       trello.keyAndToken))        
                .error(function(data, status) {
                    console.log("error: " + status);
                });
                createPromiseSuccessForIndex($scope, promise, i);
                
            }
        })
        .error(function(data, status){
            console.log("error: " + status);
    });
    
}])
.controller("RegisterController", ['$scope', '$http', function($scope, $http) {
    
    $scope.register = function() {

        
        var trelloWriteListAddress = concat(trello.listsUrl,
                                        trello.requestedListId,
                                        "/cards", 
                                        trello.queryParamMark,
                                        trello.keyAndWriteToken, 
                                        trello.queryParamConcat, 
                                        "name=",
                                        $scope.feature.title,
                                        trello.queryParamConcat,
                                        "description=",
                                        $scope.feature.description,
                                        trello.queryParamConcat,
                                        "due=null");
        
        var trelloWriteData = {
            key: trello.keyValue,
            token: trello.writeTokenValue,
            name: $scope.feature.title,
            description: $scope.feature.description,
            due: "null"
        }
        
        var req = {
         method: 'POST',
         url: trelloWriteListAddress,
         headers: {
           'Content-Type': undefined
         },
         data: trelloWriteData
        }

        
        
        
        $http(req)
            .success(function(data, status) {
                console.log("Success");
                console.log(data);
                $scope.feature.status = "success";
        })
            .error(function(data, status) {
                console.log("error");
                console.log(status);
                $scope.feature.status = "failure";
        });
    };
}]);
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
    listAllParam: "lists=all"
}

trello.keyAndToken = trello.key + trello.queryParamConcat + trello.token;

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

app.controller("roadmapBoard", ['$http', '$scope', function($http, $scope) {
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
            
            $scope.lists = data.lists;
            
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
    
}]);
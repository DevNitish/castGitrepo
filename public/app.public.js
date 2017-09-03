var myApp= angular.module('myApp',['ui.router']);

myApp.controller('mainCtrl', ["$scope","$http","$state","$stateParams", function($scope,$http,$state,$stateParams){
    $scope.goHome=function(){
        $state.go("home")
    }

$scope.getRepo=function(language){   
   
    $http.get('https://api.github.com/search/repositories?q='+language).then(function success(response){
        
        $state.go("repo",{
            lang:language,
            data:response.data
        })
    })
}
$scope.goHome();
}]);

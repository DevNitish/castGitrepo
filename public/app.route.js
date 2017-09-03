myApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    
    //$urlRouterProvider.otherwise('home');
    
        $stateProvider
    
            // HOME STATES AND NESTED VIEWS ========================================
            .state('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                controller: 'mainCtrl'
            })
            .state('repo', {
                url: '/repos/:lang',
                params:{
                    lang:null,
                    data:null
                },
                templateUrl: 'views/repo.html',
                controller: ["$scope","$http","$state","$stateParams", function($scope,$http,$state,$stateParams){
                    $scope.repoDetails=$stateParams.data.items.slice(0,0+9)
                    $scope.count=$stateParams.data.items.length/9;
                    
                    $scope.showUser=function(user){
                        $state.go('user',{
                            user:user
                        })
                    }
            
                }]
            })
            .state('user',{
                url:'user/:user',
                templateUrl:'views/user.html',
                controller: ["$scope","$http","$state","$stateParams", function($scope,$http,$state,$stateParams){
                    $scope.userDetails=null;
                    $http.get("https://api.github.com/search/users?q="+$stateParams.user).then(function success(response){
                        $scope.userDetails=response.data; 
                        console.log("the user details",$scope.userDetails)                       
                    })
                
            
                }]
            })
    }]);


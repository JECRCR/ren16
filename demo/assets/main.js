var renApp = angular.module('renApp', ['ui.router']);

renApp.controller('mainController',['$scope','$location',function($scope,$location){
    $scope.message = 'Renaissance 16';
    $scope.go = function ( path ) {
        $location.path( path );
    };
}]);

renApp.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
//    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'partial-home.html',
            controller: function($scope, $state){
                $scope.close = function () {
                    showEventCategories();
                    setTimeout(function(){
                        $state.go('events');
                    },300);
                };
            }
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('events', {
            url: '/events',
            templateUrl: 'partial-category.html',
            data: { present : 0 },
            controller: function($scope, $state,$rootScope){
                console.log($rootScope.currentCategory);
                $scope.openCategory = function(catNo, catName){
                    $rootScope.currentCategory = catNo;
                    $state.go('events.'+catName);
                }
                $scope.getBarClass = function(catNo){
                    if($rootScope.currentCategory == 0) return '';
                    else if($rootScope.currentCategory == catNo) return 'bar-full';
                    else return 'zero-width';
                }
                $scope.menuClicked = function(){
                    ($rootScope.currentCategory==0) ? $state.go('home') : $state.go('events');
                }
            }
        })

        .state('events.splash',{
            parent: 'events',
            url: '/splash',
            templateUrl: 'partial-category-page.html'
        })
        .state('events.endeavour',{
            parent: 'events',
            url: '/endeavour',
            templateUrl: 'partial-category-page.html'
        })
        .state('events.quanta',{
            parent: 'events',
            url: '/quanta',
            templateUrl: 'partial-category-page.html'
        })
        ;
/*
        .state('eventId',{
            url: '/events/:id',
            templateUrl : 'partial-event.html',
            controller: function($scope, $stateParams, $state) {
                $scope.closeDetails = function () {
                    hideEventDetails();
                    setTimeout(function(){
                        $state.go('events');
                    },800);
                };
                //$scope.showEventDetails = true;
                //alert();
                $scope.id = $stateParams.id;
                showEventDetails();
            },
            onEnter: function(){
                //alert('Entered');
            }
        });
*/
});

renApp.run(['$rootScope', function ($rootScope, $location) {
    console.log("renApp.run");
    $rootScope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {

            var sname = toState.name;
            console.log(sname);
            if(sname=='events'){ $rootScope.currentCategory = 0; }
            else if(sname == 'events.splash') $rootScope.currentCategory = 1;
            else if(sname == 'events.endeavour') $rootScope.currentCategory = 2;
            else if(sname == 'events.quanta') $rootScope.currentCategory = 3;
        }
    );
}]);

renApp.factory('EventsFactory', function() {
    var data = {

    };
    return data;
})
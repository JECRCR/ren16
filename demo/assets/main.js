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
                $scope.openCategory = function(catNo, catName){
                    if($rootScope.currentCategory == 0){
                        $rootScope.currentCategory = catNo;
                        $state.go('events.'+catName);
                    }
                }
                $scope.getBarClass = function(catNo){
                    if($rootScope.currentCategory == 0) return '';
                    else if($rootScope.currentCategory == catNo) return 'bar-full';
                    else return 'zero-width';
                }
                $scope.menuClicked = function(){
                    ($rootScope.currentCategory==0) ? $state.go('home') : ($state.go('events'));
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

        .state('events.splash.eventId',{
            url: '/:id',
            templateUrl : 'partial-event.html',
            controller: function($scope, $stateParams, $state) {
                $scope.closeDetails = function () {
                    hideEventDetails();
                    setTimeout(function(){
                        $state.go('events.splash');
                    },800);
                };
                $scope.id = $stateParams.id;
                showEventDetails();
            }
        })
        ;

});

renApp.run(['$rootScope', function ($rootScope, $location) {
    $rootScope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {

            var sname = toState.name;
            if(sname=='events'){ $rootScope.currentCategory = 0; }
            else if(sname.indexOf('events.splash') > -1 ) $rootScope.currentCategory = 1;
            else if(sname.indexOf('events.endeavour') > -1 ) $rootScope.currentCategory = 2;
            else if(sname.indexOf('events.quanta') > -1 ) $rootScope.currentCategory = 3;
        }
    );
}]);

renApp.factory('EventsFactory', function() {
    var data = {

    };
    return data;
})





var cssRule =
    "color: #fff;" +
    "font-size: 35px;" +
    "font-weight: bold;" +
    "text-shadow: 1px 1px 5px rgb(249, 162, 34);background: red;" +
    "filter: dropshadow(color=rgb(249, 162, 34), offx=1, offy=1);";
console.log("%cDON'T MESS WITH THIS WEBSITE, INSTEAD DEVELOP ONE (IF YOU HAVE THE GUTS)", cssRule);
console.log("%cDeveloped By :","color: red;font-size: 20px;" );
console.log("%cLokesh Devnani & Udit Vasu","color: blue; font-size: 20px; font-weight: bold;");
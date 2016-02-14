var renApp = angular.module('renApp', ['ui.router','ngAnimate']);

renApp.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'assets/partials/partial-home.html',
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
            templateUrl: 'assets/partials/partial-category.html',
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
                $scope.$on('$viewContentLoaded', function(){
                    if (sessionStorage.token) {
                        $('.login-btn').hide();
                        $('#logged-in').show();
                    }
                });
            }
        })

        .state('events.splash',{
            parent: 'events',
            url: '/splash',
            templateUrl: 'assets/partials/partial-category-page.html',
            controller: function(renService, $scope,$state){
                $scope.category = 'splash';
                $scope.types = ['indoor','outdoor'];
                renService.async().then(function(d) {
                    $scope.events = d['splash'];
                });
                $scope.openDetails = function(eventTitle){
                    $state.go('events.'+ $scope.category +'.eventId',{id: eventTitle});
                }
            }
        })
        .state('events.endeavour',{
            parent: 'events',
            url: '/endeavour',
            templateUrl: 'assets/partials/partial-category-page.html',
            controller: function(renService, $scope,$state){
                $scope.types = ['default'];
                $scope.category = 'endeavour';
                renService.async().then(function(d) {
                    $scope.events = d['endeavour'];
                });
                $scope.openDetails = function(eventTitle){
                    console.log(eventTitle);
                    $state.go('events.'+ $scope.category +'.eventId',{id: eventTitle});
                }
            }
        })
        .state('events.quanta',{
            parent: 'events',
            url: '/quanta',
            templateUrl: 'assets/partials/partial-category-page.html',
            controller: function(renService, $scope,$state){
                $scope.types = ['general','computer','robo'];
                $scope.category = 'quanta';
                renService.async().then(function(d) {
                    $scope.events = d['quanta'];
                });
                $scope.openDetails = function(eventTitle){
                    $state.go('events.'+ $scope.category +'.eventId',{id: eventTitle});
                }
            }
        })
        .state('events.newevent',{
            parent: 'events',
            url: '/newevent',
            templateUrl: 'assets/partials/partial-newevent.html'
        })
        .state('events.zarurat',{
            parent: 'events',
            url: '/zarurat',
            templateUrl: 'assets/partials/partial-zarurat.html'
        })
        .state('events.alumni',{
            parent: 'events',
            url: '/alumni',
            templateUrl: 'assets/partials/partial-alumni.html'
        })

        .state('events.splash.eventId',{
            url: '/:id',
            templateUrl : 'assets/partials/partial-event.html',
            controller: function($scope, $stateParams, $state, renService) {
                renService.async().then(function(d) {
                    $scope.details = d['splash'][$scope.id];
                });
                $scope.closeDetails = function () {
                    hideEventDetails();
                    setTimeout(function(){
                        $state.go('events.splash');
                    },100);
                };
                $scope.id = $stateParams.id;
                if (sessionStorage.token) {
                    $scope.loggedIn = 1;
                }
            }
        })
        .state('events.endeavour.eventId',{
            url: '/:id',
            templateUrl : 'assets/partials/partial-event.html',
            controller: function($scope, $stateParams, $state, renService) {
                renService.async().then(function(d) {
                    $scope.details = d['endeavour'][$scope.id];
                });
                $scope.closeDetails = function () {
                    hideEventDetails();
                    setTimeout(function(){
                        $state.go('events.endeavour');
                    },100);
                };
                $scope.id = $stateParams.id;
            }
        })
        .state('events.quanta.eventId',{
            url: '/:id',
            templateUrl : 'assets/partials/partial-event.html',
            controller: function($scope, $stateParams, $state, renService) {
                renService.async().then(function(d) {
                    $scope.details = d['quanta'][$scope.id];
                });
                $scope.closeDetails = function () {
                    hideEventDetails();
                    setTimeout(function(){
                        $state.go('events.quanta');
                    },100);
                };
                $scope.id = $stateParams.id;
            }
        })
        ;

});

renApp.factory('renService', function($http) {
    var urlBase = '../api/';
    var url = urlBase+"events"
    var promise;
    var myService = {
        async: function() {
            if ( !promise ) {
                // $http returns a promise, which has a then function, which also returns a promise
                promise = $http.get(url).then(function (response) {
                    var result={};
                    var categoryMap = {'1': 'splash', '3': 'endeavour', '2': 'quanta' };
                    angular.forEach(response.data,function(value,key){
                        var current = {};
                        angular.forEach(value.events,function(v,k){
                            current[v.title] = v;
                        });
                        result[categoryMap[key]] = current;
                    });

                    // The return value gets picked up by the then in the controller.
                    //return response.data;
                    return result;
                });
            }
            // Return the promise to the controller
            return promise;
        }
    };
    return myService;
});

renApp.filter('type', function () {
    return function (items, type) {
        var filtered = {};
        angular.forEach(items,function(v,k){
            if(v.type==type)
            filtered[k] = v;
        })
        //for (var i = 0; i < items.length; i++) {
        //    var item = items[i];
        //    if (/a/i.test(item.name.substring(0, 1))) {
        //        filtered.push(item);
        //    }
        //}
        return filtered;
    };
}).filter('renderHTMLCorrectly', function($sce)
{
    return function(stringToParse)
    {
        return $sce.trustAsHtml(stringToParse);
    }
});

renApp.factory('renFactory', function($http) {
    var urlBase = 'http://localhost/jecrcr/api/';
    //var urlBase = 'http://jecrcrenaissance.in/api/';
    //http://localhost/jecrcr/api/events/categories/1
    return {
        async: function() {
            return $http.get(urlBase+'/events/categories/1');  //1. this returns promise
        }
    };
});


renApp.controller('mainController',['$scope','renService','$location',function($scope,renService,$location){
    $scope.go = function ( path ) {
        $location.path( path );
    };
}]);


renApp.run(['$rootScope','$location','$window', function ($rootScope, $location, $window) {
    $rootScope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {

            var sname = toState.name;
            if(sname=='events'){ $rootScope.currentCategory = 0; }
            else if(sname.indexOf('events.splash') > -1 ) $rootScope.currentCategory = 1;
            else if(sname.indexOf('events.endeavour') > -1 ) $rootScope.currentCategory = 2;
            else if(sname.indexOf('events.quanta') > -1 ) $rootScope.currentCategory = 3;
            else if(sname.indexOf('events.newevent') > -1 ) $rootScope.currentCategory = 4;
            else if(sname.indexOf('events.zarurat') > -1 ) $rootScope.currentCategory = 5;
            else if(sname.indexOf('events.alumni') > -1 ) $rootScope.currentCategory = 6;

        }
    );
    $rootScope
        .$on('$stateChangeSuccess',
        function(event){

            if (!$window.ga)
                return;

            $window.ga('send', 'pageview', { page: $location.path() });
        });
}]);

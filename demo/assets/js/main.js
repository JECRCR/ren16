var renApp = angular.module('renApp', ['ui.router','ngAnimate']);

function prefetchImages(sources,path){
    if(path==undefined)
        path = '';
    var images = [];
    var loadedImages = 0;
    var numImages = sources.length;
    for (var i=0; i < numImages; i++) {
        images[i] = new Image();
        images[i].onload = function(){
            if (++loadedImages >= numImages) { }
        };
        images[i].src = path+sources[i];
    }
};
renApp.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/welcome');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/welcome',
            templateUrl: 'assets/partials/partial-home.html',
            controller: function(renService,$scope){

                prefetchImages(['assets/img/logo/categories/splash.png','assets/img/logo/categories/quanta.png',
                    'assets/img/logo/categories/alumni.png','assets/img/logo/categories/tas.png',
                    'assets/img/logo/categories/endeavour.png','assets/img/logo/categories/zarurat.png']);
                renService.async().then(function(d) {
                    prefetchImages(d['imgArray'],'assets/img/logo/events/');
                });


                $scope.$on("$viewContentLoaded",function(){

                });
            }
        })

        .state('explore', {
            url: '/home',
            templateUrl: 'assets/partials/partial-explore.html',
            controller: function($scope, $state){

            }
        })
        // Routes from explore

        .state('about', {
            url: '/about',
            templateUrl: 'assets/partials/partial-about.html',
            controller: function($scope, $state){

            }
        })
        .state('support', {
            url: '/support',
            templateUrl: 'assets/partials/partial-support.html',
            controller: function($scope, $state){

            }
        })
        .state('team', {
            url: '/team',
            templateUrl: 'assets/partials/partial-team.html',
            controller: function($scope, $state){

            }
        })
        .state('gallery', {
            url: '/gallery',
            templateUrl: 'assets/partials/partial-gallery.html',
            controller: function($scope, $state){
                $scope.$on('$viewContentLoaded', function() {
                    var images = [];
                    for(i=1;i<=28;i++)
                        images.push(i+".jpg");

                    $scope.images = images;
                });
            }
        })
        .state('sponsors', {
            url: '/sponsors',
            templateUrl: 'assets/partials/partial-sponsors.html',
            controller: function($scope, $state){

            }
        })

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
                    //$scope.navOpen();
                    ($rootScope.currentCategory==0) ? $state.go('explore') : ($state.go('events'));
                }
                var loaded= function(){
                    if (sessionStorage.token) {
                        $scope.isLoggedIn = true;
                    }
                };
                $scope.$on('$viewContentLoaded', loaded);
            }
        })
        /* Event Routes */
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
                    $state.go('events.'+ $scope.category +'.eventId',{id: eventTitle});
                }
            }
        })
        .state('events.quanta',{
            parent: 'events',
            url: '/quanta',
            templateUrl: 'assets/partials/partial-category-page.html',
            controller: function(renService, $scope,$state){

                $scope.types = ['CONSTRUCTO','CARRIAGE RETURN','ROBO FIESTA', 'VOCATIONAL'];
                $scope.category = 'quanta';
                renService.async().then(function(d) {
                    $scope.events = d['quanta'];
                });
                $scope.openDetails = function(eventTitle){
                    $state.go('events.'+ $scope.category +'.eventId',{id: eventTitle});
                }
            }
        })
        .state('events.walk-through-paradise',{
            parent: 'events',
            url: '/walk-through-paradise',
            templateUrl: 'assets/partials/partial-walk-through-paradise.html'
        })
        .state('events.zarurat',{
            parent: 'events',
            url: '/zarurat',
            templateUrl: 'assets/partials/partial-zarurat.html'
        })
        .state('events.alumni',{
            parent: 'events',
            url: '/alumni',
            templateUrl: 'assets/partials/partial-alumni.html',
            controller: function(renService, $scope,$state){
                $scope.category = 'alumni';
                renService.async().then(function(d) {
                    $scope.events = d['alumni'];
                });
                $scope.openDetails = function(eventTitle){
                    $state.go('events.'+ $scope.category +'.eventId',{id: eventTitle});
                }
            }
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
                    console.log($scope.details);
                });
                $scope.closeDetails = function () {
                    hideEventDetails();
                    setTimeout(function(){
                        $state.go('events.endeavour');
                    },100);
                };
                $scope.id = $stateParams.id;
                if (sessionStorage.token) {
                    $scope.loggedIn = 1;
                }
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
                if (sessionStorage.token) {
                    $scope.loggedIn = 1;
                }
            }
        })
        .state('events.alumni.eventId',{
            url: '/:id',
            templateUrl : 'assets/partials/partial-event.html',
            controller: function($scope, $stateParams, $state, renService) {
                renService.async().then(function(d) {
                    $scope.details = d['alumni'][$scope.id];
                });
                $scope.closeDetails = function () {
                    hideEventDetails();
                    setTimeout(function(){
                        $state.go('events.alumni');
                    },100);
                };
                $scope.id = $stateParams.id;
                if (sessionStorage.token) {
                    $scope.loggedIn = 1;
                }
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
                    var imgArray = [];
                    var result={};
                    var categoryMap = {'1': 'splash', '2': 'quanta' , '3': 'endeavour', '4': 'alumni' };
                    angular.forEach(response.data,function(value,key){
                        var current = {};
                        angular.forEach(value.events,function(v,k){
                            current[v.title] = v;
                            imgArray.push(v.thumbnail);
                        });
                        result[categoryMap[key]] = current;
                    });
                    result['imgArray'] = imgArray;
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
        return filtered;
    };
}).filter('renderHTMLCorrectly', function($sce)
{
    return function(stringToParse)
    {
        return $sce.trustAsHtml(stringToParse);
    }
});

renApp.controller('mainController',['$scope','renService','$location','$rootScope',function($scope,renService,$location,$rootScope){
    $scope.ngclass = 'slide-top';
    $scope.go = function ( path ) {
        $location.path( path );
    };
    $scope.$on('$stateChangeSuccess', function (event, toState,toParams,fromState) {
        if (fromState.name == 'explore') {
            $scope.ngclass = 'slide-left';
        } else if(fromState.name != 'home' && toState.name == 'explore') {
            $scope.ngclass = 'slide-right';
        } else {
            $scope.ngclass = 'slide-top';
        }
    });
}]);

renApp.directive('myPostRepeatDirective', function() {
    return function(scope, element, attrs) {
        if (scope.$last){
            $('.gallery a').simpleLightbox();
        }
    };
});


renApp.run(['$rootScope','$location','$window', function ($rootScope, $location, $window) {
    $rootScope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {

            var sname = toState.name;
            if(sname=='events'){ $rootScope.currentCategory = 0; }
            else if(sname.indexOf('events.splash') > -1 ) $rootScope.currentCategory = 1;
            else if(sname.indexOf('events.endeavour') > -1 ) $rootScope.currentCategory = 2;
            else if(sname.indexOf('events.quanta') > -1 ) $rootScope.currentCategory = 3;
            else if(sname.indexOf('events.walk-through-paradise') > -1 ) $rootScope.currentCategory = 4;
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

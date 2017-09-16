'use strict';

angular.module('prenetics', ['ngRoute', 'ngCookies'])
    .config(config)
    .run(run);

//config routes
config.$inject = ['$routeProvider'];
function config($routeProvider) {
    $routeProvider
        .when('/home', {
            controller: 'HomeController',
            templateUrl: 'view/home.view.html',
            // controllerAs: 'vm'
        })

        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'view/login.view.html',
            // controllerAs: 'vm'
        })

        .otherwise({ redirectTo: '/login' });
}

//set listener and other setting;
run.$inject = ['$rootScope', '$location', '$http'];
function run($rootScope, $location, $http){

    var token = sessionStorage.getItem("AuthToken");
    if(token) {
        // add jwt token to auth header for all requests made by the $http service
        $http.defaults.headers.common.Authorization = 'Bearer ' + token;
    }
    $rootScope.$on('$locationChangeStart', function(event, toState, toParams, fromState, fromParams) {
        var token = sessionStorage.getItem("AuthToken");
        if(!token){
            $location.path('/login');
        }
    });
}

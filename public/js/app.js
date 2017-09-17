/**
 * angular app entry point file, config angular app.
 * @author JoeHu
 * @date 2017-Sep-16
 */

'use strict';

var app = angular.module('prenetics', ['ngRoute', 'ui.bootstrap']);

// interceptor config
app.config(['$httpProvider', function($httpProvider){
        $httpProvider.interceptors.push("AuthInterceptorService");
    }]);

//set listener and others
app.run(['$rootScope', '$location', '$http', function($rootScope, $location, $http){
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
}]);


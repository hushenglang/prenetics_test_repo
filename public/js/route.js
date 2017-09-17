/**
 * Defining angular routes
 * @author JoeHu
 * @date 2017-Sep-16
 */

'use strict';

angular.module('prenetics')
    .config(routeConfig)

//config routes
routeConfig.$inject = ['$routeProvider'];
function routeConfig($routeProvider) {
    $routeProvider
        .when('/home', {
            controller: 'HomeController',
            templateUrl: 'view/home.view.html',
        })

        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'view/login.view.html',
        })

        .otherwise({ redirectTo: '/login' });
}
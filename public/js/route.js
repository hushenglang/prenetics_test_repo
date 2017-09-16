angular.module('prenetics')
    .config(routeConfig)

//config routes
routeConfig.$inject = ['$routeProvider'];
function routeConfig($routeProvider) {
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
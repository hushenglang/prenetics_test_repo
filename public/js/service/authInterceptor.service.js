/**
 * Providing http reponse interception service. Intercept 403.
 * @author JoeHu
 * @date 2017-Sep-16
 */

'use strict';

angular
    .module('prenetics')
    .factory('AuthInterceptorService', AuthInterceptorService);

AuthInterceptorService.$inject = ['$q','$location'];
function AuthInterceptorService($q, $location){
    var responseError = function (rejection) {
        if (rejection.status === 403) {
            $location.path('/login');
        }
        return $q.reject(rejection);
    };

    return {
        responseError: responseError
    };
};

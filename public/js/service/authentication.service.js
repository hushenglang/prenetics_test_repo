/**
 * Providing login, logout related service.
 * @author JoeHu
 * @date 2017-Sep-16
 */

'use strict';

angular
    .module('prenetics')
    .factory('AuthenticationService', AuthenticationService);

AuthenticationService.$inject = ['$http', 'HttpRequestService'];
function AuthenticationService($http, HttpRequestService) {
    //login
    var login = function(email, password) {
        return HttpRequestService.post("/auth/login", {email:email, password:password})
            .then(function(response){
                if(response.success==true) {
                    var token = response.data;
                    sessionStorage.setItem("AuthToken", token);
                    // add jwt token to auth header for all requests made by the $http service
                    $http.defaults.headers.common.Authorization = 'Bearer ' + token;
                }
                return response;
            });
    };

    //clear token from session storage;
    var clearAuthToken = function(){
        sessionStorage.removeItem("AuthToken");
        $http.defaults.headers.common.Authorization = '';
    };

    var isAuth = function(){
        return sessionStorage.getItem("AuthToken")!=null;
    }

    //logout
    var logout = function() {
        clearAuthToken();
    };

    //return service obj;
    return {
        "login": login,
        "clearAuthToken": clearAuthToken,
        "isAuth": isAuth,
        "logout": logout
    };
}

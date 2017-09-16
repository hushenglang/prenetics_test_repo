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
    };

    //logout
    var logout = function() {
        console.log("logout");
        clearAuthToken();
        $http.defaults.headers.common.Authorization = ''
    };

    return {
        "login": login,
        "clearAuthToken": clearAuthToken,
        "logout": logout
    };
}

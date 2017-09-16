'use strict';

angular
    .module('prenetics')
    .factory('UserService', UserService);

UserService.$inject = ['HttpRequestService'];
function UserService(HttpRequestService) {

    var getUserProfile = function(){
        return HttpRequestService.get('/api/account/profile')
            .then(function(response){
                return response.data;
            });
    };

    return {
        "getUserProfile": getUserProfile
    };
}


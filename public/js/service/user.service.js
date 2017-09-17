/**
 * Providing retriving user profile, genetic result service.
 * @author JoeHu
 * @date 2017-Sep-16
 */

'use strict';

angular
    .module('prenetics')
    .factory('UserService', UserService);

UserService.$inject = ['HttpRequestService'];
function UserService(HttpRequestService) {

    // get user profile, since the token already contains the user identification info, no need to pass param.
    var getUserProfile = function(){
        return HttpRequestService.get('/api/account/profile')
            .then(function(response){
                return response.data;
            })
            .catch(function(err){
                console.log(err);
            });
    };

    // get user genetic result, since the token already contains the user identification info, no need to pass param.
    var getUserGeneticResult = function(){
        return HttpRequestService.get('/api/account/genetic_results')
            .then(function(response){
                return response.data;
            })
            .catch(function(err){
                console.log(err);
            });
    }

    return {
        "getUserProfile": getUserProfile,
        "getUserGeneticResult": getUserGeneticResult
    };
}


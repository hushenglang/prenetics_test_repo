'use strict';


/**
 * This service provides a way to communicate with the server for retrieving and storing data
 * @param {angular.$http} $http
 * @param {angular.$q} $q
 * @param {angular.$rootScope} $rootScope
 * @constructor
 */
function HttpRequestService($http, $q, $rootScope) {
    // var servicePrefix = $rootScope.servicePrefix;

    return {
        makePromise: function (context) {
            var deferred = $q.defer();
            context(deferred.resolve, deferred.reject, deferred.notify);
            return deferred.promise;
        },
        get: function (url, params) {
            return this.makePromise(function (resolve, reject) {
                $http.get(url, params)
                    .then(function (response) {
                        if (response.status === 200) {
                            resolve(response.data);
                        } else {
                            reject(new Error('Invalid Data'));
                        }
                    }, function (error) {
                        reject(error);
                    })
            });
        },
        post: function (url, params) {
            return this.makePromise(function (resolve, reject) {
                $http.post(url, params)
                    .then(function (response) {
                        if (response.status === 200) {
                            resolve(response.data);
                        } else {
                            reject(new Error('Invalid Data'));
                        }
                    }, function (error) {
                        reject(error);
                    })

            });
        }
    }
}


angular
    .module('prenetics')
    .factory('HttpRequestService', ['$http', '$q', '$rootScope', HttpRequestService]);


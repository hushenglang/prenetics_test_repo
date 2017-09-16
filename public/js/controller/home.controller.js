'use strict';

angular
    .module('prenetics')
    .controller('HomeController', HomeController);

HomeController.$inject = ['$scope', 'UserService'];
function HomeController($scope, UserService) {

    getUserProfile();

    function getUserProfile() {
        UserService.getUserProfile()
            .then(function (user) {
                $scope.profile = user;
            });
    }

}

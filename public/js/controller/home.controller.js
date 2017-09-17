/**
 * home controller
 * view: view/home.view.html
 * @author JoeHu
 * @date 2017-Sep-16
 */

'use strict';

angular
    .module('prenetics')
    .controller('HomeController', HomeController);

HomeController.$inject = ['$scope', '$location', 'UserService', 'AuthenticationService'];
function HomeController($scope, $location, UserService, AuthenticationService) {

    //get user profile.
    getUserProfile();

    //define handlers
    $scope.logout = logout;

    function getUserProfile() {
        UserService.getUserProfile()
            .then(function (user) {
                $scope.profile = user;
            });
    }

    function logout(){
        AuthenticationService.logout();
        $location.path('/login');
    }

}

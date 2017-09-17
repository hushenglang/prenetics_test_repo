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

HomeController.$inject = ['$scope', '$location', '$uibModal', 'UserService', 'AuthenticationService'];
function HomeController($scope, $location, $uibModal, UserService, AuthenticationService) {

    $scope.animationsEnabled = false;

    //get user profile.
    getUserProfile();

    //define handlers
    $scope.logout = logout;
    $scope.displayGeneticResult = displayGeneticResult;

    function getUserProfile() {
        UserService.getUserProfile()
            .then(function (user) {
                $scope.profile = user;
            });
    }

    function displayGeneticResult(){

        $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            templateUrl: 'view/genetic.result.modal.view.html',
            size: 'sm',
            controller: function($scope, $uibModalInstance) {
                $scope.name = 'top';

                $scope.cancel = function () {
                    $uibModalInstance.close(false);
                };
            }
        });

    }

    function logout(){
        AuthenticationService.logout();
        $location.path('/login');
    }

}

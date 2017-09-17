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
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            templateUrl: 'view/genetic.result.modal.view.html',
            size: 'md',
            controller: function($scope, $uibModalInstance) {

                UserService.getUserGeneticResult()
                    .then(function(results){
                        $scope.geneticResult = angular.fromJson(results[0].genetic_result);
                        $scope.create_date = results[0].create_date;
                    });

                $scope.cancel = function () {
                    $uibModalInstance.close(false);
                };
            }
        });
        //below code is to avoid unhandle injection, not functional.
        modalInstance.result.then(function(){}, function(res){});
    }

    function logout(){
        AuthenticationService.logout();
        $location.path('/login');
    }

}

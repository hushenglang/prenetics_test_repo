'use strict';

angular
    .module('prenetics')
    .controller('LoginController', LoginController);

LoginController.$inject = ['$scope', '$location', 'AuthenticationService', 'FlashService'];
function LoginController($scope, $location, AuthenticationService, FlashService) {

    $scope.login = loginHandler;

    //login handler
    function loginHandler() {
        $scope.dataLoading = true;
        //1.clear token if existed;
        AuthenticationService.clearAuthToken();

        //2.send login request;
        AuthenticationService.login($scope.email, $scope.password)
            .then(function(response){
                if (response.success) {
                    // go to home page;
                    $location.path('/home');
                } else {
                    FlashService.Error(response.message);
                }
                $scope.dataLoading = false;
            });

    }
}

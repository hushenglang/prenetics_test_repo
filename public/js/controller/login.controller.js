'use strict';

angular
    .module('prenetics')
    .controller('LoginController', LoginController);

LoginController.$inject = ['$scope', '$location', 'AuthenticationService', 'FlashService'];
function LoginController($scope, $location, AuthenticationService, FlashService) {

    // check if the use is authed or not, it yes go to home page directly. unless you click logout, you can not direct to login page.
    if(AuthenticationService.isAuth()){
        $location.path('/home');
    }

    // define handlers
    $scope.login = loginHandler;

    //login handler
    function loginHandler() {
        $scope.dataLoading = true;

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

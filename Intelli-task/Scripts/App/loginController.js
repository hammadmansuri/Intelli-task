app.controller('loginController', ['$scope', '$rootScope', '$state', '$mdToast', 'APIServices', 'loginService',
    function ($scope, $rootScope, $state, $mdToast, APIServices, loginService) {
    $scope.login = function (loginForm) {
        // Proceed if login form is valid
        if (loginForm.$valid) {
            
            loginService.Login($scope.user.email, $scope.user.password).then(function (response) {
                
                $mdToast.show(
                    $mdToast.simple()
                    .textContent('Login successfully!')
                    .position('bottom left')
                    );

                $state.go('home')
            }, function (error) {
                // If some error come
                $mdToast.show(
                    $mdToast.simple()
                    .textContent(error.data.error_description)
                    .position('bottom left')
                    );
            });
        }
    }
}]);
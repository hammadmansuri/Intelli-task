
app.controller('registerController', ['$scope', '$rootScope', '$mdToast', '$state', 'APIServices', 'loginService',
    function ($scope, $rootScope, $mdToast, $state, APIServices, loginService) {

    // Get Roles of application
    APIServices.GetAllRoles().$promise.then(function (response) {
        $scope.roles = response;
    }, function (error) {
        console.log('some error occured');
    });

    // Register function
    $scope.register = function (registerForm) {
        // Proceed if only form is valid
        if (registerForm.$valid) {

            var userInfo = {
                Email: $scope.user.email,
                Password: $scope.user.password,
                ConfirmPassword: $scope.user.confirmPassword,
                Role: $scope.user.role.Name
            }

            APIServices.Register(userInfo).$promise.then(function (response) {
                // Once successfully register, logged in user
                loginService.Login($scope.user.email, $scope.user.password).then(function (response) {
                    // After successful login
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('Registered and login successfully!')
                        .position('bottom left')
                        );
                    // Redirect to Home
                    $state.go('home')
                }, function (error) {
                    // If some error come while login
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent(error.data.error_description)
                        .position('bottom left')
                        );
                });

            }, function (error) {
                // If some error come while registration
                $mdToast.show(
                    $mdToast.simple()
                    .textContent(error.data.ModelState[""][0])
                    .position('bottom left')
                    );
            });
        }
    }
}]);
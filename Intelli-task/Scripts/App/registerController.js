
app.controller('registerController', ['$scope', '$rootScope', '$mdToast', 'APIServices', function ($scope, $rootScope, $mdToast, APIServices) {
    $rootScope.isLoading = false;
    $scope.register = function (registerForm) {
        $rootScope.isLoading = true;
        //if (!loginForm.$error) {
        var userInfo = {
            Email: $scope.user.email,
            Password: $scope.user.password,
            ConfirmPassword: $scope.user.confirmPassword
        }

        APIServices.Register(userInfo).$promise.then(function (response) {
            $rootScope.isLoading = false;
            console.log('success');
            $state.go('login')

        }, function (error) {
            $rootScope.isLoading = false;
            $mdToast.show(
                $mdToast.simple()
                .textContent('Some error occured! Please try again')
                .position('bottom left')
                );

            console.log('Error: ' + error);
        });
        //}
    }
}]);
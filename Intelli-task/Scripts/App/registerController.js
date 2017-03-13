
app.controller('registerController', ['$scope', '$rootScope', '$mdToast', '$state', 'APIServices', function ($scope, $rootScope, $mdToast, $state, APIServices) {
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
            var userInfo = {
                grant_type: 'password',
                username: $scope.user.email,
                password: $scope.user.password
            }
            APIServices.Login($.param(userInfo)).$promise.then(function (response) {
                $scope.isLoading = false;
                sessionStorage.setItem('userName', response.userName);
                sessionStorage.setItem('accessToken', response.access_token);
                sessionStorage.setItem('refreshToken', response.refresh_token);

                $mdToast.show(
                    $mdToast.simple()
                    .textContent('Registered successfully!')
                    .position('bottom left')
                    );

                $state.go('home')
            }, function (error) {
                $scope.isLoading = false;
                $mdToast.show(
                    $mdToast.simple()
                    .textContent('Some error occured! Please try again')
                    .position('bottom left')
                    );
                console.log('Error: ' + error);
            });


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
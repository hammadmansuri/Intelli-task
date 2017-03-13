
app.controller('loginController', ['$scope', '$rootScope',  '$state', '$mdToast', 'APIServices', function ($scope, $rootScope, $state, $mdToast, APIServices) {
    $scope.isLoading = false;
    $scope.login = function (loginForm) {
        $scope.isLoading = true;
        //if (!loginForm.$error) {
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
                    .textContent('Login successfully!')
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
        //}
    }
}]);
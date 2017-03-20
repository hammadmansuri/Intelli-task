app.controller('homeController', ['$scope', '$state', '$mdSidenav', '$mdToast', 'APIServices', function ($scope, $state, $mdSidenav, $mdToast, APIServices) {

    // Logout functionality
    $scope.logout = function () {
        APIServices.Logout().$promise.then(function (resp) {
            sessionStorage.removeItem('accessToken');
            $state.go('login');
        });
    }

    // Default configuration
    $scope.pagerPoints = [2, 10, 15, 20, 25];
    $scope.pagerValue = 10;
    $scope.gridView = false;
    // Account tab
    $scope.showAccount = function () {
        $scope.isVideosView = false;
        $scope.isAccountView = true;

        // Set basic details
        $scope.accessToken = sessionStorage.getItem('accessToken');
        $scope.refreshToken = sessionStorage.getItem('refreshToken');
        $scope.userName = sessionStorage.getItem('userName');

        // Get Interviewers details
        APIServices.GetInterviewers().$promise.then(function (response) {
            $scope.isAuthorise = true;
            $scope.interviewers = response;
        }, function (errorResponse) {
            if (errorResponse.status == 401) {
                $scope.isAuthorise = false;
            } else {
                $mdToast.show(
                        $mdToast.simple()
                        .textContent('Some error occured while getting interviewers details! Please try again')
                        .position('bottom left')
                );
            }
        });

        // Get Interviewees details
        APIServices.GetInterviewees().$promise.then(function (response) {
            $scope.interviewees = response;
        }, function (errorResponse) {
            $mdToast.show(
                $mdToast.simple()
                .textContent('Some error while getting interviewees details! Please try again')
                .position('bottom left')
            );
        });
    }

    // Implement pager
    $scope.applyPager = function () {
        $scope.dataWithPager = responseData.buzzes.slice(0, $scope.pagerValue);

    }

    // Get videos from API
    $scope.getVideos = function (pageNo) {

        APIServices.GetVideos({ page: pageNo }).$promise.then(function (response) {

            responseData = response;
            $scope.applyPager();
            $scope.currentPaging = response.paging;
            //console.log(response);
        }, function (error) {
            $mdToast.show(
                    $mdToast.simple()
                    .textContent('Some error occured while try to get videos! Please try again')
                    .position('bottom left')
            );
        });
    }

    // video tab
    $scope.showVideos = function () {
        $scope.isAccountView = false;
        $scope.isVideosView = true;

        $scope.getVideos(1);
    }

    // Call default video tab
    $scope.showVideos();


}]);
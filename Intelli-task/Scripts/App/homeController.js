app.controller('homeController', ['$scope', '$state', '$mdSidenav', 'APIServices', function ($scope, $state, $mdSidenav, APIServices) {
    

    $scope.logout = function () {
        APIServices.Logout().$promise.then(function (resp) {
            sessionStorage.removeItem('accessToken');
            $state.go('login');
        });
    }

    $scope.closeSideNav = function () {
        $mdSidenav('left').close();

    };

    $scope.toggleLeft = function() {
        $mdSidenav('left').toggle();
    };

    $scope.isVideosView = true;
    
    $scope.pagerPoints = [2, 10, 15, 20, 25];
    $scope.pagerValue = 10;
    var responseData = {};

    $scope.showAccount = function () {
        $scope.isVideosView = false;
        $scope.isAccountView = true;

        $scope.accessToken = sessionStorage.getItem('accessToken');
        $scope.refreshToken = sessionStorage.getItem('refreshToken');
        $scope.userName = sessionStorage.getItem('userName');
    }

    $scope.applyPager = function () {
        $scope.dataWithPager = responseData.buzzes.slice(0, $scope.pagerValue);

    }
    $scope.getVideos = function (pageNo) {
        $scope.isLoading = true;
        APIServices.GetVideos({ page: pageNo }).$promise.then(function (response) {
            $scope.isLoading = false;
            //$scope.responseData == undefined ? $scope.responseData = response : $scope.responseData.buzzes = $scope.responseData.buzzes.concat(response.buzzes);
            responseData = response;
            $scope.dataWithPager = response.buzzes.slice(0,$scope.pagerValue);
            $scope.currentPaging = response.paging;
            console.log(response);
        }, function (error) {
            $scope.isLoading = false;
            console.log(error);
            $mdToast.show(
                    $mdToast.simple()
                    .textContent('Some error occured! Please try again')
                    .position('bottom left')
            );
        });
    }

    $scope.showVideos = function () {
        $scope.isAccountView = false;
        $scope.isVideosView = true;
        $scope.isLoading = true;
        
        $scope.getVideos(1);
    }


    $scope.showVideos();
}]);
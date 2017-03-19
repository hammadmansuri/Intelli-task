app.factory('loginService', ['$q', '$http', 'APIServices', 'Base64', function ($q, $http, APIServices, Base64) {
    return{
        Login : function (username, password) {
            var deferred = $q.defer();
            var userInfo = {
                grant_type: 'password',
                username: username,
                password: password
            }
            var authData = Base64.encode(username + ':' + password);

            //$http.defaults.headers.common['Authorization'] = 'Basic ' + authData;
            APIServices.Login($.param(userInfo)).$promise.then(function (response) {
                sessionStorage.setItem('userName', response.userName);
                sessionStorage.setItem('accessToken', response.access_token);
                sessionStorage.setItem('refreshToken', response.refresh_token);

                deferred.resolve(response);

            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;

        }

}
}]);
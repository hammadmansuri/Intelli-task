'use strict';
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
});

app.factory('httpRequestInterceptor', function ($q, $rootScope, $log) {
    return {
        request: function (config) {
            $rootScope.isLoading = true;
            if (config.url.indexOf('Login') !== -1)
                return config;

            config.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('accessToken');
            return config;
        },
        response: function (config) {
            $rootScope.isLoading = false;
            return config;
        },
        responseError: function (error) {
            $rootScope.isLoading = false;
            $log.error('Response error : ', error);
            return $q.reject(error);
        }
    }
})

app.factory('APIServices', ['$resource',
    function ($resource) {

        var apiPrefix = '/api';
        var accountPrefix = '/api/Account';
        var rolesPrefix = '/api/roles';
        
        return $resource('', {},
            {
                Register: {
                    method: 'POST',
                    isArray: false,
                    url: accountPrefix + '/' + 'Register'
                },
                Login: {
                    method: 'POST',
                    isArray: false,
                    //url: accountPrefix + '/' + 'Login',
                    url:  '/' + 'Token',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                },
                Logout: {
                    method: 'POST',
                    isArray: false,
                    url: accountPrefix + '/' + 'Logout'
                },
                GetVideos: {
                    method: 'GET',
                    isArray: false,
                    url: apiPrefix + '/' + 'GetBuzzFeedVideos'
                },
                GetAllRoles: {
                    method: 'GET',
                    isArray: true,
                    url: rolesPrefix + '/' + 'GetAllRoles'
                },
                GetInterviewers: {
                    method: 'GET',
                    isArray: true,
                    url: apiPrefix + '/' + 'GetInterviewers'
                },
                GetInterviewees: {
                    method: 'GET',
                    isArray: true,
                    url: apiPrefix + '/' + 'GetInterviewees'
                }
            });
    }
]);



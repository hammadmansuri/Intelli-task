'use strict';

app.factory('httpRequestInterceptor', function () {
    return {
        request: function (config) {
            config.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('accessToken');

            return config;
        }
    }
})

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
});

app.factory('APIServices', ['$resource', '$window',
    function ($resource, $window) {

        var baseUrl = '/api';
        //var headerAuthorizationToken = { Authorization: 'Bearer ' + sessionStorage.getItem('accessToken') };

        return $resource('', {},
            {
                Register:{
                    method: 'POST',
                    isArray: false,
                    url:baseUrl + '/' + 'Account/Register'
                },
                Login: {
                    method: 'POST',
                    isArray: false,
                    url: '/' + 'Token',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                },
                GetVideos: {
                    method: 'GET',
                    isArray: false,
                    //headers:headerAuthorizationToken,
                    url: baseUrl + '/' + 'GetBuzzFeedVideos'
                },
                Logout: {
                    method:'POST',
                    isArray: false,
                    //headers: headerAuthorizationToken,
                    url: baseUrl + '/' + 'Account/Logout'
                }
            });
    }
]);



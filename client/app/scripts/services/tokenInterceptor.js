(function () {
    'use strict';
    angular.module('yapp')
        .factory('tokenInterceptor', function ($q,$localStorage,$rootScope,$injector) {
            return {
                request: function (config) {

                    config.headers = config.headers || {};
                    if ($localStorage.token && config.url.substring(0, 11) === '//localhost') {
                        config.headers['X-Access-Token'] = $localStorage.token;
                        config.headers['X-Key'] = $localStorage.user;
                        config.headers['Content-Type'] = 'application/json';
                    }
                    return config || $q.when(config);
                },

                response: function (response) {
                    return response || $q.when(response);
                },

                responseError: function(response) {
                    if (response.status === 401){
                        var authService = $injector.get('authService');
                        authService.logout();
                    }
                    return $q.reject(response);
                }

            };
        });
})();
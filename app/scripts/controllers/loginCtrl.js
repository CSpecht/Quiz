'use strict';

angular.module('yapp')
  .controller('LoginCtrl', function($scope, $location, $http, $state, nodeServer, $rootScope, $localStorage) {

        /*jshint validthis: true */
        var vm = this;
        vm.user = {
            username: 'cs206',
            password: ''
        };
        vm.submit = submit;

        function submit() {
            $http.post(nodeServer + '/auth', vm.user).then(function (res) {
                // success
                authService.isLogged = true;
                authService.user = res.data.user.username;

                $localStorage.token = res.data.token;
                $localStorage.user = res.data.user.username; // to fetch the user details on refresh

                $state.go('editor');
            }, function (err) {
                console.log(err);
            });

        }






        /*

         $scope.auth = function () {

         $rootScope.loggedInUser = $scope.username;
         console.log($scope.login);
         //console.log($scope.password);

         $http({
         method: 'POST',
         data:$scope.login,
         url: nodeServer + '/auth'

         }).then(function successCallback(response) {
         $state.go('dashboard')

         });

         }

         */
  });



/*

function loginCtrl($http, authService, $localStorage, $state) {
    /*jshint validthis: true
    var vm = this;
    vm.user = {
        username: 'ck115',
        password: ''
    };
    vm.submit = submit;

    function submit() {
        $http.post('//localhost:9000/auth', vm.user).then(function (res) {
            // success
            authService.isLogged = true;
            authService.user = res.data.user.username;

            $localStorage.token = res.data.token;
            $localStorage.user = res.data.user.username; // to fetch the user details on refresh

            $state.go('editor');
        }, function (err) {
            console.log(err);
        });

    }


}


})();
*/
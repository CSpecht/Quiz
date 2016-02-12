

'use strict';

 angular.module('yapp')
    .controller('LogoutCtrl', function($scope, $location, $http, $state, nodeServer, $rootScope, $localStorage) {



      $scope.submit = function () {

        //console.log($scope.login);
        //console.log($scope.password);

        $http({
          method: 'POST',
          data: $scope.login,
          url: nodeServer + '/auth/logout'
        }).then(function successCallback(response) {


          console.log( response )
          $state.go('login')

        });

        /*$http({
            method: 'get',
            data: $scope.login,
            url: nodeServer + '/user'
          }).then(function successCallback(response) {
            console.log( response )
            console.log(login);
            $state.reload();
          }); */
      }

  });



'use strict';

 angular.module('yapp')
    .controller('LoginCtrl', function($scope, $location, $http, $state, nodeServer, $rootScope, $localStorage) {

      console.log("TEST")

      console.log($scope.username);

      $scope.submit = function () {

        $rootScope.loggedInUser = $scope.username;
        //console.log($scope.login);
        //console.log($scope.password);

        $http({
          method: 'POST',
          data: $scope.login,
          url: nodeServer + '/auth'
        }).then(function successCallback(response) {
          console.log( response )
          $state.go('dashboard')
        });

      }

  });

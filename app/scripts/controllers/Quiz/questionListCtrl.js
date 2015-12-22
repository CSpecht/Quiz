'use strict';

angular.module('yapp')
    .controller('questionListCtrl', function($scope, $state, $http, nodeServer) {
        $scope.showVar = true;
        $scope.editVar = false;

        $http({
            method: 'GET',
            url: nodeServer + '/api/quiz'
        }).then(function successCallback(response) {
            $scope.user = response.data;

        });

        $scope.delete = function ($user) {
            $scope.showVar = true;
            $scope.editVar = false;
            $http({
                method: 'DELETE',
                url: nodeServer +'/api/user/' + $user._id
            }).then(function successCallback(response) {

                $state.reload(); //if callback success --> page reload
            })
        };

        $scope.edit = function($user) {


            console.log($scope.user.firstname);
            $scope.editVar = true;
            $scope.showVar = false;

            console.log('result: ' + $scope.user.result);



            console.log($user._id);
            console.log($user.firstname);

            $scope.user = $user;
            var $tmpUser;
            var $tmpResult = [];


            $http({
                method: 'GET',
                url: nodeServer +'/api/user/' + $user._id //$user._id

            }).then(function successCallback(response) {
                $state.go('editUser');
                $tmpUser = response.data;
                console.log('tmpUser');
                console.log($tmpUser);
            });

        };






        $scope.save = function() {
            $scope.editVar = false;
            $scope.showVar = true;
            $http({
                method: 'PUT',
                data: $scope.user,
                url: nodeServer +'/api/user/' + $scope.user._id
            }).then(function successCallback(response) {
                $state.reload();
            });
        }
    });

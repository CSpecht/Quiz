'use strict';

angular.module('yapp')
    .controller('editUserCtrl', function($scope, $state, $http, nodeServer) {
        $scope.showVar = true;
        $scope.editVar = false;

        $http({
            method: 'GET',
            url: nodeServer + '/api/user/all' // /api/user
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
           //TODO Sobald geändert wird, wird Result Objekt überschrieben muss gefixt werden

            console.log($scope.user.firstname);
            $scope.editVar = true;
            $scope.showVar = false;
           // var $tmpQid = $scope.user.result.quizID
           // var $tmpRes = $scope.user.result.points
         console.log('result: ' + $scope.user.result);

           // var dup_array = $scope.user.result.slice();

            console.log($user._id);
            console.log($user.firstname);
           // console.log('results: ' + dup_array);
            //console.log($user.result);
            $scope.user = $user;
            var $tmpUser;
            var $tmpResult = [];

            //$scope.user.result.quizID = $tmpQid;
            //$scope.user.result.quizID = $tmpRes;
            //console.log($tmpQid);
            //console.log($tmpRes);



            /*
             $scope.user.firstname = $user.firstname;
             $scope.user.lastname = $user.lastname;
             $scope.user.text = $user.text;
             $scope.user.imageurl = $user.imageurl;
             $scope.user.status = $user.status;

             */
            $http({
                method: 'GET',
                url: nodeServer +'/api/user/' + $user._id //$user._id


            }).then(function successCallback(response) {
                $state.go('editUser');
                $tmpUser = response.data;
                console.log('tmpUser');
                console.log($tmpUser);
                console.log($user._id);
/*
                var roles = $scope.user.roles
                var strRoles = roles[0].concat(', '+roles[1])
                $scope.user.roles = strRoles
*/

            });

        };

        $scope.save = function() {
            $scope.editVar = false;
            $scope.showVar = true;

            console.log($scope.user.body)
            $http({
                method: 'POST',
                data: $scope.user,
                url: nodeServer +'/api/user/' + $scope.user._id
            }).then(function successCallback(response) {
               $state.reload();

            });
        }
    });

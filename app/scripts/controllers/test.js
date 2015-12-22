
'use strict';

angular.module('yapp')
    .controller('TestCtrl', function($scope, $state) {
        $scope.$state = $state;
        $scope.posts = [
            {title: 'post 1', upvotes: 5},
            {title: 'post 2', upvotes: 2},
            {title: 'post 3', upvotes: 15},
            {title: 'post 4', upvotes: 9},
            {title: 'post 5', upvotes: 4}
        ];
        $scope.addPost = function () {

            if (!$scope.title || !$scope.upvotes || $scope.title === '' || scope.upvotes === '') {
                console.log("keine angaben")
                return;
            }
            else {
                $scope.posts.push({title: $scope.title, upvotes:$scope.upvotes});
                $scope.title = '';
                $scope.upvotes = '';
            }

        };





    });


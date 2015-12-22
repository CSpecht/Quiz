angular.module('yapp')
    .controller('createQuizCtrl', function($scope, $state, $http, nodeServer) {

        $scope.save = function () {
            var startDate = new Date($scope.quiz.start);


            $scope.quiz.start= startDate;

            console.log(startDate); //2015-12-12 16:00 --> 12.12.2015 16:00
            $scope.quiz = $scope.quiz.name;

            $http({
                method: 'POST',
                data: $scope.quiz,
                url: nodeServer + '/api/quiz'
            }).then(function successCallback(response) {
                $state.reload();
                $state.go('editUser')
                //console.log(response);
            });
        }





    });


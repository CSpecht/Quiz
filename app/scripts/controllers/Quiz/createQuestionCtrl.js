angular.module('yapp')
    .controller('createQuestionCtrl', function($scope, $state, $http, nodeServer) {
        $scope.save = function () {
            $http({
                method: 'PUT',
                data: $scope.question,
                url: nodeServer + '/question'
            }).then(function successCallback(response) {
                //TODO change in $state.go('editUser')
                //$state.go('editUser')
                $state.reload();


            }); }
    });

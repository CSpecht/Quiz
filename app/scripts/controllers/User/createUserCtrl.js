angular.module('yapp')
    .controller('createUserCtrl', function($scope, $state, $http, nodeServer) {
        $scope.save = function () {
        console.log($scope.user);

        $http({
            method: 'POST',
            data: $scope.user,
            url: nodeServer + '/api/user'
        }).then(function successCallback(response) {
            //TODO change in $state.go('editUser')
            //$state.go('editUser')
            $state.reload();
        }); }
});

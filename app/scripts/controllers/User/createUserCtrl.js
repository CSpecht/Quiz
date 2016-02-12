angular.module('yapp')
    .controller('createUserCtrl', function($scope, $state, $http, nodeServer) {
        $scope.save = function () {
        console.log($scope.user);

        var roles = $scope.user.role
        var comma = ',';

        var splits = roles.split(comma);

        $scope.user.role = splits;

console.log($scope.user.role);

        $http({
            method: 'put', //CHANGE INTO PUT wenn fertig string concat
            data: $scope.user,
            url: nodeServer + '/api/user'
        }).then(function successCallback(response) {
            //TODO change in $state.go('editUser')
            //$state.go('editUser')
            $state.reload();
            console.log(response.data);
        }); }


});

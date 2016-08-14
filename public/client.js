var statusapp = angular.module('status-app', []);

statusapp.controller('status-controller', ['$scope', '$http', function status_controller($scope, $http) {
    $scope.systems = [];

    setInterval(function() {
        $http({
            method: "GET",
            url: "/status"
        }).then(function successCallback(response) {
            $scope.systems = response.data;
        }, function errorCallback(response) {

        });
    }, 5000);
}]);

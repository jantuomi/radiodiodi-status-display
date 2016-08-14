var statusapp = angular.module('status-app', []);

statusapp.controller('status-controller', ['$scope', '$http', function status_controller($scope, $http) {
    $scope.systems = [];

    var update = function() {
        $http({
            method: "GET",
            url: "/status"
        }).then(function successCallback(response) {
            $scope.systems = response.data;
        }, function errorCallback(response) {

        });
    };
    
    setInterval(update, 5000);
    update();
}]);

var statusapp = angular.module('status-app', []);

var UPDATE_INTERVAL = 60000;

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
    
    setInterval(update, UPDATE_INTERVAL);
    update();
}]);

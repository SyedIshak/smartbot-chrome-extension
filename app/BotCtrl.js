'use strict';

angular.module('app').controller('BotCtrl', function ($scope, BotStorage) {

    $scope.BotStorage = BotStorage;

    $scope.$watch('BotStorage.data', function() {
        $scope.BotList = $scope.BotStorage.data;
    });

    $scope.BotStorage.findAll(function(data){
        $scope.BotList = data;
        $scope.$apply();
    });

    $scope.add = function() {
        BotStorage.add($scope.newContent,"alignLeft");
        /* Rest call needs to called here */
        $.ajax({
				url: "http://localhost:8080/getMessage",
				method: "POST",
				data:{message: $scope.newContent},
				success: function(response){
					BotStorage.add(response,"alignRight");
					$scope.$apply();
					return;
				},
				error: function(response){
					console.error("Error occured");
					return;
				}
			});
        $scope.newContent = '';
    }
    

    $scope.remove = function(Bot) {
        BotStorage.remove(Bot);
    }

    $scope.removeAll = function() {
        BotStorage.removeAll();
    }

    $scope.toggleCompleted = function() {
        BotStorage.sync();
    }

});
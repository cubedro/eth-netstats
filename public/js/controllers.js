'use strict';

/* Controllers */

function StatsCtrl($scope, socket) {

	// Socket listeners
	// ----------------

	socket.on('init', function(data){
		$scope.nodes = data.nodes;
		$scope.nodesTotal = $scope.nodes.length;
		$scope.nodesActive = $scope.nodes.length;
	});
}
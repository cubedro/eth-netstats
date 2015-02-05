'use strict';

/* Controllers */

function StatsCtrl($scope, socket, _) {

	// Main Stats init
	// ---------------

	$scope.nodesTotal = 0;
	$scope.nodesActive = 0;
	$scope.bestBlock = 0;
	$scope.lastBlock = 0;
	$scope.upTimeTotal = 0;

	// Socket listeners
	// ----------------

	socket.on('init', function(data){
		$scope.nodes = data.nodes;

		updateStats();
	});

	socket.on('update', function(data){
		$scope.nodes[data.id] = data;

		updateStats();
	});

	function updateStats()
	{
		$scope.nodesTotal = $scope.nodes.length;
		$scope.nodesActive = _.filter($scope.nodes, function(node){ return node.stats.active == true; }).length;
		$scope.bestBlock = _.max($scope.nodes, function(node){ return parseInt(node.stats.block.height); }).stats.block.height;
		$scope.lastBlock = _.max($scope.nodes, function(node){ return parseInt(node.stats.block.timestamp); }).stats.block.timestamp;
		$scope.upTimeTotal = _.reduce($scope.nodes, function(total, node){ return total + node.stats.uptime.total; }, 0) / $scope.nodes.length;
	}
}
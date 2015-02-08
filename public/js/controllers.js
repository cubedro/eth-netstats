'use strict';

/* Controllers */

function StatsCtrl($scope, $filter, socket, _) {

	// Main Stats init
	// ---------------

	$scope.nodesTotal = 0;
	$scope.nodesActive = 0;
	$scope.bestBlock = 0;
	$scope.lastBlock = 0;
	$scope.upTimeTotal = 0;

	$scope.map = [];

	// Socket listeners
	// ----------------

	socket.emit('ready');

	socket.on('init', function(data)
	{
		$scope.nodes = data.nodes;

		updateStats();
	});

	socket.on('update', function(data)
	{
		$scope.nodes[data.id] = data;

		updateStats();
	});

	function updateStats()
	{
		$scope.nodesTotal = $scope.nodes.length;

		$scope.nodesActive = _.filter($scope.nodes, function(node) {
			return node.stats.active == true;
		}).length;

		$scope.bestBlock = _.max($scope.nodes, function(node) {
			return parseInt(node.stats.block.number);
		}).stats.block.number;

		$scope.lastBlock = _.max($scope.nodes, function(node) {
			return parseInt(node.stats.block.timestamp);
		}).stats.block.timestamp;

		$scope.upTimeTotal = _.reduce($scope.nodes, function(total, node) {
			return total + node.stats.uptime.total;
		}, 0) / $scope.nodes.length;

		$scope.map = _.map($scope.nodes, function(node) {
			if(node.geo != null)
				return {
					radius: 3,
					latitude: node.geo.ll[0],
					longitude: node.geo.ll[1],
					fillKey: $filter('bubbleClass')(node, $scope.bestBlock)
				};
			else
				return {
					radius: 0,
					latitude: 0,
					longitude: 0
				};
		});
	}
}
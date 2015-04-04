'use strict';

/* Controllers */

function StatsCtrl($scope, $filter, socket, _, toastr) {

	// Main Stats init
	// ---------------

	$scope.nodesTotal = 0;
	$scope.nodesActive = 0;
	$scope.bestBlock = 0;
	$scope.lastBlock = 0;
	$scope.lastDifficulty = 0;
	$scope.upTimeTotal = 0;
	$scope.avgBlockTime = 0;

	$scope.lastBlocksTime = [];
	$scope.difficultyChange = [];
	$scope.transactionDensity = [];
	$scope.gasSpending = [];

	$scope.nodes = [];
	$scope.map = [];

	$scope.timeout = setInterval(function(){
		$scope.$apply();
	}, 1000);

	// Socket listeners
	// ----------------

	socket = new Primus();

	socket.on('open', function open() {
		socket.emit('ready');
		console.log('The connection has been opened.');
	})
	.on('end', function end() {
		console.log('Socket connection ended.')
	})
	.on('error', function error(err) {
		console.log(err);
	})
	.on('reconnecting', function reconnecting(opts) {
		console.log('We are scheduling a reconnect operation', opts);
	})
	.on('data', function incoming(data) {
		socketAction(data.action, data.data);
	});

	socket.on('init', function(data)
	{
		socketAction("init", data.nodes);
	});

	function socketAction(action, data)
	{
		console.log('Action: ', action);
		console.log('Data: ', data);

		switch(action) {
			case "init":
				$scope.nodes = data;

				if($scope.nodes.length > 0) toastr['success']("Got nodes list", "Got nodes!");
				break;

			case "add":
				if(addNewNode(data))
					toastr['success']("New node "+ $scope.nodes[findIndex({id: data.id})].info.name +" connected!", "New node!");
				else
					toastr['info']("Node "+ $scope.nodes[findIndex({id: data.id})].info.name +" reconnected!", "Node is back!");
				break;

			case "update":
				var index = findIndex({id: data.id});

				// if(data.stats.block.number > $scope.nodes[index].stats.block.number) {
				// 	data.stats.block.firstarrived = (data.stats.block.number > $scope.bestBlock ? data.stats.block.received : $scope.lastBlock);
				// } else {
				// 	data.stats.block.firstarrived = $scope.nodes[index].stats.block.firstarrived;
				// }

				$scope.nodes[index].stats = data.stats;

				break;

			case "info":
				$scope.nodes[findIndex({id: data.id})].info = data.info;
				break;

			case "inactive":
				$scope.nodes[findIndex({id: data.id})].stats = data.stats;
				toastr['error']("Node "+ $scope.nodes[findIndex({id: data.id})].info.name +" went away!", "Node connection was lost!");
				break;

			case "latency":
				$scope.nodes[findIndex({id: data.id})].stats.latency = data.latency;
				break;
		}

		updateStats();
	}

	function findIndex(search)
	{
		return _.findIndex($scope.nodes, search);
	}

	function addNewNode(data)
	{
		var index = findIndex({id: data.id});
		if(index < 0)
		{
			$scope.nodes.push(data);

			return true;
		}

		$scope.nodes[index] = data;

		return false;
	}

	function updateStats()
	{
		if($scope.nodes.length)
		{
			$scope.nodesTotal = $scope.nodes.length;

			$scope.nodesActive = _.filter($scope.nodes, function(node) {
				return node.stats.active == true;
			}).length;

			var bestBlock = _.max($scope.nodes, function(node) {
				return parseInt(node.stats.block.number);
			}).stats.block.number;

			if(bestBlock > $scope.bestBlock)
			{
				$scope.bestBlock = bestBlock;

				$scope.lastBlock = _.max($scope.nodes, function(node) {
					return parseInt(node.stats.block.number);
				}).stats.block.received;

				$scope.lastBlocksTime = _.max($scope.nodes, function(node) {
					return parseInt(node.stats.block.number);
				}).stats.blockTimes;

				jQuery('.spark-blocktimes').sparkline($scope.lastBlocksTime.reverse(), {type: 'bar', tooltipSuffix: 's'});

				$scope.difficultyChange = _.max($scope.nodes, function(node) {
					return parseInt(node.stats.block.number);
				}).stats.difficulty;

				jQuery('.spark-difficulty').sparkline($scope.difficultyChange.reverse(), {type: 'bar'});

				$scope.transactionDensity = _.max($scope.nodes, function(node) {
					return parseInt(node.stats.block.number);
				}).stats.txDensity;

				jQuery('.spark-transactions').sparkline($scope.transactionDensity.reverse(), {type: 'bar'});

				$scope.gasSpending = _.max($scope.nodes, function(node) {
					return parseInt(node.stats.block.number);
				}).stats.gasSpending;

				jQuery('.spark-gasspending').sparkline($scope.gasSpending.reverse(), {type: 'bar'});
			}

			$scope.lastDifficulty = _.max($scope.nodes, function(node) {
				return parseInt(node.stats.block.number);
			}).stats.block.difficulty;

			$scope.avgBlockTime = _.max($scope.nodes, function(node) {
				return parseInt(node.stats.block.number);
			}).stats.blocktimeAvg;

			$scope.upTimeTotal = _.reduce($scope.nodes, function(total, node) {
				return total + node.stats.uptime;
			}, 0) / $scope.nodes.length;

			$scope.map = _.map($scope.nodes, function(node) {
				if(node.geo != null)
					return {
						radius: 3,
						latitude: node.geo.ll[0],
						longitude: node.geo.ll[1],
						fillKey: $filter('bubbleClass')(node.stats, $scope.bestBlock)
					};
				else
					return {
						radius: 0,
						latitude: 0,
						longitude: 0
					};
			});

			// console.log($scope.map);
		}

		$scope.$apply();
	}
}
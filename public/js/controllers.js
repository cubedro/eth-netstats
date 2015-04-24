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
	$scope.uncleCount = 0;
	$scope.bestStats = {};

	$scope.lastBlocksTime = [];
	$scope.difficultyChart = [];
	$scope.transactionDensity = [];
	$scope.gasSpending = [];
	$scope.miners = [];

	$scope.nodes = [];
	$scope.map = [];
	$scope.blockPropagationChart = [];
	$scope.uncleCountChart = [];

	$scope.latency = 0;

	$scope.predicate = ['-stats.active', '-stats.block.number', 'stats.block.propagation'];
	$scope.reverse = false;

	$scope.orderTable = function(predicate, reverse)
	{
		if(!_.isEqual(predicate, $scope.predicate))
		{
			$scope.reverse = reverse;
			$scope.predicate = predicate;
		}
		else
		{
			$scope.reverse = !$scope.reverse;
		}
	}

	$scope.timeout = setInterval(function(){
		$scope.$apply();
	}, 1000);

	$scope.getNumber = function(num) {
		return new Array(num);
	}

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

	socket.on('client-latency', function(data)
	{
		$scope.latency = data.latency;
	})

	function socketAction(action, data)
	{
		console.log('Action: ', action);
		console.log('Data: ', data);

		switch(action) {
			case "init":
				$scope.nodes = data;
				$scope.$apply();

				_.forEach($scope.nodes, function(node, index) {
					makePeerPropagationChart($scope.nodes[index]);
				});

				if($scope.nodes.length > 0)
					toastr['success']("Got nodes list", "Got nodes!");

				break;

			case "add":
				if(addNewNode(data))
					toastr['success']("New node "+ $scope.nodes[findIndex({id: data.id})].info.name +" connected!", "New node!");
				else
					toastr['info']("Node "+ $scope.nodes[findIndex({id: data.id})].info.name +" reconnected!", "Node is back!");

				break;

			case "update":
				var index = findIndex({id: data.id});
				$scope.nodes[index].stats = data.stats;
				$scope.nodes[index].history = data.history;
				makePeerPropagationChart($scope.nodes[index]);

				break;

			case "info":
				$scope.nodes[findIndex({id: data.id})].info = data.info;

				break;

			case "blockPropagationChart":
				$scope.blockPropagationChart = data;

				break;

			case "uncleCount":
				$scope.uncleCountChart = data;
				$scope.uncleCount = data[0] + data[1];

				jQuery('.spark-uncles').sparkline($scope.uncleCountChart.reverse(), {type: 'bar', barSpacing: 1});

				break;

			case "inactive":
				$scope.nodes[findIndex({id: data.id})].stats = data.stats;
				toastr['error']("Node "+ $scope.nodes[findIndex({id: data.id})].info.name +" went away!", "Node connection was lost!");

				break;

			case "latency":
				$scope.nodes[findIndex({id: data.id})].stats.latency = data.latency;

				break;

			case "client-ping":
				socket.emit('client-pong');

				break;
		}

		updateStats();
	}

	function findIndex(search)
	{
		return _.findIndex($scope.nodes, search);
	}

	function makePeerPropagationChart(node)
	{
		jQuery('.' + node.id).sparkline(node.history, {
			type: 'bar',
			negBarColor: '#7f7f7f',
			zeroAxis: false,
			height: 20,
			barWidth : 2,
			barSpacing : 1,
			tooltipSuffix: ' ms',
			chartRangeMax: 8000,
			colorMap: jQuery.range_map({
				'0:1': '#10a0de',
				'1:1000': '#7bcc3a',
				'1001:3000': '#FFD162',
				'3001:7000': '#ff8a00',
				'7001:': '#F74B4B'
			})
		});
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
		makePeerPropagationChart($scope.nodes[index]);

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
				$scope.bestStats = _.max($scope.nodes, function(node) {
					return parseInt(node.stats.block.number);
				}).stats;

				$scope.lastBlock = $scope.bestStats.block.received;
				$scope.lastBlocksTime = $scope.bestStats.blockTimes;
				$scope.difficultyChart = $scope.bestStats.difficulty;
				$scope.transactionDensity = $scope.bestStats.txDensity;
				$scope.gasSpending = $scope.bestStats.gasSpending;

				if(typeof $scope.bestStats.miners !== 'undefined') {
					$scope.miners = $scope.bestStats.miners;
				}

				jQuery('.spark-blocktimes').sparkline($scope.lastBlocksTime.reverse(), {type: 'bar', tooltipSuffix: ' s'});
				jQuery('.spark-difficulty').sparkline($scope.difficultyChart.reverse(), {type: 'bar'});
				jQuery('.spark-transactions').sparkline($scope.transactionDensity.reverse(), {type: 'bar'});
				jQuery('.spark-gasspending').sparkline($scope.gasSpending.reverse(), {type: 'bar'});
			}

			$scope.lastDifficulty = $scope.bestStats.block.difficulty;

			$scope.avgBlockTime = _.max($scope.nodes, function(node) {
				return parseInt(node.stats.block.number);
			}).stats.blocktimeAvg;

			$scope.upTimeTotal = _.reduce($scope.nodes, function(total, node) {
				return total + node.stats.uptime;
			}, 0) / $scope.nodes.length;

			$scope.map = _.map($scope.nodes, function(node) {
				var fill = $filter('bubbleClass')(node.stats, $scope.bestBlock);

				if(node.geo != null)
					return {
						radius: 3,
						latitude: node.geo.ll[0],
						longitude: node.geo.ll[1],
						nodeName: node.info.name,
						fillClass: "text-" + fill,
						fillKey: fill,
					};
				else
					return {
						radius: 0,
						latitude: 0,
						longitude: 0
					};
			});
		}

		$scope.$apply();
	}
}
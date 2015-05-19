'use strict';

/* Controllers */

netStatsApp.controller('StatsCtrl', function($scope, $filter, socket, _, toastr) {

	// Main Stats init
	// ---------------

	$scope.nodesTotal = 0;
	$scope.nodesActive = 0;
	$scope.bestBlock = 0;
	$scope.lastBlock = 0;
	$scope.lastDifficulty = 0;
	$scope.upTimeTotal = 0;
	$scope.avgBlockTime = 0;
	$scope.blockPropagationAvg = 0;
	$scope.avgHashrate = 0;
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
	$scope.coinbases = [];

	$scope.latency = 0;

	$scope.currentApiVersion = "0.0.8";

	$scope.predicate = ['-pinned', '-stats.active', '-stats.block.number', 'stats.block.propagation'];
	$scope.reverse = false;

	$scope.prefixPredicate = ['-pinned', '-stats.active'];
	$scope.originalPredicate = ['-stats.block.number', 'stats.block.propagation'];

	$scope.orderTable = function(predicate, reverse)
	{
		if(!_.isEqual(predicate, $scope.originalPredicate))
		{
			$scope.reverse = reverse;
			$scope.originalPredicate = predicate;
			$scope.predicate = _.union($scope.prefixPredicate, predicate);
		}
		else
		{
			$scope.reverse = !$scope.reverse;

			if($scope.reverse === true){
				_.forEach(predicate, function (value, key) {
					predicate[key] = (value[0] === '-' ? value.replace('-', '') : '-' + value);
				});
			}

			$scope.predicate = _.union($scope.prefixPredicate, predicate);
		}
	}

	$scope.timeout = setInterval(function ()
	{
		$scope.$apply();
	}, 200);

	$scope.getNumber = function(num) {
		return new Array(num);
	}

	// Socket listeners
	// ----------------

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
		// console.log('Action: ', action);
		// console.log('Data: ', data);

		switch(action) {
			case "init":
				$scope.nodes = data;

				_.forEach($scope.nodes, function(node, index) {
					if(typeof node.stats.hashrate === 'undefined')
						$scope.nodes[index].stats.hashrate = 0;

					// Init pin
					$scope.nodes[index].pinned = false;

					makePeerPropagationChart($scope.nodes[index]);
				});

				$scope.$apply();

				if($scope.nodes.length > 0)
					toastr['success']("Got nodes list", "Got nodes!");

				break;

			case "add":
				if(addNewNode(data))
					toastr['success']("New node "+ $scope.nodes[findIndex({id: data.id})].info.name +" connected!", "New node!");
				else
					toastr['info']("Node "+ $scope.nodes[findIndex({id: data.id})].info.name +" reconnected!", "Node is back!");

				$scope.$apply();
				makePeerPropagationChart($scope.nodes[findIndex({id: data.id})]);

				break;

			case "update":
				if(typeof data.stats.hashrate === 'undefined')
					data.stats.hashrate = 0;

				var index = findIndex({id: data.id});

				if(typeof $scope.nodes[index].stats !== 'undefined') {

					if($scope.nodes[index].stats.block.number < data.stats.block.number)
					{
						var best = _.max($scope.nodes, function(node) {
							return parseInt(node.stats.block.number);
						}).stats.block;

						if (data.stats.block.number > best.number) {
							data.stats.block.arrived = _.now();
						} else {
							data.stats.block.arrived = best.arrived;
						}
					}

					$scope.nodes[index].stats = data.stats;
					$scope.nodes[index].history = data.history;
					makePeerPropagationChart($scope.nodes[index]);
				}

				break;

			case "info":
				$scope.nodes[findIndex({id: data.id})].info = data.info;

				if(_.isUndefined($scope.nodes[findIndex({id: data.id})].pinned))
					$scope.nodes[findIndex({id: data.id})].pinned = false;

				break;

			case "blockPropagationChart":
				$scope.blockPropagationChart = data.histogram;
				$scope.blockPropagationAvg = data.avg;

				break;

			case "uncleCount":
				$scope.uncleCountChart = data;
				$scope.uncleCount = data[0] + data[1];

				jQuery('.spark-uncles').sparkline($scope.uncleCountChart.reverse(), {type: 'bar', barSpacing: 1});

				break;

			case "charts":
				$scope.avgBlockTime = data.avgBlocktime;
				$scope.avgHashrate = data.avgHashrate;
				$scope.lastBlocksTime = data.blocktime;
				$scope.difficultyChart = data.difficulty;
				$scope.blockPropagationChart = data.propagation.histogram;
				$scope.blockPropagationAvg = data.propagation.avg;
				$scope.uncleCountChart = data.uncleCount;
				$scope.uncleCount = data.uncleCount[0] + data.uncleCount[1];
				$scope.transactionDensity = data.transactions;
				$scope.gasSpending = data.gasSpending;
				$scope.miners = data.miners;

				getMinersNames();

				jQuery('.spark-blocktimes').sparkline($scope.lastBlocksTime, {type: 'bar', tooltipSuffix: ' s'});
				jQuery('.spark-difficulty').sparkline($scope.difficultyChart, {type: 'bar'});
				jQuery('.spark-transactions').sparkline($scope.transactionDensity, {type: 'bar'});
				jQuery('.spark-gasspending').sparkline($scope.gasSpending, {type: 'bar'});
				jQuery('.spark-uncles').sparkline($scope.uncleCountChart.reverse(), {type: 'bar', barSpacing: 1});

				break;

			case "inactive":
				if( !_.isUndefined(data.stats) )
					$scope.nodes[findIndex({id: data.id})].stats = data.stats;

				toastr['error']("Node "+ $scope.nodes[findIndex({id: data.id})].info.name +" went away!", "Node connection was lost!");

				break;

			case "latency":
				if( !_.isUndefined(data.id) )
					var node = $scope.nodes[findIndex({id: data.id})];

				if( !_.isUndefined(node) && !_.isUndefined(node.stats) && !_.isUndefined(node.stats.latency))
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

	function getMinersNames()
	{
		if($scope.miners.length > 0)
		{
			_.forIn($scope.miners, function(value, key)
			{
				if(value.name !== false)
					return;

				if(value.miner === "0x0000000000000000000000000000000000000000")
					return;

				var name = _.result(_.find(_.pluck($scope.nodes, 'info'), 'coinbase', value.miner), 'name');

				if(typeof name !== 'undefined')
					$scope.miners[key].name = name;
			});
		}
	}

	function addNewNode(data)
	{
		var index = findIndex({id: data.id});
		if(index < 0)
		{
			if(typeof data.stats !== 'undefined' && typeof data.stats.hashrate === 'undefined')
				data.stats.hashrate = 0;

			data.pinned = false;

			$scope.nodes.push(data);

			return true;
		}

		if( !_.isUndefined($scope.nodes[index].pinned)) {
			data.pinned = $scope.nodes[index].pinned
		} else {
			data.pinned = false;
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
				$scope.bestStats = _.max($scope.nodes, function(node) {
					return parseInt(node.stats.block.number);
				}).stats;

				$scope.lastBlock = $scope.bestStats.block.arrived;
				$scope.lastDifficulty = $scope.bestStats.block.difficulty;
			}

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
});
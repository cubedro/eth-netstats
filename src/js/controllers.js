
/* Controllers */

netStatsApp.controller('StatsCtrl', function($scope, $filter, $localStorage, socket, _, toastr) {

	var MAX_BINS = 40;

	// Main Stats init
	// ---------------

	$scope.frontierHash = '0x11bbe8db4e347b4e8c937c1c8370e4b5ed33adb3db69cbdb7a38e1e50b1b82fa';
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

	$scope.lastGasLimit = _.fill(Array(MAX_BINS), 2);
	$scope.lastBlocksTime = _.fill(Array(MAX_BINS), 2);
	$scope.difficultyChart = _.fill(Array(MAX_BINS), 2);
	$scope.transactionDensity = _.fill(Array(MAX_BINS), 2);
	$scope.gasSpending = _.fill(Array(MAX_BINS), 2);
	$scope.miners = [];


	$scope.nodes = [];
	$scope.map = [];
	$scope.blockPropagationChart = [];
	$scope.uncleCountChart = _.fill(Array(MAX_BINS), 2);
	$scope.coinbases = [];

	$scope.latency = 0;

	$scope.currentApiVersion = "0.1.1";

	$scope.predicate = $localStorage.predicate || ['-pinned', '-stats.active', '-stats.block.number', 'stats.block.propagation'];
	$scope.reverse = $localStorage.reverse || false;
	$scope.pinned = $localStorage.pinned || [];

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

		$localStorage.predicate = $scope.predicate;
		$localStorage.reverse = $scope.reverse;
	}

	$scope.pinNode = function(id)
	{
		index = findIndex({id: id});

		if( !_.isUndefined($scope.nodes[index]) )
		{
			$scope.nodes[index].pinned = !$scope.nodes[index].pinned;

			if($scope.nodes[index].pinned)
			{
				$scope.pinned.push(id);
			}
			else
			{
				$scope.pinned.splice($scope.pinned.indexOf(id), 1);
			}
		}

		$localStorage.pinned = $scope.pinned;
	}

	var timeout = setInterval(function ()
	{
		$scope.$apply();
	}, 300);

	$scope.getNumber = function (num) {
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
		$scope.$apply(socketAction(data.action, data.data));
	});

	socket.on('init', function(data)
	{
		$scope.$apply(socketAction("init", data.nodes));
	});

	socket.on('client-latency', function(data)
	{
		$scope.latency = data.latency;
	})

	function socketAction(action, data)
	{
		// filter data
		data = xssFilter(data);

		// console.log('Action: ', action);
		// console.log('Data: ', data);

		switch(action)
		{
			case "init":
				$scope.nodes = data;

				_.forEach($scope.nodes, function (node, index) {

					// Init hashrate
					if( _.isUndefined(node.stats.hashrate) )
						node.stats.hashrate = 0;

					// Init latency
					latencyFilter(node);

					// Init history
					if( _.isUndefined(data.history) )
					{
						data.history = new Array(40);
						_.fill(data.history, -1);
					}

					// Init or recover pin
					node.pinned = ($scope.pinned.indexOf(node.id) >= 0 ? true : false);
				});

				if( $scope.nodes.length > 0 )
				{
					toastr['success']("Got nodes list", "Got nodes!");

					updateActiveNodes();
				}

				break;

			case "add":
				var index = findIndex({id: data.id});

				// if( addNewNode(data) )
				// 	toastr['success']("New node "+ $scope.nodes[findIndex({id: data.id})].info.name +" connected!", "New node!");
				// else
				// 	toastr['info']("Node "+ $scope.nodes[index].info.name +" reconnected!", "Node is back!");

				break;

			// TODO: Remove when everybody updates api client to 0.0.12
			case "update":
				var index = findIndex({id: data.id});

				if( index >= 0 && !_.isUndefined($scope.nodes[index]) && !_.isUndefined($scope.nodes[index].stats) )
				{
					if( !_.isUndefined($scope.nodes[index].stats.latency) )
						data.stats.latency = $scope.nodes[index].stats.latency;

					if( _.isUndefined(data.stats.hashrate) )
						data.stats.hashrate = 0;

					if( $scope.nodes[index].stats.block.number < data.stats.block.number )
					{
						var best = _.max($scope.nodes, function (node) {
							return parseInt(node.stats.block.number);
						}).stats.block;

						if (data.stats.block.number > best.number) {
							data.stats.block.arrived = _.now();
						} else {
							data.stats.block.arrived = best.arrived;
						}

						$scope.nodes[index].history = data.history;
					}

					$scope.nodes[index].stats = data.stats;

					if( !_.isUndefined(data.stats.latency) && _.get($scope.nodes[index], 'stats.latency', 0) !== data.stats.latency )
					{
						$scope.nodes[index].stats.latency = data.stats.latency;

						latencyFilter($scope.nodes[index]);
					}

					updateBestBlock();
				}

				break;

			case "block":
				var index = findIndex({id: data.id});

				if( index >= 0 && !_.isUndefined($scope.nodes[index]) && !_.isUndefined($scope.nodes[index].stats) )
				{
					if( $scope.nodes[index].stats.block.number < data.block.number )
					{
						var best = _.max($scope.nodes, function (node) {
							return parseInt(node.stats.block.number);
						}).stats.block;

						if (data.block.number > best.number) {
							data.block.arrived = _.now();
						} else {
							data.block.arrived = best.arrived;
						}

						$scope.nodes[index].history = data.history;
					}

					$scope.nodes[index].stats.block = data.block;
					$scope.nodes[index].stats.propagationAvg = data.propagationAvg;

					updateBestBlock();
				}

				break;

			case "pending":
				var index = findIndex({id: data.id});

				if( !_.isUndefined(data.id) && index >= 0 )
				{
					var node = $scope.nodes[index];

					if( !_.isUndefined(node) && !_.isUndefined(node.stats.pending) && !_.isUndefined(data.pending) )
						$scope.nodes[index].stats.pending = data.pending;
				}

				break;

			case "stats":
				var index = findIndex({id: data.id});

				if( !_.isUndefined(data.id) && index >= 0 )
				{
					var node = $scope.nodes[index];

					if( !_.isUndefined(node) && !_.isUndefined(node.stats) )
					{
						$scope.nodes[index].stats.active = data.stats.active;
						$scope.nodes[index].stats.mining = data.stats.mining;
						$scope.nodes[index].stats.hashrate = data.stats.hashrate;
						$scope.nodes[index].stats.peers = data.stats.peers;
						$scope.nodes[index].stats.gasPrice = data.stats.gasPrice;
						$scope.nodes[index].stats.uptime = data.stats.uptime;

						if( !_.isUndefined(data.stats.latency) && _.get($scope.nodes[index], 'stats.latency', 0) !== data.stats.latency )
						{
							$scope.nodes[index].stats.latency = data.stats.latency;

							latencyFilter($scope.nodes[index]);
						}

						updateActiveNodes();
					}
				}

				break;

			case "info":
				var index = findIndex({id: data.id});

				if( index >= 0 )
				{
					$scope.nodes[index].info = data.info;

					if( _.isUndefined($scope.nodes[index].pinned) )
						$scope.nodes[index].pinned = false;

					// Init latency
					latencyFilter($scope.nodes[index]);

					updateActiveNodes();
				}

				break;

			case "blockPropagationChart":
				$scope.blockPropagationChart = data.histogram;
				$scope.blockPropagationAvg = data.avg;

				break;

			case "uncleCount":
				$scope.uncleCount = data[0] + data[1];
				data.reverse();
				$scope.uncleCountChart = data;

				break;

			case "charts":
				if( !_.isEqual($scope.avgBlockTime, data.avgBlocktime) )
					$scope.avgBlockTime = data.avgBlocktime;

				if( !_.isEqual($scope.avgHashrate, data.avgHashrate) )
					$scope.avgHashrate = data.avgHashrate;

				if( !_.isEqual($scope.lastGasLimit, data.gasLimit) && data.gasLimit.length >= MAX_BINS )
					$scope.lastGasLimit = data.gasLimit;

				if( !_.isEqual($scope.lastBlocksTime, data.blocktime) && data.blocktime.length >= MAX_BINS )
					$scope.lastBlocksTime = data.blocktime;

				if( !_.isEqual($scope.difficultyChart, data.difficulty) && data.difficulty.length >= MAX_BINS )
					$scope.difficultyChart = data.difficulty;

				if( !_.isEqual($scope.blockPropagationChart, data.propagation.histogram) ) {
					$scope.blockPropagationChart = data.propagation.histogram;
					$scope.blockPropagationAvg = data.propagation.avg;
				}

				data.uncleCount.reverse();

				if( !_.isEqual($scope.uncleCountChart, data.uncleCount) && data.uncleCount.length >= MAX_BINS ) {
					$scope.uncleCount = data.uncleCount[data.uncleCount.length-2] + data.uncleCount[data.uncleCount.length-1];
					$scope.uncleCountChart = data.uncleCount;
				}

				if( !_.isEqual($scope.transactionDensity, data.transactions) && data.transactions.length >= MAX_BINS )
					$scope.transactionDensity = data.transactions;

				if( !_.isEqual($scope.gasSpending, data.gasSpending) && data.gasSpending.length >= MAX_BINS )
					$scope.gasSpending = data.gasSpending;

				if( !_.isEqual($scope.miners, data.miners) ) {
					$scope.miners = data.miners;
					getMinersNames();
				}

				break;

			case "inactive":
				var index = findIndex({id: data.id});

				if( index >= 0 )
				{
					if( !_.isUndefined(data.stats) )
						$scope.nodes[index].stats = data.stats;

					// toastr['error']("Node "+ $scope.nodes[index].info.name +" went away!", "Node connection was lost!");

					updateActiveNodes();
				}

				break;

			case "latency":
				if( !_.isUndefined(data.id) && !_.isUndefined(data.latency) )
				{
					var index = findIndex({id: data.id});

					if( index >= 0 )
					{
						var node = $scope.nodes[index];

						if( !_.isUndefined(node) && !_.isUndefined(node.stats) && !_.isUndefined(node.stats.latency) && node.stats.latency !== data.latency )
						{
							node.stats.latency = data.latency;
							latencyFilter(node);
						}
					}
				}

				break;

			case "client-ping":
				socket.emit('client-pong', {
					serverTime: data.serverTime,
					clientTime: _.now()
				});

				break;
		}

		// $scope.$apply();
	}

	function findIndex(search)
	{
		return _.findIndex($scope.nodes, search);
	}

	function getMinersNames()
	{
		if( $scope.miners.length > 0 )
		{
			_.forIn($scope.miners, function (value, key)
			{
				if(value.name !== false)
					return;

				if(value.miner === "0x0000000000000000000000000000000000000000")
					return;

				var name = _.result(_.find(_.pluck($scope.nodes, 'info'), 'coinbase', value.miner), 'name');

				if( !_.isUndefined(name) )
					$scope.miners[key].name = name;
			});
		}
	}

	function addNewNode(data)
	{
		var index = findIndex({id: data.id});

		if( _.isUndefined(data.history) )
		{
			data.history = new Array(40);
			_.fill(data.history, -1);
		}

		if( index < 0 )
		{
			if( !_.isUndefined(data.stats) && _.isUndefined(data.stats.hashrate) )
			{
				data.stats.hashrate = 0;
			}

			data.pinned = false;

			$scope.nodes.push(data);

			return true;
		}

		data.pinned = ( !_.isUndefined($scope.nodes[index].pinned) ? $scope.nodes[index].pinned : false);

		if( !_.isUndefined($scope.nodes[index].history) )
		{
			data.history = $scope.nodes[index].history;
		}

		$scope.nodes[index] = data;

		updateActiveNodes();

		return false;
	}

	function updateActiveNodes()
	{
		updateBestBlock();

		$scope.nodesTotal = $scope.nodes.length;

		$scope.nodesActive = _.filter($scope.nodes, function (node) {
			// forkFilter(node);
			return node.stats.active == true;
		}).length;

		$scope.upTimeTotal = _.reduce($scope.nodes, function (total, node) {
			return total + node.stats.uptime;
		}, 0) / $scope.nodes.length;

		$scope.map = _.map($scope.nodes, function (node) {
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

	function updateBestBlock()
	{
		if( $scope.nodes.length )
		{
			var chains = {};
			var maxScore = 0;

			// _($scope.nodes)
			// 	.map(function (item)
			// 	{
			// 		maxScore += (item.trusted ? 50 : 1);

			// 		if( _.isUndefined(chains[item.stats.block.number]) )
			// 			chains[item.stats.block.number] = [];

			// 		if( _.isUndefined(chains[item.stats.block.number][item.stats.block.fork]) )
			// 			chains[item.stats.block.number][item.stats.block.fork] = {
			// 				fork: item.stats.block.fork,
			// 				count: 0,
			// 				trusted: 0,
			// 				score: 0
			// 			};

			// 		if(item.stats.block.trusted)
			// 			chains[item.stats.block.number][item.stats.block.fork].trusted++;
			// 		else
			// 			chains[item.stats.block.number][item.stats.block.fork].count++;

			// 		chains[item.stats.block.number][item.stats.block.fork].score = chains[item.stats.block.number][item.stats.block.fork].trusted * 50 + chains[item.stats.block.number][item.stats.block.fork].count;
			// 	})
			// 	.value();

			// $scope.maxScore = maxScore;
			// $scope.chains = _.reduce(chains, function (result, item, key)
			// {
			// 	result[key] = _.max(item, 'score');
			// 	return result;
			// }, {});

			var bestBlock = _.max($scope.nodes, function (node)
			{
				// if( $scope.chains[node.stats.block.number].fork === node.stats.block.fork && $scope.chains[node.stats.block.number].score / $scope.maxScore >= 0.5 )
				// {
					return parseInt(node.stats.block.number);
				// }

				// return 0;
			}).stats.block.number;

			if( bestBlock !== $scope.bestBlock )
			{
				$scope.bestBlock = bestBlock;
				$scope.bestStats = _.max($scope.nodes, function (node) {
					return parseInt(node.stats.block.number);
				}).stats;

				$scope.lastBlock = $scope.bestStats.block.arrived;
				$scope.lastDifficulty = $scope.bestStats.block.difficulty;
			}
		}
	}

	// function forkFilter(node)
	// {
	// 	if( _.isUndefined(node.readable) )
	// 		node.readable = {};

	// 	node.readable.forkClass = 'hidden';
	// 	node.readable.forkMessage = '';

	// 	return true;

	// 	if( $scope.chains[node.stats.block.number].fork === node.stats.block.fork && $scope.chains[node.stats.block.number].score / $scope.maxScore >= 0.5 )
	// 	{
	// 		node.readable.forkClass = 'hidden';
	// 		node.readable.forkMessage = '';

	// 		return true;
	// 	}

	// 	if( $scope.chains[node.stats.block.number].fork !== node.stats.block.fork )
	// 	{
	// 		node.readable.forkClass = 'text-danger';
	// 		node.readable.forkMessage = 'Wrong chain.<br/>This chain is a fork.';

	// 		return false;
	// 	}

	// 	if( $scope.chains[node.stats.block.number].score / $scope.maxScore < 0.5)
	// 	{
	// 		node.readable.forkClass = 'text-warning';
	// 		node.readable.forkMessage = 'May not be main chain.<br/>Waiting for more confirmations.';

	// 		return false;
	// 	}
	// }

	function latencyFilter(node)
	{
		if( _.isUndefined(node.readable) )
			node.readable = {};

		if( _.isUndefined(node.stats) ) {
			node.readable.latencyClass = 'text-danger';
			node.readable.latency = 'offline';
		}

		if (node.stats.active === false)
		{
			node.readable.latencyClass = 'text-danger';
			node.readable.latency = 'offline';
		}
		else
		{
			if (node.stats.latency <= 100)
				node.readable.latencyClass = 'text-success';

			if (node.stats.latency > 100 && node.stats.latency <= 1000)
				node.readable.latencyClass = 'text-warning';

			if (node.stats.latency > 1000)
				node.readable.latencyClass = 'text-danger';

			node.readable.latency = node.stats.latency + ' ms';
		}
	}

	// very simple xss filter
	function xssFilter(obj){
		if(_.isArray(obj)) {
			return _.map(obj, xssFilter);

		} else if(_.isObject(obj)) {
			return _.mapValues(obj, xssFilter);

		} else if(_.isString(obj)) {
			return obj.replace(/\< *\/* *script *>*/gi,'').replace(/javascript/gi,'');
		} else
			return obj;
	}
});
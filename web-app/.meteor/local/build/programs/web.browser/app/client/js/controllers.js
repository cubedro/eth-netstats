(function(){// Collections

Blockchain = new Mongo.Collection('blockchain', {connection: null});
Nodes = new Mongo.Collection('nodes', {connection: null});
Map = new Mongo.Collection('map', {connection: null});



/* Controllers */


var MAX_BINS = 40;

// Main Stats init
// ---------------

Blockchain.insert({
	_id: 'meta',
	frontierHash: '0x11bbe8db4e347b4e8c937c1c8370e4b5ed33adb3db69cbdb7a38e1e50b1b82fa',
	nodesTotal: 0,
	nodesActive: 0,
	bestBlock: 0,
	lastBlock: 0,
	lastDifficulty: 0,
	upTimeTotal: 0,
	avgBlockTime: 0,
	blockPropagationAvg: 0,
	avgHashrate: 0,
	uncleCount: 0,
	bestStats: {},

	lastBlocksTime: _.fill(Array(MAX_BINS), 2),
	difficultyChart: _.fill(Array(MAX_BINS), 2),
	transactionDensity: _.fill(Array(MAX_BINS), 2),
	gasSpending: _.fill(Array(MAX_BINS), 2),
	miners: [],

	map: [],
	blockPropagationChart: [],
	uncleCountChart: _.fill(Array(MAX_BINS), 2),
	coinbases: [],

	latency: 0,

	currentApiVersion: "0.0.16",

	predicate: localStorage.predicate || ['-pinned', '-stats.active', '-stats.block.number', 'stats.block.propagation'],
	reverse: localStorage.reverse || false,
	pinned: localStorage.pinned || [],

	prefixPredicate: ['-pinned', '-stats.active'],
	originalPredicate: ['-stats.block.number', 'stats.block.propagation']
});


// $scope.orderTable = function(predicate, reverse)
// {
// 	if(!_.isEqual(predicate, $scope.originalPredicate))
// 	{
// 		$scope.reverse = reverse;
// 		$scope.originalPredicate = predicate;
// 		$scope.predicate = _.union($scope.prefixPredicate, predicate);
// 	}
// 	else
// 	{
// 		$scope.reverse = !$scope.reverse;

// 		if($scope.reverse === true){
// 			_.forEach(predicate, function (value, key) {
// 				predicate[key] = (value[0] === '-' ? value.replace('-', '') : '-' + value);
// 			});
// 		}

// 		$scope.predicate = _.union($scope.prefixPredicate, predicate);
// 	}

// 	localStorage.predicate = $scope.predicate;
// 	localStorage.reverse = $scope.reverse;
// }

// $scope.pinNode = function(id)
// {
// 	index = findIndex({id: id});

// 	if( !_.isUndefined($scope.nodes[index]) )
// 	{
// 		$scope.nodes[index].pinned = !$scope.nodes[index].pinned;

// 		if($scope.nodes[index].pinned)
// 		{
// 			$scope.pinned.push(id);
// 		}
// 		else
// 		{
// 			$scope.pinned.splice($scope.pinned.indexOf(id), 1);
// 		}
// 	}

// 	localStorage.pinned = $scope.pinned;
// }

// var timeout = setInterval(function ()
// {
// 	$scope.$apply();
// }, 300);

// $scope.getNumber = function (num) {
// 	return new Array(num);
// }

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
	_.each(data.nodes, function(node){
		Nodes.upsert(node.id, socketAction('init', node));

		addToMap(node);
	});
});

socket.on('client-latency', function(data)
{
	Blockchain.update('meta', {$set: {
		latency: data.latency
	}});
})

function socketAction(action, data)
{
	// console.log('Action: ', action);
	// console.log('Data: ', data);

	switch(action)
	{
		case "init":
			var node = data;

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
			node.pinned = (Blockchain.findOne().pinned.indexOf(node.id) >= 0 ? true : false);

			if( Nodes.find().count() > 0 )
			{
				toastr['success']("Got nodes list", "Got nodes!");

				updateActiveNodes();
			}

			return node;

		case "add":

			if( addNewNode(data) )
				toastr['success']("New node "+ Nodes.findOne(data.id).info.name +" connected!", "New node!");
			else
				toastr['info']("Node "+ Nodes.findOne(data.id).info.name +" reconnected!", "Node is back!");

			break;

		// TODO: Remove when everybody updates api client to 0.0.12
		case "update":
			var foundNode = Nodes.findOne(data.id);

			if( foundNode && !_.isUndefined(foundNode.stats) )
			{
				if( !_.isUndefined(foundNode.stats.latency) )
					data.stats.latency = foundNode.stats.latency;

				if( _.isUndefined(data.stats.hashrate) )
					data.stats.hashrate = 0;

				if( foundNode.stats.block.number < data.stats.block.number )
				{

					var best =  Nodes.findOne({},{sort: {'stats.block.number': -1}});

					if(best) {
						if (data.block.number > best.stats.block.number) {
							data.block.arrived = _.now();
						} else {
							data.block.arrived = best.stats.block.arrived;
						}
					}


					foundNode.history = data.history;
				}

				foundNode.stats = data.stats;
				foundNode.stats.block = data.block; // necessary?

				if( !_.isUndefined(data.stats.latency) && _.get(foundNode, 'stats.latency', 0) !== data.stats.latency )
				{
					foundNode.stats.latency = data.stats.latency;

					latencyFilter(foundNode);
				}

				Nodes.update(data.id, foundNode);

				updateBestBlock();
			}

			break;

		case "block":
			var foundNode = Nodes.findOne(data.id);
			if( foundNode && foundNode.stats )
			{
				var set = {};

				if( foundNode.stats.block.number < data.block.number )
				{
					var best =  Nodes.findOne({},{sort: {'stats.block.number': -1}});

					if(best) {
						if (data.block.number > best.stats.block.number) {
							data.block.arrived = _.now();
						} else {
							data.block.arrived = best.stats.block.arrived;
						}
					}

					set.history = data.history;
				}

				set['stats.block'] = data.block;
				set['stats.propagationAvg'] = data.propagationAvg;

				Nodes.update('meta', {$set: set});

				updateBestBlock();
			}

			break;

		case "pending":
			var foundNode = Nodes.findOne(data.id);

			if( !_.isUndefined(data.id) && foundNode )
			{

				if( !_.isUndefined(foundNode) && !_.isUndefined(foundNode.stats.pending) && !_.isUndefined(data.pending) )
					Nodes.update(data.id, {$set: {
						'stats.pending': data.pending
					}});
			}

			break;

		case "stats":
			var foundNode = Nodes.findOne(data.id);

			if( !_.isUndefined(data.id) && foundNode )
			{

				if( !_.isUndefined(foundNode) && !_.isUndefined(foundNode.stats) )
				{
					Nodes.update(foundNode._id, {$set:{
						'stats.active': data.stats.active,
						'stats.mining': data.stats.mining,
						'stats.hashrate': data.stats.hashrate,
						'stats.peers': data.stats.peers,
						'stats.gasPrice': data.stats.gasPrice,
						'stats.uptime': data.stats.uptime
					}});

					if( !_.isUndefined(data.stats.latency) && _.get(foundNode, 'stats.latency', 0) !== data.stats.latency )
					{
						Nodes.update(foundNode._id, {$set:{
							'stats.latency': data.stats.latency
						}});

						latencyFilter(foundNode);
					}

					updateActiveNodes();
				}
			}

			break;

		case "info":
			var foundNode = Nodes.findOne(data.id);

			if( foundNode )
			{
				var set = {};

				set.info = data.info;

				if( _.isUndefined(foundNode.pinned) )
					set.pinned = false;

				Nodes.update(data.id, {$set: set});

				// Init latency
				latencyFilter(foundNode);

				updateActiveNodes();
			}

			break;

		case "blockPropagationChart":
			Blockchain.update('meta', {$set:{
				blockPropagationChart: data.histogram,
				blockPropagationAvg: data.avg
			}});

			break;

		case "uncleCount":
			Blockchain.update('meta', {$set:{
				uncleCount: data[0] + data[1],
				uncleCountChart: (function(){
					data.reverse();
					return data;
				})()
			}});

			break;

		case "charts":
			var meta = Blockchain.findOne('meta');

			if( !_.isEqual(meta.avgBlockTime, data.avgBlocktime) )
				meta.avgBlockTime = data.avgBlocktime;

			if( !_.isEqual(meta.avgHashrate, data.avgHashrate) )
				meta.avgHashrate = data.avgHashrate;

			if( !_.isEqual(meta.lastBlocksTime, data.blocktime) && data.blocktime.length >= MAX_BINS )
				meta.lastBlocksTime = data.blocktime;

			if( !_.isEqual(meta.difficultyChart, data.difficulty) && data.difficulty.length >= MAX_BINS )
				meta.difficultyChart = data.difficulty;

			if( !_.isEqual(meta.blockPropagationChart, data.propagation.histogram) ) {
				meta.blockPropagationChart = data.propagation.histogram;
				meta.blockPropagationAvg = data.propagation.avg;
			}

			data.uncleCount.reverse();

			if( !_.isEqual(meta.uncleCountChart, data.uncleCount) && data.uncleCount.length >= MAX_BINS ) {
				meta.uncleCount = data.uncleCount[data.uncleCount.length-2] + data.uncleCount[data.uncleCount.length-1];
				meta.uncleCountChart = data.uncleCount;
			}

			if( !_.isEqual(meta.transactionDensity, data.transactions) && data.transactions.length >= MAX_BINS )
				meta.transactionDensity = data.transactions;

			if( !_.isEqual(meta.gasSpending, data.gasSpending) && data.gasSpending.length >= MAX_BINS )
				meta.gasSpending = data.gasSpending;

			if( !_.isEqual(meta.miners, data.miners) ) {
				meta.miners = data.miners;
				getMinersNames(meta);
			}

			// update
			delete meta._id;
			Blockchain.update('meta', {$set: meta});

			break;

		case "inactive":
			var foundNode = Nodes.findOne(data.id);

			if( foundNode )
			{
				if( !_.isUndefined(data.stats) ) {
					Nodes.update(data.id, {$set: {
						stats: data.stats
					}});
				}

				toastr['error']("Node "+ foundNode.info.name +" went away!", "Node connection was lost!");

				updateActiveNodes();
			}

			break;

		case "latency":
			if( !_.isUndefined(data.id) && !_.isUndefined(data.latency) )
			{
				var foundNode = Nodes.findOne(data.id);

				if( foundNode )
				{

					if( !_.isUndefined(foundNode) && !_.isUndefined(foundNode.stats) && !_.isUndefined(foundNode.stats.latency) && foundNode.stats.latency !== data.latency )
					{
						Nodes.update(data.id, {$set: {
							'stats.latency': data.latency
						}});

						latencyFilter(foundNode);
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


function getMinersNames(meta)
{
	if( meta.miners.length > 0 )
	{
		_.forIn(meta.miners, function (value, key)
		{
			if(value.name !== false)
				return;

			if(value.miner === "0x0000000000000000000000000000000000000000")
				return;

			if(miner = Nodes.findOne({'info.coinbase': value.miner}))
				var name = miner.info.name;

			if( !_.isUndefined(name) ) {
				meta.miners[key].name = name;
			}
		});
	}

	return meta;
}

function addNewNode(data)
{
	var foundNode = Nodes.findOne(data.id);

	if( _.isUndefined(data.history) )
	{
		data.history = new Array(40);
		_.fill(data.history, -1);
	}


	data.pinned = ( !_.isUndefined(foundNode.pinned) ? foundNode.pinned : false);

	if( !_.isUndefined(foundNode.history) )
	{
		data.history = foundNode.history;
	}

	// update node
	Nodes.upsert(data.id, {$set: data});

	addToMap(data);

	updateActiveNodes();

	return false;
}

function addToMap(data) {
	// add to map
	var bestblock = Blockchain.findOne().bestBlock;

	if(!Map.findOne(data.id) && data.geo != null)
		Map.insert({
			_id: data.id,
			radius: 3,
			latitude: data.geo.ll[0],
			longitude: data.geo.ll[1],
			nodeName: data.info.name,
			fillClass: mainClass(data.stats, bestblock),
			fillKey: mainClass(data.stats, bestblock).replace('text-', ''),
		});
}

function updateActiveNodes()
{
	updateBestBlock();

	var nodesTotal = Nodes.find().count(),
		nodesActive = 0,
		upTimeTotal = 0;

	// iterate over all nodes to get the correct data
	_.each(Nodes.find().fetch(), function(node){

		if(node.stats) {
			if(node.stats.active)
				nodesActive++

			upTimeTotal += node.stats.uptime;
		}
	});

	Blockchain.update('meta', {$set: {

		nodesTotal: nodesTotal,
		nodesActive: nodesActive,
		upTimeTotal: upTimeTotal / nodesTotal
	}});
}

function updateBestBlock()
{
	if( Nodes.find().count() )
	{
		// var chains = {};
		// var maxScore = 0;

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

		var bestBlock =  Nodes.findOne({'stats.block.number': {$exists: true}},{sort: {'stats.block.number': -1}});
		if( bestBlock && bestBlock.stats.block.number !== Blockchain.findOne().bestBlock )
		{
console.log('bestblock', bestBlock.stats.block.number);

			Blockchain.update('meta', {$set: {
				bestBlock: bestBlock.stats.block.number,
				bestStats: bestBlock.stats,
				lastBlock: bestBlock.stats.block.arrived,
				lastDifficulty: bestBlock.stats.block.difficulty
			}});
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
	// var set = {};
	// if( _.isUndefined(node.readable) )
	// 	set['node.readable'] = {};

	// if( _.isUndefined(node.stats) ) {
	// 	set['readable.latencyClass'] = 'text-danger';
	// 	set['readable.latency'] = 'offline';
	// }

	// if (node.stats.active === false)
	// {
	// 	set['readable.latencyClass'] = 'text-danger';
	// 	set['readable.latency'] = 'offline';
	// }
	// else
	// {
	// 	if (node.stats.latency <= 100)
	// 		set['readable.latencyClass'] = 'text-success';

	// 	if (node.stats.latency > 100 && node.stats.latency <= 1000)
	// 		set['readable.latencyClass'] = 'text-warning';

	// 	if (node.stats.latency > 1000)
	// 		set['readable.latencyClass'] = 'text-danger';

	// 	set['readable.latency'] = node.stats.latency + ' ms';
	// }

	// // update node
	// Nodes.upsert(node.id, {$set: set});
}

})();

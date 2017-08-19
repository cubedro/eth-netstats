var _ = require('lodash');
var d3 = require('d3');

var MAX_HISTORY = 2000;

var MAX_PEER_PROPAGATION = 40;
var MIN_PROPAGATION_RANGE = 0;
var MAX_PROPAGATION_RANGE = 10000;

var MAX_UNCLES = 1000;
var MAX_UNCLES_PER_BIN = 25;
var MAX_BINS = 40;

var History = function History(data)
{
	this._items = [];
	this._callback = null;
}

History.prototype.add = function(block, id, trusted, addingHistory)
{
	var changed = false;

	if( !_.isUndefined(block) && !_.isUndefined(block.number) && !_.isUndefined(block.uncles) && !_.isUndefined(block.transactions) && !_.isUndefined(block.difficulty) && block.number > 0 )
	{
		trusted = (process.env.LITE === 'true' ? true : trusted);
		var historyBlock = this.search(block.number);
		var forkIndex = -1;

		var now = _.now();

		block.trusted = trusted;
		block.arrived = now;
		block.received = now;
		block.propagation = 0;
		block.fork = 0;

		if( historyBlock )
		{
			// We already have a block with this height in collection

			// Check if node already checked this block height
			var propIndex = _.findIndex( historyBlock.propagTimes, { node: id } );

			// Check if node already check a fork with this height
			forkIndex = compareForks(historyBlock, block);

			if( propIndex === -1 )
			{
				// Node didn't submit this block before
				if( forkIndex >= 0 && !_.isUndefined(historyBlock.forks[forkIndex]) )
				{
					// Found fork => update data
					block.arrived = historyBlock.forks[forkIndex].arrived;
					block.propagation = now - historyBlock.forks[forkIndex].received;
				}
				else
				{
					// No fork found => add a new one
					var prevBlock = this.prevMaxBlock(block.number);

					if( prevBlock )
					{
						block.time = Math.max(block.arrived - prevBlock.block.arrived, 0);

						if(block.number < this.bestBlock().height)
							block.time = Math.max((block.timestamp - prevBlock.block.timestamp) * 1000, 0);
					}
					else
					{
						block.time = 0;
					}

					forkIndex = historyBlock.forks.push(block) - 1;
					historyBlock.forks[forkIndex].fork = forkIndex;
				}

				// Push propagation time
				historyBlock.propagTimes.push({
					node: id,
					trusted: trusted,
					fork: forkIndex,
					received: now,
					propagation: block.propagation
				});
			}
			else
			{
				// Node submited the block before
				if( forkIndex >= 0 && !_.isUndefined(historyBlock.forks[forkIndex]) )
				{
					// Matching fork found => update data
					block.arrived = historyBlock.forks[forkIndex].arrived;

					if( forkIndex === historyBlock.propagTimes[propIndex].fork )
					{
						// Fork index is the same
						block.received = historyBlock.propagTimes[propIndex].received;
						block.propagation = historyBlock.propagTimes[propIndex].propagation;
					}
					else
					{
						// Fork index is different
						historyBlock.propagTimes[propIndex].fork = forkIndex;
						historyBlock.propagTimes[propIndex].propagation = block.propagation = now - historyBlock.forks[forkIndex].received;
					}

				}
				else
				{
					// No matching fork found => replace old one
					block.received = historyBlock.propagTimes[propIndex].received;
					block.propagation = historyBlock.propagTimes[propIndex].propagation;

					var prevBlock = this.prevMaxBlock(block.number);

					if( prevBlock )
					{
						block.time = Math.max(block.arrived - prevBlock.block.arrived, 0);

						if(block.number < this.bestBlock().height)
							block.time = Math.max((block.timestamp - prevBlock.block.timestamp) * 1000, 0);
					}
					else
					{
						block.time = 0;
					}

					forkIndex = historyBlock.forks.push(block) - 1;
					historyBlock.forks[forkIndex].fork = forkIndex;
				}
			}

			if( trusted && !compareBlocks(historyBlock.block, historyBlock.forks[forkIndex]) )
			{
				// If source is trusted update the main block
				historyBlock.forks[forkIndex].trusted = trusted;
				historyBlock.block = historyBlock.forks[forkIndex];
			}

			block.fork = forkIndex;

			changed = true;

		}
		else
		{
			// Couldn't find block with this height

			// Getting previous max block
			var prevBlock = this.prevMaxBlock(block.number);

			if( prevBlock )
			{
				block.time = Math.max(block.arrived - prevBlock.block.arrived, 0);

				if(block.number < this.bestBlock().height)
					block.time = Math.max((block.timestamp - prevBlock.block.timestamp) * 1000, 0);
			}
			else
			{
				block.time = 0;
			}

			var item = {
				height: block.number,
				block: block,
				forks: [block],
				propagTimes: []
			}

			if( this._items.length === 0 || (this._items.length === MAX_HISTORY && block.number > this.worstBlockNumber()) || (this._items.length < MAX_HISTORY && block.number < this.bestBlockNumber() && addingHistory) )
			{
				item.propagTimes.push({
					node: id,
					trusted: trusted,
					fork: 0,
					received: now,
					propagation: block.propagation
				});

				this._save(item);

				changed = true;
			}
		}

		return {
			block: block,
			changed: changed
		};
	}

	return false;
}

function compareBlocks(block1, block2)
{
	if( block1.hash 				!== block2.hash ||
		block1.parentHash 			!== block2.parentHash ||
		block1.sha3Uncles 			!== block2.sha3Uncles ||
		block1.transactionsRoot 	!== block2.transactionsRoot ||
		block1.stateRoot 			!== block2.stateRoot ||
		block1.miner 				!== block2.miner ||
		block1.difficulty 			!== block2.difficulty ||
		block1.totalDifficulty 		!== block2.totalDifficulty)
		return false;

	return true;
}

function compareForks(historyBlock, block2)
{
	if( _.isUndefined(historyBlock) )
		return -1;

	if( _.isUndefined(historyBlock.forks) || historyBlock.forks.length === 0 )
		return -1;

	for(var x = 0; x < historyBlock.forks.length; x++)
		if(compareBlocks(historyBlock.forks[x], block2))
			return x;

	return -1;
}

History.prototype._save = function(block)
{
	this._items.unshift(block);

	this._items = _.sortByOrder( this._items, 'height', false );

	if(this._items.length > MAX_HISTORY)
	{
		this._items.pop();
	}
}

History.prototype.clean = function(max)
{
	if(max > 0 && this._items.length > 0 && max < this.bestBlockNumber())
	{
		console.log("MAX:", max);

		console.log("History items before:", this._items.length);

		this._items = _(this._items).filter(function(item) {
			return (item.height <= max && item.block.trusted === false);
		}).value();

		console.log("History items after:", this._items.length);
	}
}

History.prototype.search = function(number)
{
	var index = _.findIndex( this._items, { height: number } );

	if(index < 0)
		return false;

	return this._items[index];
}

History.prototype.prevMaxBlock = function(number)
{
	var index = _.findIndex(this._items, function (item) {
		return item.height < number;
	});

	if(index < 0)
		return false;

	return this._items[index];
}

History.prototype.bestBlock = function()
{
	return _.max(this._items, 'height');
}

History.prototype.bestBlockNumber = function()
{
	var best = this.bestBlock();

	if( !_.isUndefined(best.height) )
		return best.height;

	return 0;
}

History.prototype.worstBlock = function()
{
	return _.min(this._items, 'height');
}

History.prototype.worstBlockNumber = function(trusted)
{
	var worst = this.worstBlock();

	if( !_.isUndefined(worst.height) )
		return worst.height;

	return 0;
}


History.prototype.getNodePropagation = function(id)
{
	var propagation = new Array( MAX_PEER_PROPAGATION );
	var bestBlock = this.bestBlockNumber();
	var lastBlocktime = _.now();

	_.fill(propagation, -1);

	var sorted = _( this._items )
		.sortByOrder( 'height', false )
		.slice( 0, MAX_PEER_PROPAGATION )
		.forEach(function (item, key)
		{
			var index = MAX_PEER_PROPAGATION - 1 - bestBlock + item.height;

			if(index >= 0)
			{
				var tmpPropagation = _.result(_.find(item.propagTimes, 'node', id), 'propagation', false);

				if (_.result(_.find(item.propagTimes, 'node', id), 'propagation', false) !== false)
				{
					propagation[index] = tmpPropagation;
					lastBlocktime = item.block.arrived;
				}
				else
				{
					propagation[index] = Math.max(0, lastBlocktime - item.block.arrived);
				}
			}
		})
		.reverse()
		.value();

	return propagation;
}

History.prototype.getBlockPropagation = function()
{
	var propagation = [];
	var avgPropagation = 0;

	_.forEach(this._items, function (n, key)
	{
		_.forEach(n.propagTimes, function (p, i)
		{
			var prop = Math.min(MAX_PROPAGATION_RANGE, _.result(p, 'propagation', -1));

			if(prop >= 0)
				propagation.push(prop);
		});
	});

	if(propagation.length > 0)
	{
		var avgPropagation = Math.round( _.sum(propagation) / propagation.length );
	}

	var data = d3.layout.histogram()
		.frequency( false )
		.range([ MIN_PROPAGATION_RANGE, MAX_PROPAGATION_RANGE ])
		.bins( MAX_BINS )
		( propagation );

	var freqCum = 0;
	var histogram = data.map(function (val) {
		freqCum += val.length;
		var cumPercent = ( freqCum / Math.max(1, propagation.length) );

		return {
			x: val.x,
			dx: val.dx,
			y: val.y,
			frequency: val.length,
			cumulative: freqCum,
			cumpercent: cumPercent
		};
	});

	return {
		histogram: histogram,
		avg: avgPropagation
	};
}

History.prototype.getUncleCount = function()
{
	var uncles = _( this._items )
		.sortByOrder( 'height', false )
		// .filter(function (item)
		// {
		// 	return item.block.trusted;
		// })
		.slice(0, MAX_UNCLES)
		.map(function (item)
		{
			return item.block.uncles.length;
		})
		.value();

	var uncleBins = _.fill( Array(MAX_BINS), 0 );

	var sumMapper = function (array, key)
	{
		uncleBins[key] = _.sum(array);
		return _.sum(array);
	};

	_.map(_.chunk( uncles, MAX_UNCLES_PER_BIN ), sumMapper);

	return uncleBins;
}

History.prototype.getBlockTimes = function()
{
	var blockTimes = _( this._items )
		.sortByOrder( 'height', false )
		// .filter(function (item)
		// {
			// return item.block.trusted;
		// })
		.slice(0, MAX_BINS)
		.reverse()
		.map(function (item)
		{
			return item.block.time / 1000;
		})
		.value();

	return blockTimes;
}

History.prototype.getAvgBlocktime = function()
{
	var blockTimes = _( this._items )
		.sortByOrder( 'height', false )
		// .filter(function (item)
		// {
			// return item.block.trusted;
		// })
		// .slice(0, MAX_BINS)
		.reverse()
		.map(function (item)
		{
			return item.block.time / 1000;
		})
		.value();

	return _.sum(blockTimes) / (blockTimes.length === 0 ? 1 : blockTimes.length);
}

History.prototype.getGasLimit = function()
{
	var gasLimitHistory = _( this._items )
		.sortByOrder( 'height', false )
		// .filter(function (item)
		// {
		// 	return item.block.trusted;
		// })
		.slice(0, MAX_BINS)
		.reverse()
		.map(function (item)
		{
			return item.block.gasLimit;
		})
		.value();

	return gasLimitHistory;
}

History.prototype.getDifficulty = function()
{
	var difficultyHistory = _( this._items )
		.sortByOrder( 'height', false )
		.filter(function (item)
		{
			return item.block.trusted;
		})
		.slice(0, MAX_BINS)
		.reverse()
		.map(function (item)
		{
			return item.block.difficulty;
		})
		.value();

	return difficultyHistory;
}

History.prototype.getTransactionsCount = function()
{
	var txCount = _( this._items )
		.sortByOrder( 'height', false )
		.filter(function (item)
		{
			return item.block.trusted;
		})
		.slice(0, MAX_BINS)
		.reverse()
		.map(function (item)
		{
			return item.block.transactions.length;
		})
		.value();

	return txCount;
}

History.prototype.getGasSpending = function()
{
	var gasSpending = _( this._items )
		.sortByOrder( 'height', false )
		.filter(function (item)
		{
			return item.block.trusted;
		})
		.slice(0, MAX_BINS)
		.reverse()
		.map(function (item)
		{
			return item.block.gasUsed;
		})
		.value();

	return gasSpending;
}

History.prototype.getAvgHashrate = function()
{
	if( _.isEmpty(this._items) )
		return 0;

	var blocktimeHistory = _( this._items )
		.sortByOrder( 'height', false )
		// .filter(function (item)
		// {
		// 	return item.block.trusted;
		// })
		.slice(0, 64)
		.map(function (item)
		{
			return item.block.time;
		})
		.value();

	var avgBlocktime = (_.sum(blocktimeHistory) / blocktimeHistory.length)/1000;

	return this.bestBlock().block.difficulty / avgBlocktime;
}

History.prototype.getMinersCount = function()
{
	var miners = _( this._items )
		.sortByOrder( 'height', false )
		// .filter(function (item)
		// {
		// 	return item.block.trusted;
		// })
		.slice(0, MAX_BINS)
		.map(function (item)
		{
			return item.block.miner;
		})
		.value();

	var minerCount = [];

	_.forEach( _.countBy(miners), function (cnt, miner)
	{
		minerCount.push({ miner: miner, name: false, blocks: cnt });
	});

	return _(minerCount)
		.sortByOrder( 'blocks', false )
		.slice(0, 2)
		.value();
}

History.prototype.setCallback = function(callback)
{
	this._callback = callback;
}

History.prototype.getCharts = function()
{
	if(this._callback !== null)
	{
		var chartHistory = _( this._items )
			.sortByOrder( 'height', false )
			// .filter(function (item)
			// {
			// 	return item.block.trusted;
			// })
			.slice(0, MAX_BINS)
			.reverse()
			.map(function (item)
			{
				return {
					height: item.height,
					blocktime: item.block.time / 1000,
					difficulty: item.block.difficulty,
					uncles: item.block.uncles.length,
					transactions: item.block.transactions.length,
					gasSpending: item.block.gasUsed,
					gasLimit: item.block.gasLimit,
					miner: item.block.miner
				};
			})
			.value();

		this._callback(null, {
			height : _.pluck( chartHistory, 'height' ),
			blocktime : _.pluck( chartHistory, 'blocktime' ),
			// avgBlocktime : _.sum(_.pluck( chartHistory, 'blocktime' )) / (chartHistory.length === 0 ? 1 : chartHistory.length),
			avgBlocktime : this.getAvgBlocktime(),
			difficulty : _.pluck( chartHistory, 'difficulty' ),
			uncles : _.pluck( chartHistory, 'uncles' ),
			transactions : _.pluck( chartHistory, 'transactions' ),
			gasSpending : _.pluck( chartHistory, 'gasSpending' ),
			gasLimit : _.pluck( chartHistory, 'gasLimit' ),
			miners : this.getMinersCount(),
			propagation : this.getBlockPropagation(),
			uncleCount : this.getUncleCount(),
			avgHashrate : this.getAvgHashrate()
		});
	}
}

History.prototype.requiresUpdate = function()
{
	// return ( this._items.length < MAX_HISTORY && !_.isEmpty(this._items) );
	return ( this._items.length < MAX_HISTORY );
}

History.prototype.getHistoryRequestRange = function()
{
	if( this._items.length < 2 )
		return false;

	var blocks = _.pluck( this._items, 'height' );
	var best = _.max( blocks );
	var range = _.range( _.max([ 0, best - MAX_HISTORY ]), best + 1);

	var missing = _.difference( range, blocks );

	var max = _.max(missing);
	var min = max - Math.min( 50, (MAX_HISTORY - this._items.length + 1) ) + 1;

	return {
		max: max,
		min: min,
		list: _( missing ).reverse().slice(0, 50).reverse().value()
	};
}

module.exports = History;

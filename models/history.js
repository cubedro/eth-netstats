var _ = require('lodash');

var MAX_HISTORY = 1008;
var MAX_PEER_PROPAGATION = 36;
var MAX_BLOCK_PROPAGATION = 96;
var MIN_PROPAGATION_RANGE = 1;
var MAX_PROPAGATION_RANGE = 20000;
var MAX_BINS = 40;

var History = function History(data)
{
	this._items = [];

	var item = {
		height: 0,
		block: {
			number: 0,
			hash: '0x?',
			arrived: 0,
			received: 0,
			propagation: 0,
			difficulty: 0,
			gasUsed: 0,
			transactions: [],
			uncles: []
		},
		propagTimes: []
	};
}

History.prototype.add = function(block, id)
{
	var historyBlock = this.search(block.number);

	var now = (new Date()).getTime();
	block.arrived = now;
	block.received = now;
	block.propagation = 0;

	if(historyBlock)
	{
		var propIndex = _.findIndex(historyBlock.propagTimes, {node: id});

		if(propIndex === -1)
		{
			block.arrived = historyBlock.block.arrived;
			block.received = now;
			block.propagation = now - historyBlock.block.received;

			historyBlock.propagTimes.push({node: id, received: now, propagation: block.propagation});
		}
		else
		{
			block.arrived = historyBlock.block.arrived;
			block.received = historyBlock.propagTimes[propIndex].received;
			block.propagation = historyBlock.propagTimes[propIndex].propagation;
		}
	}
	else
	{
		var item = {
			height: block.number,
			block: block,
			propagTimes: []
		}

		item.propagTimes.push({node: id, received: now, propagation: block.propagation});
		console.log('item: ', item);
		this._save(item);
	}
	this.getNodePropagation(id);

	return block;
}

History.prototype._save = function(block)
{
	this._items.push(block);

	if(this._items.length > MAX_HISTORY){
		this._items.shift();
	}
}

History.prototype.search = function(number)
{
	var index = _.findIndex(this._items, {height: number});

	if(index < 0)
		return false;

	return this._items[index];
}

History.prototype.bestBlock = function(obj)
{
	return _.max(this._items, 'height');
}

History.prototype.getNodePropagation = function(id)
{
	var propagation = new Array(MAX_PEER_PROPAGATION);
	var bestBlock = this.bestBlock().height;


	_.fill(propagation, -1);

	var sorted = _(this._items)
		.sortByOrder('height', false)
		.slice(0, MAX_PEER_PROPAGATION)
		.reverse()
		.forEach(function(n, key)
		{
			var index = MAX_PEER_PROPAGATION - 1 - bestBlock + n.height;


			if(index > 0)
			{
				propagation[index] = _.result(_.find(n.propagTimes, 'node', id), 'propagation', -1);
			}
		})
		.value();

	return propagation;
}

History.prototype.getBlockPropagation = function()
{
	var propagation = [];

	var sorted = _(this._items)
		.sortByOrder('height', false)
		.slice(0, MAX_BLOCK_PROPAGATION)
		.reverse()
		.forEach(function(n, key)
		{
			_.forEach(n.propagTimes, function(p, i)
			{
				var prop = _.result(p, 'propagation', -1);

				if(prop >= 0)
					propagation.push(prop);
			});
		})
		.value();

	return propagation;
}

History.prototype.history = function()
{
	return _.chain(this._items).sortBy('number').reverse().value();
}

module.exports = History;

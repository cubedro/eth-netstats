var _ = require('lodash');
var Blockchain = require('./history');
var Node = require('./node');

var Collection = function Collection()
{
	this._items = [];
	this._blockchain = new Blockchain();

	return this;
}

Collection.prototype.add = function(data)
{
	var node = this.getNodeOrNew({ id : data.id }, data);
	node.setInfo(data);

	return node.getInfo();
}

Collection.prototype.update = function(id, stats)
{
	var node = this.getNode({ id: id });

	if (!node)
		return false;

	var block = this._blockchain.add(stats.block, id);

	if (!block)
		return false;

	var propagationHistory = this._blockchain.getNodePropagation(id);

	stats.block.arrived = block.arrived;
	stats.block.received = block.received;
	stats.block.propagation = block.propagation;

	return node.setStats(stats, propagationHistory);
}

Collection.prototype.addBlock = function(id, block)
{
	var node = this.getNode({ id: id });

	if (!node)
		return false;

	var block = this._blockchain.add(block, id);

	if (!block)
		return false;

	var propagationHistory = this._blockchain.getNodePropagation(id);

	block.arrived = block.arrived;
	block.received = block.received;
	block.propagation = block.propagation;

	return node.setBlock(block, propagationHistory);
}

Collection.prototype.updatePending = function(id, stats)
{
	var node = this.getNode({ id: id });

	if (!node)
		return false;

	return node.setPending(stats);
}

Collection.prototype.addHistory = function(id, blocks)
{
	var node = this.getNode({ id: id });

	if (!node)
		return false;

	blocks = blocks.reverse();

	for (var i = 0; i <= blocks.length - 1; i++)
	{
		this._blockchain.add(blocks[i], id);
	};

	return this.getCharts();
}

Collection.prototype.updateLatency = function(id, latency)
{
	var node = this.getNode({ id: id });

	if (!node)
		return false;

	return node.setLatency(latency);
}

Collection.prototype.inactive = function(id)
{
	var node = this.getNode({ spark: id });

	if (!node)
		return false;

	node.setState(false);

	return node.getStats();
}

Collection.prototype.getIndex = function(search)
{
	return _.findIndex(this._items, search);
}

Collection.prototype.getNode = function(search)
{
	var index = this.getIndex(search);

	if(index >= 0)
		return this._items[index];

	return false;
}

Collection.prototype.getNodeByIndex = function(index)
{
	if(this._items[index])
		return this._items[index];

	return false;
}

Collection.prototype.getIndexOrNew = function(search, data)
{
	var index = this.getIndex(search);

	return (index >= 0 ? index : this._items.push(new Node(data)) - 1);
}

Collection.prototype.getNodeOrNew = function(search, data)
{
	return this.getNodeByIndex(this.getIndexOrNew(search, data));
}

Collection.prototype.all = function()
{
	this.removeOldNodes();

	return this._items;
}

Collection.prototype.removeOldNodes = function()
{
	var deleteList = []

	for(var i = this._items.length - 1; i >= 0; i--)
	{
		var node = this._items[i];

		if( node.isInactiveAndOld() )
		{
			deleteList.push(i);
		}
	}

	if(deleteList.length > 0)
	{
		for(var i = 0; i < deleteList.length; i++)
		{
			this._items.splice(deleteList[i], 1);
		}
	}
}

Collection.prototype.blockPropagationChart = function()
{
	return this._blockchain.getBlockPropagation();
}

Collection.prototype.getUncleCount = function()
{
	return this._blockchain.getUncleCount();
}

Collection.prototype.getCharts = function()
{
	return this._blockchain.getCharts();
}

Collection.prototype.getHistory = function()
{
	return this._blockchain;
}

Collection.prototype.canNodeUpdate = function(id)
{
	var node = this.getNode({id: id});

	if(!node)
		return false;

	if(node.canUpdate())
	{
		var diff = this._blockchain.bestBlockNumber() - node.getBlockNumber();

		return (diff <= 0);
	}

	return false;
}

Collection.prototype.requiresUpdate = function(id)
{
	return ( this.canNodeUpdate(id) && this._blockchain.requiresUpdate() );
}

module.exports = Collection;

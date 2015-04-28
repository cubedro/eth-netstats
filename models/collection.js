var _ = require('lodash');
var Blockchain = require('./history');
var Node = require('./node');

var Collection = function Collection()
{
	this._list = [];
	this._history = new Blockchain();
	this._bestBlock = null;

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

	if(!node)
		return false;

	var block = this._history.add(stats.block, id);

	if(! block)
		return false;

	var propagationHistory = this._history.getNodePropagation(id);

	stats.block.arrived = block.arrived;
	stats.block.received = block.received;
	stats.block.propagation = block.propagation;

	return node.setStats(stats, propagationHistory);
}

Collection.prototype.addHistory = function(id, blocks)
{
	var node = this.getNode({ id: id });

	if(!node)
		return false;

	for (var i = blocks.length - 1; i >= 0; i--) {
		this._history.add(blocks[i], id);
	};

	return this.getCharts();
}

Collection.prototype.updateLatency = function(id, latency)
{
	var node = this.getNode({ id: id });

	if(!node)
		return false;

	return node.setLatency(latency);
}

Collection.prototype.inactive = function(id)
{
	var node = this.getNode({ spark: id });

	if(!node)
		return false;

	node.setState(false);

	return node.getStats();
}

Collection.prototype.getIndex = function(search)
{
	return _.findIndex(this._list, search);
}

Collection.prototype.getNode = function(search)
{
	var index = this.getIndex(search);

	if(index >= 0)
		return this._list[index];

	return false;
}

Collection.prototype.getNodeByIndex = function(index)
{
	if(this._list[index])
		return this._list[index];

	return false;
}

Collection.prototype.getIndexOrNew = function(search, data)
{
	var index = this.getIndex(search);

	return (index >= 0 ? index : this._list.push(new Node(data)) - 1);
}

Collection.prototype.getNodeOrNew = function(search, data)
{
	return this.getNodeByIndex(this.getIndexOrNew(search, data));
}

Collection.prototype.all = function()
{
	return this._list;
}

Collection.prototype.blockPropagationChart = function()
{
	return this._history.getBlockPropagation();
}

Collection.prototype.getUncleCount = function()
{
	return this._history.getUncleCount();
}

Collection.prototype.getCharts = function()
{
	return this._history.getCharts();
}

Collection.prototype.getHistory = function()
{
	return this._history;
}

Collection.prototype.canNodeUpdate = function(id)
{
	var node = this.getNode({id: id});

	if(!node)
		return false;

	if(node.canUpdate())
	{
		var diff = this._history.bestBlockNumber() - node.getBlockNumber();

		if(diff <= 0)
			return true;
	}

	return false;
}

module.exports = Collection;
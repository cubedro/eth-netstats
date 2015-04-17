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
	var propagationHistory = this._history.getNodePropagation(id);

	stats.block.arrived = block.arrived;
	stats.block.received = block.received;
	stats.block.propagation = block.propagation;

	return node.setStats(stats, propagationHistory);
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

module.exports = Collection;
var _ = require('lodash');
var Node = require('./node');

var Collection = function Collection()
{
	this._list = [];

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

	return node.setStats(stats);
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

module.exports = Collection;
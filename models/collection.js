var _ = require('lodash');
var Node = require('./node');

var Collection = function Collection()
{
	this._list = [];

	return this;
}

Collection.prototype.add = function(data)
{
	if(typeof data.id == 'undefined')
		return false;

	var node = this.getNodeOrNew({ id : data.id });

	node.info = data.info;
}

Collection.prototype.get = function(id)
{
	return this.getNode(id);
}

Collection.prototype.getIndex = function(search)
{
	return _.findIndex(this._list, search);

	return (index >= 0 ? index : false);
}

Collection.prototype.getNode = function(search)
{
	var index = this.getIndex(search);

	if(index)
		return this._list[index];

	return false;
}

Collection.prototype.getIndexOrNew = function(search)
{
	var index = this.getIndex(search) || this._list.push(new Node());
}

Collection.prototype.getNodeOrNew = function(search)
{
	return this.getNode(this.getIndexOrNew(search));
}

module.exports = Collection;
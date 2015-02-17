var geoip = require('geoip-lite');

var Node = function Node(data)
{
	this.id = null;
	this.info = {};
	this.geo = {}
	this.stats = {
		active: false,
		listening: false,
		mining: false,
		peers: 0,
		pending: 0,
		gasPrice: 0,
		block: {},
		blocktimeAvg: 0,
		difficulty: [],
		uptime: 0,
		lastUpdate: 0
	};

	if(typeof data.id !== 'undefined')
		this.id = data.id;

	if(typeof data.info !== 'undefined')
		this.info = data.info;

	if(typeof data.ip !== 'undefined')
		this.setGeo(data.ip);

	return this;
}

Node.prototype.setGeo = function(ip)
{
	this.geo = geoip.lookup(ip);
}

Node.prototype.getInfo = function()
{
	return {id: this.id, info: this.info, geo: this.geo};
}

Node.prototype.getStats = function()
{
	return {id: this.id, stats: this.stats};
}

module.exports = Node;

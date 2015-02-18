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
		block: {
			difficulty: 0,
			number: 0,
			gasLimit: 0,
			timestamp: 0,
			blocktime: 0
		},
		blocktimeAvg: 0,
		difficulty: [],
		uptime: 0,
		lastUpdate: 0
	};

	if(typeof data.id !== 'undefined')
		this.id = data.id;

	if(typeof data.info !== 'undefined')
		this.info = data.info;

	if(typeof data.ip !== 'undefined'){
		this.info.ip = data.ip;
		this.setGeo(data.ip);
	}

	if(typeof data.spark !== 'undefined')
		this.spark = data.spark;

	return this;
}

Node.prototype.setGeo = function(ip)
{
	this.geo = geoip.lookup(ip);
}

Node.prototype.setInfo = function(data)
{
	if(typeof data.info !== 'undefined')
		this.info = data.info;

	if(typeof data.ip !== 'undefined'){
		this.info.ip = data.ip;
		this.setGeo(data.ip);
	}

	if(typeof data.spark !== 'undefined')
		this.spark = data.spark;
}

Node.prototype.getInfo = function()
{
	return {id: this.id, info: this.info, geo: this.geo, stats: this.stats};
}

Node.prototype.getStats = function()
{
	return {id: this.id, stats: this.stats};
}

module.exports = Node;

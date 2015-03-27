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
			arrival: 0,
			propagation: 0,
			received: 0
		},
		blocktimeAvg: 0,
		blockTimes: [],
		difficulty: [],
		latency: 0,
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

	if(typeof data.latency !== 'undefined')
		this.stats.latency = data.latency;

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

Node.prototype.setStats = function(stats)
{
	if(typeof stats !== undefined && typeof stats.block !== undefined && typeof stats.block.number !== undefined)
	{
		if(stats.block.number !== this.stats.number){
			stats.block.received == (new Date()).getTime() - stats.block.arrival;
		} else {
			stats.block.received = this.stats.block.received;
		}

		this.stats = stats;

		return this.getStats();
	}

	return false;
}

Node.prototype.getStats = function()
{
	return {id: this.id, stats: this.stats};
}

module.exports = Node;

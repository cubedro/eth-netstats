var geoip = require('geoip-lite');

var MAX_HISTORY = 36;

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
			received: 0,
			transactions: []
		},
		blocktimeAvg: 0,
		blockTimes: [],
		difficulty: [],
		latency: 0,
		uptime: 0,
		lastUpdate: 0
	};
	this.blockHistory = Array(MAX_HISTORY);
	this.uptime = {
		started: null,
		history: []
	};

	if(this.id === null) {
		this.uptime.started = (new Date()).getTime();
		this.setState(true);
	}

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

	if(this.uptime.history.length > 0 && this.uptime.history[this.uptime.history.length - 1].status == 'down')
		this.setState(true);
}

Node.prototype.getInfo = function()
{
	return {id: this.id, info: this.info, geo: this.geo, stats: this.stats, history: this.blockHistory};
}

Node.prototype.setStats = function(stats)
{
	if(typeof stats !== 'undefined' && typeof stats.block !== 'undefined' && typeof stats.block.number !== 'undefined')
	{
		stats.block.hash = stats.block.hash.replace('0x', '');

		if(stats.block.number > this.stats.block.number)
		{
			if(this.blockHistory.length === MAX_HISTORY )
				this.blockHistory.shift();

			var history = {
				number: stats.block.number,
				received: stats.block.received,
				propagation: stats.block.propagation
			};

			this.blockHistory.push(history);
		}

		this.stats = stats;

		return this.getStats();
	}

	return false;
}

Node.prototype.setLatency = function(latency)
{
	if(typeof latency !== 'undefined')
	{
		this.stats.latency = latency;

		return { id: this.id, latency: latency };
	}

	return false;
}

Node.prototype.getStats = function()
{
	return {id: this.id, stats: this.stats, history: this.blockHistory};
}

Node.prototype.setState = function(active)
{
	this.stats.active = active;
	this.uptime.history.push({status: (active ? 'up' : 'down'), time: (new Date()).getTime()});
}

module.exports = Node;

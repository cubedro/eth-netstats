var geoip = require('geoip-lite');
var _ = require('lodash');

var MAX_HISTORY = 40;

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
			transactions: [],
			uncles: []
		},
		blocktimeAvg: 0,
		propagationAvg: 0,
		blockTimes: [],
		difficulty: [],
		latency: 0,
		uptime: 0,
		lastUpdate: 0
	};
	this.history = new Array(MAX_HISTORY);
	this.uptime = {
		started: null,
		history: []
	};

	_.fill(this.history, -1);

	if(this.id === null) {
		this.uptime.started = (new Date()).getTime();
		this.setState(true);
	}

	if(typeof data.id !== 'undefined')
		this.id = data.id;

	if(typeof data.info !== 'undefined') {
		this.info = data.info;

		if(typeof data.info.canUpdateHistory === 'undefined')
			data.info.canUpdateHistory = false;
	}

	if(typeof data.ip !== 'undefined'){
		if(data.ip === '::ffff:127.0.0.1')
			data.ip = '84.117.82.122';
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
	if(typeof data.info !== 'undefined') {
		this.info = data.info;

		if(typeof data.info.canUpdateHistory === 'undefined')
			data.info.canUpdateHistory = false;
	}

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
	return {id: this.id, info: this.info, geo: this.geo, stats: this.stats, history: this.history};
}

Node.prototype.setStats = function(stats, history)
{
	if(typeof stats !== 'undefined' && typeof stats.block !== 'undefined' && typeof stats.block.number !== 'undefined')
	{
		this.history = history;

		var positives = _.filter(history, function(p) {
			return p >= 0;
		});

		if(positives.length > 0)
			stats.propagationAvg = Math.round(_.sum(positives)/positives.length);
		else
			stats.propagationAvg = 0;

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
	return {id: this.id, stats: this.stats, history: this.history};
}

Node.prototype.setState = function(active)
{
	this.stats.active = active;
	this.uptime.history.push({status: (active ? 'up' : 'down'), time: (new Date()).getTime()});
}

Node.prototype.getBlockNumber = function()
{
	return this.stats.block.number;
}

Node.prototype.canUpdate = function()
{
	return this.info.canUpdateHistory || false;
}

module.exports = Node;

var geoip = require('geoip-lite');
var _ = require('lodash');

var MAX_HISTORY = 40;
var MAX_INACTIVE_TIME = 1000*60*4;

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
			time: 0,
			arrival: 0,
			propagation: 0,
			received: 0,
			transactions: [],
			uncles: []
		},
		propagationAvg: 0,
		latency: 0,
		uptime: 0,
		lastUpdate: 0
	};

	this.history = new Array(MAX_HISTORY);

	this.uptime = {
		started: null,
		history: []
	};

	this.init(data);

	return this;
}

Node.prototype.init = function(data)
{
	_.fill(this.history, -1);

	if( this.id === null )
	{
		this.uptime.started = _.now();
		this.setState(true);
	}

	if( !_.isUndefined(data.id) )
		this.id = data.id;

	this.setInfo(data);

	if( !_.isUndefined(data.latency) )
		this.stats.latency = data.latency;

	return this;
}

Node.prototype.setInfo = function(data)
{
	if( !_.isUndefined(data.info) )
	{
		this.info = data.info;

		if( _.isUndefined(data.info.canUpdateHistory) )
			data.info.canUpdateHistory = false;
	}

	if( !_.isUndefined(data.ip) )
	{
		if(data.ip === '::ffff:127.0.0.1')
			data.ip = '84.117.82.122';

		this.info.ip = data.ip;
		this.setGeo();
	}

	if( !_.isUndefined(data.spark) )
		this.spark = data.spark;

	var uptimeCnt = this.uptime.history.length;

	if( uptimeCnt > 0 && this.uptime.history[uptimeCnt - 1].status === 'down' )
		this.setState(true);

	return this;
}

Node.prototype.setGeo = function()
{
	this.geo = geoip.lookup(this.info.ip);

	return this;
}

Node.prototype.getInfo = function()
{
	return {
		id: this.id,
		info: this.info,
		geo: this.geo,
		stats: this.stats,
		history: this.history
	};
}

Node.prototype.setStats = function(stats, history)
{
	if( !_.isUndefined(stats) && !_.isUndefined(stats.block) && !_.isUndefined(stats.block.number) )
	{
		this.history = history;

		var positives = _.filter(history, function(p) {
			return p >= 0;
		});

		if(positives.length > 0)
			stats.propagationAvg = Math.round( _.sum(positives) / positives.length );
		else
			stats.propagationAvg = 0;

		this.stats = stats;

		return this.getStats();
	}

	return false;
}

Node.prototype.setLatency = function(latency)
{
	if( !_.isUndefined(latency) )
	{
		this.stats.latency = latency;

		return {
			id: this.id,
			latency: latency
		};
	}

	return false;
}

Node.prototype.getStats = function()
{
	return {
		id: this.id,
		stats: this.stats,
		history: this.history
	};
}

Node.prototype.setState = function(active)
{
	this.stats.active = active;
	this.uptime.history.push({
		status: (active ? 'up' : 'down'),
		time: _.now()
	});
}

Node.prototype.getBlockNumber = function()
{
	return this.stats.block.number;
}

Node.prototype.canUpdate = function()
{
	return this.info.canUpdateHistory || false;
}

Node.prototype.isInactiveAndOld = function()
{
	if(this.stats.active)
		return false;

	var lastState = this.uptime.history[this.uptime.history.length -1];

	if( !_.isUndefined(lastState) && !_.isUndefined(lastState.status) && !_.isUndefined(lastState.time) )
	{
		if( lastState.status === 'down' && (_.now() - lastState.time) > MAX_INACTIVE_TIME )
			return true;
	}

	return false;
}

module.exports = Node;

var geoip = require('geoip-lite');
var _ = require('lodash');

var MAX_HISTORY = 40;
var MAX_INACTIVE_TIME = 1000*60*60*4;

var Node = function(data)
{
	this.id = null;
	this.info = {};
	this.geo = {}
	this.stats = {
		active: false,
		mining: false,
		hashrate: 0,
		peers: 0,
		pending: 0,
		gasPrice: 0,
		block: {
			number: 0,
			hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
			difficulty: 0,
			totalDifficulty: 0,
			gasLimit: 0,
			timestamp: 0,
			time: 0,
			arrival: 0,
			received: 0,
			propagation: 0,
			transactions: [],
			uncles: []
		},
		propagationAvg: 0,
		latency: 0,
		uptime: 100
	};

	this.history = new Array(MAX_HISTORY);

	this.uptime = {
		started: null,
		up: 0,
		down: 0,
		lastStatus: null,
		lastUpdate: null
	};

	this.init(data);

	return this;
}

Node.prototype.init = function(data)
{
	_.fill(this.history, -1);

	if( this.id === null && this.uptime.started === null )
		this.setState(true);

	this.id = _.result(data, 'id', this.id);

	if( !_.isUndefined(data.latency) )
		this.stats.latency = data.latency;

	this.setInfo(data);
}

Node.prototype.setInfo = function(data)
{
	if( !_.isUndefined(data.info) )
	{
		this.info = data.info;

		if( !_.isUndefined(data.info.canUpdateHistory) )
		{
			this.info.canUpdateHistory = _.result(data, 'info.canUpdateHistory', false);
		}
	}

	if( !_.isUndefined(data.ip) )
	{
		this.setGeo(data.ip);
	}

	this.spark = _.result(data, 'spark', null);

	this.setState(true);
}

Node.prototype.setGeo = function(ip)
{
	this.info.ip = ip;
	this.geo = geoip.lookup(ip);
}

Node.prototype.getInfo = function()
{
	return {
		id: this.id,
		info: this.info,
		stats: {
			active: this.stats.active,
			mining: this.stats.mining,
			hashrate: this.stats.hashrate,
			peers: this.stats.peers,
			gasPrice: this.stats.gasPrice,
			block: this.stats.block,
			propagationAvg: this.stats.propagationAvg,
			uptime: this.stats.uptime,
			latency: this.stats.latency,
			pending: this.stats.pending,
		},
		history: this.history,
		geo: this.geo
	};
}

Node.prototype.setStats = function(stats, history)
{
	if( !_.isUndefined(stats) )
	{
		this.setBlock( _.result(stats, 'block', this.stats.block), history );

		this.setBasicStats(stats);

		this.setPending( _.result(stats, 'pending', this.stats.pending) );

		return this.getStats();
	}

	return false;
}

Node.prototype.setBlock = function(block, history)
{
	if( !_.isUndefined(block) && !_.isUndefined(block.number) && ( !_.isEqual(history, this.history) || !_.isEqual(block, this.stats.block) ))
	{
		if(block.number !== this.stats.block.number && block.hash !== this.stats.block.hash)
		{
			this.stats.block = block;
		}

		this.setHistory(history);

		return this.getBlockStats();
	}

	return false;
}

Node.prototype.setHistory = function(history)
{
	if( _.isEqual(history, this.history) )
	{
		return false;
	}

	if( !_.isArray(history) )
	{
		this.history = _.fill( new Array(MAX_HISTORY), -1 );
		this.stats.propagationAvg = 0;

		return true;
	}

	this.history = history;

	var positives = _.filter(history, function(p) {
		return p >= 0;
	});

	this.stats.propagationAvg = ( positives.length > 0 ? Math.round( _.sum(positives) / positives.length ) : 0 );
	positives = null;

	return true;
}

Node.prototype.setPending = function(stats)
{
	if( !_.isUndefined(stats) && !_.isUndefined(stats.pending) && !_.isEqual(stats.pending, this.stats.pending))
	{
		this.stats.pending = stats.pending;

		return {
			id: this.id,
			pending: this.stats.pending
		};
	}

	return false;
}

Node.prototype.setBasicStats = function(stats)
{
	if( !_.isUndefined(stats) && !_.isEqual(stats, {
			active: this.stats.active,
			mining: this.stats.mining,
			hashrate: this.stats.hashrate,
			peers: this.stats.peers,
			gasPrice: this.stats.gasPrice,
			uptime: this.stats.uptime
		}) )
	{
		this.stats.active = stats.active;
		this.stats.mining = stats.mining;
		this.stats.hashrate = stats.hashrate;
		this.stats.peers = stats.peers;
		this.stats.gasPrice = stats.gasPrice;
		this.stats.uptime = stats.uptime;

		return this.getBasicStats();
	}

	return false;
}

Node.prototype.setLatency = function(latency)
{
	if( !_.isUndefined(latency) && !_.isEqual(latency, this.stats.latency) )
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
		stats: {
			active: this.stats.active,
			mining: this.stats.mining,
			hashrate: this.stats.hashrate,
			peers: this.stats.peers,
			gasPrice: this.stats.gasPrice,
			block: this.stats.block,
			propagationAvg: this.stats.propagationAvg,
			uptime: this.stats.uptime,
			pending: this.stats.pending
		},
		history: this.history
	};
}

Node.prototype.getBlockStats = function()
{
	return {
		id: this.id,
		block: this.stats.block,
		propagationAvg: this.stats.propagationAvg,
		history: this.history
	};
}

Node.prototype.getBasicStats = function()
{
	return {
		id: this.id,
		stats: {
			active: this.stats.active,
			mining: this.stats.mining,
			hashrate: this.stats.hashrate,
			peers: this.stats.peers,
			gasPrice: this.stats.gasPrice,
			uptime: this.stats.uptime
		}
	};
}

Node.prototype.setState = function(active)
{
	var now = _.now();

	if(this.uptime.started !== null)
	{
		if(this.uptime.lastStatus === active)
		{
			this.uptime[(active ? 'up' : 'down')] += now - this.uptime.lastUpdate;
		}
		else
		{
			this.uptime[(active ? 'down' : 'up')] += now - this.uptime.lastUpdate;
		}
	}
	else
	{
		this.uptime.started = now;
	}

	this.stats.active = active;
	this.uptime.lastStatus = active;
	this.uptime.lastUpdate = now;

	this.stats.uptime = this.calculateUptime();

	now = undefined;
}

Node.prototype.calculateUptime = function()
{
	if(this.uptime.lastUpdate === this.uptime.started)
	{
		return 100;
	}

	return Math.round( this.uptime.up / (this.uptime.lastUpdate - this.uptime.started) * 100);
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
	if( this.uptime.lastStatus === false && this.uptime.lastUpdate !== null && (_.now() - this.uptime.lastUpdate) > MAX_INACTIVE_TIME )
	{
		return true;
	}

	return false;
}

module.exports = Node;

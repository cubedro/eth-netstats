var geoip = require('geoip-lite');

var Node = function Node(options, id)
{
	this.options = options;
	this.info = {
		name: options.name,
		ip: options.rpcHost,
		type: options.type,
		os: options.os
	};

	this.info.geo = geoip.lookup(this.info.ip);
	this.info.id = parseInt(id);
	this.info.stats = {
		active: false,
		peers: 0,
		mining: false,
		block: {
			number: 0,
			hash: '?',
			timestamp: 0
		},
		uptime: {
			down: 0,
			inc: 0,
			total: 0
		}
	}

	this.web3 = require('ethereum.js');

	return this;
}

Node.prototype.update = function()
{
	var sock = new this.web3.providers.HttpSyncProvider('http://' + this.options.rpcHost + ':' + this.options.rpcPort);
	this.web3.setProvider(sock);

	var eth = this.web3.eth;

	try {
		this.info.stats.peers = eth.peerCount;
	}
	catch (err) {
		this.info.stats.peers = null;
	}

	if(this.info.stats.peers != null) {
		this.info.stats.block = eth.block(parseInt(eth.number));
		if(this.info.stats.block.hash != '?'){
			this.info.stats.block.difficulty = this.web3.toDecimal(this.info.stats.block.difficulty);
		}
		this.info.stats.mining = eth.mining;
		this.info.stats.active = true;
	} else {
		this.info.stats.active = false;
		this.info.stats.uptime.down++;
	}

	this.info.stats.uptime.inc++;
	this.info.stats.uptime.total = ((this.info.stats.uptime.inc - this.info.stats.uptime.down) / this.info.stats.uptime.inc) * 100;

	return this.info;
};

module.exports = Node;
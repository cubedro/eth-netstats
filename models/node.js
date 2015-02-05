var geoip = require('geoip-lite');

require('es6-promise').polyfill();

var Node = function Node(options, id)
{
	this.info = options;
	this.info.geo = geoip.lookup(this.info.rpcHost);
	this.info.id = parseInt(id);
	this.info.stats = {
		active: false,
		peers: 0,
		mining: false,
		block: {
			height: 0,
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
	var sock = new this.web3.providers.HttpSyncProvider('http://' + this.info.rpcHost + ':' + this.info.rpcPort);
	this.web3.setProvider(sock);

	var eth = this.web3.eth;

	try {
		this.info.stats.peers = eth.peerCount;
	}
	catch (err) {
		this.info.stats.peers = null;
	}

	if(this.info.stats.peers != null) {
		this.info.stats.block.height = parseInt(eth.number);
		var block = eth.block(this.info.stats.block.height)
		this.info.stats.block.hash = block.hash;
		this.info.stats.block.timestamp = block.timestamp;
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
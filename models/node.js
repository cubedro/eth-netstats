var geoip = require('geoip-lite');

require('es6-promise').polyfill();

var self;

var Node = function Node(options, id)
{
	this.info = options;
	this.info.geo = geoip.lookup(this.info.rpcHost);
	this.info.id = id;
	this.info.stats = {
		active: false,
		peers: 0,
		mining: false,
		block: {
			height: 0,
			hash: '?'
		}
	}

	this.web3 = require('ethereum.js');

	return this;
}

Node.prototype.update = function()
{
	if( ! this.web3.haveProvider()) {
		var sock = new this.web3.providers.HttpSyncProvider('http://' + this.info.rpcHost + ':' + this.info.rpcPort);
		this.web3.setProvider(sock);
	}

	var eth = this.web3.eth;

	this.info.stats.peers = eth.peerCount;
	this.info.stats.mining = eth.mining;
	this.info.stats.block.height = eth.number;
	this.info.stats.block.hash = eth.block(this.info.stats.block.height).hash;

	return this.info;
};

module.exports = Node;
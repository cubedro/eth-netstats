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

Node.prototype.update = function(cb)
{
	console.log(this);

	if( ! this.web3.provider.installed()) {
		var sock = new this.web3.providers[this.info.rpcProvider]((this.info.rpcProvider === 'HttpRpcProvider' ? 'http://' : 'ws://' ) + this.info.rpcHost + ':' + this.info.rpcPort);
		this.web3.setProvider(sock);
	}

	var self = this;
	var eth = this.web3.eth;

	eth.peerCount.then(function(data){
		self.info.stats.peers = data;

		return eth.number;
	})
	.then(function(data){
		self.info.stats.block = data;

		return eth.mining;
	})
	.then(function(data){
		self.info.stats.mining = data;

		cb(self.info.stats);
	}).catch(function(error) {
		console.log(error);
	});
};

module.exports = Node;
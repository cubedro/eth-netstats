var geoip = require('geoip-lite');

var Node = function Node()
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
		block: {},
		blocktimeAvg: 0,
		difficulty: [],
		uptime: {
			down: 0,
			inc: 0,
			total: 0
		},
		lastUpdate: 0
	};

	return this;
}

Node.prototype.setGeo = function()
{
	this.geo = geoip.lookup(ip);
}

module.exports = Node;

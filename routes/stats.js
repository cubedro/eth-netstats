var router = require('express.io')();
var web3 = require('ethereum.js');
var geoip = require('geoip-lite');
var config = require('../config/nodes');

var geo = geoip.lookup(config[0].rpcHost);
console.log(geo);

if( ! web3.provider.installed()) {
	var sock = new web3.providers[config[0].rpcProvider]((config[0].rpcProvider === 'HttpRpcProvider' ? 'http://' : 'ws://' ) + config[0].rpcHost + ':' + config[0].rpcPort);
	web3.setProvider(sock);
}

web3.eth.mining.then(function(data){
	console.log("is mining: " + data);
});

web3.eth.peerCount.then(function(data){
	console.log("peers: " + data);§
});

web3.eth.number.then(function(data){
	console.log("latest block: " + data);
});

/* GET stats listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;

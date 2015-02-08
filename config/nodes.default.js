var nodes = [
	//
	//  Duplicate this file and rename it to "nodes.js".
	//  It will be loaded as the main config file and
	//  will be ignored by git. Add nodes like the one below
	//
	//  {
	// 	name: 'Readable name of the node',
	// 	type: 'C++/Go...',
	// 	rpcHost: 'your node IP here',
	// 	rpcPort: 'JSON-RPC port here'
	// },
	{
		name: 'instance 1',
		type: 'C++',
		os: 'linux',
		rpcHost: '54.173.252.182',
		rpcPort: '8080'
	},
	{
		name: 'instance 2',
		type: 'C++',
		os: 'linux',
		rpcHost: '54.209.133.248',
		rpcPort: '8080'
	},
	{
		name: 'instance 3',
		type: 'C++',
		os: 'linux',
		rpcHost: '54.174.67.126',
		rpcPort: '8080'
	},
	{
		name: 'local',
		type: 'C++',
		os: 'OS X',
		rpcHost: 'localhost',
		rpcPort: '8080'
	}
];

module.exports = nodes;

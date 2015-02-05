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
		name: 'local',
		type: 'C++',
		rpcHost: 'localhost',
		rpcPort: '8080'
	}
];

module.exports = nodes;

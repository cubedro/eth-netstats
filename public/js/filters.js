'use strict';

/* Filters */

angular.module('netStatsApp.filters', [])
.filter('nodesActiveClass', function() {
	return function(active, total) {
		var ratio = active/total;

		if(ratio >= 0.9)
			return 'text-success';

		if(ratio >= 0.75)
			return 'text-info';

		if(ratio >= 0.5)
			return 'text-warning';

		return 'text-danger';
	};
})
.filter('mainClass', function() {
	return function(node, bestBlock) {
	  	return mainClass(node, bestBlock);
	};
})
.filter('peerClass', function() {
	return function(peers, active) {
		return peerClass(peers, active);
	};
})
.filter('miningClass', function() {
	return function(mining, active) {
		if(! active)
			return 'text-gray';

		return (! mining ? 'text-danger' : 'text-success');
	};
})
.filter('miningIconClass', function() {
	return function(mining) {
		return (! mining ? 'icon-cancel' : 'icon-check');
	};
})
.filter('nodeVersion', function($sce) {
	return function(version) {
		if(typeof version !== 'undefined') {
			version = version.replace('eth version ', 'v')
				.replace("\n" + 'Network protocol version: ', ' (')
				.replace("\n" + 'Client database version: ', ',')
				.replace("\n" + 'Build: ', ') - ')
				.replace('/Debug', '')
				.replace('/.', '');
		} else
			return '';

		return $sce.trustAsHtml(version);
	};
})
.filter('blockClass', function() {
	return function(current, best) {
		if( ! current.active)
			return 'text-gray';

		return (best - current.block.number <= 1 ? 'text-success' : (best - current.block.number > 1 && best - current.block.number < 4 ? 'text-warning' : 'text-danger'));
	};
})
.filter('gasFilter', function() {
	return function(gas) {
		return (typeof gas !== 'undefined' ? parseInt(gas) : '?');
	}
})
.filter('hashFilter', function() {
	return function(hash) {
		return hash.substr(0, 8) + '...' + hash.substr(56, 8);
	}
})
.filter('timeClass', function() {
	return function(timestamp, active) {
		if( ! active)
			return 'text-gray';

		return timeClass(timestamp);
	};
})
.filter('propagationTimeClass', function() {
	return function(stats, bestBlock) {
		if( ! stats.active)
			return 'text-gray';

		if(stats.block.number < bestBlock)
			return 'text-gray';

		if(stats.block.propagation == 0)
			return 'bg-info';

		if(stats.block.propagation < 1000)
			return 'bg-success';

		if(stats.block.propagation < 3000)
			return 'bg-warning';

		if(stats.block.propagation < 7000)
			return 'bg-orange';

		return 'bg-danger'
	};
})
.filter('latencyFilter', function() {
	return function(stats) {
		if(stats.active === false)
			return 'offline';
		else
			return stats.latency + ' ms';
	}
})
.filter('latencyClass', function() {
	return function(stats) {
		if(stats.active === false)
			return 'text-danger';

		if(stats.latency <= 100)
			return 'text-success';

		if(stats.latency <= 1000)
			return 'text-warning';

		return 'text-danger'
	};
})
.filter('blockTimeFilter', function() {
	return function(timestamp) {
		if(timestamp === 0)
			return '∞';

		// var time = Math.floor((new Date()).getTime() / 1000);
		var time = (new Date()).getTime();
		var diff = Math.floor((time - timestamp)/1000);

		if(diff < 60)
			return Math.round(diff) + ' s ago';

		return moment.duration(Math.round(diff), 's').humanize() + ' ago';
	};
})
.filter('blockPropagationFilter', function() {
	return function(ms) {
		var result = 0;

		if(ms < 1000) {
			return ms + " ms";
		}

		if(ms < 1000*60) {
			result = ms/1000;
			return result.toFixed(1) + " s";
		}

		if(ms < 1000*60*60) {
			result = ms/1000/60;
			return Math.round(result) + " min";
		}

		if(ms < 1000*60*60*24) {
			result = ms/1000/60/60;
			return Math.round(result) + " h";
		}

		result = ms/1000/60/60/24;
		return Math.round(result) + " days";
	};
})
.filter('avgTimeFilter', function() {
	return function(time) {
		if(time < 60)
			return Math.round(time) + ' s';

		return moment.duration(Math.round(time), 's').humanize();
	};
})
.filter('avgTimeClass', function() {
	return function(time) {
		return blockTimeClass(time);
	}
})
.filter('upTimeFilter', function() {
	return function(uptime) {
		return Math.round(uptime) + '%';
	};
})
.filter('upTimeClass', function() {
	return function(uptime, active) {
		if( ! active )
			return 'text-gray';

		if(uptime >= 90)
			return 'text-success';

		if(uptime >= 75)
			return 'text-warning';

		return 'text-danger';
	};
})
.filter('geoTooltip', function() {
	return function(geo) {
		if(geo !== null)
			return geo.city + ", " + geo.country;

		return '';
	};
})
.filter('bubbleClass', function() {
	return function(node, bestBlock) {
		return mainClass(node, bestBlock).replace('text-', '');
	};
})
.filter('minerNameFilter', function() {
	return function(address, name) {
		if(typeof name !== 'undefined' && name !== false && name.length > 0)
			return name;

		return address.replace('0x', '');
	};
})
.filter('minerBlocksClass', function() {
	return function(blocks) {
		if(blocks <= 6)
			return 'bg-success';

		if(blocks <= 12)
			return 'bg-info';

		if(blocks <= 18)
			return 'bg-warning';

		return 'bg-danger';
	};
});

function mainClass(node, bestBlock)
{
	if( ! node.active)
		return 'text-gray';

	if(node.peers === 0)
		return 'text-danger';

	// return timeClass(node.block.timestamp);
	return peerClass(node.peers, node.active);
}

function peerClass(peers, active)
{
	if( ! active)
		return 'text-gray';

	return (peers <= 1 ? 'text-danger' : (peers > 1 && peers < 4 ? 'text-warning' : 'text-success'));
}

function timeClass(timestamp)
{
	var diff = ((new Date()).getTime() - timestamp)/1000;

	return blockTimeClass(diff);
}

function blockTimeClass(diff)
{
	if(diff <= 12)
		return 'text-success';

	if(diff <= 20)
		return 'text-warning';

	if(diff <= 30)
		return 'text-orange';

	return 'text-danger'
}
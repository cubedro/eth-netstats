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
	return function(peers) {
		return peerClass(peers);
	};
})
.filter('miningClass', function() {
	return function(mining) {
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
		version = version.replace('eth version ', 'v')
						.replace("\n" + 'Network protocol version: ', ' (')
						.replace("\n" + 'Client database version: ', ',')
						.replace("\n" + 'Build: ', ') - ')
						.replace('/Debug', '')
						.replace('/.', '');
		return $sce.trustAsHtml(version);
	};
})
.filter('blockClass', function() {
	return function(current, best) {
		return (best - current <= 1 ? 'text-success' : (best - current > 1 && best - current < 4 ? 'text-warning' : 'text-danger'));
	};
})
.filter('gasFilter', function() {
	return function(gas) {
		return (typeof gas !== 'undefined' ? parseInt(gas) : '?');
	}
})
.filter('latencyFilter', function() {
	return function(stats) {
		if(stats.active === false)
			return 'offline';
		else
			return stats.latency + ' ms';
	}
})
.filter('hashFilter', function() {
	return function(hash) {
		return hash.substr(0, 6) + '...' + hash.substr(58, 6);
	}
})
.filter('timeClass', function() {
	return function(timestamp) {
		return timeClass(timestamp);
	};
})
.filter('propagationTimeClass', function() {
	return function(propagation) {
		if(propagation <= 3000)
			return 'text-success';

		if(propagation <= 7000)
			return 'text-warning';

		return 'text-danger'
	};
})
.filter('latencyClass', function() {
	return function(time) {
		if(time <= 100)
			return 'text-success';

		if(time <= 1000)
			return 'text-warning';

		return 'text-danger'
	};
})
.filter('blockTimeFilter', function() {
	return function(timestamp) {
		if(timestamp === 0)
			return '∞';

		var time = Math.floor((new Date()).getTime() / 1000);
		var diff = time - timestamp;

		if(diff < 60)
			return Math.round(diff) + ' s ago';

		return moment.duration(Math.round(diff), 's').humanize() + ' ago';
	};
})
.filter('blockPropagationFilter', function() {
	return function(ms) {
		var result = 0;

		if(ms < 1000){
			return ms + " ms";
		}

		if(ms < 1000*60){
			result = ms/1000;
			return result.toFixed(1).toString() + " s";
		}

		if(ms < 1000*60*60){
			result = ms/1000/60;
			return result.toFixed(1) + " min";
		}

		if(ms < 1000*60*60*24){
			result = ms/1000/60/60;
			return result.toFixed(1) + " h";
		}

		result = ms/1000/60/60/24;
		return result.toFixed(1) + " days";
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
	return function(uptime) {
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
	}
});

function mainClass(node, bestBlock)
{
	if( ! node.active)
		return 'text-danger';

	if(node.peers === 0)
		return 'text-danger';

	// return timeClass(node.block.timestamp);
	return peerClass(node.peers);
}

function peerClass(peers)
{
	return (peers <= 1 ? 'text-danger' : (peers > 1 && peers < 4 ? 'text-warning' : 'text-success'));
}

function timeClass(timestamp)
{
	var time = Math.floor((new Date()).getTime() / 1000);
	var diff = time - timestamp;

	return blockTimeClass(diff);
}

function blockTimeClass(diff)
{
	if(diff <= 12)
		return 'text-success';

	if(diff <= 20)
		return 'text-info';

	if(diff <= 30)
		return 'text-warning';

	return 'text-danger'
}
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
						.replace("\n" + 'Build: ', ') - ');
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
.filter('timeClass', function() {
	return function(timestamp) {
		return timeClass(timestamp);
	};
})
.filter('avgTimeFilter', function() {
	return function(time) {
		return Math.round(time) + 's';
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
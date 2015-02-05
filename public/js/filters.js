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
  	if( ! node.active)
  		return 'text-danger';

  	if(node.peers === 0)
  		return 'text-danger';

    return (node.peers <= 1 ? 'text-danger' : (node.peers > 1 && node.peers < 4 ? 'text-warning' : 'text-success'));
  };
})
.filter('peerClass', function() {
  return function(peers) {
    return (peers <= 1 ? 'text-danger' : (peers > 1 && peers < 4 ? 'text-warning' : 'text-success'));
  };
})
.filter('miningClass', function() {
  return function(mining) {
    return (! mining ? 'text-danger' : '');
  };
})
.filter('miningIconClass', function() {
  return function(mining) {
    return (! mining ? 'icon-cancel' : 'icon-check');
  };
})
.filter('blockClass', function() {
  return function(current, best) {
    return (best - current <= 1 ? '' : (best - current > 1 && best - current < 4 ? 'text-warning' : 'text-danger'));
  };
})
.filter('timeClass', function() {
	return function(timestamp) {
		var time = Math.floor((new Date()).getTime() / 1000);
		var diff = time - timestamp;

		if(diff <= 12)
			return 'text-success';

		if(diff <= 20)
			return 'text-info';

		if(diff <= 30)
			return 'text-warning';

		return 'text-danger';
	};
});
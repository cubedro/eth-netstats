'use strict';

/* Filters */

angular.module('netStatsApp.filters', [])
.filter('mainClass', function() {
  return function(node, bestBlock) {
  	if( ! node.active)
  		return 'text-danger';

  	if( node.peers === 0)
  		return 'text-danger';

    return (node.peers <= 1 ? 'text-danger' : (node.peers > 1 && node.peers < 4 ? 'text-warning' : 'text-success'));
  }
})
.filter('peerClass', function() {
  return function(peers) {
    return (peers <= 1 ? 'text-danger' : (peers > 1 && peers < 4 ? 'text-warning' : 'text-success'));
  }
})
.filter('miningClass', function() {
  return function(mining) {
    return (! mining ? 'text-danger' : '');
  }
})
.filter('miningIconClass', function() {
  return function(mining) {
    return (! mining ? 'icon-cancel' : 'icon-check');
  }
})
.filter('blockClass', function() {
  return function(current, best) {
    return (best - current <= 1 ? '' : (best - current > 1 && best - current < 4 ? 'text-warning' : 'text-danger'));
  }
});
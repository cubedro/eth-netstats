
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
.filter('nodePinClass', function() {
	return function(pinned) {
	  	if(pinned)
	  		return 'icon-check-o';

	  	return 'icon-loader';
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
.filter('hashrateClass', function() {
	return function(mining, active) {
		if(! mining || ! active)
			return 'text-gray';

		return 'text-success';
	};
})
.filter('hashrateFilter', ['$sce', '$filter', function($sce, filter) {
	return function(hashes, isMining) {
		var result = 0;
		var unit = 'K';

		if( !isMining )
			return $sce.trustAsHtml('<i class="icon-cancel"></i>');

		if(hashes !== 0 && hashes < 1000) {
			result = hashes;
			unit = '';
		}

		if(hashes >= 1000 && hashes < Math.pow(1000, 2)) {
			result = hashes / 1000;
			unit = 'K';
		}

		if(hashes >= Math.pow(1000, 2) && hashes < Math.pow(1000, 3)) {
			result = hashes / Math.pow(1000, 2);
			unit = 'M';
		}

		if(hashes >= Math.pow(1000, 3) && hashes < Math.pow(1000, 4)) {
			result = hashes / Math.pow(1000, 3);
			unit = 'G';
		}

		if(hashes >= Math.pow(1000, 4) && hashes < Math.pow(1000, 5)) {
			result = hashes / Math.pow(1000, 4);
			unit = 'T';
		}

		return $sce.trustAsHtml('<span class="small">' + filter('number')(result.toFixed(1)) + ' <span class="small-hash">' + unit + 'H/s</span></span>');
	};
}])
.filter('totalDifficultyFilter', function() {
	return function(hashes) {
		var result = 0;
		var unit = '';

		if(hashes !== 0 && hashes < 1000) {
			result = hashes;
			unit = '';
		}

		if(hashes >= 1000 && hashes < Math.pow(1000, 2)) {
			result = hashes / 1000;
			unit = 'K';
		}

		if(hashes >= Math.pow(1000, 2) && hashes < Math.pow(1000, 3)) {
			result = hashes / Math.pow(1000, 2);
			unit = 'M';
		}

		if(hashes >= Math.pow(1000, 3) && hashes < Math.pow(1000, 4)) {
			result = hashes / Math.pow(1000, 3);
			unit = 'G';
		}

		if(hashes >= Math.pow(1000, 4) && hashes < Math.pow(1000, 5)) {
			result = hashes / Math.pow(1000, 4);
			unit = 'T';
		}

		return result.toFixed(2) + ' ' + unit + 'H';
	};
})
.filter('nodeVersion', function($sce) {
	return function(version) {
		if(version)
		{
			var tmp = version.split('/');

			tmp[0] = tmp[0].replace('Ethereum(++)', 'Eth');

			if(tmp[0].indexOf('pyethapp') === 0)
			{
				tmp[0] = 'pyeth';
			}

			if(tmp[1] && tmp[1][0] !== 'v' && tmp[1][2] !== '.')
			{
				tmp.splice(1,1);
			}

			if(tmp[2] && tmp[2] === 'Release'){
				tmp.splice(2,1);
			}

			if(tmp[2] && tmp[2].indexOf('Linux') === 0)
				tmp[2] = 'linux';

			if(tmp[2] && tmp[2].indexOf('Darwin') === 0)
				tmp[2] = 'darwin';

			return $sce.trustAsHtml(tmp.join('/'));
		}

		return '';
	};
})
.filter('blockClass', function() {
	return function(current, best) {
		if( ! current.active)
			return 'text-gray';

		return (best - current.block.number < 1 ? 'text-success' : (best - current.block.number === 1 ? 'text-warning' : (best - current.block.number > 1 && best - current.block.number < 4 ? 'text-orange' : 'text-danger')));
	};
})
.filter('gasPriceFilter', ['$filter', function(filter) {
	var numberFilter = filter('number');
	return function(price) {
		if(typeof price === 'undefined')
			return "0 wei";

		if(price.length < 4)
			return numberFilter(price) + " wei";

		if(price.length < 7)
			return numberFilter(price/1000) + " kwei";

		if(price.length < 10)
			return numberFilter(price/1000000) + " mwei";

		if(price.length < 13)
			return numberFilter(price/1000000000) + " gwei";

		if(price.length < 16)
			return numberFilter(price/1000000000000) + " szabo";

		if(price.length < 19)
			return numberFilter(price.substr(0, price.length - 15)) + " finney";

		return numberFilter(price.substr(0, price.length - 18)) + " ether";
	}
}])
.filter('gasFilter', function() {
	return function(gas) {
		return (typeof gas !== 'undefined' ? parseInt(gas) : '?');
	}
})
.filter('hashFilter', function() {
	return function(hash) {
		if(typeof hash === 'undefined')
			return "?";

		if(hash.substr(0,2) === '0x')
			hash = hash.substr(2,64);

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
			return 'text-info';

		if(stats.block.propagation < 1000)
			return 'text-success';

		if(stats.block.propagation < 3000)
			return 'text-warning';

		if(stats.block.propagation < 7000)
			return 'text-orange';

		return 'text-danger'
	};
})
.filter('propagationNodeAvgTimeClass', function() {
	return function(stats, bestBlock) {
		if( ! stats.active)
			return 'text-gray';

		if(stats.block.number < bestBlock)
			return 'text-gray';

		if(stats.propagationAvg == 0)
			return 'text-info';

		if(stats.propagationAvg < 1000)
			return 'text-success';

		if(stats.propagationAvg < 3000)
			return 'text-warning';

		if(stats.propagationAvg < 7000)
			return 'text-orange';

		return 'text-danger'
	};
})
.filter('propagationAvgTimeClass', function() {
	return function(propagationAvg, active) {
		if( ! active)
			return 'text-gray';

		if(propagationAvg == 0)
			return 'text-info';

		if(propagationAvg < 1000)
			return 'text-success';

		if(propagationAvg < 3000)
			return 'text-warning';

		if(propagationAvg < 7000)
			return 'text-orange';

		return 'text-danger'
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
.filter('networkHashrateFilter', ['$sce', '$filter', function($sce, filter) {
	return function(hashes, isMining) {
		if(hashes === null)
			hashes = 0;

		var result = 0;
		var unit = 'K';

		if(hashes !== 0 && hashes < 1000) {
			result = hashes;
			unit = '';
		}

		if(hashes >= 1000 && hashes < Math.pow(1000, 2)) {
			result = hashes / 1000;
			unit = 'K';
		}

		if(hashes >= Math.pow(1000, 2) && hashes < Math.pow(1000, 3)) {
			result = hashes / Math.pow(1000, 2);
			unit = 'M';
		}

		if(hashes >= Math.pow(1000, 3) && hashes < Math.pow(1000, 4)) {
			result = hashes / Math.pow(1000, 3);
			unit = 'G';
		}

		if(hashes >= Math.pow(1000, 4) && hashes < Math.pow(1000, 5)) {
			result = hashes / Math.pow(1000, 4);
			unit = 'T';
		}

		if( !isMining )
			return $sce.trustAsHtml(filter('number')(result.toFixed(1)) + ' <span class="small-hash">' + unit + 'H/s</span>');

		return $sce.trustAsHtml('? <span class="small-hash">' + unit + 'KH/s</span>');
	};
}])
.filter('blockPropagationFilter', function() {
	return function(ms, prefix) {
		if(typeof prefix === 'undefined')
			prefix = '+';

		var result = 0;

		if(ms < 1000) {
			return (ms === 0 ? "" : prefix) + ms + " ms";
		}

		if(ms < 1000*60) {
			result = ms/1000;
			return prefix + result.toFixed(1) + " s";
		}

		if(ms < 1000*60*60) {
			result = ms/1000/60;
			return prefix + Math.round(result) + " min";
		}

		if(ms < 1000*60*60*24) {
			result = ms/1000/60/60;
			return prefix + Math.round(result) + " h";
		}

		result = ms/1000/60/60/24;
		return prefix + Math.round(result) + " days";
	};
})
.filter('blockPropagationAvgFilter', function() {
	return function(stats, bestBlock) {
		var ms = stats.propagationAvg;

		if(bestBlock - stats.block.number > 40)
			return "∞";
		//ms = _.now() - stats.block.received;

		prefix = '';

		var result = 0;

		if(ms < 1000) {
			return (ms === 0 ? "" : prefix) + ms + " ms";
		}

		if(ms < 1000*60) {
			result = ms/1000;
			return prefix + result.toFixed(1) + " s";
		}

		if(ms < 1000*60*60) {
			result = ms/1000/60;
			return prefix + Math.round(result) + " min";
		}

		if(ms < 1000*60*60*24) {
			result = ms/1000/60/60;
			return prefix + Math.round(result) + " h";
		}

		result = ms/1000/60/60/24;
		return prefix + Math.round(result) + " days";
	};
})
.filter('avgTimeFilter', function() {
	return function(time) {
		if(time < 60)
			return parseFloat(time).toFixed(2) + ' s';

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
	return function(node) {
		var tooltip = [];
		var string = '';

		if(node.info.node) {
			var eth_version = node.info.node.split('/');

      if(eth_version[1]){
			  if(eth_version[1][0] !== 'v' && eth_version[1][2] !== '.')
			  {
				  eth_version.splice(1,1);
			  }

			  string = "<b>" + node.info.node + "</b>";
			  tooltip.push(string);

			  string = "Version: <b>" + (eth_version[1]) + "</b>";
			  tooltip.push(string);
      }
		}

		if(node.info.net !== '') {
			string = "Network: <b>" + (typeof node.info.net !== 'undefined' ? node.info.net : '-') + "</b>";

			tooltip.push(string);
		}

		if(node.info.protocol !== '') {
			string = "Protocol: <b>" + (typeof node.info.protocol !== 'undefined' ? node.info.protocol : '-') + "</b>";

			tooltip.push(string);
		}

		if(node.info.port !== '') {
			string = "Port: <b>" + (typeof node.info.port !== 'undefined' ? node.info.port : '30303') + "</b>";

			tooltip.push(string);
		}

		if(node.info.api !== '') {
			string = "Web3: <b>" + node.info.api + "</b>";

			tooltip.push(string);
		}

		if(node.info.client !== '') {
			string = "API: <b>" + (typeof node.info.client !== 'undefined' ? node.info.client : '<= 0.0.3') + "</b>";

			tooltip.push(string);
		}

		if(node.info.os !== '') {
			string = "OS: <b>" + (typeof node.info.os !== 'undefined' ? node.info.os + ' ' + node.info.os_v : '?') + "</b>";

			tooltip.push(string);
		}

		if(node.geo !== null)
		{
			string = "Location: <b>";

			if(node.geo.city !== '')
				string += node.geo.city + ", ";
			string += node.geo.country + "</b>";

			tooltip.push(string);
		}

		if(node.info.contact !== '') {
			string = "Contact: <b>" + (typeof node.info.contact !== 'undefined' ? node.info.contact : '-') + "</b>";

			tooltip.push(string);
		}

		return tooltip.join("<br>");
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
	return function(blocks, prefix) {
		if(typeof prefix === 'undefined')
			prefix = 'bg-';
		if(blocks <= 6)
			return prefix + 'success';

		if(blocks <= 12)
			return prefix + 'info';

		if(blocks <= 18)
			return prefix + 'warning';

		return prefix + 'danger';
	};
})
.filter('nodeClientClass', function() {
	return function(info, current) {
		if(typeof info === 'undefined' || typeof info.client === 'undefined' || typeof info.client === '')
			return 'text-danger';

		if(compareVersions(info.client, '<', current))
			return 'text-danger';

		return 'hidden';
	};
})
.filter('consensusClass', function() {
	return function(nodes, bestBlock) {
		var status = 'success';
		var now = _.now();

		for(var x = 0; x < nodes.length; x++)
		{
			if(nodes[x].stats.block.number === bestBlock.number && nodes[x].stats.block.hash !== bestBlock.hash)
				return 'danger';

			if((bestBlock.number - nodes[x].stats.block.number) > 1 && (now - bestBlock.received) >= 20*1000)
				status = 'orange';

			if((bestBlock.number - nodes[x].stats.block.number) === 1 && (now - bestBlock.received) >= 10*1000 && status !== 'orange')
				status = 'warning';
		}

		return status;
	};
})
.filter('consensusFilter', function() {
	return function(nodes, bestBlock) {
		var cnt = 0;

		for(var x = 0; x < nodes.length; x++)
		{
			if(nodes[x].stats.block.number === bestBlock.number && nodes[x].stats.block.hash === bestBlock.hash)
				cnt++;
		}

		return cnt + '/' + nodes.length;
	};
});

function compareVersions(v1, comparator, v2)
{
	comparator = comparator == '=' ? '==' : comparator;

	var v1parts = v1.split('.'), v2parts = v2.split('.');
	var maxLen = Math.max(v1parts.length, v2parts.length);
	var part1, part2;
	var cmp = 0;

	for(var i = 0; i < maxLen && !cmp; i++)
	{
		part1 = parseInt(v1parts[i], 10) || 0;
		part2 = parseInt(v2parts[i], 10) || 0;
		if(part1 < part2)
			cmp = 1;
		if(part1 > part2)
			cmp = -1;
	}

	return eval('0' + comparator + cmp);
}

function mainClass(node, bestBlock)
{
	if( ! node.active)
		return 'text-gray';

	if(node.peers === 0)
		return 'text-danger';

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
	if(diff <= 13)
		return 'text-success';

	if(diff <= 20)
		return 'text-warning';

	if(diff <= 30)
		return 'text-orange';

	return 'text-danger'
}

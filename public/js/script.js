(function() {
	var mapHolder = document.getElementById('mapHolder');
	mapHolder.clientHeight = mapHolder.clientWidth/2;

	Datamap.prototype.resize = function () {
		var self = this;
		var options = self.options;
		if (options.responsive) {
			var prefix = '-webkit-transform' in document.body.style ? '-webkit-' : '-moz-transform' in document.body.style ? '-moz-' : '-ms-transform' in document.body.style ? '-ms-' : '',
			newsize = options.element.clientWidth,
			oldsize = d3.select(options.element).select('svg').attr('data-width');
			d3.select(options.element).select('svg').selectAll('g').style(prefix + 'transform', 'scale(' + (newsize / oldsize) + ')');
		}
	}

	var map = new Datamap({
		scope: 'world',
		responsive: true,
		element: mapHolder,
		fills: {
			defaultFill: '#181818'
		},
		geographyConfig: {
			borderWidth: 0,
			borderColor: '#000',
			highlightOnHover: false,
			popupOnHover: false
		},
		arcConfig: {
			strokeColor: '#10A0DE',
			strokeWidth: 1,
			arcSharpness: 1,
			animationSpeed: 600
		}
	});

	map.arc([
		{
			origin: {
				latitude: 40.7089,
				longitude: -74.0012
			},
			destination: {
				latitude: 37.618889,
				longitude: -122.375
			}
		},
		{
			origin: {
				latitude: 40.7089,
				longitude: -74.0012
			},
			destination: {
				latitude: 40.639722,
				longitude: 73.778889
			}
		},
		{
			origin: {
				latitude: 40.7089,
				longitude: -74.0012
			},
			destination: {
				latitude: 25.793333,
				longitude: -0.290556
			}
		}
	], { strokeColor: '#10A0DE' });

	d3.select(mapHolder).select('svg').attr('data-width', mapHolder.clientWidth);

	window.addEventListener("resize", function (event) {
		map.resize();
	});

	var socket = io.connect();
	socket.emit('ready');

	socket.on('init', function(data){
		console.log(data);
	});

	socket.on('update', function(data){
		//
	});
})();
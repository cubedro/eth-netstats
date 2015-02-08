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

	d3.select(mapHolder).select('svg').attr('data-width', mapHolder.clientWidth);

	// window.addEventListener("resize", function (event) {
	// 	map.resize();
	// });

	var socket = io.connect();

	socket.on('init', function(data){
		console.log(data);
	});

	$('body').on('mouseenter', '[data-toggle="tooltip"]', function( event ) {
		$(this).tooltip('show');
	}).on('mouseleave', '[data-toggle="tooltip"]', function( event ) {
		$(this).tooltip('hide');
	})
})();
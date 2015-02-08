(function() {
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
(function() {
	$('body').on('mouseenter', '[data-toggle="tooltip"]', function( event ) {
		$(this).tooltip('show');
	}).on('mouseleave', '[data-toggle="tooltip"]', function( event ) {
		$(this).tooltip('hide');
	});

	moment.relativeTimeTreshold('s', 60);
    moment.relativeTimeTreshold('m', 60);
    moment.relativeTimeTreshold('h', 24);
    moment.relativeTimeTreshold('d', 28);
    moment.relativeTimeTreshold('M', 12);
})();
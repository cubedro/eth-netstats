(function() {
	$('body').on('mouseenter', '[data-toggle="tooltip"]', function( event ) {
		$(this).tooltip('show');
	}).on('mouseleave', '[data-toggle="tooltip"]', function( event ) {
		$(this).tooltip('hide');
	});

	$.fn.sparkline.defaults.bar.height = 63;
	$.fn.sparkline.defaults.bar.barWidth = 6;

	if( $('body').width() < 600 )
		$.fn.sparkline.defaults.bar.barWidth = 4;
	else if( $('body').width() < 1200 )
		$.fn.sparkline.defaults.bar.barWidth = 5;
	$.fn.sparkline.defaults.bar.barSpacing = 1;
	$.fn.sparkline.defaults.bar.tooltipClassname = 'jqstooltip';
	$.fn.sparkline.defaults.bar.tooltipOffsetX = 0;
	$.fn.sparkline.defaults.bar.tooltipFormat = $.spformat('<div class="tooltip-arrow"></div><div class="tooltip-inner">{{prefix}}{{value}} {{suffix}}</div>');
	$.fn.sparkline.defaults.bar.colorMap = $.range_map({
		'0:6': '#8be9fd',
		'6:15': '#50fa7b',
		'15:40': '#f1fa8c',
		'40:60': '#ffb86c',
		'60:': '#ff5555'
	});

	moment.relativeTimeThreshold('s', 60);
	moment.relativeTimeThreshold('m', 60);
	moment.relativeTimeThreshold('h', 24);
	moment.relativeTimeThreshold('d', 28);
	moment.relativeTimeThreshold('M', 12);

})();

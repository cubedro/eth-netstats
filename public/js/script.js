(function() {
	$('body').on('mouseenter', '[data-toggle="tooltip"]', function( event ) {
		$(this).tooltip('show');
	}).on('mouseleave', '[data-toggle="tooltip"]', function( event ) {
		$(this).tooltip('hide');
	});

	$.fn.sparkline.defaults.bar.height = 50;
	$.fn.sparkline.defaults.bar.barWidth = 6;
	$.fn.sparkline.defaults.bar.barSpacing = 2;
	$.fn.sparkline.defaults.bar.tooltipClassname = 'jqstooltip';
	$.fn.sparkline.defaults.bar.tooltipOffsetX = 0;
	$.fn.sparkline.defaults.bar.tooltipFormat = $.spformat('<div class="tooltip-arrow" style="left: 50%;"></div><div class="tooltip-inner">{{prefix}}{{value}}{{suffix}}</div>');
	$.fn.sparkline.defaults.bar.colorMap = $.range_map({
		'1:12': '#7bcc3a',
		'12:19': '#10a0de',
		'20:29': '#FFD162',
		'30:': '#F74B4B'
	});

	moment.relativeTimeThreshold('s', 60);
    moment.relativeTimeThreshold('m', 60);
    moment.relativeTimeThreshold('h', 24);
    moment.relativeTimeThreshold('d', 28);
    moment.relativeTimeThreshold('M', 12);
})();
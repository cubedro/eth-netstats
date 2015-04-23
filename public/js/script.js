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
	$.fn.sparkline.defaults.bar.tooltipFormat = $.spformat('<div class="tooltip-arrow"></div><div class="tooltip-inner">{{prefix}}{{value}}{{suffix}}</div>');
	$.fn.sparkline.defaults.bar.colorMap = $.range_map({
		'0:5': '#10a0de',
		'6:12': '#7bcc3a',
		'13:19': '#FFD162',
		'20:29': '#ff8a00',
		'30:': '#F74B4B'
	});

	moment.relativeTimeThreshold('s', 60);
	moment.relativeTimeThreshold('m', 60);
	moment.relativeTimeThreshold('h', 24);
	moment.relativeTimeThreshold('d', 28);
	moment.relativeTimeThreshold('M', 12);


	//   var bar = svg.insert("g", ".axis")
	//       .attr("class", "bar")
	//     .selectAll("g")
	//       .data(histogram)
	//     .enter().append("g")
	//       .attr("transform", function(d) { return "translate(" + x(d.x) + ",0)"; });

	  // bar.append("rect")
	  //     .attr("class", "b")
	  //     .attr("x", 1)
	  //     .attr("y", function(d) { return y(d.b); })
	  //     .attr("width", x(histogram[0].dx) - 1)
	  //     .attr("height", function(d) { return height - y(d.b); });

	//   bar.append("rect")
	//       .attr("class", "a")
	//       .attr("x", 1)
	//       .attr("y", function(d) { return y(d.y); })
	//       .attr("width", x(histogram[0].dx) - 1)
	//       .attr("height", function(d) { return height - y(d.a); });

	  // bar.filter(function(d) { return d.y / n >= .0095; }).append("text")
	  //     .attr("dy", ".015em")
	  //     .attr("transform", function(d) { return "translate(" + x(histogram[0].dx) / 2 + "," + (y(1000) + 6) + ")rotate(-90)"; })
	  //     // .attr("transform", function(d) { return "translate(" + x(histogram[0].dx) / 2 + "," + (y(d.y) + 6) + ")rotate(-90)"; })
	  //     .text(function(d) { return formatPercent(d.y / n); });
	// });

})();
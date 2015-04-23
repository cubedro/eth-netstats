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


	json = [4292,12436,13141,14268,14650,0,55,774,891,1045,1184,1520,1786,1819,2103,2523,2846,2895,3010,3219,13046,0,284,507,525,1410,1531,1673,1803,1978,2652,2961,4224,4863,5056,12281,0,561,812,903,2161,2210,2312,2450,2559,2725,3273,4559,4727,5868,7777,0,1621,6982,9008,14035,0,1181,2753,2782,3580,3945,5779,7936,21489,0,196,1587,1611,1648,2603,2998,3802,4265,4464,5323,5606,6551,9982,10417,0,884,989,1202,1247,1282,2297,2577,2735,2935,3288,4261,4652,4706,4855,6509];

	// var data = lineData = d3.layout.histogram()
	// 	  .frequency(true)
	// 	  .bins(x.ticks(40))
	// 	  (json);

	// y.domain([0, d3.max(data, function(d) { return d.y; })]);

	/* Start drawing */



	// d3.tsv("histogram.tsv", type, function(error, histogram) {
	//   var n = d3.sum(histogram, function(d) { return d.y = d.a; });

	//   y.domain([0, d3.max(histogram, function(d) { return d.y; })]);

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
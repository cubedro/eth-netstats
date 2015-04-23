'use strict';

/* Directives */


angular.module('netStatsApp.directives', []).
	directive('appVersion', ['version', function(version) {
		return function(scope, elm, attrs) {
			elm.text(version);
		};
}]).
	directive('nodemap', ['$compile', function($compile) {
		return {
			restrict: 'EA',
			scope: {
				data: '='
			},
			link: function(scope, element, attrs) {
				var bubbleConfig = {
					borderWidth: 0,
					highlightOnHover: false,
					popupOnHover: true,
					popupTemplate: function(geo, data) {
						return ['<div class="tooltip-arrow"></div><div class="hoverinfo ' + data.fillClass + '"><div class="propagationBox"></div><strong>',
								data.nodeName,
								'</strong></div>'].join('');
					}
				};

				scope.init = function() {
					element.empty();

					scope.map = new Datamap({
						element: element[0],
						scope: 'world',
						responsive: true,
						fills: {
							success: '#7BCC3A',
							info: '#10A0DE',
							warning: '#FFD162',
							orange: '#FF8A00',
							danger: '#F74B4B',
							defaultFill: '#282828'
						},
						geographyConfig: {
							borderWidth: 0,
							borderColor: '#000',
							highlightOnHover: false,
							popupOnHover: false
						},
						bubblesConfig: {
							borderWidth: 0,
							highlightOnHover: false,
							popupOnHover: true
						}
					});

					scope.map.bubbles(scope.data, bubbleConfig);
				}

				scope.init();

				window.onresize = function() {
					scope.$apply();
				};

				scope.$watch('data', function() {
					scope.map.bubbles(scope.data, bubbleConfig);
				}, true);

				scope.$watch(function() {
					return angular.element(window)[0].innerWidth;
				}, function() {
					scope.init();
				});
			}
		};
}]).
	directive('histogram', ['$compile', function($compile) {
		return {
			restrict: 'EA',
			scope: {
				data: '='
			},
			link: function(scope, element, attrs) {
				var margin = {top: 0, right: 0, bottom: 0, left: 0};
				var width = 280 - margin.left - margin.right,
					height = 173 - margin.top - margin.bottom;

				var TICKS = 40;

				var x = d3.scale.linear()
					.domain([0, 20000])
					.rangeRound([0, width])
					.interpolate(d3.interpolateRound);

				var y = d3.scale.linear()
					.range([height, 0])
					.interpolate(d3.interpolateRound);

				var xAxis = d3.svg.axis()
					.scale(x)
					.orient("bottom")
					.ticks(4, ",.1s")
					.tickFormat(function(t){ return t/1000 + "s"});

				var yAxis = d3.svg.axis()
					.scale(y)
					.orient("left")
					.ticks(4)
					.tickFormat(d3.format("%"));

				var line = d3.svg.line()
					.x(function(d) { return x(d.x + d.dx); })
					.y(function(d) { return y(d.y); })
					.interpolate('basis');

				scope.init = function()
				{
					// Init data
					var data = d3.layout.histogram()
						.frequency(false)
						.bins(x.ticks(TICKS))
						(scope.data);

					// Adjust y axis
					y.domain([0, d3.max(data, function(d) { return d.y; })]);

					// Delete previous histogram
					element.empty();

					/* Start drawing */
					var svg = d3.select(".d3-blockpropagation").append("svg")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
					  .append("g")
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

					svg.append("g")
						.attr("class", "x axis")
						.attr("transform", "translate(0," + height + ")")
						.call(xAxis);

					svg.append("g")
						.attr("class", "y axis")
						// .attr("transform", "translate(0, 0)")
						.attr("transform", "translate(" + width + ", 0)")
						.call(yAxis);


					svg.selectAll(".bar")
						.data(data)
					  .enter().insert("rect", ".axis")
						.attr("class", "bar")
						.attr("x", function(d) { return x(d.x) + 1; })
						.attr("y", function(d) { return y(d.y); })
						.attr("rx", 1)
						.attr("ry", 1)
						.attr("width", x(data[0].dx + data[0].x) - x(data[0].x) - 1)
						.attr("height", function(d) { return height - y(d.y); });

					svg.append("path")
						.attr("class", "line")
						.attr("d", line(data));
				}

				scope.init();

				scope.$watch('data', function() {
					scope.init();
				}, true);
			}
		};
	}]);
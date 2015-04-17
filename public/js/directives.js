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
	}]);
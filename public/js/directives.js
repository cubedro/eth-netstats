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
				scope.init = function() {
					element.empty();

					scope.map = new Datamap({
						element: element[0],
						scope: 'world',
						responsive: true,
						fills: {
							success: '#7bcc3a',
							info: '#10a0de',
							warning: '#FFD162',
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
							popupOnHover: false,
							highlightOnHover: false
						}
					});

					scope.map.bubbles(scope.data, {
						borderWidth: 0,
						popupOnHover: false,
						highlightOnHover: false
					});
				}

				scope.init();

				window.onresize = function() {
					scope.$apply();
				};

				scope.$watch('data', function() {
					scope.map.bubbles(scope.data, {
						borderWidth: 0,
						popupOnHover: false,
						highlightOnHover: false
					});
				}, true);

				scope.$watch(function() {
					return angular.element(window)[0].innerWidth;
				}, function() {
					scope.init();
				});
			}
		};
	}]);
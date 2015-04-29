'use strict';

var netStatsApp = angular.module('netStatsApp', ['lodash', 'angularMoment', 'netStatsApp.filters', 'netStatsApp.directives']);

netStatsApp.run(function(amMoment) {
	amMoment.changeLocale('en-gb');
});
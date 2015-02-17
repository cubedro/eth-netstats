'use strict';

var app = angular.module('netStatsApp', ['lodash', 'angularMoment', 'netStatsApp.filters', 'netStatsApp.directives']);

app.run(function(amMoment) {
	amMoment.changeLocale('en-gb');
});
'use strict';

var app = angular.module('netStatsApp', ['underscore', 'angularMoment', 'netStatsApp.filters', 'netStatsApp.directives']);

app.run(function(amMoment) {
	amMoment.changeLocale('en-gb');
});
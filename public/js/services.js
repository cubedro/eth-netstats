'use strict';

/* Services */

netStatsApp.factory('socket', function ($rootScope) {
  var socket = new Primus();
  return socket;
});

netStatsApp.factory('toastr', function ($rootScope) {
  toastr = window.toastr;
  toastr.options = {
    "closeButton": false,
    "debug": false,
    "progressBar": false,
    "newestOnTop": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };
  return toastr;
});

var lodash = angular.module('lodash', []);
lodash.factory('_', function() {
  return window._;
});
'use strict';

/* Services */

app.factory('socket', function ($rootScope) {
  var socket;// = new Primus();
  return socket;
  // return {
  //   on: function (eventName, callback) {
  //     socket.on(eventName, function () {
  //       var args = arguments;
  //       $rootScope.$apply(function () {
  //         callback.apply(socket, args);
  //       });
  //     });
  //   },
  //   emit: function (eventName, data, callback) {
  //     socket.emit(eventName, data, function () {
  //       var args = arguments;
  //       $rootScope.$apply(function () {
  //         if (callback) {
  //           callback.apply(socket, args);
  //         }
  //       });
  //     })
  //   }
  // };
});

app.factory('toastr', function ($rootScope) {
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
(function(){/* Services */

_ = lodash;

socket = new Primus({url: 'ws://ubiq.darcr.us'});

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

})();

(function() {
	$('body').on('mouseenter', '[data-toggle="tooltip"]', function( event ) {
		$(this).tooltip('show');
	}).on('mouseleave', '[data-toggle="tooltip"]', function( event ) {
		$(this).tooltip('hide');
	});

	$.fn.sparkline.defaults.bar.height = 63;
	$.fn.sparkline.defaults.bar.barWidth = 6;
	$.fn.sparkline.defaults.bar.barSpacing = 1;
	$.fn.sparkline.defaults.bar.tooltipClassname = 'jqstooltip';
	$.fn.sparkline.defaults.bar.tooltipOffsetX = 0;
	$.fn.sparkline.defaults.bar.tooltipFormat = $.spformat('<div class="tooltip-arrow"></div><div class="tooltip-inner">{{prefix}}{{value}} {{suffix}}</div>');
	$.fn.sparkline.defaults.bar.colorMap = $.range_map({
		'0:6': '#FF4500',
		'6:15': '#3DCF35',
		'15:40': '#FF9641',
		'40:60': '#c20061',
		'60:': '#FF4500'
	});

	moment.relativeTimeThreshold('s', 60);
	moment.relativeTimeThreshold('m', 60);
	moment.relativeTimeThreshold('h', 24);
	moment.relativeTimeThreshold('d', 28);
	moment.relativeTimeThreshold('M', 12);

})();

window.onload = function() {
  particlesJS('particles', {
	  "particles": {
	    "number": {
	      "value": 271,
	      "density": {
	        "enable": true,
	        "value_area": 800
	      }
	    },
	    "color": {
	      "value": "#ffffff"
	    },
	    "shape": {
	      "type": "polygon",
	      "stroke": {
	        "width": 0,
	        "color": "#000000"
	      },
	      "polygon": {
	        "nb_sides": 6
	      },
	    },
	    "opacity": {
	      "value": 0.5,
	      "random": true,
	      "anim": {
	        "enable": true,
	        "speed": 1,
	        "opacity_min": 0.15426585690623884,
	        "sync": false
	      }
	    },
	    "size": {
	      "value": 2,
	      "random": true,
	      "anim": {
	        "enable": true,
	        "speed": 4.87155337598649,
	        "size_min": 0.1,
	        "sync": false
	      }
	    },
	    "line_linked": {
	      "enable": true,
	      "distance": 64,
	      "color": "#ffffff",
	      "opacity": 0.05,
	      "width": 1
	    },
	    "move": {
	      "enable": true,
	      "speed": 0.1,
	      "direction": "top-left",
	      "random": true,
	      "straight": false,
	      "out_mode": "out",
	      "bounce": false,
	      "attract": {
	        "enable": false,
	        "rotateX": 600,
	        "rotateY": 1200
	      }
	    }
	  },
	  "interactivity": {
	    "detect_on": "canvas",
	    "events": {
	      "onhover": {
	        "enable": true,
	        "mode": "push"
	      },
	      "onclick": {
	        "enable": false,
	        "mode": "push"
	      },
	      "resize": true
	    },
	    "modes": {
	      "grab": {
	        "distance": 400,
	        "line_linked": {
	          "opacity": 1
	        }
	      },
	      "bubble": {
	        "distance": 400,
	        "size": 40,
	        "duration": 2,
	        "opacity": 8,
	        "speed": 3
	      },
	      "repulse": {
	        "distance": 200,
	        "duration": 0.4
	      },
	      "push": {
	        "particles_nb": 4
	      },
	      "remove": {
	        "particles_nb": 2
	      }
	    }
	  },
	  "retina_detect": true
	})
};

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-114134503-1', 'auto');
ga('send', 'pageview');

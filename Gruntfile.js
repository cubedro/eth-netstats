var src = 'public/';
var dest = 'dist/';

var scripts = [
	'public/js/app.js',
	'public/js/controllers.js',
	'public/js/filters.js',
	'public/js/directives.js',
	'public/js/script.js'
];

var vendor = [
	'public/js/lib/jquery.min.js',
	'public/js/lib/bootstrap.min.js',
	'public/js/lib/angular.min.js',
	'public/js/lib/lodash.min.js',
	'public/js/lib/d3.min.js',
	'public/js/lib/d3.tip.min.js',
	'public/js/lib/topojson.min.js',
	'public/js/lib/datamaps.min.js',
	'public/js/lib/moment.min.js',
	'public/js/lib/moment.en.min.js',
	'public/js/lib/toastr.min.js',
	'public/js/lib/jquery.sparkline.min.js',
	'public/js/lib/primus.min.js'
];

var styles = [
	'bootstrap.min.css',
	'minimal-icons-embedded.css',
	'toastr.min.css',
	'style.css'
];

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			build: ['dist'],
			cleanup_js: ['dist/js/*.*', '!dist/js/netstats.*'],
			cleanup_css: ['dist/css/*.css', '!dist/css/netstats.*.css']
		},
		jade: {
			build: {
				options: {
					data: {
						debug: false,
						pretty: true
					}
				},
				files: {
					'dist/index.html': 'views/index.jade'
				}
			}
		},
		copy: {
			build: {
				files: [
					{
						expand: true,
						cwd: 'public/fonts/',
						src: ['minimal-*.*'],
						dest: 'dist/fonts/',
						filter: 'isFile'
					},
					{
						expand: true,
						cwd: 'public/images/',
						src: ['*.ico'],
						dest: 'dist/',
						filter: 'isFile'
					},
					{
						expand: true,
						cwd: 'public/css/',
						src: styles,
						dest: 'dist/css/',
						filter: 'isFile'
					},
					{
						src: 'public/js/lib/angular.min.js.map',
						dest: 'dist/js/angular.min.js.map'
					}
				]
			}
		},
		cssmin: {
			build: {
				files: [{
					expand: true,
					cwd: 'dist/css',
					src: ['*.css', '!*.min.css'],
					dest: 'dist/css/'
				}]
			}
		},
		concat: {
			vendor: {
				src: vendor,
				dest: 'dist/js/vendor.min.js'
			},
			scripts : {
				options: {
					separator: ';',
				},
				src: scripts,
				dest: 'dist/js/app.js'
			},
			netstats: {
				options: {
					sourceMap: true
				},
				src: ['<%= concat.vendor.dest %>', '<%= uglify.app.dest %>'],
				dest: 'dist/js/netstats.min.js'
			},
			css: {
				src: ['dist/css/*.min.css', 'dist/css/*.css'],
				dest: 'dist/css/netstats.min.css'
			}
		},
		uglify: {
			app: {
				options: {
					mangle: false,
				},
				dest: 'dist/js/app.min.js',
				src: ['<%= concat.scripts.dest %>']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['clean', 'jade', 'copy', 'cssmin', 'concat:vendor', 'concat:scripts', 'uglify', 'concat:netstats', 'concat:css', 'clean:cleanup_js', 'clean:cleanup_css']);
	grunt.registerTask('build',   'default');
};
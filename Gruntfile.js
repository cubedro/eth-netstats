var src = 'src/';
var dest = 'dist/';

var scripts = [
	'src/js/app.js',
	'src/js/controllers.js',
	'src/js/filters.js',
	'src/js/directives.js',
	'src/js/script.js'
];

var vendor = [
	'dist/js/lib/jquery-1.11.3.min.js',
	'dist/js/lib/bootstrap.min.js',
	'dist/js/lib/angular.min.js',
	'dist/js/lib/ngStorage.min.js',
	'dist/js/lib/lodash.min.js',
	'dist/js/lib/d3.min.js',
	'dist/js/lib/d3.tip.min.js',
	'dist/js/lib/topojson.min.js',
	'dist/js/lib/datamaps.min.js',
	'dist/js/lib/moment.min.js',
	'dist/js/lib/moment.en.min.js',
	'dist/js/lib/toastr.min.js',
	'dist/js/lib/jquery.sparkline.min.js',
	'dist/js/lib/primus.min.js'
];

var styles = [
	'bootstrap.min.css',
	'minimal-icons-embedded.css',
	'toastr.min.css',
	'style.css'
];

var src_lite = 'src-lite/';
var dest_lite = 'dist-lite/';

var scripts_lite = [
	'src-lite/js/app.js',
	'src-lite/js/controllers.js',
	'src-lite/js/filters.js',
	'src-lite/js/directives.js',
	'src-lite/js/script.js'
];

var vendor_lite = [
	'dist-lite/js/lib/jquery-1.11.3.min.js',
	'dist-lite/js/lib/bootstrap.min.js',
	'dist-lite/js/lib/angular.min.js',
	'dist-lite/js/lib/lodash.min.js',
	'dist-lite/js/lib/d3.min.js',
	'dist-lite/js/lib/d3.tip.min.js',
	'dist-lite/js/lib/moment.min.js',
	'dist-lite/js/lib/moment.en.min.js',
	'dist-lite/js/lib/toastr.min.js',
	'dist-lite/js/lib/jquery.sparkline.min.js',
	'dist-lite/js/lib/primus.min.js'
];

var styles_lite = [
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
			cleanup_css: ['dist/css/*.css', '!dist/css/netstats.*.css'],
			build_lite: ['dist-lite'],
			cleanup_js_lite: ['dist-lite/js/*.*', '!dist-lite/js/netstats.*'],
			cleanup_css_lite: ['dist-lite/css/*.css', '!dist-lite/css/netstats.*.css']
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
					'dist/index.html': 'src/views/index.jade'
				}
			},
			build_lite: {
				options: {
					data: {
						debug: false,
						pretty: true
					}
				},
				files: {
					'dist-lite/index.html': 'src-lite/views/index.jade'
				}
			}
		},
		copy: {
			build: {
				files: [
					{
						expand: true,
						cwd: 'src/fonts/',
						src: ['minimal-*.*'],
						dest: 'dist/fonts/',
						filter: 'isFile'
					},
					{
						expand: true,
						cwd: 'src/images/',
						src: ['*.ico'],
						dest: 'dist/',
						filter: 'isFile'
					},
					{
						expand: true,
						cwd: 'src/css/',
						src: styles,
						dest: 'dist/css/',
						filter: 'isFile'
					},
					{
						expand: true,
						cwd: 'src/js/lib/',
						src: ['*.*'],
						dest: 'dist/js/lib'
					}
				]
			},
			build_lite: {
				files: [
					{
						expand: true,
						cwd: 'src-lite/fonts/',
						src: ['minimal-*.*'],
						dest: 'dist-lite/fonts/',
						filter: 'isFile'
					},
					{
						expand: true,
						cwd: 'src-lite/images/',
						src: ['*.ico'],
						dest: 'dist-lite/',
						filter: 'isFile'
					},
					{
						expand: true,
						cwd: 'src-lite/css/',
						src: styles,
						dest: 'dist-lite/css/',
						filter: 'isFile'
					},
					{
						expand: true,
						cwd: 'src-lite/js/lib/',
						src: ['*.*'],
						dest: 'dist-lite/js/lib'
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
			},
			build_lite: {
				files: [{
					expand: true,
					cwd: 'dist-lite/css',
					src: ['*.css', '!*.min.css'],
					dest: 'dist-lite/css/'
				}]
			}
		},
		concat: {
			vendor: {
				options: {
					souceMap: false,
					sourceMapIncludeSources: true,
					sourceMapIn: ['dist/js/lib/*.map']
				},
				src: vendor,
				dest: 'dist/js/vendor.min.js'
			},
			scripts : {
				options: {
					separator: ';\n',
				},
				src: scripts,
				dest: 'dist/js/app.js'
			},
			netstats: {
				options: {
					sourceMap: false,
					sourceMapIncludeSources: true,
					sourceMapIn: ['dist/js/vendor.min.js.map', 'dist/js/app.min.js.map']
				},
				src: ['<%= concat.vendor.dest %>', '<%= uglify.app.dest %>'],
				dest: 'dist/js/netstats.min.js',
				nonull: true
			},
			css: {
				src: ['dist/css/*.min.css', 'dist/css/*.css'],
				dest: 'dist/css/netstats.min.css'
			},
			vendor_lite: {
				options: {
					sourceMap: false,
					sourceMapIncludeSources: true,
					sourceMapIn: ['dist-lite/js/lib/*.map']
				},
				src: vendor_lite,
				dest: 'dist-lite/js/vendor.min.js'
			},
			scripts_lite : {
				options: {
					separator: ';\n',
				},
				src: scripts_lite,
				dest: 'dist-lite/js/app.js'
			},
			netstats_lite: {
				options: {
					sourceMap: false,
					sourceMapIncludeSources: true,
					sourceMapIn: ['dist-lite/js/vendor.min.js.map', 'dist-lite/js/app.min.js.map']
				},
				src: ['<%= concat.vendor_lite.dest %>', '<%= uglify.app_lite.dest %>'],
				dest: 'dist-lite/js/netstats.min.js',
				nonull: true,
			},
			css_lite: {
				src: ['dist-lite/css/*.min.css', 'dist-lite/css/*.css'],
				dest: 'dist-lite/css/netstats.min.css'
			}
		},
		uglify: {
			app: {
				options: {
					mangle: false,
					sourceMap: false,
					sourceMapIncludeSources: true
				},
				dest: 'dist/js/app.min.js',
				src: ['<%= concat.scripts.dest %>']
			},
			app_lite: {
				options: {
					mangle: false,
					sourceMap: false,
					sourceMapIncludeSources: true
				},
				dest: 'dist-lite/js/app.min.js',
				src: ['<%= concat.scripts_lite.dest %>']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['clean:build', 'clean:cleanup_js', 'clean:cleanup_css', 'jade:build', 'copy:build', 'cssmin:build', 'concat:vendor', 'concat:scripts', 'uglify:app', 'concat:netstats', 'concat:css', 'clean:cleanup_js', 'clean:cleanup_css']);
	grunt.registerTask('lite', ['clean:build_lite', 'clean:cleanup_js_lite', 'clean:cleanup_css_lite', 'jade:build_lite', 'copy:build_lite', 'cssmin:build_lite', 'concat:vendor_lite', 'concat:scripts_lite', 'uglify:app_lite', 'concat:netstats_lite', 'concat:css_lite', 'clean:cleanup_js_lite', 'clean:cleanup_css_lite']);
	grunt.registerTask('build',   'default');
	grunt.registerTask('all',   ['default', 'lite']);
};

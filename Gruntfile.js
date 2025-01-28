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

module.exports = function(grunt) {
	scripts.unshift(grunt.option('configPath') || 'src/js/defaultConfig.js');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			build: ['dist'],
			js: ['dist/js/*.*', '!dist/js/netstats.*'],
			css: ['dist/css/*.css', '!dist/css/netstats.*.css']
		},
		pug: {
			build: {
				options: {
					data: {
						debug: false,
						pretty: true
					}
				},
				files: {
					'dist/index.html': 'src/views/index.pug'
				}
			},
			build_pow: {
				options: {
					data: {
						debug: false,
						pretty: true
					}
				},
				files: {
					'dist/index.html': 'src/pow/views/index.pug'
				}
			}
		},
		copy: {
			build: {
				files: [
					{
						expand: true,
						cwd: 'src/fonts/',
						src: ['*.*'],
						dest: 'dist/fonts/',
						filter: 'isFile'
					},
					{
						expand: true,
						cwd: 'src/images/',
						src: ['*.*'],
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
			build_pow: {
				files: [
					{
						expand: true,
						cwd: 'src/fonts/',
						src: ['*.*'],
						dest: 'dist/fonts/',
						filter: 'isFile'
					},
					{
						expand: true,
						cwd: 'src/images/',
						src: ['*.*'],
						dest: 'dist/',
						filter: 'isFile'
					},
					{
						expand: true,
						cwd: 'src/pow/css/',
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
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['clean:build', 'clean:js', 'clean:css', 'pug:build', 'copy:build', 'cssmin:build', 'concat:vendor', 'concat:scripts', 'uglify:app', 'concat:netstats', 'concat:css', 'clean:js', 'clean:css']);
	grunt.registerTask('pow', ['clean:build', 'clean:js', 'clean:css', 'pug:build_pow', 'copy:build_pow', 'cssmin:build', 'concat:vendor', 'concat:scripts', 'uglify:app', 'concat:netstats', 'concat:css', 'clean:js', 'clean:css']);
	grunt.registerTask('poa',   'default');
};

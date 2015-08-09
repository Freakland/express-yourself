module.exports = function(grunt) {

	grunt.initConfig({
		concat: {
			options: {
				separator: ';;\n;;'
			},
			app: {
				src: ['app/assets/javascripts/all.js'],
				dest: 'public/javascripts/all.js'
			}
		},
		uglify: {
			options: {
				mangle: false
			},
			my_target: {
				files: {
					'public/javascripts/all.min.js': ['public/javascripts/all.js']
				}
			}
		},
		stylus: {
			compile: {
				options: {
					paths: ['app/assets/stylesheets'],
					urlfunc: 'embedurl',
					use: [],
					import: [] //Import for every file
				},
				files: {
					'public/stylesheets/all.css': 'app/assets/stylesheets/all.styl'
				}
			}
		},
		copy: {
			main: {
				files: [
					{
						expand: true,
						dest: 'public',
						cwd: 'app/assets',
						src: ['images/**', 'fonts/*', 'favicons/*']
					}
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['concat', 'uglify', 'stylus', 'copy']);

};
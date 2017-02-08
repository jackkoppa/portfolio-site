module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'css/styles.css': 'scss/styles.scss',
                    'css/base.css': 'scss/base.scss'
                }
            }
        },

        postcss: {
            options: {
                map: {
                    inline: false,
                    annotation: 'css/maps/'
                },

                processors: [
                    require('autoprefixer')({browsers: 'last 2 versions'}),
                ]
            },
            dist: {
                src: 'css/*.css'
            }
        },

        watch: {
            sass: {
                files: ['scss/*.scss'],
                tasks: ['sass'],
            },
            // removing livereload
            /*livereload: {
                options: { livereload: true },
                files: ['css/*.css'],
            },*/
        },
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass','postcss']);

};
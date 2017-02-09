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

        clean: {
            dev: {
                src: ['img'],
            },
        },

        responsive_images: {
            dev: {
                options: {
                    engine: 'im',
                    sizes: [{
                        name: "480",
                        width: "480",
                        quality: 50
                    },{
                        name: "640",
                        width: "640",
                        quality: 50
                    },{
                        name: "900",
                        width: "900",
                        quality: 60
                    },{
                        name: "1800",
                        width: "1800",
                        quality: 60,
                        suffix: "_2x"
                    }
                    ]
                },

                files: [{
                    expand: true,
                    src: ['*.jpg'],
                    cwd: 'images_src/',
                    dest: 'img/'
                }]
            }
        },
        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'images_src',
                    src: '*.{gif,png,svg}',
                    dest: 'img/'
                }]
            },
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
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass','postcss','clean','responsive_images','copy']);

};
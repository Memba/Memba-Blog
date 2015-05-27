//http://gruntjs.com/sample-gruntfile

module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['gruntfile.js', 'js/**/*.js', 'webapp/**/*.js', 'test/**/*.js'],
            options: {
                jshintrc: true
            }
        },
        kendo_lint: {
            files: ['src/js/app*.js']
        },
        /*
        csslint: {
            strict: {
                options: {
                    import: 2
                },
                src: ['src/styles/app.*.css']
            }
        },
        */
        webpack: {
            build: require(__dirname + '/webpack.config.js')
        },
        mochaTest: {
            all: {
                options: {
                    quiet: false,
                    reporter: 'spec',
                    timeout: 10000,
                    ui: 'bdd'
                },
                src: ['test/**/*.js']
            }
        }
        /*
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths: 'src/js/',
                    outdir: 'docs/yui/'
                }
            }
        }
        */
    });

    //Lint
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-kendo-lint');
    //grunt.loadNpmTasks('grunt-contrib-csslint');

    //Build
    grunt.loadNpmTasks('grunt-webpack');

    //Tests
    //grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-mocha-test');

    //Documentation
    //grunt.loadNpmTasks('grunt-contrib-yuidoc');

    grunt.registerTask('lint', ['jshint', 'kendo_lint']);
    grunt.registerTask('build', ['webpack']);
    grunt.registerTask('test', ['mochaTest']);
    grunt.registerTask('default', ['lint', 'build', 'test']);

};

/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

module.exports = function (grunt) {

    var webpack = require('webpack');
    var webpackConfig = require(__dirname + '/webpack.config.js');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['gruntfile.js', 'webpack.config.js', 'js/**/*.js', 'webapp/**/*.js', 'test/**/*.js'],
            ignores: ['js/vendor/**/*.js', 'webapp/public/**/*.js', 'test/vendor/**/*.js'],
            options: {
                jshintrc: true
            }
        },
        kendo_lint: {
            files: ['src/js/app*.js']
        },
        env : {
            build : {
                NODE_ENV: 'production'
            }
        },
        webpack: {
            options: webpackConfig,
            build: {
                //See https://github.com/webpack/webpack-with-common-libs/blob/master/Gruntfile.jsgrunt webpack
                plugins: webpackConfig.plugins.concat(
                    new webpack.DefinePlugin({
                        'process.env': {
                            'NODE_ENV': JSON.stringify('production')
                        }
                    }),
                    new webpack.optimize.UglifyJsPlugin()
                )
            }
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
    });

    //Lint
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-kendo-lint');

    //Build
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-webpack');

    //Tests
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('lint', ['jshint', 'kendo_lint']);
    grunt.registerTask('build', ['env:build', 'webpack:build']);
    grunt.registerTask('test', ['mochaTest']);
    grunt.registerTask('default', ['lint', 'build', 'test']);

};

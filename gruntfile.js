/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

module.exports = function (grunt) {

    /**
     * Unfortunately, we cannot use grunt-env to set the environment
     * - webpack uses a DefinePlugin which reads process.env.NODE_ENV
     * - nconf reads process.env.NODE_ENV
     * Both read the environment variable before grunt-env can set it in the grunt process.
     * So we have not other way than to actually set NODE_ENV in the OS to produce a build
     * especially set NODE_ENV=production for a production build
     */

    if (process.env.NODE_ENV) {
        console.log('grunt environment is ' + process.env.NODE_ENV);
    } else {
        console.log('IMPORTANT: grunt environment is undefined. Launch your webstorm terminal session with cmd.exe /K "set NODE_ENV=development"');
    }

    var webpack = require('webpack'),
        webpackConfig = require(__dirname + '/webpack.config.js');

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
        webpack: {
            //See https://github.com/webpack/webpack-with-common-libs/blob/master/Gruntfile.js
            options: webpackConfig,
            build: {
                plugins: webpackConfig.plugins.concat(
                    new webpack.optimize.DedupePlugin(),
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
    grunt.loadNpmTasks('grunt-webpack');

    //Tests
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('lint', ['jshint', 'kendo_lint']);
    grunt.registerTask('build', ['webpack:build']);
    grunt.registerTask('test', ['mochaTest']);
    grunt.registerTask('default', ['lint', 'build', 'test']);

};

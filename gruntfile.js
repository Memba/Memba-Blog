/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba/Kidoju-Platform
 */

/* jslint node: true */
/* jshint node: true */

/* And because of kendo_lint */
/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */

'use strict';

module.exports = function (grunt) {

    /**
     * Unfortunately, we cannot use grunt-env to set the environment
     * - webpack uses a DefinePlugin which reads process.env.NODE_ENV
     * - nconf reads process.env.NODE_ENV
     * Both read the environment variable before grunt-env can set it in the grunt process.
     * So we have not other way than to actually set NODE_ENV in the OS to produce a build
     * especially set NODE_ENV=production for a production build.
     */

    if (process.env.NODE_ENV) {
        console.log('grunt environment is ' + process.env.NODE_ENV);
    } else {
        console.log('IMPORTANT: grunt environment is undefined. Use the `build.cmd` script');
    }

    var webpack = require('webpack');
    var webpackConfig = require(__dirname + '/webpack.config.js');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            gremlins: {
                src: 'test/vendor/gremlins.min.js',
                dest: 'webapp/public/build/gremlins.min.js'
            }
        },
        jscs: {
            files: ['gruntfile.js', 'webpack.config.js', 'js/**/app.*.js', 'js/**/*.jsx', 'webapp/**/*.js', 'test/**/*.js'],
            options: {
                config: '.jscsrc',
                excludeFiles: ['js/kidoju.*.js', 'js/vendor/**/*.js', 'webapp/public/**/*.js', 'test/vendor/**/*.js']
            }
        },
        jshint: {
            all: ['gruntfile.js', 'webpack.config.js', 'js/**/app.*.js', 'js/**/*.jsx', 'webapp/**/*.js', 'test/**/*.js'],
            ignores: ['js/kidoju.*.js', 'js/vendor/**/*.js', 'webapp/public/**/*.js', 'test/vendor/**/*.js'],
            options: {
                jshintrc: true
            }
        },
        /*
        // Kendo Lint is now obsolete
        kendo_lint: {
            files: ['src/js/app*.js']
        },
        */
        // TODO: lint html too
        mocha: {
            browser: { // In browser (phantomJS) unit tests
                options: {
                    growlOnSuccess: false,
                    log: true,
                    logErrors: true,
                    reporter: 'Spec',
                    run: true,
                    timeout: 5000
                },
                src: ['test/browser/**/*.html']
            }
        },
        mochaTest: { // In node unit tests
            node: {
                options: {
                    quiet: false,
                    reporter: 'spec',
                    timeout: 10000,
                    ui: 'bdd'
                },
                src: ['test/node/**/*.js']
            }
        },
        nsp: {
            package: grunt.file.readJSON('package.json')
        },
        uglify: {
            build: {
                options: {
                    banner: '/*! <%= pkg.copyright %> - Version <%= pkg.version %> dated <%= grunt.template.today() %> */',
                    sourceMap: false
                    // sourceMap: true,
                    // sourceMapName: 'webapp/public/build/workerlib.bundle.js.map'
                },
                files: {
                    'webapp/public/build/workerlib.bundle.js': ['js/kidoju.data.workerlib.js']
                }
            }
        },
        webdriver: { // Selenium functional tests
            local: {
                configFile: './wdio.conf.js'
            }
        },
        webpack: {
            // @see https://github.com/webpack/webpack-with-common-libs/blob/master/Gruntfile.js
            options: webpackConfig,
            build: {
                cache: false,
                devtool: false,
                plugins: webpackConfig.plugins.concat(
                    new webpack.optimize.UglifyJsPlugin({
                        // banner: '/*! <%= pkg.copyright %> - Version <%= pkg.version %> dated <%= grunt.template.today() %> */',
                        comments: false,
                        compress: {
                            screw_ie8: true,
                            warnings: false
                        },
                        sourceMap: false
                    }),
                    new webpack.BannerPlugin({
                        banner: '/*! <%= pkg.copyright %> - Version <%= pkg.version %> dated <%= grunt.template.today() %> */',
                        raw: true
                        // entryOnly: true
                    })
                )
            }
        }
    });

    // Load npm tasks
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    // grunt.loadNpmTasks('grunt-kendo-lint');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-nsp');
    grunt.loadNpmTasks('grunt-webdriver');
    grunt.loadNpmTasks('grunt-webpack');

    // Custom
    grunt.registerTask('lint', ['jscs', 'jshint', 'nsp']); // , 'kendo_lint']);
    grunt.registerTask('build', ['webpack:build', 'uglify:build']);
    grunt.registerTask('test', ['mocha', 'mochaTest', 'copy:gremlins', 'webdriver']);
    grunt.registerTask('default', ['lint', 'build', 'test']);

};

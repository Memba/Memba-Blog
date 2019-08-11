/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// Karma configuration
module.exports = config => {
    config.set({
        // mocha configuration
        client: {
            mocha: {
                ui: 'bdd',
                timeout: 10000
            }
        },

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // Increase timeout especially for phantomJS
        browserDisconnectTimeout: 5000,

        // Available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai', 'sinon'],

        // list of files / patterns to load in the browser
        files: [
            {
                pattern: 'js/vendor/jquery/jquery-3.4.1.min.js',
                served: true,
                included: true
            },
            {
                pattern: 'js/vendor/kendo/kendo.all.min.js',
                served: true,
                included: true
            },
            {
                pattern: 'test/unit/*.js',
                served: true,
                included: false
            }
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '/js/*.js': ['coverage']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome', 'Edge', 'IE', 'Safari', 'Firefox', 'PhantomJS'],

        // optionally, configure the reporter
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};

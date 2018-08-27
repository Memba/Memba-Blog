/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba/Kidoju-Platform
 */

/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const webpack = require('webpack');
const AutoprefixPlugin = require('less-plugin-autoprefix');
const CleanCssPlugin = require('less-plugin-clean-css');

const webpackConfig = require('./webpack.config.js');

module.exports = grunt => {
    /**
     * Unfortunately, we cannot use grunt-env to set the environment
     * - webpack uses a DefinePlugin which reads process.env.NODE_ENV
     * - nconf reads process.env.NODE_ENV
     * Both read the environment variable before grunt-env can set it in the grunt process.
     * So we have not other way than to actually set NODE_ENV in the OS to produce a build
     * especially set NODE_ENV=production for a production build.
     */

    if (process.env.NODE_ENV) {
        // eslint-disable-next-line no-console
        console.log(`grunt environment is ${process.env.NODE_ENV}`);
    } else {
        // eslint-disable-next-line no-console
        console.log(
            'IMPORTANT: grunt environment is undefined. Please set NODE_ENV.'
        );
    }

    const pkg = grunt.file.readJSON('package.json');
    const banner = `/*! ${pkg.copyright} - Version ${
        pkg.version
    } dated ${grunt.template.today('dd-mmm-yyyy')} */`;
    // console.log(banner);

    grunt.initConfig({
        pkg,
        copy: {
            gremlins: {
                src: 'test/vendor/gremlins.min.js',
                dest: 'webapp/public/build/gremlins.min.js'
            }
        },
        eslint: {
            files: ['**/*.es6', '*.js', 'webapp/server.js'],
            options: {
                config: '.eslintrc'
            }
        },
        jscs: {
            files: [
                'js/**/app.*.js',
                'js/**/*.jsx',
                'test/**/*.js',
                'webapp/**/*.js'
            ],
            options: {
                config: '.jscsrc',
                excludeFiles: [
                    '*.js',
                    'webapp/server.js',
                    'js/kidoju.*.js',
                    'js/vendor/**/*.js',
                    'test/vendor/**/*.js',
                    'webapp/public/**/*.js'
                ]
            }
        },
        jshint: {
            files: [
                'js/**/app.*.js',
                'js/**/*.jsx',
                'webapp/**/*.js',
                'test/**/*.js'
            ],
            options: {
                // .jshintignore does ot work with grunt-contrib-jshint
                ignores: [
                    '*.js',
                    'webapp/server.js',
                    'js/kidoju.*.js',
                    'js/vendor/**/*.js',
                    'test/vendor/**/*.js',
                    'webapp/public/**/*.js'
                ],
                jshintrc: true
            }
        },
        /*
        // Kendo Lint is now obsolete
        kendo_lint: {
            files: ['src/js/app*.js']
        },
        */
        less: {
            options: {
                banner,
                // paths: ['webapp/views/amp/styles'],
                plugins: [new AutoprefixPlugin(), new CleanCssPlugin()],
                sourceMap: false
            },
            files: {
                expand: true,
                cwd: './webapp/views/amp/styles',
                src: ['*.theme.less'],
                dest: 'webapp/views/amp/css',
                ext: '.css'
            }
        },
        mocha: {
            // In browser (phantomJS) unit tests
            browser: {
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
        mochaTest: {
            // In node unit tests
            node: {
                options: {
                    quiet: false,
                    reporter: 'spec',
                    timeout: 10000,
                    ui: 'bdd'
                },
                src: ['test/node/**/*.{es6,js}']
            }
        },
        nsp: {
            package: pkg
        },
        stylelint: {
            options: {
                configFile: '.stylelintrc'
            },
            src: ['styles/**/*.{css,less,scss}']
        },
        uglify: {
            build: {
                options: {
                    banner,
                    sourceMap: false
                    // sourceMap: true,
                    // sourceMapName: 'webapp/public/build/workerlib.bundle.js.map'
                },
                files: {
                    'webapp/public/build/workerlib.bundle.js': [
                        'js/vendor/jashkenas/underscore.js',
                        'js/vendor/khan/kas.js',
                        'js/kidoju.data.workerlib.js'
                    ]
                }
            }
        },
        webdriver: {
            // Selenium functional tests
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
                plugins: webpackConfig.plugins.concat([
                    new webpack.BannerPlugin({
                        banner,
                        raw: true
                        // entryOnly: true
                    })
                ])
            }
        }
    });

    // Load npm tasks
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-jscs');
    // grunt.loadNpmTasks('grunt-kendo-lint');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-nsp');
    grunt.loadNpmTasks('grunt-stylelint');
    grunt.loadNpmTasks('grunt-webdriver');
    grunt.loadNpmTasks('grunt-webpack');

    // Commands
    grunt.registerTask('lint', [
        'eslint',
        'jscs',
        'jshint',
        'stylelint',
        'nsp'
    ]); // , 'kendo_lint']);
    grunt.registerTask('build', ['webpack:build', 'uglify:build', 'less']);
    grunt.registerTask('test', [
        'mocha',
        'mochaTest',
        'copy:gremlins',
        'webdriver'
    ]);
    grunt.registerTask('default', ['lint', 'build', 'test']);
};

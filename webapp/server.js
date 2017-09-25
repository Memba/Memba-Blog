/**
 * Copyright (c) 2013-2017 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var util = require('util');
var logger = require('./lib/logger');
var closingInProgress = false;

/**
 * Handle uncaught exceptions
 * @see http://stackoverflow.com/questions/7310521/node-js-best-practice-exception-handling
 */
process.on('uncaughtException', function (exception) {

    closingInProgress = true;

    logger.critical({
        // message = exception.message
        module: 'server',
        method: 'process.onuncaughtException',
        error: exception
    });

    if (typeof server !== 'undefined') {
        // stop taking new requests
        server.close();
        // make sure we close down within 5 seconds
        // which should give enough time for any pending request to complete
        var killtimer = setTimeout(function () {
            process.exit(1);
        }, 5 * 1000);
        // see https://nodejs.org/api/domain.html
        killtimer.unref();
    } else {
        process.exit(1);
    }

});

/**
 * Ensure we exit properly when interrupted by a kill
 */
process.on('SIGTERM', function () {
    // TODO pass exit code 0
    throw new Error('Process killed.');
});

/**
 * Ensure we exit properly when interrupting by Ctrl+C
 */
process.on('SIGINT', function () {
    // TODO pass exit code 0
    throw new Error('Process interrupted by Ctrl+C.');
});

/**
 * This event handler is called after process.exit
 * Therefore it closes the mongoose connection before exiting
 * either from an uncaughtException or from Ctrl+C
 */
process.on('exit', function (code) {
    // We use a try/catch block here because we might have reached here from an uncaughtException
    try {
        logger.warn({
            message: 'exiting with code ' + code,
            module: 'server',
            method: 'process.onexit'
        });
    } catch (ex) {
        // We use console.log because logger might not be available
        console.error(ex);
    }
});

var express = require('express');
var app = express();
var compression = require('compression');
var cors = require('cors');
var helmet = require('helmet');
var http = require('http');
var i18n = require('i18n');
var path = require('path');
var config = require('./config');
var pkg = require('../package.json');
var plugins = require('./plugins');
var redirect = require('./middleware/redirect');
var server;

logger.info({
    message: 'nconf environment is ' + config.environment,
    module: 'server'
});

/* This function has too many statements. */
/* jshint -W071 */

config.load(function (error/*, store*/) {

    if (error instanceof Error) {
        throw error;
    }

    // Redirect when necessary
    app.use(redirect.handler);

    // handle requests while closing
    app.use(function (req, res, next) {
        if (closingInProgress) {
            res.setHeader('Connection', 'close');
            res.status(503).send('A webapp server is in the process of restarting');
        } else {
            return next();
        }
    });

    // set version (to invalidate cache when loading new versions of scripts)
    config.set('application:version', pkg.version);

    // plugins
    plugins.load();

    // Secure expressJS with helmet from https://github.com/helmetjs/helmet
    // @see https://helmetjs.github.io/docs/csp/
    // @see https://content-security-policy.com/
    var cdnRoot = config.get('uris:cdn:root');
    var connectSrc = [
            '\'self\'',
            cdnRoot,                                // Required to load index.json on CDN
            'https://s3.amazonaws.com',             // Required to upload images to Amazon S3
            'https://js.leadin.com',                // Hubspot
            'https://forms.hubspot.com'             // Hubspot
            // 'https://api.getsidekick.com'
        ];
    var rapiRoot = config.get('uris:rapi:root');
    if (typeof rapiRoot === 'string' && rapiRoot !== config.get('uris:webapp:root')) {
        // Note: config.get('uris:webapp:root') is covered by 'self'
        // connectSrc.push(config.get('uris:rapi:root'));
        connectSrc.unshift(rapiRoot);
    }
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: [
                    '\'self\'',
                    'blob:'                             // Fallback for workerSrc
                ],
                connectSrc: connectSrc,
                fontSrc: [
                    '\'self\'',
                    'data:',
                    cdnRoot,
                    'https://fonts.gstatic.com'         // Google fonts
                ],
                childSrc: [ // was frameSrc
                    'blob:',                            // Fallback for workerSrc
                    'https://accounts.google.com',      // Google classroom button
                    'https://www.gstatic.com'           // Google classroom button
                ],
                imgSrc: [
                    'data:',
                    '*'
                ],
                mediaSrc: [
                    '*'
                ],
                scriptSrc: [
                    'blob:',                            // for workerSrc considering the 'child-src' directive is deprecated and will be removed in Chrome M60, around August 2017. Please use the 'script-src' directive for Workers instead.
                    '\'self\'',
                    '\'unsafe-eval\'',
                    '\'unsafe-inline\'',
                    cdnRoot,
                    'https://code.jquery.com',
                    'https://cdnjs.cloudflare.com',     // Promise polyfill for webpack
                    'https://www.googletagmanager.com', // GTM
                    'https://apis.google.com',          // Google classroom button
                    'www.google-analytics.com',         // Google Analytics (Loaded via http on http://localhost)
                    'js.hs-analytics.net',              // Hubspot (Loaded via http on http://localhost)
                    'https://api.usemessages.com',      // Hubspot
                    'https://js.hscollectedforms.net',  // Hubspot
                    'https://js.hsleadflows.net',       // Hubspot
                    'https://js.hsleadflowsqa.net',     // Hubspot
                    'https://js.hs-scripts.com',        // Hubspot
                    'https://js.leadin.com'             // Hubspot
                ],
                styleSrc: [
                    '\'self\'',
                    '\'unsafe-inline\'',
                    cdnRoot,
                    'https://fonts.googleapis.com'      // Google fonts
                ],
                // sandbox: ['allow-forms', 'allow-scripts'],
                // reportUri: '/report-violation',
                objectSrc: [
                    '\'none\''
                ] /*,
                workerSrc: [  // Not supported by helmet.contentSecurityPolicy
                    'blob:'
                ]
                */
            },
            browserSniff: false
        },
        frameguard: false
    }));

    // i18n
    i18n.configure({
        locales: config.get('locales'), // ['en', 'fr'],
        directory: path.join(__dirname, 'locales'),
        objectNotation: true, // Use hierarchies in locales.json files
        updateFiles: false,
        syncFiles: false
    });
    // Use __() in templates
    app.use(i18n.init);

    // Template engine
    app.engine('.ejs', require('ejs').__express);
    // Optional since express defaults to CWD/views
    app.set('views', path.join(__dirname, 'views'));
    // Without this one would need to supply the extension to res.render(), ex: res.render('users.html').
    app.set('view engine', 'ejs');

    // compression (before static files otherwise they are not compressed)
    app.use(compression({ filter: function (req, res) {
            if (req.headers['x-no-compression']) {
                // don't compress responses with this request header
                return false;
            }
            // fallback to standard filter function
            return compression.filter(req, res);
        }
    }));

    // Static files (before routing)
    // Cache-Control maxAge requires a string in MS format - see https://www.npmjs.com/package/ms
    app.use(
        util.format(config.get('uris:webapp:public'), ''),
        cors({ origin: config.get('uris:webapp:root') }),
        express.static(path.join(__dirname, 'public'), { maxAge: '1d' })
    );

    // Routing
    var router = require('./routes');
    app.use(router);

    // Configure expressJS and launch server
    var port = process.env.PORT || config.get('express:port');
    app.set('port', port);
    app.set('trust proxy', 'uniquelocal');
    server = app.listen(port);

    // Logging
    logger.info({
        message: 'expressJS server listening on port ' + port,
        module: 'server',
        method: 'config.load'
    });

});

/* jshint +W071 */

// Export app for unit tests
// It is fine, because app does not accept requests
// until it has been fully configured here above
module.exports = app;

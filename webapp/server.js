/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var util = require('util');
var logger = require('./lib/logger');

/**
 * Handle uncaught exceptions
 * @see http://stackoverflow.com/questions/7310521/node-js-best-practice-exception-handling
 */
process.on('uncaughtException', function (exception) {

    logger.critical({
        // message = exception.message
        module: 'server',
        method: 'process.onuncaughtException',
        error: exception
    });

    if (typeof server !== 'undefined') {
        // make sure we close down within 2 seconds
        // which should give enough time for any pending request to complete
        var killtimer = setTimeout(function () {
            process.exit(1);
        }, 2000);
        // see https://nodejs.org/api/domain.html
        killtimer.unref();
        // stop taking new requests
        server.close();
    } else {
        process.exit(1);
    }

});

/**
 * Ensure we exit properly when interrupting by Ctrl+C
 */
process.on('SIGINT', function () {
    process.exit(0);
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
var cors = require('cors');
var helmet = require('helmet');
var http = require('http');
var i18n = require('i18n');
var path = require('path');
var config = require('./config');
var pkg = require('../package.json');
var router;
var port;
var server;

logger.info({
    message: 'nconf environment is ' + config.environment,
    module: 'server'
});

config.load(function (error/*, store*/) {

    if (error instanceof Error) {
        throw error;
    }

    // set version (to invalidate cache when loading new versions of scripts)
    config.set('application:version', pkg.version);

    // Secure expressJS with helmet from https://github.com/helmetjs/helmet
    // app.disable('x-powered-by');
    app.use(helmet());

    // i18n
    i18n.configure({
        locales: config.get('locales'), // ['en', 'fr'],
        directory: path.join(__dirname, 'locales'),
        objectNotation: true // Use hierarchies in locales.json files
    });
    // Use __() in templates
    app.use(i18n.init);

    // Template engine
    app.engine('.ejs', require('ejs').__express);
    // Optional since express defaults to CWD/views
    app.set('views', path.join(__dirname, 'views'));
    // Without this one would need to supply the extension to res.render(), ex: res.render('users.html').
    app.set('view engine', 'ejs');

    // Static files (before routing)
    // Cache-Control maxAge requires a string in MS format - see https://www.npmjs.com/package/ms
    app.use(
        util.format(config.get('uris:webapp:public'), ''),
        cors({ origin: config.get('uris:webapp:root') }),
        express.static(path.join(__dirname, 'public'), { maxAge: '1d' })
    );

    // Routing
    router = require('./routes');
    app.use(router);

    // Configure expressJS and launch server
    port = process.env.PORT || config.get('express:port');
    app.set('port', port);
    app.set('trust proxy', 'uniquelocal');
    server = http.createServer(app).listen(port);

    // Logging
    logger.info({
        message: 'expressJS server listening on port ' + port,
        module: 'server',
        method: 'config.load'
    });

});

// Export app for unit tests
// It is fine, because app does not accept requests
// until it has been fully configured here above
module.exports = app;

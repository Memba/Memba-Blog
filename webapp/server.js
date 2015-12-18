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
process.on('uncaughtException', function (ex) {

    logger.critical({
        // message = exception.message
        module: 'server',
        method: 'process.onuncaughtException',
        error: ex
    });

    if (typeof server === 'undefined') {
        process.exit(1);
    } else {
        // make sure we close down within 2 seconds
        // which should give enough time for any pending request to complete
        var killtimer = setTimeout(function () {
            process.exit(1);
        }, 2000);
        // see https://nodejs.org/api/domain.html
        killtimer.unref();
        // stop taking new requests
        server.close();
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
        console.error(ex);
    }
});

var config = require('./config');

logger.info({
    message: 'nconf environment is ' + config.get('NODE:ENV'),
    module: 'config/index'
});

var path = require('path');
var express = require('express');
var helmet = require('helmet');
var http = require('http');
var i18n = require('i18n');
var router = require('./routes');
var app = express();
var port = process.env.PORT || config.get('express:port');

// Secure expressJS with helmet from https://github.com/helmetjs/helmet
// app.disable('x-powered-by');
app.use(helmet());

// Configure expressJS
app.set('trust proxy', 'uniquelocal');
app.set('port', port);

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
app.use(util.format(config.get('uris:webapp:public'), ''), express.static(path.join(__dirname, 'public'), { maxAge: '1d' }));

// Routing
app.use(router);

// Launch server
var server = http.createServer(app).listen(port);
logger.info({
    message: 'expressJS server listening on port ' + port,
    module: 'server'
});

// Export app for unit tests
module.exports = app;

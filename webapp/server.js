/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jslint node: true */
/* jshint node: true */

'use strict';

var path = require('path'),
    express = require('express'),
    helmet = require('helmet'),
    i18n = require('i18n'),
    app = express(),
    config = require('./config'),
    router = require('./routes'),
    logger = require('./lib/logger');

//Catch-all error handler
//See http://stackoverflow.com/questions/7310521/node-js-best-practice-exception-handling
process.on('uncaughtException', function(err) {
    logger.critical({
        message: 'uncaught exception',
        module: 'server',
        method: 'undefined',
        error: err
    });
    process.exit(1);
});

process.on('exit', function(/*code*/) {
    logger.info({
        message: 'exit',
        module: 'server',
        method: 'process.onexit'
    });
});

logger.info({
    message: 'nconf environment is ' + config.get('NODE:ENV'),
    module: 'config/index',
    method: 'Config'
});

//Secure expressJS with helmet from https://github.com/helmetjs/helmet
app.use(helmet()); //app.disable('x-powered-by');

// Configure expressJS
app.set('trust proxy', 'uniquelocal');
app.set('port', process.env.PORT || config.get('express:port'));

// i18n
i18n.configure({
    locales: config.get('locales'), //['en', 'fr'],
    directory: path.join(__dirname, 'locales'),
    objectNotation: true //Use hierarchies in locales.json files
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
app.use(config.get('uris:webapp:public'), express.static(path.join(__dirname, 'public'), { maxAge: '1d' }));

// Routing
app.use(router);

// Start application
app.listen(app.get('port'));

//Log
logger.info({
    message: 'Express server listening on port ' + app.get('port'),
    method: 'none',
    module: 'server'
});

//Export app for further needs, especially qa/testing
module.exports = app;

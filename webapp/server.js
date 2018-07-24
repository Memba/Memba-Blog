/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */
const compression = require('compression');
const cors = require('cors');
const ejs = require('ejs');
const express = require('express');
const helmet = require('helmet');
const i18n = require('i18n');
const path = require('path');
const util = require('util');
const pkg = require('../package.json');
const config = require('./config/index.es6');
const logger = require('./lib/logger');
const redirect = require('./middleware/redirect.es6');
const plugins = require('./plugins/index.es6');

const app = express();
let server;
let closingInProgress = false;

/**
 * Handle uncaught exceptions
 * @see http://stackoverflow.com/questions/7310521/node-js-best-practice-exception-handling
 */
process.on('uncaughtException', ex => {
    closingInProgress = true;

    logger.critical({
        // message = ex.message
        module: 'server',
        method: 'process.onuncaughtException',
        error: ex
    });

    if (typeof server !== 'undefined') {
        // stop taking new requests
        server.close();
        // make sure we close down within 10 seconds
        // which should give enough time for any pending request to complete
        const killTimer = setTimeout(() => {
            // eslint-disable-next-line no-process-exit
            process.exit(typeof ex.exitCode === 'number' ? ex.exitCode : 1);
        }, 10 * 1000);
        // see https://nodejs.org/api/domain.html
        killTimer.unref();
    } else {
        // eslint-disable-next-line no-process-exit
        process.exit(typeof ex.exitCode === 'number' ? ex.exitCode : 1);
    }
});

/**
 * Ensure we exit properly when interrupted by a kill
 */
process.on('SIGTERM', () => {
    const error = new Error('Process killed.');
    error.exitCode = 0;
    throw error;
});

/**
 * Ensure we exit properly when interrupting by Ctrl+C
 */
process.on('SIGINT', () => {
    const error = Error('Process interrupted by Ctrl+C.');
    error.exitCode = 0;
    throw error;
});

/**
 * This event handler is called after process.exit
 */
process.on('exit', code => {
    // We use a try/catch block here because we might have reached here from an uncaughtException
    try {
        logger.warn({
            message: `Exiting with code ${code}`,
            module: 'server',
            method: 'process.onexit'
        });
    } catch (ex) {
        // We use console.log because logger might not be available
        // eslint-disable-next-line no-console
        console.error(ex);
    }
});

logger.info({
    message: `nconf environment is ${config.environment}`,
    module: 'server'
});

// Loading configuration, possibly from AWS S3
// config.load((error, store) => {
config.load(error => {
    if (error instanceof Error) {
        throw error;
    }

    // set version (to invalidate cache when loading new versions of scripts)
    config.set('application:version', pkg.version);

    // plugins
    plugins.load();

    // Anonymizing expressJS is done by Helmet
    // app.disable('x-powered-by');

    // Handle requests while closing
    app.use((req, res, next) => {
        if (closingInProgress) {
            res.setHeader('Connection', 'close');
            res.status(503).send(
                'This server is in the process of restarting...'
            );
        } else {
            next();
        }
    });

    // Redirect http to https when necessary
    app.use(redirect.handler);

    // Secure expressJS with helmet from https://github.com/helmetjs/helmet
    // @see https://helmetjs.github.io/docs/csp/
    // @see https://content-security-policy.com/
    const cdnRoot = config.get('uris:cdn:root');
    const connectSrc = [
        "'self'",
        cdnRoot, // Required to load index.json on CDN
        'https://s3.amazonaws.com', // Required to upload images to Amazon S3
        'https://www.googletagmanager.com', // GTM (AMP Pages)
        'https://www.google-analytics.com', // Google Analytics
        'https://js.leadin.com', // Hubspot
        'https://forms.hubspot.com', // Hubspot
        // 'https://api.getsidekick.com' // Hubspot
        'https://cdn.ampproject.org', // AMP
        'https://amp-error-reporting.appspot.com' // AMP
    ];
    const rapiRoot = config.get('uris:rapi:root');
    if (
        typeof rapiRoot === 'string' &&
        rapiRoot !== config.get('uris:webapp:root')
    ) {
        // Note: config.get('uris:webapp:root') is covered by 'self'
        // connectSrc.push(config.get('uris:rapi:root'));
        connectSrc.unshift(rapiRoot);
    }
    app.use(
        helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: [
                        "'self'",
                        'blob:' // Fallback for workerSrc
                    ],
                    connectSrc,
                    fontSrc: [
                        "'self'",
                        'data:',
                        cdnRoot,
                        'https://fonts.gstatic.com' // Google fonts
                    ],
                    childSrc: [
                        // was frameSrc
                        'blob:', // Fallback for workerSrc
                        'https://accounts.google.com', // Google classroom button
                        'https://www.gstatic.com', // Google classroom button
                        'https://www.kidoju.com', // Kidoju player (especially for www.memba.com)
                        'https://www.youtube.com' // Youtube videos (tutorials)
                    ],
                    imgSrc: ['data:', '*'],
                    mediaSrc: ['*'],
                    scriptSrc: [
                        'blob:', // for workerSrc considering the 'child-src' directive is deprecated and will be removed in Chrome M60, around August 2017. Please use the 'script-src' directive for Workers instead.
                        "'self'",
                        "'unsafe-eval'",
                        "'unsafe-inline'",
                        cdnRoot,
                        'cdnjs.cloudflare.com', // jquery + insites cookie consent (the 2nd via http on localhost)
                        'https://cdn.ampproject.org/v0.js', // AMP Pages
                        'https://www.googletagmanager.com', // GTM
                        'https://apis.google.com', // Google classroom button
                        'www.google-analytics.com', // Google Analytics (Loaded via http on http://localhost)
                        'js.hs-analytics.net', // Hubspot (Loaded via http on http://localhost)
                        'https://api.usemessages.com', // Hubspot
                        'https://js.hscollectedforms.net', // Hubspot
                        'https://js.hsleadflows.net', // Hubspot
                        'https://js.hsleadflowsqa.net', // Hubspot
                        'https://js.hs-scripts.com', // Hubspot
                        'https://js.leadin.com', // Hubspot (this is the only one which is not ipv6 ready)
                        'https://cdn.ampproject.org' // AMP Validator - https://www.ampproject.org/docs/getting_started/create/preview_and_validate (can be commented)
                    ],
                    styleSrc: [
                        "'self'",
                        "'unsafe-inline'",
                        cdnRoot,
                        'https://fonts.googleapis.com', // Google fonts
                        'cdnjs.cloudflare.com' // Insites cookie consent (via http on localhost)
                    ], // sandbox: ['allow-forms', 'allow-scripts'], // reportUri: '/report-violation',
                    objectSrc: [
                        "'none'"
                    ] /* ,
                    workerSrc: [  // Not supported by helmet.contentSecurityPolicy
                        'blob:'
                    ]
                    */
                },
                browserSniff: false
            },
            frameguard: false,
            hsts: {
                maxAge: 1 * 24 * 60 * 60, // Must be at least 365 days to be approved at https://hstspreload.org/
                includeSubDomains: true,
                preload: true, // Must be enabled to be approved at https://hstspreload.org/
                setIf: req => req.secure
            }
        })
    );

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
    app.engine('.ejs', ejs.__express);

    // Optional since express defaults to CWD/views
    app.set('views', path.join(__dirname, 'views'));
    // Without this one would need to supply the extension to res.render(), ex: res.render('users.html').
    app.set('view engine', 'ejs');

    // compression (before static files otherwise they are not compressed)
    app.use(
        compression({
            filter: (req, res) => {
                if (req.headers['x-no-compression']) {
                    // don't compress responses with this request header
                    return false;
                }
                // fallback to standard filter function
                return compression.filter(req, res);
            }
        })
    );

    // Static files (before routing)
    // Cache-Control maxAge requires a string in MS format - see https://www.npmjs.com/package/ms
    app.use(
        util.format(config.get('uris:webapp:public'), ''),
        cors({ origin: config.get('uris:webapp:root') }),
        express.static(path.join(__dirname, 'public'), { maxAge: '90d' })
    );

    // Routing
    // ESlint does not like global requires but we need to yield time to retrieve config from AWS S3
    // eslint-disable-next-line global-require
    const router = require('./routes/index.es6');
    app.use(router);

    // Configure expressJS and launch server
    const port = process.env.PORT || config.get('express:port');
    app.set('port', port);
    app.set('trust proxy', 'uniquelocal');
    server = app.listen(port);

    // Logging
    logger.info({
        message: `expressJS server listening on port ${port}`,
        module: 'server',
        method: 'config.load'
    });
});

// Export app for unit tests
module.exports = app;

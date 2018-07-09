/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var assert = require('assert');
var ApplicationError = require('../lib/applicationError.es6');
var logger = require('../lib/logger');
var utils = require('../lib/utils.es6');
var config;
var format;
var url;
var language;

var mongoose;
try {
    mongoose = require('mongoose');
} catch (ex) {
    // This is a generic error handler which can be used without mongoose
    mongoose = { Error: { ValidationError: function () {} } };
}

module.exports = {

    /* This function has too many statements. */
    /* jshint -W071 */

    /* This function's cyclomatic complexity is too high. */
    /* jshint -W074 */

    /**
     * Error handler
     * @see http://www.joyent.com/developers/node/design/errors
     * @param err
     * @param req
     * @param res
     * @param next // without the next parameter, this is not recognized as a error handler
     */
    handler: function (err, req, res, next) {

        assert.ok(err instanceof Error);

        // Note: We want an ApplicationError to get all the properties we need for display and logging
        var error;
        var critical = false;
        if (err instanceof ApplicationError) {
            error = err;
        } else if (err instanceof mongoose.Error.ValidationError) {
            error = new ApplicationError(err);
        } else if (err instanceof SyntaxError && err.body && err.status === 400) {
            error = new ApplicationError(err);
            // SyntaxError is a body-parser error and considering all the people that may try to post garbage
            // we do not want to treat as critical and restart the server or this would allow a DOS attack
        } else {
            error = new ApplicationError(err);
            // Since this is not an ApplicationError, it is an unexpected exception that we need to fix
            critical = true;
        }
        // Now we have an ApplicationError

        // Log the error
        var entry = {
            module: 'middleware/error',
            method: 'handler',
            request: req,
            error: error
        };
        if (critical) {
            logger.critical(entry);
        } else if (entry.error && [400, 401, 403, 404].indexOf(entry.error.status) > -1) {
            logger.warn(entry);
        } else {
            logger.error(entry);
        }

        // If requesting a web page on Kidoju-WebApp
        if (req.method === 'GET' && typeof res.getLocale === 'function' && typeof res.__ === 'function') {

            config = res.locals.config;
            format = res.locals.format;
            url = res.locals.url;

            // Create a trace that we can track in the browser
            req.trace = utils.uuid();

            language = res.getLocale();

            // Display error page for webapp
            res
                .status(error.status)
                .set({
                    'Cache-Control': 'no-cache',
                    'Content-Language': language,
                    'Content-Type': 'text/html; charset=utf-8'
                })
                .vary('Accept-Encoding') // See http://blog.maxcdn.com/accept-encoding-its-vary-important/
                .render('error', {
                    author: res.__('meta.author'),
                    description: error.message,
                    icon: url.resolve(config.uris.cdn.root, format(config.uris.cdn.icons, res.__('error.icon'))),
                    image: config.images[Math.floor(config.images.length * Math.random())],
                    keywords: res.__('meta.keywords'),
                    language: language,
                    menu: [], // Do not display a menu to avoid any risks of errors fetching the menu, especially if accessing Github fails
                    results: [], // trick header into displaying robots noindex directive
                    /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
                    site_url: false, // trick header into not displaying a canonical link since we have a robots noindex directive
                    /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
                    title: error.title,
                    trace: req.trace
                });

        } else if (err.i18n === 'token.accessDenied' || // Authentication is denied by provider
            err.i18n === 'token.invalidCallback' || // Authentication has most probably been cancelled by the user
            err.i18n === 'account.userBlocked') { // User is blocked

            config = require('../config/index.es6');
            url = require('url');
            format = require('util').format;

            // The typical url when arriving here is /api/auth/google/callback?error=access_denied&state=812691399-f6245c57-b75e-492d-9d16-b9f6adb1c6fc
            // and we have no way to determine the language except via request headers
            language = (req.headers['accept-language'] || 'en').substr(0, 2);
            language = config.get('locales').indexOf(language) > -1 ? language : 'en';

            // Redirect to a clean error page
            res.redirect(url.resolve(config.get('uris:webapp:root'), format(config.get('uris:webapp:error'), language)) + '?code=1001');

        } else { // This is not a web page request (API Server)

            // Return json error message for api server
            res
                .status(error.status)
                .json({ error: error });

        }
    }

    /* jshint -W074 */
    /* jshint -W071 */

};

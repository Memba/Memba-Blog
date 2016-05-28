/**
 * Copyright (c) 2013-2016 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var assert = require('assert');
var ApplicationError = require('../lib/error');
var logger = require('../lib/logger');
var utils = require('../lib/utils');

module.exports = {

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
        var error = err;
        var critical = false;
        if (!(err instanceof ApplicationError)) {
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
        } else if (entry.error && entry.error.status === 404) {
            logger.warn(entry); // not found
        } else {
            logger.error(entry);
        }

        if (typeof res.getLocale === 'function' && typeof res.__ === 'function') {

            var config = res.locals.config;
            var format = res.locals.format;
            var url = res.locals.url;

            // Create a trace that we can track in the browser
            req.trace = utils.uuid();

            var language = res.getLocale();

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
                    icon: url.join(config.uris.cdn.root, format(config.uris.cdn.icons, res.__('error.icon'))),
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



        } else {

            // Return json error message for api server
            res
                .status(error.status)
                .json({ error: error });
        }
    }

};

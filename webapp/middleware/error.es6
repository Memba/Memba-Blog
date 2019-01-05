/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const assert = require('assert');
const ApplicationError = require('../lib/applicationError.es6');
const logger = require('../lib/logger.es6');
const { uuid } = require('../lib/utils.es6');

let mongoose;
try {
    // eslint-disable-next-line global-require,import/no-unresolved,node/no-missing-require
    mongoose = require('mongoose');
} catch (ex) {
    class CastError extends Error {
        constructor() {
            super();
            this.name = 'CastError';
            this.status = 400;
        }
    }
    class ValidationError extends Error {
        constructor() {
            super();
            this.name = 'ValidationError';
            this.status = 400;
        }
    }
    // These are generic errors which can be used without mongoose
    mongoose = { Error: { CastError, ValidationError } };
}

let config;
let format;
let language;
let URL;

module.exports = {
    /**
     * Error handler
     * @see http://www.joyent.com/developers/node/design/errors
     * @param err
     * @param req
     * @param res
     * @param next // without the next parameter, this is not recognized as a error handler
     */
    // eslint-disable-next-line no-unused-vars
    handler(err, req, res, next) {
        assert.ok(err instanceof Error);

        // Note: We want an ApplicationError to get all the properties we need for display and logging
        let error;
        let critical = false;
        if (err instanceof ApplicationError) {
            error = err;
        } else if (
            // This is a mongoose error
            err instanceof mongoose.Error.ValidationError ||
            err instanceof mongoose.Error.CastError
        ) {
            error = new ApplicationError(err);
        } else if (
            err instanceof Error &&
            [400, 401, 403, 404].indexOf(err.status) > -1
        ) {
            // SyntaxError is a body-parser error and considering all the people that may try to post garbage
            // we do not want to treat as critical and restart the server or this would allow a DOS attack
            // BadRequestError (request.aborted) is also a body-parser error which recurrently occurs with the logger endpoint
            // upon closing the browser.
            // Both are raised with status 400
            error = new ApplicationError(err);
        } else {
            error = new ApplicationError(err);
            // Since this is not an ApplicationError, it is an unexpected exception that we need to fix
            critical = true;
        }
        // Now we have an ApplicationError

        // Log the error
        const entry = {
            module: 'middleware/error',
            method: 'handler',
            request: req,
            error
        };
        if (critical) {
            logger.critical(entry);
        } else if (
            entry.error &&
            [400, 401, 403, 404].indexOf(entry.error.status) > -1
        ) {
            logger.warn(entry);
        } else {
            logger.error(entry);
        }

        // If requesting a web page on Kidoju-WebApp
        if (
            req.method === 'GET' &&
            typeof res.getLocale === 'function' &&
            typeof res.__ === 'function'
        ) {
            ({ config, format, URL } = res.locals);

            // Create a trace that we can track in the browser
            req.trace = uuid();

            language = res.getLocale();

            // Display error page for webapp
            res.status(error.status)
                .set({
                    'Cache-Control': 'no-cache',
                    'Content-Language': language,
                    'Content-Type': 'text/html; charset=utf-8'
                })
                .vary('Accept-Encoding') // See http://blog.maxcdn.com/accept-encoding-its-vary-important/
                .render('error', {
                    author: res.__('meta.author'),
                    description: error.message,
                    icon: new URL(
                        format(config.uris.cdn.icons, res.__('error.icon')),
                        config.uris.cdn.root
                    ).href,
                    image:
                        config.images[
                            Math.floor(config.images.length * Math.random())
                        ],
                    keywords: res.__('meta.keywords'),
                    language,
                    menu: [], // Do not display a menu to avoid any risks of errors fetching the menu, especially if accessing Github fails
                    results: [], // trick header into displaying robots noindex directive
                    site_url: false, // trick header into not displaying a canonical link since we have a robots noindex directive
                    title: error.title,
                    trace: req.trace
                });
        } else if (
            err.i18n === 'token.accessDenied' || // Authentication is denied by provider
            err.i18n === 'token.invalidCallback' || // Authentication has most probably been cancelled by the user
            err.i18n === 'account.userBlocked'
        ) {
            // User is blocked
            /* eslint-disable global-require */
            config = require('../config/index.es6');
            ({ URL } = require('url'));
            ({ format } = require('util'));
            /* eslint-enable global-require */

            // The typical url when arriving here is /api/auth/google/callback?error=access_denied&state=812691399-f6245c57-b75e-492d-9d16-b9f6adb1c6fc
            // and we have no way to determine the language except via request headers
            language = (req.headers['accept-language'] || 'en').substr(0, 2);
            language =
                config.get('locales').indexOf(language) > -1 ? language : 'en';

            // Redirect to a clean error page
            res.redirect(
                `${
                    new URL(
                        format(config.get('uris:webapp:error'), language),
                        config.get('uris:webapp:root')
                    ).href
                }?code=1001`
            );
        } else {
            // This is not a web page request (API Server)

            // Return json error message for api server
            res.status(error.status).json({ error });
        }
    }
};

/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const url = require('url');
const util = require('util');
const config = require('../config');

// Redirection rules in json config
let rules = config.get('redirect');

module.exports = {
    /**
     * Redirect handler
     * Ensures that http://www.kidoju.com is redirected to https://www.kidoju.com when name.com DNS fails to forward
     * This expects the following in a config json file:
     * ...
     * redirect: {
     *     http: {
     *         match: 'kidoju.com$',
     *         forward: 'https://www.kidoju.com'
     *     }
     * }
     * @param req
     * @param res
     * @param next
     */
    handler(req, res, next) {
        if (req.originalUrl === '/favicon.ico') {
            // Otherwise it might be handled as an invalid language
            return res.redirect(
                301,
                url.resolve(
                    config.get('uris:cdn:root'),
                    util.format(config.get('uris:cdn:images'), 'favicon.ico')
                )
            );
        }
        if (config.environment === 'test') {
            // reload rules for our unit tests
            rules = config.get('redirect');
        }
        // req.protocol is the same as req.headers['x-forwarded-proto'] when app.enable('trust proxy');
        if (rules && req.protocol) {
            const rule = rules[req.protocol];
            if (
                rule &&
                typeof rule.match === 'string' &&
                /^https?:\/\/[\w.]+\/?$/.test(rule.forward) &&
                new RegExp(rule.match).test(req.headers.host)
            ) {
                return res.redirect(
                    301,
                    // https://expressjs.com/en/api.html#req.originalUrl
                    url.resolve(rule.forward, req.originalUrl)
                );
            }
        }
        return next();
    }
};

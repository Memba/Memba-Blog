/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var http = require('http');
var url = require('url');
var config = require('../config');
var rules = config.get('redirect');
var ApplicationError = require('../lib/error');

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
    handler: function (req, res, next) {
        if (config.environment === 'test') {
            // reload rules for our unit tests
            rules = config.get('redirect');
        }
        var protocol = req.headers['x-forwarded-proto'];
        if (rules && typeof protocol === 'string') {
            var rule = rules[protocol];
            if (rule && typeof rule.match === 'string' && /^https?\:\/\/[\w\.]+\/?$/.test(rule.forward) && new RegExp(rule.match).test(req.headers.host)) {
                return res.redirect(301, url.resolve(rule.forward, req.originalUrl));
            }
        }
        return next();
    }
};

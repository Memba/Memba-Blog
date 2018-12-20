/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var config = require('../config/index.es6');
var locales = config.get('locales');
var ApplicationError = require('../lib/applicationError.es6');
var db = require('../lib/db');
var logger = require('../lib/logger.es6');
var utils = require('../lib/utils.es6');
var indexModel = require('../models/indexModel.es6');
var menuModel = require('../models/menuModel.es6');
var timer = Date.now();

module.exports = {

    /**
     * Handler called when the github webhook is triggered with a post
     * @see https://developer.github.com/webhooks/
     * @param req
     * @param res
     * @param next
     */
    handler: function (req, res, next) {

        // Log the request
        logger.info({
            message: 'Github webhook triggered',
            module: 'routes/hookRoute',
            method: 'handler',
            request: req
        });

        // In production only, validate the request
        // if (process.env.NODE_ENV === 'production') {
        if (config.environment === 'production') {

            // Check user agent - see https://developer.github.com/webhooks/
            if (!/^GitHub-Hookshot\//.test(req.headers['user-agent'])) {
                next(new ApplicationError('errors.routes.hookRoute.badAgent', req.headers['user-agent']));
            }

        }

        // Ignore any calls within 1 minute of a previous call
        if (Date.now() - timer > 60 * 1000) {

            // Reindex contents and writes json indexes on hard drive
            locales.forEach(function (locale) {
                db[locale].reindex();
            });

            // Give some time for everything to reload
            // considering we have no idea when the spanned process is done reindexing
            // and reset the in-memory cache
            setTimeout(function () {
                menuModel.resetCache();
                indexModel.resetCache();
                logger.info({
                    message: 'Index and menu cache reset',
                    module: 'routes/hookRoute',
                    method: 'handler',
                    request: req
                });
                timer = Date.now();
            }, 30 * 1000);

        }

        // Close and send the response
        res.end();

    }
};

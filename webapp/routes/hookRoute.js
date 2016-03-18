/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var config = require('../config');
var locales = config.get('locales');
var ApplicationError = require('../lib/error');
var db = require('../lib/db');
var logger = require('../lib/logger');
var utils = require('../lib/utils');
var indexModel = require('../models/indexModel');
var menuModel = require('../models/menuModel');

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
        if (process.env.NODE_ENV === 'production') {

            // Check user agent
            if (!/^GitHub-Hookshot\//.test(req.headers['user-agent'])) {
                throw new ApplicationError('errors.routes.hookRoute.badAgent', req.headers['user-agent']);
            }

        }

        // Reindex contents
        locales.forEach(function (locale) {
            db[locale].reindex();
        });

        // Reset cache
        setTimeout(function () {
            menuModel.resetCache();
            indexModel.resetCache();
            logger.info({
                message: 'Index and menu cache reset',
                module: 'routes/hookRoute',
                method: 'handler',
                request: req
            });
        }, 10000);

        // Close and send the response
        res.end();

    }
};

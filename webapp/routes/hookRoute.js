/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var config = require('../config'),
    locales = config.get('locales'),
    ApplicationError = require('../lib/error'),
    db = require('../lib/db'),
    logger = require('../lib/logger'),
    utils = require('../lib/utils'),
    menu = require('../models/menuModel'),
    index = require('../models/indexModel');

module.exports = {

    /**
     * Handler called when the github webhook is triggered with a post
     * @see https://developer.github.com/webhooks/
     * @param req
     * @param res
     * @param next
     */
    handler: function (req, res, next) {

        try {

            console.log('routes/hookRoute: hooked!');

            //Log the request
            logger.info({
                message: 'Github hook triggered',
                module: 'routes/hookRoute',
                method: 'handler',
                request: req
            });

            //In production only, validate the request
            if(process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test') {

                //TODO Check x-hub-signature, x-github-event
                //TODO Check Github Ip Addresses - https://help.github.com/articles/what-ip-addresses-does-github-use-that-i-should-whitelist/

                //Check user agent
                if (!/^GitHub-Hookshot\//.test(req.headers['user-agent'])) {
                    throw new ApplicationError('errors.routes.hookRoute.badAgent', req.headers['user-agent']);
                }

                //TODO Check the payload

            }

            //Reindex contents
            locales.forEach(function (locale) {
                db[locale].reindex();
            });

            //Reset cache
            setTimeout(function() {
                menu.resetCache();
                index.resetCache();
            }, 10000);

            //Close and send the response
            res.end();

        } catch(exception) {
            console.error(exception);

            //Log the exception
            logger.critical({
                message: 'Exception caught',
                module: 'routes/hookRoute',
                method: 'handler',
                request: req,
                error: exception
            });

            return res.status(500).end();
        }
    }
};

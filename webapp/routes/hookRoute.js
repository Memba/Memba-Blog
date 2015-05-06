/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var async = require('async'),
    config = require('../config'),
    ApplicationError = require('../lib/error'),
    logger = require('../lib/logger'),
    utils = require('../lib/utils'),
    cache = require('../lib/cache'),
    index = require('../models/indexModel'),
    menu = require('../models/menuModel');

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

            console.log('---------------> hooked!');

            //Log the request
            logger.info({
                message: 'Github hook triggered',
                module: 'routes/hookRoute',
                method: 'handler',
                request: req
            });

            //TODO Consider a child process - https://docs.nodejitsu.com/articles/child-processes/how-to-spawn-a-child-process
            //TODO Check x-hub-signature, x-github-event
            //TODO Check Github Ip Addresses - https://help.github.com/articles/what-ip-addresses-does-github-use-that-i-should-whitelist/

            //Check user agent
            if (!/^GitHub-Hookshot\//.test(req.headers['user-agent'])) {
                throw new ApplicationError('errors.routes.hookRoute.bad_agent', req.headers['user-agent']);
            }

            //Check payload


            var tasks = [];
            (config.get('locales') || []).forEach(function (locale) {
                /*
                tasks.push(function (done) {
                    index.getPageTree(locale, done);
                });
                tasks.push(function (done) {
                    index.getBlogTree(locale, done);
                });
                */
            });

            async.parallel(
                tasks,
                function (error, results) {

                    //Reset the cache
                    cache.reset();
                });

            //Close and send the response
            res.end();

        } catch(exception) {

            //Log the exception
            logger.crit({
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

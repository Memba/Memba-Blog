/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jslint node: true */
/* jshint node: true */

'use strict';

var logger = require('../lib/logger'),
    utils = require('../lib/utils'),
    menu = require('../models/menuModel');

module.exports = {

    /**
     * Returns the user page
     * @param req
     * @param res
     * @param next
     */
    getHtmlPage: function(req, res, next) {
        try {

            //Create a sessionId that we can track in the browser
            var sessionId = utils.uuid();

            //Log the request
            logger.info({
                message: 'requesting the home page',
                method: 'getHtmlPage',
                module: 'routes/homeRoute',
                sessionId: sessionId,
                request: req
            });

            //Get menu with english as default language
            menu.get('en', function(error, data) {
                if(!error && data) {
                    res
                        .set({
                            //Cache-Control
                            'Content-Type': 'text/html; charset=utf-8',
                            'Content-Language': res.getLocale()
                            //Content-Security-Policy
                        })
                        .vary('Accept-Encoding') //See http://blog.maxcdn.com/accept-encoding-its-vary-important/
                        .render('home', {
                            description: 'TODO',
                            menu: data,
                            sessionId: sessionId,
                            title: 'TODO'
                        });
                } else {
                    next(error);
                }
            });


        } catch (exception) {
            next(exception);
        }
    }
};

/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var util = require('util'),
    logger = require('../lib/logger'),
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

        //Create a sessionId that we can track in the browser
        req.sessionId = utils.uuid();

        //Log the request
        logger.info({
            message: 'requesting the home page',
            method: 'getHtmlPage',
            module: 'routes/homeRoute',
            request: req
        });

        //Get menu with english as default language
        menu.getMenu('en', function(error, data) {
            if(!error && data) {
                res
                    .set({
                        'Content-Type': 'text/html; charset=utf-8',
                        'Content-Language': res.getLocale(),
                        'Cache-Control': 'max-age=86400, public'
                    })
                    .vary('Accept-Encoding') //See http://blog.maxcdn.com/accept-encoding-its-vary-important/
                    .render('home', {
                        author: res.__('meta.author'),
                        description: res.__('meta.description'),
                        icon: util.format(res.locals.config.uris.cdn.svg.office, res.__('home.icon')), //TODO: Review
                        keywords: res.__('meta.keywords'),
                        menu: data,
                        results: false, //trick header into not displaying robots noindex directive
                        sessionId: req.sessionId,
                        site_url: res.locals.config.uris.webapp.home, //canonical link
                        title: res.__('meta.title')
                    });
            } else {
                next(error);
            }
        });

    }
};

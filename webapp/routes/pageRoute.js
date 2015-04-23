/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jslint node: true */
/* jshint node: true */

'use strict';

var logger = require('../lib/logger'),
    utils = require('../lib/utils'),
    model = require('../models/pageModel');

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
                message: 'requesting a page',
                module: 'routes/pageRoute',
                method: 'getHtmlPage',
                sessionId: sessionId,
                ip: req.ip,
                url: req.url,
                query: req.query,
                agent: req.headers['user-agent']
            });

            var query = {
                language: req.params.language,
                slug: req.params.slug
            };

            model.getContent(query, function(err, data) {
                if(!err && data) {
                    res
                        .set({
                            //Cache-Control
                            'Content-Type': 'text/html; charset=utf-8',
                            'Content-Language': res.getLocale()
                            //Content-Security-Policy
                        })
                        .vary('Accept-Encoding') //See http://blog.maxcdn.com/accept-encoding-its-vary-important/
                        .render('page', {
                            sessionId: sessionId,
                            description: 'TODO',
                            title: 'TODO',
                            menu: res.locals.getCatalog().header.navbar.menu,
                            content: data
                        });
                } else {
                    next(err);
                }
            });

        } catch (exception) {
            next(exception);
        }
    }
};

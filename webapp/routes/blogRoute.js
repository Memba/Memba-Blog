/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jslint node: true */
/* jshint node: true */

'use strict';

var async = require('async'),
    logger = require('../lib/logger'),
    utils = require('../lib/utils'),
    model = require('../models/blogModel'),
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
                message: 'requesting a blog post',
                module: 'routes/blogRoute',
                method: 'getHtmlPage',
                sessionId: sessionId,
                request: req
            });

            async.parallel(
                [
                    //get blog data
                    function(callback) {
                        var query = {
                            language: req.params.language,
                            year: req.params.year,
                            month: req.params.month,
                            day: req.params.day,
                            slug: req.params.slug
                        };
                        model.getBlogData(query, callback);
                    },
                    //get menu
                    function(callback) {
                        menu.get(req.params.language, callback);
                    }
                ],
                function(error, data) {
                    if (!error && Array.isArray(data)) {
                        res
                            .set({
                                //Cache-Control
                                'Content-Type': 'text/html; charset=utf-8',
                                'Content-Language': res.getLocale()
                                //Content-Security-Policy
                            })
                            .vary('Accept-Encoding') //See http://blog.maxcdn.com/accept-encoding-its-vary-important/
                            .render('blog', utils.deepExtend({}, data[0], { menu: data[1], sessionId: sessionId }));
                    } else {
                        next(error); //TODO  || not found
                    }
                }
            );

        } catch (exception) {
            next(exception);
        }
    }
};

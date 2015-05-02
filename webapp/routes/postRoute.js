/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var async = require('async'),
    Url = require('url'),
    ApplicationError = require('../lib/error'),
    convert = require('../lib/convert'),
    logger = require('../lib/logger'),
    markdown = require('../lib/markdown'),
    utils = require('../lib/utils'),
    index = require('../models/indexModel'),
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
                        var site_url = req.protocol + '://' + req.get('host') + Url.parse(req.originalUrl).pathname;
                        index.findContentBySiteUrl(site_url, callback);
                    },
                    //get menu
                    function(callback) {
                        menu.getMenu(req.params.language, callback);
                    }
                ],
                function(error, responses) {
                    if(!error && Array.isArray(responses) && responses.length && Array.isArray(responses[0]) && responses[0].length) {
                        var data;
                        if (req.params.slug) { //single post
                            data = utils.deepExtend({}, responses[0][0], {
                                content: markdown.render(responses[0][0].text),
                                menu: responses[1],
                                results: false,
                                sessionId: req.sessionId
                            });
                        } else { //list of posts
                            data = {
                                author: '',
                                description: '',
                                icon: 'magnifying_glass',
                                keywords: '',
                                menu: responses[1],
                                results: responses[0],
                                sessionId: req.sessionId,
                                title: ''
                            }
                        }
                        res
                            .set({
                                'Content-Type': 'text/html; charset=utf-8',
                                'Content-Language': res.getLocale()
                            })
                            .vary('Accept-Encoding') //See http://blog.maxcdn.com/accept-encoding-its-vary-important/
                            .render('post', data);
                    } else {
                        next(error || new ApplicationError(404));
                    }
                }
            );

        } catch (exception) {
            next(exception);
        }
    }
};

/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var async = require('async'),
    qs = require('qs'),
    ApplicationError = require('../lib/error'),
    convert = require('../lib/convert'),
    logger = require('../lib/logger'),
    markdown = require('../lib/markdown'),
    url = require('../lib/url'),
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

        var config = res.locals.config;
        var format = res.locals.format;
        var urljoin = res.locals.urljoin;

        //Create a trace that we can track in the browser
        req.trace = utils.uuid();

        //Log the request
        logger.info({
            message: 'requesting a blog post',
            module: 'routes/blogRoute',
            method: 'getHtmlPage',
            request: req
        });

        async.parallel(
            [
                //get menu
                function(callback) {
                    menu.getMenu(req.params.language, callback);
                },
                //get blog post
                function(callback) {
                    var site_url = req.protocol + '://' + req.get('host') + url.parse(req.originalUrl).pathname;
                    index.findBySiteUrl(site_url, req.query, callback);
                },
                //Get grouped categories
                function(callback) {
                    index.groupByCategory(req.params.language, callback);
                },
                //Get grouped authors
                function(callback) {
                    index.groupByAuthor(req.params.language, callback);
                },
                //Get grouped years/months
                function(callback) {
                    index.groupByYearMonth(req.params.language, callback);
                }
            ],
            function(error, responses) {
                if(!error && Array.isArray(responses) && responses.length > 1 && Array.isArray(responses[0]) && Array.isArray(responses[1]) && responses[1].length > 0) {
                    var data;

                    if (req.params.slug) { //single post
                        data = utils.deepExtend({}, responses[1][0], {
                            authors: responses[3],
                            categories: responses[2],
                            content: markdown.render(responses[1][0].text),
                            menu: responses[0],
                            months: responses[4],
                            results: false, //trick header into not displaying robots noindex directive
                            trace: req.trace
                        });
                        res
                            .set({
                                'Content-Type': 'text/html; charset=utf-8',
                                'Content-Language': res.getLocale(),
                                'Cache-Control': 'max-age=3600, public'
                            })
                            .vary('Accept-Encoding') //See http://blog.maxcdn.com/accept-encoding-its-vary-important/
                            .render('post', data);

                    } else { //list of posts
                        data = {
                            author: res.__('meta.author'),
                            authors: responses[3],
                            categories: responses[2],
                            description: res.__('meta.description'),
                            icon: res.__('search.title.icon'),
                            keywords: res.__('meta.keywords'),
                            menu: responses[0],
                            months: responses[4],
                            results: responses[1],
                            trace: req.trace,
                            site_url: urljoin(config.uris.webapp.root, format(config.uris.webapp.posts, req.params.language, req.params.year || '', req.params.month || '', ''), '?' + qs.stringify(req.query)),
                            title: res.__('search.title.heading')
                        };
                        res
                            .set({
                                'Content-Type': 'text/html; charset=utf-8',
                                'Content-Language': res.getLocale(),
                                'Cache-Control': 'max-age=0, public'
                            })
                            .vary('Accept-Encoding') //See http://blog.maxcdn.com/accept-encoding-its-vary-important/
                            .render('search', data);
                    }

                } else {
                    next(error || new ApplicationError(404));
                }
            }
        );

    }
};

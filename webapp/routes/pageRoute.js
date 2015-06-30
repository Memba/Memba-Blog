/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var async = require('async'),
    qs = require('qs'),
    util = require('util'),
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

        //Create a sessionId that we can track in the browser
        req.sessionId = utils.uuid();

        //Log the request
        logger.info({
            message: 'requesting a page',
            module: 'routes/pageRoute',
            method: 'getHtmlPage',
            request: req
        });

        async.parallel(
            [
                //get menu
                function(callback) {
                    menu.getMenu(req.params.language, callback);
                },
                //get page
                function(callback) {
                    var path = convert.getPagePath(req.params.language, req.params.slug);
                    index.findByPath(path, req.params.slug ? undefined : req.query, callback);
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

                    if (req.params.slug || utils.isEmptyObject(req.query)) { //single page

                        data = utils.deepExtend({}, responses[1][0], {
                            authors: responses[3],
                            categories: responses[2],
                            content: markdown.render(responses[1][0].text),
                            menu: responses[0],
                            months: responses[4],
                            results: false, //trick header into not displaying robots noindex directive
                            sessionId: req.sessionId
                        });
                        res
                            .set({
                                'Content-Type': 'text/html; charset=utf-8',
                                'Content-Language': res.getLocale(),
                                'Cache-Control': 'max-age=3600, public'
                            })
                            .vary('Accept-Encoding') //See http://blog.maxcdn.com/accept-encoding-its-vary-important/
                            .render('page', data);

                    } else { //list of pages and posts
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
                            sessionId: req.sessionId,
                            site_url: url.join(util.format(res.locals.config.uris.webapp.pages, req.params.language, ''), '?' + qs.stringify(req.query)),
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

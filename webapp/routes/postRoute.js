/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var assert = require('assert');
var async = require('async');
var qs = require('qs');
var ApplicationError = require('../lib/error');
var convert = require('../lib/convert');
var logger = require('../lib/logger');
var markdown = require('../lib/markdown');
var url = require('../lib/url');
var utils = require('../lib/utils');
var indexModel = require('../models/indexModel');
var menuModel = require('../models/menuModel');

module.exports = {

    /**
     * Returns the user page
     * @param req
     * @param res
     * @param next
     */
    getHtmlPage: function (req, res, next) {

        var config = res.locals.config;
        var format = res.locals.format;
        // var url = res.locals.url;

        // Create a trace that we can track in the browser
        req.trace = utils.uuid();

        // Log the request
        logger.info({
            message: 'requesting a blog post',
            module: 'routes/blogRoute',
            method: 'getHtmlPage',
            request: req
        });

        var language = req.params.language;
        assert.equal(language, res.getLocale(), format('i18n locale is not `{0}`', language));

        async.parallel(
            [
                // get menu
                function (callback) {
                    menuModel.getMenu(language, callback);
                },
                // get blog post
                function (callback) {
                    /* jscs: disable requireCamelCaseOrUpperCaseIdentifiers */
                    var site_url = req.protocol + '://' + req.get('host') + url.parse(req.originalUrl).pathname;
                    indexModel.findBySiteUrl(site_url, req.query, callback);
                    /* jscs: enable requireCamelCaseOrUpperCaseIdentifiers */
                },
                // Get grouped categories
                function (callback) {
                    indexModel.groupByCategory(language, callback);
                },
                // Get grouped authors
                function (callback) {
                    indexModel.groupByAuthor(language, callback);
                },
                // Get grouped years/months
                function (callback) {
                    indexModel.groupByYearMonth(language, callback);
                }
            ],
            /* This function's cyclomatic complexity is too high. */
            /* jshint -W074 */
            function (error, responses) {
                /* jshint maxcomplexity: 7 */
                if (!error && Array.isArray(responses) && responses.length > 1 && Array.isArray(responses[0]) && Array.isArray(responses[1]) && responses[1].length > 0) {
                    var data;
                    if (req.params.slug) { // single post
                        var text = responses[1][0].text;
                        data = utils.deepExtend({}, responses[1][0], {
                            authors: responses[3],
                            categories: responses[2],
                            content: markdown.render(text),
                            image: markdown.image(text) || url.join(config.uris.webapp.root, format(config.uris.webapp.public, 'apple-touch-icon-152x152.png')),
                            language: language,
                            menu: responses[0],
                            months: responses[4],
                            results: false, // trick header into not displaying robots noindex directive
                            trace: req.trace
                        });
                        res
                            .set({
                                'Content-Type': 'text/html; charset=utf-8',
                                'Content-Language': language,
                                'Cache-Control': 'max-age=3600, public'
                            })
                            .vary('Accept-Encoding') // See http://blog.maxcdn.com/accept-encoding-its-vary-important/
                            .render('post', data);

                    } else { // list of posts
                        data = {
                            author: res.__('meta.author'),
                            authors: responses[3],
                            categories: responses[2],
                            description: res.__('meta.description'),
                            icon: res.__('search.title.icon'),
                            image: url.join(config.uris.webapp.root, format(config.uris.webapp.public, 'apple-touch-icon-152x152.png')),
                            keywords: res.__('meta.keywords'),
                            language: language,
                            menu: responses[0],
                            months: responses[4],
                            results: responses[1],
                            trace: req.trace,
                            /* jscs: disable requireCamelCaseOrUpperCaseIdentifiers */
                            site_url: url.join(config.uris.webapp.root, format(config.uris.webapp.posts, language, req.params.year || '', req.params.month || '', ''), '?' + qs.stringify(req.query)),
                            /* jscs: enable requireCamelCaseOrUpperCaseIdentifiers */
                            title: res.__('search.title.heading')
                        };
                        res
                            .set({
                                'Content-Type': 'text/html; charset=utf-8',
                                'Content-Language': language,
                                'Cache-Control': 'max-age=0, public'
                            })
                            .vary('Accept-Encoding') // See http://blog.maxcdn.com/accept-encoding-its-vary-important/
                            .render('search', data);
                    }

                } else {
                    next(error || new ApplicationError(404));
                }
            }
            /* jshint +W074 */
        );

    }
};

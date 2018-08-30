/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var assert = require('assert');
// var async = require('async');
var parallel = require('async/parallel');
var qs = require('qs');
var ApplicationError = require('../lib/applicationError.es6');
var convert = require('../lib/convert');
var logger = require('../lib/logger.es6');
var markdown = require('../lib/markdown');
var utils = require('../lib/utils.es6');
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
        var url = res.locals.url;

        // Create a trace that we can track in the browser
        req.trace = utils.uuid();

        // Log the request
        logger.info({
            message: 'requesting a page',
            module: 'routes/pageRoute',
            method: 'getHtmlPage',
            request: req
        });

        var language = req.params.language;
        assert.equal(language, res.getLocale(), format('i18n locale is not `{0}`', language));

        // async.parallel(
        parallel(
            [
                // get menu
                function (callback) {
                    menuModel.getMenu(language, callback);
                },
                // get page
                function (callback) {
                    var path = convert.getPagePath(language, req.params.slug);
                    indexModel.findByPath(path, req.params.slug ? undefined : req.query, callback);
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
            function (error, responses) {

                if (!error && Array.isArray(responses) && responses.length > 1 && Array.isArray(responses[0]) && Array.isArray(responses[1]) && responses[1].length > 0) {
                    var data;

                    if (req.params.slug || utils.isEmptyObject(req.query)) { // single page
                        var text = responses[1][0].text;
                        data = utils.deepExtend({}, responses[1][0], {
                            authors: responses[3],
                            categories: responses[2],
                            content: markdown.render(text),
                            image: markdown.image(text) || config.images[Math.floor(config.images.length * Math.random())],
                            language: language,
                            menu: responses[0],
                            months: responses[4],
                            trace: req.trace
                        });
                        res
                            .set({
                                'Cache-Control': 'private, max-age=43200',
                                'Content-Language' : language,
                                'Content-Type': 'text/html; charset=utf-8'
                            })
                            .vary('Accept-Encoding') // See http://blog.maxcdn.com/accept-encoding-its-vary-important/
                            .render('page', data);

                    } else { // list of pages and posts
                        data = {
                            author: res.__('meta.author'),
                            authors: responses[3],
                            categories: responses[2],
                            description: res.__('meta.description'),
                            icon: res.__('search.title.icon'),
                            image: config.images[Math.floor(config.images.length * Math.random())],
                            keywords: res.__('meta.keywords'),
                            language: language,
                            menu: responses[0],
                            months: responses[4],
                            results: responses[1],
                            trace: req.trace,
                            /* jscs: disable requireCamelCaseOrUpperCaseIdentifiers */
                            site_url: url.resolve(config.uris.webapp.root, format(config.uris.webapp.pages, language, '')) + '?' + qs.stringify(req.query),
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
        );

    }
};

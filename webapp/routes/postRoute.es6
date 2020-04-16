/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const assert = require('assert');
const parallel = require('async/parallel');
const qs = require('qs');
const ApplicationError = require('../lib/applicationError.es6');
const logger = require('../lib/logger.es6');
const markdown = require('../lib/markdown');
const utils = require('../lib/utils.es6');
const indexModel = require('../models/indexModel.es6');
const menuModel = require('../models/menuModel.es6');

module.exports = {
    /**
     * Returns the user page
     * @param req
     * @param res
     * @param next
     */
    getHtmlPage(req, res, next) {
        const { config, format, URL } = res.locals;

        // Create a trace that we can track in the browser
        req.trace = utils.uuid();

        // Log the request
        logger.info({
            message: 'requesting a blog post',
            module: 'routes/postRoute',
            method: 'getHtmlPage',
            request: req,
        });

        const { language } = req.params;
        assert.strictEqual(
            language,
            res.getLocale(),
            format('i18n locale is not `{0}`', language)
        );

        // async.parallel(
        parallel(
            [
                // get menu
                (callback) => {
                    menuModel.getMenu(language, callback);
                },
                // get blog post(s)
                (callback) => {
                    // eslint-disable-next-line camelcase
                    const site_url = new URL(
                        req.originalUrl,
                        config.uris.webapp.root
                    );
                    indexModel.findBySiteUrl(
                        site_url.origin + site_url.pathname,
                        req.query,
                        callback
                    );
                },
                // Get grouped categories
                (callback) => {
                    indexModel.groupByCategory(language, callback);
                },
                // Get grouped authors
                (callback) => {
                    indexModel.groupByAuthor(language, callback);
                },
                // Get grouped years/months
                (callback) => {
                    indexModel.groupByYearMonth(language, callback);
                },
            ],
            (error, responses) => {
                if (
                    !error &&
                    Array.isArray(responses) &&
                    responses.length > 1 &&
                    Array.isArray(responses[0]) &&
                    Array.isArray(responses[1]) &&
                    responses[1].length > 0
                ) {
                    let data;
                    if (req.params.slug) {
                        // single post
                        const content = responses[1][0];
                        data = utils.deepExtend({}, content, {
                            authors: responses[3],
                            categories: responses[2],
                            content: markdown.render(content.text),
                            image:
                                markdown.image(content.text) ||
                                config.images[
                                    Math.floor(
                                        config.images.length * Math.random()
                                    )
                                ],
                            language,
                            menu: responses[0],
                            months: responses[4],
                            trace: req.trace,
                        });
                        res.set({
                            'Cache-Control': 'private, max-age=43200',
                            'Content-Language': language,
                            'Content-Type': 'text/html; charset=utf-8',
                        })
                            .vary('Accept-Encoding') // See http://blog.maxcdn.com/accept-encoding-its-vary-important/
                            .render('post', data);
                    } else {
                        // list of posts
                        const results = responses[1];
                        data = {
                            author: res.__('meta.author'),
                            authors: responses[3],
                            categories: responses[2],
                            description: res.__('meta.description'),
                            icon: res.__('search.title.icon'),
                            image:
                                config.images[
                                    Math.floor(
                                        config.images.length * Math.random()
                                    )
                                ],
                            keywords: res.__('meta.keywords'),
                            language,
                            menu: responses[0],
                            months: responses[4],
                            results,
                            trace: req.trace,
                            site_url: `${
                                new URL(
                                    format(
                                        config.uris.webapp.posts,
                                        language,
                                        req.params.year || '',
                                        req.params.month || '',
                                        ''
                                    ).replace(/\/+$/, ''), // Remove trailing backslashes
                                    config.uris.webapp.root
                                ).href
                            }?${qs.stringify(req.query)}`,
                            title: res.__('search.title.heading'),
                        };
                        res.set({
                            'Content-Type': 'text/html; charset=utf-8',
                            'Content-Language': language,
                            'Cache-Control': 'max-age=0, public',
                        })
                            .vary('Accept-Encoding') // See http://blog.maxcdn.com/accept-encoding-its-vary-important/
                            .render('search', data);
                    }
                } else {
                    next(error || new ApplicationError(404));
                }
            }
        );
    },
};

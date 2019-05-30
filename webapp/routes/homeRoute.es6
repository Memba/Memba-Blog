/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

'use strict';

const logger = require('../lib/logger.es6');
const utils = require('../lib/utils.es6');
const menuModel = require('../models/menuModel.es6');

module.exports = {
    /**
     * Returns the home page
     * @param req
     * @param res
     * @param next
     */
    getHtmlPage(req, res, next) {
        const { config, URL } = res.locals;

        // Create a trace that we can track in the browser
        req.trace = utils.uuid();

        // Log the request
        logger.info({
            message: 'requesting the home page',
            method: 'getHtmlPage',
            module: 'routes/homeRoute',
            request: req
        });

        const language = res.getLocale();

        // Get menu with english as default language
        menuModel.getMenu('en', (error, data) => {
            if (!error && data) {
                res.set({
                    'Cache-Control': 'private, max-age=43200',
                    'Content-Language': language,
                    'Content-Type': 'text/html; charset=utf-8'
                })
                    .vary('Accept-Encoding') // See http://blog.maxcdn.com/accept-encoding-its-vary-important/
                    .render('home', {
                        author: config.home.author,
                        description: config.home.description,
                        image:
                            config.images[
                                Math.floor(config.images.length * Math.random())
                            ],
                        keywords: config.home.keywords,
                        language,
                        menu: data,
                        trace: req.trace,
                        site_url: new URL(
                            config.uris.webapp.home,
                            config.uris.webapp.root
                        ).href, // canonical link
                        title: config.home.title
                    });
            } else {
                next(error);
            }
        });
    }
};

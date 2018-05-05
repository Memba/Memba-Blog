/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const logger = require('../lib/logger');
const utils = require('../lib/utils.es6');
const menuModel = require('../models/menuModel');

module.exports = {
    /**
     * Returns the home page
     * @param req
     * @param res
     * @param next
     */
    getHtmlPage(req, res, next) {
        const { config, url } = res.locals;

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
                res
                    .set({
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
                        site_url: url.resolve(
                            config.uris.webapp.root,
                            config.uris.webapp.home
                        ), // canonical link
                        title: config.home.title
                    });
            } else {
                next(error);
            }
        });
    }
};

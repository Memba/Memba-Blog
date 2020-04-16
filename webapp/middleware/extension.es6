/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const util = require('util');
const http = require('http');
const { URL } = require('url');
const config = require('../config/index.es6');

const SEPARATOR = '\\/';
const allow = {
    feed: util.format(
        config
            .get('uris:webapp:feed')
            .replace(new RegExp(SEPARATOR, 'g'), SEPARATOR),
        '[a-z]{2}'
    ),
    sitemap: util
        .format(
            config
                .get('uris:webapp:sitemap')
                .replace(new RegExp(SEPARATOR, 'g'), SEPARATOR),
            '([a-z]{2})?'
        )
        .replace(`${SEPARATOR}(`, `(${SEPARATOR}`), // This avoids // if the pathname is /sitemap.xml (without optional language)
};

module.exports = {
    /**
     * Return a simplified 404 error when requesting a missing file with extension
     * Without this middleware, the params.validateLanguage middleware is triggered
     * @param req
     * @param res
     * @param next
     */
    handler(req, res, next) {
        const { pathname } = new URL(
            req.originalUrl,
            config.get('uris:webapp:root')
        );
        if (
            /\/[^/.]+\.[\w]+$/i.test(pathname) &&
            !/\.html?$/i.test(pathname) &&
            !new RegExp(`^${allow.feed}$`).test(pathname) &&
            !new RegExp(`^${allow.sitemap}$`).test(pathname)
        ) {
            // If pathname ends with a file extension (images, stylesheets, scripts, ...),
            // spare bandwidth by returning a plain text (non-html) error for missing assets
            res.status(404)
                .set({ 'Content-Type': 'text/plain; charset=utf-8' })
                .send(http.STATUS_CODES['404']);
        } else {
            next();
        }
    },
};

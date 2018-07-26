/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const http = require('http');
const url = require('url');
const ApplicationError = require('../lib/applicationError.es6');

module.exports = {
    /**
     * Not found handler
     * @param req
     * @param res
     * @param next
     */
    handler(req, res, next) {
        const { pathname } = url.parse(req.originalUrl);
        if (
            /\/[^/.]+\.[a-z0-9]{2,7}$/i.test(pathname) &&
            !/\.html?$/i.test(pathname)
        ) {
            // If pathname ends with a file extension (images, stylesheets, scripts, ...), spare bandwidth by returning an empty error for missing assets
            res.status(404)
                .set({ 'Content-Type': 'text/plain; charset=utf-8' })
                .send(http.STATUS_CODES['404']);
        } else {
            // If pathname does not end with a file extension, pass control to the error middleware to display a nice error page
            next(new ApplicationError(404));
        }
    }
};

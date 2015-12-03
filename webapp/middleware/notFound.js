/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var http = require('http');
var url = require('url');
var ApplicationError = require('../lib/error');

module.exports = {

    /**
     * Not found handler
     * @param req
     * @param res
     * @param next
     */
    handler: function (req, res, next) {
        var pathname = url.parse(req.originalUrl).pathname;
        if ((/\/[^\/\.]+\.[\w]{1,5}$/i).test(pathname) && !/\.html?$/i.test(pathname)) {
            // If pathname ends with a file extension (images, stylesheets, scripts, ...), spare bandwidth by returning an empty error for missing assets
            res
                .status(404)
                .set({ 'Content-Type': 'text/plain; charset=utf-8' })
                .send(http.STATUS_CODES['404']);
        } else {
            // If pathname does not end with a file extension, pass control to the error middleware to display a nice error page
            next(new ApplicationError(404));
        }
    }

};

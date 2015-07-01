/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var util = require('util'),
    http = require('http'),
    Url = require('url'),
    config = require('../config'),
    SEPARATOR = '\\/',
    webapp = {
        feed: util.format(config.get('uris:webapp:feed').replace(new RegExp(SEPARATOR, 'g'), SEPARATOR), '[a-z]{2}') + '$',
        sitemap: util.format(config.get('uris:webapp:sitemap').replace(new RegExp(SEPARATOR, 'g'), SEPARATOR), '[a-z]{2}') + '$'
    };

/**
 * Return a simplified 404 error when requesting a missing file with extension
 * Without this middleware, the params.validateLanguage middleware is triggered
 * @param req
 * @param res
 * @param next
 */
module.exports = function(req, res, next){
    var pathname = Url.parse(req.originalUrl).pathname;
    if (/\/[^\/\.]+\.[\w]{1,5}$/i.test(pathname) && !/\.html?$/i.test(pathname)
        && !(new RegExp(webapp.feed)).test(pathname) && !(new RegExp(webapp.sitemap)).test(pathname)) {
        //If pathname ends with a file extension (images, stylesheets, scripts, ...), spare bandwidth by returning an empty error for missing assets
        res
            .status(404)
            .set({'Content-Type': 'text/plain; charset=utf-8'})
            .send(http.STATUS_CODES['404']);
    } else {
        next();
    }
};

/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var util = require('util'),
    config = require('../config'),
    logger = require('../lib/logger'),
    index = require('../models/indexModel');

module.exports = {

    /**
     * Return a localized sitemap
     * @see http://www.sitemaps.org/protocol.html
     * @see https://support.google.com/webmasters/answer/156184?hl=en
     * @param req
     * @param res
     * @param next
     */
    getXmlSitemap: function(req, res, next) {
        try {

            //Create a sessionId that we can track in the browser
            //req.sessionId = utils.uuid();

            //Log the request
            logger.info({
                message: 'requesting a sitemap',
                module: 'routes/sitemapRoute',
                method: 'getXmlSitemap',
                request: req
            });

            index.getIndex(req.params.language, function(error, indexEntries) {
                if(!error && Array.isArray(indexEntries)) {
                    var sitemap = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
                    for(var i = 0; i < indexEntries.length; i++) {
                        sitemap += util.format('<url><loc>%s</loc></url>', indexEntries[i].site_url);
                    }
                    sitemap+= '</urlset>';
                    res
                        .set({
                            'Content-Type': 'application/xml; charset=utf-8',
                            'Content-Language': res.getLocale(),
                            'Cache-Control': 'max-age=3600, public'
                        })
                        .vary('Accept-Encoding') //See http://blog.maxcdn.com/accept-encoding-its-vary-important/
                        .send(sitemap);
                } else {
                    next(error);
                }
            });

        } catch (exception) {
            next(exception);
        }
    }

};

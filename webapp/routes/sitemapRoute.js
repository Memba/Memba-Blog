/**
 * Copyright (c) 2013-2016 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var assert = require('assert');
var url = require('url');
var util = require('util');
var config = require('../config');
var logger = require('../lib/logger');
var indexModel = require('../models/indexModel');

var XML_HEAD = '<?xml version="1.0" encoding="UTF-8"?>';

// Sitemap indexes
var INDEX_BEGIN = '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd">';
var INDEX_ITEM = '<sitemap><loc>%s</loc></sitemap>';
var INDEX_END = '</sitemapindex>';

// Sitemap
var SITEMAP_BEGIN = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">';
var SITEMAP_ITEM = '<url><loc>%s</loc><lastmod>%s</lastmod><changefreq>%s</changefreq><priority>%s</priority></url>';
var SITEMAP_END = '</urlset>';

module.exports = {

    /**
     * Return a localized sitemap
     * @see http://www.sitemaps.org/protocol.html
     * @see https://support.google.com/webmasters/answer/156184?hl=en
     * @param req
     * @param res
     * @param next
     */
    getXmlSitemap: function (req, res, next) {

        // var config = res.locals.config;
        var format = res.locals.format;
        // var url = res.locals.url;

        // Create a trace that we can track in the browser
        // req.trace = utils.uuid();

        // Log the request
        logger.info({
            message: 'requesting a sitemap',
            module: 'routes/sitemapRoute',
            method: 'getXmlSitemap',
            request: req
        });

        var language = req.params.language;

        if (language) {

            indexModel.getIndex(req.params.language, function (error, indexEntries) {
                if (!error && Array.isArray(indexEntries)) {

                    var sitemap = XML_HEAD + SITEMAP_BEGIN;

                    for (var i = 0; i < indexEntries.length; i++) {
                        /* jscs: disable requireCamelCaseOrUpperCaseIdentifiers */
                        var loc = indexEntries[i].site_url;
                        var lastmod = indexEntries[i].creation_date;
                        var changefreq = 'monthly';
                        var priority = '1.0';
                        /* jscs: enable requireCamelCaseOrUpperCaseIdentifiers */
                        sitemap += util.format(SITEMAP_ITEM, loc, lastmod, changefreq, priority);
                    }

                    sitemap += SITEMAP_END;

                    res
                        .set({
                            'Content-Type': 'application/xml; charset=utf-8',
                            'Content-Language': language
                            // 'Cache-Control': 'max-age=3600, public'
                        })
                        .vary('Accept-Encoding') // See http://blog.maxcdn.com/accept-encoding-its-vary-important/
                        .send(sitemap);
                } else {
                    next(error);
                }
            });

        } else {

            var locales = res.locals.getLocales();
            // TODO compare with config?

            var index = XML_HEAD + INDEX_BEGIN;

            if (Array.isArray(locales)) {
                // Iterate over locales
                for (var i = 0; i < locales.length; i++) {
                    var loc = url.resolve(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:sitemap'), locales[i]));
                    index += util.format(INDEX_ITEM, loc);
                }
            }

            index += INDEX_END;

            // Send the index
            res.set({
                    'Content-Type': 'application/xml; charset=utf-8'
                    // 'Cache-Control': 'max-age=3600, public'
                })
                .vary('Accept-Encoding') // See http://blog.maxcdn.com/accept-encoding-its-vary-important/
                .send(index);

        }

    }

};

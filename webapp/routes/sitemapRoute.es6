/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const assert = require('assert');
const logger = require('../lib/logger.es6');
const indexModel = require('../models/indexModel.es6');

const XML_HEAD = '<?xml version="1.0" encoding="UTF-8"?>';

// Sitemap indexes
const INDEX_BEGIN =
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd">';
const INDEX_ITEM = '<sitemap><loc>%s</loc></sitemap>';
const INDEX_END = '</sitemapindex>';

// Sitemap
const SITEMAP_BEGIN =
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">';
const SITEMAP_ITEM =
    '<url><loc>%s</loc><lastmod>%s</lastmod><changefreq>%s</changefreq><priority>%s</priority></url>';
const SITEMAP_END = '</urlset>';

module.exports = {
    /**
     * Return a localized sitemap
     * @see http://www.sitemaps.org/protocol.html
     * @see https://support.google.com/webmasters/answer/156184?hl=en
     * @param req
     * @param res
     * @param next
     */
    getXmlSitemap(req, res, next) {
        const { config, format, URL } = res.locals;

        // Create a trace that we can track in the browser
        // req.trace = utils.uuid();

        // Log the request
        logger.info({
            message: 'requesting a sitemap',
            module: 'routes/sitemapRoute',
            method: 'getXmlSitemap',
            request: req,
        });

        const { language } = req.params;
        assert.strictEqual(
            language,
            res.getLocale(),
            format('i18n locale is not `{0}`', language)
        );

        if (language) {
            indexModel.getIndex(req.params.language, (error, indexEntries) => {
                if (!error && Array.isArray(indexEntries)) {
                    let sitemap = XML_HEAD + SITEMAP_BEGIN;

                    for (let i = 0; i < indexEntries.length; i++) {
                        const loc = indexEntries[i].site_url;
                        const lastmod = indexEntries[i].creation_date;
                        const changefreq = 'monthly';
                        const priority = '1.0';
                        sitemap += format(
                            SITEMAP_ITEM,
                            loc,
                            lastmod,
                            changefreq,
                            priority
                        );
                    }

                    sitemap += SITEMAP_END;

                    res.set({
                        'Cache-Control': 'private, max-age=43200',
                        'Content-Language': language,
                        'Content-Type': 'application/xml; charset=utf-8',
                    })
                        .vary('Accept-Encoding') // See http://blog.maxcdn.com/accept-encoding-its-vary-important/
                        .send(sitemap);
                } else {
                    next(error);
                }
            });
        } else {
            const locales = res.locals.getLocales();
            // TODO compare with config?

            let index = XML_HEAD + INDEX_BEGIN;

            if (Array.isArray(locales)) {
                // Iterate over locales
                for (let i = 0; i < locales.length; i++) {
                    const loc = new URL(
                        format(config.get('uris:webapp:sitemap'), locales[i]),
                        config.get('uris:webapp:root')
                    ).href;
                    index += format(INDEX_ITEM, loc);
                }
            }

            index += INDEX_END;

            // Send the index
            res.set({
                'Content-Type': 'application/xml; charset=utf-8',
                // 'Cache-Control': 'max-age=3600, public'
            })
                .vary('Accept-Encoding') // See http://blog.maxcdn.com/accept-encoding-its-vary-important/
                .send(index);
        }
    },
};

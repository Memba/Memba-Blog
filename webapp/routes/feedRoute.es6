/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const assert = require('assert');
const { URL } = require('url');
const config = require('../config/index.es6');
const logger = require('../lib/logger.es6');
const indexModel = require('../models/indexModel.es6');

const SITE_URL = new URL('%s', config.get('uris:webapp:root')).href;
const FEED_URL = new URL(
    config.get('uris:webapp:feed'),
    config.get('uris:webapp:root')
).href;

module.exports = {
    /**
     * Return a localized RSS feed
     * @see https://validator.w3.org/feed/#validate_by_input
     * @see https://validator.w3.org/feed/docs/rss2.html#sampleFiles
     * @param req
     * @param res
     * @param next
     */
    getRSS(req, res, next) {
        const { format } = res.locals;

        // Create a trace that we can track in the browser
        // req.trace = utils.uuid();

        // Log the request
        logger.info({
            message: 'requesting a feed',
            module: 'routes/feedRoute',
            method: 'getRSS',
            request: req
        });

        const { language } = req.params;
        assert.strictEqual(
            language,
            res.getLocale(),
            format('i18n locale is not `{0}`', language)
        );

        indexModel.getIndex(language, (error, indexEntries) => {
            if (!error && Array.isArray(indexEntries)) {
                let feed =
                    '<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/"><channel>';
                feed += format(
                    '<atom:link href="%s" rel="self" type="application/rss+xml" />',
                    format(FEED_URL, language)
                );
                feed += format('<title>%s</title>', res.__('meta.title'));
                feed += format('<link>%s</link>', format(SITE_URL, language));
                feed += format(
                    '<description>%s</description>',
                    res.__('meta.description')
                );
                feed += format('<language>%s</language>', language);
                feed += format(
                    '<copyright>%s</copyright>',
                    res.__('footer.copyright').replace('&copy;', '&#169;')
                );
                feed += format(
                    '<pubDate>%s</pubDate>',
                    new Date().toUTCString()
                );
                // TODO add image
                for (let i = 0; i < indexEntries.length; i++) {
                    feed += '<item>';
                    feed += format('<title>%s</title>', indexEntries[i].title);
                    feed += format('<link>%s</link>', indexEntries[i].site_url);
                    feed += format(
                        '<description><![CDATA[%s]]></description>',
                        indexEntries[i].description
                    );
                    feed += format(
                        '<dc:creator>%s</dc:creator>',
                        indexEntries[i].author
                    );
                    feed += format(
                        '<category>%s</category>',
                        indexEntries[i].category
                    );
                    feed += format(
                        '<guid isPermaLink="false">urn:uuid:%s</guid>',
                        indexEntries[i].uuid
                    );
                    feed += format(
                        '<pubDate>%s</pubDate>',
                        new Date(indexEntries[i].creation_date).toUTCString()
                    );
                    feed += '</item>';
                }
                feed += '</channel></rss>';
                res.set({
                    'Cache-Control': 'private, max-age=43200',
                    'Content-Language': language,
                    'Content-Type': 'application/rss+xml; charset=utf-8'
                })
                    .vary('Accept-Encoding') // See http://blog.maxcdn.com/accept-encoding-its-vary-important/
                    .send(feed);
            } else {
                next(error);
            }
        });
    }
};

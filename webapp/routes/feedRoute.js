/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var util = require('util');
var config = require('../config');
var logger = require('../lib/logger');
var url = require('../lib/url');
var index = require('../models/indexModel');
var SITE_URL = url.join(config.get('uris:webapp:root'), '%s');
var FEED_URL = url.join(config.get('uris:webapp:root'), config.get('uris:webapp:feed'));

module.exports = {

    /**
     * Return a localized RSS feed
     * @see https://validator.w3.org/feed/#validate_by_input
     * @see https://validator.w3.org/feed/docs/rss2.html#sampleFiles
     * @param req
     * @param res
     * @param next
     */
    getRSS: function (req, res, next) {

        // Create a trace that we can track in the browser
        // req.trace = utils.uuid();

        // Log the request
        logger.info({
            message: 'requesting a feed',
            module: 'routes/feedRoute',
            method: 'getRSS',
            request: req
        });

        index.getIndex(req.params.language, function (error, indexEntries) {
            if (!error && Array.isArray(indexEntries)) {
                var feed = '<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/"><channel>';
                feed+= util.format('<atom:link href="%s" rel="self" type="application/rss+xml" />', util.format(FEED_URL, req.params.language));
                feed += util.format('<title>%s</title>', res.__('meta.title'));
                feed += util.format('<link>%s</link>', util.format(SITE_URL, req.params.language));
                feed += util.format('<description>%s</description>', res.__('meta.description'));
                feed += util.format('<language>%s</language>', req.params.language);
                feed += util.format('<copyright>%s</copyright>', res.__('footer.copyright').replace('&copy;', '&#169;'));
                feed += util.format('<pubDate>%s</pubDate>', (new Date()).toUTCString());
                // TODO add image
                for (var i = 0; i < indexEntries.length; i++) {
                    feed += '<item>';
                    feed += util.format('<title>%s</title>', indexEntries[i].title);
                    /* jscs: disable requireCamelCaseOrUpperCaseIdentifiers */
                    feed += util.format('<link>%s</link>', indexEntries[i].site_url);
                    /* jscs: enable requireCamelCaseOrUpperCaseIdentifiers */
                    feed += util.format('<description><![CDATA[%s]]></description>', indexEntries[i].description);
                    feed += util.format('<dc:creator>%s</dc:creator>', indexEntries[i].author);
                    feed += util.format('<category>%s</category>', indexEntries[i].category);
                    feed += util.format('<guid isPermaLink="false">urn:uuid:%s</guid>', indexEntries[i].uuid);
                    /* jscs: disable requireCamelCaseOrUpperCaseIdentifiers */
                    feed += util.format('<pubDate>%s</pubDate>', new Date(indexEntries[i].creation_date).toUTCString());
                    /* jscs: enable requireCamelCaseOrUpperCaseIdentifiers */
                    feed += '</item>';
                }
                feed+= '</channel></rss>';
                res
                    .set({
                        'Content-Type': 'application/rss+xml; charset=utf-8',
                        'Content-Language': res.getLocale(),
                        'Cache-Control': 'max-age=3600, public'
                    })
                    .vary('Accept-Encoding') // See http://blog.maxcdn.com/accept-encoding-its-vary-important/
                    .send(feed);
            } else {
                next(error);
            }
        });

    }

};

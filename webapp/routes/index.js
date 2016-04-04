/**
 * Copyright (c) 2013-2016 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var util = require('util');
var router = express.Router();
var config = require('../config');
var error = require('../middleware/error');
var extension = require('../middleware/extension');
var locals = require('../middleware/locals');
var notFound = require('../middleware/notFound');
var params = require('../middleware/params');
var pingRoute = require('./pingRoute');
var loggerRoute = require('./loggerRoute');
var homeRoute = require('./homeRoute');
var hookRoute = require('./hookRoute');
var feedRoute = require('./feedRoute');
var sitemapRoute = require('./sitemapRoute');
var pageRoute = require('./pageRoute');
var postRoute = require('./postRoute');

// Validate parameters
router.param('language', params.validateLanguage);
router.param('year', params.validateYear);
router.param('month', params.validateMonth);
// TODO? router.param('slug', params.validateSlug);

// Return simplified 404 for support files with extensions
// ATTENTION! we have exceptions for ping, feeds, sitemaps and hook
router.use(extension);

// Make config values, including paths to images, available to our templates
router.use(locals);

// Ping
router.route(config.get('uris:webapp:ping'))
    .get(pingRoute.getOK);

// Logger
router.route(config.get('uris:webapp:logger'))
    .get(loggerRoute.createLogEntry);

// Home
router.route(config.get('uris:webapp:home'))
    .get(homeRoute.getHtmlPage);

// Github webhook
router.route(config.get('uris:webapp:hook'))
    .post(jsonParser, hookRoute.handler);

// Sitemap (index at the root)
router.route(util.format(config.get('uris:webapp:sitemap'), ':language?'))
    .get(sitemapRoute.getXmlSitemap);

// Rss feed
router.route(util.format(config.get('uris:webapp:feed'), ':language'))
    .get(feedRoute.getRSS);

// Blog posts
router.route(util.format(config.get('uris:webapp:posts'), ':language', ':year?', ':month?', ':slug?'))
    .get(postRoute.getHtmlPage);

// Pages
router.route(util.format(config.get('uris:webapp:pages'), ':language', ':slug?'))
    .get(pageRoute.getHtmlPage);

// Anything not found
router.use(notFound.handler);
router.use(error.handler);

module.exports = router;

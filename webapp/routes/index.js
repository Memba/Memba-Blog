/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var express = require('express'),
    jsonParser = require('body-parser').json(),
    util = require('util'),
    router = express.Router(),
    config = require('../config'),
    locals = require('../middleware/locals'),
    language = require('../middleware/language'),
    year = require('../middleware/year'),
    month = require('../middleware/month'),
    slug = require('../middleware/slug'),
    notFound = require('../middleware/notFound'),
    error = require('../middleware/error'),
    homeRoute = require('./homeRoute'),
    hookRoute = require('./hookRoute'),
    feedRoute = require('./feedRoute'),
    sitemapRoute = require('./sitemapRoute'),
    pageRoute = require('./pageRoute'),
    postRoute = require('./postRoute');

// Validate parameters
router.param('language', language.validate);
router.param('year', year.validate);
router.param('month', month.validate);
//router.param('slug', slug.validate);

// Make config values, including paths to images, available to our templates
router.use(locals);

// Home
router.route(config.get('uris:webapp:home'))
    .get(homeRoute.getHtmlPage);

// Github webhook
router.route(config.get('uris:webapp:hook'))
    .post(jsonParser, hookRoute.handler);

// Rss feed
router.route(util.format(config.get('uris:webapp:feed'), ':language'))
    .post(feedRoute.getRSS);

// Sitemap
router.route(util.format(config.get('uris:webapp:sitemap'), ':language'))
    .post(sitemapRoute.getMap);

// Blog posts
router.route(util.format(config.get('uris:webapp:posts'),':language', ':year?', ':month?', ':slug?'))
    .get(postRoute.getHtmlPage);

// Pages
router.route(util.format(config.get('uris:webapp:pages'),':language', ':slug?'))
    .get(pageRoute.getHtmlPage);

// Anything not found
router.use(notFound.handler);
router.use(error.handler);

module.exports = router;

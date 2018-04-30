/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var util = require('util');
var router = express.Router();
var config = require('../config');
var error = require('../middleware/error');
var extension = require('../middleware/extension');
var locals = require('../middleware/locals');
var notFound = require('../middleware/notFound');
var params = require('../middleware/params');
var errorRoute = require('./errorRoute.es6');
var feedRoute = require('./feedRoute');
var formRoute = require('./formRoute.es6');
var homeRoute = require('./homeRoute');
var hookRoute = require('./hookRoute');
var loggerRoute = require('./loggerRoute');
var pageRoute = require('./pageRoute');
var pingRoute = require('./pingRoute.es6');
var postRoute = require('./postRoute');
var sitemapRoute = require('./sitemapRoute');

// Configure router
router.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded - use qs module
router.use(bodyParser.json()); // parse body for Json - IMPORTANT: after CORS!

// Make config values, including paths to images, available to our templates
router.use(locals);

// Validate parameters
router.param('language', params.validateLanguage);
router.param('year', params.validateYear);
router.param('month', params.validateMonth);
// TODO? router.param('slug', params.validateSlug);

// Return simplified 404 for support files with extensions
// ATTENTION! we have exceptions for ping, feeds, sitemaps and hook
router.use(extension);

// heartbeat
router.route(config.get('uris:webapp:ping'))
    .get(pingRoute.get);

// Logger
router.route(config.get('uris:webapp:logger'))
    .post(loggerRoute.createEntry);

// Form posts
router.route(config.get('uris:webapp:form'))
    .post(urlencodedParser, formRoute.post);

// Error page
router.route(util.format(config.get('uris:webapp:error'), ':language'))
    .get(errorRoute.getHtmlPage);

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

// Anything not found or erroneous
router.use(notFound.handler);
router.use(error.handler);

module.exports = router;

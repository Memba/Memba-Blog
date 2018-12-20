/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const bodyParser = require('body-parser');
const express = require('express');

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { format } = require('util');

const router = express.Router();
const config = require('../config/index.es6');
const error = require('../middleware/error.es6');
const extension = require('../middleware/extension.es6');
const locals = require('../middleware/locals.es6');
const notFound = require('../middleware/notFound.es6');
const params = require('../middleware/params.es6');
const errorRoute = require('./errorRoute.es6');
const feedRoute = require('./feedRoute.es6');
const formRoute = require('./formRoute.es6');
const homeRoute = require('./homeRoute.es6');
const hookRoute = require('./hookRoute');
const loggerRoute = require('./loggerRoute.es6');
const pageRoute = require('./pageRoute.es6');
const pingRoute = require('./pingRoute.es6');
const postRoute = require('./postRoute.es6');
const sitemapRoute = require('./sitemapRoute.es6');

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
router.use(extension.handler);

// heartbeat
router.route(config.get('uris:webapp:ping')).get(pingRoute.get);

// Logger
router.route(config.get('uris:webapp:logger')).post(loggerRoute.createEntry);

// Form posts
router
    .route(config.get('uris:webapp:form'))
    .post(urlencodedParser, formRoute.post);

// Error page
router
    .route(format(config.get('uris:webapp:error'), ':language'))
    .get(errorRoute.getHtmlPage);

// Home
router.route(config.get('uris:webapp:home')).get(homeRoute.getHtmlPage);

// Github webhook
router
    .route(config.get('uris:webapp:hook'))
    .post(jsonParser, hookRoute.handler);

// Sitemap (index at the root)
router
    .route(format(config.get('uris:webapp:sitemap'), ':language?'))
    .get(sitemapRoute.getXmlSitemap);

// Rss feed
router
    .route(format(config.get('uris:webapp:feed'), ':language'))
    .get(feedRoute.getRSS);

// Blog posts
router
    .route(
        format(
            config.get('uris:webapp:posts'),
            ':language',
            ':year?',
            ':month?',
            ':slug?'
        )
    )
    .get(postRoute.getHtmlPage);

// Pages
router
    .route(format(config.get('uris:webapp:pages'), ':language', ':slug?'))
    .get(pageRoute.getHtmlPage);

// Anything not found or erroneous
router.use(notFound.handler);
router.use(error.handler);

module.exports = router;

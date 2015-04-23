/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jslint node: true */
/* jshint node: true */

'use strict';

var express = require('express'),
    util = require('util'),
    router = express.Router(),
    config = require('../config'),
    locals = require('../middleware/locals'),
    language = require('../middleware/language'),
    year = require('../middleware/year'),
    month = require('../middleware/month'),
    day = require('../middleware/day'),
    slug = require('../middleware/slug'),
    notFound = require('../middleware/notFound'),
    error = require('../middleware/error'),
    homeRoute = require('./homeRoute'),
    pageRoute = require('./pageRoute'),
    blogRoute = require('./blogRoute');

// Make config values, including paths to images, available to our templates
router.use(locals);

// Validate parameters
router.param('language', language.validate);
router.param('year', year.validate);
router.param('month', month.validate);
router.param('day', day.validate);
router.param('slug', slug.validate);

// Home
router.route(config.get('uris:webapp:home'))
    .get(homeRoute.getHtmlPage);

// Pages
router.route(util.format(config.get('uris:webapp:page'),':language', ':slug?'))
    .get(pageRoute.getHtmlPage);

// Blog posts
router.route(util.format(config.get('uris:webapp:blog'),':language', ':year?', ':month?', ':day?', ':slug?'))
    .get(blogRoute.getHtmlPage);

//sitemap.xml (one sitemap per language/category)
//router.get('/:language/sitemap/:category?', sitemapRoute.getXmlSitemap); //TODO
//RSS = TODO

// Anything not found
router.use(notFound.handler);
router.use(error.handler);

module.exports = router;

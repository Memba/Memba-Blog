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

//See: http://expressjs.com/4x/api.html#router

// invoked for any requests passed to this router
// router.use(function(req, res, next) {
//     .. some logic here .. like any other middleware
//     next();
// });

//Make config values, including paths to images, available to our templates
router.use(locals);

//Validate parameters
router.param('language', language.validate);
router.param('year', year.validate);
router.param('month', month.validate);
router.param('day', day.validate);
router.param('slug', slug.validate);

//sitemap.xml (one sitemap per language/category)
//router.get('/:language/sitemap/:category?', sitemapRoute.getXmlSitemap); //TODO
//RSS = TODO

//Home
router.route(config.get('uris:webapp:home'))
    .get(homeRoute.getHtmlPage);

//Blog posts
router.route(util.format(config.get('uris:webapp:blog'),':language', ':year?', ':month?', ':day?', ':slug?'))
    .get(blogRoute.getHtmlPage);

//Pages
router.route(util.format(config.get('uris:webapp:page'),':language', ':slug?'))
    .get(pageRoute.getHtmlPage);


/*
 router.route('/:language/unicode').get(function(req, res) {
 res
 .set({
 //Cache-Control
 'Content-Type': 'text/html; charset=utf-8',
 'Content-Language' : res.getLocale()
 //Content-Security-Policy
 })
 .vary('Accept-Encoding') //See http://blog.maxcdn.com/accept-encoding-its-vary-important/
 .render('unicode', {
 description: 'TODO',
 title: 'TODO'
 });
 });
 */

//anything not found
router.use(notFound.handler);
router.use(error.handler);

module.exports = router;

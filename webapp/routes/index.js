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
    slug = require('../middleware/slug'),
    language = require('../middleware/language'),
    notFound = require('../middleware/notFound'),
    error = require('../middleware/error'),
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
router.param('slug', slug.validate);

//Pages
router.route(util.format(config.get('uris:webapp:page'),':language', ':slug?'))
    .get(pageRoute.getHtmlPage);

//Blog posts
router.route(util.format(config.get('uris:webapp:blog'),':language', ':slug?'))
    .get(blogRoute.getHtmlPage);

//sitemap.xml (one sitemap per language/category)
//router.get('/:language/sitemap/:category?', sitemapRoute.getXmlSitemap); //TODO
//RSS = TODO

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

/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, mocha: true, expr: true */

'use strict';

var path = require('path');
var util = require('util');
var expect = require('chai').expect;
var convert = require('../../../webapp/lib/convert');
var config = require('../../../webapp/config/index.es6');
var github = {
    language: config.get('github:language'),    // "%s/"
    pages: config.get('github:pages'),          // "pages"
    posts: config.get('github:posts'),          // "posts"
    markdown: config.get('github:markdown')     // "%s.md"
};
var webapp = {
    root: config.get('uris:webapp:root'),       // "http://localhost:3000",
    pages: config.get('uris:webapp:pages'),     // "/%s/%s"
    posts: config.get('uris:webapp:posts')      // "/%s/posts/%s/%s/%s"
};

describe('lib/convert', function () {

    it('isMarkdown', function () {
        expect(convert.isMarkdown('en/pages/faqs.md')).to.be.true;
        expect(convert.isMarkdown('images/logo.png')).to.be.false;
    });

    it('getMenuPath', function () {
        expect(convert.getMenuPath('en')).to.match(new RegExp('^' + util.format(github.language, 'en')));
        expect(convert.getMenuPath('fr')).to.match(new RegExp('^' + util.format(github.language, 'fr')));
    });

    it('getIndexPath', function () {
        expect(convert.getIndexPath('en')).to.match(/en.json$/);
        expect(convert.getIndexPath('fr')).to.match(/fr.json$/);
    });

    it('getIndexDir', function () {
        expect(convert.getIndexDir()).to.equal(path.dirname(convert.getIndexPath('en')));
        expect(convert.getIndexDir()).to.equal(path.dirname(convert.getIndexPath('fr')));
    });

    it('getLanguageDir', function () {
        expect(convert.getLanguageDir('en')).to.equal(util.format(github.language, 'en'));
        expect(convert.getLanguageDir('fr')).to.equal(util.format(github.language, 'fr'));
    });

    it('getPagePath', function () {
        // pages
        expect(convert.getPagePath('en', 'dummy-slug')).to.equal(util.format(github.language, 'en') + github.pages + '/' + util.format(github.markdown, 'dummy-slug'));
        expect(convert.getPagePath('fr', 'dummy-slug')).to.equal(util.format(github.language, 'fr') + github.pages + '/' + util.format(github.markdown, 'dummy-slug'));
        // default index page
        expect(convert.getPagePath('en', '')).to.equal(util.format(github.language, 'en') + github.pages + '/' + util.format(github.markdown, 'index'));
        expect(convert.getPagePath('fr', '')).to.equal(util.format(github.language, 'fr') + github.pages + '/' + util.format(github.markdown, 'index'));
    });

    it('getPostDir', function () {
        expect(convert.getPostDir('en')).to.equal(util.format(github.language, 'en') + github.posts);
        expect(convert.getPostDir('fr')).to.equal(util.format(github.language, 'fr') + github.posts);
    });

    it('index2language', function () {
        expect(convert.index2language(convert.getIndexPath('en'))).to.equal('en');
        expect(convert.index2language(convert.getIndexPath('fr'))).to.equal('fr');
    });

    /* jscs: disable requireCamelCaseOrUpperCaseIdentifiers */

    it('site_url2language', function () {
        // pages
        expect(convert.site_url2language(webapp.root + util.format(webapp.pages, 'en', 'dummy-slug'))).to.equal('en');
        expect(convert.site_url2language(webapp.root + util.format(webapp.pages, 'fr', 'dummy-slug'))).to.equal('fr');
        // posts
        var date = new Date();
        var year = date.getUTCFullYear().toString();
        var month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
        expect(convert.site_url2language(webapp.root + util.format(webapp.posts, 'en', year, month, 'dummy-slug'))).to.equal('en');
        expect(convert.site_url2language(webapp.root + util.format(webapp.posts, 'fr', year, month, 'dummy-slug'))).to.equal('fr');
    });

    /* jscs: enable requireCamelCaseOrUpperCaseIdentifiers */

    it('path2language', function () {
        // pages
        expect(convert.path2language(util.format(github.language, 'en') + github.pages + '/' + util.format(github.markdown, 'dummy-slug'))).to.equal('en');
        expect(convert.path2language(util.format(github.language, 'fr') + github.pages + '/' + util.format(github.markdown, 'dummy-slug'))).to.equal('fr');
        // posts
        var date = new Date();
        var year = date.getUTCFullYear().toString();
        expect(convert.path2language(util.format(github.language, 'en') + github.posts + '/' + year + '/' + util.format(github.markdown, 'dummy-slug'))).to.equal('en');
        expect(convert.path2language(util.format(github.language, 'fr') + github.posts + '/' + year + '/' + util.format(github.markdown, 'dummy-slug'))).to.equal('fr');
    });

    it('path2section', function () {
        // pages
        expect(convert.path2section(util.format(github.language, 'en') + github.pages + '/' + util.format(github.markdown, 'dummy-slug'))).to.equal('pages');
        expect(convert.path2section(util.format(github.language, 'fr') + github.pages + '/' + util.format(github.markdown, 'dummy-slug'))).to.equal('pages');
        // posts
        var date = new Date();
        var year = date.getUTCFullYear().toString();
        expect(convert.path2section(util.format(github.language, 'en') + github.posts + '/' + year + '/' + util.format(github.markdown, 'dummy-slug'))).to.equal('posts');
        expect(convert.path2section(util.format(github.language, 'fr') + github.posts + '/' + year + '/' + util.format(github.markdown, 'dummy-slug'))).to.equal('posts');
    });

    it('path2slug', function () {
        // pages
        expect(convert.path2slug(util.format(github.language, 'en') + github.pages + '/' + util.format(github.markdown, 'dummy-slug'))).to.equal('dummy-slug');
        expect(convert.path2slug(util.format(github.language, 'fr') + github.pages + '/' + util.format(github.markdown, 'dummy-slug'))).to.equal('dummy-slug');
        // posts
        var date = new Date();
        var year = date.getUTCFullYear().toString();
        expect(convert.path2slug(util.format(github.language, 'en') + github.posts + '/' + year + '/' + util.format(github.markdown, 'dummy-slug'))).to.equal('dummy-slug');
        expect(convert.path2slug(util.format(github.language, 'fr') + github.posts + '/' + year + '/' + util.format(github.markdown, 'dummy-slug'))).to.equal('dummy-slug');
    });

    /* jscs: disable requireCamelCaseOrUpperCaseIdentifiers */

    it('path2site_url', function () {
        var date = new Date();
        var year = date.getUTCFullYear().toString();
        var month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
        // pages
        expect(convert.path2site_url(util.format(github.language, 'en') + github.pages + '/' + util.format(github.markdown, 'dummy-slug'))).to.equal(webapp.root + util.format(webapp.pages, 'en', 'dummy-slug'));
        expect(convert.path2site_url(util.format(github.language, 'fr') + github.pages + '/' + util.format(github.markdown, 'dummy-slug'))).to.equal(webapp.root + util.format(webapp.pages, 'fr', 'dummy-slug'));
        // posts
        expect(convert.path2site_url(util.format(github.language, 'en') + github.posts + '/' + year + '/' + util.format(github.markdown, 'dummy-slug'), date)).to.equal(webapp.root + util.format(webapp.posts, 'en', year, month, 'dummy-slug'));
        expect(convert.path2site_url(util.format(github.language, 'fr') + github.posts + '/' + year + '/' + util.format(github.markdown, 'dummy-slug'), date)).to.equal(webapp.root + util.format(webapp.posts, 'fr', year, month, 'dummy-slug'));
    });

    /* jscs: enable requireCamelCaseOrUpperCaseIdentifiers */

});

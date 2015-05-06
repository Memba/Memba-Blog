/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, expr: true */
/* globals describe: false, before: false, it: false */

'use strict';

var expect = require('chai').expect,
    convert = require('../../../webapp/lib/convert'),
    config = require('../../../webapp/config'),
    github = {
        language: config.get('github:language'),    // "%s/"
        pages: config.get('github:pages'),          // "pages"
        posts: config.get('github:posts'),          // "posts"
        markdown: config.get('github:markdown')     // "%s.md"
    },
    webapp = {
        root: config.get('uris:webapp:root'),       // "http://localhost:3000",
        pages: config.get('uris:webapp:pages'),     // "/%s/%s"
        posts: config.get('uris:webapp:posts')      // "/%s/posts/%s/%s/%s"
    };

describe('lib/convert', function() {

    it('isMarkdown', function() {
        expect(convert.isMarkdown('en/pages/faqs.md')).to.be.true;
        expect(convert.isMarkdown('images/logo.png')).to.be.false;
    });

    it('getMenuPath', function() {
        expect(convert.getMenuPath('fr')).to.match(/^fr/);
        expect(convert.getMenuPath('en')).to.match(/^en/);
    });

    it('getIndexPath', function() {
        expect(convert.getIndexPath('fr')).to.match(/^fr/);
        expect(convert.getIndexPath('en')).to.match(/^en/);
    });

    it('path2language', function() {
        expect(convert.path2language('en/pages/faqs.md')).to.equal('en');
        expect(convert.path2language('fr/posts/2013/introduction.md')).to.equal('fr');
    });

    it('path2section', function() {
        expect(convert.path2section('en/pages/faqs.md')).to.equal('pages');
        expect(convert.path2section('fr/posts/2013/introduction.md')).to.equal('posts');
    });

    it('path2slug', function() {
        expect(convert.path2slug('en/pages/faqs.md')).to.equal('faqs');
        expect(convert.path2slug('fr/posts/2013/introduction.md')).to.equal('introduction');
    });

    it('path2site_url', function() {
        var date = new Date(),
            year = date.getUTCFullYear().toString(),
            month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
        expect(convert.path2site_url('en/pages/faqs.md')).to.equal(webapp.root + '/en/faqs');
        expect(convert.path2site_url('fr/posts/2013/introduction.md', date)).to.equal(webapp.root + '/fr/posts/' + year + '/' + month + '/introduction');
    });

});

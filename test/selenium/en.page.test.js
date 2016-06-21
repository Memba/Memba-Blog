/**
 * Copyright (c) 2013-2016 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, mocha: true, expr: true */
/* globals browser: false */

'use strict';

var expect = require('chai').expect;
var util = require('util');

var config = require('../../webapp/config');
var url = require('../../webapp/lib/url');
var webapp = {
    home: url.join(config.get('uris:webapp:root'), config.get('uris:webapp:home')),
    index: url.join(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:pages'), 'en', '')) + '/',
    faqs: url.join(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:pages'), 'en', 'faqs')),
    privacy: url.join(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:pages'), 'en', 'privacy')),
    terms: url.join(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:pages'), 'en', 'terms'))
};

describe('English pages', function () {

    before(function (done) {
        browser.url(webapp.home);
        // Note: it won't work in PhantomJS without settings the window size
        browser.windowHandleSize({ width:1280, height:800 });
    });

    describe('When navigating pages', function () {

        it('it should land on the home page with a choice of languages', function () {
            browser.logger.info(browser.getUrl());
            expect(browser.getAttribute('html', 'lang')).to.equal('en');
            expect(browser.isExisting('nav.navbar')).to.be.true;
            expect(browser.isExisting('div.uk.flag')).to.be.true;
            expect(browser.isExisting('div.fr.flag')).to.be.true;
        });

        it('it should find and navigate support', function () {
            browser.logger.info(browser.getUrl());
            browser.click('nav.navbar a[href="' + util.format(config.get('uris:webapp:pages'), 'en', '') + '"]');
            expect(browser.getUrl()).to.equal(webapp.index);
            expect(browser.getAttribute('html', 'lang')).to.equal('en');
            expect(browser.getText('div.page-header span')).to.equal('Support');
        });

        it('it should find and navigate faqs', function () {
            browser.logger.info(browser.getUrl());
            browser.click('nav.navbar a.dropdown-toggle');
            browser.click('nav.navbar a[href="' + util.format(config.get('uris:webapp:pages'), 'en', 'faqs') + '"]');
            expect(browser.getUrl()).to.equal(webapp.faqs);
            expect(browser.getAttribute('html', 'lang')).to.equal('en');
            expect(browser.getText('div.page-header span')).to.equal('Frequently Asked Questions');
        });

        it('it should find and navigate privacy', function () {
            browser.logger.info(browser.getUrl());
            browser.click('nav.navbar a.dropdown-toggle');
            browser.click('nav.navbar a[href="' + util.format(config.get('uris:webapp:pages'), 'en', 'privacy') + '"]');
            expect(browser.getUrl()).to.equal(webapp.privacy);
            expect(browser.getAttribute('html', 'lang')).to.equal('en');
            expect(browser.getText('div.page-header span')).to.equal('Privacy Policy');
        });

        it('it should find and navigate terms', function () {
            browser.logger.info(browser.getUrl());
            browser.click('nav.navbar a.dropdown-toggle');
            browser.click('nav.navbar a[href="' + util.format(config.get('uris:webapp:pages'), 'en', 'terms') + '"]');
            expect(browser.getUrl()).to.equal(webapp.terms);
            expect(browser.getAttribute('html', 'lang')).to.equal('en');
            expect(browser.getText('div.page-header span')).to.equal('Terms of Use');
        });

    });

});

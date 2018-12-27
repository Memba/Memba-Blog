/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, mocha: true, expr: true */
/* globals browser: false, $: false */

'use strict';

var expect = require('chai').expect;
var url = require('url');
var util = require('util');

var config = require('../../webapp/config/index.es6');
var webapp = {
    home: url.resolve(config.get('uris:webapp:root'), config.get('uris:webapp:home')),
    index: url.resolve(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:pages'), 'en', '')),
    faqs: url.resolve(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:pages'), 'en', 'faqs')),
    privacy: url.resolve(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:pages'), 'en', 'privacy')),
    terms: url.resolve(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:pages'), 'en', 'terms'))
};
var WAIT = 2000;
var SCREEN = {
    HEIGHT: 800,
    WIDTH: 1280
};

/**
 * Enhance browser with our Ex functions
 */
require('./selenium');

/**
 * We are testing, finally!
 */
describe('English pages', function () {

    // var tabId;

    before(function () {
        if (browser.capabilities.browserName === 'firefox') {
            // This prevents `No such content frame; perhaps the listener was not registered?`
            browser.pause(200);
        }
        browser.url(webapp.home);
        // tabId = browser.getCurrentTabId();
        // Note: it won't work in PhantomJS without setting the window size
        browser.setWindowSize(SCREEN.WIDTH, SCREEN.HEIGHT);
        // Find a way to reset the cache
        // browser.refresh();
    });

    describe('When navigating pages', function () {

        // Retry all tests in this suite up to 3 times
        // this.retries(3);

        beforeEach(function () {
            // browser.switchTab ensures we are running all tests on the same tab
            // especially as we have experienced extensions like Skype that open a welcome page in a new tab
            // browser.switchTab(tabId);
            // TODO browser.logger is undefined in v5
            // browser.logger.info(browser.getUrl());
        });

        it('it should land on the home page with a choice of languages', function () {
            expect($('html').getAttribute('lang')).to.equal('en');
            expect($('nav.navbar').isExisting()).to.be.true;
            expect($('div.uk.flag').isExisting()).to.be.true;
            expect($('div.fr.flag').isExisting()).to.be.true;
        });

        it('it should find and navigate support', function () {
            $('body>div.k-loading-image').waitForDisplayed(WAIT, true);
            $('nav.navbar a[href="' + util.format(config.get('uris:webapp:pages'), 'en', '') + '"]').click();
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getCurrentUrl()).to.equal(webapp.index);
            expect($('html').getAttribute('lang')).to.equal('en');
            expect($('div.page-header span').getText()).to.equal('Support');
        });

        it('it should find and navigate faqs', function () {
            $('body>div.k-loading-image').waitForDisplayed(WAIT, true);
            $('nav.navbar a.dropdown-toggle').click();
            $('nav.navbar a[href="' + util.format(config.get('uris:webapp:pages'), 'en', 'faqs') + '"]').click();
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getCurrentUrl()).to.equal(webapp.faqs);
            expect($('html').getAttribute('lang')).to.equal('en');
            expect($('div.page-header span').getText()).to.equal('Frequently Asked Questions');
        });

        it('it should find and navigate privacy', function () {
            $('body>div.k-loading-image').waitForDisplayed(WAIT, true);
            $('nav.navbar a.dropdown-toggle').click();
            $('nav.navbar a[href="' + util.format(config.get('uris:webapp:pages'), 'en', 'privacy') + '"]').click();
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getCurrentUrl()).to.equal(webapp.privacy);
            expect($('html').getAttribute('lang')).to.equal('en');
            expect($('div.page-header span').getText()).to.equal('Privacy Policy');
        });

        it('it should find and navigate terms', function () {
            $('body>div.k-loading-image').waitForDisplayed(WAIT, true);
            $('nav.navbar a.dropdown-toggle').click();
            $('nav.navbar a[href="' + util.format(config.get('uris:webapp:pages'), 'en', 'terms') + '"]').click();
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getCurrentUrl()).to.equal(webapp.terms);
            expect($('html').getAttribute('lang')).to.equal('en');
            expect($('div.page-header span').getText()).to.equal('Terms of Use');
        });

    });
});

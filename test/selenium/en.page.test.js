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

    var tabId;

    before(function () {
        if (browser.desiredCapabilities.browserName === 'firefox') {
            // This prevents `No such content frame; perhaps the listener was not registered?`
            browser.pause(200);
        }
        browser.url(webapp.home);
        tabId = browser.getCurrentTabId();
        // Note: it won't work in PhantomJS without setting the window size
        browser.windowHandleSize({ height: SCREEN.HEIGHT, width: SCREEN.WIDTH });
        // Find a way to reset the cache
        // browser.refresh();
    });

    describe('When navigating pages', function () {

        // Retry all tests in this suite up to 3 times
        this.retries(3);

        beforeEach(function () {
            // browser.switchTab ensures we are running all tests on the same tab
            // especially as we have experienced extensions like Skype that open a welcome page in a new tab
            browser.switchTab(tabId);
            browser.logger.info(browser.getUrl());
        });

        it('it should land on the home page with a choice of languages', function () {
            expect(browser.getAttribute('html', 'lang')).to.equal('en');
            expect(browser.isExisting('nav.navbar')).to.be.true;
            expect(browser.isExisting('div.uk.flag')).to.be.true;
            expect(browser.isExisting('div.fr.flag')).to.be.true;
        });

        it('it should find and navigate support', function () {
            browser.waitForVisibleEx('body>div.k-loading-image', WAIT, true);
            browser.clickEx('nav.navbar a[href="' + util.format(config.get('uris:webapp:pages'), 'en', '') + '"]');
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getUrl()).to.equal(webapp.index);
            expect(browser.getAttribute('html', 'lang')).to.equal('en');
            expect(browser.getText('div.page-header span')).to.equal('Support');
        });

        it('it should find and navigate faqs', function () {
            browser.waitForVisibleEx('body>div.k-loading-image', WAIT, true);
            browser.clickEx('nav.navbar a.dropdown-toggle');
            browser.clickEx('nav.navbar a[href="' + util.format(config.get('uris:webapp:pages'), 'en', 'faqs') + '"]');
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getUrl()).to.equal(webapp.faqs);
            expect(browser.getAttribute('html', 'lang')).to.equal('en');
            expect(browser.getText('div.page-header span')).to.equal('Frequently Asked Questions');
        });

        it('it should find and navigate privacy', function () {
            browser.waitForVisibleEx('body>div.k-loading-image', WAIT, true);
            browser.clickEx('nav.navbar a.dropdown-toggle');
            browser.clickEx('nav.navbar a[href="' + util.format(config.get('uris:webapp:pages'), 'en', 'privacy') + '"]');
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getUrl()).to.equal(webapp.privacy);
            expect(browser.getAttribute('html', 'lang')).to.equal('en');
            expect(browser.getText('div.page-header span')).to.equal('Privacy Policy');
        });

        it('it should find and navigate terms', function () {
            browser.waitForVisibleEx('body>div.k-loading-image', WAIT, true);
            browser.clickEx('nav.navbar a.dropdown-toggle');
            browser.clickEx('nav.navbar a[href="' + util.format(config.get('uris:webapp:pages'), 'en', 'terms') + '"]');
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getUrl()).to.equal(webapp.terms);
            expect(browser.getAttribute('html', 'lang')).to.equal('en');
            expect(browser.getText('div.page-header span')).to.equal('Terms of Use');
        });

    });

});

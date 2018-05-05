/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, mocha: true, expr: true */
/* globals browser: false */

'use strict';

var expect = require('chai').expect;
var url = require('url');
var util = require('util');

var config = require('../../webapp/config');
var webapp = {
    // home: url.resolve(config.get('uris:webapp:root'), config.get('uris:webapp:home')),
    index: url.resolve(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:pages'), 'fr', '')) + '/',
    faqs: url.resolve(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:pages'), 'fr', 'faqs')),
    privacy: url.resolve(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:pages'), 'fr', 'privacy')),
    terms: url.resolve(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:pages'), 'fr', 'terms'))
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
describe('French pages', function () {

    var tabId;

    before(function () {
        if (browser.desiredCapabilities.browserName === 'firefox') {
            // This prevents `No such content frame; perhaps the listener was not registered?`
            browser.pause(200);
        }
        browser.url(webapp.index);
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
            // Error: No tab modal was open when attempting to get the dialog text
            browser.pause(50);
        });

        it('it should find and navigate support', function () {
            browser.clickEx('nav.navbar a[href="' + util.format(config.get('uris:webapp:pages'), 'fr', '') + '"]');
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getUrl()).to.equal(webapp.index);
            expect(browser.getAttribute('html', 'lang')).to.equal('fr');
            expect(browser.getText('div.page-header span')).to.equal('Support');
        });

        it('it should find and navigate faqs', function () {
            browser.waitForVisibleEx('body>div.k-loading-image', WAIT, true);
            browser.clickEx('nav.navbar a.dropdown-toggle');
            browser.clickEx('nav.navbar a[href="' + util.format(config.get('uris:webapp:pages'), 'fr', 'faqs') + '"]');
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getUrl()).to.equal(webapp.faqs);
            expect(browser.getAttribute('html', 'lang')).to.equal('fr');
            expect(browser.getText('div.page-header span')).to.equal('Questions fréquentes');
        });

        it('it should find and navigate privacy', function () {
            browser.waitForVisibleEx('body>div.k-loading-image', WAIT, true);
            browser.clickEx('nav.navbar a.dropdown-toggle');
            browser.clickEx('nav.navbar a[href="' + util.format(config.get('uris:webapp:pages'), 'fr', 'privacy') + '"]');
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getUrl()).to.equal(webapp.privacy);
            expect(browser.getAttribute('html', 'lang')).to.equal('fr');
            expect(browser.getText('div.page-header span')).to.equal('Confidentialité des données');
        });

        it('it should find and navigate terms', function () {
            browser.waitForVisibleEx('body>div.k-loading-image', WAIT, true);
            browser.clickEx('nav.navbar a.dropdown-toggle');
            browser.clickEx('nav.navbar a[href="' + util.format(config.get('uris:webapp:pages'), 'fr', 'terms') + '"]');
            if (browser.desiredCapabilities.browserName === 'firefox') {
                browser.waitForReadyStateEx('loading', WAIT);
            } // else {
            // Error: No tab modal was open when attempting to get the dialog text
            browser.pause(100);
            // }
            if (browser.alertTextEx()) {
                browser.alertAcceptEx(); // browser.alertDismiss();
            }
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getUrl()).to.equal(webapp.terms);
            expect(browser.getAttribute('html', 'lang')).to.equal('fr');
            expect(browser.getText('div.page-header span')).to.equal('Conditions d\'utilisation');
        });

    });

});

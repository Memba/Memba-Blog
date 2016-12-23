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
    // home: url.join(config.get('uris:webapp:root'), config.get('uris:webapp:home')),
    index: url.join(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:pages'), 'fr', '')) + '/',
    faqs: url.join(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:pages'), 'fr', 'faqs')),
    privacy: url.join(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:pages'), 'fr', 'privacy')),
    terms: url.join(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:pages'), 'fr', 'terms'))
};
var WAIT = 2000;

/**
 * Tests that a page is loading
 * @returns {boolean}
 */
function pageLoading() {
    var readyState =  browser.execute(function () { return document.readyState }).value;
    return readyState === 'loading';
}

/**
 * Tests that a page is loaded
 * @returns {boolean}
 */
function pageComplete() {
    var readyState =  browser.execute(function () { return document.readyState }).value;
    return readyState === 'complete';
}

/**
 * browser.clickEx because browser.click raises errors
 * in Microsoft Edge: `Element is obscured` (always)
 * in internet explorer: `Cannot click on element` (often)
 * @param selector
 */
browser.clickEx = function (selector) {
    if (browser.desiredCapabilities.browserName === 'internet explorer' || browser.desiredCapabilities.browserName === 'MicrosoftEdge') {
       browser.execute(function (el) { document.querySelector(el).click(); }, selector);
    } else {
        browser.click(selector);
    }
    // Give some time for click, especially to execute animations
    browser.pause(100);
};

/**
 * browser.waitForVisibleEx because browser.waitForVisible raises:
 * In PhantomJS: Promise was rejected with the following reason: timeout (always)
 * In Firefox: element (body>div.k-loading-image) still visible after 2000ms (sometimes)
 * @param selector
 */
browser.waitForVisibleEx = function (selector, timeout, reverse) {
    if (browser.desiredCapabilities.browserName !== 'phantomjs') {
        browser.waitForVisible(selector, timeout, reverse);
        /*
         browser.waitUntil(function () {
             var visible = browser.isVisible(selector);
             var element = browser.element(selector);
             browser.logger.info('------------------> browser: ' + browser.desiredCapabilities.browserName +
                 ', display: ' + element.getCssProperty('display').value +
                 ', opacity: ' + element.getCssProperty('opacity').value +
                 ', visible: ' + visible);
             return reverse ? !visible : visible;
         }, timeout, 'waitUntil timeout', Math.floor(timeout / 5));
         */
    }
};

/**
 * browser.alertTextEx because
 * 1) phantomjs does not have alerts
 * 2) browser.alertText fails on Microsoft Edge
 */
browser.alertTextEx = function (text) {
    return (browser.desiredCapabilities.browserName === 'phantomjs') ||
        (browser.desiredCapabilities.browserName === 'MicrosoftEdge') ||
        browser.alertText(text);
};

/**
 * browser.alertAcceptEx because
 * 1) phantomjs does not have alerts
 */
browser.alertAcceptEx = function () {
    if (browser.desiredCapabilities.browserName !== 'phantomjs') {
        return browser.alertAccept();
    }
};

/**
 * We are testing, finally!
 */
describe('French pages', function () {

    var tabId;

    before(function () {
        if (browser.desiredCapabilities.browserName === 'firefox') {
            // This prevents `No such content frame; perhaps the listener was not registered?`
            browser.pause(100);
        }
        browser.url(webapp.index);
        tabId = browser.getCurrentTabId();
        // Note: it won't work in PhantomJS without setting the window size
        browser.windowHandleSize({ width: 1280, height: 800 });
    });

    describe('When navigating pages', function () {

        this.retries(2);

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
            browser.waitUntil(pageComplete, WAIT);
            expect(browser.getUrl()).to.equal(webapp.index);
            expect(browser.getAttribute('html', 'lang')).to.equal('fr');
            expect(browser.getText('div.page-header span')).to.equal('Support');
        });

        it('it should find and navigate faqs', function () {
            browser.waitForVisibleEx('body>div.k-loading-image', WAIT, true);
            browser.clickEx('nav.navbar a.dropdown-toggle');
            browser.clickEx('nav.navbar a[href="' + util.format(config.get('uris:webapp:pages'), 'fr', 'faqs') + '"]');
            browser.waitUntil(pageComplete, WAIT);
            expect(browser.getUrl()).to.equal(webapp.faqs);
            expect(browser.getAttribute('html', 'lang')).to.equal('fr');
            expect(browser.getText('div.page-header span')).to.equal('Questions fréquentes');
        });

        it('it should find and navigate privacy', function () {
            browser.waitForVisibleEx('body>div.k-loading-image', WAIT, true);
            browser.clickEx('nav.navbar a.dropdown-toggle');
            browser.clickEx('nav.navbar a[href="' + util.format(config.get('uris:webapp:pages'), 'fr', 'privacy') + '"]');
            browser.waitUntil(pageComplete, WAIT);
            expect(browser.getUrl()).to.equal(webapp.privacy);
            expect(browser.getAttribute('html', 'lang')).to.equal('fr');
            expect(browser.getText('div.page-header span')).to.equal('Confidentialité des données');
        });

        it('it should find and navigate terms', function () {
            browser.waitForVisibleEx('body>div.k-loading-image', WAIT, true);
            browser.clickEx('nav.navbar a.dropdown-toggle');
            browser.clickEx('nav.navbar a[href="' + util.format(config.get('uris:webapp:pages'), 'fr', 'terms') + '"]');
            if (browser.desiredCapabilities.browserName === 'firefox') {
                browser.waitUntil(pageLoading, WAIT);
            } // else {
            // Error: No tab modal was open when attempting to get the dialog text
                browser.pause(100);
            // }
            if (browser.alertTextEx()) {
                browser.alertAcceptEx(); // browser.alertDismiss();
            }
            browser.waitUntil(pageComplete, WAIT);
            expect(browser.getUrl()).to.equal(webapp.terms);
            expect(browser.getAttribute('html', 'lang')).to.equal('fr');
            expect(browser.getText('div.page-header span')).to.equal('Conditions d\'utilisation');
        });

    });

});

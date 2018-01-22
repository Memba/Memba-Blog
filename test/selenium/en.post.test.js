/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, mocha: true, expr: true */
/* globals browser: false */

'use strict';

var expect = require('chai').expect;
var util = require('util');

var config = require('../../webapp/config');
var url = require('../../webapp/lib/url');
var LOCALE = 'en';
var LIST_TITLE = 'Search results';
var FIRST_YEAR = '2015';
var FIRST_MONTH = '05';
var FIRST_FILE = 'first-post';
var FIRST_TITLE = 'My first blog post';
// Links in the navbar are in the form /en/posts instead of http://www.memba.com/en/posts
var posts = util.format(config.get('uris:webapp:posts'), LOCALE, '', '', '').replace(/[\/]+/g, '/').replace(/\/$/, '');
var webapp = {
    home: url.join(config.get('uris:webapp:root'), config.get('uris:webapp:home')),
    locale: url.join(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:locale'), LOCALE)),
    posts: url.join(config.get('uris:webapp:root'), posts),
    calendar: url.join(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:posts'), LOCALE, FIRST_YEAR, FIRST_MONTH, '').replace(/[\/]+/g, '/').replace(/\/$/, '')) + '/',
    categories: url.join(config.get('uris:webapp:root'), posts) + '/?category=Students',
    author: url.join(config.get('uris:webapp:root'), posts) + '/?author=jlchereau',
    first: url.join(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:posts'), LOCALE, FIRST_YEAR, FIRST_MONTH, FIRST_FILE))
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
 * Now testing
 */
describe('English posts', function () {

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
            expect(browser.getAttribute('html', 'lang')).to.equal(LOCALE);
            expect(browser.isExisting('nav.navbar')).to.be.true;
            expect(browser.isExisting('div.uk.flag')).to.be.true;
            expect(browser.isExisting('div.fr.flag')).to.be.true;
        });

        it('it should find and navigate blog', function () {
            browser.waitForVisibleEx('body>div.k-loading-image', WAIT, true);
            // browser.clickEx('nav.navbar a[href="' + webapp.posts + '"]');
            browser.clickEx('nav.navbar a[href="' + posts + '"]');
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getUrl()).to.equal(webapp.posts);
            expect(browser.getAttribute('html', 'lang')).to.equal(LOCALE);
            expect(browser.getText('div.page-header span')).to.equal(LIST_TITLE);
        });

        it('it should find and navigate calendar', function () {
            browser.waitForVisibleEx('body>div.k-loading-image', WAIT, true);
            browser.clickEx('section.group:nth-child(1) a.list-group-item:first-child');
            browser.waitForReadyStateEx('complete', WAIT);
            // click the first item in the calendar side list
            expect(browser.getUrl()).to.equal(webapp.calendar);
            expect(browser.getAttribute('html', 'lang')).to.equal(LOCALE);
            expect(browser.getText('div.page-header span')).to.equal(LIST_TITLE);
        });

        it('it should find and navigate categories', function () {
            browser.waitForVisibleEx('body>div.k-loading-image', WAIT, true);
            // click the first item in the categories side list
            browser.clickEx('section.group:nth-child(2) a.list-group-item:first-child');
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getUrl()).to.equal(webapp.categories);
            expect(browser.getAttribute('html', 'lang')).to.equal(LOCALE);
            expect(browser.getText('div.page-header span')).to.equal(LIST_TITLE);
        });

        it('it should find and navigate authors', function () {
            browser.waitForVisibleEx('body>div.k-loading-image', WAIT, true);
            // click the first item in the authors side list
            browser.clickEx('section.group:nth-child(3) a.list-group-item:first-child');
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getUrl()).to.equal(webapp.author);
            expect(browser.getAttribute('html', 'lang')).to.equal(LOCALE);
            expect(browser.getText('div.page-header span')).to.equal(LIST_TITLE);
        });

        it('it should display a post', function () {
            browser.waitForVisibleEx('body>div.k-loading-image', WAIT, true);
            // Click the first item in search results
            // browser.clickEx('ul.media-list>li.media:first-child h4>a');
            browser.clickEx('li.media:first-child h4>a');
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getUrl()).to.equal(webapp.first);
            expect(browser.getAttribute('html', 'lang')).to.equal(LOCALE);
            expect(browser.getText('div.page-header span')).to.equal(FIRST_TITLE);
        });

    });

});

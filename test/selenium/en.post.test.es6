/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* globals browser: false, $: false */
/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const { URL } = require('url');
const { format } = require('util');
const logger = require('@wdio/logger').default('en.post.test');
const config = require('../../webapp/config/index.es6');

// Enhance browser with our Ex functions
require('./_misc/selenium.util.es6');

const LOCALE = 'en';
const LIST_TITLE = 'Search results';
const FIRST_YEAR = '2015';
const FIRST_MONTH = '05';
const FIRST_FILE = 'first-post';
const FIRST_TITLE = 'My first blog post';
// Links in the navbar are in the form /en/posts instead of https://www.memba.com/en/posts
const posts = format(config.get('uris:webapp:posts'), LOCALE, '', '', '')
    .replace(/[/]+/g, '/')
    .replace(/\/$/, '');
const webapp = {
    home: new URL(
        config.get('uris:webapp:home'),
        config.get('uris:webapp:root')
    ).href,
    locale: new URL(
        format(config.get('uris:webapp:locale'), LOCALE),
        config.get('uris:webapp:root')
    ).href,
    posts: new URL(posts, config.get('uris:webapp:root')).href,
    calendar: `${
        new URL(
            format(
                config.get('uris:webapp:posts'),
                LOCALE,
                FIRST_YEAR,
                FIRST_MONTH,
                ''
            )
                .replace(/[/]+/g, '/')
                .replace(/\/$/, ''),
            config.get('uris:webapp:root')
        ).href
    }/`,
    categories: `${
        new URL(posts, config.get('uris:webapp:root')).href
    }/?category=Students`,
    author: `${
        new URL(posts, config.get('uris:webapp:root')).href
    }/?author=jlchereau`,
    first: new URL(
        format(
            config.get('uris:webapp:posts'),
            LOCALE,
            FIRST_YEAR,
            FIRST_MONTH,
            FIRST_FILE
        ),
        config.get('uris:webapp:root')
    ).href
};
const WAIT = 2000;
const SCREEN = {
    HEIGHT: 800,
    WIDTH: 1280
};

/**
 * Test suite
 */
describe('English posts', () => {
    // var tabId;

    before(() => {
        /*
        if (browser.capabilities.browserName === 'firefox') {
            // This prevents `No such content frame; perhaps the listener was not registered?`
            browser.pause(200);
        }
        */

        browser.url(webapp.home);

        // tabId = browser.getCurrentTabId();

        // Note: it won't work in PhantomJS without setting the window size
        browser.setWindowSizeEx(SCREEN.WIDTH, SCREEN.HEIGHT);

        // Find a way to reset the cache
        // browser.refresh();
    });

    describe('When navigating pages', () => {
        // Retry all tests in this suite up to 3 times
        // this.retries(3);

        beforeEach(() => {
            // browser.switchTab ensures we are running all tests on the same tab
            // especially as we have experienced extensions like Skype that open a welcome page in a new tab
            // browser.switchTab(tabId);

            logger.info(browser.getUrl());
        });

        it('it should land on the home page with a choice of languages', () => {
            expect($('html').getAttribute('lang')).to.equal(LOCALE);
            expect($('nav.navbar').isExisting()).to.be.true;
            expect($('div.app-uk.app-flag').isExisting()).to.be.true;
            expect($('div.app-fr.app-flag').isExisting()).to.be.true;
        });

        it('it should find and navigate blog', () => {
            $('body>div.k-loading-image').waitForDisplayed(WAIT, true);
            $(`nav.navbar a[href="${posts}"]`).click();
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getUrl()).to.equal(webapp.posts);
            expect($('html').getAttribute('lang')).to.equal(LOCALE);
            expect($('div#id-main-title span').getText()).to.equal(LIST_TITLE);
        });

        it('it should find and navigate calendar', () => {
            $('body>div.k-loading-image').waitForDisplayed(WAIT, true);
            // click the first item in the calendar side list
            $(
                'section.app-group:nth-child(1) a.list-group-item:first-child'
            ).click();
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getUrl()).to.equal(webapp.calendar);
            expect($('html').getAttribute('lang')).to.equal(LOCALE);
            expect($('div#id-main-title span').getText()).to.equal(LIST_TITLE);
        });

        it('it should find and navigate categories', () => {
            $('body>div.k-loading-image').waitForDisplayed(WAIT, true);
            // click the first item in the categories side list
            $(
                'section.app-group:nth-child(2) a.list-group-item:first-child'
            ).click();
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getUrl()).to.equal(webapp.categories);
            expect($('html').getAttribute('lang')).to.equal(LOCALE);
            expect($('div#id-main-title span').getText()).to.equal(LIST_TITLE);
        });

        it('it should find and navigate authors', () => {
            $('body>div.k-loading-image').waitForDisplayed(WAIT, true);
            // click the first item in the authors side list
            $(
                'section.app-group:nth-child(3) a.list-group-item:first-child'
            ).click();
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getUrl()).to.equal(webapp.author);
            expect($('html').getAttribute('lang')).to.equal(LOCALE);
            expect($('div#id-main-title span').getText()).to.equal(LIST_TITLE);
        });

        it('it should display a post', () => {
            $('body>div.k-loading-image').waitForDisplayed(WAIT, true);
            // Click the first item in search results
            // $('ul.media-list>li.media:first-child h4>a').click();
            $('li.media:first-child h5>a').click();
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getUrl()).to.equal(webapp.first);
            expect($('html').getAttribute('lang')).to.equal(LOCALE);
            expect($('div#id-main-title span').getText()).to.equal(FIRST_TITLE);
        });
    });
});

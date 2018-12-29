/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* globals browser: false, $: false */
/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
// eslint-disable-next-line node/no-unsupported-features/node-builtins
const { URL } = require('url');
const { format } = require('util');
const logger = require('@wdio/logger').default('en.page.test');
const config = require('../../webapp/config/index.es6');

// Enhance browser with our Ex functions
require('./selenium.es6');

const webapp = {
    home: new URL(
        config.get('uris:webapp:home'),
        config.get('uris:webapp:root')
    ).href,
    index: new URL(
        format(config.get('uris:webapp:pages'), 'en', ''),
        config.get('uris:webapp:root')
    ).href,
    faqs: new URL(
        format(config.get('uris:webapp:pages'), 'en', 'faqs'),
        config.get('uris:webapp:root')
    ).href,
    privacy: new URL(
        format(config.get('uris:webapp:pages'), 'en', 'privacy'),
        config.get('uris:webapp:root')
    ).href,
    terms: new URL(
        format(config.get('uris:webapp:pages'), 'en', 'terms'),
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
describe('English pages', () => {
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
            expect($('html').getAttribute('lang')).to.equal('en');
            expect($('nav.navbar').isExisting()).to.be.true;
            expect($('div.uk.flag').isExisting()).to.be.true;
            expect($('div.fr.flag').isExisting()).to.be.true;
        });

        it('it should find and navigate support', () => {
            $('body>div.k-loading-image').waitForDisplayed(WAIT, true);
            $(
                `nav.navbar a[href="${format(
                    config.get('uris:webapp:pages'),
                    'en',
                    ''
                )}"]`
            ).click();
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getUrl()).to.equal(webapp.index);
            expect($('html').getAttribute('lang')).to.equal('en');
            expect($('div.page-header span').getText()).to.equal('Support');
        });

        it('it should find and navigate faqs', () => {
            $('body>div.k-loading-image').waitForDisplayed(WAIT, true);
            $('nav.navbar a.dropdown-toggle').click();
            $(
                `nav.navbar a[href="${format(
                    config.get('uris:webapp:pages'),
                    'en',
                    'faqs'
                )}"]`
            ).click();
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getUrl()).to.equal(webapp.faqs);
            expect($('html').getAttribute('lang')).to.equal('en');
            expect($('div.page-header span').getText()).to.equal(
                'Frequently Asked Questions'
            );
        });

        it('it should find and navigate privacy', () => {
            $('body>div.k-loading-image').waitForDisplayed(WAIT, true);
            $('nav.navbar a.dropdown-toggle').click();
            $(
                `nav.navbar a[href="${format(
                    config.get('uris:webapp:pages'),
                    'en',
                    'privacy'
                )}"]`
            ).click();
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getUrl()).to.equal(webapp.privacy);
            expect($('html').getAttribute('lang')).to.equal('en');
            expect($('div.page-header span').getText()).to.equal(
                'Privacy Policy'
            );
        });

        it('it should find and navigate terms', () => {
            $('body>div.k-loading-image').waitForDisplayed(WAIT, true);
            $('nav.navbar a.dropdown-toggle').click();
            $(
                `nav.navbar a[href="${format(
                    config.get('uris:webapp:pages'),
                    'en',
                    'terms'
                )}"]`
            ).click();
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getUrl()).to.equal(webapp.terms);
            expect($('html').getAttribute('lang')).to.equal('en');
            expect($('div.page-header span').getText()).to.equal(
                'Terms of Use'
            );
        });
    });
});

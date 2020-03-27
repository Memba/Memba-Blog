/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* globals browser: false, $: false */
/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const { URL } = require('url');
const { format } = require('util');
const logger = require('@wdio/logger').default('fr.page.test');
const config = require('../../webapp/config/index.es6');

const webapp = {
    // home: new URL(config.get('uris:webapp:home'), config.get('uris:webapp:root')).href,
    index: new URL(
        format(config.get('uris:webapp:pages'), 'fr', ''),
        config.get('uris:webapp:root')
    ).href,
    faqs: new URL(
        format(config.get('uris:webapp:pages'), 'fr', 'faqs'),
        config.get('uris:webapp:root')
    ).href,
    privacy: new URL(
        format(config.get('uris:webapp:pages'), 'fr', 'privacy'),
        config.get('uris:webapp:root')
    ).href,
    terms: new URL(
        format(config.get('uris:webapp:pages'), 'fr', 'terms'),
        config.get('uris:webapp:root')
    ).href,
};
const WAIT = 2000;
const SCREEN = {
    HEIGHT: 800,
    WIDTH: 1280,
};

/**
 * Test suite
 */
describe('French pages', () => {
    // var tabId;

    before(() => {
        /*
        if (browser.capabilities.browserName === 'firefox') {
            // This prevents `No such content frame; perhaps the listener was not registered?`
            browser.pause(200);
        }
        */

        browser.url(webapp.index);

        // tabId = browser.getCurrentTabId();

        // Note: it won't work in PhantomJS without setting the window size
        browser.setWindowSizeEx(SCREEN.WIDTH, SCREEN.HEIGHT);
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

        it('it should find and navigate support', () => {
            $('body>div.k-loading-image').waitForDisplayed({
                timeout: WAIT,
                reverse: true,
            });
            $(
                `nav.navbar a[href="${format(
                    config.get('uris:webapp:pages'),
                    'fr',
                    ''
                )}"]`
            ).click();
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getUrl()).to.equal(webapp.index);
            expect($('html').getAttribute('lang')).to.equal('fr');
            expect($('div#id-main-title span').getText()).to.equal('Support');
        });

        it('it should find and navigate faqs', () => {
            $('body>div.k-loading-image').waitForDisplayed({
                timeout: WAIT,
                reverse: true,
            });
            $('nav.navbar a.dropdown-toggle').click();
            $(
                `nav.navbar a[href="${format(
                    config.get('uris:webapp:pages'),
                    'fr',
                    'faqs'
                )}"]`
            ).click();
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getUrl()).to.equal(webapp.faqs);
            expect($('html').getAttribute('lang')).to.equal('fr');
            expect($('div#id-main-title span').getText()).to.equal(
                'Questions fréquentes'
            );
        });

        it('it should find and navigate privacy', () => {
            $('body>div.k-loading-image').waitForDisplayed({
                timeout: WAIT,
                reverse: true,
            });
            $('nav.navbar a.dropdown-toggle').click();
            $(
                `nav.navbar a[href="${format(
                    config.get('uris:webapp:pages'),
                    'fr',
                    'privacy'
                )}"]`
            ).click();
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getUrl()).to.equal(webapp.privacy);
            expect($('html').getAttribute('lang')).to.equal('fr');
            expect($('div#id-main-title span').getText()).to.equal(
                'Confidentialité des données'
            );
        });

        it('it should find and navigate terms', () => {
            $('body>div.k-loading-image').waitForDisplayed({
                timeout: WAIT,
                reverse: true,
            });
            $('nav.navbar a.dropdown-toggle').click();
            $(
                `nav.navbar a[href="${format(
                    config.get('uris:webapp:pages'),
                    'fr',
                    'terms'
                )}"]`
            ).click();
            // if (browser.capabilities.browserName === 'firefox') {
            // browser.waitForReadyStateEx('loading', WAIT);
            // } // else {
            // Error: No tab modal was open when attempting to get the dialog text
            browser.pause(100);
            // }
            if (browser.getAlertText()) {
                browser.acceptAlert(); // browser.dismissAlert();
            }
            browser.waitForReadyStateEx('complete', WAIT);
            expect(browser.getUrl()).to.equal(webapp.terms);
            expect($('html').getAttribute('lang')).to.equal('fr');
            expect($('div#id-main-title span').getText()).to.equal(
                "Conditions d'utilisation"
            );
        });
    });
});

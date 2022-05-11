/**
 * Copyright (c) 2013-2021 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* globals browser: false, $: false */
/* eslint-disable no-unused-expressions */

const { expect } = require('expect');
const { URL } = require('url');
const { format } = require('util');
const logger = require('@wdio/logger').default('fr.page.test');
const config = require('../../webapp/config/index.es6');

const LOCALE = 'fr';
const FAQS_TITLE = 'Questions fréquentes';
const PRIVACY_TITLE = 'Confidentialité des données';
const SUPPORT_TITLE = 'Support';
const TERMS_TITLE = "Conditions d'utilisation";
const webapp = {
    // home: new URL(config.get('uris:webapp:home'), config.get('uris:webapp:root')).href,
    index: new URL(
        format(config.get('uris:webapp:pages'), LOCALE, ''),
        config.get('uris:webapp:root')
    ).href,
    faqs: new URL(
        format(config.get('uris:webapp:pages'), LOCALE, 'faqs'),
        config.get('uris:webapp:root')
    ).href,
    privacy: new URL(
        format(config.get('uris:webapp:pages'), LOCALE, 'privacy'),
        config.get('uris:webapp:root')
    ).href,
    terms: new URL(
        format(config.get('uris:webapp:pages'), LOCALE, 'terms'),
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

    before(async () => {
        /*
        if (browser.capabilities.browserName === 'firefox') {
            // This prevents `No such content frame; perhaps the listener was not registered?`
            browser.pause(200);
        }
        */

        await browser.url(webapp.index);

        // tabId = browser.getCurrentTabId();

        // Note: it won't work in PhantomJS without setting the window size
        await browser.setWindowSizeEx(SCREEN.WIDTH, SCREEN.HEIGHT);
    });

    describe('When navigating pages', () => {
        // Retry all tests in this suite up to 3 times
        // this.retries(3);

        beforeEach(async () => {
            // browser.switchTab ensures we are running all tests on the same tab
            // especially as we have experienced extensions like Skype that open a welcome page in a new tab
            // browser.switchTab(tabId);

            const url = await browser.getUrl();
            logger.info(url);
        });

        it('it should find and navigate support', async () => {
            const loading = await $('body>div.k-loading-image');
            await loading.waitForDisplayed({
                timeout: WAIT,
                reverse: true,
            });
            const support = await $(
                `.k-appbar-section a[href="${format(
                    config.get('uris:webapp:pages'),
                    LOCALE,
                    ''
                )}"]`
            );
            await support.click();
            await browser.waitForReadyStateEx('complete', WAIT);
            await expect(browser).toHaveUrl(webapp.index);
            await expect($('html')).toHaveAttribute('lang', LOCALE);
            await expect($('div#id-main-title span')).toHaveText(SUPPORT_TITLE);
        });

        it('it should find and navigate faqs', async () => {
            const loading = await $('body>div.k-loading-image');
            await loading.waitForDisplayed({
                timeout: WAIT,
                reverse: true,
            });
            const more = await $('.k-appbar-section .k-menu-item.k-last');
            await more.moveTo();
            const menu = await $(
                `.k-appbar-section .k-animation-container a[href="${format(
                    config.get('uris:webapp:pages'),
                    LOCALE,
                    'faqs'
                )}"]`
            );
            await menu.click();
            await browser.waitForReadyStateEx('complete', WAIT);
            await expect(browser).toHaveUrl(webapp.faqs);
            await expect($('html')).toHaveAttribute('lang', LOCALE);
            await expect($('div#id-main-title span')).toHaveText(FAQS_TITLE);
        });

        it('it should find and navigate privacy', async () => {
            const loading = await $('body>div.k-loading-image');
            await loading.waitForDisplayed({
                timeout: WAIT,
                reverse: true,
            });
            const more = await $('.k-appbar-section .k-menu-item.k-last');
            await more.moveTo();
            const menu = await $(
                `.k-appbar-section .k-animation-container a[href="${format(
                    config.get('uris:webapp:pages'),
                    LOCALE,
                    'privacy'
                )}"]`
            );
            await menu.click();
            await browser.waitForReadyStateEx('complete', WAIT);
            await expect(browser).toHaveUrl(webapp.privacy);
            await expect($('html')).toHaveAttribute('lang', LOCALE);
            await expect($('div#id-main-title span')).toHaveText(PRIVACY_TITLE);
        });

        it('it should find and navigate terms', async () => {
            const loading = await $('body>div.k-loading-image');
            await loading.waitForDisplayed({
                timeout: WAIT,
                reverse: true,
            });
            const more = await $('.k-appbar-section .k-menu-item.k-last');
            await more.moveTo();
            const menu = await $(
                `.k-appbar-section .k-animation-container a[href="${format(
                    config.get('uris:webapp:pages'),
                    LOCALE,
                    'terms'
                )}"]`
            );
            await menu.click();
            // if (browser.capabilities.browserName === 'firefox') {
            // browser.waitForReadyStateEx('loading', WAIT);
            // } // else {
            // Error: No tab modal was open when attempting to get the dialog text
            await browser.pause(100);
            // }
            if (browser.getAlertText()) {
                await browser.acceptAlert(); // browser.dismissAlert();
            }
            await browser.waitForReadyStateEx('complete', WAIT);
            await expect(browser).toHaveUrl(webapp.terms);
            await expect($('html')).toHaveAttribute('lang', LOCALE);
            await expect($('div#id-main-title span')).toHaveText(TERMS_TITLE);
        });
    });
});

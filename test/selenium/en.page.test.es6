/**
 * Copyright (c) 2013-2021 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* globals browser: false, $: false */
/* eslint-disable no-unused-expressions */

const expect = require('expect');
const { URL } = require('url');
const { format } = require('util');
const logger = require('@wdio/logger').default('en.page.test');
const config = require('../../webapp/config/index.es6');

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
describe('English pages', () => {
    // var tabId;

    before(async () => {
        /*
        if (browser.capabilities.browserName === 'firefox') {
            // This prevents `No such content frame; perhaps the listener was not registered?`
            browser.pause(200);
        }
        */

        await browser.url(webapp.home);

        // tabId = browser.getCurrentTabId();

        // Note: it won't work in PhantomJS without setting the window size
        await browser.setWindowSize(SCREEN.WIDTH, SCREEN.HEIGHT);

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

        it('it should land on the home page with a choice of languages', async () => {
            await expect($('html')).toHaveAttribute('lang', 'en');
            await expect($('.k-appbar')).toExist();
            await expect($('div.app-uk.app-flag')).toExist();
            await expect($('div.app-fr.app-flag')).toExist();
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
                    'en',
                    ''
                )}"]`
            );
            await support.click();
            await browser.waitForReadyStateEx('complete', WAIT);
            await expect(browser).toHaveUrl(webapp.index);
            await expect($('html')).toHaveAttribute('lang', 'en');
            await expect($('div#id-main-title span')).toHaveText('Support');
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
                    'en',
                    'faqs'
                )}"]`
            );
            await menu.click();
            await browser.waitForReadyStateEx('complete', WAIT);
            await expect(browser).toHaveUrl(webapp.faqs);
            await expect($('html')).toHaveAttribute('lang', 'en');
            await expect($('div#id-main-title span')).toHaveText(
                'Frequently Asked Questions'
            );
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
                    'en',
                    'privacy'
                )}"]`
            );
            await menu.click();
            await browser.waitForReadyStateEx('complete', WAIT);
            await expect(browser).toHaveUrl(webapp.privacy);
            await expect($('html')).toHaveAttribute('lang', 'en');
            await expect($('div#id-main-title span')).toHaveText(
                'Privacy Policy'
            );
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
                    'en',
                    'terms'
                )}"]`
            );
            await menu.click();
            await browser.waitForReadyStateEx('complete', WAIT);
            await expect(browser).toHaveUrl(webapp.terms);
            await expect($('html')).toHaveAttribute('lang', 'en');
            await expect($('div#id-main-title span')).toHaveText(
                'Terms of Use'
            );
        });
    });
});

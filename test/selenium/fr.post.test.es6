/**
 * Copyright (c) 2013-2021 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* globals browser: false, $: false */
/* eslint-disable no-unused-expressions */

const expect = require('expect');
const { URL } = require('url');
const { format } = require('util');
const logger = require('@wdio/logger').default('fr.post.test');
const config = require('../../webapp/config/index.es6');

const LOCALE = 'fr';
const SUPPORT_TITLE = 'Support';
const LIST_TITLE = 'Résultats de recherche';
const FIRST_YEAR = '2015';
const FIRST_MONTH = '05';
const FIRST_FILE = 'premier-post';
const FIRST_TITLE = 'Memba';
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
    }/?category=Miscellaneous`,
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
describe('French posts', () => {
    // var tabId;

    before(async () => {
        /*
        if (browser.capabilities.browserName === 'firefox') {
            // This prevents `No such content frame; perhaps the listener was not registered?`
            browser.pause(200);
        }
        */

        // browser.url(webapp.home);
        await browser.url(webapp.locale);

        // tabId = browser.getCurrentTabId();

        // Note: it won't work in PhantomJS without setting the window size
        await browser.setWindowSizeEx(SCREEN.WIDTH, SCREEN.HEIGHT);

        // Find a way to reset the cache
        // browser.refresh();
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

        it('it should land on the localized support page', async () => {
            await expect($('html')).toHaveAttribute('lang', LOCALE);
            await expect($('.k-appbar')).toExist();
            await expect($('div#id-main-title span')).toHaveText(SUPPORT_TITLE);
        });

        it('it should find and navigate blog', async () => {
            const loading = await $('body>div.k-loading-image');
            await loading.waitForDisplayed({
                timeout: WAIT,
                reverse: true,
            });
            // $(`nav.navbar a[href="${posts}"]`).click();
            const item = await $(`.k-appbar-section a[href="${posts}"]`);
            await item.click();
            await browser.waitForReadyStateEx('complete', WAIT);
            await expect(browser).toHaveUrl(webapp.posts);
            await expect($('html')).toHaveAttribute('lang', LOCALE);
            await expect($('div#id-main-title span')).toHaveText(LIST_TITLE);
        });

        it('it should find and navigate calendar', async () => {
            const loading = await $('body>div.k-loading-image');
            await loading.waitForDisplayed({
                timeout: WAIT,
                reverse: true,
            });
            // click the first item in the calendar side list
            const item = await $(
                'section.app-group:nth-child(1) a.k-link:first-child'
            );
            await item.click();
            await browser.waitForReadyStateEx('complete', WAIT);
            await expect(browser).toHaveUrl(webapp.calendar);
            await expect($('html')).toHaveAttribute('lang', LOCALE);
            await expect($('div#id-main-title span')).toHaveText(LIST_TITLE);
        });

        it('it should find and navigate categories', async () => {
            const loading = await $('body>div.k-loading-image');
            await loading.waitForDisplayed({
                timeout: WAIT,
                reverse: true,
            });
            // click the first item in the categories side list
            const item = await $(
                'section.app-group:nth-child(2) a.k-link:first-child'
            );
            await item.click();
            await browser.waitForReadyStateEx('complete', WAIT);
            await expect(browser).toHaveUrl(webapp.categories);
            await expect($('html')).toHaveAttribute('lang', LOCALE);
            await expect($('div#id-main-title span')).toHaveText(LIST_TITLE);
        });

        it('it should find and navigate authors', async () => {
            const loading = await $('body>div.k-loading-image');
            await loading.waitForDisplayed({
                timeout: WAIT,
                reverse: true,
            });
            // click the first item in the authors side list
            const item = await $(
                'section.app-group:nth-child(3) a.k-link:first-child'
            );
            await item.click();
            await browser.waitForReadyStateEx('complete', WAIT);
            await expect(browser).toHaveUrl(webapp.author);
            await expect($('html')).toHaveAttribute('lang', LOCALE);
            await expect($('div#id-main-title span')).toHaveText(LIST_TITLE);
        });

        it('it should display a post', async () => {
            const loading = await $('body>div.k-loading-image');
            await loading.waitForDisplayed({
                timeout: WAIT,
                reverse: true,
            });
            // Click the first item in search results
            // $('li.media:first-child h5>a').click();
            const item = await $('div.col-12 div.d-flex:first-child h5>a');
            await item.click();
            await browser.waitForReadyStateEx('complete', WAIT);
            await expect(browser).toHaveUrl(webapp.first);
            await expect($('html')).toHaveAttribute('lang', LOCALE);
            await expect($('div#id-main-title span')).toHaveText(FIRST_TITLE);
        });
    });
});

/**
 * Copyright (c) 2013-2021 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* globals browser: false, window: false */
/* eslint-disable no-unused-expressions */

// const { expect } = require('chai');
const { URL } = require('url');
const { format } = require('util');
const logger = require('@wdio/logger').default('gremlins.test');
const config = require('../../webapp/config/index.es6');

const webapp = {
    home: new URL(
        config.get('uris:webapp:home'),
        config.get('uris:webapp:root')
    ).href,
    fr: new URL(
        format(config.get('uris:webapp:locale'), 'fr'),
        config.get('uris:webapp:root')
    ).href,
    en: new URL(
        format(config.get('uris:webapp:locale'), 'en'),
        config.get('uris:webapp:root')
    ).href,
};
const WAIT = 5000;
const MOCHA_TO = 60000;
const GREMLINS_TTL = 50000;
const SCREEN = {
    HEIGHT: 800,
    WIDTH: 1280,
};

/**
 * For more information about monkey testing, selenium and gremlins
 * Check https://medium.com/@jlchereau/automate-monkey-testing-with-selenium-webdriver-io-and-mocha-337ea935e308
 */

/**
 * Unleash our gremlins
 * @param ttl
 * @param callback
 */
function unleashGremlins(ttl, callback) {
    // Note: This is executed in the browser context
    const horde = window.gremlins.createHorde();
    function stop() {
        horde.stop();
        callback();
    }
    // A seed makes the attack repeatable, otherwise each execution is random
    horde.seed(1234);
    // Horde.after calls callback after executing all strategies
    // The callback won't be called if operations are interrupted with horde.stop
    horde.after(callback);
    // Therefore call stop when gremlins trigger navigation to another page
    window.onbeforeunload = stop;
    // Also call stop before the mocha timeout
    setTimeout(stop, ttl);
    // Unleash our gremlins
    horde.unleash();
    // Any error will be caught and fail the test
    // throw new Error('Oops');
}

/**
 * Test suite
 */
xdescribe('Monkey testing with gremlins', () => {
    // let tabId;

    before(async () => {
        /*
        if (browser.desiredCapabilities.browserName === 'firefox') {
            // This prevents `No such content frame; perhaps the listener was not registered?`
            browser.pause(200);
        }
        */

        await browser.url(webapp.home);

        // tabId = browser.getCurrentTabId();

        // Note: it won't work in PhantomJS without setting the window size
        await browser.setWindowSizeEx(SCREEN.WIDTH, SCREEN.HEIGHT);

        // Find a way to reset the cache
        // browser.refresh();
    });

    describe('Unleashing the horde', () => {
        // Retry all tests in this suite up to 3 times
        // this.retries(3);

        beforeEach(async () => {
            // browser.switchTab ensures we are running all tests on the same tab
            // especially as we have experienced extensions like Skype that open a welcome page in a new tab
            // browser.switchTab(tabId);

            const url = await browser.getUrl();
            logger.info(url);
        });

        it('it should not raise any error on the home page', async () => {
            await browser.url(webapp.home);
            await browser.waitForReadyStateEx('complete', WAIT);
            // Now load our gremlins
            // Note: Mime type error when loading from https://raw.githubusercontent.com/marmelab/gremlins.js/master/gremlins.min.js
            // Note: Timeout when loading from https://rawgit.com/marmelab/gremlins.js/master/gremlins.min.js
            // So we need to load locally
            await browser.setTimeout({ script: WAIT });
            await browser.loadScriptEx('./build/gremlins.min.js');
            logger.info('Gremlins loaded');
            // browser.pause(500);
            // And Unleash them
            await browser.setTimeout({ script: MOCHA_TO });
            await browser.executeAsync(unleashGremlins, GREMLINS_TTL);
        });

        it('it should not raise any error on the /en page', async () => {
            await browser.url(webapp.en);
            await browser.waitForReadyStateEx('complete', WAIT);
            // Now load our gremlins
            await browser.setTimeout({ script: WAIT });
            await browser.loadScriptEx('./build/gremlins.min.js');
            logger.info('Gremlins loaded');
            // browser.pause(500);
            // And Unleash them
            await browser.setTimeout({ script: MOCHA_TO });
            await browser.executeAsync(unleashGremlins, GREMLINS_TTL);
        });

        it('it should not raise any error on the /fr page', async () => {
            await browser.url(webapp.fr);
            await browser.waitForReadyStateEx('complete', WAIT);
            // Now load our gremlins
            await browser.setTimeout({ script: WAIT });
            await browser.loadScriptEx('./build/gremlins.min.js');
            logger.info('Gremlins loaded');
            // browser.pause(500);
            // And Unleash them
            await browser.setTimeout({ script: MOCHA_TO });
            await browser.executeAsync(unleashGremlins, GREMLINS_TTL);
        });
    });
});

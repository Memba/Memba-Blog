/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* globals browser: false, window: false */
/* eslint-disable no-unused-expressions */

// const { expect } = require('chai');
const { URL } = require('url');
const { format } = require('util');
const logger = require('@wdio/logger').default('gremlins.test');
const config = require('../../webapp/config/index.es6');

// Enhance browser with our Ex functions
require('./_misc/selenium.util.es6');

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
    ).href
};
const WAIT = 5000;
const MOCHA_TO = 60000;
const GREMLINS_TTL = 50000;
const SCREEN = {
    HEIGHT: 800,
    WIDTH: 1280
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
describe('Monkey testing with gremlins', () => {
    // let tabId;

    before(() => {
        /*
        if (browser.desiredCapabilities.browserName === 'firefox') {
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

    describe('Unleashing the horde', () => {
        // Retry all tests in this suite up to 3 times
        // this.retries(3);

        beforeEach(() => {
            // browser.switchTab ensures we are running all tests on the same tab
            // especially as we have experienced extensions like Skype that open a welcome page in a new tab
            // browser.switchTab(tabId);

            logger.info(browser.getUrl());
        });

        xit('it should not raise any error on the home page', () => {
            browser.url(webapp.home);
            browser.waitForReadyStateEx('complete', WAIT);
            // Now load our gremlins
            // Note: Mime type error when loading from https://raw.githubusercontent.com/marmelab/gremlins.js/master/gremlins.min.js
            // Note: Timeout when loading from https://rawgit.com/marmelab/gremlins.js/master/gremlins.min.js
            // So we need to load locally
            browser.setTimeout('script', WAIT);
            browser.loadScriptEx('./build/gremlins.min.js');
            logger.info('Gremlins loaded');
            // browser.pause(500);
            // And Unleash them
            browser.setTimeout('script', MOCHA_TO);
            browser.executeAsync(unleashGremlins, GREMLINS_TTL);
        });

        xit('it should not raise any error on the /en page', () => {
            browser.url(webapp.en);
            browser.waitForReadyStateEx('complete', WAIT);
            // Now load our gremlins
            browser.setTimeout('script', WAIT);
            browser.loadScriptEx('./build/gremlins.min.js');
            logger.info('Gremlins loaded');
            // browser.pause(500);
            // And Unleash them
            browser.setTimeout('script', MOCHA_TO);
            browser.executeAsync(unleashGremlins, GREMLINS_TTL);
        });

        xit('it should not raise any error on the /fr page', () => {
            browser.url(webapp.fr);
            browser.waitForReadyStateEx('complete', WAIT);
            // Now load our gremlins
            browser.setTimeout('script', WAIT);
            browser.loadScriptEx('./build/gremlins.min.js');
            logger.info('Gremlins loaded');
            // browser.pause(500);
            // And Unleash them
            browser.setTimeout('script', MOCHA_TO);
            browser.executeAsync(unleashGremlins, GREMLINS_TTL);
        });
    });
});

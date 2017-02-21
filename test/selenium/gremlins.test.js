/**
 * Copyright (c) 2013-2017 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, mocha: true, expr: true */
/* globals browser: false, document: false, window: false */

'use strict';

// var expect = require('chai').expect;
var util = require('util');

var config = require('../../webapp/config');
var url = require('../../webapp/lib/url');

var webapp = {
    home: url.join(config.get('uris:webapp:root'), config.get('uris:webapp:home')),
    fr: url.join(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:locale'), 'fr')),
    en: url.join(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:locale'), 'en'))
};

var WAIT = 5000;
var MOCHA_TO = 60000;
var GREMLINS_TTL = 50000;
var SCREEN = {
    HEIGHT: 800,
    WIDTH: 1280
};

/**
 * Enhance browser with our Ex functions
 */
require('./selenium');

/**
 * For more information about monkey testing, selenium and gremlins
 * Check https://medium.com/@jlchereau/automate-monkey-testing-with-selenium-webdriver-io-and-mocha-337ea935e308
 */

/* This function's cyclomatic complexity is too high. */
/* jshint -W074 */

/**
 * Load script
 * @param source
 * @param callback
 */
function loadScript(source, callback) {
    /* jshint maxcomplexity: 10 */
    if (typeof source !== 'string') {
        return typeof callback === 'function' ? callback() : undefined;
    }
    // Note: there might be a much better way to differentiate a src path from a script
    // For now, a single line with slashes is deemed a path, which might not work well with minified scripts
    var isPath = source.indexOf('\n') === -1 && source.indexOf('/') > -1;
    var head = document.getElementsByTagName('head')[0];
    var scripts = head.getElementsByTagName('script');
    var found = false;
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src === source) {
            found = true;
            break;
        }
    }
    if (!found) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        // @see https://www.nczonline.net/blog/2009/06/23/loading-javascript-without-blocking/
        if (isPath && typeof callback === 'function') {
            if (script.readyState) {  // IE
                script.onreadystatechange = function () {
                    if (script.readyState === 'loaded' || script.readyState === 'complete') {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            } else {  // Other browsers
                script.onload = callback;
            }
        }
        if (isPath) {
            script.src = source;
        } else {
            script[(window.opera ? 'innerHTML' : 'text')] = source;
        }
        head.appendChild(script);
    }
}

/* jshint +W074 */

/**
 * Unleash our gremlins
 * @param ttl
 * @param callback
 */
function unleashGremlins(ttl, callback) {
    function stop() {
        horde.stop();
        callback();
    }
    var horde = window.gremlins.createHorde();
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
 * Now testing
 */
describe('Monkey testing with gremlins', function () {

    var tabId;

    // Retry all tests in this suite up to 3 times
    // this.retries(3);

    before(function () {
        if (browser.desiredCapabilities.browserName === 'firefox') {
            // This prevents `No such content frame; perhaps the listener was not registered?`
            browser.pause(200);
        }
        browser.url(webapp.home);
        tabId = browser.getCurrentTabId();
        // Note: it won't work in PhantomJS without setting the window size
        browser.windowHandleSize({ height: SCREEN.HEIGHT, width: SCREEN.WIDTH });
    });

    describe('When testing', function () {

        beforeEach(function () {
            // browser.switchTab ensures we are running all tests on the same tab
            // especially as we have experienced extensions like Skype that open a welcome page in a new tab
            browser.switchTab(tabId);
            browser.logger.info(browser.getUrl());
        });

        it('it should not raise any error on the home page', function () {
            browser.url(webapp.home);
            browser.waitForReadyStateEx('complete', WAIT);
            // Now load our gremlins
            // Note: Mime type error when loading from https://raw.githubusercontent.com/marmelab/gremlins.js/master/gremlins.min.js
            // Note: Timeout when loading from https://rawgit.com/marmelab/gremlins.js/master/gremlins.min.js
            // So we need to load locally
            browser.timeoutsAsyncScript(WAIT);
            browser.executeAsync(loadScript, './build/gremlins.min.js');
            browser.logger.info('Gremlins loaded');
            // And Unleash them
            browser.timeoutsAsyncScript(MOCHA_TO);
            browser.executeAsync(unleashGremlins, GREMLINS_TTL);
        });

        it('it should not raise any error on the /en page', function () {
            browser.url(webapp.en);
            browser.waitForReadyStateEx('complete', WAIT);
            // Now load our gremlins
            browser.timeoutsAsyncScript(WAIT);
            browser.executeAsync(loadScript, './build/gremlins.min.js');
            browser.logger.info('Gremlins loaded');
            // And Unleash them
            browser.timeoutsAsyncScript(MOCHA_TO);
            browser.executeAsync(unleashGremlins, GREMLINS_TTL);
        });

        it('it should not raise any error on the /fr page', function () {
            browser.url(webapp.fr);
            browser.waitForReadyStateEx('complete', WAIT);
            // Now load our gremlins
            browser.timeoutsAsyncScript(WAIT);
            browser.executeAsync(loadScript, './build/gremlins.min.js');
            browser.logger.info('Gremlins loaded');
            // And Unleash them
            browser.timeoutsAsyncScript(MOCHA_TO);
            browser.executeAsync(unleashGremlins, GREMLINS_TTL);
        });

    });

});

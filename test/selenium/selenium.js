/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, mocha: true, expr: true */
/* globals browser: false, document: false */

'use strict';

/**
 * browser.clickEx because browser.click raises errors
 * in Microsoft Edge: `Element is obscured` (always)
 * in internet explorer: `Cannot click on element` (often)
 * @param selector
 */
browser.clickEx = function (selector) {
    if (browser.desiredCapabilities.browserName === 'internet explorer' || browser.desiredCapabilities.browserName === 'MicrosoftEdge') {
        browser.execute(function (el) { document.querySelector(el).click(); }, selector);
    } else {
        browser.click(selector);
    }
    // Give some time for click, especially to execute animations
    browser.pause(100);
};

/**
 * browser.waitForVisibleEx because browser.waitForVisible raises:
 * In PhantomJS: Promise was rejected with the following reason: timeout (always)
 * In Firefox: element (body>div.k-loading-image) still visible after 2000ms (sometimes)
 * @param selector
 */
browser.waitForVisibleEx = function (selector, timeout, reverse) {
    if (browser.desiredCapabilities.browserName !== 'phantomjs') {
        browser.waitForVisible(selector, timeout, reverse);
        /*
         browser.waitUntil(function () {
         var visible = browser.isVisible(selector);
         var element = browser.element(selector);
         browser.logger.info('------------------> browser: ' + browser.desiredCapabilities.browserName +
         ', display: ' + element.getCssProperty('display').value +
         ', opacity: ' + element.getCssProperty('opacity').value +
         ', visible: ' + visible);
         return reverse ? !visible : visible;
         }, timeout, 'waitUntil timeout', Math.floor(timeout / 5));
         */
    }
};

/**
 * wait for page readyState loading, interactive, complete
 */
browser.waitForReadyStateEx = function (state, timeout) {
    return browser.waitUntil(function () {
        return state ===  browser.execute(function () { return document.readyState; }).value;
    }, timeout);
};

/**
 * browser.alertTextEx because
 * 1) phantomjs does not have alerts
 * 2) browser.alertText fails on Microsoft Edge
 */
browser.alertTextEx = function (text) {
    return (browser.desiredCapabilities.browserName === 'phantomjs') ||
        (browser.desiredCapabilities.browserName === 'MicrosoftEdge') ||
        browser.alertText(text);
};

/**
 * browser.alertAcceptEx because
 * 1) phantomjs does not have alerts
 */
browser.alertAcceptEx = function () {
    if (browser.desiredCapabilities.browserName !== 'phantomjs') {
        return browser.alertAccept();
    }
};

/**
 * browser.alertAcceptEx because
 * 1) phantomjs does not have alerts
 */
browser.alertDismissEx = function () {
    if (browser.desiredCapabilities.browserName !== 'phantomjs') {
        return browser.alertDismiss();
    }
};

module.exports = browser;

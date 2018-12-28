/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* globals browser: false, document: false */
/* eslint-disable no-unused-expressions */

/**
 * browser.setWindowSize is undefined in firefox
 * @type {*|(function(*=, *=): *)}
 */
browser.setWindowSizeEx =
    browser.setWindowSize || ((w, h) => browser.setWindowRect(0, 0, w, h));

/**
 * wait for page readyState loading, interactive, complete
 */
browser.waitForReadyStateEx = (state, timeout) =>
    browser.waitUntil(
        () => state === browser.execute(() => document.readyState),
        timeout
    );

/**
 * browser.getAlertTextEx because
 * 1) phantomjs does not have alerts
 * 2) browser.getAlertText fails on Microsoft Edge
 */
browser.getAlertTextEx = text =>
    browser.capabilities.browserName === 'phantomjs' ||
    browser.capabilities.browserName === 'MicrosoftEdge' ||
    browser.getAlertText(text);

/**
 * browser.acceptAlertEx because
 * 1) phantomjs does not have alerts
 */
browser.acceptAlertEx = () => {
    if (browser.capabilities.browserName !== 'phantomjs') {
        browser.acceptAlert();
    }
};

/**
 * browser.acceptAlertEx because
 * 1) phantomjs does not have alerts
 */
browser.dismissAlertEx = () => {
    if (browser.capabilities.browserName !== 'phantomjs') {
        browser.dismissAlert();
    }
};

module.exports = browser;

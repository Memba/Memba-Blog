/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* globals browser: false, document: false */
/* eslint-disable no-unused-expressions */

/**
 * setWindowSizeEx
 * Note: browser.setWindowSize is undefined in firefox
 */
browser.addCommand('setWindowSizeEx', function setWindowSizeEx(w, h) {
    // Cannot use arrow functions to bind to this
    return 'setWindowSize' in this
        ? this.setWindowSize(w, h)
        : this.setWindowRect(0, 0, w, h);
});

/**
 * waitForReadyStateEx
 * wait for page readyState `loading`, `interactive`, `complete`
 */
browser.addCommand('waitForReadyStateEx', function waitForReadyStateEx(
    state,
    timeout
) {
    const that = this;
    that.waitUntil(
        () => state === that.execute(() => document.readyState),
        timeout
    );
});

/**
 * getAlertTextEx
 * 1) phantomjs does not have alerts
 * 2) browser.getAlertText fails on Microsoft Edge
 */
browser.addCommand('getAlertTextEx', function getAlertTextEx(text) {
    this.capabilities.browserName === 'phantomjs' ||
        this.capabilities.browserName === 'MicrosoftEdge' ||
        this.getAlertText(text);
});

/**
 * acceptAlertEx
 * 1) phantomjs does not have alerts
 */
browser.addCommand('acceptAlertEx', function acceptAlertEx() {
    this.capabilities.browserName !== 'phantomjs' && this.acceptAlert();
});

/**
 * browser.acceptAlertEx because
 * 1) phantomjs does not have alerts
 */
browser.addCommand('dismissAlertEx', function dismissAlertEx() {
    this.capabilities.browserName !== 'phantomjs' && this.dismissAlert();
});

/**
 * Default export
 */
module.exports = browser;

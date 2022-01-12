/**
 * Copyright (c) 2013-2021 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* globals document: false, window: false */
/* eslint-disable no-unused-expressions, prefer-arrow-callback */

/**
 * Default export
 */
module.exports = async (browser) => {
    /**
     * setWindowSizeEx
     * Note: browser.setWindowSize is undefined in firefox
     */
    await browser.addCommand(
        'setWindowSizeEx',
        async function setWindowSizeEx(w, h) {
            // Cannot use arrow functions to bind to this
            return 'setWindowSize' in this
                ? this.setWindowSize(w, h)
                : this.setWindowRect(0, 0, w, h);
        }
    );

    /**
     * waitForReadyStateEx
     * wait for page readyState `loading`, `interactive`, `complete`
     */
    await browser.addCommand(
        'waitForReadyStateEx',
        async function waitForReadyStateEx(state, timeout) {
            const that = this;
            await that.waitUntil(
                async () =>
                    state === (await that.execute(() => document.readyState)),
                // timeout // <-- v5
                { timeout } // <-- v6
            );
        }
    );

    /**
     * getAlertTextEx
     * 1) phantomjs does not have alerts
     * 2) browser.getAlertText fails on Microsoft Edge
     */
    await browser.addCommand(
        'getAlertTextEx',
        async function getAlertTextEx(text) {
            this.capabilities.browserName === 'phantomjs' ||
                this.capabilities.browserName === 'MicrosoftEdge' ||
                (await this.getAlertText(text));
        }
    );

    /**
     * acceptAlertEx
     */
    await browser.addCommand('acceptAlertEx', async function acceptAlertEx() {
        this.capabilities.browserName !== 'phantomjs' &&
            (await this.acceptAlert());
    });

    /**
     * acceptAlertEx
     * Note phantomjs does not have alerts
     */
    await browser.addCommand('dismissAlertEx', async function dismissAlertEx() {
        this.capabilities.browserName !== 'phantomjs' &&
            (await this.dismissAlert());
    });

    /**
     * loadScriptEx
     * @ see https://www.html5rocks.com/en/tutorials/speed/script-loading/
     */
    await browser.addCommand(
        'loadScriptEx',
        async function loadScriptEx(source) {
            // This is executed in the context of nodeJS/webdriverio (this === browser)
            await this.executeAsync((src, callback) => {
                // Note: This is executed in the context of the browser
                // Note: there might be a much better way to differentiate a src path from a script
                // For now, a single line with slashes is deemed a path, which might not work well with minified scripts
                const isPath =
                    src.indexOf('\n') === -1 && src.indexOf('/') > -1;
                const head = document.getElementsByTagName('head')[0];
                const scripts = head.getElementsByTagName('script');
                let found = false;
                for (let i = 0; i < scripts.length; i++) {
                    if (scripts[i].src === src) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    const script = document.createElement('script');
                    script.type = 'text/javascript';
                    // script.async = false;
                    // @see https://www.nczonline.net/blog/2009/06/23/loading-javascript-without-blocking/
                    if (isPath && typeof callback === 'function') {
                        if (script.readyState) {
                            // IE
                            script.onreadystatechange = () => {
                                if (
                                    script.readyState === 'loaded' ||
                                    script.readyState === 'complete'
                                ) {
                                    script.onreadystatechange = null;
                                    callback();
                                }
                            };
                        } else {
                            // Other browsers
                            script.onload = () => callback();
                        }
                    }
                    if (isPath) {
                        script.src = src;
                    } else {
                        script[window.opera ? 'innerHTML' : 'text'] = src;
                    }
                    head.appendChild(script);
                }
            }, source);
        }
    );
};

/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true */
/* globals define: false */

(function (f, define) {
    'use strict';
    define([
        './vendor/logentries/le.js', // <-- keep first or adapt function (LE)
        './window.assert',
        './window.logger'
    ], f);
})(function (LE) {

    'use strict';

    // Depending how le.js is loaded
    // We need `LE` for webpack and `window.LE` for grunt mocha
    LE = LE || window.LE;

    (function (undefined) {

        var app = window.app = window.app || {};
        var LEVELS = {
            // See https://github.com/logentries/le_node#log-levels
            DEBUG: { NAME: 'DEBUG', VALUE: 1 },
            INFO: { NAME: 'INFO', VALUE: 2 },
            WARN: { NAME: 'WARN', VALUE: 4 },
            ERROR: { NAME: 'ERROR', VALUE: 5 },
            CRIT: { NAME: 'CRIT', VALUE: 6 }
        };
        var DEFAULT = LEVELS.INFO;
        var logger = app.logger = app.logger || {
            token: 'e78bac0b-377a-49e2-ad91-20bb4ec7cedc', // Our localhost value (basically junk)
            level: DEFAULT.VALUE
        };

        /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */

        /**
         * Intialize LogEntries
         * @see https://logentries.com/doc/javascript/
         * @see https://github.com/logentries/le_js
         */
        LE.init({
            token: logger.token,
            ssl: true,
            /**
             * Important: catchall: true is equivalent to setting window.onerror
             * See https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
             */
            catchall: false, // we have our own global handler in window.logger
            trace: false, // not as good as our own trace
            page_info: 'never', // does not work - see https://github.com/logentries/le_js/issues/41
            print: false // let's print to the console ourselves in window.logger
        });

        /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */

        /**
         * IMPORTANT: the following functions are prefixed with underscores
         * because they should not be called, i.e. always call window.logger
         */

        /**
         * Log a debug entry
         * @param entry
         */
        logger._debug = function (entry) {
            if (logger.level > LEVELS.DEBUG.VALUE) {
                return false;
            }
            setTimeout(function () {
                // Note: LE has no debug logging as of June 2015
                LE.log(entry);
            }, 0);
            return true;
        };

        /**
         * Log an info entry
         * @param entry
         */
        logger._info = function (entry) {
            if (logger.level > LEVELS.INFO.VALUE) {
                return false;
            }
            setTimeout(function () {
                LE.info(entry);
            }, 0);
            return true;
        };

        /**
         * Log a warn entry
         * @param entry
         */
        logger._warn = function (entry) {
            if (logger.level > LEVELS.WARN.VALUE) {
                return false;
            }
            setTimeout(function () {
                LE.warn(entry);
            }, 0);
            return true;
        };

        /**
         * Log an error entry (the application can survive an error entry)
         * @param entry
         */
        logger._error = function (entry) {
            if (logger.level > LEVELS.ERROR.VALUE) {
                return false;
            }
            setTimeout(function () {
                LE.error(entry);
            }, 0);
            return true;
        };

        /**
         * Log a critical entry (the application cannot survive a critical entry)
         * @param entry
         */
        logger._crit = function (entry) {
            if (logger.level > LEVELS.CRIT.VALUE) {
                return false;
            }
            setTimeout(function () {
                // Note: LE has no critical logging as of June 2015
                LE.error(entry);
            }, 0);
            return true;
        };

    }());

    return window.app;

}, typeof define === 'function' && define.amd ? define : function (_, f) { 'use strict'; f(); });

/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true */
/* globals define: false */

(function (f, define) {
    'use strict';
    define([
        './common/window.assert.es6',
        './common/window.logger.es6'
    ], f);
})(function () {

    'use strict';

    var app = window.app = window.app || {};

    (function ($, undefined) {

        var assert = window.assert;
        var logger = app.logger = app.logger || {};
        var LEVELS = {
            DEBUG: { NAME: 'DEBUG', VALUE: 1 },
            INFO: { NAME: 'INFO', VALUE: 2 },
            WARN: { NAME: 'WARN', VALUE: 4 },
            ERROR: { NAME: 'ERROR', VALUE: 5 },
            CRIT: { NAME: 'CRIT', VALUE: 6 }
        };
        var RX_LEVELS = new RegExp('^(' + Object.keys(LEVELS).join('|') + ')$', 'i');

        // The following need to be defined in app.config.jsx
        // logger.level = X
        // logger.endPoint = http://xxxxxxx

        /**
         * IMPORTANT: the following functions are prefixed with underscores
         * because they should not be called, i.e. always call window.Logger functions
         */

        /**
         * Generic log function
         * @param entry
         * @param level
         * @private
         */
        logger._log = function (entry, level, options) {
            // Note: assert.type discards an entry of type Error, the processing is supposed to be done in windows.Logger
            assert.type('object', entry, 'A log entry is supposed to be an object');
            assert.match(RX_LEVELS, level, 'level is supposed to be any of `debug`, `info`, `warn`, `error` or `crit`');
            var dfd =  $.Deferred();
            if ((logger.level || 0) > LEVELS[level.toUpperCase()].VALUE) {
                // Return false if the ajax call was not made, considering the logging level
                return dfd.resolve(false);
            }
            if (('Connection' in window && window.navigator.connection.type === window.Connection.NONE) ||
                (window.device && window.device.platform === 'browser' && !window.navigator.onLine)) {
                return dfd.resolve(false);
            } else {
                $.ajax({
                    type: 'POST',
                    url: logger.endPoint || options.endPoint,
                    contentType: 'application/json',
                    // dataType: 'json', // <-- do not set the dataType since the response is always empty
                    data: JSON.stringify($.extend(entry, { date: new Date(), level: level.toLowerCase() }))
                })
                    .done(function () {
                        // Return true if the ajax call was successful
                        return dfd.resolve(true);
                    })
                    .fail(dfd.reject);
            }
            return dfd.promise();
        };

        /**
         * Log a debug entry
         * @param entry
         * @param options
         */
        logger._debug = function (entry, options) {
            return logger._log(entry, LEVELS.DEBUG.NAME, options);
        };

        /**
         * Log an info entry
         * @param entry
         * @param options
         */
        logger._info = function (entry, options) {
            return logger._log(entry, LEVELS.INFO.NAME, options);
        };

        /**
         * Log a warn entry
         * @param entry
         * @param options
         */
        logger._warn = function (entry, options) {
            return logger._log(entry, LEVELS.WARN.NAME, options);
        };

        /**
         * Log an error entry (the application can survive an error entry)
         * @param entry
         * @param options
         */
        logger._error = function (entry, options) {
            return logger._log(entry, LEVELS.ERROR.NAME, options);
        };

        /**
         * Log a critical entry (the application cannot survive a critical entry)
         * @param entry
         * @param options
         */
        logger._crit = function (entry, options) {
            return logger._log(entry, LEVELS.CRIT.NAME, options);
        };

    }(window.jQuery));

    return app;

}, typeof define === 'function' && define.amd ? define : function (_, f) { 'use strict'; f(); });

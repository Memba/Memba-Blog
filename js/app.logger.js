/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true */
/* globals define: false */

(function(f, define){
    'use strict';
    define(['./vendor/logentries/le.js'], f);
})(function(LE) {

    'use strict';

    (function () {

        var app = window.app = window.app || {},
            logger = app.logger = app.logger || {};

        // Intialize LogEntries
        // see https://logentries.com/doc/javascript/
        // see https://github.com/logentries/le_js
        LE.init({
            token: app.logger.token,
            ssl: true,
            catchall: true,
            trace: false, //not as good as our sessionId
            page_info: 'per-entry',
            print: typeof app.DEBUG === 'undefined' ? false : app.DEBUG
        });

        logger.info = LE.info;
        logger.warning = LE.warn;
        logger.error = LE.error;
        //critical?

    }());

    return window.app.logger;

}, typeof define === 'function' && define.amd ? define : function(_, f){ 'use strict'; f(); });

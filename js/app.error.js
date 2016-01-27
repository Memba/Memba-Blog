/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true, jquery: true */
/* globals define: false, require: false */

if (typeof(require) === 'function') {
    // Load styles
    require('../styles/app.page.error.less');
}

(function (f, define) {
    'use strict';
    define([
        './window.assert',
        './window.logger',
        './app.i18n',
        './app.common' // <----- errors have no menu in case the error comes from the menu
    ], f);
})(function () {

    'use strict';

    (function ($, undefined) {

        var app = window.app;
        var logger = new window.Logger('app.error');
        var i18n = app.i18n;

        /**
         * Wait for document to be ready to initialize UI
         * Note: no need to use the i18n.loaded event here
         */
        $(document).ready(function () {

            // Add click handler on back button
            $('#back-button').click(function () {
                window.history.back();
            });

            // Log page readiness
            logger.info({
                message: 'error page initialized in ' + i18n.locale(),
                method: '$(document).ready'
            });

        });

    }(window.jQuery));

    return window.app;

}, typeof define === 'function' && define.amd ? define : function (_, f) { 'use strict'; f(); });

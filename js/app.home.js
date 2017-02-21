/**
 * Copyright (c) 2013-2017 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true, jquery: true */
/* globals define: false, require: false */

require('../styles/app.page.home.less');

(function (f, define) {
    'use strict';
    define([
        './window.assert',
        './window.logger',
        './app.logger',
        './app.i18n',
        './app.common',
        './app.menu'
    ], f);
})(function () {

    'use strict';

    (function ($, undefined) {

        var app = window.app;
        var logger = new window.Logger('app.home');
        var i18n = app.i18n;

        $(function () {

            // Log page readiness
            logger.info({
                message: 'home page initialized in ' + i18n.locale(),
                method: 'document.ready'
            });

        });

    }(window.jQuery));

    return window.app;

}, typeof define === 'function' && define.amd ? define : function (_, f) { 'use strict'; f(); });

/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true, jquery: true */
/* globals define: false, require: false */

(function (f, define) {
    'use strict';
    define([
        './app.logger'
    ], f);
})(function () {

    'use strict';

    (function ($, undefined) {

        var app = window.app;
        var logger = new window.Logger('app.theme');
        var STRING = 'string';
        var THEME = 'theme';
        var DEFAULT = 'default';

        app.theme = {

            /**
             * Load a theme
             * @param theme
             */
            load: function (theme) {
                // TODO Reject unlisted theme
                var dfd = $.Deferred();
                var oldTheme = localStorage.getItem(THEME);
                var loader;
                if (typeof oldTheme === STRING && oldTheme !== theme) {
                    // See https://github.com/webpack/style-loader/issues/48
                    // See https://github.com/webpack/webpack/issues/924
                    // See https://github.com/webpack/webpack/issues/993
                    loader = require('../styles/app.theme.' + oldTheme + '.less');
                    loader(function (style) {
                        style.unuse();
                    });
                }
                localStorage.setItem(THEME, theme);
                loader = require('../styles/app.theme.' + theme + '.less');
                loader(function (style) {
                    style.use();
                    logger.debug({
                        message: 'theme changed to ' + theme,
                        method: 'load'
                    });
                    dfd.resolve();
                });
                return dfd.promise();
            },

            /**
             * Get/set theme name
             * @param theme
             */
            name: function (theme) {
                if (typeof theme === STRING) {
                    app.theme.load(theme);
                } else if (theme === undefined) {
                    return localStorage.getItem(THEME);
                } else {
                    throw new TypeError('bad theme');
                }
            }

        };

        // load theme
        var theme = app.theme.name();
        if (theme) {
            app.theme.name(theme);
        } else {
            app.theme.name(DEFAULT);
        }

    }(window.jQuery));

    return window.app;

}, typeof define === 'function' && define.amd ? define : function (_, f) { 'use strict'; f(); });

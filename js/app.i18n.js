/**
 * Copyright (c) 2013-2016 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true, jquery: true */
/* globals define: false, require: false */

(function (f, define) {
    'use strict';
    define([
        './window.assert',
        './window.logger',
        './app.logger'
    ], f);
})(function () {

    'use strict';

    (function ($, undefined) {

        var app = window.app = window.app || {};
        var kendo = window.kendo;
        var assert = window.assert;
        var logger = new window.Logger('app.i18n');
        var cultures = app.cultures = app.cultures || {};
        var STRING = 'string';
        var ARRAY = 'array';
        var LOADED = 'i18n.loaded';
        var LANGUAGE = 'language';

        /**
         * localization functions
         */
        var i18n = app.i18n = {

            /**
             * Load culture file for locale
             * @param locale
             * @param callback
             */
            load: function (locale) {

                // Note: assume kendo is not yet loaded
                assert.type(ARRAY, app.locales, '`app.locales` is expected to be an array');
                assert.enum(app.locales, locale, '`locale` is expected to be one of ' + app.locales.toString());

                var dfd = $.Deferred();

                // Setter
                function setLocale() {
                    i18n.culture = cultures[locale];
                    dfd.resolve();
                }

                if (cultures[locale]) {
                    // locale already loaded
                    setLocale();
                } else {
                    // locale needs to be loaded (see https://github.com/webpack/webpack/issues/923)
                    var loader = require('bundle?name=[name]!./cultures/app.culture.' + locale + '.js');
                    loader(setLocale);
                }

                return dfd.promise();
            },

            /* This function's cyclomatic complexity is too high. */
            /* jshint -W074 */

            /**
             * Get/set locale
             * Value set by the server on the html element of the page base on the url
             * @param locale
             * @returns {string|string}
             */
            locale: function (locale) {
                /* jshint maxcomplexity: 8 */
                if (typeof locale === STRING) {

                    // Note: assume kendo is not yet loaded
                    assert.type(ARRAY, app.locales, '`app.locales` is expected to be an array');
                    assert.enum(app.locales, locale, '`locale` is expected to be one of ' + app.locales.toString());
                    assert.isUndefined(window.cordova, 'This is not the way to change locale in phonegap/cordova');

                    var href = app.uris.webapp.locale.replace('{0}', locale);
                    if (window.top === window.self) {
                        window.location.assign(href);
                    } else {
                        // This is an embedded player
                        window.top.location.assign(href);
                    }

                } else if (locale === undefined) {

                    // if (window.cordova) { // Phonegap
                    if (app.mobile && kendo.mobile && kendo.mobile.Application &&
                        app.mobile.application instanceof kendo.mobile.Application) {
                        return window.localStorage.getItem(LANGUAGE) || 'en';
                    } else { // Web application
                        return document.getElementsByTagName('html')[0].getAttribute('lang') || 'en';
                    }

                } else {
                    throw new TypeError('Bad locale: ' + locale);
                }
            }

            /* jshint +W074 */
        };

        $(function () {
            // Load page locale (read from html tag)
            var locale = i18n.locale();

            // Wait until locale is loaded to localize and hide preload
            // @see http://blogs.telerik.com/kendoui/posts/11-10-06/foujui_flash_of_uninitialized_javascript_ui
            $(document)
                .one(LOADED, function () {
                    $('body>div.k-loading-image').delay(400).fadeOut();
                });

            // Load locale and trigger event
            i18n.load(locale)
                .then(function () {
                    // Log readiness
                    logger.debug({
                        message: locale + ' locale loaded',
                        method: 'document.ready'
                    });
                    // trigger event for localization
                    $(document).trigger(LOADED);
                });
        });

    }(window.jQuery));

    return window.app;

}, typeof define === 'function' && define.amd ? define : function (_, f) { 'use strict'; f(); });

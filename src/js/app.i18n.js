/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true, jquery: true */
/* globals define: false, require: false */

(function (f, define) {
    'use strict';
    define([
        './common/window.assert.es6',
        './common/window.logger.es6',
        './app.logger'
    ], f);
})(function () {

    'use strict';

    (function ($, undefined) {

        var app = window.app = window.app || {};
        // var kendo = window.kendo;
        var assert = window.assert;
        var logger = new window.Logger('app.i18n');
        var cultures = app.cultures = app.cultures || {};
        var UNDEFINED = 'undefined';
        var STRING = 'string';
        var ARRAY = 'array';
        var LOADED = 'i18n.loaded';
        var LANGUAGE = 'language';
        var DEFAULT = 'en';

        var localStorage; // = window.localStorage;
        // An exception is catched when localStorage is explicitly disabled in browser settings (Safari Private Browsing)
        try { localStorage = window.localStorage; } catch (ex) {}

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

                // Setter called async by webpack bundle loader
                function setLocale() {
                    try {
                        localStorage.setItem(LANGUAGE, locale);
                    } catch (exception) {
                        // A QuotaExceededError in raised in private browsing, which we do not care about
                        // @see https://github.com/jlchereau/Kidoju-Webapp/issues/181
                        // @see http://chrisberkhout.com/blog/localstorage-errors/
                        if (!window.DOMException || !(exception instanceof window.DOMException) || exception.code !== window.DOMException.QUOTA_EXCEEDED_ERR) {
                            throw exception;
                        }
                    }
                    // Load culture
                    i18n.culture = cultures[locale];
                    // Log readiness
                    logger.debug({
                        message: locale + ' locale loaded',
                        method: 'setLocale'
                    });
                    dfd.resolve();
                }

                if (cultures[locale]) {
                    // locale already loaded
                    setLocale();
                } else {
                    // locale needs to be loaded (see https://github.com/webpack/webpack/issues/923)
                    var loader = require('bundle-loader?name=[name]!./cultures/app.culture.' + locale + '.js');
                    loader(setLocale);
                }

                return dfd.promise();
            },

            /**
             * Get/set locale
             * Value set by the server on the html element of the page base on the url
             * @param locale
             * @returns {string|string}
             */
            locale: function (locale) {
                if ($.type(locale) === STRING) {

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

                } else if ($.type(locale) === UNDEFINED && $.type(window.cordova) === UNDEFINED) { // Kidoju-WebApp

                    return document.getElementsByTagName('html')[0].getAttribute('lang') || DEFAULT;

                } else if ($.type(locale) === UNDEFINED) { // Kidoju-Mobile

                    // Note: cordova-plugin-globalization has method navigator.globalization.getLocaleName
                    // but this method is asynchronous, so it is called in onDeviceReady to set LANGUAGE in window.localStorage
                    return (localStorage && localStorage.getItem(LANGUAGE)) || DEFAULT;

                } else {
                    throw new TypeError('Bad locale');
                }
            }
        };

        /**
         * Initialization
         */
        if ($.type(window.cordova) === UNDEFINED) { // In Kidoju-WebApp
            $(function () {
                // Load page locale (read from html tag)
                var locale = i18n.locale();

                // Add event handler to hide preload
                $(document)
                .one(LOADED, function () {
                    $('body>div.k-loading-image').delay(400).fadeOut();
                });

                // Load i18n locale
                i18n.load(locale).done(function () {
                    // trigger event for localization
                    $(document).trigger(LOADED);
                });
            });
        } else { // In Kidoju-Mobile
            // Wait for Cordova to load
            document.addEventListener('deviceready', function () {
                if (window.navigator && window.navigator.language) {
                    // We have migrated from cordova-plugin-globalization
                    // as recommended at https://cordova.apache.org/news/2017/11/20/migrate-from-cordova-globalization-plugin.html
                    var locale = i18n.locale() || window.navigator.language.substr(0, 2);
                    if (app.locales.indexOf(locale) === -1) {
                        locale = DEFAULT;
                    }
                    i18n.load(locale).done(function () {
                        // trigger event for localization
                        $(document).trigger(LOADED);
                    });
                } else {
                    // Without window.navigator.language
                    i18n.load(i18n.locale() || DEFAULT).done(function () {
                        // trigger event for localization
                        $(document).trigger(LOADED);
                    });
                }
            }, false);
        }

    }(window.jQuery));

    return window.app;

}, typeof define === 'function' && define.amd ? define : function (_, f) { 'use strict'; f(); });

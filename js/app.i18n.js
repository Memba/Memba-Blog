/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true, jquery: true */
/* globals define: false */

(function(f, define){
    'use strict';
    define([
        './app.logger'
    ], f);
})(function(){

    'use strict';

    (function ($, undefined) {

        var app = window.app,
            logger = app.logger,
            cultures = app.cultures = app.cultures || {},
            STRING = 'string';

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

                //TODO check locale in config and throw exception it it does not exist

                var dfd = $.Deferred();

                //Setter
                function setLocale() {
                    i18n.culture = cultures[locale];
                    //TODO set kendo
                    dfd.resolve();
                }

                if(cultures[locale]) {
                    //locale already already loaded
                    setLocale();
                } else {
                    //locale needs to be loaded (see https://github.com/webpack/webpack/issues/923)
                    var loader = require('bundle?name=[name]!./cultures/app.culture.' + locale + '.js');
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
                if (typeof locale === STRING) {
                    //TODO Reject locales not in config
                    window.location.href = app.uris.webapp.pages.replace('{0}', locale).replace('{1}', '');
                } else if (locale === undefined) {
                    return document.getElementsByTagName('html')[0].getAttribute('lang') || 'en';
                } else {
                    throw new TypeError('bad locale');
                }
            }

        };

        /**
         * Load page locale (read from html tag)
         */
        var locale = i18n.locale();
        i18n.load(locale)
            .then(function() {
                $(document).ready(function() {

                    //Log readiness
                    logger.info({
                        message: locale + ' locale loaded',
                        module: 'app.locale',
                        method: '$(document).ready'
                    });

                    //trigger event for client localization of page
                    $(document).trigger('i18n.loaded');
                });
            });

        /**
         * Wait until locale is loaded to localize and hide preload
         * @see http://blogs.telerik.com/kendoui/posts/11-10-06/foujui_flash_of_uninitialized_javascript_ui
         */
        $(document).on('i18n.loaded', function() {
            $('body>div.k-loading-image').fadeOut();
        });

    }(window.jQuery));

    return window.app;

}, typeof define === 'function' && define.amd ? define : function(_, f){ 'use strict'; f(); });

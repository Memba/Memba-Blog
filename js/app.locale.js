/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true */
/* globals require: false */

(function ($, undefined) {

    'use strict';

    var app = window.app = window.app || {},
        cultures = app.cultures = app.cultures || {},
        FUNCTION = 'function',
        STRING = 'string',
        UNDEFINED = 'undefined';

    /**
     * Log a message
     * @param message
     */
    function log(message) {
        if (app.DEBUG && window.console && (typeof window.console.log === FUNCTION)) {
            window.console.log('app.locale: ' + message);
        }
    }

    /**
     * localization functions
     */
    app.locale = {

        /**
         * Load culture file for locale
         * @param locale
         * @param callback
         */
        load: function (locale, callback) {

            //TODO check locale in config and throw exception it it does not exist

            //Setter
            function setLocale() {
                app.locale.culture = app.cultures[locale];
                //TODO set kendo
                if (typeof callback === FUNCTION) {
                    callback();
                }
            }

            if(app.cultures[locale]) {
                //If already loaded
                setLocale();
            } else {
                //Otherwise
                //https://github.com/webpack/webpack/issues/923
                var loader = require('bundle?name=[name]!./cultures/app.culture.' + locale + '.js');
                loader(setLocale);
            }
        },

        /**
         * Get/set locale
         * Value set by the server on the html element of the page base on the url
         * @returns {string|string}
         */
        value: function (locale) {
            if (typeof locale === STRING) {
                //TODO Reject locales not in config
                window.location.href = app.uris.webapp.pages.replace('{0}', locale).replace('{1}', '');
            } else if (typeof locale === UNDEFINED) {
                return document.getElementsByTagName('html')[0].getAttribute('lang') || 'en';
            } else {
                throw new TypeError('bad locale');
            }
        }

    };

    //Load page locale
    var locale = app.locale.value();
    app.locale.load(locale, function() {
        $(document).ready(function() {
            log(locale + ' locale loaded');
            //trigger event for individual page scripts
            $(document).trigger('locale.loaded');
        });
    });

}(window.jQuery));

/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true */
/* globals require: false */

(function ($, undefined) {

    'use strict';

    //Require config
    require('./app.config.jsx?env=' + process.env.NODE_ENV);

    var app = window.app = window.app || {};
    app.cultures = app.cultures || {};

    /**
     * Log a message
     * @param message
     */
    function log(message) {
        if (app.DEBUG && window.console && (typeof window.console.log === 'function')) {
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
                if (typeof callback === 'function') {
                    callback();
                }
            }

            //If already loaded
            if(app.cultures[locale]) {
                setLocale()
                //Otherwise
            } else {
                //https://github.com/webpack/webpack/issues/923
                var loader = require('bundle?name=[name]!./cultures/app.culture.' + locale + '.js');
                loader(setLocale);
            }
        },

        /**
         * Get locale
         * Value set by the server on the html element of the page base on the url
         * @returns {string|string}
         */
        getValue: function () {
            return document.getElementsByTagName('html')[0].getAttribute('lang') || 'en';
        },

        /**
         * Change locale
         * Redirects to new url
         * @param value
         */
        changeLocale: function (value) {
            window.location.href = app.uris.webapp.find.replace('{0}', value);
        },

        /**
         * Get languages
         * @param value
         * @returns {*}
         */
        getLanguages: function (value) {
            //TODO: Return localized version
            var languages = {
                en: 'English',
                fr: 'French'
            };
            return languages[value];
        }

    };

    //Load page locale
    var locale = app.locale.getValue();
    app.locale.load(locale, function() {
        log('initialized with ' + locale);
        //trigger ready event
        $(document).trigger('locale.loaded');
    });

}(window.jQuery));

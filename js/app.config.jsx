/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true, jquery: true */
/* globals define: false */

(function(f, define){
    'use strict';
    define([], f);
})(function(){

    'use strict';

    /**
     * Note: This file is built with webpack using ./web_modules/jsx-loader.
     * Values are read from any of the JSON config files in ./webapp/config
     * depending on NODE_ENV: development, test or production (by default).
     */

    (function () {

        var app = window.app = window.app || {};

        /**
         * application DEBUG mode
         * @type {boolean}
         */
        app.DEBUG = '<%- debug %>'.toLowerCase() === 'true';

        /**
         * Log a message
         * @param message
         */
        function log(message) {
            if (app.DEBUG && window.console && (typeof window.console.log === 'function')) {
                window.console.log('app.config: ' + message);
            }
        }

        /**
         * Get formatting strings for Kendo UI from nodejs
         * where %s placeholders are replaced with {i} placeholders
         */
        function format(value) {
            if (app.DEBUG && (value.match(/%s/g) || []).length > 5) {
                var msg = 'value has too many %s to format';
                log(msg); throw new Error(msg);
            }
            return value.replace(/%s/, '{0}').replace(/%s/, '{1}').replace(/%s/, '{2}').replace(/%s/, '{3}').replace(/%s/, '{4}');
        }

        /**
         * Application URIs
         * See /wepapp/middleware/locals.js
         */
        app.uris = {
            cdn: {
                default: '<%- uris.cdn.root %>' + format('<%- uris.cdn.default %>'),
                svg: {
                    office: '<%- uris.cdn.root %>' + format('<%- uris.cdn.svg.office %>'),
                    white: '<%- uris.cdn.root %>' + format('<%- uris.cdn.svg.white %>'),
                    dark_grey: '<%- uris.cdn.root %>' + format('<%- uris.cdn.svg.dark_grey %>')
                }
            },
            webapp: {
                home: format('<%- uris.webapp.home %>'),
                page: format('<%- uris.webapp.page %>'),
                blog: format('<%- uris.webapp.blog %>')
            }
        };

    }());

    return window.app.uris;

}, typeof define === 'function' && define.amd ? define : function(_, f){ 'use strict'; f(); });

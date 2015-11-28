/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true */
/* globals define: false */

(function (f, define) {
    'use strict';
    define([
        './app.logger'
    ], f);
})(function () {

    'use strict';

    /**
     * Note: This file is built with webpack using ./web_modules/jsx-loader.
     * Values are read from any of the JSON config files in ./webapp/config
     * depending on NODE_ENV: development, test or production (by default).
     */

    (function () {

        var app = window.app = window.app || {};
        var assert = window.assert;
        var logger = app.logger = app.logger || {};

        /**
         * application DEBUG mode
         * @type {boolean}
         */
        app.DEBUG = '<%- debug %>'.toLowerCase() === 'true';

        /**
         * Logger token
         */
        window.Logger.prototype.level = parseInt('<%- level %>', 10) || 0;
        app.logger.level = parseInt('<%- level %>', 10) || 0;
        app.logger.token = '<%- logentries.browser.token %>';

        /**
         * Convert nodejs printf like formatting strings into Kendo UI formatting strings
         * where %s placeholders are replaced with {i} placeholders
         * @see https://nodejs.org/api/util.html#util_util_format_format
         * @see http://docs.telerik.com/kendo-ui/api/javascript/kendo#methods-format
         * @param value
         * @returns {*}
         */
        function convertFormat (value) {
            var i = 0;
            var ret = value;
            var rx = /%[sdj]/;
            while (typeof ret === 'string' && rx.test(ret)) {
                ret = ret.replace(rx, '{' + i + '}');
                i++;
            }
            return ret;
        }

        /**
         * Join url bits, adding slashes where required
         * TODO: This could be improved to account for . and ..
         */
        function urljoin() {
            // Actually we first join with slashes, then we replace double or triple slashes, except when preceded by colons like in http://
            return Array.prototype.slice.call(arguments).join('/').replace(/([^:])[\/]{2,}/g, '$1/');
        }

        /**
         * Application URIs
         * See /wepapp/middleware/locals.js
         */
        app.uris = {
            cdn: {
                default: '<%- uris.cdn.root %>' + convertFormat('<%- uris.cdn.default %>'),
                svg: {
                    office: '<%- uris.cdn.root %>' + convertFormat('<%- uris.cdn.svg.office %>'),
                    white: '<%- uris.cdn.root %>' + convertFormat('<%- uris.cdn.svg.white %>'),
                    dark_grey: '<%- uris.cdn.root %>' + convertFormat('<%- uris.cdn.svg.dark_grey %>')
                }
            },
            webapp: {
                home: '<%- uris.webapp.root %>' + convertFormat('<%- uris.webapp.home %>'),
                feed:  '<%- uris.webapp.root %>' + convertFormat('<%- uris.webapp.feed %>'),
                sitemap:  '<%- uris.webapp.root %>' + convertFormat('<%- uris.webapp.sitemap %>'),
                pages:  '<%- uris.webapp.root %>' + convertFormat('<%- uris.webapp.pages %>'),
                posts:  '<%- uris.webapp.root %>' + convertFormat('<%- uris.webapp.posts %>')
            }
        };

    }());

    return window.app;

}, typeof define === 'function' && define.amd ? define : function (_, f) { 'use strict'; f(); });

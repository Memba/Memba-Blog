/**
 * Copyright (c) 2013-2016 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true */
/* globals define: false, __VERSION__: false */

(function (f, define) {
    'use strict';
    define([], f);
})(function () {

    'use strict';

    /**
     * Note: This file is built with webpack using ./web_modules/jsx-loader.
     * Values are read from any of the JSON config files in ./webapp/config
     * depending on NODE_ENV: development, test or production (by default).
     */

    (function () {

        var app = window.app = window.app || {};

        /**
         * Join url bits, adding slashes where required
         * TODO: This could be improved to account for . and ..
         */
        var url = {
            join: function () {
                // Actually we first join with slashes, then we replace double or triple slashes, except when preceded by colons like in http://
                return Array.prototype.slice.call(arguments).join('/').replace(/([^:])[\/]{2,}/g, '$1/');
            }
        };

        /**
         * application DEBUG mode
         * @type {boolean}
         */
        app.DEBUG = '<%- debug %>'.toLowerCase() === 'true';

        /**
         * application version
         * Note: this is the only way to do it because version does not exist in configuration files loaded by ./web_modules/jsx_loader
         */
        app.version = __VERSION__;

        /**
         * application locales
         */
        app.locales = JSON.parse('<%- JSON.stringify(locales) %>');

        /**
         * Facebook
         * @type {{clientId: string}}
         */
        app.facebook = { clientID: '<%- facebook.clientID %>' };

        /**
         * Twitter
         * @type {{clientId: string}}
         */
        app.twitter = { account: '<%- twitter.account %>' };

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
         * Application URIs
         * See /wepapp/middleware/locals.js
         */
        app.uris = {
            cdn: {
                icons: url.join('<%- uris.cdn.root %>', convertFormat('<%- uris.cdn.icons %>'))
            },
            webapp: {
                home: url.join('<%- uris.webapp.root %>', convertFormat('<%- uris.webapp.home %>')),
                locale: url.join('<%- uris.webapp.root %>', convertFormat('<%- uris.webapp.locale %>')), // redirection when changing locale
                logger: url.join('<%- uris.webapp.root %>', convertFormat('<%- uris.webapp.logger %>')),
                feed:  url.join('<%- uris.webapp.root %>', convertFormat('<%- uris.webapp.feed %>')),
                sitemap:  url.join('<%- uris.webapp.root %>', convertFormat('<%- uris.webapp.sitemap %>')),
                pages:  url.join('<%- uris.webapp.root %>', convertFormat('<%- uris.webapp.pages %>')),
                posts:  url.join('<%- uris.webapp.root %>', convertFormat('<%- uris.webapp.posts %>'))
            }
        };

        /**
         * Logger configuration
         */
        app.logger = app.logger || {};
        app.logger.level = parseInt('<%- level %>', 10) || 0;
        app.logger.endPoint = app.uris.webapp.logger;

    }());

    return window.app;

}, typeof define === 'function' && define.amd ? define : function (_, f) { 'use strict'; f(); });

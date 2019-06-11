/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* globals __VERSION__:false */

/**
 * application DEBUG mode
 * @type {boolean}
 */
window.DEBUG = '<%- debug %>'.toLowerCase() === 'true';

/**
 * Note: This file is built with webpack using ./web_modules/jsx-loader.
 * Values are read from any of the JSON config files in ./webapp/config
 * depending on NODE_ENV: development, test or production (by default).
 */

const config = {};

/**
 * Join url bits, adding slashes where required
 * TODO: This could be improved to account for . and .. - consider using new URL
 */
const url = {
    resolve(...args) {
        // Actually we first join with slashes, then we replace double or triple slashes, except when preceded by colons like in http://
        return Array.prototype.slice
            .call(args)
            .join('/')
            .replace(/([^:])[/]{2,}/g, '$1/');
    }
};

/**
 * application version
 * Note: this is the only way to do it because version does not exist in configuration files loaded by ./web_modules/jsx_loader
 */
config.version = __VERSION__;

/**
 * application locales
 */
config.locales = JSON.parse('<%- JSON.stringify(locales) %>');

/**
 * Constants
 * @type {{gaTrackingId: string, facebookAppId: string, twitterAccount: string}}
 */
config.constants = {
    // Application scheme
    // appScheme: '<%- application.scheme %>',

    // Facebook clientID
    facebookAppId: '<%- facebook.clientID %>',

    // Twitter account
    twitterAccount: '<%- twitter.account %>'
};

/**
 * Convert nodejs printf like formatting strings into Kendo UI formatting strings
 * where %s placeholders are replaced with {i} placeholders
 * @see https://nodejs.org/api/util.html#util_util_format_format
 * @see http://docs.telerik.com/kendo-ui/api/javascript/kendo#methods-format
 * @param value
 * @returns {*}
 */
function convertFormat(value) {
    let i = 0;
    let ret = value;
    const rx = /%[sdj]/;
    while (typeof ret === 'string' && rx.test(ret)) {
        ret = ret.replace(rx, `{${i}}`);
        i += 1;
    }
    return ret;
}

/**
 * Application URIs
 * See /wepapp/middleware/locals.js
 */
config.uris = {
    cdn: {
        icons: url.resolve(
            '<%- uris.cdn.root %>',
            convertFormat('<%- uris.cdn.icons %>')
        )
    },
    webapp: {
        error: url.resolve(
            '<%- uris.webapp.root %>',
            convertFormat('<%- uris.webapp.error %>')
        ),
        home: url.resolve(
            '<%- uris.webapp.root %>',
            convertFormat('<%- uris.webapp.home %>')
        ),
        locale: url.resolve(
            '<%- uris.webapp.root %>',
            convertFormat('<%- uris.webapp.locale %>')
        ), // redirection when changing locale
        logger: url.resolve(
            '<%- uris.webapp.root %>',
            convertFormat('<%- uris.webapp.logger %>')
        ),
        feed: url.resolve(
            '<%- uris.webapp.root %>',
            convertFormat('<%- uris.webapp.feed %>')
        ),
        sitemap: url.resolve(
            '<%- uris.webapp.root %>',
            convertFormat('<%- uris.webapp.sitemap %>')
        ),
        pages: url.resolve(
            '<%- uris.webapp.root %>',
            convertFormat('<%- uris.webapp.pages %>')
        ),
        ping: url.resolve(
            '<%- uris.webapp.root %>',
            convertFormat('<%- uris.webapp.ping %>')
        ),
        posts: url.resolve(
            '<%- uris.webapp.root %>',
            convertFormat('<%- uris.webapp.posts %>')
        ),
        public: url.resolve(
            '<%- uris.webapp.root %>',
            convertFormat('<%- uris.webapp.public %>')
        )
    }
};

/**
 * Logger configuration
 */
config.logger = {
    level: parseInt('<%- level %>', 10) || 0,
    endPoint: config.uris.webapp.logger
};

/**
 * Default export
 */
export default config;

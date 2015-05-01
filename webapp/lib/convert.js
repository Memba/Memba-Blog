/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var util = require('util'),
    url = require('./url'),
    config = require('../config'),
    PAGES = 'pages',
    POSTS = 'posts',
    github = {
        language: config.get('github:language'),    // "%s/"
        pages: config.get('github:' + PAGES),       // "pages"
        posts: config.get('github:' + POSTS),       // "posts"
        markdown: config.get('github:markdown')     // "%s.md"
    },
    webapp = {
        root: config.get('uris:webapp:root'),       // "http://localhost:3000",
        pages: config.get('uris:webapp:' + PAGES),  // "/%s/%s"
        posts: config.get('uris:webapp:' + POSTS)   // "/%s/posts/%s/%s/%s"
    },
    SEPARATOR = '\\/',
    ANY_BETWEEN_SEPARATORS = util.format('[^%s]+', SEPARATOR),
    MATCH_BETWEEN_SEPARATORS = util.format('(%s)', ANY_BETWEEN_SEPARATORS);

/**
 * A github path comprises 3 portions:
 * - a portion from which a language can be extracted
 * - a portion determining the type: page or post
 * - a portion determining the file
 */

module.exports = {

    /**
     * Returns a github path from a site url
     * @param url
     */
    //webapp2github: function(url) {
    //},

    /**
     * Extracts language from github path
     * @param path
     * @returns {*}
     */
    github2language: function(path) {
        var RX_LANG = new RegExp('^' + util.format(github.language, MATCH_BETWEEN_SEPARATORS)),
            matches = path.match(RX_LANG);
        if (Array.isArray(matches) && matches.length == 2) {
            return matches[1];
        } else {
            return undefined;
        }
    },

    /**
     * Extracts section from github path
     * @param path
     * @returns {*}
     */
    github2section: function(path) {
        var template = url.join(github.language, '%s').replace(new RegExp(SEPARATOR), SEPARATOR);
        var RX_SECTION = new RegExp('^' + util.format(template, ANY_BETWEEN_SEPARATORS, MATCH_BETWEEN_SEPARATORS)),
            matches = path.match(RX_SECTION);
        if (Array.isArray(matches) && matches.length == 2) {
            var section = matches[1];
            if (section === github.pages) {
                return PAGES; //name (not value) of webapp pages config key in json file
            } else if (section === github.posts) {
                return POSTS; //name (not value) of webapp posts config key in json file
            }
        }
    },

    /**
     * Extracts slug from github path
     * @param path
     * @returns {*}
     */
    github2slug: function(path) {
        //TODO: Consider using https://github.com/dodo/node-slug
        var RX_SLUG = new RegExp(util.format(github.markdown, MATCH_BETWEEN_SEPARATORS) + '$'),
            matches = path.match(RX_SLUG);
        if (Array.isArray(matches) && matches.length == 2) {
            return matches[1];
        }
    },

    /**
     * Returns a site url from a github path
     * @param path
     * @param date
     */
    github2webapp: function(path, date) {
        var language  =module.exports.github2language(path),
            section = module.exports.github2section(path),
            slug = module.exports.github2slug(path);
        if( section === PAGES && typeof date === 'undefined') {
            return url.join(webapp.root, util.format(webapp.pages, language, slug));
        } else if (section === POSTS && typeof date !== 'undefined') {
            if (typeof date === 'string') {
                date = new Date(date);
            }
            var year = date.getUTCFullYear().toString(),
                month = ('0' + (date.getUTCMonth() + 1)).slice(-2);;
            return url.join(webapp.root, util.format(webapp.posts, language, year, month, slug));
        }
    }

};

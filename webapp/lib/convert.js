/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var util = require('util');
var paths = require('path');
var url = require('url');
var config = require('../config/index.es6');
var PAGES = 'pages';
var POSTS = 'posts';
var locales = config.get('locales');
var db = {
        index: config.get('db:index')
    };
var github = {
        language: config.get('github:language'),    // "%s/"
        pages: config.get('github:' + PAGES),       // "pages"
        posts: config.get('github:' + POSTS),       // "posts"
        markdown: config.get('github:markdown'),    // "%s.md"
        menu: config.get('github:menu'),
        index: config.get('github:index')
    };
var webapp = {
        root: config.get('uris:webapp:root'),       // "http://localhost:3000",
        pages: config.get('uris:webapp:' + PAGES),  // "/%s/%s"
        posts: config.get('uris:webapp:' + POSTS)   // "/%s/posts/%s/%s/%s"
    };
var SEPARATOR = '\\/';
var ANY_BETWEEN_SEPARATORS = util.format('[^%s]+', SEPARATOR);
var MATCH_BETWEEN_SEPARATORS = util.format('(%s)', ANY_BETWEEN_SEPARATORS);
var SITE_URL_2_LANGUAGE = url.resolve(webapp.root, webapp.pages).replace(new RegExp(SEPARATOR, 'g'), SEPARATOR);
var RX_SITE_URL_2_LANGUAGE = new RegExp('^' + util.format(SITE_URL_2_LANGUAGE, MATCH_BETWEEN_SEPARATORS, MATCH_BETWEEN_SEPARATORS));
var RX_MARKDOWN = new RegExp(util.format(config.get('github:markdown'), '') + '$');
var RX_PATH_2_LANGUAGE = new RegExp('^' + util.format(github.language, MATCH_BETWEEN_SEPARATORS));
var PATH_2_SECTION = url.resolve(github.language, '%s').replace(new RegExp(SEPARATOR, 'g'), SEPARATOR);
var RX_PATH_2_SECTION = new RegExp('^' + util.format(PATH_2_SECTION, ANY_BETWEEN_SEPARATORS, MATCH_BETWEEN_SEPARATORS));
var RX_PATH_2_SLUG = new RegExp(util.format(github.markdown, MATCH_BETWEEN_SEPARATORS) + '$');

/**
 * A github path comprises 3 portions:
 * - a portion from which a language can be extracted
 * - a portion determining the type: page or post
 * - a portion determining the file
 */

module.exports = {

    /**
     * Check that path is a markdown file
     * @param path
     * @returns {boolean}
     */
    isMarkdown: function (path) {
        return RX_MARKDOWN.test(path);
    },

    /**
     * Check that path is a menu.json file
     * @param path
     * @returns {boolean}
     */
    // isMenu: function (path) {
    //    return RX_MENU.test(path);
    // },

    /**
     * Returns the menu path for a designated language
     * @param language
     * @returns {*}
     */
    getMenuPath: function (language) {
        return url.resolve(util.format(github.language, language), github.menu);
    },

    /**
     * Returns a language root directory on Github
     * @param language
     * @returns {*}
     */
    getLanguageDir: function (language) {
        return util.format(github.language, language);
    },

    /**
     * Returns a page path on Github
     * @param language
     * @param slug
     */
    getPagePath: function (language, slug) {
        return url.resolve(
            util.format(github.language, language),
            github.pages + '/' + (slug || 'index') + '.md' // TODO Could use normalize to convert // into /
        );
    },

    /**
     * Returns post root dir on Github
     * @param language
     */
    getPostDir: function (language) {
        return url.resolve(util.format(github.language, language), github.posts);
    },


    /**
     * Returns the index path for a designated language
     * @param language
     * @returns {*}
     */
    getIndexPath: function (language) {
        return paths.join(__dirname, util.format(db.index, language));
    },

    /**
     * Returns the index directory
     * @param language
     * @returns {*}
     */
    getIndexDir: function () {
        return paths.join(__dirname, paths.dirname(db.index));
    },

    /**
     * Extracts language from index file name
     * @param fileName
     */
    index2language: function (fileName) {
        for (var i = 0; i < locales.length; i++) {
            if (fileName === module.exports.getIndexPath(locales[i])) {
                return locales[i];
            }
        }
    },

    /* jscs: disable requireCamelCaseOrUpperCaseIdentifiers */

    /**
     * Extracts language from a site url
     * @param path
     * @returns {*}
     */
    site_url2language: function (path) {
        /* jscs: enable requireCamelCaseOrUpperCaseIdentifiers */
        var matches = path.match(RX_SITE_URL_2_LANGUAGE);
        if (Array.isArray(matches) && matches.length > 1) {
            return matches[1];
        }
    },

    /**
     * Extracts language from a github path
     * @param path
     * @returns {*}
     */
    path2language: function (path) {
        var matches = path.match(RX_PATH_2_LANGUAGE);
        if (Array.isArray(matches) && matches.length === 2) {
            return matches[1];
        }
    },

    /**
     * Extracts section from a github path
     * @param path
     * @returns {*}
     */
    path2section: function (path) {
        var matches = path.match(RX_PATH_2_SECTION);
        if (Array.isArray(matches) && matches.length === 2) {
            var section = matches[1];
            if (section === github.pages) {
                return PAGES; // name (not value) of webapp pages config key in json file
            } else if (section === github.posts) {
                return POSTS; // name (not value) of webapp posts config key in json file
            }
        }
    },

    /**
     * Extracts slug from a github path
     * @param path
     * @returns {*}
     */
    path2slug: function (path) {
        // TODO: Consider using https://github.com/dodo/node-slug
        var matches = path.match(RX_PATH_2_SLUG);
        if (Array.isArray(matches) && matches.length === 2) {
            return matches[1];
        }
    },

    /* jscs: disable requireCamelCaseOrUpperCaseIdentifiers */

    /**
     * Returns a site url from a github path
     * @param path
     * @param date
     */
    path2site_url: function (path, date) {
        /* jscs: enable requireCamelCaseOrUpperCaseIdentifiers */
        var language = module.exports.path2language(path);
        var section = module.exports.path2section(path);
        var slug = module.exports.path2slug(path);
        if (section === PAGES) {
            if (slug === 'index') {
                slug = '';
            }
            return url.resolve(webapp.root, util.format(webapp.pages, language, slug));
        } else if (section === POSTS && typeof date !== 'undefined') {
            if (typeof date === 'string') {
                date = new Date(date);
            }
            var year = date.getUTCFullYear().toString();
            var month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
            return url.resolve(webapp.root, util.format(webapp.posts, language, year, month, slug));
        }
    }
};

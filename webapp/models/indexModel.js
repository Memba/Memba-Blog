/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var util = require('util'),
    convert = require('../lib/convert'),
    db = require('../lib/db'),
    cache = {
        authors: {},
        categories: {},
        months: {}
    };

module.exports = {

    /**
     * Return all index entries
     * @param language
     * @param callback
     */
    getIndex: function(language, callback) {
        db[language].find({}, callback);
    },

    /**
     * Search index by site_url
     * @param site_url
     * @param callback
     */
    findBySiteUrl: function(site_url, callback) {
        var language = convert.site_url2language(site_url);
        db[language].find({site_url: new RegExp('^' + site_url, 'i')}, callback);
    },

    /**
     * Search index by path
     * @param path
     * @param callback
     */
    findByPath: function(path, callback) {
        var language = convert.path2language(path);
        db[language].find({path: path}, callback);
    },

    /**
     * Get grouped categories
     * @param language
     * @param callback
     */
    groupByCategory: function(language, callback) {
        if (cache.categories[language]) {
            callback(null, cache.categories[language]);
        } else {
            db[language].group(
                {
                    key: { category: 1 },
                    reduce: function (curr, result) {
                        result.count++;
                    },
                    //TODO consider adding cond to limit to posts
                    initial: { count: 0 }
                },
                function(error, categories) {
                    if (!error && categories) {
                        cache.categories[language] = categories;
                        callback(null, categories);
                    } else {
                        callback(error);
                    }
                }
            );
        }
    },

    /**
     * Get grouped authors
     * @param language
     * @param callback
     */
    groupByAuthor: function(language, callback) {
        if (cache.authors[language]) {
            callback(null, cache.authors[language]);
        } else {
            db[language].group(
                {
                    key: { author: 1, avatar_url: 1 },
                    reduce: function (curr, result) {
                        result.count++;
                    },
                    //TODO consider adding cond to limit to posts
                    initial: { count: 0 }
                },
                function(error, authors) {
                    if (!error && authors) {
                        cache.authors[language] = authors;
                        callback(null, authors);
                    } else {
                        callback(error);
                    }
                }
            );
        }
    },

    /**
     * Get grouped year/months
     * @param path
     * @param callback
     */
    groupByYearMonth: function(language, callback) {
        if (cache.months[language]) {
            callback(null, cache.months[language]);
        } else {
            db[language].group(
                {
                    keyf: function (doc) {
                        var date = new Date(doc.creation_date);
                        return {
                            year: date.getUTCFullYear(),
                            month: date.getUTCMonth()
                        };
                    },
                    reduce: function (curr, result) {
                        result.count++;
                    },
                    //TODO consider adding cond to limit to posts
                    initial: { count: 0 }
                },
                function(error, months) {
                    if (!error && months) {
                        cache.months[language] = months;
                        callback(null, months);
                    } else {
                        callback(error);
                    }
                }
            );
        }
    },

    /**
     * Reset cache
     */
    resetCache: function() {
        cache = {
            authors: {},
            categories: {},
            months: {}
        };
    }

};

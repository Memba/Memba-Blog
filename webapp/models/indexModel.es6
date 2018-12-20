/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const convert = require('../lib/convert');
const db = require('../lib/db');
const utils = require('../lib/utils.es6');

let cache = {
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
    getIndex(language, callback) {
        if (db[language] && typeof db[language].find === 'function') {
            db[language].find({}, callback);
        } else {
            callback(
                new Error(`db collection not found for language ${language}`)
            );
        }
    },

    /**
     * Search index by site_url
     * @param site_url
     * @param query
     * @param callback
     */
    // eslint-disable-next-line camelcase
    findBySiteUrl(site_url, query, callback) {
        const language = convert.site_url2language(site_url);
        // eslint-disable-next-line no-param-reassign
        query = utils.deepExtend(query, {
            // eslint-disable-next-line camelcase
            site_url: new RegExp(`^${site_url}`, 'i')
        });
        if (db[language] && typeof db[language].find === 'function') {
            db[language].find(query, callback);
        } else {
            callback(
                new Error(`db collection not found for language ${language}`)
            );
        }
    },

    /**
     * Search index by path
     * @param path
     * @param query
     * @param callback
     */
    findByPath(path, query, callback) {
        const language = convert.path2language(path);
        if (utils.isObject(query) && Object.keys(query).length) {
            if (query.q) {
                // escape any non word/space character
                const search = query.q.replace(/([^\w\s])/gi, '\\$&');
                // eslint-disable-next-line no-param-reassign
                query.text = new RegExp(search, 'ig');
                // eslint-disable-next-line no-param-reassign
                delete query.q;
            }
        } else {
            // eslint-disable-next-line no-param-reassign
            query = { path };
        }
        if (db[language] && typeof db[language].find === 'function') {
            db[language].find(query, callback);
        } else {
            callback(
                new Error(`db collection not found for language ${language}`)
            );
        }
    },

    /**
     * Get grouped categories
     * @param language
     * @param callback
     */
    groupByCategory(language, callback) {
        if (cache.categories[language]) {
            callback(null, cache.categories[language]);
        } else if (db[language] && typeof db[language].group === 'function') {
            db[language].group(
                {
                    key: { category: 1 },
                    cond: {
                        path: new RegExp(
                            `^${convert.getPostDir(language)}`,
                            'i'
                        )
                    }, // we only want posts
                    reduce(curr, result) {
                        // eslint-disable-next-line no-param-reassign
                        result.count += 1;
                    },
                    initial: { count: 0 }
                },
                (error, categories) => {
                    if (!error && categories) {
                        cache.categories[language] = categories;
                        callback(null, categories);
                    } else {
                        callback(error);
                    }
                }
            );
        } else {
            callback(
                new Error(`db collection not found for language ${language}`)
            );
        }
    },

    /**
     * Get grouped authors
     * @param language
     * @param callback
     */
    groupByAuthor(language, callback) {
        if (cache.authors[language]) {
            callback(null, cache.authors[language]);
        } else if (db[language] && typeof db[language].group === 'function') {
            db[language].group(
                {
                    key: { author: 1, avatar_url: 1 },
                    cond: {
                        path: new RegExp(
                            `^${convert.getPostDir(language)}`,
                            'i'
                        )
                    }, // we only ant posts
                    reduce(curr, result) {
                        // eslint-disable-next-line no-param-reassign
                        result.count += 1;
                    },
                    initial: { count: 0 }
                },
                (error, authors) => {
                    if (!error && authors) {
                        cache.authors[language] = authors;
                        callback(null, authors);
                    } else {
                        callback(error);
                    }
                }
            );
        } else {
            callback(
                new Error(`db collection not found for language ${language}`)
            );
        }
    },

    /**
     * Get grouped year/months
     * @param language
     * @param callback
     */
    groupByYearMonth(language, callback) {
        if (cache.months[language]) {
            callback(null, cache.months[language]);
        } else if (db[language] && typeof db[language].group === 'function') {
            db[language].group(
                {
                    keyf(doc) {
                        const date = new Date(doc.creation_date);
                        return {
                            year: date.getUTCFullYear(),
                            month: date.getUTCMonth()
                        };
                    },
                    cond: {
                        path: new RegExp(
                            `^${convert.getPostDir(language)}`,
                            'i'
                        )
                    }, // we only ant posts
                    reduce(curr, result) {
                        // eslint-disable-next-line no-param-reassign
                        result.count += 1;
                    },
                    initial: { count: 0 }
                },
                (error, months) => {
                    if (!error && months) {
                        cache.months[language] = months;
                        callback(null, months);
                    } else {
                        callback(error);
                    }
                }
            );
        } else {
            callback(
                new Error(`db collection not found for language ${language}`)
            );
        }
    },

    /**
     * Reset cache
     */
    resetCache() {
        cache = {
            authors: {},
            categories: {},
            months: {}
        };
    }
};

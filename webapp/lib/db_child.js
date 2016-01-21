/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var fs = require('fs');
var paths = require('path');
var util = require('util');
var async = require('async');
var i18n = require('i18n');
var config = require('../config');
var convert = require('./convert');
var github = require('./github');
var logger = require('./logger');
var markdown = require('./markdown');
var utils = require('./utils');
var indexPath = paths.join(__dirname, config.get('db:index'));
var indexDir = paths.dirname(indexPath);
var inProgress = {};

// i18n: it is a child process so it needs to be configured too
i18n.configure({
    locales: config.get('locales'), // ['en', 'fr'],
    directory: paths.join(__dirname,  '../locales'),
    objectNotation: true // Use hierarchies in locales.json files
});

/**
 * format an index entry (and update Github contents accordingly)
 * @param response
 * @param callback
 */
function formatIndexEntry(response, callback) {

    /**
     * Update guthub content with yml head
     * @param updateCallback
     */
    function update(updateCallback) {
        var out = '---\n';
        for (var key in head) {
            if (head.hasOwnProperty(key) && head[key]) {
                out += key + ': ' + head[key] + '\n';
            }
        }
        out += '---\n' + body;
        github.updateContent(path, out, sha, updateCallback);
    }

    /* This function's cyclomatic complexity is too high. */
    /* jshint -W074 */

    /**
     * Add default meta tags to yml head
     * @param head
     * @returns {*}
     */
    function metaFormat() {
        /* jshint maxcomplexity: 8 */
        if (!head.category) {
            head.category = i18n.__('meta.category');
            dirty = true;
        }
        if (!head.description) {
            head.description = i18n.__('meta.description');
            dirty = true;
        }
        if (!head.icon) {
            head.icon = i18n.__('meta.icon');
            dirty = true;
        }
        if (!head.keywords) {
            head.keywords = i18n.__('meta.keywords');
            dirty = true;
        }
        if (!head.language) {
            head.language = convert.path2language(path); // i18n.__('locale');
            dirty = true;
        }
        if (!head.title) {
            head.title = i18n.__('meta.title');
            dirty = true;
        }
        if (!head.uuid) {
            head.uuid = utils.uuid();
            dirty = true;
        }
    }
    /* jshint +W074 */

    /**
     * Read commits to add system data to yml head
     * @param systemCallback
     */
    function systemFormat(systemCallback) {
        /* jscs: disable requireCamelCaseOrUpperCaseIdentifiers */
        if (head.author && head.author_url && head.avatar_url && head.creation_date && head.edit_url && head.site_url /*&& yml.update_date*/) {
            /* jscs: enable requireCamelCaseOrUpperCaseIdentifiers */
            formatted = utils.deepExtend({ text: body }, head);
            if (dirty) {
                update(function (error, data) {
                    systemCallback(error, error instanceof Error ? undefined : formatted);
                });
            } else {
                systemCallback(null, formatted);
            }
        } else {
            github.getCommits(path, function (error, commits) {
                if (!error && Array.isArray(commits)) {
                    var first = commits[commits.length - 1];
                    // last = commits[0];
                    head.author = first.commit.author.name;
                    /* jscs: disable requireCamelCaseOrUpperCaseIdentifiers */
                    head.author_url = first.author.html_url;
                    head.avatar_url = first.author.avatar_url;
                    head.creation_date = first.commit.author.date;
                    head.edit_url = response.html_url;
                    head.site_url = convert.path2site_url(path, head.creation_date);
                    // TODO: update_date will never be updated because it will always be found in the yml portion of the github file
                    // yml.update_date = last.commit.author.date;
                    /* jscs: enable requireCamelCaseOrUpperCaseIdentifiers */
                    formatted = utils.deepExtend({ text: body }, head);
                    // console.dir(formatted);
                    update(function (error, data) {
                        systemCallback(error, error instanceof Error ? undefined : formatted);
                    });
                } else {
                    systemCallback(error || new Error('Getting Github commits for `' + path + '` returned an unexpected value'));
                }
            });
        }
    }

    var buf = new Buffer(response.content, 'base64');
    var content = buf.toString();
    var path = response.path;
    // var name = response.name;
    var sha = response.sha;
    var head = markdown.head(content);
    var body = markdown.body(content);
    var dirty = false;
    var formatted;
    metaFormat();
    systemFormat(callback);
}

/**
 * Exports for mocha testing
 */
module.exports = {

    /**
     * Get a formatted index entry
     * @param path
     * @param callback
     */
    getIndexEntry: function (path, callback) {
        logger.info({
            message: 'Indexing ' + path,
            module: 'lib/db_child',
            method: 'getIndexEntry'
        });
        if (!convert.isMarkdown(path)) {
            return callback(new Error('The path to an index entry should designate a markdown file'));
        }
        github.getContent(path, function (error, response) {
            if (!error && response) {
                formatIndexEntry(response, function (error, indexEntry) {
                    if (!error && indexEntry) {
                        indexEntry.path = path;
                        callback(null, indexEntry);
                    } else {
                        callback(error);
                    }
                });
            } else {
                callback(error);
            }
        });
    },

    /**
     * Build an index array (This is the recursive function)
     * @param dir
     * @param callback
     */
    buildIndex: function (dir, callback) {
        github.getContent(dir, function (error, entries) {
            if (!error && Array.isArray(entries)) {
                var index = [];
                // TODO prefer async.each but http://stackoverflow.com/questions/19576601/github-api-issue-with-file-upload
                async.eachSeries(
                    entries,
                    function (entry, eachCallback) {
                        // Only process markedown files
                        if (entry.type === 'file' && convert.isMarkdown(entry.path)) {
                            // process markdown yml for indexation
                            module.exports.getIndexEntry(entry.path, function (error, indexEntry) {
                                if (!error && indexEntry) {
                                    index.push(indexEntry);
                                    eachCallback();
                                } else {
                                    eachCallback(error);
                                }
                            });
                        } else if (entry.type === 'dir') {
                            // recursive inside directory
                            module.exports.buildIndex(entry.path, function (error, subindex) {
                                if (!error && Array.isArray(subindex)) {
                                    index = index.concat(subindex);
                                    eachCallback();
                                } else {
                                    eachCallback(error);
                                }
                            });
                        } else {
                            // ignore other types of files
                            eachCallback();
                        }
                    },
                    function (error) {
                        if (error) {
                            callback(error);
                        } else {
                            callback(null, index);
                        }
                    }
                );
            } else {
                callback(error || new Error('Getting Github contents for `' + dir + '` returned an unexpected value'));
            }
        });
    },

    /**
     * Create an index on disk (this is the root function)
     * @param language
     * @param callback
     */
    createIndex: function (language, callback) {
        var dir = convert.getLanguageDir(language);
        var indexFile = util.format(indexPath, language);
        logger.debug({
            message: 'Building index ' + indexFile,
            module: 'lib/db_child',
            method: 'createIndex'
        });
        module.exports.buildIndex(dir, function (error, index) {
            if (!error && Array.isArray(index)) {
                // Check that directory exists or create
                if (!fs.existsSync(indexDir)) {
                    logger.debug({
                        message: 'Creating directory ' + indexDir,
                        module: 'lib/db_child',
                        method: 'createIndex'
                    });
                    fs.mkdirSync(indexDir);
                }
                // Save index to disk in directory
                logger.debug({
                    message: 'Writing file ' + indexFile,
                    module: 'lib/db_child',
                    method: 'createIndex'
                    // data: index <-- clutters logs
                });
                fs.writeFile(indexFile, JSON.stringify(index), callback);
            } else {
                callback(error);
            }
        });
    }
};

/**
 * Handler triggered when the worker receives a request to rebuild an index
 */
process.on('message', function (language) {
    if (!inProgress[language]) {
        inProgress[language] = true;
        module.exports.createIndex(language, function (error) {
            inProgress[language] = false;
            if (error) {
                logger.error({
                    message: 'Error creating index in ' + language,
                    module: 'lib/db_child',
                    method: 'process.onmessage',
                    error: error
                });
            } else {
                logger.info({
                    message: 'Done creating index in ' + language,
                    module: 'lib/db_child',
                    method: 'process.onmessage'
                });
            }
        });
    }
});

/**
 * Handler triggered when there is an uncaught exception on the child process (not the main one)
 */
process.on('uncaughtException', function (error) {
    for (var language in inProgress) {
        inProgress[language] = false;
    }
    try {
        logger.critical({
            message: 'Uncaught exception',
            module: 'lib/db_child',
            method: 'process.onuncaughtException',
            error: error
        });
    } catch (exception) {
        console.error(exception);
    }
});

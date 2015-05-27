/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var fs = require('fs'),
    paths = require('path'),
    util = require('util'),
    async = require('async'),
    i18n = require('i18n'),
    config = require('../config'),
    convert = require('./convert'),
    github = require('./github'),
    markdown = require('./markdown'),
    utils = require('./utils'),
    indexPath = paths.join(__dirname, config.get('db:index')),
    indexDir = paths.dirname(indexPath);

// i18n: it is a child process so it needs to be configured too
i18n.configure({
    locales: config.get('locales'), //['en', 'fr'],
    directory: paths.join(__dirname,  '../locales'),
    objectNotation: true //Use hierarchies in locales.json files
});

/**
 * format an index entry (and update Github contents accordingly)
 * @param response
 * @param callback
 */
function formatIndexEntry(response, callback) {

    /**
     * Update guthub content with yml head
     * @param update_cb
     */
    function update(update_cb) {
        var out = '---\n';
        for (var key in head) {
            if (head.hasOwnProperty(key) && head[key]) {
                out += key + ': ' + head[key] + '\n';
            }
        }
        out += '---\n' + body;
        github.updateContent(path, out, sha, update_cb);
    }

    /* This function's cyclomatic complexity is too high. */
    /* jshint -W074 */

    /**
     * Add default meta tags to yml head
     * @param head
     * @returns {*}
     */
    function metaFormat() {
        if (!head.category) {
            head.category = i18n.__('meta.category');
            dirty = true;
        }
        if (!head.description) {
            head.description = i18n.__('meta.description');
            dirty = true;
        }
        if(!head.icon) {
            head.icon = i18n.__('meta.icon');
            dirty = true;
        }
        if (!head.keywords) {
            head.keywords = i18n.__('meta.keywords');
            dirty = true;
        }
        if (!head.language) {
            head.language = convert.path2language(path); //i18n.__('locale');
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
     * @param system_cb
     */
    function systemFormat(system_cb) {
        if(head.author && head.author_url && head.avatar_url && head.creation_date && head.edit_url && head.site_url /*&& yml.update_date*/) {
            formatted = utils.deepExtend({text: body}, head);
            if (dirty) {
                update(function(error, data) {
                    system_cb(error, error instanceof Error ? undefined : formatted);
                });
            } else {
                system_cb(null, formatted);
            }
        } else {
            github.getCommits(path, function(error, commits) {
                if(!error && Array.isArray(commits)) {
                    var first = commits[commits.length - 1];
                    //last = commits[0];
                    head.author = first.commit.author.name;
                    head.author_url = first.author.html_url;
                    head.avatar_url = first.author.avatar_url;
                    head.creation_date = first.commit.author.date;
                    head.edit_url = response.html_url;
                    head.site_url = convert.path2site_url(path, head.creation_date);
                    //TODO: update_date will never be updated because it will always be found in the yml portion of the github file
                    //yml.update_date = last.commit.author.date;
                    formatted = utils.deepExtend({text: body}, head);
                    update(function(error, data) {
                        system_cb(error, error instanceof Error ? undefined : formatted);
                    });
                } else {
                    system_cb(error || new Error('Getting Github commits for `' + path + '` returned an unexpected value'));
                }
            });
        }
    }

    var buf = new Buffer(response.content, 'base64'),
        content = buf.toString(),
        path = response.path,
        //name = response.name,
        sha = response.sha,
        head = markdown.head(content),
        body = markdown.body(content),
        dirty = false,
        formatted;
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
    getIndexEntry: function(path, callback) {
        console.log('Indexing ' + path);
        if(!convert.isMarkdown(path)) {
            return callback(new Error('The path to an index entry should designate a markdown file'));
        }
        github.getContent(path, function (error, response) {
            if (!error && response) {
                formatIndexEntry(response, function(error, indexEntry) {
                    if(!error && indexEntry) {
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
     * Build an index array
     * @param dir
     * @param callback
     */
    buildIndex: function (dir, callback) {
        github.getContent(dir, function (error, entries) {
            if (!error && Array.isArray(entries)) {
                var index = [];
                //TODO prefer async.each but http://stackoverflow.com/questions/19576601/github-api-issue-with-file-upload
                async.eachSeries(
                    entries,
                    function (entry, each_cb) {
                        //Only process markedown files
                        if (entry.type === 'file' && convert.isMarkdown(entry.path)) {
                            //process markdown yml for indexation
                            module.exports.getIndexEntry(entry.path, function (error, indexEntry) {
                                if (!error && indexEntry) {
                                    index.push(indexEntry);
                                    each_cb();
                                } else {
                                    each_cb(error);
                                }
                            });
                        } else if (entry.type === 'dir') {
                            //recursive inside directory
                            module.exports.buildIndex(entry.path, function (error, subindex) {
                                if (!error && Array.isArray(subindex)) {
                                    index = index.concat(subindex);
                                    each_cb();
                                } else {
                                    each_cb(error);
                                }
                            });
                        } else {
                            //ignore other types of files
                            each_cb();
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
     * Create an index on disk
     * @param language
     * @param callback
     */
    createIndex: function(language, callback) {
        var dir = convert.getLanguageDir(language),
            indexFile = util.format(indexPath, language);
        //TODO logger
        console.log('Building index ' + indexFile);
        module.exports.buildIndex(dir, function (error, index) {
            if (!error && Array.isArray(index)) {
                //Check that directory exists or create
                if(!fs.existsSync(indexDir)) {
                    console.log('Creating directory ' + indexDir);
                    fs.mkdirSync(indexDir);
                }
                //Save index to disk in directory
                console.log('Writing file ' + indexFile);
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
process.on('message', function(language){
    module.exports.createIndex(language, function (error) {
        if (error) {
            //TODO logger
            console.log(error);
        } else {
            console.log('Done creating ' + language + ' index');
        }
    });
});

/**
 * Handler triggered when there is an uncaught exception on the child process (not the main one)
 */
process.on('uncaughtException', function(error){
    //TODO .logger
    console.log(error);
});

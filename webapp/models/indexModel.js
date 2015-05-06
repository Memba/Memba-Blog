/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var async = require('async'),
    i18n = require('i18n'),
    convert = require('../lib/convert'),
    cache = require('../lib/cache'),
    github = require('../lib/github'),
    markdown = require('../lib/markdown'),
    utils = require('../lib/utils'),
    ApplicationError = require('../lib/error'),
    RX_NOTFOUND = /404: Not Found$/;


/**
 * format response as cache object with YML
 * @param response
 * @param callback
 */
function formatResponse(response, callback) {

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
    function coreFormat() {
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
            head.language = i18n.__('locale');
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

    var buf = new Buffer(response.content, 'base64'),
        content = buf.toString(),
        path = response.path,
        //name = response.name,
        sha = response.sha,
        head = markdown.head(content),
        body = markdown.body(content),
        dirty = false,
        formatted;
    coreFormat();
    if(head.author && head.author_url && head.avatar_url && head.creation_date && head.edit_url && head.site_url /*&& yml.update_date*/) {
        formatted = utils.deepExtend({text: body}, head);
        if (dirty) {
            update(function(error, data) {
                callback(error, error instanceof Error ? undefined : formatted);
            });
        } else {
            callback(null, formatted);
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
                    callback(error, error instanceof Error ? undefined : formatted);
                });
            } else {
                callback(error || new Error('Getting Github commits for `' + path + '` returned an unexpected value'));
            }
        });
    }
}


/**
 * Build an index array
 * @param dir
 * @param callback
 */
function buildIndex(dir, callback) {
    github.getContent(dir, function(error, entries) {
        if (!error && Array.isArray(entries)) {
            var index = [];
            //TODO prefer async.each but http://stackoverflow.com/questions/19576601/github-api-issue-with-file-upload
            async.eachSeries(
                entries,
                function (entry, each_cb) {
                    //Only process markedown files
                    if (entry.type === 'file' && convert.isMarkdown(entry.path)) {
                        //process markdown yml for indexation
                        module.exports.getIndexEntry(entry.path, function(error, indexEntry) {
                            if(!error && indexEntry) {
                                index.push(indexEntry);
                                each_cb();
                            } else {
                                each_cb(error);
                            }
                        });
                    } else if (entry.type === 'dir') {
                        //recursive inside directory
                        buildIndex(entry.path, function(error, subindex) {
                            if(!error && Array.isArray(subindex)) {
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
}


module.exports = {

    /**
     * Get index entry
     * @param path
     * @param callback
     */
    getIndexEntry: function(path, callback) {
        if(!convert.isMarkdown(path)) {
            return callback(new Error('The path to an index entry should designate a markdown file'));
        }
        github.getContent(path, function (error, response) {
            if (!error && response) {
                formatResponse(response, function(error, data) {
                    if(!error && data) {
                        data.path = path;
                        callback(null, data);
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
     * Get localized index
     * @param language
     * @param callback
     */
    getIndex: function (language, callback) {
        //TODO: check language against locales (see menu)
        var index = cache.getIndex(language);
        if (index) {
            callback(null, index);
        } else {
            github.getContent(convert.getIndexPath(language), function (error, response) {
                if (!error && response) {
                    var buf = new Buffer(response.content, 'base64'),
                        content = buf.toString(),
                        index = JSON.parse(content);
                    if (cache.isEnabled()) {
                        cache.setIndex(language, index);
                    }
                    callback(null, index);
                } else if (error instanceof Error && RX_NOTFOUND.test(error.message)) {
                    module.exports.createIndex(language, function(error, index) {
                        if(!error && index) {
                            if (cache.isEnabled()) {
                                cache.setIndex(language, index);
                            }
                            callback(null, index);
                        } else {
                            callback(error);
                        }
                    });
                } else {
                    callback(error);
                }
            });
        }
    },

    /**
     * Create localized index
     * @param language
     * @param callback
     */
    createIndex: function(language, callback) {
        buildIndex(convert.getLanguageDir(language), function(error, index) {
            if(!error && index) {
                github.createContent(convert.getIndexPath(language), JSON.stringify(index), function(error, response) {
                    if(!error && response) {
                        callback(null, index);
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
     * Update localized index
     * @param dir
     * @param sha
     * @param callback
     */
    updateIndex: function(dir, sha, callback) {
        //TODO
        callback();
    },

    /**
     * Search index for content by site_url
     * @param site_url
     * @param callback
     */
    findContentBySiteUrl: function(site_url, callback) {
        var language = convert.site_url2language(site_url);
        module.exports.getIndex(language, function(error, index) {
            if (!error && Array.isArray(index)) {
                var results = index.filter(function(content) {
                    return (content.site_url.indexOf(site_url) === 0);
                });
                if(Array.isArray(results)) {
                    callback(null, results);
                } else {
                    callback(null, []);
                }
            } else {
                callback(error || new ApplicationError('Index is not the expected array of content data'));
            }
        });
    },

    /**
     * Search index for content by path
     * @param path
     * @param callback
     */
    findContentByPath: function(path, callback) {
        var language = convert.path2language(path);
        module.exports.getIndex(language, function(error, index) {
            if (!error && Array.isArray(index)) {
                var results = index.filter(function(content) {
                    return (content.path === path);
                });
                if(Array.isArray(results)) {
                    callback(null, results);
                } else {
                    callback(null, []);
                }
            } else {
                callback(error || new ApplicationError('Index is not the expected array of content data'));
            }
        });
    }

};

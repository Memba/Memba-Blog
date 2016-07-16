/**
 * Copyright (c) 2013-2016 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var fs = require('fs');
var util = require('util');
var path = require('path');
var chokidar = require('chokidar');
var config = require('../config');
var convert = require('./convert');
var logger = require('./logger');
var utils = require('./utils');
var locales = config.get('locales');
var indexer;

/**
 * Fork the indexer as a child process
 */
if (typeof indexer === 'undefined') {
    // @see https://youtrack.jetbrains.com/issue/WEB-1919
    // @see http://stackoverflow.com/questions/16840623/how-to-debug-node-js-child-forked-process
    // @see http://stackoverflow.com/questions/19252310/how-to-fork-a-child-process-that-listens-on-a-different-debug-port-than-the-pare
    var execArgv = process.execArgv.slice();
    if (Array.isArray(execArgv) && execArgv.length > 0 && typeof execArgv[0] === 'string') {
        var matches = execArgv[0].match(/^--debug-brk=([0-9]+)$/);
        if (Array.isArray(matches) && matches.length > 1) {
            // execArgv[0] = '--debug-brk=' + (parseInt(matches[1], 10) + 1); // option 1
            process.execArgv[0] = '--debug-brk=' + (parseInt(matches[1], 10) + 1); // option 2
        }
    }
    // @see https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
    // option 1 does not work (here above and here below) but undocumented option 2 works
    // indexer = require('child_process').fork(path.join(__dirname, 'db_child.js'), undefined, { execArgv: execArgv }); // option 1
    indexer = require('child_process').fork(path.join(__dirname, 'db_child.js')); // option 2
    logger.info({
        message: 'Forked db_child indexing process with execArgv:',
        module: 'lib/db',
        method: 'none',
        execArgv: execArgv
    });
}

/**
 * The chokidar file watcher loads the index when it is ready
 */
chokidar.watch(convert.getIndexDir()).on('all', function (event, path) {
    logger.info({
        message: event + ' event on ' + path,
        module: 'lib/db',
        method: 'chokidar.watch'
    });
    if (/^(add|change)$/i.test(event)) {
        var language = convert.index2language(path);
        if (locales.indexOf(language) > -1) {
            db[language].load();
        }
    }
});

/**
 * Collection class
 * @param locale
 * @constructor
 */
var Collection = function (locale) {
    this.locale = locale;
    this.data = [];
};

/**
 * Read the index from file on disk
 */
Collection.prototype.load = function () {
    var indexFile = convert.getIndexPath(this.locale);
    try {
        var buf = fs.readFileSync(indexFile);
        var data = JSON.parse(buf.toString());
        if (Array.isArray(data) && data.length) {
            this.data = data;
        }
        logger.info({
            message: 'Index ' + this.locale + ' loaded with ' + this.data.length + ' entries',
            module: 'lib/db',
            method: 'Collection.prototype.load'
            // data: this.data.slice(0, 1) <-- clutters logs
        });
    } catch (exception) {
        logger.error({
            message: 'Error loading index from ' + indexFile,
            module: 'lib/db',
            method: 'Collection.prototype.load',
            data: this.data.slice(0, 1)
        });
        if (exception.code === 'ENOENT') {
            // if index file not found, reindex
            this.reindex();
        } else if (!(exception instanceof SyntaxError)) {
            // e.g. JSON.parse('') throws SyntaxError
            throw exception;
        }
    }
};

/**
 * Request from child process to rebuild the index
 * Once built, the file watcher will be triggered to reload the index
 */
Collection.prototype.reindex = function () {
    if (indexer) {
        logger.info({
            message: 'Reindexation triggered for ' + this.locale,
            module: 'lib/db',
            method: 'Collection.prototype.reindex'
        });
        indexer.send(this.locale);
    } else {
        logger.critical({
            message: 'The db_child process has not been forked to allow reindexation.',
            module: 'lib/db',
            method: 'Collection.prototype.reindex'
        });
    }
};

/**
 * Function to translate a mongo-like Query into an array filter
 * @param data
 * @param query
 * @returns {*}
 */
function mongoQuery(data, query) {
    query = query || {};

    /* Blocks are nested too deeply. */
    /* jshint -W073 */

    /* This function's cyclomatic complexity is too high. */
    /* jshint -W074 */

    var results = data.filter(function (indexEntry) {
        var include = true;
        for (var prop in query) {
            if (query.hasOwnProperty(prop)) {
                var criterion = query[prop];
                if (criterion instanceof RegExp) {
                    include = include && criterion.test(indexEntry[prop]);
                } else if (utils.isObject(criterion)) {
                    for (var operator in criterion) {
                        if (criterion.hasOwnProperty(operator)) {
                            // @see http://docs.mongodb.org/manual/reference/operator/query/
                            switch (operator) {
                                case '$eq':
                                    include = include && (indexEntry[prop] === criterion[operator]);
                                    break;
                                case '$gt':
                                    include = include && (indexEntry[prop] > criterion[operator]);
                                    break;
                                case '$gte':
                                    include = include && (indexEntry[prop] >= criterion[operator]);
                                    break;
                                case '$lt':
                                    include = include && (indexEntry[prop] < criterion[operator]);
                                    break;
                                case '$lte':
                                    include = include && (indexEntry[prop] <= criterion[operator]);
                                    break;
                                case '$ne':
                                    include = include && (indexEntry[prop] !== criterion[operator]);
                                    break;
                                case '$regex':
                                    include = include && criterion[operator].test(indexEntry[prop]);
                                    break;
                            }
                        }
                    }
                } else {
                    include = include && (indexEntry[prop] === criterion);
                }
            }
            if (!include) {
                break;
            }
        }
        return include;
    });

    /* jshint +W074 */
    /* jshint +W073 */

    return results.sort(function (a, b) {
        /* jscs: disable requireCamelCaseOrUpperCaseIdentifiers */
        if (a.creation_date < b.creation_date) {
            return 1;
        }
        if (a.creation_date > b.creation_date) {
            return -1;
        }
        /* jscs: enable requireCamelCaseOrUpperCaseIdentifiers */
        return 0;
    });
}


/**
 * Find data in the index
 * @param query
 * @param callback
 */
Collection.prototype.find = function (query, callback) {
    var results = mongoQuery(this.data, query);
    // Note: Results are not sorted
    callback(null, results);
};


/**
 * Group
 * @see http://docs.mongodb.org/manual/reference/method/db.collection.group/
 * @param query
 * @param callback
 */
Collection.prototype.group = function (query, callback) {

    /**
     * Return a group from key or keyf
     * @param doc
     * @returns {{}}
     */
    function getGroup(doc) {
        var grp = {};
        if (query.keyf) {
            grp = query.keyf(doc);
        } else if (query.key) {
            for (var prop in query.key) {
                if (query.key.hasOwnProperty(prop) && query.key[prop]) {
                    grp[prop] = doc[prop];
                }
            }
        }
        return grp;
    }

    var data = [];
    var groups = [];

    // Filter data with query.cond
    if (utils.isObject(query.cond)) {
        data = mongoQuery(this.data, query.cond);
    } else {
        data = this.data;
    }

    /* This function's cyclomatic complexity is too high. */
    /* jshint -W074 */

    // Now iterate over data to aggregate groups
    data.forEach(function (indexEntry) {
        var group;
        var groupToFind = getGroup(indexEntry);
        for (var i = 0; i < groups.length; i++) {
            var found = true;
            for (var prop in groupToFind) {
                if (groupToFind.hasOwnProperty(prop)) {
                    found = found && groups[i][prop] === groupToFind[prop];
                }
            }
            if (found) {
                group = groups[i];
                break;
            }
        }
        if (!group) {
            group = utils.deepExtend({}, query.initial, groupToFind);
            groups.push(group);
        }
        if (typeof query.reduce === 'function') {
            query.reduce(indexEntry, group);
        }
    });

    /* jshint +W074 */

    callback(null, groups);
};


/**
 * Database
 * @type {{reindex: Function}}
 */
logger.info({
    message: 'Loading indexes',
    module: 'lib/db',
    method: 'none',
    execArgv: execArgv
});
var db = {};
locales.forEach(function (locale) {
    db[locale] = new Collection(locale);
    // Note: for whatever reason without a timer, the indexing does not always start
    // because teh child process does not receive the message sent
    setTimeout(function () {
        db[locale].load();
    }, 0);
});
module.exports = db;

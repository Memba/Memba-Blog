/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var fs = require('fs'),
    util = require('util'),
    path = require('path'),
    chokidar = require('chokidar'),
    config = require('../config'),
    locales = config.get('locales'),
    convert = require('./convert'),
    utils = require('./utils'),
    indexer;

/**
 * Fork the indexer as a child process
 */
if(typeof indexer === 'undefined') {
    // Issue with mocha tests
    // See https://github.com/mochajs/mocha/issues/769
    // https://youtrack.jetbrains.com/issue/WEB-1919
    // See http://stackoverflow.com/questions/16840623/how-to-debug-node-js-child-forked-process
    // See http://stackoverflow.com/questions/19252310/how-to-fork-a-child-process-that-listens-on-a-different-debug-port-than-the-pare
    var execArgv = process.execArgv.slice();
    if (Array.isArray(execArgv) && execArgv.length > 0 && typeof execArgv[0] === 'string') {
        var matches = execArgv[0].match(/^--debug-brk=([0-9]+)$/);
        if (Array.isArray(matches) && matches.length > 1) {
            execArgv[0] = '--debug-brk=' + (parseInt(matches[1], 10) + 1);
        }
    }
    console.log('Forking db_child indexing process with execArgv:');
    console.dir(execArgv);
    indexer = require('child_process').fork(path.join(__dirname, 'db_child.js'), undefined, {execArgv: execArgv});
}

/**
 * The chokidar file watcher loads the index when it is ready
 */
chokidar.watch(convert.getIndexDir()).on('all', function(event, path) {
    console.log(event, path);
    if(/^(add|change)$/i.test(event)) {
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
var Collection = function(locale) {
  this.locale = locale;
  this.data = [];
};

/**
 * Read the index from file on disk
 */
Collection.prototype.load = function() {
    try {
        var indexFile = convert.getIndexPath(this.locale);
        console.log('Loading ' + indexFile);
        var buf = fs.readFileSync(indexFile),
            data = JSON.parse(buf.toString());
        if (Array.isArray(data)) {
            this.data = data;
            console.log('Index ' + this.locale + ' loaded with ' + data.length + ' entries');
        }
    } catch(exception) {
        console.dir(exception);
        if(exception.code === 'ENOENT') {
            //if index file not found, reindex
            console.log('Index file not found');
            this.reindex();
        } else {
            throw exception;
        }
    }
};

/**
 * Request from child process to rebuild the index
 * Once built, the file watcher will be triggered to reload the index
 */
Collection.prototype.reindex = function() {
    console.log('Reindexation triggered for ' + this.locale);
    if (indexer) {
        indexer.send(this.locale);
    } else {
        console.log('The db_child process has not been forked for reindexation.');
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
    var results = data.filter(function(indexEntry) {
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
                            switch(operator) {
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
        }
        return include;
    });
    return results;
}


/**
 * Find data in the index
 * @param query
 * @param callback
 */
Collection.prototype.find = function(query, callback) {
    var results = mongoQuery(this.data, query);
    //Note: Results are not sorted
    callback(null, results);
};


/**
 * Group
 * @see http://docs.mongodb.org/manual/reference/method/db.collection.group/
 * @param query
 * @param callback
 */
Collection.prototype.group = function(query, callback) {

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

    var data = [],
        groups = [];

    //Filter data with query.cond
    if (utils.isObject(query.cond)) {
        data = mongoQuery(this.data, query.cond);
    } else {
        data = this.data;
    }

    //Now iterate over data to aggregate groups
    data.forEach(function(indexEntry) {
        var group, groupToFind = getGroup(indexEntry);
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
        if(!group) {
            group = utils.deepExtend({}, query.initial, groupToFind);
            groups.push(group);
        }
        if (typeof query.reduce === 'function') {
            query.reduce(indexEntry, group);
        }
    });
    callback(null, groups);
};


/**
 * Database
 * @type {{reindex: Function}}
 */
var db = {};
console.log('Loading indexes');
locales.forEach(function(locale){
    db[locale] = new Collection(locale);
    //Note: on Windows, chokidar triggers watch events that load our json databases when the webapp starts
    //on Linux (at least on Tavis-CI), our json databases need to be loaded explicitly
    if (process.env.OS !== 'Windows_NT') {
        db[locale].load();
    }
});
module.exports = db;

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
    utils = require('./utils');

// IMPORTANT: fork the indexer as a child process
// Issue with mocha tests
// See https://github.com/mochajs/mocha/issues/769
// https://youtrack.jetbrains.com/issue/WEB-1919
// See http://stackoverflow.com/questions/16840623/how-to-debug-node-js-child-forked-process
// See http://stackoverflow.com/questions/19252310/how-to-fork-a-child-process-that-listens-on-a-different-debug-port-than-the-pare
var execArgv = process.execArgv.slice();
if (Array.isArray(execArgv) && execArgv.length > 0 && typeof execArgv[0] === 'string') {
    var matches = execArgv[0].match(/^--debug-brk=([0-9]+)$/);
    if(Array.isArray(matches) && matches.length > 1) {
        execArgv[0] = '--debug-brk=' + (parseInt(matches[1], 10) + 1);
    }
}
console.log('Forking child indexing process');
console.dir(execArgv);
var indexer = require('child_process').fork(path.join(__dirname, 'db_child.js'), undefined, { execArgv: execArgv });

/**
 * The chokidar file watcher loads the index when it is ready
 */
chokidar.watch(convert.getIndexDir()).on('all', function(event, path) {
    console.log(event, path);
    if(/^add$|^change$/i.test(event)) {
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
        console.log('load ' + indexFile);
        var buf = fs.readFileSync(indexFile),
            data = JSON.parse(buf.toString());
        if (Array.isArray(data)) {
            this.data = data;
        }
    } catch(exception) {
        //TODO logger
        console.log(exception);
        if(exception.code === 'ENOENT') {
            //if index file not found, reindex
            this.reindex();
        }
    }
};

/**
 * Request from child process to rebuild the index
 * Once built, the file watcher will be triggered to reload the index
 */
Collection.prototype.reindex = function() {
    try {
        indexer.send(this.locale);
    } catch (exception) {
        //TODO logger
    }
};

/**
 * Find data in the index
 * @param query
 * @param callback
 */
Collection.prototype.find = function(query, callback) {
    query = query || {};
    var results = this.data.filter(function(indexEntry) {
        var ret = true;
        for (var prop in query) {
            if (query.hasOwnProperty(prop)) {
                var criterion = query[prop];
                if (criterion instanceof RegExp) {
                    ret = ret && criterion.test(indexEntry[prop]);
                } else if (utils.isObject(criterion)) {
                    for (var operator in criterion) {
                        if (criterion.hasOwnProperty(operator)) {
                            // @see http://docs.mongodb.org/manual/reference/operator/query/
                            switch(operator) {
                                case '$eq':
                                    ret = ret && (indexEntry[prop] === criterion[operator]);
                                    break;
                                case '$gt':
                                    ret = ret && (indexEntry[prop] > criterion[operator]);
                                    break;
                                case '$gte':
                                    ret = ret && (indexEntry[prop] >= criterion[operator]);
                                    break;
                                case '$lt':
                                    ret = ret && (indexEntry[prop] < criterion[operator]);
                                    break;
                                case '$lte':
                                    ret = ret && (indexEntry[prop] <= criterion[operator]);
                                    break;
                                case '$ne':
                                    ret = ret && (indexEntry[prop] !== criterion[operator]);
                                    break;
                                case '$regex':
                                    ret = ret && criterion[operator].test(indexEntry[prop]);
                                    break;
                            }
                        }
                    }
                } else {
                    ret = ret && (indexEntry[prop] === criterion);
                }
            }
        }
        return ret;
    });
    //TODO: always sort by creation date (reversed)
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

    var groups = [];

    //Note: we iterate on this.data
    //but if we were to implement query.cond we would iterate on the result of the find method using query.cond
    this.data.forEach(function(indexEntry) {
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
locales.forEach(function(locale){
    db[locale] = new Collection(locale);
    //db[locale].load();
});
module.exports = db;

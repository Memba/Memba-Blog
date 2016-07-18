/**
 * Copyright (c) 2013-2016 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var assert = require('assert');
var config = require('../config');
var utils = require('./utils');
var environment = config.environment || 'production';
var labels = {
        debug: '[DEBUG]',
        info: '[INFO] ',
        warn: '[WARN] ',
        error: '[ERROR]',
        critical: '[CRIT] '
    };
var level = config.get('level') || 0;
var levels = {
        debug: 1,
        info: 2,
        warn: 4,
        error: 5,
        critical: 6
    };
var eq;
var qt;
var prefix;
var separator;

if (config.production) {
    eq = '=';
    qt = '"';
    prefix = '\t';
    separator = '\t';
} else {
    eq = ': ';
    qt = '';
    prefix = ' ';
    separator = '; ';
}

/* This function has too many statements. */
/* jshint -W071 */

/* This function's cyclomatic complexity is too high. */
/* jshint -W074 */

/**
 * Capture entry.request if existing
 * @param entry
 * @returns {*}
 */
function capture(entry) {
    assert.ok(typeof entry === 'object', '`entry` is expected to be an object');
    if (entry instanceof Error) {
        // JSON.stringify(new Error('Oops)) === {}
        // So we need to capture the properties we want
        entry = {
            error: entry,
            message: entry.message
        };
        if (entry.error.originalError) {
            // entry.error.originalError is not necessarily an instance of Error because we use deepExtend
            // if (entry.error.originalError instanceof Error) {
            entry.originalError = entry.error.originalError;
            delete entry.error.originalError;
            entry.originalMessage = entry.originalError.message;
            entry.stack = entry.originalError.stack;
        } else {
            entry.stack = entry.error.stack.split('\n').join(',')
        }
    }
    var application = config.get('application:name');
    if (application) {
        entry.application = application;
    }
    if (process.env.HOSTNAME) {
        entry.host = process.env.HOSTNAME;
    }
    if (entry.request) {
        var request = entry.request;
        // utils.deepExtends adds undefined values and we do not want to clutter our logs with undefined
        if (request.header && request.headers['user-agent']) {
            entry.agent = request.headers['user-agent'];
        }
        if (request.ip) {
            entry.ip = request.ip;
        }
        if (request.query) {
            entry.query = request.query;
        }
        if (request.trace) {
            entry.trace = request.trace;
        }
        if (request.url) {
            entry.url = request.url;
        }
        delete entry.request;
    }
    // entry.date = (new Date()).toISOString();
    // Note: such an entry is not only ready to print to console but also to be sent as JSON
    return entry;
}

/**
* Print a log entry to the console
* Note: we have discarded pretty solutions because they do not print well in Webstorm console
* @param entry
* @param label
*/
function print(entry, label) {
    /* jshint maxstatements: 44 */
    /* jshint maxcomplexity: 30 */
    var message = (isNaN(Date.parse(entry.date)) ? new Date() : new Date(entry.date)).toISOString();
    message += prefix + label;
    var first = true;
    if (entry.application) {
        message += (first ? prefix : separator) + 'application' + eq + qt + entry.application + qt;
        first = false;
    }
    if (entry.host) {
        message += (first ? prefix : separator) + 'host' + eq + qt + entry.host + qt;
        first = false;
    }
    if (entry.message) {
        message += (first ? prefix : separator) + 'message' + eq + qt + entry.message + qt;
        first = false;
    }
    if (entry.originalMessage) {
        message += (first ? prefix : separator) + 'originalMessage' + eq + qt + entry.originalMessage + qt;
        first = false;
    }
    if (entry.module) {
        message += (first ? prefix : separator) + 'module' + eq + qt + entry.module + qt;
        first = false;
    }
    if (entry.method) {
        message += (first ? prefix : separator) + 'method' + eq + qt + entry.method + qt;
        first = false;
    }
    if (entry.data) {
        try {
            message += (first ? prefix : separator) + 'data' + eq + qt + JSON.stringify(entry.data) + qt;
        } catch (ex) {
            if (typeof entry.data.toString === 'function') {
                message += (first ? prefix : separator) + 'data' + eq + qt + entry.data.toString() + qt;
            }
        }
        first = false;
    }
    if (entry.url) {
        message += (first ? prefix : separator) + 'url' + eq + qt + entry.url + qt;
        first = false;
    }
    if (entry.query) {
        try {
            message += (first ? prefix : separator) + 'query' + eq + qt + JSON.stringify(entry.query) + qt;
        } catch (ex) {
            if (typeof entry.data.toString === 'function') {
                message += (first ? prefix : separator) + 'query' + eq + qt + entry.query.toString() + qt;
            }
        }
        first = false;
    }
    if (entry.trace) {
        message += (first ? prefix : separator) + 'trace' + eq + qt + entry.trace + qt;
        first = false;
    }
    if (entry.ip) {
        message += (first ? prefix : separator) + 'ip' + eq + qt + entry.ip + qt;
        first = false;
    }
    if (entry.agent) {
        message += (first ? prefix : separator) + 'agent' + eq + qt + entry.agent + qt;
        first = false;
    }
    if (entry.stack) {
        message += (first ? prefix : separator) + 'stack' + eq + qt + entry.stack.split('\n').join(', ').replace(/\s+/g, ' ') + qt;
    }
    console.log(message);
    /*
    if (entry.error) {
        console.error(entry.error);
    }
    if (entry.originalError) {
        console.error(entry.originalError);
    }
    */
}

/* jshint +W074 */
/* jshint +W071 */

module.exports = exports = {

    /**
     * Export level for tests
     */
    level: level,

    /**
     * Log a debug entry
     * Only output if debug===true
     * @param entry
     */
    debug: function (entry) {
        if (exports.level > levels.debug) {
            return false;
        }
        print(capture(entry), labels.debug);
        return true;
    },

    /**
     * Log an info entry
     * @param entry
     */
    info: function (entry) {
        if (exports.level > levels.info) {
            return false;
        }
        print(capture(entry), labels.info);
        return true;
    },

    /**
     * Log a warning entry
     * @param entry
     */
    warn: function (entry) {
        if (exports.level > levels.warn) {
            return false;
        }
        print(capture(entry), labels.warn);
        return true;
    },

    /**
     * Log an error entry
     * @param entry
     */
    error: function (entry) {
        if (exports.level > levels.error) {
            return false;
        }
        print(capture(entry), labels.error);
        return true;
    },

    /**
     * Log a critical entry
     * @param entry
     */
    critical: function (entry) {
        if (exports.level > levels.critical) {
            return false;
        }
        print(capture(entry), labels.critical);
        return true;
    },

    /**
     * Shortcut for critical
     */
    crit: function(entry) {
        exports.critical(entry);
    }

};

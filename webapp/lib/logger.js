/**
 * Copyright (c) 2013-2017 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var assert = require('assert');
var chalk = require('chalk');
var config = require('../config');

var RX_LEVELS = /^(debug|info|warn|error|crit)$/i;
var levels = {
        debug: 1,
        info: 2,
        warn: 4,
        error: 5,
        crit: 6
    };
var eq = ': ';
var qt = '';
var prefix = ' ';
var separator = '; ';

chalk.debug = chalk.gray;
chalk.info = chalk.green;
chalk.warn = chalk.yellow;
chalk.error = chalk.magenta;
chalk.crit = chalk.red;

/* This function has too many statements. */
/* jshint -W071 */

/* This function's cyclomatic complexity is too high. */
/* jshint -W074 */

/**
 * Format log entry with request data
 * @param entry
 * @param level
 * @returns {*}
 */
function format(entry, level) {
    assert.ok(typeof entry === 'object', '`entry` is expected to be an object');
    assert.ok(RX_LEVELS.test(level), '`level` is expected to be any of `debug`, `info`, `warn`, `error` or `crit`');
    // JSON.stringify(new Error('Oops)) === {} and we do not want to clutter our logs with 'undefined'
    // So we need to capture the properties we want after testing that they exist
    var ret = {};
    // Message
    if (entry.message) {
        ret.message = entry.message;
    } else if (entry.error instanceof Error) {
        ret.message = entry.error.message;
    }
    // Level
    ret.level = level.toLowerCase();
    // Application
    var application = config.get('application:name');
    if (application) {
        ret.application = application;
    }
    if (entry.module) {
        ret.module = entry.module;
    }
    if (entry.method) {
        ret.method = entry.method;
    }
    // Host
    if (process.env.HOSTNAME) {
        ret.host = process.env.HOSTNAME;
    }
    var request = entry.request;
    // IP Address
    if (request && request.ip) {
        ret.ip = request.ip;
    }
    // User Agent
    if (request && request.header && request.headers['user-agent']) {
        ret.agent = request.headers['user-agent'];
    }
    // Trace
    if (entry.trace) {
        ret.trace = entry.trace;
    } else if (request && request.trace) {
        ret.trace = request.trace;
    }
    // Url
    if (entry.url) {
        ret.url = entry.url;
    } else if (request && request.url) {
        ret.url = request.url;
    }
    // Query
    if (entry.query) {
        ret.query = entry.query;
    } else if (request && request.query) {
        ret.query = request.query;
    }
    // Error message and stack
    if (entry.stack) {
        if (entry.message) {
            ret.error = entry.message;
        }
        ret.stack = entry.stack;
    } else if (entry.error && entry.error.stack) {
        if (entry.error.message) {
            ret.error = entry.error.message;
        } else if (entry.error.originalError && entry.error.originalError.message) {
            // entry.error.originalError is not necessarily an instance of Error because we use deepExtend
            // TODO: CHeck that this actually occurs
            ret.error = entry.error.originalError.message;
        }
        ret.stack = entry.error.stack;
    }
    // entry.date = (new Date()).toISOString();
    // Note: such an entry is not only ready to print to console but also to be sent as JSON
    return ret;
}

/**
* Print a log entry to the console
* Note: we have discarded coloured solutions because they do not print well in Webstorm console
* @param entry
*/
function print(entry) {
    /* jshint maxstatements: 49 */
    /* jshint maxcomplexity: 37 */
    var message = (isNaN(Date.parse(entry.date)) ? new Date() : new Date(entry.date)).toISOString();
    message += prefix + '[' + entry.level.toUpperCase() + ']' + (entry.level.length > 4 ? '' : ' ');
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
    console.log(chalk.supportsColor ? chalk[entry.level || 'debug'](message) : message);
    return message;
}

/* jshint +W074 */
/* jshint +W071 */

module.exports = exports = {

    /**
     * Log a debug entry
     * Only output if debug===true
     * @param entry
     */
    debug: function (entry) {
        // Note: config.get('level') cannot be cached in a module variable because it is not available when the module loads when loading production.json from AWS S3
        if ((config.get('level') || 0) > levels.debug) {
            return false;
        }
        print(format(entry, 'debug'));
        return true;
    },

    /**
     * Log an info entry
     * @param entry
     */
    info: function (entry) {
        if ((config.get('level') || 0) > levels.info) {
            return false;
        }
        print(format(entry, 'info'));
        return true;
    },

    /**
     * Log a warning entry
     * @param entry
     */
    warn: function (entry) {
        if ((config.get('level') || 0) > levels.warn) {
            return false;
        }
        print(format(entry, 'warn'));
        return true;
    },

    /**
     * Log an error entry
     * @param entry
     */
    error: function (entry) {
        if ((config.get('level') || 0) > levels.error) {
            return false;
        }
        print(format(entry, 'error'));
        return true;
    },

    /**
     * Log a critical entry
     * @param entry
     */
    critical: function (entry) {
        if (exports.level > levels.crit) {
            return false;
        }
        var plugins = require('../plugins');
        var formatted = format(entry, 'crit');
        print(formatted);
        plugins.emit('slack', {
            slack: {
                channel: config.get('slack:channels:weberrors'),
                level: formatted.level,
                text: formatted.message
            },
            model: formatted
        });
        return true;
    },

    /**
     * Shortcut for critical
     */
    crit: function (entry) {
        exports.critical(entry);
    }

};

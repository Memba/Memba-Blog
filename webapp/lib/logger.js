/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var assert = require('assert'),
    config = require('../config'),
    utils = require('./utils'),
    DEBUG = config.get('DEBUG') || false,
    LABEL = {
        DEBUG: '[DEBUG]',
        INFO: '[INFO] ',
        WARN: '[WARN] ',
        ERROR: '[ERROR]',
        CRIT: '[CRIT] '
    },
    level = config.get('level') || 0,
    LEVEL = {
        //See https://github.com/logentries/le_node#log-levels
        DEBUG: 1,
        INFO: 2,
        WARN: 4,
        ERROR: 5,
        CRIT: 6
    },
    EQUAL = ' = ',
    FIRST = '  ',
    SEPARATOR = '  |  ';

/**
 * Process entry.request if existing
 * @param entry
 * @returns {*}
 */
function process(entry) {
    if (typeof entry === 'string') {
        entry = { message: entry };
    } else if (entry instanceof Error) {
        entry = { error: entry };
    } else if (!utils.isObject(entry)) {
        entry = { data: entry };
    }
    if (entry.error instanceof Error) {
        //We need to do that because JSON.stringify(new Error('Oops)) === {} and is not sent to logentries
        entry.message = entry.error.message;
        if (entry.error.originalError instanceof Error) {
            entry.originalError = entry.error.originalError;
            delete entry.error.originalError;
            entry.originalMessage = entry.originalError.message;
            entry.stack = entry.originalError.stack;
        } else {
            entry.stack = entry.error.stack;
        }
    }
    if(entry.request) {
        var request = entry.request;
        //utils.deepExtends adds undefined values and we do not want to clutter our logs with undefined
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
    //entry.date = (new Date()).toISOString();
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
    var message = label,
        first = true;
    if (entry.message) {
        message += (first ? FIRST : SEPARATOR) + 'message' + EQUAL + entry.message;
        first = false;
    }
    if (entry.originalMessage) {
        message += (first ? FIRST : SEPARATOR) + 'originalMessage' + EQUAL + entry.originalMessage;
        first = false;
    }
    if (entry.module) {
        message += (first ? FIRST : SEPARATOR) + 'module' + EQUAL + entry.module;
        first = false;
    }
    if (entry.method) {
        message += (first ? FIRST : SEPARATOR) + 'method' + EQUAL + entry.method;
        first = false;
    }
    if (entry.stack) {
        message += (first ? FIRST : SEPARATOR) + 'stack' + EQUAL + entry.stack;
        first = false;
    }
    if (entry.data) {
        try {
            message += (first ? FIRST : SEPARATOR) + 'data' + EQUAL + JSON.stringify(entry.data);
        } catch(exception) {
            if(typeof entry.data.toString === 'function') {
                message += (first ? FIRST : SEPARATOR) + 'data' + EQUAL + entry.data.toString();
            }
        }
    }
    if (entry.url) {
        message += (first ? FIRST : SEPARATOR) + 'url' + EQUAL + entry.url;
        first = false;
    }
    if (entry.query) {
        message += (first ? FIRST : SEPARATOR) + 'query' + EQUAL + entry.query;
        first = false;
    }
    if (entry.trace) {
        message += (first ? FIRST : SEPARATOR) + 'trace' + EQUAL + entry.trace;
        first = false;
    }
    if (entry.ip) {
        message += (first ? FIRST : SEPARATOR) + 'ip' + EQUAL + entry.ip;
        first = false;
    }
    if (entry.agent) {
        message += (first ? FIRST : SEPARATOR) + 'agent' + EQUAL + entry.agent;
        first = false;
    }
    console.log(message);
    if (entry.error) {
        console.error(entry.error);
    }
    if (entry.originalError) {
        console.error(entry.originalError);
    }
}

/**
 * Extend a function
 * @param func
 * @param props
 * @returns {*}
 */
function extend(func, props) {
    for (var prop in props) {
        if (props.hasOwnProperty(prop)) {
            func[prop] = props[prop];
        }
    }
    return func;
}

module.exports = {

    /**
     * Export DEBUG for tests
     */
    DEBUG: DEBUG,

    /**
     * Export level for tests
     */
    level: level,

    /**
     * Provide an assert that is transparent in production code
     */
    assert: (function() {
        if(module.exports.DEBUG) {
            return assert;
        } else {
            return extend(
                function() {},
                {
                    fail: function() {},
                    ok: function() {},
                    equal: function() {},
                    notEqual: function() {},
                    deepEqual: function() {},
                    notDeepEqual: function() {},
                    strictEqual: function() {},
                    notStrictEqual: function() {},
                    throws: function() {},
                    doesNotThrow: function() {},
                    ifError: function() {}
                }
            );
        }
    }()),

    /**
     * Log a debug entry
     * Only output if DEBUG===true
     * @param entry
     */
    debug: function(entry) {
        if (module.exports.level > LEVEL.DEBUG) {
            return false;
        }
        print(process(entry), LABEL.DEBUG);
        return true;
    },

    /**
     * Log an info entry
     * @param entry
     */
    info: function(entry) {
        if (module.exports.level > LEVEL.INFO) {
            return false;
        }
        print(process(entry), LABEL.INFO);
        return true;
    },

    /**
     * Log a warning entry
     * @param entry
     */
    warn: function(entry) {
        if (module.exports.level > LEVEL.WARN) {
            return false;
        }
        print(process(entry), LABEL.WARN);
        return true;
    },

    /**
     * Log an error entry
     * @param entry
     */
    error: function(entry) {
        if (module.exports.level > LEVEL.ERROR) {
            return false;
        }
        print(process(entry), LABEL.ERROR);
        return true;
    },

    /**
     * Log a critical entry
     * @param entry
     */
    critical: function(entry) {
        if (module.exports.level > LEVEL.CRIT) {
            return false;
        }
        print(process(entry), LABEL.CRIT);
        return true;
    }

};

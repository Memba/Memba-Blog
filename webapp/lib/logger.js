/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

// More info at:
// https://github.com/logentries/le_node
// https://logentries.com/doc/nodejs/

var config = require('../config'),
    utils = require('./utils'),
    LogEntries = require('le_node'),
    logger = new LogEntries({ token: config.get('logentries:server:token')}),
    debug = config.get('debug');

/**
 * Process entry.request if existing
 * @param entry
 * @returns {*}
 */
function process(entry) {
    if(entry.request) {
        var request = entry.request;
        entry = utils.deepExtend(entry, {
            agent: request.headers['user-agent'],
            ip: request.ip,
            query: request.query,
            sessionId: request.sessionId,
            url: request.url
        });
        delete entry.request;
    }
    return entry;
}

module.exports = {

    /**
     * Display message in the console
     * @param entry
     * @private
     */
    _console: function(entry) {
        console.dir(entry, { showHidden: false, depth: 4, colors: true });
    },

    /**
     * Log to logentries
     * @param level
     * @param entry
     * @private
     */
    _log: function(level, entry) {
        entry = process(entry);
        module.exports._console(entry);
        logger.log(level, entry);
    },

    /**
     * Log a debug entry
     * Only reach logentries if debug===true
     * @param entry
     */
    debug: function(entry) {
        entry = process(entry);
        module.exports._console(entry);
        if (debug) {
            module.exports._log('debug', process(entry));
        }
    },

    /**
     * Log an info entry
     * @param entry
     */
    info: function(entry) {
        module.exports._log('info', process(entry));
    },

    /**
     * Log a warning entry
     * @param entry
     */
    warning: function(entry) {
        module.exports._log('warning', entry);
    },

    /**
     * Log an error entry
     * @param entry
     */
    error: function(entry) {
        module.exports._log('err', entry);
    },

    /**
     * Log a critical entry
     * @param entry
     */
    critical: function(entry) {
        module.exports._log('crit', entry);
    },

    /**
     * Flush pending logs
     */
    flush: function() {
        logger.closeConnection();
    }

};

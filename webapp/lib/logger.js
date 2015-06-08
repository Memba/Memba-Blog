/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var config = require('../config'),
    utils = require('./utils'),
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
    if(entry.error && entry.error.originalError) {
        entry.originalError = entry.error.originalError;
        delete entry.error.originalError;
    }
    entry.date = (new Date()).toISOString();
    return entry;
}

/**
 * Log to console
 * @param entry
 * @private
 */
function log(entry) {
    // consider using process.stdout.writeln + add colors
    console.log(JSON.stringify(process(entry)));
}

/**
 * Error to console
 * @param entry
 * @private
 */
function error(entry) {
    // consider using process.stderr.writeln
    console.error(JSON.stringify(process(entry)));
}

module.exports = {

    /**
     * Log a debug entry
     * Only output if debug===true
     * @param entry
     */
    debug: function(entry) {
        if (debug) {
            entry.level='DEBUG';
            log(entry);
        }
    },

    /**
     * Log an info entry
     * @param entry
     */
    info: function(entry) {
        entry.level='INFO';
        log(entry);
    },

    /**
     * Log a warning entry
     * @param entry
     */
    warning: function(entry) {
        entry.level='WARN';
        log(entry);
    },

    /**
     * Log an error entry
     * @param entry
     */
    error: function(entry) {
        entry.level='ERROR';
        error(entry);
    },

    /**
     * Log a critical entry
     * @param entry
     */
    critical: function(entry) {
        entry.level='CRIT';
        error(entry);
    }

};

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
    logentries = require('le_node'),
    logger = logentries.logger({ token: config.get('logentries:server:token')});

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

    console: function(entry) {
        //TODO consider more sophisticated presentation with colors
        //TODO we are missing the stack trace!!!!!!!!!!!!!!
        console.dir(entry, { showHidden: false, depth: 4, colors: true });
    },

    info: function(entry) {
        logger.log('info', process(entry));
    },

    warning: function(entry) {
        logger.log('warning', process(entry));
    },

    error: function(entry) {
        entry = process(entry);
        module.exports.console(entry);
        logger.log('err', entry);
    },

    critical: function(entry) {
        entry = process(entry);
        module.exports.console(entry);
        logger.log('crit', entry);
    },

    flush: function() {
        logger.end();
    }

};

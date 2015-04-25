/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jslint node: true */
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
            ip: request.ip,
            url: request.url,
            query: request.query,
            agent: request.headers['user-agent']
        });
        delete entry.request;
    }
    return entry;
}


module.exports = {

    info: function(entry) {
        logger.log('info', process(entry));
    },

    warning: function(entry) {
        logger.log('warning', process(entry));
    },

    error: function(entry) {
        logger.log('err', process(entry));
    },

    critical: function(entry) {
        logger.log('crit', process(entry));
    },

    close: function() {
        //TODO: should we call it when server goes down????????????????????
        logger.end();
    }

};

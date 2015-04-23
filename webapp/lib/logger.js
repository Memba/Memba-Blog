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

var logentries = require('le_node'),
    config = require('../config'),
    logger = logentries.logger({ token: config.get('logentries:server:token')});

module.exports = {

    info: function(entry) {
        logger.log('info', entry);
    },

    warning: function(entry) {
        logger.log('warning', entry);
    },

    error: function(entry) {
        logger.log('err', entry);
    },

    critical: function(entry) {
        logger.log('crit', entry);
    },

    close: function() {
        //TODO: should we call it when server goes down????????????????????
        logger.end();
    }

};

/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var assert = require('assert');
var config = require('../config');
var httpStatus = require('../lib/httpStatus');
var logger = require('../lib/logger');
var utils = require('../lib/utils');

var DEBUG = config.get('debug');
var RX_LEVEL = /^(DEBUG|INFO|WARN|ERROR|CRIT)$/i;

module.exports = {

    /**
     * Add a log entry
     * @param req
     * @param res
     * @param next
     */
    createEntry: function (req, res, next) {

        try {

            // Assert body (after being parsed by body-parser)
            var body = req.body;

            if (utils.isObject(body) &&
                typeof body.date === 'string' &&
                RX_LEVEL.test(body.level) &&
                typeof body.message === 'string') { // We could also check that we have either (i) module + method, or (ii) error stack

                // Read the trace from headers
                req.trace = req.headers['x-trace-id'];

                // Log the request
                body.request = req;
                logger[body.level.toLowerCase()](body);
            }

            // Return ok in all circumstances
            res.status(httpStatus.created).end();

        } catch (ex) {

            // Any error here should be caught to avoid a critical error that restarts the nodejs process
            // See https://github.com/jlchereau/Kidoju-Server/issues/150
            next(ex);

        }

    }
};

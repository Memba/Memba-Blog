/**
 * Copyright (c) 2013-2016 Memba Sarl. All rights reserved.
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
            assert.ok(utils.isObject(body), 'request should have a body that is an object');

            // Check for minimal requirements
            assert.ok(typeof body.date === 'string', 'body should have a date');
            assert.ok(RX_LEVEL.test(body.level), 'body should have a level that is any of `debug`, `info`, `warn`, `error` or `crit`'); // Note: no default level
            assert.ok(typeof body.message === 'string', 'body should have a message');
            // We could also check that we have either (i) module + method, or (ii) error stack

            // Read the trace from headers
            req.trace = req.headers['x-trace-id'];

            // Log the request
            body.request = req;
            logger[body.level.toLowerCase()](body);

            // Return ok
            res.status(httpStatus.created).end();

        } catch (exception) {

            if (DEBUG) {
                next(exception);

            } else {
                // Be silent about exceptions: we do not want to pollute our logs with failed attempts to log
                // res.status(httpStatus.badRequest).end();
                res.status(httpStatus.created).end();
            }
        }
    }
};

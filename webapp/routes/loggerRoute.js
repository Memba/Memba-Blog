/**
 * Copyright (c) 2013-2016 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var assert = require('assert');

var httpStatus = require('../lib/httpStatus');
var logger = require('../lib/logger');
var utils = require('../lib/utils');

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
            assert.ok(false);

            // Read the trace from headers
            req.trace = req.headers['x-trace-id'];

            // Check errors but be silent about them

            // Log the request
            logger.info({
                message: 'create a summary',
                method: 'createSummary',
                module: 'routes/summaryRoute',
                request: req
            });

            res.status(httpStatus.created).end();

        } catch (exception) {
            next(exception);
        }
    }
};

/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

'use strict';

const httpStatus = require('../lib/httpStatus.es6');
const CONSTANTS = require('../lib/constants.es6');
const logger = require('../lib/logger.es6');
const { isObject } = require('../lib/utils.es6');

module.exports = {
    /**
     * Add a log entry
     * @param req
     * @param res
     * @param next
     */
    createEntry(req, res /* , next */) {
        const { body } = req;

        if (
            isObject(body) &&
            typeof body.date === 'string' &&
            CONSTANTS.RX_LEVEL.test(body.level) &&
            typeof body.message === 'string'
        ) {
            // We need at least a date, a known level and a message to log

            // Read the trace id and app scheme from headers
            req.trace = req.headers['x-trace-id'];
            req.scheme = req.headers['x-app-scheme'];

            // Log the request with the body
            body.request = req;
            logger[body.level.toLowerCase()](body);
        }

        // Return ok in all circumstances
        res.status(httpStatus.created).end();
    }
};

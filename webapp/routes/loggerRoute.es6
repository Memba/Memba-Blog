/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const httpStatus = require('../lib/httpStatus.es6');
const CONSTANTS = require('../lib/constants.es6');
const logger = require('../lib/logger');
const utils = require('../lib/utils.es6');

module.exports = {
    /**
     * Add a log entry
     * @param req
     * @param res
     * @param next
     */
    createEntry(req, res, next) {
        try {
            const { body } = req;

            if (
                utils.isObject(body) &&
                typeof body.date === 'string' &&
                CONSTANTS.RX_LEVEL.test(body.level) &&
                typeof body.message === 'string'
            ) {
                // We need at least a date, a known log level and a message to enter a log

                // Read the trace id and app scheme from headers
                req.trace = req.headers['x-trace-id'];
                req.scheme = req.headers['x-app-scheme'];

                // Log the body with the request
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

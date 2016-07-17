/**
 * Copyright (c) 2013-2016 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var logger = require('../lib/logger');

/**
 * Ping route
 * @type {{get: Function}}
 */
module.exports = {

    /**
     * Get handler
     * @param req
     * @param res
     * @param next
     */
    get: function (req, res, next) {

        try {

            // Log the request
            logger.info({
                message: 'get a ping',
                method: 'get',
                module: 'routes/pingRoute',
                request: req
            });

            res.json({ ping: 'OK' });

        } catch (exception) {
            next(exception);
        }

    }
};

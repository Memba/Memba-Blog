/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

'use strict';

const ApplicationError = require('../lib/applicationError.es6');
const logger = require('../lib/logger.es6');

module.exports = {
    /**
     * Returns an error page
     * @param req
     * @param res
     * @param next
     */
    getHtmlPage(req, res, next) {
        // Log the request
        logger.debug({
            message: `get an error \`${req.query.code}\` page`,
            method: 'get',
            module: 'routes/errorRoute',
            request: req
        });
        next(new ApplicationError(parseInt(req.query.code, 10) || 500));
    }
};

/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var ApplicationError = require('../lib/error'),
    logger = require('../lib/logger'),
    utils = require('../lib/utils');

module.exports = {

    /**
     * Error handler
     * @param err
     * @param req
     * @param res
     * @param next //without the next parameter, this is not recognized as a error handler
     */
    handler: function (err, req, res, next) {

        // Note: We want an ApplicationError to get all the properties we need for display and logging
        var error = err, critical = false;
        if (!(err instanceof ApplicationError)) {
            error = new ApplicationError(err);
            // Since this is not an ApplicationError, it is an unexpected exception that we need to fix
            critical = true;
        }
        // Now we have an ApplicationError

        //Ensure a sessionId that we can track in the browser
        if(!req.sessionId) {
            req.sessionId = utils.uuid();
        }

        //Log the error
        var logentry = {
            message: 'displaying an error',
            module: 'middleware/error',
            method: 'handler',
            request: req,
            error: error
        };
        if (critical) {
            logger.critical(logentry);
        } else {
            logger.error(logentry);
        }

        //Display error
        res.status(error.status).render('error', {
            sessionId: req.sessionId,
            description: error.message,
            title: error.title,
            menu: [] //Do not display a menu to avoid any risks of errors fetching the menu, especially if accessing Github fails
        });

    }

};

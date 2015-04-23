/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jslint node: true */
/* jshint node: true */

'use strict';

var logger = require('../lib/logger'),
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

        //We default to error 500
        var error = res.__('errors.500');

        //Then depending on err type
        if (err instanceof Error) { //as when calling next(new Error())

            //TODO: http status.....
            //var error = res.__('errors')[err.message] ? parseInt(err.message) : 500;
            error.description = err.message;

        } else if (typeof err === 'number') { //as when calling next(404);

            if (res.__('errors')[err.toString()]) {
                //Get error from locales json files if available
                error = res.__('errors.' + err);
            } else {
                //If locales are incomplete, display a relevant message to developer
                error.description ('ATTENTION: Missing locale for error #' + err);
            }

       } else {  //as when calling next(message) - should we allow this although useful in development?

            error.title = 'ATTENTION: Cast your error as an error object.';
            if (typeof err === 'string') {
                error.description = err;
            } else {
                error.description = 'The error passed to the error middleware has an unknown type.';
            }
       }

        //Create a sessionId that we can track in the browser
        var sessionId = utils.uuid();

        //Log the error //TODO
        logger.error({
            message: 'requesting a page',
            module: 'routes/pageRoute',
            method: 'getHtmlPage',
            sessionId: sessionId,
            ip: req.ip,
            url: req.url,
            query: req.query,
            agent: req.headers['user-agent']
        });

        //Display error
        res.status(error.status).render('error', {
            sessionId: sessionId,
            description: error.description || 'ATTENTION: Missing error description',
            title: error.title || 'ATTENTION: Missing error title',
            menu: res.locals.getCatalog().header.navbar.menu
        });
    }

};

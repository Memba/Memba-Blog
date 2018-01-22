/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var ApplicationError = require('../lib/error');

module.exports = {

    /**
     * Returns an error page
     * @param req
     * @param res
     * @param next
     */
    getHtmlPage: function (req, res, next) {
        next(new ApplicationError(parseInt(req.query.code, 10) || 500));
    }

};

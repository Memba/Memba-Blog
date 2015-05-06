/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var http = require('http'),
    Url = require('url'),
    ApplicationError = require('../lib/error');

module.exports = {

    /**
     * Validation of month param
     * @param req
     * @param res
     * @param next
     * @param month
     * @returns {*}
     */
    validate: function(req, res, next, month){
        var parsed = parseInt(month, 10);
        if (!/^[0-1][0-9]$/.test(month) || parsed <= 0 || parsed >= 13) {
            //If month is not between 1 and 12, raise an error
            next(new ApplicationError(404));
        } else {
            next();
        }
    }

};

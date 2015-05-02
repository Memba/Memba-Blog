/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var ApplicationError = require('../lib/error');

module.exports = {

    /**
     * Validation of year param
     * @param req
     * @param res
     * @param next
     * @param year
     * @returns {*}
     */
    validate: function(req, res, next, year){
        var parsed = parseInt(year, 10);
        if ((/\/[^\/\.]+\.[\w]{1,5}$/i).test(Url.parse(req.originalUrl).pathname)) {
            //If pathname ends with a file extension (images, stylesheets, scripts, ...), spare bandwidth by returning an empty error for missing assets
            res.status(404).send(http.STATUS_CODES['404']);
        } else if (!/^20[1-2][0-9]$/.test(year) || parsed < 2014 || parsed > (new Date()).getUTCFullYear()) {
            //If year does not make sense, raise an error
            next(new ApplicationError(404));
        } else {
            //otherwise proceed
            next();
        }
    }

};

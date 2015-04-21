/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jslint node: true */
/* jshint node: true */

'use strict';

var error = require('./error');

module.exports = {

    /**
     * Validation of day param
     * @param req
     * @param res
     * @param next
     * @param id
     * @returns {*}
     */
    validate: function(req, res, next, id){
        if (id.match(/^[0-9]{2}$/) === null) {
            return next(new Error(error.codes.BadRequest));
        }
        next();
    }

};

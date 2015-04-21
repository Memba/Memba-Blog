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
     * Validation of language param (valid ISO 639-1 code)
     * See http://en.wikipedia.org/wiki/ISO_639-1
     * @param req
     * @param res
     * @param next
     * @param id
     */
    validate: function(req, res, next, language){
        //If language is not available, redirect to page not found
        if (language === null || !req.getCatalog(language)) {
            return next(new Error(error.codes.NotFound));
        }
        //Otherwise, just set the locale
        res.setLocale(language);
        next();
    }

};

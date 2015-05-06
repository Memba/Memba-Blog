/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var ApplicationError = require('../lib/error');

module.exports = {

    /**
     * Validation of language param (valid ISO 639-1 code)
     * See http://en.wikipedia.org/wiki/ISO_639-1
     * @param req
     * @param res
     * @param next
     * @param language
     */
    validate: function(req, res, next, language){
        if (res.locals.config.locales.indexOf(language) === -1) {
            //If language is not a supported locale, redirect to page not found
            next(new ApplicationError(404));
        } else {
            //Otherwise, just set the locale and proceed
            res.setLocale(language);
            next();
        }
    }

};

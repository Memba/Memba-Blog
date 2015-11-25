/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var ApplicationError = require('../lib/error');
var config = require('../config');
var locales = config.get('locales');

var mongoose;
try {
    mongoose = require('mongoose');
} catch (exception) {
    mongoose = { Types: { ObjectId : { isValid: function (id) { return (/^[a-z0-9]{24}$/).test(id); } } } };
}

module.exports = {

    /**
     * Validation of language param
     * @see http://en.wikipedia.org/wiki/ISO_639-1
     * @param req
     * @param res
     * @param next
     * @param language
     */
    validateLanguage: function (req, res, next, language) {
        // if ((/^[a-z]{2}$/).test(language)) {
        if (locales.indexOf(language) > -1) {
            if (res && typeof res.setLocale === 'function') {
                res.setLocale(language);
            }
            next();
        } else {
            next(new ApplicationError('errors.params.invalidLanguage'));
        }
    },

    /**
     * Validation of provider param
     * @param req
     * @param res
     * @param next
     * @param provider
     */
    validateProvider: function (req, res, next, provider) {
        if (/^(facebook|google|live|twitter)$/.test(provider)) {
            next();
        } else {
            next(new ApplicationError('errors.params.invalidProvider'));
        }
    },

    /**
     * Validation of MongoDB ObjectId param
     * @param req
     * @param res
     * @param next
     * @param id
     */
    validateObjectId: function (req, res, next, id) {
        if (mongoose.Types.ObjectId.isValid(id)) {
            next();
        } else {
            next(new ApplicationError('errors.params.invalidObjectId'));
        }
    },

    /**
     * Validation of month param
     * @param req
     * @param res
     * @param next
     * @param month
     * @returns {*}
     */
    validateMonth: function (req, res, next, month) {
        var parsed = parseInt(month, 10) || -1;
        if (!/^[0-1][0-9]$/.test(month) || parsed <= 0 || parsed >= 13) {
            // If month is not between 1 and 12, raise an error
            next(new ApplicationError('errors.params.invalidMonth'));
        } else {
            next();
        }
    },

    /**
     * Validation of year param
     * @param req
     * @param res
     * @param next
     * @param year
     * @returns {*}
     */
    validateYear: function (req, res, next, year) {
        var parsed = parseInt(year, 10) || -1;
        if (!/^20[1-2][0-9]$/.test(year) || parsed < 2014 || parsed > (new Date()).getUTCFullYear()) {
            // If year does not make sense, raise an error
            next(new ApplicationError('errors.params.invalidYear'));
        } else {
            // otherwise proceed
            next();
        }
    }


};

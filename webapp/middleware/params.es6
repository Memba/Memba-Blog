/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

'use strict';

// const assert = require('assert');
const ApplicationError = require('../lib/applicationError.es6');
const config = require('../config/index.es6');
const CONSTANTS = require('../lib/constants.es6');

const locales = config.get('locales');

let mongoose;
try {
    // eslint-disable-next-line global-require, import/no-unresolved, node/no-missing-require
    mongoose = require('mongoose');
} catch (exception) {
    mongoose = {
        Types: {
            ObjectId: {
                isValid(id) {
                    return CONSTANTS.RX_MONGODB_ID.test(id);
                }
            }
        }
    };
}

module.exports = {
    /**
     * Validation of file id
     * @param req
     * @param res
     * @param next
     * @param fileId
     * @returns {*}
     */
    validateFileId(req, res, next, fileId) {
        // Beware, this regular expression should match the one in routes/fileRoute
        if (CONSTANTS.RX_FILE_ID.test(fileId)) {
            next();
        } else {
            next(new ApplicationError('errors.params.invalidFileId'));
        }
    },

    /**
     * Validation of language param
     * @see http://en.wikipedia.org/wiki/ISO_639-1
     * @param req
     * @param res
     * @param next
     * @param language
     */
    validateLanguage(req, res, next, language) {
        // assert.deepStrictEqual(locales, res.locals.getLocales());
        // if ((/^[a-z]{2}$/).test(language)) {
        if (locales.indexOf(language) > -1) {
            if (res && typeof res.setLocale === 'function') {
                // @see https://github.com/mashpie/i18n-node/issues/202
                // @see https://github.com/mashpie/i18n-node/issues/203
                // request backend
                // req.setLocale(language);
                // request template
                // req.locals.setLocale(language);
                // response backend
                res.setLocale(language);
                // response template
                res.locals.setLocale(language);
            }
            next();
        } else {
            next(new ApplicationError('errors.params.invalidLanguage'));
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
    validateMonth(req, res, next, month) {
        const parsed = parseInt(month, 10) || -1;
        if (!/^[0-1][0-9]$/.test(month) || parsed <= 0 || parsed >= 13) {
            // If month is not between 1 and 12, raise an error
            next(new ApplicationError('errors.params.invalidMonth'));
        } else {
            next();
        }
    },

    /**
     * Validation of MongoDB ObjectId param
     * @param req
     * @param res
     * @param next
     * @param id
     */
    validateObjectId(req, res, next, id) {
        if (mongoose.Types.ObjectId.isValid(id)) {
            next();
        } else {
            next(new ApplicationError('errors.params.invalidObjectId'));
        }
    },

    /**
     * Validation of provider param
     * @param req
     * @param res
     * @param next
     * @param provider
     */
    validateProvider(req, res, next, provider) {
        if (CONSTANTS.PROVIDERS.indexOf(provider) > -1) {
            next();
        } else {
            next(new ApplicationError('errors.params.invalidProvider'));
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
    validateYear(req, res, next, year) {
        const parsed = parseInt(year, 10) || -1;
        if (
            !/^20[1-2][0-9]$/.test(year) ||
            parsed < 2014 ||
            parsed > new Date().getUTCFullYear()
        ) {
            // If year does not make sense, raise an error
            next(new ApplicationError('errors.params.invalidYear'));
        } else {
            // otherwise proceed
            next();
        }
    }
};

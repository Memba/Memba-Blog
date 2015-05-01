/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

//'use strict';

var utils = require('./utils'),
    i18n = require('i18n'),
    RX_I18N_ERROR = /^errors.[^\s.]+./,
    GENERIC_ERROR = 'errors.generic.';

/**
 * Application error
 * @see http://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript
 * @see hhttps://github.com/Automattic/mongoose/blob/master/lib/error.js
 * @see https://github.com/jaredhanson/passport/blob/master/lib/errors/authenticationerror.js
 * @param error
 * @constructor
 */
function ApplicationError(error) {
    Error.call(this);
    Error.captureStackTrace && Error.captureStackTrace(this, arguments.callee);
    this.name = 'ApplicationError';
    this.i18n = GENERIC_ERROR + 500;
    utils.deepExtend(this, i18n.__(this.i18n));
    if (error instanceof Error) {
        //Important: this is an unexpected error, so we display a generic 500 error and we hide the originalError for logging
        this.originalError = error;
    } else if (utils.isObject(error)) {
        utils.deepExtend(this, error);
    } else if (typeof error === 'string') {
        if (RX_I18N_ERROR.test(error)) {
            this.i18n = error;
            utils.deepExtend(this, i18n.__(error));
        } else {
            this.message = error;
        }
    } else if (typeof error === 'number') {
        this.i18n = GENERIC_ERROR + error;
        utils.deepExtend(this, i18n.__(this.i18n));
    }
}

/**
 * Inherit from `Error`.
 */
// MongooseError.prototype = Object.create(Error.prototype);
// MongooseError.prototype.constructor = Error;
ApplicationError.prototype.__proto__ = Error.prototype;


module.exports = ApplicationError;

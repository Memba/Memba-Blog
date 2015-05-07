/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, strict: false */

//'use strict';     //because arguments.callee is a strict violation

var util = require('util'),
    utils = require('./utils'),
    i18n = require('i18n'),
    RX_I18N_ERROR = /^errors\.[\w]+\./,
    GENERIC_ERROR = 'errors.generic.';

/* This function's cyclomatic complexity is too high. */
/* jshint -W074 */

/**
 * Application error
 * @see http://stackoverflow.com/questions/7310521/node-js-best-practice-exception-handling
 * @see http://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript
 * @see hhttps://github.com/Automattic/mongoose/blob/master/lib/error.js
 * @see https://github.com/jaredhanson/passport/blob/master/lib/errors/authenticationerror.js
 * @param error
 * @param values in the order in which they fill %s in message
 * @constructor
 */
function ApplicationError(error, values) {
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
        //if (i18n.__('errors.generic')[error.toString()]) { //we have a generic error for this number
        this.i18n = GENERIC_ERROR + error;
        utils.deepExtend(this, i18n.__(this.i18n));
        //}
    }
    if(values) {
        this.values = Array.isArray(values) ? values : [values];
        this.message = util.format.apply(util, [this.message].concat(this.values));
    }
}

/* jshint +W074 */

/**
 * Inherit from `Error`.
 */
//ApplicationError.prototype.__proto__ = Error.prototype;
ApplicationError.prototype = Object.create(Error.prototype);
ApplicationError.prototype.constructor = Error;

/**
 * Export ApplicationError
 * @type {ApplicationError}
 */
module.exports = ApplicationError;

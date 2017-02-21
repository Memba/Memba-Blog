/**
 * Copyright (c) 2013-2017 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, strict: false */

// 'use strict';     // because arguments.callee is a strict violation

var assert = require('assert');
var util = require('util');
var utils = require('./utils');
var httpStatus = require('./httpStatus');

var mongoose;
try {
    mongoose = require('mongoose');
} catch (ex) {
    mongoose = { Error: { ValidationError: function () {} } };
}

var i18n;
try {
    i18n = require('i18n');
} catch (ex) {
    i18n = require('./i18n');
}

/* This function's cyclomatic complexity is too high. */
/* jshint -W074 */

/**
 * Application error
 * @param error
 * @constructor
 */
function ApplicationError(error) {
    /* jshint maxcomplexity: 8 */
    Error.call(this);
    /* jshint -W059 */
    /* jshint -W030 */
    Error.captureStackTrace && Error.captureStackTrace(this, arguments.callee);
    /* jshint +W030 */
    /* jshint +W059 */
    this.name = 'ApplicationError';
    if (error instanceof mongoose.Error.ValidationError) {
        // A validation error is a bad request
        this.i18n = 'errors.http.' + httpStatus.badRequest;
        // Note: deepExtend does not copy prototype properties (uses hasOwnProperty?), so we need to ensure we at least get the message, name and stack)
        utils.deepExtend(this, i18n.__(this.i18n), { originalError: { message: error.message, name: error.name, stack: error.stack } }, { originalError: error });
    } else if (error instanceof Error) {
        // Any other error is an internal server error unless there is an error.status
        this.i18n = 'errors.http.' + (typeof error.status === 'number' ? error.status : httpStatus.internalServerError);
        // Note: deepExtend does not copy prototype properties (uses hasOwnProperty?), so we need to ensure we at least get the message, name and stack)
        utils.deepExtend(this, i18n.__(this.i18n), { originalError: { message: error.message, name: error.name, stack: error.stack } }, { originalError: error });
    } else if (utils.isObject(error)) {
        this.i18n = 'errors.http.' + httpStatus.internalServerError;
        utils.deepExtend(this, i18n.__(this.i18n), error);
    } else if (typeof error === 'number') {
        this.i18n = 'errors.http.' + error;
        var httpError = i18n.__(this.i18n);
        assert.ok(utils.isObject(httpError), 'There is no resource for ' + this.i18n);
        utils.deepExtend(this, httpError);
    } else if (typeof error === 'string') {
        var matchError = i18n.__(error);
        if (matchError === error) {
            this.i18n = 'errors.http.' + httpStatus.internalServerError;
            // the following accepts constructions like new ApplicationError('error on value %s of %s', 1, 2)
            utils.deepExtend(this, i18n.__(this.i18n), { message: util.format.apply(undefined, arguments) });
        } else {
            this.i18n = error;
            utils.deepExtend(this, matchError);
        }
    } else {
        throw new Error('ApplicationError created without valid parameter');
    }
}

/* jshint +W074 */

/**
 * Inherit from `Error`.
 */
ApplicationError.prototype = Object.create(Error.prototype);
ApplicationError.prototype.constructor = Error;

/**
 * Export ApplicationError
 * @type {ApplicationError}
 */
module.exports = ApplicationError;

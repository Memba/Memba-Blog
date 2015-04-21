/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jslint node: true */
/* jshint node: true */

'use strict';

function isObject(obj) {
    return '[object Object]' === Object.prototype.toString.call(obj); //((obj instanceof Object) && (typeof obj === 'object'));
}

/**
 * Application error
 * See: https://github.com/LearnBoost/mongoose/blob/3.8.x/lib/error.js
 * @param error
 * @constructor
 */
function ApplicationError(error) {
    Error.call(this);
    //http://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript
    Error.captureStackTrace(this, this.constructor); //arguments.callee); not allowed in strict mode
    this.name = 'ApplicationError';
    if (error instanceof Error) {
        //this.code = error.code || MSG.ERROR_UNKNOWN_WITH_MESSAGE.code;
        //this.status = error.status || MSG.ERROR_UNKNOWN_WITH_MESSAGE.status;
        this.message = error.message;
        this.originalError = error;
    } else if (isObject(error) && error.code && error.status && error.message) {
        //this.code = error.code;
        //this.status = error.status;
        this.message = error.message;
        //} else if ((typeof error === 'string') && (!isNaN(parseInt(error)))) {
    } else if (typeof error === 'string') {
        //this.code = MSG.ERROR_UNKNOWN_WITH_MESSAGE.code;
        //this.status =  MSG.ERROR_UNKNOWN_WITH_MESSAGE.status;
        this.message = error;
    } else {
        //this.code = MSG.ERROR_UNKNOWN.code;
        //this.status = MSG.ERROR_UNKNOWN.status;
        //this.message = MSG.ERROR_UNKNOWN.message;
    }
}

/**
 * Inherit from `Error`.
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/prototype
 */
/* jshint ignore:start */
/* jshint -W103 */
//-W103 does not work, thus ignore: start
//Object.setPrototypeOf(ServiceError.prototype, Error.prototype); <-- does not work in nodejs
//ApplicationError.prototype = Object.create(Error.prototype); <-- works but we do not get the trace
//See: http://nodejs.org/api/util.html#util_util_inherits_constructor_superconstructor
ApplicationError.prototype.__proto__ = Error.prototype; //<-- works but we do not get the trace either
/* jshint +W103 */
/* jshint ignore:end */

/**
 * Expose `ApplicationError`.
 */
module.exports = ApplicationError;

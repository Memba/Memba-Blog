/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jslint node: true */
/* jshint node: true */

'use strict';

// See https://www.joyent.com/developers/node/design/errors
// See http://www.intelligrape.com/blog/2014/06/23/defining-custom-errors-nodejs/
// See https://github.com/lbdremy/node-httperror/blob/master/index.js


var http = require('http'),
    util = require('util'),
    statusCodes = http.STATUS_CODES;


/**
 * Error Class HttpError
 * */
function HttpError(statusCode) {

    // Inheritance
    Error.call(this); //super constructor
    Error.captureStackTrace(this, this.constructor); //super helper method to include stack trace in error object

    this.name = this.constructor.name; //set our function’s name as error name.

    this.code = statusCode;
    this.message = statusCodes[statusCode] || 'Unknown status code';

}

// inherit from Error
util.inherits(HttpError, Error);

//Export the constructor function as the export of this module file.
exports = module.exports = HttpError;

/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* eslint max-classes-per-file: ["error", 3] */

const assert = require('assert');
const path = require('path');
const { format } = require('util');
const config = require('../config/index.es6');
const { deepExtend, isObject } = require('./utils.es6');
const httpStatus = require('./httpStatus.es6');

let mongoose;
try {
    // eslint-disable-next-line global-require,import/no-unresolved,node/no-missing-require
    mongoose = require('mongoose');
} catch (ex) {
    class CastError extends Error {
        constructor() {
            super();
            this.name = 'CastError';
            this.status = 400;
        }
    }
    class ValidationError extends Error {
        constructor() {
            super();
            this.name = 'ValidationError';
            this.status = 400;
        }
    }
    // These are generic errors which can be used without mongoose
    mongoose = { Error: { CastError, ValidationError } };
}

let i18n;
try {
    // eslint-disable-next-line global-require,import/no-unresolved,node/no-missing-require
    i18n = require('i18n');
    // might not be configured in mocha tests, so we test locales to check that
    const locales = i18n.getLocales();
    if (Array.isArray(locales) && locales.length === 0) {
        i18n.configure({
            locales: config.get('locales'), // ['en', 'fr'],
            directory: path.join(__dirname, '../locales'),
            objectNotation: true, // Use hierarchies in locales.json files
        });
    }
} catch (ex) {
    // eslint-disable-next-line global-require,import/no-unresolved,node/no-missing-require
    i18n = require('./i18n.es6');
}

/**
 * Application error
 * @class
 */
class ApplicationError extends Error {
    /**
     * Constructor
     * @constructor
     * @param args
     */
    constructor(...args) {
        super(...args);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApplicationError);
        }
        this.name = 'ApplicationError';
        const error = args[0];
        if (
            error instanceof mongoose.Error.ValidationError ||
            error instanceof mongoose.Error.CastError
        ) {
            // A validation error is a bad request
            this.i18n = `errors.http.${httpStatus.badRequest}`;
            deepExtend(
                this,
                i18n.__(this.i18n),
                { originalError: error },
                {
                    originalError: {
                        // Note: deepExtend does not copy prototype properties (uses hasOwnProperty?),
                        // so we need to ensure we at least get the message, name and stack)
                        message: error.message || error._message || '',
                        name: error.name,
                        stack: error.stack,
                    },
                }
            );
        } else if (error instanceof Error && typeof error.code === 'number') {
            this.i18n = `errors.http.${error.code}`;
            deepExtend(
                this,
                i18n.__(this.i18n),
                { originalError: error },
                {
                    originalError: {
                        // Note: deepExtend does not copy prototype properties (uses hasOwnProperty?),
                        // so we need to ensure we at least get the message, name and stack)
                        message: error.message || error._message || '',
                        name: error.name,
                        stack: error.stack,
                    },
                }
            );
        } else if (error instanceof Error && typeof error.status === 'number') {
            this.i18n = `errors.http.${error.status}`;
            deepExtend(
                this,
                i18n.__(this.i18n),
                { originalError: error },
                {
                    originalError: {
                        // Note: deepExtend does not copy prototype properties (uses hasOwnProperty?),
                        // so we need to ensure we at least get the message, name and stack)
                        message: error.message || error._message || '',
                        name: error.name,
                        stack: error.stack,
                    },
                }
            );
        } else if (error instanceof Error) {
            this.i18n = `errors.http.${httpStatus.internalServerError}`;
            deepExtend(
                this,
                i18n.__(this.i18n),
                { originalError: error },
                {
                    originalError: {
                        // Note: deepExtend does not copy prototype properties (uses hasOwnProperty?),
                        // so we need to ensure we at least get the message, name and stack)
                        message: error.message || error._message || '',
                        name: error.name,
                        stack: error.stack,
                    },
                }
            );
        } else if (isObject(error)) {
            this.i18n = `errors.http.${httpStatus.internalServerError}`;
            deepExtend(this, i18n.__(this.i18n), error);
        } else if (typeof error === 'number') {
            this.i18n = `errors.http.${error}`;
            const httpError = i18n.__(this.i18n);
            assert.ok(
                isObject(httpError),
                `There is no resource for ${this.i18n}`
            );
            deepExtend(this, httpError);
        } else if (typeof error === 'string') {
            const matchError = i18n.__(error);
            if (matchError === error) {
                this.i18n = `errors.http.${httpStatus.internalServerError}`;
                // the following accepts constructions like new ApplicationError('error on value %s of %s', 1, 2)
                deepExtend(this, i18n.__(this.i18n), {
                    message: format.apply(this, args),
                });
            } else {
                this.i18n = error;
                deepExtend(this, matchError);
            }
        } else {
            throw new Error('ApplicationError created without valid parameter');
        }
        // Hack to ensure JSON.stringify outputs this.message
        Object.defineProperty(this, 'message', { enumerable: true });
    }
}

/**
 * Export ApplicationError
 * @type {ApplicationError}
 */
module.exports = ApplicationError;

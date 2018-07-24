/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* eslint-disable no-unused-expressions */

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { format } = require('util');
const url = require('url');

const ApplicationError = require('../../../webapp/lib/applicationError.es6');
const config = require('../../../webapp/config/index.es6');
const error = require('../../../webapp/middleware/error.es6');

let mongoose;
try {
    // eslint-disable-next-line global-require,import/no-unresolved,node/no-missing-require
    mongoose = require('mongoose');
} catch (ex) {
    class ValidationError extends Error {
        constructor() {
            super();
            this.name = 'ValidationError';
            this.status = 400;
        }
    }
    // This is a generic error handler which can be used without mongoose
    mongoose = { Error: { ValidationError } };
}

const { expect } = chai;
chai.use(sinonChai);

const locale = 'en';

class Response {
    constructor() {
        this._json = sinon.spy();
        this._render = sinon.spy();
        this._send = sinon.spy();
        this._set = sinon.spy();
        this._status = sinon.spy();
        this._vary = sinon.spy();
    }

    // eslint-disable-next-line class-methods-use-this
    __() {}

    // eslint-disable-next-line class-methods-use-this
    getLocale() {
        return locale;
    }

    // eslint-disable-next-line class-methods-use-this
    get locals() {
        return {
            config: config.get(),
            format,
            // moment: require('moment');
            url
        };
    }

    json(options) {
        this._json(options);
        return this; // Support chaining
    }

    render(template, data) {
        this._render({ template, data });
        return this; // Support chaining
    }

    send(options) {
        this._send(options);
        return this; // Support chaining
    }

    set(options) {
        this._set(options);
        return this; // Support chaining
    }

    status(options) {
        this._status(options);
        return this; // Support chaining
    }

    vary(options) {
        this._vary(options);
        return this; // Support chaining
    }
}

describe('middleware/error', () => {
    describe('api json errors', () => {
        it('report an uncaught error', () => {
            const err = new Error('Oops!');
            const req = {};
            const res = new Response();
            error.handler(err, req, res);
            expect(res._json).to.have.been.calledWithMatch(
                args =>
                    args.error instanceof ApplicationError &&
                    args.error.originalError.message === err.message
            );
            expect(res._status).to.have.been.calledWith(500);
        });

        it('report a mongoose error', () => {
            const err = new mongoose.Error.ValidationError();
            const req = {};
            const res = new Response();
            error.handler(err, req, res);
            expect(res._json).to.have.been.calledWithMatch(
                args =>
                    args.error instanceof ApplicationError &&
                    args.error.originalError.name === 'ValidationError'
            );
            // a mongoose validation error is a bad request
            expect(res._status).to.have.been.calledWith(400);
        });

        it('report a body-parser error', () => {
            const err = new Error('Oops!');
            err.status = 403; // We just need a status
            const req = {};
            const res = new Response();
            error.handler(err, req, res);
            expect(res._json).to.have.been.calledWithMatch(
                args =>
                    args.error instanceof ApplicationError &&
                    args.error.originalError.status === 403
            );
            expect(res._status).to.have.been.calledWith(403);
        });

        it('report not found', () => {
            const err = new ApplicationError(404);
            const req = {};
            const res = new Response();
            error.handler(err, req, res);
            expect(res._json).to.have.been.calledWithMatch(
                args => args.error instanceof ApplicationError
            );
            expect(res._status).to.have.been.calledWith(404);
        });
    });

    describe('webapp html errors', () => {
        it('report an uncaught error', () => {
            const err = new Error('Oops!');
            const req = { method: 'GET' };
            const res = new Response({ html: true });
            error.handler(err, req, res);
            expect(res._render).to.have.been.calledWithMatch(
                args =>
                    args.template === 'error' &&
                    'author' in args.data && // author is undefined
                    'description' in args.data &&
                    'icon' in args.data &&
                    'image' in args.data &&
                    'keywords' in args.data && // keywords are undefined
                    'language' in args.data &&
                    'menu' in args.data &&
                    'results' in args.data &&
                    'site_url' in args.data &&
                    'title' in args.data && // title is undefined
                    'trace' in args.data
            );
            expect(res._set).to.have.been.calledWithMatch(
                args =>
                    args['Cache-Control'] === 'no-cache' &&
                    args['Content-Language'] === locale &&
                    args['Content-Type'] === 'text/html; charset=utf-8'
            );
            expect(res._status).to.have.been.calledWith(500);
            expect(res._vary).to.have.been.calledWithMatch(
                args => args === 'Accept-Encoding'
            );
        });

        it('report not found', () => {
            const err = new ApplicationError(404);
            const req = { method: 'GET' };
            const res = new Response({ html: true });
            error.handler(err, req, res);
            expect(res._render).to.have.been.calledWithMatch(
                args =>
                    args.template === 'error' &&
                    'author' in args.data && // author is undefined
                    'description' in args.data &&
                    'icon' in args.data &&
                    'image' in args.data &&
                    'keywords' in args.data && // keywords are undefined
                    'language' in args.data &&
                    'menu' in args.data &&
                    'results' in args.data &&
                    'site_url' in args.data &&
                    'title' in args.data && // title is undefined
                    'trace' in args.data
            );
            expect(res._set).to.have.been.calledWithMatch(
                args =>
                    args['Cache-Control'] === 'no-cache' &&
                    args['Content-Language'] === locale &&
                    args['Content-Type'] === 'text/html; charset=utf-8'
            );
            expect(res._status).to.have.been.calledWith(404);
            expect(res._vary).to.have.been.calledWithMatch(
                args => args === 'Accept-Encoding'
            );
        });
    });
});

/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, mocha: true, expr: true */

'use strict';

var expect = require('chai').expect;
var util = require('util');
var url = require('url');

var ApplicationError;
try {
    ApplicationError = require('../../../webapp/lib/applicationError');
} catch (exception) {
    ApplicationError = require('../../../webapp/lib/applicationError');
}

var config;
try {
    config = require('../../../webapp/config/index.es6');
} catch (exception) {
    config = require('../../../webapp/config/index.es6');
}

var error;
try {
    error = require('../../../webapp/middleware/error');
} catch (exception) {
    error = require('../../../webapp/middleware/error');
}

var locale = 'en';
var whatever = 'whatever';

function Response(options) {
    if (options && options.html) {
        this.getLocale = function () { return locale; };
        this.__ = function () { return whatever; };
        // Make nconf configurations available to our EJS templates
        this.locals = {
            config: config.get(),
            format: util.format,
            // moment: require('moment');
            url: url
        };
    }
}
Response.prototype.status = function (status) {
    this._status = status;
    return this;
};
Response.prototype.set = function (set) {
    this._set = set;
    return this;
};
Response.prototype.vary = function (vary) {
    this._vary = vary;
    return this;
};
Response.prototype.render = function (template, data) {
    this._template = template;
    this._data = data;
    return this;
};
Response.prototype.json = function (json) {
    // Make sure we see what is sent by res.json since stringify might remove properties
    this._json = JSON.parse(JSON.stringify(json));
    return this;
};

describe('middleware/error', function () {

    describe('api json errors', function () {

        it('report an uncaught error', function () {
            var err = new Error('Oops!');
            var req = {};
            var res = new Response();
            error.handler(err, req, res);
            expect(res._json).to.have.property('error');
            expect(res._status).to.equal(500);
        });

        it('report not found', function () {
            var err = new ApplicationError(404);
            var req = {};
            var res = new Response();
            error.handler(err, req, res);
            expect(res._json).to.have.property('error');
            expect(res._status).to.equal(404);
        });

    });


    describe('webapp html errors', function () {

        function assertCommonProperties(res) {
            expect(res.getLocale()).to.equal(locale);
            expect(res._set['Cache-Control']).to.equal('no-cache');
            expect(res._set['Content-Language']).to.equal(locale);
            expect(res._set['Content-Type']).to.equal('text/html; charset=utf-8');
            expect(res._template).to.equal('error');
            expect(res._vary).to.equal('Accept-Encoding');
            expect(res.__()).to.equal(whatever);
        }


        it('report an uncaught error', function () {
            var err = new Error('Oops!');
            var req = { method: 'GET' };
            var res = new Response({ html: true });
            error.handler(err, req, res);
            expect(res._data).to.have.property('author');
            expect(res._data).to.have.property('description');
            expect(res._data).to.have.property('icon');
            expect(res._data).to.have.property('keywords');
            expect(res._data).to.have.property('menu');
            expect(res._data).to.have.property('results');
            expect(res._data).to.have.property('site_url');
            expect(res._data).to.have.property('title'); // TODO title is undefined
            expect(res._data).to.have.property('trace');
            expect(res._status).to.equal(500);
        });

        it('report not found', function () {
            var err = new ApplicationError(404);
            var req = { method: 'GET' };
            var res = new Response({ html: true });
            error.handler(err, req, res);
            expect(res._data).to.have.property('author');
            expect(res._data).to.have.property('description');
            expect(res._data).to.have.property('icon');
            expect(res._data).to.have.property('keywords');
            expect(res._data).to.have.property('menu');
            expect(res._data).to.have.property('results');
            expect(res._data).to.have.property('site_url');
            expect(res._data).to.have.property('title'); // TODO title is undefined
            expect(res._data).to.have.property('trace');
            expect(res._status).to.equal(404);
        });

    });

});

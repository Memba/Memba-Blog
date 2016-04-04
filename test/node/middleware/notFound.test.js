/**
 * Copyright (c) 2013-2016 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, mocha: true, expr: true */

'use strict';

var http = require('http');
var expect = require('chai').expect;

var notFound;
try {
    notFound = require('../../../webapp/middleware/notFound');
} catch (exception) {
    notFound = require('../../../api/middleware/notFound');
}

function Response() {}
Response.prototype.status = function (status) {
    this._status = status;
    return this;
};
Response.prototype.set = function (set) {
    this._set = set;
    return this;
};
Response.prototype.send = function (send) {
    this._send = send;
    return this;
};

describe('middleware/notFound', function () {

    it('asset not found (files with extensions)', function () {
        var req = { originalUrl: 'http://www.memba.com/favicon.ico' };
        var res = new Response();
        var next = function () {};
        notFound.handler(req, res, next);
        expect(res._send).to.equal(http.STATUS_CODES['404']);
        expect(res._set).to.deep.equal({ 'Content-Type': 'text/plain; charset=utf-8' });
        expect(res._status).to.equal(404);
    });

    it('resource not found (no file extension)', function () {
        var req = { originalUrl: 'http://www.memba.com/zz' };
        var res = new Response();
        var next = function (err) {
                expect(err).to.be.an.instanceof(Error);
            };
        notFound.handler(req, res, next);
        expect(res._send).to.be.undefined;
        expect(res._set).to.be.undefined;
        expect(res._status).to.be.undefined;
    });

});

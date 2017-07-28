/**
 * Copyright (c) 2013-2017 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, mocha: true, expr: true */

'use strict';

var chai = require('chai');
var http = require('http');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var url = require('url');
var expect = chai.expect;
chai.use(sinonChai);

var config;
try {
    config = require('../../../webapp/config');
} catch (exception) {
    config = require('../../../api/config');
}

// Config before redirect loads rules
config.set('redirect', {
    http: {
        match: 'memba.com$',
        forward: 'https://www.kidoju.com'
    }
});

var redirect;
try {
    redirect = require('../../../webapp/middleware/redirect');
} catch (exception) {
    redirect = require('../../../api/middleware/redirect');
}

function Response() {}
Response.prototype.redirect = sinon.spy();

describe('middleware/redirect', function () {

    beforeEach(function () {
        Response.prototype.redirect.reset();
    });

    it('redirection with rule', function () {
        var req = {
            headers: {
                // Note: we have configured a rule for http
                'x-forwarded-proto' : 'http',
                host: 'www.memba.com'
            },
            originalUrl: '/blog/posts?id=100'
        };
        var res = new Response();
        var next = sinon.spy();
        redirect.handler(req, res, next);
        expect(res.redirect).to.have.been.calledWith(301, url.resolve(config.get('redirect:http:forward'), req.originalUrl));
        expect(next).not.to.have.been.called;
    });


    it('no redirection without rule', function () {
        var req = {
            headers: {
                // Note: we have not configured a rule for https
                'x-forwarded-proto' : 'https',
                host: 'www.memba.com'
            },
            originalUrl: 'favicon.ico'
        };
        var res = new Response();
        var next = sinon.spy();
        redirect.handler(req, res, next);
        expect(res.redirect).not.to.have.been.called;
        expect(next).to.have.been.called;
    });

});

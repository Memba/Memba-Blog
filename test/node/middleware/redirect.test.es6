/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* eslint-disable no-unused-expressions */

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { URL } = require('url');
const config = require('../../../webapp/config/index.es6');
const redirect = require('../../../webapp/middleware/redirect.es6');

const { expect } = chai;
chai.use(sinonChai);

class Response {
    constructor() {
        this._redirect = sinon.spy();
    }

    get redirect() {
        return this._redirect;
    }
}

describe('middleware/redirect', () => {
    before(() => {
        // redirect.js reloads rules in testing environment
        if (process.env.NODE_ENV !== 'test') {
            throw new Error('set NODE_ENV=test');
        }
        config.set('redirect', {
            http: {
                match: 'memba.com$',
                forward: 'https://www.kidoju.com'
            }
        });
    });

    it('redirection with rule', () => {
        const req = {
            headers: {
                'x-forwarded-proto': 'http',
                host: 'www.memba.com'
            },
            originalUrl: '/blog/posts?id=100',
            protocol: 'http',
            secure: false
        };
        const res = new Response();
        const next = sinon.spy();
        redirect.handler(req, res, next);
        expect(res.redirect).to.have.been.calledWith(
            301,
            new URL(req.originalUrl, config.get('redirect:http:forward')).href
        );
        expect(next).not.to.have.been.called;
    });

    it('no redirection without rule', () => {
        const req = {
            headers: {
                'x-forwarded-proto': 'https',
                host: 'www.memba.com'
            },
            originalUrl: 'favicon.ico',
            protocol: 'https',
            secure: true
        };
        const res = new Response();
        const next = sinon.spy();
        redirect.handler(req, res, next);
        expect(res.redirect).not.to.have.been.called;
        expect(next).to.have.been.called;
    });
});

/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* eslint-disable no-unused-expressions */

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const url = require('url');

const { expect } = chai;
chai.use(sinonChai);

let config;
try {
    // eslint-disable-next-line global-require, import/no-unresolved, node/no-missing-require
    config = require('../../../webapp/config');
} catch (exception) {
    // eslint-disable-next-line global-require, import/no-unresolved, node/no-missing-require
    config = require('../../../api/config');
}

let redirect;
try {
    // eslint-disable-next-line global-require, import/no-unresolved, node/no-missing-require
    redirect = require('../../../webapp/middleware/redirect.es6');
} catch (exception) {
    // eslint-disable-next-line global-require, import/no-unresolved, node/no-missing-require
    redirect = require('../../../api/middleware/redirect.es6');
}

class Response {
    constructor() {
        this._spy = sinon.spy();
    }
    get redirect() {
        return this._spy;
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
            url.resolve(config.get('redirect:http:forward'), req.originalUrl)
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

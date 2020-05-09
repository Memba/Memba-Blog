/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const locals = require('../../../webapp/middleware/locals.es6');

class Response {
    constructor() {
        this.locals = {};
    }
}

function next() {}

describe('middleware/locals', () => {
    const res = new Response();

    before(() => {
        locals(undefined, res, next);
    });

    it('It should add config to res.locals', () => {
        expect(res.locals).to.have.property('config');
        expect(res.locals).to.have.nested.property('config.express.port');
    });

    it('It should add format to res.locals', () => {
        expect(res.locals).to.have.property('format').that.is.a('function');
        expect(res.locals.format('%s %s', 'Hello', 'World')).to.equal(
            'Hello World'
        );
    });

    it('It should add URL to res.locals', () => {
        expect(res.locals).to.have.property('URL');
        expect(
            new res.locals.URL('a/b/c', 'https://www.memba.com').href
        ).to.equal('https://www.memba.com/a/b/c');
        // We need that in our templates
        expect(
            new res.locals.URL('/%s/%s', 'https://www.memba.com/').href
        ).to.equal('https://www.memba.com/%s/%s');
        // We also need that for amp files
        /* Beware! { is encoded to %7B and } is encoded to %7D
        expect(
            res.locals.url.resolve('https://www.memba.com', '/{{language}}/{{id}}')
        ).to.equal('https://www.memba.com/{{language}}/{{id}}');
        */
        // Also note the url.resolve ignores query strings and hashes
    });

    it('It should add moment to res.locals', () => {
        expect(res.locals).to.have.property('moment').that.is.a('function');
        expect(res.locals.moment('1995-12-25').isValid()).to.be.true;
    });
});

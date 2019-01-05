/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const request = require('supertest');
const util = require('util');
const config = require('../../../webapp/config/index.es6');

// We cannot define the app like follows because the server is already running
// const app = request('../../../webapp/server');
const app = config.get('uris:webapp:root');

describe('routes/pageRoute', () => {
    it('it should return an english page', done => {
        request(app)
            .get(util.format(config.get('uris:webapp:pages'), 'en', ''))
            .expect(200)
            .expect('Content-Type', /html/)
            .end(done);
    });

    it('it should return a french page', done => {
        request(app)
            .get(util.format(config.get('uris:webapp:pages'), 'fr', ''))
            .expect(200)
            .expect('Content-Type', /html/)
            .end(done);
    });

    it('it should return an error page on unknown language', done => {
        request(app)
            .get(util.format(config.get('uris:webapp:pages'), 'zz', ''))
            .expect(404)
            .expect('Content-Type', /html/)
            .end(done);
    });

    it('it should return an error page on unknown page', done => {
        request(app)
            .get(util.format(config.get('uris:webapp:pages'), 'en', 'dummy'))
            .expect(404)
            .expect('Content-Type', /html/)
            .end(done);
    });
});

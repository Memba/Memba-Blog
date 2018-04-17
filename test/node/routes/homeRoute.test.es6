/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const request = require('supertest'); // eslint-disable-line node/no-unpublished-require
const config = require('../../../webapp/config');

// We cannot define the app like follows because the server is already running
// const app = request('../../../webapp/server');
const app = config.get('uris:webapp:root');

describe('routes/homeRoute', () => {
    it('it should return the home page', done => {
        request(app)
            .get(config.get('uris:webapp:home'))
            .expect(200)
            .expect('Content-Type', /html/)
            .end(done);
    });
});

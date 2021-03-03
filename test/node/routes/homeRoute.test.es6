/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const request = require('supertest');
const app = require('../../../webapp/server');
const config = require('../../../webapp/config/index.es6');

describe('routes/homeRoute', () => {
    it('it should return the home page', (done) => {
        request(app)
            .get(config.get('uris:webapp:home'))
            .expect(200)
            .expect('Content-Type', /html/)
            .end(done);
    });
});

/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const request = require('supertest');
const { compatible, version } = require('../../../package.json');

let config;
try {
    // eslint-disable-next-line global-require, import/no-unresolved, node/no-missing-require
    config = require('../../../webapp/config');
} catch (exception) {
    // eslint-disable-next-line global-require, import/no-unresolved, node/no-missing-require
    config = require('../../../api/config');
}

// We cannot define the app like follows because the server is already running
// const app = request('../../../webapp/server');
const app = config.get('uris:webapp:root');

describe('routes/pingRoute', () => {
    /**
     * Feature: Ping
     * As an anonymous user
     * I want to visit an endpoint
     * So that I can confirm the server is responding
     */
    describe('when requesting resource /api/ping', () => {
        it('it should respond with 200', done => {
            request(app)
                .get('/api/ping')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect({ ping: 'OK', version, compatible })
                .end(done);
        });
    });
});

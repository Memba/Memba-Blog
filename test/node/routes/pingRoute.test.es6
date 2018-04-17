/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const request = require('supertest'); // eslint-disable-line node/no-unpublished-require
const config = require('../../../webapp/config');
const { compatible, version } = require('../../../package.json');

// We cannot define the app like follows because the server is already running
// const app = request('../../../webapp/server');
const app = config.get('uris:webapp:root');

describe('Ping Route', () => {
    /**
     * Feature: Ping
     * As an anonymous user
     * I want to visit an endpoint
     * So that I can confirm the server is responding
     */
    describe('when requesting resource /ping', () => {
        it('it should respond with 200', done => {
            request(app)
                .get(config.get('uris:webapp:ping'))
                .expect(200)
                .expect('Content-Type', /json/)
                .expect({ ping: 'OK', version, compatible })
                .end(done);
        });
    });
});

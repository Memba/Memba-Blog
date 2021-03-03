/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const request = require('supertest');
const { compatible, version } = require('../../../package.json');
const app = require('../../../webapp/server');
const config = require('../../../webapp/config/index.es6');

const pingUri =
    typeof config.get('uris:webpack:root') === 'string'
        ? config.get('uris:webapp:ping')
        : config.get('uris:rapi:ping');

describe('routes/pingRoute', () => {
    /**
     * Feature: Ping
     * As an anonymous user
     * I want to visit an endpoint
     * So that I can confirm the server is responding
     */
    describe('when requesting a ping', () => {
        it('it should respond with 200', async () => {
            await request(app)
                .get(pingUri)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect({ ping: 'OK', version, compatible });
        });
    });
});

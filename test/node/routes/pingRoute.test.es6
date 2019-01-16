/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const request = require('supertest');
const { compatible, version } = require('../../../package.json');
const config = require('../../../webapp/config/index.es6');

let app;
if (config.get('uris:webpack:root')) {
    // This is a web app (and expressJS is already running)
    app = config.get('uris:webapp:root');
} else {
    // This is an api server (and we need to launch expressJS)
    // eslint-disable-next-line global-require
    app = require('../../../webapp/server');
}

const pingUri =
    typeof app === 'string'
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

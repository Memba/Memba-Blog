/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

'use strict';

const request = require('supertest');
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

describe('routes/loggerRoute', () => {
    const loggerUri =
        typeof app === 'string'
            ? config.get('uris:webapp:logger')
            : config.get('uris:rapi:logger');

    /**
     * Feature: Logger
     * As an anonymous user
     * I want to visit an endpoint
     * So that I can log a message
     */
    describe('when posting a log entry', () => {
        it('it should respond with 201 with a bad request', async () => {
            await request(app)
                .post(loggerUri)
                // TODO use faker to generate more bad requests
                .send('dsfdsdsfsdfsdfd')
                .expect(201)
                // .expect('Content-Type', /json/)
                .expect('');
        });

        it('it should respond with 201 with a good request', async () => {
            await request(app)
                .post(loggerUri)
                .send({
                    date: new Date(),
                    level: 'debug',
                    message: 'Hello World'
                })
                .expect(201)
                // .expect('Content-Type', /json/)
                .expect('');
        });
    });
});

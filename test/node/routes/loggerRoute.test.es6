/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const request = require('supertest');
const config = require('../../../webapp/config/index.es6');

let app;
try {
    // We cannot define the app like follows when the server is already running
    app = config.get('uris:webapp:root');
} catch (exception) {
    // eslint-disable-next-line global-require
    app = require('../../../webapp/server');
}

const loggerUri =
    typeof app === 'string'
        ? config.get('uris:webapp:logger')
        : config.get('uris:rapi:logger');

describe('routes/loggerRoute', () => {
    /**
     * Feature: Logger
     * As an anonymous user
     * I want to visit an endpoint
     * So that I can log a message
     */
    describe('when posting a log entry', () => {
        it('it should respond with 201 with a good request', done => {
            request(app)
                .post(loggerUri)
                .send('dsfdsdsfsdfsdfd')
                .expect(201)
                // .expect('Content-Type', /json/)
                .expect('')
                .end(done);
        });

        it('it should respond with 201 with a bad request', done => {
            request(app)
                .post(loggerUri)
                .send({
                    date: new Date(),
                    level: 'debug',
                    message: 'Hello World'
                })
                .expect(201)
                // .expect('Content-Type', /json/)
                .expect('')
                .end(done);
        });
    });
});

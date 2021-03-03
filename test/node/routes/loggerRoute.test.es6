/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const request = require('supertest');
const app = require('../../../webapp/server');
const config = require('../../../webapp/config/index.es6');

const loggerUri =
    typeof config.get('uris:webpack:root') === 'string'
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
                    message: 'Hello World',
                })
                .expect(201)
                // .expect('Content-Type', /json/)
                .expect('');
        });
    });
});

/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const request = require('supertest');
const util = require('util');
const config = require('../../../webapp/config');

// We cannot define the app like follows because the server is already running
// const app = request('../../../webapp/server');
const app = config.get('uris:webapp:root');
const errorUri = config.get('uris:webapp:error');

describe('routes/errorRoute', () => {
    /**
     * Feature: Error
     * As an anonymous user
     * I want to visit an endpoint
     * So that I can get a generic error page
     */
    describe('when requesting an error', () => {
        it('it should respond with 400', done => {
            request(app)
                .get(`${util.format(errorUri, 'en')}?code=400`)
                .expect(400)
                .expect('Content-Type', /html/)
                .end(done);
        });
        it('it should respond with 401', done => {
            request(app)
                .get(`${util.format(errorUri, 'en')}?code=401`)
                .expect(401)
                .expect('Content-Type', /html/)
                .end(done);
        });
        it('it should respond with 403', done => {
            request(app)
                .get(`${util.format(errorUri, 'en')}?code=403`)
                .expect(403)
                .expect('Content-Type', /html/)
                .end(done);
        });
        it('it should respond with 404', done => {
            request(app)
                .get(`${util.format(errorUri, 'fr')}?code=404`)
                .expect(404)
                .expect('Content-Type', /html/)
                .end(done);
        });
        it('it should respond with 500', done => {
            request(app)
                .get(`${util.format(errorUri, 'fr')}?code=500`)
                .expect(500)
                .expect('Content-Type', /html/)
                .end(done);
        });
    });
});

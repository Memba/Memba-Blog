/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const request = require('supertest');
const util = require('util');
const config = require('../../../webapp/config/index.es6');

// We cannot define the app like follows because the server is already running
// const app = request('../../../webapp/server');
const app = config.get('uris:webapp:root');

describe('routes/static', () => {
    /*
    // This (and apple touch icons) won't work because CDN has CORS limitations
    it('it should return a favicon from cdn', function (done) {
        request(app)
            .get(config.get('uris:cdn:root') + util.format(config.get('uris:cdn:images'), 'favicon.ico'))
            .expect(200)
            .expect('Content-Type', /image/)
            .end(done);
    });
    */

    it('it should return robots.txt', done => {
        request(app)
            .get(util.format(config.get('uris:webapp:public'), 'robots.txt'))
            .expect(200)
            .expect('Content-Type', /plain/)
            .end(done);
    });

    it('it should return a simplified error page on missing js file', done => {
        request(app)
            .get(util.format(config.get('uris:webapp:public'), 'dummy.js'))
            .expect(404)
            .expect('Content-Type', /plain/)
            .expect('Not Found')
            .end(done);
    });
});

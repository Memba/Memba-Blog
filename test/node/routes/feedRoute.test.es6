/**
 * Copyright (c) 2013-2021 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const request = require('supertest');
const util = require('util');
const app = require('../../../webapp/server');
const config = require('../../../webapp/config/index.es6');

describe('routes/feedRoute', () => {
    it('it should return an english feed', (done) => {
        request(app)
            .get(util.format(config.get('uris:webapp:feed'), 'en'))
            .expect(200)
            .expect('Content-Type', /rss/)
            .end(done);
    });

    it('it should return a french feed', (done) => {
        request(app)
            .get(util.format(config.get('uris:webapp:feed'), 'fr'))
            .expect(200)
            .expect('Content-Type', /rss/)
            .end(done);
    });
});

/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, mocha: true, expr: true */

'use strict';

var request = require('supertest');
var util = require('util');

// We cannot define app like this because the server is already running
// var app = request('../../../webapp/server');

var config = require('../../../webapp/config');
var app = config.get('uris:webapp:root');


describe('routes/feedRoute', function () {

    it('it should return an english feed', function (done) {
        request(app)
            .get(util.format(config.get('uris:webapp:feed'), 'en'))
            .expect(200)
            .expect('Content-Type', /rss/)
            .end(done);
    });

    it('it should return a french feed', function (done) {
        request(app)
            .get(util.format(config.get('uris:webapp:feed'), 'fr'))
            .expect(200)
            .expect('Content-Type', /rss/)
            .end(done);
    });

});

/**
 * Copyright (c) 2013-2017 Memba Sarl. All rights reserved.
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


describe('routes/pageRoute', function () {

    it('it should return an english page', function (done) {
        request(app)
            .get(util.format(config.get('uris:webapp:pages'), 'en', ''))
            .expect(200)
            .expect('Content-Type', /html/)
            .end(done);
    });

    it('it should return a french page', function (done) {
        request(app)
            .get(util.format(config.get('uris:webapp:pages'), 'fr', ''))
            .expect(200)
            .expect('Content-Type', /html/)
            .end(done);
    });

    it('it should return an error page on unknown language', function (done) {
        request(app)
            .get(util.format(config.get('uris:webapp:pages'), 'zz', ''))
            .expect(400)
            .expect('Content-Type', /html/)
            .end(done);
    });

    it('it should return an error page on unknown page', function (done) {
        request(app)
            .get(util.format(config.get('uris:webapp:pages'), 'en', 'dummy'))
            .expect(404)
            .expect('Content-Type', /html/)
            .end(done);
    });


});

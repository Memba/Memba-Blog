/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
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


describe('routes/static', function () {

    it('it should return a favicon', function (done) {
        request(app)
            .get(util.format(config.get('uris:webapp:public'), 'favicon.ico'))
            .expect(200)
            .expect('Content-Type', /image/)
            .end(done);
    });

    // TODO: Apple touch icons

    it('it should return robots.txt', function (done) {
        request(app)
            .get(util.format(config.get('uris:webapp:public'), 'robots.txt'))
            .expect(200)
            .expect('Content-Type', /plain/)
            .end(done);
    });

    it('it should return a simplified error page on missing js file', function (done) {
        request(app)
            .get(util.format(config.get('uris:webapp:public'), 'dummy.js'))
            .expect(404)
            .expect('Content-Type', /plain/)
            .expect('Not Found')
            .end(done);
    });

});

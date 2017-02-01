/**
 * Copyright (c) 2013-2016 Memba Sarl. All rights reserved.
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

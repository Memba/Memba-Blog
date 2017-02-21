/**
 * Copyright (c) 2013-2017 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, mocha: true, expr: true */

'use strict';

var request = require('supertest');

// We cannot define app like this because the server is already running
// var app = request('../../../webapp/server');

var config = require('../../../webapp/config');
var app = config.get('uris:webapp:root');


describe('routes/homeRoute', function () {

    it('it should return the home page', function (done) {
        request(app)
            .get(config.get('uris:webapp:home'))
            .expect(200)
            .expect('Content-Type', /html/)
            .end(done);
    });

});

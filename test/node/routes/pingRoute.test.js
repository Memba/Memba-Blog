/**
 * Copyright (c) 2013-2017 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, mocha: true, expr: true */

'use strict';

var request = require('supertest');
// var util = require('util');

// We cannot define app like this because the server is already running
// var app = request('../../../webapp/server');

var config = require('../../../webapp/config');
var app = config.get('uris:webapp:root');
var version = require('../../../package.json').version;


describe('Ping Route', function () {

    /**
     * Feature: Ping
     * As an anonymous user
     * I want to visit an endpoint
     * So that I can confirm the server is responding
     */
    describe('when requesting resource /ping', function () {
        it('it should respond with 200', function (done) {
            request(app)
                .get(config.get('uris:webapp:ping'))
                .expect(200)
                .expect('Content-Type', /json/)
                .expect({ ping: 'OK', version: version })
                .end(done);
        });
    });

});

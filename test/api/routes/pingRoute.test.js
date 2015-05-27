/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jslint node: true, expr: true */
/* jshint node: true, expr: true */
/* global describe, it, before, xdescribe, xit */

'use strict';

var request = require('supertest'),

    //We cannot define app like this because the server is already running
    //app = request('../../../webapp/server');
    config = require('../../../webapp/config'),
    app = config.get('uris:webapp:root');

describe('Ping Route', function(){

    /**
     * Feature: Ping
     * As an anonymous user
     * I want to visit an endpoint
     * So that I can confirm the server is responding
     */
    describe('when requesting resource /ping', function(){
        it('it should respond with 200', function(done){
            request(app)
                .get(config.get('uris:webapp:ping'))
                .expect(200)
                .expect('Content-Type', /json/)
                .expect({ ping: 'OK' })
                .end(done);
        });
    });

});

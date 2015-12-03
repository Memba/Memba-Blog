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


describe('routes/sitemapRoute', function () {

    it('it should return an english sitemap', function (done) {
        request(app)
            .get(util.format(config.get('uris:webapp:sitemap'), 'en'))
            .expect(200)
            .expect('Content-Type', /xml/)
            .end(done);
    });

    it('it should return a french sitemap', function (done) {
        request(app)
            .get(util.format(config.get('uris:webapp:sitemap'), 'fr'))
            .expect(200)
            .expect('Content-Type', /xml/)
            .end(done);
    });

});

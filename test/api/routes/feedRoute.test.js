/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, expr: true */
/* globals describe: false, before: false, it: false */

'use strict';

var request = require('supertest'),
    util = require('util'),

    //We cannot define app like this because the server is already running
    //app = request('../../../webapp/server');

    config = require('../../../webapp/config'),
    app = config.get('uris:webapp:root');


describe('routes/feedRoute', function() {

    it('it should return an english feed', function(done) {
        request(app)
            .get(util.format(config.get('uris:webapp:feed'), 'en'))
            .expect(200)
            .expect('Content-Type', /rss/)
            .end(done);
    });

    it('it should return a french feed', function(done) {
        request(app)
            .get(util.format(config.get('uris:webapp:feed'), 'fr'))
            .expect(200)
            .expect('Content-Type', /rss/)
            .end(done);
    });

});

/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, expr: true */
/* globals describe: false, before: false, it: false */

'use strict';

var expect = require('chai').expect,
    cache = require('../../../webapp/lib/cache');

describe('lib/cache', function() {

    it('cache value for an unknown key is undefined', function() {
        expect(cache.get('unknown')).to.be.undefined;
    });

    it('an object in cache can be retrieved', function() {
        cache.set('test', 100);
        expect(cache.get('test')).to.equal(100);
    });

    it('cache can be reset', function() {
        cache.set('more', 200);
        expect(cache.get('more')).to.equal(200);
        cache.reset();
        expect(cache.get('more')).to.be.undefined;
    });

});

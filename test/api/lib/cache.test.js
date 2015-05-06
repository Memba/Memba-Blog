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

    describe('menu', function () {

        it('cache value for an unknown locale is undefined', function () {
            var locale = 'zz';
            expect(cache.getMenu(locale)).to.be.undefined;
        });

        it('cache value can be set and retrieved', function () {
            var locale = 'en', menu = [{text: 'Support', href: '/en/'}];
            expect(cache.setMenu(locale, menu)).not.to.throw;
            expect(cache.getMenu(locale)).to.eql(menu);
        });

        it('cache can be reset', function () {
            var locale = 'fr', menu = [{text: 'Support', href: '/fr/'}];
            expect(cache.setMenu(locale, menu)).not.to.throw;
            expect(cache.getMenu(locale)).to.eql(menu);
            expect(cache.reset()).not.to.throw;
            expect(cache.getMenu(locale)).to.be.undefined;
        });

    });

    describe('index', function () {

        it('cache value for an unknown locale is undefined', function () {
            var locale = 'zz';
            expect(cache.getIndex(locale)).to.be.undefined;
        });

        it('cache value can be set and retrieved', function () {
            var locale = 'en', index = [{uuid:'6a1df850-edb5-11e4-9453-f7b3ae7ed145', title: 'Frequently Asked Questions'}];
            expect(cache.setIndex(locale, index)).not.to.throw;
            expect(cache.getIndex(locale)).to.eql(index);
        });

        it('cache can be reset', function () {
            var locale = 'fr', index = [{uuid:'6f5576a0-f0bb-11e4-8033-797a7732d2df', title: 'Questions Fréquentes'}];
            expect(cache.setIndex(locale, index)).not.to.throw;
            expect(cache.getIndex(locale)).to.eql(index);
            expect(cache.reset()).not.to.throw;
            expect(cache.getIndex(locale)).to.be.undefined;
        });

    });

});

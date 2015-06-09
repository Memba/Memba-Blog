/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, expr: true */
/* globals describe: false, before: false, it: false */

'use strict';

var expect = require('chai').expect,
    index = require('../../../webapp/models/indexModel');

describe('models/indexModel', function() {

    it('getIndex: english', function(done) {
        index.getIndex('en', function(error, index) {
            expect(error).to.be.null;
            expect(index).to.be.instanceof(Array);
            for (var i = 0; i < index.length; i++) {

            }
            done();
        });
    });

    it('getIndex: french', function(done) {
        index.getIndex('fr', function(error, index) {
            expect(error).to.be.null;
            expect(index).to.be.instanceof(Array);
            for (var i = 0; i < index.length; i++) {

            }
            done();
        });
    });

    it('getIndex: unknown language', function() {
        function test() {
            index.getIndex('zz', function () {});
        }
        expect(test).to.throw;
    });

});

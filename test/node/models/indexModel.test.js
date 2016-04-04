/**
 * Copyright (c) 2013-2016 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, mocha: true, expr: true */

'use strict';

var expect = require('chai').expect;
var index = require('../../../webapp/models/indexModel');

describe('models/indexModel', function () {

    it('getIndex: english', function (done) {
        index.getIndex('en', function (error, index) {
            expect(error).to.be.null;
            expect(index).to.be.instanceof(Array);
            // for (var i = 0; i < index.length; i++) {
            // }
            done();
        });
    });

    it('getIndex: french', function (done) {
        index.getIndex('fr', function (error, index) {
            expect(error).to.be.null;
            expect(index).to.be.instanceof(Array);
            // for (var i = 0; i < index.length; i++) {
            // }
            done();
        });
    });

    it('getIndex: unknown language', function () {
        function test() {
            index.getIndex('zz', function () {});
        }
        expect(test).to.throw;
    });

});

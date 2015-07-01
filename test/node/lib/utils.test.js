/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, mocha: true, expr: true */

'use strict';

var expect = require('chai').expect;

var utils;
try {
    utils = require('../../../webapp/lib/utils');
} catch(exception) {
    utils = require('../../../api/lib/utils');
}

describe('lib/utils', function() {

    describe('isObject', function() {

        it('boolean passed to isObject should return false', function() {
            expect(utils.isObject(false)).to.be.false;
        });

        it('string passed to isObject should return false', function() {
            expect(utils.isObject('hello')).to.be.false;
        });

        it('number passed to isObject should return false', function() {
            expect(utils.isObject(1)).to.be.false;
        });

        it('date passed to isObject should return false', function() {
            expect(utils.isObject(new Date())).to.be.false;
        });

        it('array passed to isObject should return false', function() {
            expect(utils.isObject([1,2,3])).to.be.false;
        });

        it('empty object passed to isObject should return true', function() {
            expect(utils.isObject({})).to.be.true;
        });

        it('complex object passed to isObject should return true', function() {
            expect(utils.isObject({ a: 1, b: new Date(), c: ['1', '2'], d: {e: {}, f: null }})).to.be.true;
        });

    });

    describe('isEmptyObject', function() {

        it('boolean passed to isEmptyObject should return false', function() {
            expect(utils.isEmptyObject(false)).to.be.false;
        });

        it('string passed to isEmptyObject should return false', function() {
            expect(utils.isEmptyObject('hello')).to.be.false;
        });

        it('number passed to isEmptyObject should return false', function() {
            expect(utils.isEmptyObject(1)).to.be.false;
        });

        it('date passed to isEmptyObject should return false', function() {
            expect(utils.isEmptyObject(new Date())).to.be.false;
        });

        it('array passed to isEmptyObject should return false', function() {
            expect(utils.isEmptyObject([1,2,3])).to.be.false;
        });

        it('empty object passed to isEmptyObject should return true', function() {
            expect(utils.isEmptyObject({})).to.be.true;
        });

        it('complex object passed to isEmptyObject should return false', function() {
            expect(utils.isEmptyObject({ a: 1, b: new Date(), c: ['1', '2'], d: {e: {}, f: null }})).to.be.false;
        });

    });

    describe('deepExtend', function() {

        //This is third party code, so hopefully it's been extensively tested

        it('it should add properties', function() {
            var a = { prop1: true}, b = { prop2: true}, c = { prop1: true, prop2: true };
            expect(utils.deepExtend(a, b)).to.deep.equal(c);
        });

        it('it should replace properties', function() {
            var a = { prop1: true}, b = { prop1: false }, c = { prop1: false };
            expect(utils.deepExtend(a, b)).to.deep.equal(c);
        });

        it('it should also undefined properties', function() {
            //Note unlike $.extend
            var a = { prop1: true}, b = { prop2: undefined }, c = { prop1: true, prop2: undefined };
            expect(utils.deepExtend(a, b)).to.deep.equal(c);
        });

    });

    describe('uuid', function() {

        // This is third party code, so hopefully it's been extensively tested
        // See http://stackoverflow.com/questions/7905929/how-to-test-valid-uuid-guid/13653180#13653180

        it('uuid should match uuid regex', function() {
            expect(utils.uuid()).to.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
        });

    });

});

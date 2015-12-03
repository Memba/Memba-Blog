/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, mocha: true, expr: true */

'use strict';

var expect = require('chai').expect;
var moment = require('moment');

describe('moment', function () {

    it('it should parse an ISO date', function () {
        var d = new Date();
        var m = moment(d.toISOString());
        expect(m.toDate().getTime()).to.equal(d.getTime());
    });

    it('it should display an english date', function () {
        var d = new Date(2014, 12, 31);
        var m = moment(d.toISOString()).locale('en');
        expect(m.format('LLL')).to.equal('January 31, 2015 12:00 AM');
    });

    it('it should display a french date', function () {
        var d = new Date(2014, 12, 31);
        var m = moment(d.toISOString()).locale('fr');
        expect(m.format('LLL')).to.equal('31 janvier 2015 00:00');
    });

    it('it should display an english month+year', function () {
        var m = moment({ year: 2015, month: 7 }).locale('en');
        expect(m.format('MMMM YYYY')).to.equal('August 2015');
    });

    it('it should display a french month+year', function () {
        var m = moment({ year: 2015, month: 7 }).locale('fr');
        expect(m.format('MMMM YYYY')).to.equal('août 2015');
    });

});

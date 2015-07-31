/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, mocha: true, expr: true */

'use strict';

var expect = require('chai').expect;

var mongoose;
try {
    mongoose = require('mongoose');
} catch(exception) {
    mongoose = { Types: { ObjectId: function() {
        var ret = ((0.1 + 0.9 * Math.random())*1.e20).toString(16).substr(0, 12) + ((0.1 + 0.9 * Math.random())*1.e20).toString(16).substr(0, 12);
        expect(ret).to.match(/^[a-z0-9]{24}$/);
        return ret;
    } } };
}

var params;
try {
    params = require('../../../webapp/middleware/params');
} catch(exception) {
    params = require('../../../api/middleware/params');
}

function nextOK(err) {
    expect(err).to.be.undefined;
}

function nextErr(err) {
    expect(err).to.be.an.instanceof(Error);
}

describe('middleware/params', function() {

    describe('validateLanguage', function() {

        it('`en` and `fr` are valid languages', function() {
            params.validateLanguage(undefined, undefined, nextOK, 'en');
            params.validateLanguage(undefined, undefined, nextOK, 'fr');
        });

        it('`zz` and `dummy` are not a valid language', function() {
            params.validateLanguage(undefined, undefined, nextErr, 'zz');
            params.validateLanguage(undefined, undefined, nextErr, 'dummy');
        });

    });

    describe('validateProvider', function() {

        it('`facebook`, `google`, `live` and `twitter` are valid providers', function() {
            params.validateProvider(undefined, undefined, nextOK, 'facebook');
            params.validateProvider(undefined, undefined, nextOK, 'google');
            params.validateProvider(undefined, undefined, nextOK, 'live');
            params.validateProvider(undefined, undefined, nextOK, 'twitter');
        });

        it('validation is case sensitive and `dummy` is not a valid provider', function() {
            params.validateProvider(undefined, undefined, nextErr, 'Facebook');
            params.validateProvider(undefined, undefined, nextErr, 'GOOGLE');
            params.validateProvider(undefined, undefined, nextErr, 'livE');
            params.validateProvider(undefined, undefined, nextErr, 'twiTTer');
            params.validateProvider(undefined, undefined, nextErr, 'dummy');
        });

    });

    describe('validateObjectId', function() {

        it('a mongoose ObjectId is a valid object id', function() {
            params.validateObjectId(undefined, undefined, nextOK, mongoose.Types.ObjectId().toString());
        });

        it('`dummy` is not a valid objectId', function() {
            params.validateObjectId(undefined, undefined, nextErr, 'dummy');
        });

    });

    describe('validateMonth', function() {

        it('a two-digit month between 01 and 12 is a valid month', function() {
            params.validateMonth(undefined, undefined, nextOK, '01');
            params.validateMonth(undefined, undefined, nextOK, '02');
            params.validateMonth(undefined, undefined, nextOK, '03');
            params.validateMonth(undefined, undefined, nextOK, '04');
            params.validateMonth(undefined, undefined, nextOK, '05');
            params.validateMonth(undefined, undefined, nextOK, '06');
            params.validateMonth(undefined, undefined, nextOK, '07');
            params.validateMonth(undefined, undefined, nextOK, '08');
            params.validateMonth(undefined, undefined, nextOK, '09');
            params.validateMonth(undefined, undefined, nextOK, '10');
            params.validateMonth(undefined, undefined, nextOK, '11');
            params.validateMonth(undefined, undefined, nextOK, '12');
        });

        it('`00`, `13`, `99` and `dummy` are not valid months', function() {
            params.validateMonth(undefined, undefined, nextErr, '00');
            params.validateMonth(undefined, undefined, nextErr, '13');
            params.validateMonth(undefined, undefined, nextErr, '99');
            params.validateMonth(undefined, undefined, nextErr, 'dummy');
        });

    });

    describe('validateYear', function() {

        it('a four-digit year between 2014 and now is a valid year', function() {
            params.validateYear(undefined, undefined, nextOK, '2014');
            params.validateYear(undefined, undefined, nextOK, '2015');
        });

        it('`2013`, `2020` and `dummy` are not valid years', function() {
            params.validateYear(undefined, undefined, nextErr, '2013');
            params.validateYear(undefined, undefined, nextErr, '2020');
            params.validateYear(undefined, undefined, nextErr, 'dummy');
        });

    });

});

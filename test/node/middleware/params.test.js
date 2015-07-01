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

        it('`dummy` is not a valid language', function() {
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

        it('`dummy` is not a valid provider', function() {
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

});

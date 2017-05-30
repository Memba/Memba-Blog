/**
 * Copyright (c) 2013-2017 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, mocha: true, expr: true */

'use strict';

var expect = require('chai').expect;

var mongoose;
try {
    mongoose = require('mongoose');
} catch (exception) {
    mongoose = false;
}

var ApplicationError;
var webapp = false;
try {
    ApplicationError = require('../../../webapp/lib/error');
    webapp = true;
} catch (exception) {
    ApplicationError = require('../../../api/lib/error');
}

describe('lib/error', function () {

    if (mongoose !== false) {
        it('ApplicationError from a mongoose validation error', function () {
            var originalError = new mongoose.Error.ValidationError();
            var error = new ApplicationError(originalError);
            expect(error).to.be.instanceof(ApplicationError);
            expect(error).to.have.property('i18n', 'errors.http.400');
            expect(error).to.have.property('message').that.is.a('string');
            expect(error).to.have.property('name', 'ApplicationError');
            expect(error).to.have.nested.property('originalError.message', 'Validation failed');
            expect(error).to.have.nested.property('originalError.name', 'ValidationError');
            expect(error).to.have.nested.property('originalError.stack');
            expect(error).to.have.property('stack').that.is.a('string');
            expect(error).to.have.property('status', 400);
            if (webapp) {
                expect(error).to.have.property('title').that.is.a('string');
            }
        });
    }

    it('ApplicationError from a generic error', function () {
        var originalError = new Error('Oops');
        var error = new ApplicationError(originalError);
        expect(error).to.be.instanceof(ApplicationError);
        expect(error).to.have.property('i18n', 'errors.http.500');
        expect(error).to.have.property('message').that.is.a('string');
        expect(error).to.have.property('name', 'ApplicationError');
        expect(error).to.have.nested.property('originalError.message').that.is.a('string');
        expect(error).to.have.nested.property('originalError.name').that.is.a('string');
        expect(error).to.have.nested.property('originalError.stack').that.is.a('string');
        expect(error).to.have.property('stack').that.is.a('string');
        expect(error).to.have.property('status', 500);
        if (webapp) {
            expect(error).to.have.property('title').that.is.a('string');
        }
    });

    it('ApplicationError from an object (which is not an Error)', function () {
        var obj = { status: 404, message: 'Not Found', hello: 'world' };
        var error = new ApplicationError(obj);
        expect(error).to.be.instanceof(ApplicationError);
        expect(error).to.have.property('hello', obj.hello);
        expect(error).to.have.property('i18n', 'errors.http.500');
        expect(error).to.have.property('message', obj.message);
        expect(error).to.have.property('name', 'ApplicationError');
        expect(error).to.have.property('stack').that.is.a('string');
        expect(error).to.have.property('status', obj.status);
        if (webapp) {
            expect(error).to.have.property('title').that.is.a('string');
        }
    });

    it('ApplicationError from a number (which is an http status code)', function () {
        var error = new ApplicationError(401);
        expect(error).to.have.property('i18n', 'errors.http.401');
        expect(error).to.have.property('message').that.is.a('string');
        expect(error).to.have.property('name', 'ApplicationError');
        expect(error).to.have.property('stack').that.is.a('string');
        expect(error).to.have.property('status', 401);
        if (webapp) {
            expect(error).to.have.property('title').that.is.a('string');
        }
    });

    it('ApplicationError from a number (which is not an http status code)', function () {
        function test() {
            return new ApplicationError(1);
        }
        expect(test).to.throw;
    });

    it('ApplicationError from an i18n resource locator', function () {
        var i18n = 'errors.http.403';
        var error = new ApplicationError(i18n);
        expect(error).to.be.instanceof(ApplicationError);
        expect(error).to.have.property('i18n', i18n);
        expect(error).to.have.property('message').that.is.a('string');
        expect(error).to.have.property('name', 'ApplicationError');
        expect(error).to.have.property('stack').that.is.a('string');
        expect(error).to.have.property('status', 403);
        if (webapp) {
            expect(error).to.have.property('title').that.is.a('string');
        }
    });

    it('ApplicationError from a text message', function () {
        var message = 'a message with value %s and value %s';
        var error = new ApplicationError(message, 1, 2);
        expect(error).to.be.instanceof(ApplicationError);
        expect(error).to.have.property('i18n', 'errors.http.500');
        expect(error).to.have.property('message', 'a message with value 1 and value 2');
        expect(error).to.have.property('name', 'ApplicationError');
        expect(error).to.have.property('stack').that.is.a('string');
        expect(error).to.have.property('status', 500);
        if (webapp) {
            expect(error).to.have.property('title').that.is.a('string');
        }
    });

    it('ApplicationError from undefined (no parameter passed to constructor)', function () {
        function test() {
            return new ApplicationError();
        }
        expect(test).to.throw;
    });

});

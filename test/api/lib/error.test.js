/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, expr: true */
/* globals describe: false, before: false, it: false */

'use strict';

var expect = require('chai').expect,
    ApplicationError = require('../../../webapp/lib/error');

describe('lib/error', function() {

    it('ApplicationError without parameter', function() {
        var error = new ApplicationError();
        expect(error).to.be.instanceof(ApplicationError);
        expect(error).to.have.property('i18n', 'errors.generic.500');
        expect(error).to.have.property('message').that.is.a('string');
        expect(error).to.have.property('name', 'ApplicationError');
        expect(error).to.have.property('stack').that.is.a('string');
        expect(error).to.have.property('status', 500);
        expect(error).to.have.property('title').that.is.a('string');
    });

    it('ApplicationError with error parameter', function() {
        var originalError = new Error('Oops'),
            error = new ApplicationError(originalError);
        expect(error).to.be.instanceof(ApplicationError);
        expect(error).to.have.property('i18n', 'errors.generic.500');
        expect(error).to.have.property('message').that.is.a('string');
        expect(error).to.have.property('name', 'ApplicationError');
        expect(error).to.have.property('stack').that.is.a('string');
        expect(error).to.have.property('status', 500);
        expect(error).to.have.property('title').that.is.a('string');
        //Note: we have an originalError
        expect(error).to.have.property('originalError', originalError);
    });

    it('ApplicationError with object parameter', function() {
        var obj = { status: 404, message: 'Not Found', hello: 'world'},
            error = new ApplicationError(obj);
        expect(error).to.be.instanceof(ApplicationError);
        expect(error).to.have.property('i18n', 'errors.generic.500');
        expect(error).to.have.property('message', obj.message);
        expect(error).to.have.property('name', 'ApplicationError');
        expect(error).to.have.property('stack').that.is.a('string');
        expect(error).to.have.property('status', obj.status);
        expect(error).to.have.property('title').that.is.a('string');
        //Note: we also have an hello property
        expect(error).to.have.property('hello', obj.hello);
    });

    it('ApplicationError with i18n parameter', function() {
        var i18n = 'errors.generic.404',
            error = new ApplicationError(i18n);
        expect(error).to.be.instanceof(ApplicationError);
        expect(error).to.have.property('i18n', i18n);
        expect(error).to.have.property('message').that.is.a('string');
        expect(error).to.have.property('name', 'ApplicationError');
        expect(error).to.have.property('stack').that.is.a('string');
        expect(error).to.have.property('status', 404);
        expect(error).to.have.property('title').that.is.a('string');
    });

    it('ApplicationError with message parameter', function() {
        var message = 'a message with value %s and value %s',
            error = new ApplicationError(message, [1, 2]);
        expect(error).to.be.instanceof(ApplicationError);
        expect(error).to.have.property('i18n', 'errors.generic.500');
        expect(error).to.have.property('message', 'a message with value 1 and value 2');
        expect(error).to.have.property('name', 'ApplicationError');
        expect(error).to.have.property('stack').that.is.a('string');
        expect(error).to.have.property('status', 500);
        expect(error).to.have.property('title').that.is.a('string');
    });

    it('ApplicationError with number parameter', function() {
        var error = new ApplicationError(404);
        expect(error).to.have.property('i18n', 'errors.generic.404');
        expect(error).to.have.property('message').that.is.a('string');
        expect(error).to.have.property('name', 'ApplicationError');
        expect(error).to.have.property('stack').that.is.a('string');
        expect(error).to.have.property('status', 404);
        expect(error).to.have.property('title').that.is.a('string');
    });

});

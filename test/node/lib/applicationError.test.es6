/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* eslint-disable no-unused-expressions */

const { expect } = require('chai');

let mongoose;
let webapp = false;
try {
    // eslint-disable-next-line global-require,import/no-unresolved,,node/no-missing-require
    mongoose = require('mongoose');
} catch (exception) {
    mongoose = false;
    webapp = true;
}

const ApplicationError = require('../../../webapp/lib/applicationError.es6');

describe('lib/applicationError', () => {
    if (mongoose) {
        it('ApplicationError from a mongoose validation error', () => {
            const originalError = new mongoose.Error.ValidationError();
            const error = new ApplicationError(originalError);
            expect(error).to.be.instanceof(ApplicationError);
            expect(error).to.have.property('i18n', 'errors.http.400');
            expect(error)
                .to.have.property('message')
                .that.is.a('string');
            expect(error).to.have.property('name', 'ApplicationError');
            expect(error).to.have.nested.property(
                'originalError.message',
                'Validation failed'
            );
            expect(error).to.have.nested.property(
                'originalError.name',
                'ValidationError'
            );
            expect(error).to.have.nested.property('originalError.stack');
            expect(error)
                .to.have.property('stack')
                .that.is.a('string');
            expect(error).to.have.property('status', 400);
            if (webapp) {
                expect(error)
                    .to.have.property('title')
                    .that.is.a('string');
            }
        });
    }

    it('ApplicationError from a generic error', () => {
        const originalError = new Error('Oops');
        const error = new ApplicationError(originalError);
        expect(error).to.be.instanceof(ApplicationError);
        expect(error).to.have.property('i18n', 'errors.http.500');
        expect(error)
            .to.have.property('message')
            .that.is.a('string');
        expect(error).to.have.property('name', 'ApplicationError');
        expect(error)
            .to.have.nested.property('originalError.message')
            .that.is.a('string');
        expect(error)
            .to.have.nested.property('originalError.name')
            .that.is.a('string');
        expect(error)
            .to.have.nested.property('originalError.stack')
            .that.is.a('string');
        expect(error)
            .to.have.property('stack')
            .that.is.a('string');
        expect(error).to.have.property('status', 500);
        if (webapp) {
            expect(error)
                .to.have.property('title')
                .that.is.a('string');
        }
    });

    it('ApplicationError from an object (which is not an Error)', () => {
        const obj = { status: 404, message: 'Not Found', hello: 'world' };
        const error = new ApplicationError(obj);
        expect(error).to.be.instanceof(ApplicationError);
        expect(error).to.have.property('hello', obj.hello);
        expect(error).to.have.property('i18n', 'errors.http.500');
        expect(error).to.have.property('message', obj.message);
        expect(error).to.have.property('name', 'ApplicationError');
        expect(error)
            .to.have.property('stack')
            .that.is.a('string');
        expect(error).to.have.property('status', obj.status);
        if (webapp) {
            expect(error)
                .to.have.property('title')
                .that.is.a('string');
        }
    });

    it('ApplicationError from a number (which is an http status code)', () => {
        const error = new ApplicationError(401);
        expect(error).to.have.property('i18n', 'errors.http.401');
        expect(error)
            .to.have.property('message')
            .that.is.a('string');
        expect(error).to.have.property('name', 'ApplicationError');
        expect(error)
            .to.have.property('stack')
            .that.is.a('string');
        expect(error).to.have.property('status', 401);
        if (webapp) {
            expect(error)
                .to.have.property('title')
                .that.is.a('string');
        }
    });

    it('ApplicationError from a number (which is not an http status code)', () => {
        function test() {
            return new ApplicationError(1);
        }
        expect(test).to.throw();
    });

    it('ApplicationError from an i18n resource locator', () => {
        const i18n = 'errors.http.403';
        const error = new ApplicationError(i18n);
        expect(error).to.be.instanceof(ApplicationError);
        expect(error).to.have.property('i18n', i18n);
        expect(error)
            .to.have.property('message')
            .that.is.a('string');
        expect(error).to.have.property('name', 'ApplicationError');
        expect(error)
            .to.have.property('stack')
            .that.is.a('string');
        expect(error).to.have.property('status', 403);
        if (webapp) {
            expect(error)
                .to.have.property('title')
                .that.is.a('string');
        }
    });

    it('ApplicationError from a text message', () => {
        const message = 'a message with value %s and value %s';
        const error = new ApplicationError(message, 1, 2);
        expect(error).to.be.instanceof(ApplicationError);
        expect(error).to.have.property('i18n', 'errors.http.500');
        expect(error).to.have.property(
            'message',
            'a message with value 1 and value 2'
        );
        expect(error).to.have.property('name', 'ApplicationError');
        expect(error)
            .to.have.property('stack')
            .that.is.a('string');
        expect(error).to.have.property('status', 500);
        if (webapp) {
            expect(error)
                .to.have.property('title')
                .that.is.a('string');
        }
    });

    it('ApplicationError from undefined (no parameter passed to constructor)', () => {
        function test() {
            return new ApplicationError();
        }
        expect(test).to.throw();
    });
});

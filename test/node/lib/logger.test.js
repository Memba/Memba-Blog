/**
 * Copyright (c) 2013-2017 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, mocha: true, expr: true */

'use strict';

var expect = require('chai').expect;

var logger;
try {
    logger = require('../../../webapp/lib/logger');
} catch (exception) {
    logger = require('../../../api/lib/logger');
}

describe('lib/logger', function () {

    describe('Test throwing conditions', function () {

        it('logging an undefined value should throw', function () {
            expect(logger.debug).to.throw;
            expect(logger.info).to.throw;
            expect(logger.warn).to.throw;
            expect(logger.error).to.throw;
            expect(logger.critical).to.throw;
        });

    });

    describe('Test logging at level 0', function () {

        before(function ()  {
            logger.level = 0;
        });

        it('DEBUG should log', function () {
            expect(logger.debug({ message: 'simple message' })).to.be.true;
        });

        it('INFO should log', function () {
            // despite an unexpected property
            expect(logger.info({ message: 'simple message', dummy: 'not displayed' })).to.be.true;
        });

        it('WARN should log', function () {
            expect(logger.warn(new Date())).to.be.true;
        });

        it('ERROR should log', function () {
            expect(logger.error({ module: 'app.logger.test', method: 'it',  message: 'simple message', data: { prop1: true, prop2: 1, prop3: ['a', 'b', 'c'] } })).to.be.true;
        });

        it('CRIT should log', function () {
            var entry = new Error('Oops');
            entry.originalError = new TypeError('Oops with details');
            expect(logger.critical(entry)).to.be.true;
        });

    });

    describe('Test logging at level 2', function () {

        before(function ()  {
            logger.level = 2;
        });

        it('DEBUG should not log', function () {
            expect(logger.debug('simple message')).to.be.false;
        });

        it('INFO should log', function () {
            expect(logger.info({ message: 'simple message', data: undefined })).to.be.true;
        });

        it('WARN should log', function () {
            expect(logger.warn({ module: 'app.logger.test', method: 'it',  message: 'simple message', request: { ip: '10.0.0.1', agent: 'Dummy/1.0', url: 'http://localhost:3000/en' }})).to.be.true;
        });

        it('ERROR should log', function () {
            expect(logger.error({ module: 'app.logger.test', method: 'it',  message: 'simple message', data: { prop1: true, prop2: 1, prop3: ['a', 'b', 'c'] } })).to.be.true;
        });

        it('CRIT should log', function () {
            var entry = new Error('Oops');
            entry.originalError = new TypeError('Oops with details');
            expect(logger.critical(entry)).to.be.true;
        });

    });

    describe('Test logging at level 4', function () {

        before(function ()  {
            logger.level = 4;
        });

        it('DEBUG should not log', function () {
            expect(logger.debug('simple message')).to.be.false;
        });

        it('INFO should not log', function () {
            expect(logger.info(100)).to.be.false;
        });

        it('WARN should log', function () {
            expect(logger.warn(new Date())).to.be.true;
        });

        it('ERROR should log', function () {
            expect(logger.error({ module: 'app.logger.test', method: 'it',  message: 'simple message', data: { prop1: true, prop2: 1, prop3: ['a', 'b', 'c'] } })).to.be.true;
        });

        it('CRIT should log', function () {
            var entry = new Error('Oops');
            entry.originalError = new TypeError('Oops with details');
            expect(logger.critical(entry)).to.be.true;
        });

    });

    describe('Test logging at level 8', function () {

        before(function ()  {
            logger.level = 8;
        });

        it('DEBUG should not log', function () {
            expect(logger.debug('simple message')).to.be.false;
        });

        it('INFO should not log', function () {
            expect(logger.info(false)).to.be.false;
        });

        it('WARN should not log', function () {
            expect(logger.warn(new Date())).to.be.false;
        });

        it('ERROR should not log', function () {
            expect(logger.error({ module: 'app.logger.test', method: 'it',  message: 'simple message', data: { prop1: true, prop2: 1, prop3: ['a', 'b', 'c'] } })).to.be.false;
        });

        it('CRIT should not log', function () {
            var entry = new Error('Oops');
            entry.originalError = new TypeError('Oops with details');
            expect(logger.critical(entry)).to.be.false;
        });

    });

});

/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, mocha: true, expr: true */

'use strict';

var fs = require('fs'),
    path = require('path'),
    expect = require('chai').expect,
    filePath = path.join(__dirname, '../../../api/lib/logger.js'),
    loggerPath = fs.existsSync(filePath) ? '../../../api/lib/logger' : '../../../webapp/lib/logger',
    logger = require(loggerPath);

describe('lib/logger', function() {

    describe('Test logging at level 0', function() {

        before(function()  {
            logger.level = 0;
        });

        it('DEBUG should log', function() {
            expect(logger.debug('simple message')).to.be.true;
        });

        it('INFO should log', function() {
            expect(logger.info()).to.be.true;
        });

        it('WARN should log', function() {
            expect(logger.warn(new Date())).to.be.true;
        });

        it('ERROR should log', function() {
            expect(logger.error({ module: 'app.logger.test', method: 'it',  message: 'simple message', data: { prop1: true, prop2: 1, prop3: ['a', 'b', 'c' ] } })).to.be.true;
        });

        it('CRIT should log', function() {
            var entry = new Error('Oops');
            entry.originalError = new TypeError('Oops with details');
            expect(logger.critical(entry)).to.be.true;
        });

    });

    describe('Test logging at level 2', function() {

        before(function()  {
            logger.level = 2;
        });

        it('DEBUG should not log', function() {
            expect(logger.debug('simple message')).to.be.false;
        });

        it('INFO should log', function() {
            expect(logger.info(undefined)).to.be.true;
        });

        it('WARN should log', function() {
            expect(logger.warn({ module: 'app.logger.test', method: 'it',  message: 'simple message', request: { ip: '10.0.0.1', agent: 'Dummy/1.0', url: 'http://localhost:3000/en'}})).to.be.true;
        });

        it('ERROR should log', function() {
            expect(logger.error({ module: 'app.logger.test', method: 'it',  message: 'simple message', data: { prop1: true, prop2: 1, prop3: ['a', 'b', 'c' ] } })).to.be.true;
        });

        it('CRIT should log', function() {
            var entry = new Error('Oops');
            entry.originalError = new TypeError('Oops with details');
            expect(logger.critical(entry)).to.be.true;
        });

    });

    describe('Test logging at level 4', function() {

        before(function()  {
            logger.level = 4;
        });

        it('DEBUG should not log', function() {
            expect(logger.debug('simple message')).to.be.false;
        });

        it('INFO should not log', function() {
            expect(logger.info(undefined)).to.be.false;
        });

        it('WARN should log', function() {
            expect(logger.warn(new Date())).to.be.true;
        });

        it('ERROR should log', function() {
            expect(logger.error({ module: 'app.logger.test', method: 'it',  message: 'simple message', data: { prop1: true, prop2: 1, prop3: ['a', 'b', 'c' ] } })).to.be.true;
        });

        it('CRIT should log', function() {
            var entry = new Error('Oops');
            entry.originalError = new TypeError('Oops with details');
            expect(logger.critical(entry)).to.be.true;
        });

    });

    describe('Test logging at level 8', function() {

        before(function()  {
            logger.level = 8;
        });

        it('DEBUG should not log', function() {
            expect(logger.debug('simple message')).to.be.false;
        });

        it('INFO should not log', function() {
            expect(logger.info(undefined)).to.be.false;
        });

        it('WARN should not log', function() {
            expect(logger.warn(new Date())).to.be.false;
        });

        it('ERROR should not log', function() {
            expect(logger.error({ module: 'app.logger.test', method: 'it',  message: 'simple message', data: { prop1: true, prop2: 1, prop3: ['a', 'b', 'c' ] } })).to.be.false;
        });

        it('CRIT should not log', function() {
            var entry = new Error('Oops');
            entry.originalError = new TypeError('Oops with details');
            expect(logger.critical(entry)).to.be.false;
        });

    });

});

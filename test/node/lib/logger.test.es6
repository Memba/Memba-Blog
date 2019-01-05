/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const config = require('../../../webapp/config/index.es6');
const logger = require('../../../webapp/lib/logger.es6');

describe('lib/logger', () => {
    describe('Test throwing conditions', () => {
        it('logging an undefined value should throw', () => {
            expect(logger.debug).to.throw;
            expect(logger.info).to.throw;
            expect(logger.warn).to.throw;
            expect(logger.error).to.throw;
            expect(logger.critical).to.throw;
        });
    });

    describe('Test logging at level 0', () => {
        before(() => {
            config.set('level', 0);
        });

        it('DEBUG should log', () => {
            expect(logger.debug({ message: 'simple message' })).to.be.true;
        });

        it('INFO should log', () => {
            // despite an unexpected property
            expect(
                logger.info({
                    message: 'simple message',
                    dummy: 'not displayed'
                })
            ).to.be.true;
        });

        it('WARN should log', () => {
            expect(logger.warn(new Date())).to.be.true;
        });

        it('ERROR should log', () => {
            expect(
                logger.error({
                    module: 'app.logger.test',
                    method: 'it',
                    message: 'simple message',
                    data: { prop1: true, prop2: 1, prop3: ['a', 'b', 'c'] }
                })
            ).to.be.true;
        });

        it('CRIT should log', () => {
            const entry = new Error('Oops');
            entry.originalError = new TypeError('Oops with details');
            expect(logger.critical(entry)).to.be.true;
        });
    });

    describe('Test logging at level 2', () => {
        before(() => {
            config.set('level', 2);
        });

        it('DEBUG should not log', () => {
            expect(logger.debug('simple message')).to.be.false;
        });

        it('INFO should log', () => {
            expect(logger.info({ message: 'simple message', data: undefined }))
                .to.be.true;
        });

        it('WARN should log', () => {
            expect(
                logger.warn({
                    module: 'app.logger.test',
                    method: 'it',
                    message: 'simple message',
                    request: {
                        ip: '10.0.0.1',
                        agent: 'Dummy/1.0',
                        url: 'http://localhost:3000/en'
                    }
                })
            ).to.be.true;
        });

        it('ERROR should log', () => {
            expect(
                logger.error({
                    module: 'app.logger.test',
                    method: 'it',
                    message: 'simple message',
                    data: { prop1: true, prop2: 1, prop3: ['a', 'b', 'c'] }
                })
            ).to.be.true;
        });

        it('CRIT should log', () => {
            const entry = new Error('Oops');
            entry.originalError = new TypeError('Oops with details');
            expect(logger.critical(entry)).to.be.true;
        });
    });

    describe('Test logging at level 4', () => {
        before(() => {
            config.set('level', 4);
        });

        it('DEBUG should not log', () => {
            expect(logger.debug('simple message')).to.be.false;
        });

        it('INFO should not log', () => {
            expect(logger.info(100)).to.be.false;
        });

        it('WARN should log', () => {
            expect(logger.warn(new Date())).to.be.true;
        });

        it('ERROR should log', () => {
            expect(
                logger.error({
                    module: 'app.logger.test',
                    method: 'it',
                    message: 'simple message',
                    data: { prop1: true, prop2: 1, prop3: ['a', 'b', 'c'] }
                })
            ).to.be.true;
        });

        it('CRIT should log', () => {
            const entry = new Error('Oops');
            entry.originalError = new TypeError('Oops with details');
            expect(logger.critical(entry)).to.be.true;
        });
    });

    describe('Test logging at level 8', () => {
        before(() => {
            config.set('level', 8);
        });

        it('DEBUG should not log', () => {
            expect(logger.debug('simple message')).to.be.false;
        });

        it('INFO should not log', () => {
            expect(logger.info(false)).to.be.false;
        });

        it('WARN should not log', () => {
            expect(logger.warn(new Date())).to.be.false;
        });

        it('ERROR should not log', () => {
            expect(
                logger.error({
                    module: 'app.logger.test',
                    method: 'it',
                    message: 'simple message',
                    data: { prop1: true, prop2: 1, prop3: ['a', 'b', 'c'] }
                })
            ).to.be.false;
        });

        it('CRIT should not log', () => {
            const entry = new Error('Oops');
            entry.originalError = new TypeError('Oops with details');
            expect(logger.critical(entry)).to.be.false;
        });
    });
});

/**
 * Copyright (c) 2013-2017 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, mocha: true, expr: true */

'use strict';

var expect = require('chai').expect;

var slack;
try {
    slack = require('../../../webapp/lib/slack');
} catch (exception) {
    slack = require('../../../api/lib/slack');
}

describe('lib/slack', function () {

    describe('Test throwing conditions', function () {

        it('notifying slack with an invalid entry should throw', function () {
            var fn1 = function () {
                slack.notify();
            };
            var fn2 = function () {
                slack.notify({});
            };
            var fn3 = function () {
                slack.notify({ message: true });
            };
            expect(fn1).to.throw;
            expect(fn2).to.throw;
            expect(fn3).to.throw;
        });

    });

    describe('Test notifying slack', function () {

        it('It should notify a simple message', function (done) {
            slack.notify(
                { level: 'info', message: 'Simple message from running mocha tests' },
                function (err, response) {
                    expect(err).to.be.null;
                    expect(response).to.have.property('statusCode', 200);
                    done();
                }
            );
        });

        it('It should notify a message with fields', function (done) {
            slack.notify(
                { level: 'debug', message: 'Complex message from running mocha tests', application: 'Mocha', host: 'testenv', module: 'slack.test', method: 'slack.notify', data: { p1: 'a', p2: 'b', p3: 'c' } },
                function (err, response) {
                    expect(err).to.be.null;
                    expect(response.statusCode).to.equal(200);
                    done();
                }
            );
        });

        it('It should notify an error', function (done) {
            slack.notify(
                { level: 'crit', message: 'Error message from running mocha tests', application: 'Mocha', host: 'testenv', stack: (new Error('Oops')).stack },
                function (err, response) {
                    expect(err).to.be.null;
                    expect(response.statusCode).to.equal(200);
                    done();
                }
            );
        });

    });

});

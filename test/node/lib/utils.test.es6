/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const utils = require('../../../webapp/lib/utils.es6');

describe('lib/utils', () => {
    describe('isObject', () => {
        it('boolean passed to isObject should return false', () => {
            expect(utils.isObject(false)).to.be.false;
        });

        it('string passed to isObject should return false', () => {
            expect(utils.isObject('hello')).to.be.false;
        });

        it('number passed to isObject should return false', () => {
            expect(utils.isObject(1)).to.be.false;
        });

        it('date passed to isObject should return false', () => {
            expect(utils.isObject(new Date())).to.be.false;
        });

        it('array passed to isObject should return false', () => {
            expect(utils.isObject([1, 2, 3])).to.be.false;
        });

        it('function passed to isObject should return false', () => {
            function fn() {}
            expect(utils.isObject(fn)).to.be.false;
        });

        it('empty object passed to isObject should return true', () => {
            expect(utils.isObject({})).to.be.true;
        });

        it('complex object passed to isObject should return true', () => {
            expect(
                utils.isObject({
                    a: 1,
                    b: new Date(),
                    c: ['1', '2'],
                    d: { e: {}, f: null }
                })
            ).to.be.true;
        });

        it('prototyped object passed to isObject should return true', () => {
            function Fn() {
                this._data = true;
            }
            Fn.prototype.status = () => this._data;
            expect(utils.isObject(new Fn())).to.be.true;
        });
    });

    describe('isPOJO', () => {
        it('boolean passed to isObject should return false', () => {
            expect(utils.isPOJO(false)).to.be.false;
        });

        it('string passed to isObject should return false', () => {
            expect(utils.isPOJO('hello')).to.be.false;
        });

        it('number passed to isObject should return false', () => {
            expect(utils.isPOJO(1)).to.be.false;
        });

        it('date passed to isObject should return false', () => {
            expect(utils.isPOJO(new Date())).to.be.false;
        });

        it('array passed to isObject should return false', () => {
            expect(utils.isPOJO([1, 2, 3])).to.be.false;
        });

        it('function passed to isPOJO should return false', () => {
            function fn() {}
            expect(utils.isPOJO(fn)).to.be.false;
        });

        it('empty object passed to isPOJO should return true', () => {
            expect(utils.isPOJO({})).to.be.true;
        });

        it('complex object passed to isPOJO should return true', () => {
            expect(
                utils.isPOJO({
                    a: 1,
                    b: new Date(),
                    c: ['1', '2'],
                    d: { e: {}, f: null }
                })
            ).to.be.true;
        });

        it('prototyped object passed to isPOJO should return false', () => {
            function Fn() {
                this._data = true;
            }
            Fn.prototype.status = () => this._data;
            expect(utils.isPOJO(new Fn())).to.be.false;
        });
    });

    describe('isEmptyObject', () => {
        it('boolean passed to isEmptyObject should return false', () => {
            expect(utils.isEmptyObject(false)).to.be.false;
        });

        it('string passed to isEmptyObject should return false', () => {
            expect(utils.isEmptyObject('hello')).to.be.false;
        });

        it('number passed to isEmptyObject should return false', () => {
            expect(utils.isEmptyObject(1)).to.be.false;
        });

        it('date passed to isEmptyObject should return false', () => {
            expect(utils.isEmptyObject(new Date())).to.be.false;
        });

        it('array passed to isEmptyObject should return false', () => {
            expect(utils.isEmptyObject([1, 2, 3])).to.be.false;
        });

        it('empty object passed to isEmptyObject should return true', () => {
            expect(utils.isEmptyObject({})).to.be.true;
        });

        it('complex object passed to isEmptyObject should return false', () => {
            expect(
                utils.isEmptyObject({
                    a: 1,
                    b: new Date(),
                    c: ['1', '2'],
                    d: { e: {}, f: null }
                })
            ).to.be.false;
        });
    });

    describe('deepExtend', () => {
        // This is third party code, so hopefully it's been extensively tested

        it('it should add properties', () => {
            const a = { prop1: true };
            const b = { prop2: true };
            const c = { prop1: true, prop2: true };
            expect(utils.deepExtend(a, b)).to.deep.equal(c);
        });

        it('it should replace properties', () => {
            const a = { prop1: true };
            const b = { prop1: false };
            const c = { prop1: false };
            expect(utils.deepExtend(a, b)).to.deep.equal(c);
        });

        it('it should also undefined properties', () => {
            // Note unlike $.extend
            const a = { prop1: true };
            const b = { prop2: undefined };
            const c = { prop1: true, prop2: undefined };
            expect(utils.deepExtend(a, b)).to.deep.equal(c);
        });
    });

    describe('uuid', () => {
        // This is third party code, so hopefully it's been extensively tested
        // See http://stackoverflow.com/questions/7905929/how-to-test-valid-uuid-guid/13653180#13653180

        it('uuid should match uuid regex', () => {
            expect(utils.uuid()).to.match(
                /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
            );
        });
    });
});

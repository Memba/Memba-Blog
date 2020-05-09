/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const indexModel = require('../../../webapp/models/indexModel.es6');

describe('models/indexModel', () => {
    it('getIndex: english', (done) => {
        indexModel.getIndex('en', (error, index) => {
            expect(error).to.be.null;
            expect(index).to.be.instanceof(Array);
            // for (var i = 0; i < indexModel.length; i++) {
            // }
            done();
        });
    });

    it('getIndex: french', (done) => {
        indexModel.getIndex('fr', (error, index) => {
            expect(error).to.be.null;
            expect(index).to.be.instanceof(Array);
            // for (var i = 0; i < indexModel.length; i++) {
            // }
            done();
        });
    });

    it('getIndex: unknown language', () => {
        function test() {
            indexModel.getIndex('zz', () => {});
        }
        expect(test).to.throw;
    });
});

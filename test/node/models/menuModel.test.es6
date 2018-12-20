/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const menuModel = require('../../../webapp/models/menuModel.es6');

describe('models/menuModel', () => {
    it('getMenu: english', done => {
        menuModel.getMenu('en', (error, menu) => {
            expect(menu).to.be.instanceof(Array);
            for (let i = 0; i < menu.length; i++) {
                expect(menu[i])
                    .to.have.property('text')
                    .that.is.a('string');
                if (typeof menu[i].items !== 'undefined') {
                    expect(menu[i])
                        .to.have.property('items')
                        .that.is.instanceof(Array);
                } else {
                    expect(menu[i])
                        .to.have.property('href')
                        .that.is.a('string');
                }
            }
            done();
        });
    });

    it('getMenu: french', done => {
        menuModel.getMenu('fr', (error, menu) => {
            expect(menu).to.be.instanceof(Array);
            for (let i = 0; i < menu.length; i++) {
                expect(menu[i])
                    .to.have.property('text')
                    .that.is.a('string');
                if (typeof menu[i].items !== 'undefined') {
                    expect(menu[i])
                        .to.have.property('items')
                        .that.is.instanceof(Array);
                } else {
                    expect(menu[i])
                        .to.have.property('href')
                        .that.is.a('string');
                }
            }
            done();
        });
    });

    it('getMenu: unknown language', done => {
        menuModel.getMenu('zz', (error, menu) => {
            expect(error).to.be.instanceof(Error);
            expect(menu).to.be.undefined;
            done();
        });
    });
});

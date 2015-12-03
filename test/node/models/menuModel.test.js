/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, mocha: true, expr: true */

'use strict';

var expect = require('chai').expect;
var menu = require('../../../webapp/models/menuModel');

describe('models/menuModel', function () {

    it('getMenu: english', function (done) {
        menu.getMenu('en', function (error, menu) {
            expect(menu).to.be.instanceof(Array);
            for (var i = 0; i < menu.length; i++) {
                expect(menu[i]).to.have.property('text').that.is.a('string');
                if (typeof menu[i].items !== 'undefined') {
                    expect(menu[i]).to.have.property('items').that.is.instanceof(Array);
                } else {
                    expect(menu[i]).to.have.property('href').that.is.a('string');
                }
            }
            done();
        });
    });

    it('getMenu: french', function (done) {
        menu.getMenu('fr', function (error, menu) {
            expect(menu).to.be.instanceof(Array);
            for (var i = 0; i < menu.length; i++) {
                expect(menu[i]).to.have.property('text').that.is.a('string');
                if (typeof menu[i].items !== 'undefined') {
                    expect(menu[i]).to.have.property('items').that.is.instanceof(Array);
                } else {
                    expect(menu[i]).to.have.property('href').that.is.a('string');
                }
            }
            done();
        });
    });

    it('getMenu: unknown language', function (done) {
        menu.getMenu('zz', function (error, menu) {
            expect(error).to.be.instanceof(Error);
            expect(menu).to.be.undefined;
            done();
        });
    });

});

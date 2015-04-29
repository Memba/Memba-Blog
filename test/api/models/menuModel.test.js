/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, expr: true */
/* globals describe: false, before: false, it: false */

'use strict';

var expect = require('chai').expect,
    model = require('../../../webapp/models/menuModel');

describe('models/menuModel', function() {

    it('it should read english menu', function(done) {
        model.get('en', function(error, menu) {
            expect(menu).to.be.instanceof(Array);
            for(var i = 0; i < menu.length; i++) {
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

    it('it should read french menu', function(done) {
        model.get('fr', function(error, menu) {
            expect(menu).to.be.instanceof(Array);
            for(var i = 0; i < menu.length; i++) {
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

});

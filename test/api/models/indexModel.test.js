/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, expr: true */
/* globals describe: false, before: false, it: false */

'use strict';

var expect = require('chai').expect,
    index = require('../../../webapp/models/indexModel');

describe('models/indexModel', function() {

    it('getIndex: english', function(done) {
        index.getIndex('en', function(error, index) {
            expect(error).to.be.null;
            expect(index).to.be.instanceof(Array);
            for (var i = 0; i < index.length; i++) {
                expect(index[i]).to.have.property('author').that.is.a('string');
                expect(index[i]).to.have.property('author_url').that.is.a('string');
                expect(index[i]).to.have.property('avatar_url').that.is.a('string');
                //expect(index[i]).to.have.property('content').that.is.a('string');
                expect(index[i]).to.have.property('creation_date').that.is.a('string');
                expect(index[i]).to.have.property('description').that.is.a('string');
                expect(index[i]).to.have.property('edit_url').that.is.a('string');
                //expect(index[i]).to.have.property('icon').that.is.a('string');
                expect(index[i]).to.have.property('keywords').that.is.a('string');
                expect(index[i]).to.have.property('path').that.is.a('string');
                expect(index[i]).to.have.property('title').that.is.a('string');
                //expect(index[i]).to.have.property('update_date').that.is.a('string');
                expect(index[i]).to.have.property('uuid').that.is.a('string');
            }
            done();
        });
    });

    it('getIndex: french', function(done) {
        index.getIndex('fr', function(error, index) {
            expect(error).to.be.null;
            expect(index).to.be.instanceof(Array);
            for (var i = 0; i < index.length; i++) {
                expect(index[i]).to.have.property('author').that.is.a('string');
                expect(index[i]).to.have.property('author_url').that.is.a('string');
                expect(index[i]).to.have.property('avatar_url').that.is.a('string');
                //expect(index[i]).to.have.property('content').that.is.a('string');
                expect(index[i]).to.have.property('creation_date').that.is.a('string');
                expect(index[i]).to.have.property('description').that.is.a('string');
                expect(index[i]).to.have.property('edit_url').that.is.a('string');
                //expect(index[i]).to.have.property('icon').that.is.a('string');
                expect(index[i]).to.have.property('keywords').that.is.a('string');
                expect(index[i]).to.have.property('path').that.is.a('string');
                expect(index[i]).to.have.property('title').that.is.a('string');
                //expect(index[i]).to.have.property('update_date').that.is.a('string');
                expect(index[i]).to.have.property('uuid').that.is.a('string');
            }
            done();
        });
    });

    it('getIndex: unknown language', function(done) {
        index.getIndex('zz', function(error, index) {
            expect(error).to.be.instanceof(Error);
            expect(index).to.be.undefined;
            done();
        });
    });

});

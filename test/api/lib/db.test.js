/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, expr: true */
/* globals describe: false, before: false, it: false */

'use strict';

console.log('db.test.js: require ../../../webapp/lib/db');
var expect = require('chai').expect,
    db = require('../../../webapp/lib/db');

describe('lib/db', function() {

    describe('find method', function() {

        before(function() {
            console.log('-------------------------------- test');
            console.dir(db.en.data);
            console.log('-------------------------------- test');

        });

        it('Retrieve all english index entries', function(done) {
            db.en.find({}, function(error, indexEntries) {
                expect(error).to.be.null;
                expect(indexEntries).to.be.instanceof(Array).with.length.gte(1);
                for (var i = 0; i < indexEntries.length; i++) {
                    expect(indexEntries[i]).to.have.property('author').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('author_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('avatar_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('creation_date').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('category').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('description').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('edit_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('icon').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('keywords').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('language', 'en');
                    expect(indexEntries[i]).to.have.property('path').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('site_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('text').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('title').that.is.a('string');
                    //expect(indexEntries[i]).to.have.property('update_date').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('uuid').that.is.a('string');
                }
                done();
            });
        });

        it('Retrieve all french index entries', function(done) {
            db.fr.find({}, function(error, indexEntries) {
                expect(error).to.be.null;
                expect(indexEntries).to.be.instanceof(Array).with.length.gte(1);
                for (var i = 0; i < indexEntries.length; i++) {
                    expect(indexEntries[i]).to.have.property('author').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('author_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('avatar_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('creation_date').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('category').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('description').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('edit_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('icon').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('keywords').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('language', 'fr');
                    expect(indexEntries[i]).to.have.property('path').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('site_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('text').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('title').that.is.a('string');
                    //expect(indexEntries[i]).to.have.property('update_date').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('uuid').that.is.a('string');
                }
                done();
            });
        });

        it('Retrieve by language and path', function(done) {
            var PATH = 'en/pages/faqs.md';
            db.en.find({ language: 'en', path: PATH }, function(error, indexEntries) {
                expect(error).to.be.null;
                expect(indexEntries).to.be.instanceof(Array).with.length.gte(1);
                for (var i = 0; i < indexEntries.length; i++) {
                    expect(indexEntries[i]).to.have.property('author').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('author_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('avatar_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('creation_date').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('category').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('description').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('edit_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('icon').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('keywords').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('language', 'en');
                    expect(indexEntries[i]).to.have.property('path', PATH);
                    expect(indexEntries[i]).to.have.property('text').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('site_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('title').that.is.a('string');
                    //expect(indexEntries[i]).to.have.property('update_date').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('uuid').that.is.a('string');
                }
                done();
            });
        });

        it('Retrieve by language and path with $eq', function(done) {
            var PATH = 'en/pages/faqs.md';
            db.en.find({ language: { $eq: 'en' }, path: { $eq: PATH } }, function(error, indexEntries) {
                expect(error).to.be.null;
                expect(indexEntries).to.be.instanceof(Array).with.length.gte(1);
                for (var i = 0; i < indexEntries.length; i++) {
                    expect(indexEntries[i]).to.have.property('author').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('author_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('avatar_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('creation_date').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('category').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('description').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('edit_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('icon').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('keywords').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('language', 'en');
                    expect(indexEntries[i]).to.have.property('path', PATH);
                    expect(indexEntries[i]).to.have.property('site_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('text').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('title').that.is.a('string');
                    //expect(indexEntries[i]).to.have.property('update_date').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('uuid').that.is.a('string');
                }
                done();
            });
        });

        it('Retrieve by category', function(done) {
            var CATEGORY = 'Default';
            db.en.find({ language: 'en', category: CATEGORY }, function(error, indexEntries) {
                expect(error).to.be.null;
                expect(indexEntries).to.be.instanceof(Array).with.length.gte(1);
                for (var i = 0; i < indexEntries.length; i++) {
                    expect(indexEntries[i]).to.have.property('author').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('author_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('avatar_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('creation_date').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('category', CATEGORY);
                    expect(indexEntries[i]).to.have.property('description').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('edit_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('icon').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('keywords').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('language', 'en');
                    expect(indexEntries[i]).to.have.property('path').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('site_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('text').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('title').that.is.a('string');
                    //expect(indexEntries[i]).to.have.property('update_date').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('uuid').that.is.a('string');
                }
                done();
            });
        });

        it('Retrieve by author', function(done) {
            var AUTHOR = 'Jacques L. Chereau';
            db.en.find({ language: 'en', author: AUTHOR }, function(error, indexEntries) {
                expect(error).to.be.null;
                expect(indexEntries).to.be.instanceof(Array).with.length.gte(1);
                for (var i = 0; i < indexEntries.length; i++) {
                    expect(indexEntries[i]).to.have.property('author', AUTHOR);
                    expect(indexEntries[i]).to.have.property('author_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('avatar_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('creation_date').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('category').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('description').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('edit_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('icon').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('keywords').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('language', 'en');
                    expect(indexEntries[i]).to.have.property('path').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('site_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('text').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('title').that.is.a('string');
                    //expect(indexEntries[i]).to.have.property('update_date').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('uuid').that.is.a('string');
                }
                done();
            });
        });

        it('Retrieve by root site_url', function(done) {
            var SITE_URL = new RegExp('^http://localhost:3000/en/posts/2015/');
            db.en.find({ language: 'en', site_url: SITE_URL }, function(error, indexEntries) {
                expect(error).to.be.null;
                expect(indexEntries).to.be.instanceof(Array).with.length.gte(1);
                for (var i = 0; i < indexEntries.length; i++) {
                    expect(indexEntries[i]).to.have.property('author').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('author_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('avatar_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('creation_date').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('category').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('description').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('edit_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('icon').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('keywords').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('language', 'en');
                    expect(indexEntries[i]).to.have.property('path').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('site_url').that.match(SITE_URL);
                    expect(indexEntries[i]).to.have.property('text').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('title').that.is.a('string');
                    //expect(indexEntries[i]).to.have.property('update_date').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('uuid').that.is.a('string');
                }
                done();
            });
        });

        it('Retrieve by full text search', function(done) {
            var TEXT = new RegExp('support');
            db.en.find({ language: 'en', text: TEXT }, function(error, indexEntries) {
                expect(error).to.be.null;
                expect(indexEntries).to.be.instanceof(Array).with.length.gte(1);
                for (var i = 0; i < indexEntries.length; i++) {
                    expect(indexEntries[i]).to.have.property('author').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('author_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('avatar_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('creation_date').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('category').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('description').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('edit_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('icon').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('keywords').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('language', 'en');
                    expect(indexEntries[i]).to.have.property('path').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('site_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('text').that.match(TEXT);
                    expect(indexEntries[i]).to.have.property('title').that.is.a('string');
                    //expect(indexEntries[i]).to.have.property('update_date').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('uuid').that.is.a('string');
                }
                done();
            });
        });

    });

    describe('group method', function() {

        it('Retrieve a count by category', function (done) {
            db.en.group(
                {
                    key: { category: 1 },
                    reduce: function(curr, result) {
                        result.count++;
                    },
                    initial: { count: 0 }
                },
                function (error, groups) {
                    expect(error).to.be.null;
                    expect(groups).to.be.instanceof(Array).with.length.gte(1);
                    for (var i = 0; i < groups.length; i++) {
                        expect(groups[i]).to.have.property('category').that.is.a('string');
                        expect(groups[i]).to.have.property('count').that.is.gte(1);
                    }
                    done();
                }
            );
        });

        it('Retrieve a count by author', function (done) {
            db.en.group(
                {
                    key: { author: 1 },
                    reduce: function(curr, result) {
                        result.count++;
                    },
                    initial: { count: 0 }
                },
                function (error, groups) {
                    expect(error).to.be.null;
                    expect(groups).to.be.instanceof(Array).with.length.gte(1);
                    for (var i = 0; i < groups.length; i++) {
                        expect(groups[i]).to.have.property('author').that.is.a('string');
                        expect(groups[i]).to.have.property('count').that.is.gte(1);
                    }
                    done();
                }
            );
        });

        it('Retrieve a count by year and month', function (done) {
            db.en.group(
                {
                    keyf: function(doc) {
                        var date = new Date(doc.creation_date);
                        return {
                            year: date.getUTCFullYear(),
                            month: date.getUTCMonth()
                        };
                    },
                    reduce: function(curr, result) {
                        result.count++;
                    },
                    initial: { count: 0 }
                },
                function (error, groups) {
                    expect(error).to.be.null;
                    expect(groups).to.be.instanceof(Array).with.length.gte(1);
                    for (var i = 0; i < groups.length; i++) {
                        expect(groups[i]).to.have.property('year').that.is.a('number');
                        expect(groups[i]).to.have.property('month').that.is.a('number');
                        expect(groups[i]).to.have.property('count').that.is.gte(1);
                    }
                    done();
                }
            );
        });

    });

});

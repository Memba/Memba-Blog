/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, mocha: true, expr: true */

'use strict';

var expect = require('chai').expect;
var util = require('util');
var config = require('../../../webapp/config/index.es6');
var db = require('../../../webapp/lib/db');

describe('lib/db', function () {

    describe('find method', function () {

        it('Retrieve all english index entries', function (done) {
            db.en.find({}, function (error, indexEntries) {
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
                    // expect(indexEntries[i]).to.have.property('update_date').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('uuid').that.is.a('string');
                }
                done();
            });
        });

        it('Retrieve all french index entries', function (done) {
            db.fr.find({}, function (error, indexEntries) {
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
                    // expect(indexEntries[i]).to.have.property('update_date').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('uuid').that.is.a('string');
                }
                done();
            });
        });

        it('Retrieve by language and path', function (done) {
            var path = util.format(config.get('github:language'), 'en') + config.get('github:pages') + '/' + util.format(config.get('github:markdown'), 'faqs');
            db.en.find({ language: 'en', path: path }, function (error, indexEntries) {
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
                    expect(indexEntries[i]).to.have.property('path', path);
                    expect(indexEntries[i]).to.have.property('text').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('site_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('title').that.is.a('string');
                    // expect(indexEntries[i]).to.have.property('update_date').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('uuid').that.is.a('string');
                }
                done();
            });
        });

        it('Retrieve by language and path with $eq', function (done) {
            var path = util.format(config.get('github:language'), 'en') + config.get('github:pages') + '/' + util.format(config.get('github:markdown'), 'faqs');
            db.en.find({ language: { $eq: 'en' }, path: { $eq: path } }, function (error, indexEntries) {
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
                    expect(indexEntries[i]).to.have.property('path', path);
                    expect(indexEntries[i]).to.have.property('site_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('text').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('title').that.is.a('string');
                    // expect(indexEntries[i]).to.have.property('update_date').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('uuid').that.is.a('string');
                }
                done();
            });
        });

        it('Retrieve by category', function (done) {
            var category = 'Default';
            db.en.find({ language: 'en', category: category }, function (error, indexEntries) {
                expect(error).to.be.null;
                expect(indexEntries).to.be.instanceof(Array).with.length.gte(1);
                for (var i = 0; i < indexEntries.length; i++) {
                    expect(indexEntries[i]).to.have.property('author').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('author_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('avatar_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('creation_date').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('category', category);
                    expect(indexEntries[i]).to.have.property('description').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('edit_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('icon').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('keywords').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('language', 'en');
                    expect(indexEntries[i]).to.have.property('path').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('site_url').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('text').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('title').that.is.a('string');
                    // expect(indexEntries[i]).to.have.property('update_date').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('uuid').that.is.a('string');
                }
                done();
            });
        });

        it('Retrieve by author', function (done) {
            var author = 'jlchereau';
            db.en.find({ language: 'en', author: author }, function (error, indexEntries) {
                expect(error).to.be.null;
                expect(indexEntries).to.be.instanceof(Array).with.length.gte(1);
                for (var i = 0; i < indexEntries.length; i++) {
                    expect(indexEntries[i]).to.have.property('author', author);
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
                    // expect(indexEntries[i]).to.have.property('update_date').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('uuid').that.is.a('string');
                }
                done();
            });
        });

        /* jscs: disable requireCamelCaseOrUpperCaseIdentifiers */

        it('Retrieve by root site_url', function (done) {
            var site_url = new RegExp('^' + config.get('uris:webapp:root') + util.format(config.get('uris:webapp:posts'), 'en', '2015', '', '').replace(/[\/]+$/, '/'));
            db.en.find({ language: 'en', site_url: site_url }, function (error, indexEntries) {
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
                    expect(indexEntries[i]).to.have.property('site_url').that.match(site_url);
                    expect(indexEntries[i]).to.have.property('text').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('title').that.is.a('string');
                    // expect(indexEntries[i]).to.have.property('update_date').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('uuid').that.is.a('string');
                }
                done();
            });
        });

        /* jscs: enable requireCamelCaseOrUpperCaseIdentifiers */

        it('Retrieve by full text search', function (done) {
            var text = new RegExp('support');
            db.en.find({ language: 'en', text: text }, function (error, indexEntries) {
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
                    expect(indexEntries[i]).to.have.property('text').that.match(text);
                    expect(indexEntries[i]).to.have.property('title').that.is.a('string');
                    // expect(indexEntries[i]).to.have.property('update_date').that.is.a('string');
                    expect(indexEntries[i]).to.have.property('uuid').that.is.a('string');
                }
                done();
            });
        });

    });

    describe('group method', function () {

        it('Retrieve a count by category', function (done) {
            db.en.group(
                {
                    key: { category: 1 },
                    reduce: function (curr, result) {
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
                    reduce: function (curr, result) {
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
                    keyf: function (doc) {
                        /* jscs: disable requireCamelCaseOrUpperCaseIdentifiers */
                        var date = new Date(doc.creation_date);
                        /* jscs: enable requireCamelCaseOrUpperCaseIdentifiers */
                        return {
                            year: date.getUTCFullYear(),
                            month: date.getUTCMonth()
                        };
                    },
                    reduce: function (curr, result) {
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

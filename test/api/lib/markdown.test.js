/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, expr: true */
/* globals describe: false, before: false, it: false */

'use strict';

var expect = require('chai').expect,
    markdown = require('../../../webapp/lib/markdown');

var keyval = '---\n' +
    'uuid: 6037fe20-eb54-11e4-9cc1-795dae8caad4\n' +
    'description: Kidoju - A new way to teach and learn\n' +
    'icon: speech_balloon_question\n' +
    'keywords:  teach, learn\n' +
    'title: Questions fréquentes\n' +
    'author: Jacques L. Chereau\n' +
    'language: en\n' +
    'author_url: https://github.com/jlchereau\n' +
    'avatar_url: https://avatars.githubusercontent.com/u/2556751?v=3\n' +
    'creation_date: 2015-04-24T18:31:38Z\n' +
    'edit_url: https://github.com/Memba/test/blob/master/fr/pages/faqs.md\n' +
    '---\n';
var text = '## Question 1\n' +
    'Response 1\n\n' +
    '## Question 2\n' +
    'Response 2\n\n' +
    '## Question 3\n' +
    'Response 3';
var html = '<h2 id="question-1">Question 1</h2>\n' +
    '<p>Response 1</p>\n' +
    '<h2 id="question-2">Question 2</h2>\n' +
    '<p>Response 2</p>\n' +
    '<h2 id="question-3">Question 3</h2>\n' +
    '<p>Response 3</p>\n'; //Note: for whatever reason a \n is added

describe('lib/markdown', function() {

    it('It should clean markdown from yml', function() {
        var clean = markdown.clean(keyval + text);
        expect(clean).to.equal(text);
    });

    it('It should convert yml key/values to hashed object', function() {
        var yml = markdown.yml(keyval + text);
        expect(yml).to.have.property('uuid', '6037fe20-eb54-11e4-9cc1-795dae8caad4');
        expect(yml).to.have.property('description', 'Kidoju - A new way to teach and learn');
        expect(yml).to.have.property('icon', 'speech_balloon_question');
        expect(yml).to.have.property('keywords', 'teach, learn');
        expect(yml).to.have.property('title', 'Questions fréquentes');
        expect(yml).to.have.property('author', 'Jacques L. Chereau');
        expect(yml).to.have.property('language', 'en');
        expect(yml).to.have.property('author_url', 'https://github.com/jlchereau');
        expect(yml).to.have.property('avatar_url', 'https://avatars.githubusercontent.com/u/2556751?v=3');
        expect(yml).to.have.property('creation_date', '2015-04-24T18:31:38Z');
        expect(yml).to.have.property('edit_url', 'https://github.com/Memba/test/blob/master/fr/pages/faqs.md');
    });

    it('It should convert markdown text to html', function() {
        var rendered = markdown.render(text);
        expect(rendered).to.equal(html);
    });

});

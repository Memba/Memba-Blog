/**
 * Copyright (c) 2013-2021 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, mocha: true, expr: true */

'use strict';

var expect = require('chai').expect;
var markdown = require('../../../webapp/lib/markdown');

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
var html = '<h2>Question 1</h2>\n' +
    '<p>Response 1</p>\n' +
    '<h2>Question 2</h2>\n' +
    '<p>Response 2</p>\n' +
    '<h2>Question 3</h2>\n' +
    '<p>Response 3</p>\n'; // Note: for whatever reason a \n is added

var text2 = '## Image 1\n' +
    '![IMAGE 1](http://monsite.com/image1.jpg)\n' +
    '## Image 2\n' +
    '![IMAGE 2](http://monsite.com/image2.jpg)\n';
var text3 = '## Image 1\n' +
    '![IMAGE 1](http://monsite.com/image1.jpg)\n' +
    '## Video 1\n' +
    '@[youtube](InqU8CLwbPg)\n' +
    '## Image 2\n' +
    '![IMAGE 2](http://monsite.com/image2.jpg)\n' +
    '## Video 2\n' +
    '@[youtube](qoXk1_3KRZg)';



describe('lib/markdown', function () {

    it('body', function () {
        var body = markdown.body(keyval + text);
        expect(body).to.equal(text);
    });

    it('head', function () {
        var head = markdown.head(keyval + text);
        expect(head).to.have.property('uuid', '6037fe20-eb54-11e4-9cc1-795dae8caad4');
        expect(head).to.have.property('description', 'Kidoju - A new way to teach and learn');
        expect(head).to.have.property('icon', 'speech_balloon_question');
        expect(head).to.have.property('keywords', 'teach, learn');
        expect(head).to.have.property('title', 'Questions fréquentes');
        expect(head).to.have.property('author', 'Jacques L. Chereau');
        expect(head).to.have.property('language', 'en');
        expect(head).to.have.property('author_url', 'https://github.com/jlchereau');
        expect(head).to.have.property('avatar_url', 'https://avatars.githubusercontent.com/u/2556751?v=3');
        expect(head).to.have.property('creation_date', '2015-04-24T18:31:38Z');
        expect(head).to.have.property('edit_url', 'https://github.com/Memba/test/blob/master/fr/pages/faqs.md');
    });

    it('html rendering', function () {
        var rendered = markdown.render(text);
        expect(rendered).to.equal(html);
    });

    it('image', function () {
        var image1 = markdown.image(text);
        expect(image1).to.be.an.undefined;
        var images2 = markdown.image(text2);
        expect(images2).to.equal('http://monsite.com/image1.jpg');
        var images3 = markdown.image(text3);
        expect(images3).to.equal('http://img.youtube.com/vi/InqU8CLwbPg/0.jpg');
    });

});

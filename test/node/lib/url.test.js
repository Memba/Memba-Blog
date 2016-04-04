/**
 * Copyright (c) 2013-2016 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, mocha: true, expr: true */

'use strict';

var expect = require('chai').expect;
var url = require('../../../webapp/lib/url');

describe('lib/url', function () {

    it('join: simple case', function () {
        expect(url.join('http://www.google.com/', 'foo/bar', '?test=123'))
            .to.equal('http://www.google.com/foo/bar?test=123');
    });

    it('join: protocol', function () {
        expect(url.join('http:', 'www.google.com/', 'foo/bar', '?test=123'))
            .to.equal('http://www.google.com/foo/bar?test=123');
    });

    it('join: extra slashes', function () {
        expect(url.join('http:', 'www.google.com///', 'foo/bar', '?test=123'))
            .to.equal('http://www.google.com/foo/bar?test=123');
    });

    it('join: anchors in urls', function () {
        expect(url.join('http:', 'www.google.com///', 'foo/bar', '?test=123', '#faaaaa'))
            .to.equal('http://www.google.com/foo/bar?test=123#faaaaa');
    });

    it('join: github page paths', function () {
        expect(url.join('en', '/pages', 'foo/bar.md'))
            .to.equal('en/pages/foo/bar.md');
        expect(url.join('en/', '/pages/', '/foo/bar.md'))
            .to.equal('en/pages/foo/bar.md');
    });

    it('join: formatting %s', function () {
        expect(url.join('blog/%s', 'posts', '2013/%s'))
            .to.equal('blog/%s/posts/2013/%s');
    });

});

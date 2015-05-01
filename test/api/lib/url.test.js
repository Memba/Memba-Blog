/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, expr: true */
/* globals describe: false, before: false, it: false */

'use strict';

var expect = require('chai').expect,
    url = require('../../../webapp/lib/url');

describe('lib/url', function() {

    it('should work for simple case', function () {
        expect(url.join('http://www.google.com/', 'foo/bar', '?test=123'))
            .to.equal('http://www.google.com/foo/bar?test=123');
    });

    it('should be able to join protocol', function () {
        expect(url.join('http:', 'www.google.com/', 'foo/bar', '?test=123'))
            .to.equal('http://www.google.com/foo/bar?test=123');
    });

    it('should remove extra slashes', function () {
        expect(url.join('http:', 'www.google.com///', 'foo/bar', '?test=123'))
            .to.equal('http://www.google.com/foo/bar?test=123');
    });

    it('should support anchors in urls', function () {
        expect(url.join('http:', 'www.google.com///', 'foo/bar', '?test=123', '#faaaaa'))
            .to.equal('http://www.google.com/foo/bar?test=123#faaaaa');
    });

    it('should work with our github page paths', function () {
        expect(url.join('en', '/pages', 'foo/bar.md'))
            .to.equal('en/pages/foo/bar.md');
        expect(url.join('en/', '/pages/', '/foo/bar.md'))
            .to.equal('en/pages/foo/bar.md');
    });

});

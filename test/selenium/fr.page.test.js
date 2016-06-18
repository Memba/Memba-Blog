/**
 * Copyright (c) 2013-2016 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, mocha: true, expr: true */

'use strict';

var expect = require('chai').expect;
var util = require('util');

var server = require('../../webapp/server'); // Start the web application
var config = require('../../webapp/config');
var url = require('../../webapp/lib/url');
var webapp = {
    // home: url.join(config.get('uris:webapp:root'), config.get('uris:webapp:home')),
    index: url.join(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:pages'), 'fr', '')) + '/',
    faqs: url.join(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:pages'), 'fr', 'faqs')),
    privacy: url.join(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:pages'), 'fr', 'privacy')),
    terms: url.join(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:pages'), 'fr', 'terms'))
};


describe('French pages', function () {

    before(function (done) {
        browser.url(webapp.index);
        // Note: it won't work in PhantomJS without settings the window size
        browser.windowHandleSize({ width:1280, height:800 });
    });

    describe('When navigating pages', function () {

        it('it should find and navigate support', function () {
            browser.logger.info(browser.getUrl());
            browser.click('nav.navbar a[href="/fr/"]');
            expect(browser.getUrl()).to.equal(webapp.index);
            expect(browser.getAttribute('html', 'lang')).to.equal('fr');
            expect(browser.getText('div.page-header span')).to.equal('Support');
        });

        it('it should find and navigate faqs', function () {
            browser.logger.info(browser.getUrl());
            browser.click('nav.navbar a.dropdown-toggle');
            browser.click('nav.navbar a[href="/fr/faqs"]');
            expect(browser.getUrl()).to.equal(webapp.faqs);
            expect(browser.getAttribute('html', 'lang')).to.equal('fr');
            expect(browser.getText('div.page-header span')).to.equal('Questions fréquentes');
        });

        it('it should find and navigate privacy', function () {
            browser.logger.info(browser.getUrl());
            browser.click('nav.navbar a.dropdown-toggle');
            browser.click('nav.navbar a[href="/fr/privacy"]');
            expect(browser.getUrl()).to.equal(webapp.privacy);
            expect(browser.getAttribute('html', 'lang')).to.equal('fr');
            expect(browser.getText('div.page-header span')).to.equal('Confidentialité des données');
        });

        it('it should find and navigate terms', function () {
            browser.logger.info(browser.getUrl());
            browser.click('nav.navbar a.dropdown-toggle');
            browser.click('nav.navbar a[href="/fr/terms"]');
            expect(browser.getUrl()).to.equal(webapp.terms);
            expect(browser.getAttribute('html', 'lang')).to.equal('fr');
            expect(browser.getText('div.page-header span')).to.equal('Conditions d\'utilisation');
        });

    });

    after(function () {
        // browser.end();
        server.close();
    });

});

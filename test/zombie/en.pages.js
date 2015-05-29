/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, expr: true */
/* globals describe: false, before: false, it: false, after: false */

'use strict';

var util = require('util'),
    server = require('../../webapp/server'), //Start the web application
    config = require('../../webapp/config'),
    url = require('../../webapp/lib/url'),
    webapp = {
        home: url.join(config.get('uris:webapp:root'), config.get('uris:webapp:home')),
        index: url.join(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:pages'), 'en', '')) + '/',
        faqs: url.join(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:pages'), 'en', 'faqs')),
        privacy: url.join(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:pages'), 'en', 'privacy')),
        terms: url.join(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:pages'), 'en', 'terms'))
    };

//Create a browser
var Zombie = require('zombie'),
    browser = new Zombie(/*{waitDuration: '10s'}*/);


describe('English pages', function() {

    before(function(done) {
        //browser.debug();
        //Increase max listeners in case of timeout
        browser.setMaxListeners(30);
        browser.visit(webapp.home, done);
    });

    describe('When navigating pages', function() {

        xit('Check that jQuery event handlers are triggered', function(done) {
            //See https://github.com/assaf/zombie/blob/master/test/jquery_compat_test.js#L149
            console.log(browser.window.$.expando);
            browser.window.$(browser.document).on('click', '.flag', function(e) {
                console.log('Triggered!');
                done();
            });
            browser.click('div.uk.flag');
        });

        it('it should land on the home page with a choice of languages', function(done) {
            browser.assert.success();
            browser.assert.attribute('html', 'lang', 'en');
            browser.assert.element('div.uk.flag');
            browser.assert.element('div.fr.flag');
            //TODO Get the click on flag to execute (jQuery event handler)
            done();
        });

        it('it should find support', function(done) {
            browser.clickLink('Support', function() {
                browser.assert.success();
                browser.assert.url(webapp.index);
                browser.assert.attribute('html', 'lang', 'en');
                browser.assert.text('div.page-header span', 'Support');
                done();
            });
        });

        it('it should find faqs', function(done) {
            browser.clickLink('FAQs', function() {
                browser.assert.success();
                browser.assert.url(webapp.faqs);
                browser.assert.attribute('html', 'lang', 'en');
                browser.assert.text('div.page-header span', 'Frequently Asked Questions');
                done();
            });
        });

        it('it should find privacy', function(done) {
            browser.clickLink('Privacy Policy', function() {
                browser.assert.success();
                browser.assert.url(webapp.privacy);
                browser.assert.attribute('html', 'lang', 'en');
                browser.assert.text('div.page-header span', 'Privacy Policy');
                done();
            });
        });

        it('it should find terms', function(done) {
            browser.clickLink('Terms of Use', function() {
                browser.assert.success();
                browser.assert.url(webapp.terms);
                browser.assert.attribute('html', 'lang', 'en');
                browser.assert.text('div.page-header span', 'Terms of Use');
                done();
            });
        });

    });

    after(function() {
        browser.destroy();
    });

});

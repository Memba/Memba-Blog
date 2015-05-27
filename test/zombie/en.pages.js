/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, expr: true */
/* globals describe: false, before: false, it: false, after: false */

'use strict';

//Start the web application
var webapp = require('../../webapp/server');
    //expect = require('chai').expect;

//Create a browser
var Zombie = require('zombie'),
    browser = new Zombie(/*{waitDuration: '10s'}*/);


describe('English pages', function() {

    before(function(done) {
        //browser.debug();
        //Increase max listeners in case of timeout
        browser.setMaxListeners(30);
        browser.visit('http://localhost:3000', done);
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
                browser.assert.url('http://localhost:3000/en/');
                browser.assert.attribute('html', 'lang', 'en');
                browser.assert.text('div.page-header span', 'Support');
                done();
            });
        });

        it('it should find faqs', function(done) {
            browser.clickLink('FAQs', function() {
                browser.assert.success();
                browser.assert.url('http://localhost:3000/en/faqs');
                browser.assert.attribute('html', 'lang', 'en');
                browser.assert.text('div.page-header span', 'Frequently Asked Questions');
                done();
            });
        });

        it('it should find privacy', function(done) {
            browser.clickLink('Privacy Policy', function() {
                browser.assert.success();
                browser.assert.url('http://localhost:3000/en/privacy');
                browser.assert.attribute('html', 'lang', 'en');
                browser.assert.text('div.page-header span', 'Privacy Policy');
                done();
            });
        });

        it('it should find terms', function(done) {
            browser.clickLink('Terms of Use', function() {
                browser.assert.success();
                browser.assert.url('http://localhost:3000/en/terms');
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

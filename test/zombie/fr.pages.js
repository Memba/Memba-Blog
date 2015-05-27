/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, expr: true */
/* globals describe: false, before: false, it: false, after: false  */

'use strict';

//Start the web application
var webapp = require('../../webapp/server');
//expect = require('chai').expect;

//Create a browser
var Zombie = require('zombie'),
    browser = new Zombie(/*{waitDuration: '10s'}*/);


describe('French pages', function() {

    before(function(done) {
        //browser.debug();
        //Increase max listeners in case of timeout
        browser.setMaxListeners(30);
        browser.visit('http://localhost:3000/fr', done);
    });

    describe('When navigating pages', function() {

        it('it should find support', function(done) {
            browser.clickLink('Support', function() {
                browser.assert.success();
                browser.assert.url('http://localhost:3000/fr/');
                browser.assert.attribute('html', 'lang', 'fr');
                browser.assert.text('div.page-header span', 'Support');
                done();
            });
        });

        it('it should find faqs', function(done) {
            browser.clickLink('FAQs', function() {
                browser.assert.success();
                browser.assert.url('http://localhost:3000/fr/faqs');
                browser.assert.attribute('html', 'lang', 'fr');
                browser.assert.text('div.page-header span', 'Questions fréquentes');
                done();
            });
        });

        it('it should find privacy', function(done) {
            browser.clickLink('Confidentialité des Données', function() {
                browser.assert.success();
                browser.assert.url('http://localhost:3000/fr/privacy');
                browser.assert.attribute('html', 'lang', 'fr');
                browser.assert.text('div.page-header span', 'Confidentialité des données');
                done();
            });
        });

        it('it should find terms', function(done) {
            browser.clickLink('Conditions d\'Utilisation', function() {
                browser.assert.success();
                browser.assert.url('http://localhost:3000/fr/terms');
                browser.assert.attribute('html', 'lang', 'fr');
                browser.assert.text('div.page-header span', 'Conditions d\'utilisation');
                done();
            });
        });

    });

    after(function() {
        browser.destroy();
    });

});


/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, expr: true */
/* globals describe: false, before: false, it: false, after: false  */

'use strict';

var util = require('util'),
    server = require('../../../webapp/server'), //Start the web application
    config = require('../../../webapp/config'),
    url = require('../../../webapp/lib/url'),
    webapp = {
        //home: url.join(config.get('uris:webapp:root'), config.get('uris:webapp:home')),
        index: url.join(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:pages'), 'fr', '')) + '/',
        faqs: url.join(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:pages'), 'fr', 'faqs')),
        privacy: url.join(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:pages'), 'fr', 'privacy')),
        terms: url.join(config.get('uris:webapp:root'), util.format(config.get('uris:webapp:pages'), 'fr', 'terms'))
    };

//Create a browser
var Zombie = require('zombie'),
    browser = new Zombie(/*{waitDuration: '10s'}*/);


describe('French pages', function() {

    before(function(done) {
        //Increase max listeners in case of timeout
        browser.setMaxListeners(30);
        browser.visit(webapp.index, done);
    });

    describe('When navigating pages', function() {

        it('it should find support', function(done) {
            browser.clickLink('Support', function() {
                browser.assert.success();
                browser.assert.url(webapp.index);
                browser.assert.attribute('html', 'lang', 'fr');
                browser.assert.text('div.page-header span', 'Support');
                done();
            });
        });

        it('it should find faqs', function(done) {
            browser.clickLink('FAQs', function() {
                browser.assert.success();
                browser.assert.url(webapp.faqs);
                browser.assert.attribute('html', 'lang', 'fr');
                browser.assert.text('div.page-header span', 'Questions fréquentes');
                done();
            });
        });

        it('it should find privacy', function(done) {
            browser.clickLink('Confidentialité des Données', function() {
                browser.assert.success();
                browser.assert.url(webapp.privacy);
                browser.assert.attribute('html', 'lang', 'fr');
                browser.assert.text('div.page-header span', 'Confidentialité des données');
                done();
            });
        });

        it('it should find terms', function(done) {
            browser.clickLink('Conditions d\'Utilisation', function() {
                browser.assert.success();
                browser.assert.url(webapp.terms);
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


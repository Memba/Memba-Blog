/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, mocha: true, expr: true */

'use strict';

var expect = require('chai').expect;
var plugins;
try {
    plugins = require('../../../webapp/plugins');
} catch (exception) {
    plugins = require('../../../webapp/plugins');
}


describe('plugins/slack', function () {

    before(function () {
        plugins.load();
    });

    it('should send without error', function (done) {
        plugins.emit('slack', {
            slack: {
                channel: '#devtest',
                level: 'debug',
                text: 'Slack test'
            },
            model: {
                name: 'world',
                dummy: 'toto'
            }
        });
        setTimeout(done, 500);
    });

});

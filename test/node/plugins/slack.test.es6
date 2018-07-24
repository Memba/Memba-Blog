/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// const { expect } = require('chai');
const plugins = require('../../../webapp/plugins/index.es6');

describe('plugins/slack', () => {
    before(() => {
        plugins.load();
    });

    it('should send without error', done => {
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

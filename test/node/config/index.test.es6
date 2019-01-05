/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const config = require('../../../webapp/config/index.es6');

describe('config/index.es6', () => {
    it('it should return environment', () => {
        expect(config.environment).to.equal(
            config.get('NODE:ENV') || 'production'
        );
    });

    it('it should return application name from default.json', () => {
        expect(config.get('application:name')).not.to.be.undefined;
    });

    it('it should return express port from <environment>.json', () => {
        expect(config.get('express:port')).not.to.be.undefined;
        expect(typeof config.get('express:port')).to.equal('number');
    });

    it('it should return undefined for an unknown paramater', () => {
        expect(config.get('a:b:c')).to.be.undefined;
    });
});

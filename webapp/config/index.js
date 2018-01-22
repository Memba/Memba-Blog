/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var nconf = require('nconf');
var path = require('path');
var awss3;

try { awss3 = require('./awss3'); } catch (ex) {}

function Config() {
    // nconf.argv().env('_');
    nconf.env({ separator: '_', whitelist: ['NODE_ENV'] });
    this.environment = nconf.get('NODE:ENV') || 'production';
    nconf.file('default', path.join(__dirname, 'default.json'));
    if (awss3 && this.environment === 'production') {
        nconf.use('awss3', { bucket: nconf.get('awss3:config:bucket'), key: nconf.get('awss3:config:key') });
    } else {
        nconf.file(this.environment, path.join(__dirname, this.environment + '.json'));
    }
}

/**
 * Load config (especially from AWS S3)
 * @param callback
 */
Config.prototype.load = function (callback) {
    if (awss3 && this.environment === 'production') {
        nconf.load(callback);
    } else {
        process.nextTick(callback);
    }
};

/**
 * Get a config key
 * @param key
 * @returns {String|*}
 */
Config.prototype.get = function (key) {
    return nconf.get(key);
};

/**
 * Set a config key
 * @param key
 * @param value
 * @returns {String|*}
 */
Config.prototype.set = function (key, value) {
    return nconf.set(key, value);
};

module.exports = new Config();

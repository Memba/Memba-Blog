/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var nconf = require('nconf'),
    path = require('path');

function Config(){
    nconf.argv().env('_');
    this.environment = nconf.get('NODE:ENV') || 'production';
    nconf.file(this.environment, path.join(__dirname, this.environment + '.json'));
    nconf.file('default', path.join(__dirname, 'default.json'));
}

/**
 * Get a config key
 * @param key
 * @returns {String|*}
 */
Config.prototype.get = function(key) {
    return nconf.get(key);
};

module.exports = new Config();

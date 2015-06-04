/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jslint node: true */
/* jshint node: true */

'use strict';

var nconf = require('nconf'),
    path = require('path');

function Config(){
    nconf.argv().env('_');
    var environment = nconf.get('NODE:ENV') || 'production';
    console.log('nconf environment is ' + environment);
    nconf.file(environment, path.join(__dirname, environment + '.json'));
    nconf.file('default', path.join(__dirname, 'default.json'));
}

/**
 * Get a config key
 * @param key
 * @returns {*}
 */
Config.prototype.get = function(key) {
    return nconf.get(key);
};

module.exports = new Config();

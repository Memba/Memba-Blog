/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const nconf = require('nconf');
const path = require('path');

let awss3;
try {
    // eslint-disable-next-line global-require, import/no-unresolved, node/no-missing-require
    awss3 = require('./awss3.es6');
} catch (ex) {} // eslint-disable-line no-empty

// nconf.argv().env('_');
nconf.env({ separator: '_', whitelist: ['NODE_ENV'] });
const environment = nconf.get('NODE:ENV') || 'production';
nconf.file('default', path.join(__dirname, 'default.json'));
if (awss3 && environment === 'production') {
    nconf.use('awss3', {
        bucket: nconf.get('awss3:config:bucket'),
        key: nconf.get('awss3:config:key')
    });
} else {
    nconf.file(environment, path.join(__dirname, `${environment}.json`));
}

module.exports = {
    /**
     * Value of NODE_ENV or `production`
     */
    environment,

    /**
     * Load config (especially from AWS S3)
     * @param callback
     */
    load(callback) {
        if (awss3 && environment === 'production') {
            nconf.load(callback);
        } else {
            process.nextTick(callback);
        }
    },

    /**
     * Get a config key
     * @param key
     * @returns {String|*}
     */
    get(key) {
        return nconf.get(key);
    },

    /**
     * Set a config key
     * @param key
     * @param value
     * @returns {String|*}
     */
    set(key, value) {
        return nconf.set(key, value);
    }
};

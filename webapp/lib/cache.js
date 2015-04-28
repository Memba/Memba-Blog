/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var LRU = require("lru-cache"),
    options = {
        max: 500,
        maxAge: 1000 * 60 * 60 * 24
    },
    cache = LRU(options);

/**
 * preprocessing of keys for compatibility with lru-cache
 * @param key
 */
function process(key) {
    return key.replace(/\/|\\/g, '$');
}

module.exports = {

    /**
     * Get the value from a key
     * @param key
     */
    get: function(key) {
        return cache.get(process(key));
    },

    /**
     *  Set the value of a key
     *  @param key
     *  @param value
     */
    set: function(key, value) {
        cache.set(process(key), value);
    },

    /**
     * Reset (empty) the cache
     */
    reset: function() {
        //reset: cache.reset does not work
        cache.reset();
    }

};

/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jslint node: true */
/* jshint node: true */

'use strict';

var LRU = require("lru-cache"),
    options = {
        max: 500,
        maxAge: 1000 * 60 * 60 * 24
    },
    cache = LRU(options);

module.exports = {

    /**
     * Get the value from a key
     * @param key
     */
    get: cache.get,

    /**
     *  Set the value of a key
     *  @param key
     *  @param value
     */
    set: cache.set,

    /**
     * Reset (empty) the cache
     */
    reset: cache.reset

};

/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jslint node: true */
/* jshint node: true */

'use strict';

var request = require('request'),
    util = require('util'),
    config = require('../config'),
    HttpError = require('./httpError');

module.exports = {

    /**
     * Get page
     * @param slug
     * @param callback
     */
    getPage: function(slug, callback) {

        //scan lru-cache for slug

        //if located in cache, find from disk

        //otherwise download from github and update cache

    }

};

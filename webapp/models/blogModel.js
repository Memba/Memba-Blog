/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jslint node: true */
/* jshint node: true */

'use strict';

var github = require('../lib/github'),
    markdown = require('../lib/markdown');

module.exports = {

    /**
     * Get blog data
     * @param query
     * @param callback
     */
    getBlogData: function(query, callback) {

        //scan lru-cache for slug

        //if located in cache, read from disk

        //otherwise download from github and update cache

        //Read yml

        //Return complex object

        callback(false, {});

    }

};

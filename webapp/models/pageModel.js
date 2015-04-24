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
     * Get page data
     * @param query
     * @param callback
     */
    getPageData: function(query, callback) {

        //scan lru-cache for slug

        //if located in cache, find from disk

        //otherwise download from github and update cache


        github.getContent('', '', function(error, response) {
            if(!error && response) {
                var yml = markdown.yml(response),
                    data = {
                        content: markdown.render(response),
                        description: yml.description,
                        icon: null,
                        title: yml.title
                    };
                callback(null, data);
            } else {
                callback(error)
            }

        });

    }

};

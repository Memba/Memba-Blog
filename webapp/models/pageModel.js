/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jslint node: true */
/* jshint node: true */

'use strict';

var github = require('../lib/github'),
    marked = require('marked'),
    highlight = require('highlight.js');

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
        return highlight.highlightAuto(code).value;
    }
});

module.exports = {

    /**
     * Get page
     * @param query
     * @param callback
     */
    getPageData: function(query, callback) {

        //scan lru-cache for slug

        //if located in cache, find from disk

        //otherwise download from github and update cache


        github.getContent('', '', function(error, response) {
            if(!error && response) {
                var data = {
                    content: marked(response),
                    description: '',
                    title: ''
                };
                callback(null, data);
            } else {
                callback(error)
            }

        });

    }

};

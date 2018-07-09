/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var convert = require('../lib/convert');
var github = require('../lib/github');
var ApplicationError = require('../lib/applicationError.es6');
var cache = {};

module.exports = {

    /**
     * Get menu for designated language
     * @param language
     * @param callback
     */
    getMenu : function (language, callback) {
        // TODO: check available locales
        var menu = cache[language];
        if (menu) {
            callback(null, menu);
        } else {
            github.getContent(convert.getMenuPath(language), function (error, response) {
                if (!error && response) {
                    var buf = Buffer.from(response.content, 'base64');
                    var content = buf.toString();
                    var menu = JSON.parse(content);
                    cache[language] = menu;
                    callback(null, menu);
                } else {
                    callback(error); // TODO: || not found
                }
            });
        }
    },

    /**
     * Reset cache
     */
    resetCache: function () {
        cache = {};
    }

};

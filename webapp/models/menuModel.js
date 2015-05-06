/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var cache = require('../lib/cache'),
    convert = require('../lib/convert'),
    github = require('../lib/github'),
    ApplicationError = require('../lib/error');

module.exports = {

    /**
     * Get menu for designated language
     * @param language
     * @param callback
     */
    getMenu : function(language, callback) {
        //TODO: check available locales
        var menu = cache.getMenu(language);
        if(menu) {
            callback(null, menu);
        } else {
            github.getContent(convert.getMenuPath(language), function (error, response) {
                if (!error && response) {
                    try {
                        var buf = new Buffer(response.content, 'base64'),
                            content = buf.toString(),
                        menu = JSON.parse(content);
                        if (cache.isEnabled()) {
                            cache.setMenu(language, menu);
                        }
                        callback(null, menu);
                    } catch (exception) {
                        callback(exception);
                    }
                } else {
                    callback(error); //TODO: || not found
                }
            });
        }
    }
};

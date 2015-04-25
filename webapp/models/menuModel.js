/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jslint node: true */
/* jshint node: true */

'use strict';

var config = require('../config'),
    cache = require('../lib/cache'),
    github = require('../lib/github');

module.exports = {

    /**
     * Get menu in current locale
     * @param locale
     * @param callback
     */
    get : function(locale, callback) {

        var uri = config.get('github:' + locale + ':menu'),
            menu = cache.get(uri);

        if(menu) {
            callback(null, menu);
        } else {
            github.getContent(uri, function (error, data) {
                if (!error && data) {
                    try {
                        menu = JSON.parse(data);
                        if (config.get('cache')) {
                            cache.set(uri, menu);
                        }
                        callback(null, menu);
                    } catch (exception) {
                        callback(exception);
                    }
                } else (
                    callback(error) //TODO: || not found
                )
            });
        }
    }

};

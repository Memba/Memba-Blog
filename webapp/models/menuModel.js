/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var util = require('util'),
    config = require('../config'),
    cache = require('../lib/cache'),
    github = require('../lib/github');

module.exports = {

    /**
     * Get menu in current language
     * @param language
     * @param callback
     */
    get : function(language, callback) {

        var uri = util.format(config.get('github:menu'), language),
            menu = cache.get(uri);

        if(menu) {
            callback(null, menu);
        } else {
            github.getContent(uri, function (error, response) {
                if (!error && response) {
                    try {
                        var buf = new Buffer(response.content, 'base64'),
                            content = buf.toString(),
                        menu = JSON.parse(content);
                        if (config.get('cache$')) { //Note: `cache` breaks webpack build
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

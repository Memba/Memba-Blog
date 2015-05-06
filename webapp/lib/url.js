/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

function normalize (str) {
    return str
        .replace(/[\/]+/g, '/')
        .replace(/\/\?/g, '?')
        .replace(/\/\#/g, '#')
        .replace(/\:\//g, '://');
}

module.exports = {

    /**
     * Join url fragments
     * @see https://github.com/jfromaniello/url-join/blob/master/lib/url-join.js
     * @returns {string}
     */
    join: function() {
        var joined = [].slice.call(arguments, 0).join('/');
        return normalize(joined);
    }

};

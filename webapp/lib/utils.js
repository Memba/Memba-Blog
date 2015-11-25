/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var uuid = require('node-uuid');
var deepExtend = require('deep-extend');

/**
 * Miscellaneous utility functions
 * @type {{isObject: Function, isEmptyObject: Function, deepExtend: (*|exports|module.exports), uuid: (*|v1)}}
 */
module.exports = {

    /**
     * Checks whether `obj` is an object.
     * @param obj
     * @returns {boolean}
     */
    isObject: function (obj) {
        return '[object Object]' === Object.prototype.toString.call(obj); // ((obj instanceof Object) && (typeof obj === 'object'));
    },

    /**
     * Checks whether `obj` is an empty object
     * @param obj
     * @returns {boolean}
     */
    isEmptyObject: function (obj) {
        return '[object Object]' === Object.prototype.toString.call(obj) && 0 === Object.keys(obj).length;
    },

    /**
     * Similar to $.extend
     * @see https://github.com/unclechu/node-deep-extend
     * @param obj
     * @param obj1, obj2, ...
     */
    deepExtend: deepExtend,

    /**
     * uuid generator
     * @see https://github.com/broofa/node-uuid
     * @see http://jsperf.com/node-uuid-performance/24
     * @returns {string}
     */
    uuid: uuid.v1

};

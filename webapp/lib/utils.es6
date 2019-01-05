/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const { v1 } = require('uuid');
const deepExtend = require('deep-extend');

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
    isObject(obj) {
        // if (Buffer.isBuffer(obj)) { return true; }
        return Object.prototype.toString.call(obj) === '[object Object]';
    },

    /**
     * Checks whether `obj` is a plain object.
     * @param obj
     * @returns {boolean}
     */
    isPOJO(obj) {
        if (obj === null || typeof obj !== 'object') {
            return false;
        }
        return Object.getPrototypeOf(obj) === Object.prototype;
    },

    /**
     * Checks whether `obj` is an empty object
     * @param obj
     * @returns {boolean}
     */
    isEmptyObject(obj) {
        return (
            Object.prototype.toString.call(obj) === '[object Object]' &&
            Object.keys(obj).length === 0
        );
    },

    /**
     * Similar to $.extend
     * @see https://github.com/unclechu/node-deep-extend
     * @param obj
     * @param obj1, obj2, ...
     */
    deepExtend,

    /**
     * uuid generator
     * @see https://github.com/kelektiv/node-uuid
     * @returns {string}
     */
    uuid: v1
};

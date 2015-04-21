/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jslint node: true */
/* jshint node: true */

'use strict';

module.exports = exports = {

    /**
     * Checks if `obj` is an object.
     * @param obj
     * @returns {boolean}
     */
    isObject: function (obj) {
        return '[object Object]' === Object.prototype.toString.call(obj); //((obj instanceof Object) && (typeof obj === 'object'));
    },

    /**
     * Checks if `obj` is an empty object
     * @param obj
     * @returns {boolean}
     */
    isEmptyObject: function(obj) {
        return '[object Object]' === Object.prototype.toString.call(obj) && 0 === Object.keys(obj).length;
    },

    /**
     * Similar to $.extend
     * @param obj
     * @param properties
     */
    extendObject: function (obj, properties) {
        for (var name in properties) {
            if (properties.hasOwnProperty(name)) {
                var value = properties[name];
                if (exports.isObject(value)) {
                    if (!exports.isObject(obj[name])) {
                        obj[name] = {};
                    }
                    exports.extendObject(obj[name], value);
                } else {
                    obj[name] = value;
                }
            }
        }
        return obj;
    }
};

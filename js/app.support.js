/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true, jquery: true */
/* globals define: false */

(function(f, define){
    'use strict';
    define([], f);
})(function(){

    'use strict';

    (function () {

        var app = window.app = window.app || {};

        /**
         * Log a message
         * @param message
         */
        function log(message) {
            if (app.DEBUG && window.console && (typeof window.console.log === 'function')) {
                window.console.log('app.support: ' + message);
            }
        }

        /**
         * Test features/application requirements
         */
        app.support = {
            _test: function () {

                /**
                 * CSS transforms support
                 */
                app.support.cssTransforms = (function () {
                    return false; //TODO
                }());

                //TODO web workers

                /**
                 * drag and drop support (see Modernizr)
                 */
                app.support.dragAndDrop = (function () {
                    var element = document.createElement('div');
                    return ('draggable' in element) || ('ondragstart' in element && 'ondrop' in element);
                }());

                /**
                 * hashchange support
                 */
                app.support.hashChange = (function () {
                    return ('onhashchange' in window);
                }());
                //

                /**
                 * localStorage support (from Modernizr)
                 */
                app.support.localStorage = (function () {
                    var TEST = '__test__';
                    try {
                        localStorage.setItem(TEST, TEST);
                        localStorage.removeItem(TEST);
                        return true;
                    } catch (e) {
                        return false;
                    }
                }());

                /**
                 * Canvas support (frm Modernizr)
                 */
                app.support.canvas = (function () {
                    var elem = document.createElement('canvas');
                    return !!(elem.getContext && elem.getContext('2d'));
                }());

                /**
                 * SVG support (from Modernizr)
                 */
                app.support.svg = (function () {
                    return !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
                }());

                //TODO: audio and video
            }
        };

        /**
         * Launch browser test
         */
        app.support._test();
        log('browser tested');

        //TODO: Test Minimum requirements and display error message if requirements are not met

    }());

    return window.app.support;

}, typeof define === 'function' && define.amd ? define : function(_, f){ 'use strict'; f(); });

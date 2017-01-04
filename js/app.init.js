/**
 * Copyright (c) 2013-2016 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true */
/* globals require: false, __NODE_ENV__: false */

if (typeof(require) === 'function') {
    // require('./window.assert');
    // require('./window.logger');
    // require('./app.logger.js');
    require('./app.config.jsx?env=' + __NODE_ENV__);
    require('./app.support.js');
}

/**
 * The application has <meta name="apple-mobile-web-app-capable" content="yes">
 * so to run the app full screen when pinned to IOS home screen
 * The following prevents links from opening in a new safari window
 * Source: https://gist.github.com/irae/1042167
 */
(function () {

    'use strict';

    var document = window.document;
    var navigator = window.navigator;
    var STANDALONE = 'standalone';

    // Prevents links from opening in mobile safari when web application is running standalone (web-app-capable)
    // Especially when navigating categories or searching for kidojus in the explorer
    // Note: to debug in Chrome, remove the standalone test
    if ((STANDALONE in navigator) && navigator[STANDALONE]) {

        var location = document.location;
        var CLOSEST = /^(a|html)$/i;
        var STRING = 'string';

        document.addEventListener('click', function (e) {
            var curnode = e.target;
            // Find the closest anchor
            while (!(CLOSEST).test(curnode.nodeName)) {
                curnode = curnode.parentNode;
            }
            var chref = curnode.href;
            if (
                $.type(chref) === STRING &&                                                                     // is a link
                chref.length > 1 &&                                                                             // is not empty (signInDialog or searchPanel) or '#'
                chref !== location.href &&                                                                      // is not identical to the location href
                // chref.replace(location.protocol + '//' + location.host + location.pathname, '').length > 1 &&
                chref.replace(location.protocol + '//' + location.host + location.pathname, '').indexOf('#') && // is not an anchor on the same page
                (!(/^[a-z\+\.\-]+:/i).test(chref) ||                                                            // either does not have a proper scheme (relative links)
                chref.indexOf(location.protocol + '//' + location.host) === 0)                                  // or is in the same protocol and domain
            ) {
                e.preventDefault();
                location.assign(chref);
            }
        }, false);
    }

} ());

/**
 * Check browser features and redirect to error page if any essential feature is missing
 */
(function () {

    'use strict';

    var app = window.app;
    var location = window.location;
    // Note: jQuery, kendo and app.i18n are not yet loaded
    var lang = window.document.getElementsByTagName('html')[0].getAttribute('lang');
    var errorUrl = app.uris.webapp.error.replace('{0}', lang);
    var qaEnvironment = app.DEBUG && (navigator.userAgent.indexOf('PhantomJS') >= 0); // window.PHANTOMJS and window.phantom do not seem to work

    // Make sure we are not debugging/testing in PhantomJS and we are not yet on the error page
    if (!qaEnvironment && location.href.substr(0, errorUrl.length) !== errorUrl) {

        // Check browser features
        // TODO consider testing javascript enabled
        var support = app.support;
        var requirements = support.atobbtoa &&
            support.audio && (support.audio.mp3 || support.audio.ogg) &&
            support.blobconstructor &&
            support.bloburls &&
            support.canvas && support.canvastext &&
            support.csstransforms &&
            // support.datauri &&
            support.filereader &&
            support.flexbox &&
            support.hashchange &&
            support.history &&
            support.localstorage && support.sessionstorage &&
            support.svg && support.inlinesvg && support.svgasimg &&
            // support.touchevents &&
            support.video && (support.video.h264 || support.video.ogg || support.video.webm) &&
            support.webworkers;

        // If any feature is missing, redirect to error page with error code 1000
        if (!requirements) {
            location.assign(errorUrl + '?code=1000');
        }
    }

} ());

/*! iNoBounce - v0.1.0
 * https://github.com/lazd/iNoBounce/
 * Copyright (c) 2013 Larry Davis <lazdnet@gmail.com>; Licensed BSD */
(function(global) {
    // Stores the Y position where the touch started
    var startY = 0;

    // Store enabled status
    var enabled = false;

    var handleTouchmove = function(evt) {
        // Get the element that was scrolled upon
        var el = evt.target;

        // Check all parent elements for scrollability
        while (el !== document.body) {
            // Get some style properties
            var style = window.getComputedStyle(el);

            if (!style) {
                // If we've encountered an element we can't compute the style for, get out
                break;
            }

            // Ignore range input element
            if (el.nodeName === 'INPUT' && el.getAttribute('type') === 'range') {
                return;
            }

            var scrolling = style.getPropertyValue('-webkit-overflow-scrolling');
            var overflowY = style.getPropertyValue('overflow-y');
            var height = parseInt(style.getPropertyValue('height'), 10);

            // Determine if the element should scroll
            var isScrollable = scrolling === 'touch' && (overflowY === 'auto' || overflowY === 'scroll');
            var canScroll = el.scrollHeight > el.offsetHeight;

            if (isScrollable && canScroll) {
                // Get the current Y position of the touch
                var curY = evt.touches ? evt.touches[0].screenY : evt.screenY;

                // Determine if the user is trying to scroll past the top or bottom
                // In this case, the window will bounce, so we have to prevent scrolling completely
                var isAtTop = (startY <= curY && el.scrollTop === 0);
                var isAtBottom = (startY >= curY && el.scrollHeight - el.scrollTop === height);

                // Stop a bounce bug when at the bottom or top of the scrollable element
                if (isAtTop || isAtBottom) {
                    evt.preventDefault();
                }

                // No need to continue up the DOM, we've done our job
                return;
            }

            // Test the next parent
            el = el.parentNode;
        }

        // Stop the bouncing -- no parents are scrollable
        evt.preventDefault();
    };

    var handleTouchstart = function(evt) {
        // Store the first Y position of the touch
        startY = evt.touches ? evt.touches[0].screenY : evt.screenY;
    };

    var enable = function() {
        // Listen to a couple key touch events
        window.addEventListener('touchstart', handleTouchstart, false);
        window.addEventListener('touchmove', handleTouchmove, false);
        enabled = true;
    };

    var disable = function() {
        // Stop listening
        window.removeEventListener('touchstart', handleTouchstart, false);
        window.removeEventListener('touchmove', handleTouchmove, false);
        enabled = false;
    };

    var isEnabled = function() {
        return enabled;
    };

    // Enable by default if the browser supports -webkit-overflow-scrolling
    // Test this by setting the property with JavaScript on an element that exists in the DOM
    // Then, see if the property is reflected in the computed style
    var testDiv = document.createElement('div');
    document.documentElement.appendChild(testDiv);
    testDiv.style.WebkitOverflowScrolling = 'touch';
    var scrollSupport = 'getComputedStyle' in window && window.getComputedStyle(testDiv)['-webkit-overflow-scrolling'] === 'touch';
    document.documentElement.removeChild(testDiv);

    if (scrollSupport) {
        enable();
    }

    // A module to support enabling/disabling iNoBounce
    var iNoBounce = {
        enable: enable,
        disable: disable,
        isEnabled: isEnabled
    };

    if (typeof module !== 'undefined' && module.exports) {
        // Node.js Support
        module.exports = iNoBounce;
    }
    if (typeof global.define === 'function') {
        // AMD Support
        (function(define) {
            define('iNoBounce', [], function() { return iNoBounce; });
        }(global.define));
    }
    else {
        // Browser support
        global.iNoBounce = iNoBounce;
    }
}(this));


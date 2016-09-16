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

    // prevents links from apps from opening in mobile safari
    // this javascript must be the first script in your <head>
    if ((STANDALONE in navigator) && navigator[STANDALONE]) {
        var curnode;
        var chref;
        var location = document.location;
        var stop = /^(a|html)$/i;
        document.addEventListener('click', function (e) {
            curnode = e.target;
            while (!(stop).test(curnode.nodeName)) {
                curnode = curnode.parentNode;
            }
            // Conditions to do this only on links to your own app
            // if you want all links, use if('href' in curnode) instead.
            if (
                'href' in curnode && // is a link
                (chref = curnode.href).replace(location.href, '').indexOf('#') && // is not an anchor
                (!(/^[a-z\+\.\-]+:/i).test(chref) ||                       // either does not have a proper scheme (relative links)
                chref.indexOf(location.protocol + '//' + location.host) === 0) // or is in the same protocol and domain
            ) {
                e.preventDefault();
                location.href = curnode.href;
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
        var supported = support.atobbtoa &&
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
        if (!supported) {
            location.assign(errorUrl + '?code=1000');
        }
    }

} ());

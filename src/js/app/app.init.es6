/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* global __NODE_ENV__:false */

// import Modernizr from '../vendor/modernizr/modernizr';
// Modernizr returns an empty object {}, so we need to use window.Modernizr
import '../vendor/modernizr/modernizr';

// import iNoBounce from '../vendor/lazd/inobounce';
// No need to call iNoBounce.enable() which is set by default, so iNoBounce variable is not used
import '../vendor/lazd/inobounce';

/**
 * The application has <meta name="apple-mobile-web-app-capable" content="yes">
 * so to run the app full screen when pinned to IOS home screen
 * The following prevents links from opening in a new safari window
 * Source: https://gist.github.com/irae/1042167
 */
((document, navigator, standalone) => {
    // Prevents links from opening in mobile safari when web application is running standalone (web-app-capable)
    // Especially when navigating categories or searching for kidojus in the explorer
    // Note: to debug in Chrome, remove the standalone test
    if (standalone in navigator && navigator[standalone]) {
        const { location } = document;
        document.addEventListener(
            'click',
            e => {
                let curnode = e.target;
                // Find the closest anchor
                while (!/^(a|html)$/i.test(curnode.nodeName)) {
                    curnode = curnode.parentNode;
                }
                const chref = curnode.href;
                if (
                    typeof chref === 'string' && // is a link
                    chref.length > 1 && // is not empty (signInDialog or searchPanel) or '#'
                    chref !== location.href && // is not identical to the location href
                    chref.replace(
                        `${location.protocol}//${location.host}${
                            location.pathname
                        }`,
                        ''
                    ).length > 1 &&
                    chref
                        .replace(
                            `${location.protocol}//${location.host}${
                                location.pathname
                            }`,
                            ''
                        )
                        .indexOf('#') && // is not an anchor on the same page
                    (!/^[a-z+.-]+:/i.test(chref) || // either does not have a proper scheme (relative links)
                        chref.indexOf(
                            `${location.protocol}//${location.host}`
                        ) === 0) // or is in the same protocol and domain
                ) {
                    e.preventDefault();
                    location.assign(chref);
                }
            },
            false
        );
    }
})(window.document, window.navigator, 'standalone');

/**
 * Check browser features and redirect to error page if any essential feature is missing
 *
 * TODO Check headless and automated browsers incl !!window.webdriver
 * https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser/9851769
 * https://stackoverflow.com/questions/20862728/reliably-detecting-phantomjs-based-spam-bots
 * https://blog.shapesecurity.com/2015/01/22/detecting-phantomjs-based-visitors/
 * https://antoinevastel.com/bot%20detection/2018/01/17/detect-chrome-headless-v2.html
 * https://www.slideshare.net/SergeyShekyan/shekyan-zhang-owasp
 */
import(/* webpackMode: "eager" */ `./app.config.jsx?env=${__NODE_ENV__}`).then(
    // "eager" mode forces the module to be loaded in the current chunk
    // @see https://webpack.js.org/api/module-methods/
    () => {
        const { app, document, location, Modernizr, navigator } = window;
        // Note: jQuery, kendo and app.i18n are not yet loaded
        const lang = document
            .getElementsByTagName('html')[0]
            .getAttribute('lang');
        const errorUrl = app.uris.webapp.error.replace('{0}', lang);
        const isQaEnvironment =
            app.DEBUG && /(HeadlessChrome|PhantomJS)/.test(navigator.userAgent);
        const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(
            navigator.userAgent
        );

        // Alias Modernizr as app.support
        app.support = Modernizr;

        // Make sure this is not a web crawler, we are not testing in PhantomJS and we are not yet on the error page
        if (
            !isQaEnvironment &&
            !isBot &&
            location.href.substr(0, errorUrl.length) !== errorUrl
        ) {
            // Check browser requirements
            const requirements =
                Modernizr.atobbtoa &&
                Modernizr.audio &&
                // (Modernizr.audio.mp3 || Modernizr.audio.ogg) &&
                Modernizr.blobconstructor &&
                Modernizr.bloburls &&
                Modernizr.canvas &&
                Modernizr.canvastext &&
                Modernizr.csstransforms &&
                // Modernizr.datauri &&
                Modernizr.filereader &&
                // Modernizr.filesystem &&
                Modernizr.flexbox &&
                // Modernizr.getusermedia &&
                Modernizr.hashchange &&
                Modernizr.history &&
                Modernizr.inlinesvg &&
                Modernizr.localstorage &&
                Modernizr.sessionstorage &&
                // Modernizr.speechrecognition &&
                // Modernizr.speechsynthesis &&
                Modernizr.svg &&
                Modernizr.svgasimg &&
                // Modernizr.touchevents &&
                Modernizr.video &&
                // (Modernizr.video.h264 ||
                //    Modernizr.video.ogg ||
                //    Modernizr.video.webm) &&
                Modernizr.webworkers;
            // Modernizr.xhr2 &&
            // Modernizr.setclasses;

            // If any feature is missing, redirect to error page with error code 1000
            if (!requirements) {
                location.assign(`${errorUrl}?code=1000`);
            }
        }
    }
);

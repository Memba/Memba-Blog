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
 * so to run the app ull screen when pinned to IOS home screen
 * The following prevents links from opening in a new safari window
 * Source: https://gist.github.com/irae/1042167
 */
(function(document,navigator,standalone) {
    // prevents links from apps from opening in mobile safari
    // this javascript must be the first script in your <head>
    if ((standalone in navigator) && navigator[standalone]) {
        var curnode, location=document.location, stop=/^(a|html)$/i;
        document.addEventListener('click', function(e) {
            curnode=e.target;
            while (!(stop).test(curnode.nodeName)) {
                curnode=curnode.parentNode;
            }
            // Conditions to do this only on links to your own app
            // if you want all links, use if('href' in curnode) instead.
            if(
                'href' in curnode && // is a link
                (chref=curnode.href).replace(location.href,'').indexOf('#') && // is not an anchor
                (	!(/^[a-z\+\.\-]+:/i).test(chref) ||                       // either does not have a proper scheme (relative links)
                chref.indexOf(location.protocol+'//'+location.host)===0 ) // or is in the same protocol and domain
            ) {
                e.preventDefault();
                location.href = curnode.href;
            }
        },false);
    }
})(document,window.navigator,'standalone');

// TODO Consider javascript disabled
// TODO use app.support to display a message for older browsers

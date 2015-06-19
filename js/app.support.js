/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true */
/* globals define: false */

(function(f, define){
    'use strict';
    define([
        './app.logger'
    ], f);
})(function(){

    'use strict';

    var app = window.app,
        logger = app.logger;

    /**
     * IMPORTANT
     * Use the Build link below to update
     */

    /*!
     * modernizr v3.0.0-alpha.3
     * Build http://v3.modernizr.com/download/#-audio-canvas-csstransforms-csstransitions-draganddrop-hashchange-localstorage-sessionstorage-svg-touchevents-video-webworkers-dontmin
     *
     * Copyright (c)
     *  Faruk Ates
     *  Paul Irish
     *  Alex Sexton
     *  Ryan Seddon
     *  Alexander Farkas
     *  Patrick Kettner
     *  Stu Cox
     *  Richard Herrera

     * MIT License
     */

    /*
     * Modernizr tests which native CSS3 and HTML5 features are available in the
     * current UA and makes the results available to you in two ways: as properties on
     * a global `Modernizr` object, and as classes on the `<html>` element. This
     * information allows you to progressively enhance your pages with a granular level
     * of control over the experience.
     */

    (function(window, document, undefined){
        var tests = [];


        var ModernizrProto = {
            // The current version, dummy
            _version: '3.0.0-alpha.3',

            // Any settings that don't work as separate modules
            // can go in here as configuration.
            _config: {
                'classPrefix' : '',
                'enableClasses' : true,
                'enableJSClass' : true,
                'usePrefixes' : true
            },

            // Queue of tests
            _q: [],

            // Stub these for people who are listening
            on: function( test, cb ) {
                // I don't really think people should do this, but we can
                // safe guard it a bit.
                // -- NOTE:: this gets WAY overridden in src/addTest for
                // actual async tests. This is in case people listen to
                // synchronous tests. I would leave it out, but the code
                // to *disallow* sync tests in the real version of this
                // function is actually larger than this.
                var self = this;
                setTimeout(function() {
                    cb(self[test]);
                }, 0);
            },

            addTest: function( name, fn, options ) {
                tests.push({name : name, fn : fn, options : options });
            },

            addAsyncTest: function (fn) {
                tests.push({name : null, fn : fn});
            }
        };



        // Fake some of Object.create
        // so we can force non test results
        // to be non "own" properties.
        var Modernizr = function(){};
        Modernizr.prototype = ModernizrProto;

        // Leak modernizr globally when you `require` it
        // rather than force it here.
        // Overwrite name so constructor name is nicer :D
        Modernizr = new Modernizr();


        /*!
         {
         "name": "Local Storage",
         "property": "localstorage",
         "caniuse": "namevalue-storage",
         "tags": ["storage"],
         "knownBugs": [],
         "notes": [],
         "warnings": [],
         "polyfills": [
         "joshuabell-polyfill",
         "cupcake",
         "storagepolyfill",
         "amplifyjs",
         "yui-cacheoffline"
         ]
         }
         !*/

        // In FF4, if disabled, window.localStorage should === null.

        // Normally, we could not test that directly and need to do a
        //   `('localStorage' in window) && ` test first because otherwise Firefox will
        //   throw bugzil.la/365772 if cookies are disabled

        // Also in iOS5 Private Browsing mode, attempting to use localStorage.setItem
        // will throw the exception:
        //   QUOTA_EXCEEDED_ERRROR DOM Exception 22.
        // Peculiarly, getItem and removeItem calls do not throw.

        // Because we are forced to try/catch this, we'll go aggressive.

        // Just FWIW: IE8 Compat mode supports these features completely:
        //   www.quirksmode.org/dom/html5.html
        // But IE8 doesn't support either with local files

        Modernizr.addTest('localstorage', function() {
            var mod = 'modernizr';
            try {
                localStorage.setItem(mod, mod);
                localStorage.removeItem(mod);
                return true;
            } catch(e) {
                return false;
            }
        });

        /*!
         {
         "name": "Session Storage",
         "property": "sessionstorage",
         "tags": ["storage"],
         "polyfills": ["joshuabell-polyfill", "cupcake", "sessionstorage"]
         }
         !*/

        // Because we are forced to try/catch this, we'll go aggressive.

        // Just FWIW: IE8 Compat mode supports these features completely:
        //   www.quirksmode.org/dom/html5.html
        // But IE8 doesn't support either with local files
        Modernizr.addTest('sessionstorage', function() {
            var mod = 'modernizr';
            try {
                sessionStorage.setItem(mod, mod);
                sessionStorage.removeItem(mod);
                return true;
            } catch(e) {
                return false;
            }
        });

        /*!
         {
         "name": "SVG",
         "property": "svg",
         "caniuse": "svg",
         "tags": ["svg"],
         "authors": ["Erik Dahlstrom"],
         "polyfills": [
         "svgweb",
         "raphael",
         "amplesdk",
         "canvg",
         "svg-boilerplate",
         "sie",
         "dojogfx",
         "fabricjs"
         ]
         }
         !*/
        /* DOC
         Detects support for SVG in `<embed>` or `<object>` elements.
         */

        Modernizr.addTest('svg', !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect);


        var classes = [];


        /**
         * is returns a boolean for if typeof obj is exactly type.
         */
        function is( obj, type ) {
            return typeof obj === type;
        }
        ;

        // Run through all tests and detect their support in the current UA.
        function testRunner() {
            var featureNames;
            var feature;
            var aliasIdx;
            var result;
            var nameIdx;
            var featureName;
            var featureNameSplit;

            for ( var featureIdx in tests ) {
                featureNames = [];
                feature = tests[featureIdx];
                // run the test, throw the return value into the Modernizr,
                //   then based on that boolean, define an appropriate className
                //   and push it into an array of classes we'll join later.
                //
                //   If there is no name, it's an 'async' test that is run,
                //   but not directly added to the object. That should
                //   be done with a post-run addTest call.
                if ( feature.name ) {
                    featureNames.push(feature.name.toLowerCase());

                    if (feature.options && feature.options.aliases && feature.options.aliases.length) {
                        // Add all the aliases into the names list
                        for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
                            featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
                        }
                    }
                }

                // Run the test, or use the raw value if it's not a function
                result = is(feature.fn, 'function') ? feature.fn() : feature.fn;


                // Set each of the names on the Modernizr object
                for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
                    featureName = featureNames[nameIdx];
                    // Support dot properties as sub tests. We don't do checking to make sure
                    // that the implied parent tests have been added. You must call them in
                    // order (either in the test, or make the parent test a dependency).
                    //
                    // Cap it to TWO to make the logic simple and because who needs that kind of subtesting
                    // hashtag famous last words
                    featureNameSplit = featureName.split('.');

                    if (featureNameSplit.length === 1) {
                        Modernizr[featureNameSplit[0]] = result;
                    } else {
                        // cast to a Boolean, if not one already
                        /* jshint -W053 */
                        if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
                            Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
                        }

                        Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
                    }

                    classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
                }
            }
        }

        ;

        var createElement = function() {
            if (typeof document.createElement !== 'function') {
                // This is the case in IE7, where the type of createElement is "object".
                // For this reason, we cannot call apply() as Object is not a Function.
                return document.createElement(arguments[0]);
            } else {
                return document.createElement.apply(document, arguments);
            }
        };

        /*!
         {
         "name": "Canvas",
         "property": "canvas",
         "caniuse": "canvas",
         "tags": ["canvas", "graphics"],
         "polyfills": ["flashcanvas", "excanvas", "slcanvas", "fxcanvas"]
         }
         !*/
        /* DOC
         Detects support for the `<canvas>` element for 2D drawing.
         */

        // On the S60 and BB Storm, getContext exists, but always returns undefined
        // so we actually have to call getContext() to verify
        // github.com/Modernizr/Modernizr/issues/issue/97/
        Modernizr.addTest('canvas', function() {
            var elem = createElement('canvas');
            return !!(elem.getContext && elem.getContext('2d'));
        });

        /*!
         {
         "name": "Drag & Drop",
         "property": "draganddrop",
         "caniuse": "dragndrop",
         "knownBugs": ["Mobile browsers like Android, iOS < 6, and Firefox OS technically support the APIs, but don't expose it to the end user, resulting in a false positive."],
         "notes": [{
         "name": "W3C spec",
         "href": "http://www.w3.org/TR/2010/WD-html5-20101019/dnd.html"
         }],
         "polyfills": ["dropfile", "moxie", "fileapi"]
         }
         !*/
        /* DOC
         Detects support for native drag & drop of elements.
         */

        Modernizr.addTest('draganddrop', function() {
            var div = createElement('div');
            return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
        });

        /*!
         {
         "name" : "HTML5 Audio Element",
         "property": "audio",
         "tags" : ["html5", "audio", "media"]
         }
         !*/
        /* DOC
         Detects the audio element
         */

        // This tests evaluates support of the audio element, as well as
        // testing what types of content it supports.
        //
        // We're using the Boolean constructor here, so that we can extend the value
        // e.g.  Modernizr.audio     // true
        //       Modernizr.audio.ogg // 'probably'
        //
        // Codec values from : github.com/NielsLeenheer/html5test/blob/9106a8/index.html#L845
        //                     thx to NielsLeenheer and zcorpan

        // Note: in some older browsers, "no" was a return value instead of empty string.
        //   It was live in FF3.5.0 and 3.5.1, but fixed in 3.5.2
        //   It was also live in Safari 4.0.0 - 4.0.4, but fixed in 4.0.5
        Modernizr.addTest('audio', function() {
            /* jshint -W053 */
            var elem = createElement('audio');
            var bool = false;

            try {
                if ( bool = !!elem.canPlayType ) {
                    bool      = new Boolean(bool);
                    bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'');
                    bool.mp3  = elem.canPlayType('audio/mpeg;')               .replace(/^no$/,'');
                    bool.opus  = elem.canPlayType('audio/ogg; codecs="opus"') .replace(/^no$/,'');

                    // Mimetypes accepted:
                    //   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
                    //   bit.ly/iphoneoscodecs
                    bool.wav  = elem.canPlayType('audio/wav; codecs="1"')     .replace(/^no$/,'');
                    bool.m4a  = ( elem.canPlayType('audio/x-m4a;')            ||
                    elem.canPlayType('audio/aac;'))             .replace(/^no$/,'');
                }
            } catch(e) { }

            return bool;
        });

        /*!
         {
         "name": "HTML5 Video",
         "property": "video",
         "caniuse": "video",
         "tags": ["html5"],
         "knownBugs": [
         "Without QuickTime, `Modernizr.video.h264` will be `undefined`; http://github.com/Modernizr/Modernizr/issues/546"
         ],
         "polyfills": [
         "html5media",
         "mediaelementjs",
         "sublimevideo",
         "videojs",
         "leanbackplayer",
         "videoforeverybody"
         ]
         }
         !*/
        /* DOC
         Detects support for the video element, as well as testing what types of content it supports.

         Subproperties are provided to describe support for `ogg`, `h264` and `webm` formats, e.g.:

         ```javascript
         Modernizr.video         // true
         Modernizr.video.ogg     // 'probably'
         ```
         */

        // Codec values from : github.com/NielsLeenheer/html5test/blob/9106a8/index.html#L845
        //                     thx to NielsLeenheer and zcorpan

        // Note: in some older browsers, "no" was a return value instead of empty string.
        //   It was live in FF3.5.0 and 3.5.1, but fixed in 3.5.2
        //   It was also live in Safari 4.0.0 - 4.0.4, but fixed in 4.0.5

        Modernizr.addTest('video', function() {
            /* jshint -W053 */
            var elem = createElement('video');
            var bool = false;

            // IE9 Running on Windows Server SKU can cause an exception to be thrown, bug #224
            try {
                if ( bool = !!elem.canPlayType ) {
                    bool = new Boolean(bool);
                    bool.ogg = elem.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,'');

                    // Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546
                    bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,'');

                    bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'');

                    bool.vp9 = elem.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,'');

                    bool.hls = elem.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,'');
                }
            } catch(e){}

            return bool;
        });


        // Following spec is to expose vendor-specific style properties as:
        //   elem.style.WebkitBorderRadius
        // and the following would be incorrect:
        //   elem.style.webkitBorderRadius

        // Webkit ghosts their properties in lowercase but Opera & Moz do not.
        // Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
        //   erik.eae.net/archives/2008/03/10/21.48.10/

        // More here: github.com/Modernizr/Modernizr/issues/issue/21
        var omPrefixes = 'Moz O ms Webkit';


        var cssomPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.split(' ') : []);
        ModernizrProto._cssomPrefixes = cssomPrefixes;


        var domPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(' ') : []);
        ModernizrProto._domPrefixes = domPrefixes;


        /**
         * contains returns a boolean for if substr is found within str.
         */
        function contains( str, substr ) {
            return !!~('' + str).indexOf(substr);
        }

        ;

        // Helper function for converting kebab-case to camelCase,
        // e.g. box-sizing -> boxSizing
        function cssToDOM( name ) {
            return name.replace(/([a-z])-([a-z])/g, function(str, m1, m2) {
                return m1 + m2.toUpperCase();
            }).replace(/^-/, '');
        }
        ;

        // Change the function's scope.
        function fnBind(fn, that) {
            return function() {
                return fn.apply(that, arguments);
            };
        }

        ;

        /**
         * testDOMProps is a generic DOM property test; if a browser supports
         *   a certain property, it won't return undefined for it.
         */
        function testDOMProps( props, obj, elem ) {
            var item;

            for ( var i in props ) {
                if ( props[i] in obj ) {

                    // return the property name as a string
                    if (elem === false) return props[i];

                    item = obj[props[i]];

                    // let's bind a function
                    if (is(item, 'function')) {
                        // bind to obj unless overriden
                        return fnBind(item, elem || obj);
                    }

                    // return the unbound function or obj or value
                    return item;
                }
            }
            return false;
        }

        ;

        /**
         * Create our "modernizr" element that we do most feature tests on.
         */
        var modElem = {
            elem : createElement('modernizr')
        };

        // Clean up this element
        Modernizr._q.push(function() {
            delete modElem.elem;
        });



        var mStyle = {
            style : modElem.elem.style
        };

        // kill ref for gc, must happen before
        // mod.elem is removed, so we unshift on to
        // the front of the queue.
        Modernizr._q.unshift(function() {
            delete mStyle.style;
        });



        // Helper function for converting camelCase to kebab-case,
        // e.g. boxSizing -> box-sizing
        function domToCSS( name ) {
            return name.replace(/([A-Z])/g, function(str, m1) {
                return '-' + m1.toLowerCase();
            }).replace(/^ms-/, '-ms-');
        }
        ;

        var docElement = document.documentElement;


        function getBody() {
            // After page load injecting a fake body doesn't work so check if body exists
            var body = document.body;

            if(!body) {
                // Can't use the real body create a fake one.
                body = createElement('body');
                body.fake = true;
            }

            return body;
        }

        ;

        // Inject element with style element and some CSS rules
        function injectElementWithStyles( rule, callback, nodes, testnames ) {
            var mod = 'modernizr';
            var style;
            var ret;
            var node;
            var docOverflow;
            var div = createElement('div');
            var body = getBody();

            if ( parseInt(nodes, 10) ) {
                // In order not to give false positives we create a node for each test
                // This also allows the method to scale for unspecified uses
                while ( nodes-- ) {
                    node = createElement('div');
                    node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
                    div.appendChild(node);
                }
            }

            // <style> elements in IE6-9 are considered 'NoScope' elements and therefore will be removed
            // when injected with innerHTML. To get around this you need to prepend the 'NoScope' element
            // with a 'scoped' element, in our case the soft-hyphen entity as it won't mess with our measurements.
            // msdn.microsoft.com/en-us/library/ms533897%28VS.85%29.aspx
            // Documents served as xml will throw if using &shy; so use xml friendly encoded version. See issue #277
            style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
            div.id = mod;
            // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
            // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
            (!body.fake ? div : body).innerHTML += style;
            body.appendChild(div);
            if ( body.fake ) {
                //avoid crashing IE8, if background image is used
                body.style.background = '';
                //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
                body.style.overflow = 'hidden';
                docOverflow = docElement.style.overflow;
                docElement.style.overflow = 'hidden';
                docElement.appendChild(body);
            }

            ret = callback(div, rule);
            // If this is done after page load we don't want to remove the body so check if body exists
            if ( body.fake ) {
                body.parentNode.removeChild(body);
                docElement.style.overflow = docOverflow;
                // Trigger layout so kinetic scrolling isn't disabled in iOS6+
                docElement.offsetHeight;
            } else {
                div.parentNode.removeChild(div);
            }

            return !!ret;

        }

        ;

        // Function to allow us to use native feature detection functionality if available.
        // Accepts a list of property names and a single value
        // Returns `undefined` if native detection not available
        function nativeTestProps ( props, value ) {
            var i = props.length;
            // Start with the JS API: http://www.w3.org/TR/css3-conditional/#the-css-interface
            if ('CSS' in window && 'supports' in window.CSS) {
                // Try every prefixed variant of the property
                while (i--) {
                    if (window.CSS.supports(domToCSS(props[i]), value)) {
                        return true;
                    }
                }
                return false;
            }
            // Otherwise fall back to at-rule (for Opera 12.x)
            else if ('CSSSupportsRule' in window) {
                // Build a condition string for every prefixed variant
                var conditionText = [];
                while (i--) {
                    conditionText.push('(' + domToCSS(props[i]) + ':' + value + ')');
                }
                conditionText = conditionText.join(' or ');
                return injectElementWithStyles('@supports (' + conditionText + ') { #modernizr { position: absolute; } }', function( node ) {
                    return getComputedStyle(node, null).position == 'absolute';
                });
            }
            return undefined;
        }
        ;

        // testProps is a generic CSS / DOM property test.

        // In testing support for a given CSS property, it's legit to test:
        //    `elem.style[styleName] !== undefined`
        // If the property is supported it will return an empty string,
        // if unsupported it will return undefined.

        // We'll take advantage of this quick test and skip setting a style
        // on our modernizr element, but instead just testing undefined vs
        // empty string.

        // Property names can be provided in either camelCase or kebab-case.

        function testProps( props, prefixed, value, skipValueTest ) {
            skipValueTest = is(skipValueTest, 'undefined') ? false : skipValueTest;

            // Try native detect first
            if (!is(value, 'undefined')) {
                var result = nativeTestProps(props, value);
                if(!is(result, 'undefined')) {
                    return result;
                }
            }

            // Otherwise do it properly
            var afterInit, i, propsLength, prop, before;

            // If we don't have a style element, that means
            // we're running async or after the core tests,
            // so we'll need to create our own elements to use
            if ( !mStyle.style ) {
                afterInit = true;
                mStyle.modElem = createElement('modernizr');
                mStyle.style = mStyle.modElem.style;
            }

            // Delete the objects if we
            // we created them.
            function cleanElems() {
                if (afterInit) {
                    delete mStyle.style;
                    delete mStyle.modElem;
                }
            }

            propsLength = props.length;
            for ( i = 0; i < propsLength; i++ ) {
                prop = props[i];
                before = mStyle.style[prop];

                if (contains(prop, '-')) {
                    prop = cssToDOM(prop);
                }

                if ( mStyle.style[prop] !== undefined ) {

                    // If value to test has been passed in, do a set-and-check test.
                    // 0 (integer) is a valid property value, so check that `value` isn't
                    // undefined, rather than just checking it's truthy.
                    if (!skipValueTest && !is(value, 'undefined')) {

                        // Needs a try catch block because of old IE. This is slow, but will
                        // be avoided in most cases because `skipValueTest` will be used.
                        try {
                            mStyle.style[prop] = value;
                        } catch (e) {}

                        // If the property value has changed, we assume the value used is
                        // supported. If `value` is empty string, it'll fail here (because
                        // it hasn't changed), which matches how browsers have implemented
                        // CSS.supports()
                        if (mStyle.style[prop] != before) {
                            cleanElems();
                            return prefixed == 'pfx' ? prop : true;
                        }
                    }
                    // Otherwise just return true, or the property name if this is a
                    // `prefixed()` call
                    else {
                        cleanElems();
                        return prefixed == 'pfx' ? prop : true;
                    }
                }
            }
            cleanElems();
            return false;
        }

        ;

        /**
         * testPropsAll tests a list of DOM properties we want to check against.
         *     We specify literally ALL possible (known and/or likely) properties on
         *     the element including the non-vendor prefixed one, for forward-
         *     compatibility.
         */
        function testPropsAll( prop, prefixed, elem, value, skipValueTest ) {

            var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
                props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

            // did they call .prefixed('boxSizing') or are we just testing a prop?
            if(is(prefixed, 'string') || is(prefixed, 'undefined')) {
                return testProps(props, prefixed, value, skipValueTest);

                // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
            } else {
                props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
                return testDOMProps(props, prefixed, elem);
            }
        }

        // Modernizr.testAllProps() investigates whether a given style property,
        //     or any of its vendor-prefixed variants, is recognized
        // Note that the property names must be provided in the camelCase variant.
        // Modernizr.testAllProps('boxSizing')
        ModernizrProto.testAllProps = testPropsAll;



        /**
         * testAllProps determines whether a given CSS property, in some prefixed
         * form, is supported by the browser. It can optionally be given a value; in
         * which case testAllProps will only return true if the browser supports that
         * value for the named property; this latter case will use native detection
         * (via window.CSS.supports) if available. A boolean can be passed as a 3rd
         * parameter to skip the value check when native detection isn't available,
         * to improve performance when simply testing for support of a property.
         *
         * @param prop - String naming the property to test (either camelCase or
         *               kebab-case)
         * @param value - [optional] String of the value to test
         * @param skipValueTest - [optional] Whether to skip testing that the value
         *                        is supported when using non-native detection
         *                        (default: false)
         */
        function testAllProps (prop, value, skipValueTest) {
            return testPropsAll(prop, undefined, undefined, value, skipValueTest);
        }
        ModernizrProto.testAllProps = testAllProps;

        /*!
         {
         "name": "CSS Transforms",
         "property": "csstransforms",
         "caniuse": "transforms2d",
         "tags": ["css"]
         }
         !*/

        Modernizr.addTest('csstransforms', function() {
            // Android < 3.0 is buggy, so we sniff and blacklist
            // http://git.io/hHzL7w
            return navigator.userAgent.indexOf('Android 2.') === -1 &&
                testAllProps('transform', 'scale(1)', true);
        });

        /*!
         {
         "name": "CSS Transitions",
         "property": "csstransitions",
         "caniuse": "css-transitions",
         "tags": ["css"]
         }
         !*/

        Modernizr.addTest('csstransitions', testAllProps('transition', 'all', true));

        /*!
         {
         "name": "Web Workers",
         "property": "webworkers",
         "caniuse" : "webworkers",
         "tags": ["performance", "workers"],
         "notes": [{
         "name": "W3C Reference",
         "href": "http://www.w3.org/TR/workers/"
         }, {
         "name": "HTML5 Rocks article",
         "href": "http://www.html5rocks.com/en/tutorials/workers/basics/"
         }, {
         "name": "MDN documentation",
         "href": "https://developer.mozilla.org/en-US/docs/Web/Guide/Performance/Using_web_workers"
         }],
         "polyfills": ["fakeworker", "html5shims"]
         }
         !*/
        /* DOC
         Detects support for the basic `Worker` API from the Web Workers spec. Web Workers provide a simple means for web content to run scripts in background threads.
         */

        Modernizr.addTest('webworkers', 'Worker' in window);


        // List of property values to set for css tests. See ticket #21
        var prefixes = (ModernizrProto._config.usePrefixes ? ' -webkit- -moz- -o- -ms- '.split(' ') : []);

        // expose these for the plugin API. Look in the source for how to join() them against your input
        ModernizrProto._prefixes = prefixes;



        var testStyles = ModernizrProto.testStyles = injectElementWithStyles;

        /*!
         {
         "name": "Touch Events",
         "property": "touchevents",
         "caniuse" : "touch",
         "tags": ["media", "attribute"],
         "notes": [{
         "name": "Touch Events spec",
         "href": "http://www.w3.org/TR/2013/WD-touch-events-20130124/"
         }],
         "warnings": [
         "Indicates if the browser supports the Touch Events spec, and does not necessarily reflect a touchscreen device"
         ],
         "knownBugs": [
         "False-positive on some configurations of Nokia N900",
         "False-positive on some BlackBerry 6.0 builds – https://github.com/Modernizr/Modernizr/issues/372#issuecomment-3112695"
         ]
         }
         !*/
        /* DOC
         Indicates if the browser supports the W3C Touch Events API.

         This *does not* necessarily reflect a touchscreen device:

         * Older touchscreen devices only emulate mouse events
         * Modern IE touch devices implement the Pointer Events API instead: use `Modernizr.pointerevents` to detect support for that
         * Some browsers & OS setups may enable touch APIs when no touchscreen is connected
         * Future browsers may implement other event models for touch interactions

         See this article: [You Can't Detect A Touchscreen](http://www.stucox.com/blog/you-cant-detect-a-touchscreen/).

         It's recommended to bind both mouse and touch/pointer events simultaneously – see [this HTML5 Rocks tutorial](http://www.html5rocks.com/en/mobile/touchandmouse/).

         This test will also return `true` for Firefox 4 Multitouch support.
         */

        // Chrome (desktop) used to lie about its support on this, but that has since been rectified: http://crbug.com/36415
        Modernizr.addTest('touchevents', function() {
            var bool;
            if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
                bool = true;
            } else {
                var query = ['@media (',prefixes.join('touch-enabled),('),'heartz',')','{#modernizr{top:9px;position:absolute}}'].join('');
                testStyles(query, function( node ) {
                    bool = node.offsetTop === 9;
                });
            }
            return bool;
        });


        // isEventSupported determines if the given element supports the given event
        // kangax.github.com/iseventsupported/
        // github.com/Modernizr/Modernizr/pull/636
        //
        // Known incorrects:
        //   Modernizr.hasEvent("webkitTransitionEnd", elem) // false negative
        //   Modernizr.hasEvent("textInput") // in Webkit. github.com/Modernizr/Modernizr/issues/333
        var isEventSupported = (function (undefined) {

            // Detect whether event support can be detected via `in`. Test on a DOM element
            // using the "blur" event b/c it should always exist. bit.ly/event-detection
            var needsFallback = !('onblur' in document.documentElement);

            /**
             * @param  {string|*}           eventName  is the name of an event to test for (e.g. "resize")
             * @param  {(Object|string|*)=} element    is the element|document|window|tagName to test on
             * @return {boolean}
             */
            function isEventSupportedInner( eventName, element ) {

                var isSupported;
                if ( !eventName ) { return false; }
                if ( !element || typeof element === 'string' ) {
                    element = createElement(element || 'div');
                }

                // Testing via the `in` operator is sufficient for modern browsers and IE.
                // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and
                // "resize", whereas `in` "catches" those.
                eventName = 'on' + eventName;
                isSupported = eventName in element;

                // Fallback technique for old Firefox - bit.ly/event-detection
                if ( !isSupported && needsFallback ) {
                    if ( !element.setAttribute ) {
                        // Switch to generic element if it lacks `setAttribute`.
                        // It could be the `document`, `window`, or something else.
                        element = createElement('div');
                    }

                    element.setAttribute(eventName, '');
                    isSupported = typeof element[eventName] === 'function';

                    if ( element[eventName] !== undefined ) {
                        // If property was created, "remove it" by setting value to `undefined`.
                        element[eventName] = undefined;
                    }
                    element.removeAttribute(eventName);
                }

                return isSupported;
            }
            return isEventSupportedInner;
        })();



        // Modernizr.hasEvent() detects support for a given event, with an optional element to test on
        // Modernizr.hasEvent('gesturestart', elem)
        var hasEvent = ModernizrProto.hasEvent = isEventSupported;

        /*!
         {
         "name": "Hashchange event",
         "property": "hashchange",
         "caniuse": "hashchange",
         "tags": ["history"],
         "notes": [{
         "name": "MDN documentation",
         "href": "https://developer.mozilla.org/en-US/docs/Web/API/window.onhashchange"
         }],
         "polyfills": [
         "jquery-hashchange",
         "moo-historymanager",
         "jquery-ajaxy",
         "hasher",
         "shistory"
         ]
         }
         !*/
        /* DOC
         Detects support for the `hashchange` event, fired when the current location fragment changes.
         */

        Modernizr.addTest('hashchange', function() {
            if (hasEvent('hashchange', window) === false) {
                return false;
            }

            // documentMode logic from YUI to filter out IE8 Compat Mode
            //   which false positives.
            return (document.documentMode === undefined || document.documentMode > 7);
        });


        // Run each test
        testRunner();

        delete ModernizrProto.addTest;
        delete ModernizrProto.addAsyncTest;

        // Run the things that are supposed to run after the tests
        for (var i = 0; i < Modernizr._q.length; i++) {
            Modernizr._q[i]();
        }

        // Leak Modernizr namespace
        window.Modernizr = Modernizr;


        ;

    })(window, document);

    app.support = window.Modernizr;

    logger.info({
        message: 'browser tested by Modernizr',
        module: 'app.support'
        //method: 'none'
    });

    return window.app;

}, typeof define === 'function' && define.amd ? define : function(_, f){ 'use strict'; f(); });

/*Copyright 2013-2014 Memba Sarl. All rights reserved.*/
/*jslint browser:true */
/*jshint browser:true */

/*******************************************************************************************
 * Application loader
 *******************************************************************************************/
(function () {

    "use strict";

    var fn = Function,
        global = fn('return this')(),
        Modernizr = global.Modernizr,
        KENDO_VERSION = '2013.3.1316', //1119',

        DEBUG = false,
        MODULE = 'app.init.min.js: ';


    if (DEBUG && global.console) {
        global.console.log(MODULE + global.navigator.userAgent);
        global.console.log(MODULE + global.location.href);
    }

    //Do not execute on Google's Ajax crawling scheme
    //if(global.location.search.indexOf('_escaped_fragment_') < 0) {

        Modernizr.load([
        //jQuery
        {
            load: 'http://code.jquery.com/jquery-1.9.1.min.js',
            callback: function (url) { //called both in case of success and failure
                if (DEBUG && global.console) {
                    global.console.log(MODULE + url + ' loading attempt');
                }
            },
            complete: function () {
                if (!global.jQuery) {
                    Modernizr.load('./js/' + KENDO_VERSION + '/jquery.min.js');
                }
            }
        },
        //Bootstrap and font awesome
        {
            load: [
                'http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css',
                'http://netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css',
                'http://netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js'
            ],
            callback: function (url) {
                if (DEBUG && global.console) {
                    global.console.log(MODULE + url + ' loading attempt');
                }
            },
            complete: function () {
                if ($ && !($.fn.affix && $.fn.carousel && $.fn.popover && $.fn.tab && $.fn.tooltip)) {
                    Modernizr.load([{
                        load: [
                            './styles/vendor/font-awesome.css',
                            './styles/vendor/bootstrap.css',
                            './js/vendor/bootstrap.min.js'
                        ]
                    }]);
                }
            }
        },
        //Kendo UI
        {
            load: [
                'http://cdn.kendostatic.com/' + KENDO_VERSION + '/styles/kendo.common-bootstrap.min.css',
                'http://cdn.kendostatic.com/' + KENDO_VERSION + '/styles/kendo.bootstrap.min.css',
                'http://cdn.kendostatic.com/' + KENDO_VERSION + '/js/kendo.web.min.js',
                //'http://cdn.kendostatic.com/' + KENDO_VERSION + '/js/kendo.timezones.min.js'
                'http://cdn.kendostatic.com/' + KENDO_VERSION + '/js/cultures/kendo.culture.en.min.js', //default culture
                'http://cdn.kendostatic.com/' + KENDO_VERSION + '/js/cultures/kendo.culture.' + (global.navigator.userLanguage || global.navigator.language).substr(0, 2) + '.min.js', //replace default culture
                'http://cdn.kendostatic.com/' + KENDO_VERSION + '/js/cultures/kendo.culture.fr.min.js' //TODO DEBUG
            ],
            callback: function (url) {
                if (DEBUG && global.console) {
                    global.console.log(MODULE + url + ' loading attempt');
                }
            },
            complete: function () {
                if (!global.kendo) {
                    Modernizr.load([{
                        load: [
                            './styles/' + KENDO_VERSION + '/kendo.common-bootstrap.min.css',
                            './styles/' + KENDO_VERSION + '/kendo.bootstrap.min.css',
                            './js/' + KENDO_VERSION + '/kendo.web.min.js',
                            //'./js/' + KENDO_VERSION + '/kendo.timezones.min.js',
                            './js/' + KENDO_VERSION + '/cultures/kendo.culture.en.min.js', //default culture
                            './js/' + KENDO_VERSION + '/cultures/kendo.culture.' + (global.navigator.userLanguage || global.navigator.language).substring(0, 2) + '.min.js', //replace default culture
                            './js/' + KENDO_VERSION + '/cultures/kendo.culture.fr.min.js' //TODO DEBUG
                        ]
                    }]);
                }
            }
        },
        //Other 3rd party libraries libraries
        {
            load: [
                'http://yandex.st/highlightjs/7.5/styles/solarized_light.min.css',
                'http://yandex.st/highlightjs/7.5/highlight.min.js', //code highlighting
                'http://cdnjs.cloudflare.com/ajax/libs/marked/0.3.0/marked.min.js', //markdown
                './styles/vendor/memba.widgets.min.css',
                './js/vendor/memba.widgets.min.js'
            ],
            callback: function (url) {
                if (DEBUG && global.console) {
                    global.console.log(MODULE + url + ' loading attempt');
                }
            },
            complete: function() {
                if(!global.hljs) {
                    Modernizr.load([{
                        load: [
                            './styles/vendor/highlight/solarized_light.min.css',
                            './js/vendor/highlight.min.js'
                        ]
                    }]);
                }
                if(!global.marked) {
                    Modernizr.load('./js/vendor/marked.min.js');
                }
            }
        },
        //Application libraries
        {
            test: DEBUG,
            yep: [
                './styles/app.styles.css',
                './js/app.constants.js',
                './js/app.localizer.js',
                './js/app.viewmodels.js',
                './js/app.controller.js',
                './js/cultures/app.culture.en.js', //default culture
                //TODO: http://stackoverflow.com/questions/1043339/javascript-for-detecting-browser-language-preference
                //Basically, navigator.language returns the OS language, not the browser accepted language;
                //the browser language is not something you can't get in Javascript: you need to read HTTP_USER_AGENT on the server.
                './js/cultures/app.culture.' + (global.navigator.userLanguage || global.navigator.language).substring(0, 2) + '.js', //replace default culture
                './js/cultures/app.culture.fr.js' //Force culture
            ],
            nope: [
                './styles/memba.blog.min.css',
                './js/memba.blog.min.js',
                './js/cultures/memba.blog.culture.en.min.js',
                './js/cultures/memba.blog.culture.' + (global.navigator.userLanguage || global.navigator.language).substring(0, 2) + '.min.js'
            ],
            callback: function (url) {
                if (DEBUG && global.console) {
                    global.console.log(MODULE + url + ' loading attempt');
                }
            },
            complete: function() {
                /**
                 * once document is ready, load external templates (header and footer)
                 * and trigger events.INITIALIZE when templates are loaded
                 */
                $(document).ready(function () {

                    $.when($.ajax(app.hrefs.HEADER), $.ajax(app.hrefs.FOOTER)).then(
                        function(a1, a2) { //success callback
                            //See: http://api.jquery.com/jQuery.when/
                            //a1 and a2 are arrays where
                            //aN[0] = data = response/template content
                            //aN[1] = textStatus = 'success'
                            //aN[2] = jqXHR
                            //See: http://docs.kendoui.com/howto/load-templates-external-files
                            $(app.tags.BODY).append(a1[0]);
                            $(app.tags.BODY).append(a2[0]);
                            $(document).trigger(app.events.INITIALIZE); //, [params]);
                        },
                        function(jqXHR, textStatus, errorThrown) { //error callback
                            if (DEBUG && global.console && $.type(global.console.error) === app.types.FUNCTION) {
                                global.console.error(MODULE + app.hrefs.HEADER + ' or ' + app.hrefs.FOOTER + ' ' + errorThrown);
                            }
                        }
                    );
                });
            }
        }
    ]);

    //}
}());
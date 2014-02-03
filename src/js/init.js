/*Copyright 2013-2014 Memba Sarl. All rights reserved.*/
/*jslint browser:true */
/*jshint browser:true */

/*******************************************************************************************
 * Application loader
 *******************************************************************************************/
(function () {

    "use strict";

    //Let us keep bots honest about robots.txt
    //http://www.useragentstring.com/pages/Crawlerlist/
    //https://support.google.com/webmasters/answer/1061943?hl=en
    //http://www.bing.com/webmaster/help/which-crawlers-does-bing-use-8c184ec0
    if (/bot|crawl|spider|preview/i.test(navigator.userAgent)) { return; }

    var fn = Function,
        global = fn('return this')(),
        Modernizr = global.Modernizr,
        KENDO_VERSION = '2013.3.1316', //1119',

        DEBUG = true,
        MODULE = 'app.init.js: ';

    if (DEBUG && global.console) {
        global.console.log(MODULE + global.navigator.userAgent);
        global.console.log(MODULE + global.location.href);
    }

    //If we have reached here, this is not a bot otherwise it does not comply with robots.txt
    //So if we get a querystring, we need to forward the user to the corresponding hash URL
    if(global.location.search.length > 1) {
        var search = function() {
            var s = window.location.search.substr(1),
                p = s.split(/\&/), l = p.length, kv, r = {};
            if (l === 0) {return false;}
            while (l--) {
                kv = p[l].split(/\=/);
                r[kv[0]] = decodeURIComponent(kv[1] || '') || true;
            }
            return r;
        }();
        if (search && search.r) {
            global.location.assign(global.location.protocol + '//' + global.location.host + global.location.pathname + '#' + search.r); // encodeURIComponent(search.r));
        }
    }

    //We are good and can load our JavaScript libraries
    Modernizr.load([
        //jQuery
        {
            load: '//code.jquery.com/jquery-1.9.1.min.js',
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
                '//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css',
                '//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css',
                '//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js'
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
                '//cdn.kendostatic.com/' + KENDO_VERSION + '/styles/kendo.common-bootstrap.min.css',
                '//cdn.kendostatic.com/' + KENDO_VERSION + '/styles/kendo.bootstrap.min.css',
                '//cdn.kendostatic.com/' + KENDO_VERSION + '/js/kendo.web.min.js',
                //'//cdn.kendostatic.com/' + KENDO_VERSION + '/js/kendo.timezones.min.js'
                '//cdn.kendostatic.com/' + KENDO_VERSION + '/js/cultures/kendo.culture.en.min.js', //default culture
                '//cdn.kendostatic.com/' + KENDO_VERSION + '/js/cultures/kendo.culture.' + (global.navigator.userLanguage || global.navigator.language).substr(0, 2) + '.min.js', //replace default culture
                '//cdn.kendostatic.com/' + KENDO_VERSION + '/js/cultures/kendo.culture.fr.min.js' //TODO DEBUG
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
                '//yandex.st/highlightjs/7.5/styles/solarized_light.min.css',
                '//yandex.st/highlightjs/7.5/highlight.min.js', //code highlighting
                '//cdnjs.cloudflare.com/ajax/libs/marked/0.3.0/marked.min.js', //markdown
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
            ],
            nope: [
                './styles/memba.blog.min.css',
                './js/memba.blog.min.js',
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

                    $.when($.ajax(app.hrefs.CONFIG), $.ajax(app.hrefs.HEADER), $.ajax(app.hrefs.FOOTER)).then(
                        function(config, header, footer) { //success callback
                            //See: http://api.jquery.com/jQuery.when/
                            //config, header and footer are arrays where
                            //array[0] = data = response/template content
                            //array[1] = textStatus = 'success'
                            //array[2] = jqXHR
                            var app = global.app || {};
                            app.config = config[0];
                            //See: http://docs.kendoui.com/howto/load-templates-external-files
                            $(app.tags.BODY).append(header[0]);
                            $(app.tags.BODY).append(footer[0]);
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


}());
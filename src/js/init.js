/*Copyright 2013-2014 Memba Sarl. All rights reserved.*/
/*jslint browser:true */
/*jshint browser:true */

var CONFIG = './config.json';

/*******************************************************************************************
 * Application loader
 *******************************************************************************************/
(function () {

    "use strict";

    //If this is a robot crawling our web site
    //http://www.useragentstring.com/pages/Crawlerlist/
    //https://support.google.com/webmasters/answer/1061943?hl=en
    //http://www.bing.com/webmaster/help/which-crawlers-does-bing-use-8c184ec0

    if (true) { ///bot|crawl|spider|preview/i.test(navigator.userAgent)) {
        // Note: the following is pure JavaScript (no api) to be executed by search engine bots
        var LF = '\n', COLON = ':',
        /**
         * Returns an object containing metadata properties defined as key: value\n pairs at the beginning of the markdown file
         * Important Note: the following code should remain consistent with the code in memba.markdown.js and util.js
         * See: https://github.com/Memba/Memba-Widgets/blob/master/src/js/memba.markdown.js
         * See also: https://github.com/Memba/grunt-blog/blob/master/tasks/lib/util.js
         * See also: https://github.com/Memba/Memba-Blog/blob/master/src/index.html
         * @method getMetaData
         * @param stream
         * @returns {string}
         */
        getMetaData = function(stream) {
            var buf = stream.trim().replace(/\r\n/gm, LF).replace(/\r/gm, LF),
                metaData = {},
                posLFLF = buf.indexOf(LF + LF);
            //key value pairs need to be separated from markdown by two line feeds \n\n
            if (posLFLF>0) {
                var hasMetaData = false,
                    rawMetaData = buf.substr(0, posLFLF).trim(),
                    lines = rawMetaData.split(LF).length,
                //key value pairs are in the form key: value\n
                    regex = /^(?:\s*)(\w+)(?:\s*)\:(?:\s*)([^\r\n]+)(?:\s*)$/gm,//TODO: improve but also update memba.markdown.js
                    matches = [];
                if(regex.test(rawMetaData)) {
                    matches = rawMetaData.match(regex);
                    hasMetaData = (matches.length === lines);
                }
                if(hasMetaData) {
                    matches.forEach(function(match) {
                        try {
                            var posCOL = match.indexOf(COLON);
                            metaData[match.substr(0,posCOL).trim()] = match.substr(posCOL+1).trim();
                        } catch (err) { }
                    });
                }
            }
            return metaData;
        },
        /**
         * Returns MarkDown only without carriage returns
         * Important Note: the following code should remain consistent with the code in memba.markdown.js and util.js
         * See: https://github.com/Memba/Memba-Widgets/blob/master/src/js/memba.markdown.js
         * See also: https://github.com/Memba/grunt-blog/blob/master/tasks/lib/util.js
         * See also: https://github.com/Memba/Memba-Blog/blob/master/src/index.html
         * @method getMarkDown
         * @param stream
         * @returns {string}
         */
        getMarkDown = function(stream) {
            var buf = stream.trim().replace(/\r\n/gm, LF).replace(/\r/gm, LF),
                posLFLF = buf.indexOf(LF + LF);
            //key value pairs need to be separated from markdown by two line feeds \n\n
            if (posLFLF>0) {
                return buf.substr(posLFLF + 2).trim();
            } else {
                return buf;
            }
        };

        //Get configuration file
        var html = '',
        oConfigReq = new XMLHttpRequest();
        oConfigReq.onload = function() {
            if (typeof this.responseText === 'string') {
                var config = JSON.parse(this.responseText);
                //Get sitemap
                var oSitemapReq = new XMLHttpRequest();
                oSitemapReq.onload = function() {
                    var rx = /<loc>([^\<\>]*)<\/loc>/gi;
                    if (typeof this.responseText === 'string') {
                        html += '<section role="navigation"><ul>' + this.responseText.match(rx).join('').replace(rx, '<li><a href="$1">$1</a></li>') + '</ul></section>';
                    }
                    //Get markdown content if any
                    var path;
                    if (window.location.search.length > 1) {
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
                            path = search.r.replace(/^\/[^\/\(\:]*\//, config.paths.posts) + '.md';
                        }
                    } else if (typeof config.paths.home === 'string') { //home page
                        path = config.paths.pages + config.paths.home;
                    }
                    var oContentReq = new XMLHttpRequest();
                    oContentReq.onload = function() {
                        var raw = document.getElementById('raw'),
                            metaData = getMetaData(this.responseText),
                            markDown = getMarkDown(this.responseText);
                        /*
                            head = document.getElementsByTagName('head')[0];

                        //page title
                        if (head && metaData.title) {
                            var title = document.getElementsByTagName('title')[0];
                            if (!title) {
                                title = document.createElement('title');
                                head.appendChild(title);
                            }
                            title.innerText = metaData.title;
                            html += '<h1>' + metaData.title + '</h1>';
                        }
                        //page description
                        if(head && metaData.description) {
                            var found = false, metas = document.getElementsByTagName('meta');
                            for (var i = 0; i < metas.length; i++){
                                if (metas[i].name.toLowerCase() === 'description') {
                                    metas[i].content = metaData.description;
                                }
                            }
                        }
                        */
                        //keywords????
                        //canonical URL
                        //var canonical = document.createElement('link'); canonical.rel = 'canonical'; canonical.href = '?????????????????';
                        //head.appendChild(canonical);
                        //set crawlable content after parsing for headings h1, h2 and h3
                        if(raw) {
                            html += '<section role="article">';
                            if (metaData.title) {
                                html += '<h1>' + metaData.title + '</h1>';
                            }
                            html += '<article>';
                            html += markDown
                                .replace(/^[\s]*#[\s]*([^\#\r\n]+)[\#\r\n]*/gm, '\n<h1>$1</h1>\n')
                                .replace(/^[\s]*##[\s]*([^\#\r\n]+)[\#\r\n]*/gm, '\n<h2>$1</h2>\n')
                                .replace(/^[\s]*###[\s]*([^\#\r\n]+)[\#\r\n]*/gm, '\n<h3>$1</h3>\n');
                            html += '</article></section>';
                            raw.innerHTML = html;
                        }
                    };
                    oContentReq.open("get", path, true);
                    oContentReq.send();
                }
                oSitemapReq.open("get", config.paths.sitemap, true);
                oSitemapReq.send();
            }
        };
        oConfigReq.open("get", CONFIG, true);
        oConfigReq.send();
        return; //this is the end for bots
    }

    var fn = Function,
        global = fn('return this')(),
        Modernizr = global.Modernizr,
        KENDO_VERSION = '2013.3.1324', //1316', //1119',

        DEBUG = true,
        MODULE = 'app.init.js: ';

    if (DEBUG && global.console) {
        global.console.log(MODULE + global.navigator.userAgent);
        global.console.log(MODULE + global.location.href);
    }

    //If we have reached here, this is not a bot requesting our web page
    //So if we get a querystring, we need to forward the user to the corresponding hash URL
    //then we can load our Javascript libraries
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

    //We are also good to load our JavaScript libraries
    Modernizr.load([
        //jQuery
        {
            load: '//code.jquery.com/jquery-1.10.2.min.js',
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
                '//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css',
                '//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js'
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
                '//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.0/styles/solarized_light.min.css',
                '//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.0/highlight.min.js', //code highlighting
                '//cdnjs.cloudflare.com/ajax/libs/marked/0.3.1/marked.min.js', //markdown
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
                './js/memba.blog.min.js'
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
                                global.console.error(MODULE + app.hrefs.CONFIG + ' or ' + app.hrefs.HEADER + ' or ' + app.hrefs.FOOTER + ' ' + errorThrown);
                            }
                        }
                    );
                });
            }
        }
    ]);


}());
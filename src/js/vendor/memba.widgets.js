//Copyright ©2012-2014 Memba® Sarl. All rights reserved.
/*jslint browser:true, jquery:true*/
/*jshint browser:true, jquery:true*/

(function ($, undefined) {

    "use strict";

    // shorten references to variables for uglification
    var fn = Function,
        global = fn('return this')(),
        kendo = global.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,

        //Types
        STRING = 'string',
        OBJECT = 'object',
        //Widget Constants
        EMPTY = '',
        //WIDGET_CLASS = 'k-widget k-addthis'; //We do not really want kendo styles to apply here
        WIDGET_CLASS = 'k-addthis',
        TOOLBOX_CLASS = 'addthis_toolbox',
        ADDTHIS_BUTTON = '<a class="addthis_button_{0}">{1}</a>',
        ADDTHIS_COUNTER = '<a class="addthis_counter addthis_bubble_style"></a>',
        SERVICE_BUTTON = '<a class="addthis_{0}_{1}">{2}</a>',
        PREFERRED_BUTTON = '<a class="addthis_button_preferred_{0}"></a>',
        AWESOME_FONT = '<i class="fa {0}"></i>',
        BUTTON = 'button',
        COUNTER = 'counter',
        COMPACT = 'compact',
        EXPANDED = 'expanded',
        SERVICE_CODES = {
            //BEGIN ADDED BY JLC
            'addthis': 'fa-plus-square',
            //The following are from http'://support.addthis.com/customer/portal/articles/381237-third-party-buttons
            'facebook_send': 'fa-facebook-square',
            'tweet': 'fa_twitter',
            'twitter_follow_native': 'fa_twitter',
            'google_plusone_badge': 'fa-google-plus-square',
            'hyves_respect': EMPTY,
            'linkedin_counter': 'fa-linkedin-square',
            'stumbleupon_badge': EMPTY,
            'pinterest_share': 'fa-pinterest-square',
            'pinterest_pinit': 'fa-pinterest-square',
            'foursquare': 'fa-foursquare',
            //END ADDED BY JLC
            //The following are added from http'://www.addthis.com/services/list
            //Third-Party Service Codes
            'facebook_like': 'fa-facebook-square',
            'google_plusone': 'fa-google-plus-square',
            'pinterest': 'fa-pinterest-square',
            //Basic Service Codes
            '100zakladok': EMPTY,
            '2tag': EMPTY,
            '2linkme': EMPTY,
            'a97abi': EMPTY,
            'addressbar': EMPTY,
            'adfty': EMPTY,
            'adifni': EMPTY,
            'advqr': EMPTY,
            'amazonwishlist': EMPTY,
            'amenme': EMPTY,
            'aim': EMPTY,
            'aolmail': EMPTY,
            'apsense': EMPTY,
            'arto': EMPTY,
            'azadegi': EMPTY,
            'baang': EMPTY,
            'baidu': EMPTY,
            'balltribe': EMPTY,
            'beat100': EMPTY,
            'biggerpockets': EMPTY,
            'bitly': EMPTY,
            'bizsugar': EMPTY,
            'bland': EMPTY,
            'blinklist': EMPTY,
            'blip': EMPTY,
            'blogger': EMPTY,
            'bloggy': EMPTY,
            'blogkeen': EMPTY,
            'blogmarks': EMPTY,
            'blurpalicious': EMPTY,
            'bobrdobr': EMPTY,
            'bonzobox': EMPTY,
            'socialbookmarkingnet': EMPTY,
            'bookmarkycz': EMPTY,
            'bookmerkende': EMPTY,
            'box': EMPTY,
            'brainify': EMPTY,
            'bryderi': EMPTY,
            'buddymarks': EMPTY,
            'buffer': EMPTY,
            'buzzzy': EMPTY,
            'camyoo': EMPTY,
            'care2': EMPTY,
            'foodlve': EMPTY,
            'chimein': EMPTY,
            'chiq': EMPTY,
            'cirip': EMPTY,
            'citeulike': EMPTY,
            'classicalplace': EMPTY,
            'cleanprint': EMPTY,
            'cleansave': EMPTY,
            'cndig': EMPTY,
            'colivia': EMPTY,
            'technerd': EMPTY,
            'cosmiq': EMPTY,
            'cssbased': EMPTY,
            'curateus': EMPTY,
            'delicious': EMPTY,
            'digaculturanet': EMPTY,
            'digg': EMPTY,
            'diggita': EMPTY,
            'digo': EMPTY,
            'diigo': EMPTY,
            'domelhor': EMPTY,
            'dosti': EMPTY,
            'dotnetshoutout': EMPTY,
            'douban': EMPTY,
            'draugiem': EMPTY,
            'dropjack': EMPTY,
            'dudu': EMPTY,
            'dzone': EMPTY,
            'edelight': EMPTY,
            'efactor': EMPTY,
            'ekudos': EMPTY,
            'elefantapl': EMPTY,
            'email': 'fa-envelope-o',
            'mailto': EMPTY,
            'embarkons': EMPTY,
            'evernote': EMPTY,
            'extraplay': EMPTY,
            'ezyspot': EMPTY,
            'stylishhome': EMPTY,
            'fabulously40': EMPTY,
            'facebook': 'fa-facebook-square',
            'informazione': EMPTY,
            'thefancy': EMPTY,
            'fark': EMPTY,
            'farkinda': EMPTY,
            'fashiolista': EMPTY,
            'favable': EMPTY,
            'faves': EMPTY,
            'favlogde': EMPTY,
            'favoritende': EMPTY,
            'favorites': 'fa-star',
            'favoritus': EMPTY,
            'flaker': EMPTY,
            'folkd': EMPTY,
            'formspring': EMPTY,
            'thefreedictionary': EMPTY,
            'fresqui': EMPTY,
            'friendfeed': EMPTY,
            'funp': EMPTY,
            'fwisp': EMPTY,
            'gabbr': EMPTY,
            'gamekicker': EMPTY,
            'gg': EMPTY,
            'giftery': EMPTY,
            'gigbasket': EMPTY,
            'givealink': EMPTY,
            'gmail': EMPTY,
            'govn': EMPTY,
            'goodnoows': EMPTY,
            'google': EMPTY,
            'googletranslate': EMPTY,
            'google_plusone_share': 'fa-google-plus-square',
            'greaterdebater': EMPTY,
            'hackernews': EMPTY,
            'hatena': EMPTY,
            'gluvsnap': EMPTY,
            'hedgehogs': EMPTY,
            'historious': EMPTY,
            'hotklix': EMPTY,
            'hotmail': EMPTY,
            'w3validator': EMPTY,
            'identica': EMPTY,
            'igoogle': EMPTY,
            'ihavegot': EMPTY,
            'index4': EMPTY,
            'indexor': EMPTY,
            'instapaper': EMPTY,
            'iorbix': EMPTY,
            'irepeater': EMPTY,
            'isociety': EMPTY,
            'iwiw': EMPTY,
            'jamespot': EMPTY,
            'jappy': EMPTY,
            'jolly': EMPTY,
            'jumptags': EMPTY,
            'kaboodle': EMPTY,
            'kaevur': EMPTY,
            'kaixin': EMPTY,
            'ketnooi': EMPTY,
            'kindleit': EMPTY,
            'kledy': EMPTY,
            'kommenting': EMPTY,
            'latafaneracat': EMPTY,
            'librerio': EMPTY,
            'lidar': EMPTY,
            'linkedin': 'fa-linkedin-square',
            'linksgutter': EMPTY,
            'linkshares': EMPTY,
            'linkuj': EMPTY,
            'livejournal': EMPTY,
            'lockerblogger': EMPTY,
            'logger24': EMPTY,
            'mymailru': EMPTY,
            'markme': EMPTY,
            'mashant': EMPTY,
            'mashbord': EMPTY,
            'me2day': EMPTY,
            'meinvz': EMPTY,
            'mekusharim': EMPTY,
            'memonic': EMPTY,
            'memori': EMPTY,
            'mendeley': EMPTY,
            'meneame': EMPTY,
            'live': EMPTY,
            'misterwong': EMPTY,
            'misterwong_de': EMPTY,
            'mixi': EMPTY,
            'moemesto': EMPTY,
            'moikrug': EMPTY,
            'mrcnetworkit': EMPTY,
            'myspace': EMPTY,
            'n4g': EMPTY,
            'naszaklasa': EMPTY,
            'netlog': EMPTY,
            'netvibes': EMPTY,
            'netvouz': EMPTY,
            'newsmeback': EMPTY,
            'newstrust': EMPTY,
            'newsvine': EMPTY,
            'nujij': EMPTY,
            'odnoklassniki_ru': EMPTY,
            'oknotizie': EMPTY,
            'orkut': EMPTY,
            'dashboard': EMPTY,
            'oyyla': EMPTY,
            'packg': EMPTY,
            'pafnetde': EMPTY,
            'pdfonline': EMPTY,
            'pdfmyurl': EMPTY,
            'phonefavs': EMPTY,
            'planypus': EMPTY,
            'plaxo': EMPTY,
            'plurk': EMPTY,
            'pocket': EMPTY,
            'posteezy': EMPTY,
            'posterous': EMPTY,
            'print': 'fa-print',
            'printfriendly': EMPTY,
            'pusha': EMPTY,
            'qrfin': EMPTY,
            'qrsrc': EMPTY,
            'quantcast': EMPTY,
            'qzone': EMPTY,
            'reddit': EMPTY,
            'rediff': EMPTY,
            'redkum': EMPTY,
            'researchgate': EMPTY,
            'safelinking': EMPTY,
            'scoopat': EMPTY,
            'scoopit': EMPTY,
            'sekoman': EMPTY,
            'select2gether': EMPTY,
            'shaveh': EMPTY,
            'shetoldme': EMPTY,
            'sinaweibo': EMPTY,
            'skyrock': EMPTY,
            'smiru': EMPTY,
            'sodahead': EMPTY,
            'sonico': EMPTY,
            'spinsnap': EMPTY,
            'spokentoyou': EMPTY,
            'yiid': EMPTY,
            'springpad': EMPTY,
            'startaid': EMPTY,
            'startlap': EMPTY,
            'storyfollower': EMPTY,
            'studivz': EMPTY,
            'stuffpit': EMPTY,
            'stumbleupon': EMPTY,
            'stumpedia': EMPTY,
            'sunlize': EMPTY,
            'supbro': EMPTY,
            'surfingbird': EMPTY,
            'svejo': EMPTY,
            'symbaloo': EMPTY,
            'taaza': EMPTY,
            'tagza': EMPTY,
            'taringa': EMPTY,
            'textme': EMPTY,
            'thewebblend': EMPTY,
            'thinkfinity': EMPTY,
            'thisnext': EMPTY,
            'throwpile': EMPTY,
            'toly': EMPTY,
            'topsitelernet': EMPTY,
            'transferr': EMPTY,
            'tuenti': EMPTY,
            'tulinq': EMPTY,
            'tumblr': 'fa-tumblr-square',
            'tvinx': EMPTY,
            'twitter': 'fa-twitter-square',
            'twitthis': EMPTY,
            'typepad': EMPTY,
            'upnews': EMPTY,
            'urlaubswerkde': EMPTY,
            'viadeo': EMPTY,
            'virb': EMPTY,
            'visitezmonsite': EMPTY,
            'vk': EMPTY,
            'vkrugudruzei': EMPTY,
            'voxopolis': EMPTY,
            'vybralisme': EMPTY,
            'sharer': EMPTY,
            'webnews': EMPTY,
            'webshare': EMPTY,
            'werkenntwen': EMPTY,
            'domaintoolswhois': EMPTY,
            'windows': 'fa-windows',
            'wirefan': EMPTY,
            'wordpress': EMPTY,
            'wowbored': EMPTY,
            'raiseyourvoice': EMPTY,
            'wykop': EMPTY,
            'xanga': EMPTY,
            'xing': 'fa-xing-square',
            'yahoobkm': EMPTY,
            'yahoomail': EMPTY,
            'yammer': EMPTY,
            'yardbarker': EMPTY,
            'yigg': EMPTY,
            'yookos': EMPTY,
            'yoolink': EMPTY,
            'yorumcuyum': EMPTY,
            'youmob': EMPTY,
            'yuuby': EMPTY,
            'zakladoknet': EMPTY,
            'ziczac': EMPTY,
            'zingme': EMPTY
        },
        //See http://support.addthis.com/customer/portal/articles/968908-addthis-individual-share-counters
        SERVICE_COUNTERS = {
            'facebook': true,
            'twitter': true,
            'pinterest_share': true,
            'reddit': true,
            'delicious': true,
            'vk': true,
            'linkedin': true,
            'odnoklassniki_ru': true
        },
        SERVICE_XMLNS = {
            //http://support.addthis.com/customer/portal/articles/1365475-attribute-based-configuration
            //See also http://stackoverflow.com/questions/8235687/open-graph-namespace-declaration-html-with-xmlns-or-head-prefix
            'addthis': 'xmlns:addthis="http://www.addthis.com/help/api-spec"',
            'facebook_like': 'xmlns:fb="http://www.facebook.com/2008/fbml"', //'xmlns:fb="http://ogp.me/ns/fb#"',
            'facebook_send': 'xmlns:fb="http://www.facebook.com/2008/fbml"',
            'twitter': 'xmlns:tw="http://api.twitter.com"',
            'tweet': 'xmlns:tw="http://api.twitter.com"',
            'google_plusone': 'xmlns:g="http://base.google.com/ns/1.0"',
            'google_plusone_badge': 'xmlns:g="http://base.google.com/ns/1.0"',
            'linkedin_counter': 'xmlns:li="http://developer.linkedin.com/api"', //TODO: invented
            'pinterest_pinit': 'xmlns:pi="http://developer.printerest.com/api"', //TODO: invented
            'foursquare': 'xmlns:4sq="http://developer.foursquare.com/api"' //TODO: invented
            //xmlns:og="http://ogp.me/ns#"
        };
        //Events

        //DEBUG
        //MODULE = 'AddThis Widget: ',
        //DEBUG = false;

    /*******************************************************************************************
     * AddThis
     *******************************************************************************************/

    /**
     * AddThis (kendoAddThis)
     * @class AddThis
     * @extend Widget
     */
    var AddThis = Widget.extend({

        /**
         * Initializes the widget
         * @method init
         * @param element
         * @param options
         */
        init: function (element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);
            //A wrapper is required for visible and other bindings to work
            that.wrapper = that.element;
            that._layout();
        },

        /**
         * Widget options
         * @property options
         */
        options: {
            name: 'AddThis',
            pubId: 'jlchereau',
            url: undefined,
            title: undefined,
            description: undefined,
            ga: undefined,
            floating: false,
            useFonts: false,
            services: EMPTY,
            serviceCounters: false,
            addthisCounter: false,
            expanded: false,
            max: 5,
            size: 32,
            openGraph: {},
            advanced: {}
        },

        /**
         * Builds the widget layout
         * @method _layout
         * @private
         */
        _layout: function () {
            var that = this, toolbox,
                el = $(that.element);
            if($.type(that.options.pubId) !== STRING) {
                el.css('display', 'none');
            } else {
                el.addClass(WIDGET_CLASS);
                // See http://support.addthis.com/customer/portal/articles/1337989-overview
                // See http://www.addthis.com/blog/2013/05/07/a-brief-history-of-using-addthis-dynamically/
                if (el.is('div')) {
                    toolbox = el;
                    toolbox.addClass(TOOLBOX_CLASS);
                } else {
                    el.append('<div class="' + TOOLBOX_CLASS + '"></a>');
                    toolbox = el.find('div.' + TOOLBOX_CLASS);
                }
                //Add classes/styles
                //http://support.addthis.com/customer/portal/articles/968908-addthis-individual-share-counters
                if (that.options.floating) {
                    toolbox.addClass('addthis_floating_style');
                } else {
                    toolbox.addClass('addthis_default_style');
                }
                //Addthis supports 3 sizes: 16, 20 and 32 - we need to find the closest
                var size = parseInt(that.options.size);
                if (size <= 18) {
                    size = 16;
                } else if (size <= 25) {
                    size = 20;
                } else {
                    size = 32;
                }
                toolbox.addClass(kendo.format('addthis_{0}x{0}_style', size));
                //add url, title and description
                //See http://support.addthis.com/customer/portal/articles/381242-url-title
                var meta = {};
                if($.type(that.options.url) === STRING) {
                    meta.url = that.options.url;
                }
                if($.type(that.options.title) === STRING) {
                    meta.title = that.options.title;
                }
                if($.type(that.options.description) === STRING) {
                    meta.description = that.options.description;
                }
                if(!$.isEmptyObject(meta)) {
                    that._addAdvancedProperties(toolbox, 'addthis', meta);
                }
                //add open graph meta tags
                that._addOpenGraphMetaTags(that.options.openGraph);
                //add services
                //http://support.addthis.com/customer/portal/articles/84642-preferred-versus-specified-services
                var max = parseInt(that.options.max),
                    services = that.options.services.toLowerCase().replace(/[\s]*,[\s]*/g, ',').split(','), //Check type?
                    length = services.length, //number of services specified
                    index = 0, //index of service specified
                    i = 0, //index of button
                    preferred = 1, //index of preferred button
                    addthis = false; //addthis button not already added
                while(i < max) {
                    if(index < length) { //we still have more services to try
                        var service = services[index];
                        //if (!isNaN(parseInt(service.charAt(0)))) { //Javascript properties can't start with a number so we had to add an underscore
                        //    service = '_' + service;
                        //}
                        if (service === 'addthis') {
                            toolbox.append(kendo.format(ADDTHIS_BUTTON,
                                that.options.expanded ? EXPANDED : COMPACT,
                                that.options.useFonts ? kendo.format(AWESOME_FONT, SERVICE_CODES.addthis) : EMPTY
                            ));
                            if(that.options.addthisCounter) {
                                toolbox.append(ADDTHIS_COUNTER);
                            }
                            i++;
                            addthis = true;
                        } else if (SERVICE_CODES.hasOwnProperty(service)) { //service code found
                            //http://support.addthis.com/customer/portal/articles/968908-addthis-individual-share-counters
                            var button = $(kendo.format(SERVICE_BUTTON,
                                (that.options.serviceCounters && SERVICE_COUNTERS[service]) ? COUNTER : BUTTON,
                                services[index],
                                (that.options.useFonts && SERVICE_CODES[service].substr(0, 3) === 'fa-') ? kendo.format(AWESOME_FONT, SERVICE_CODES[service]) : EMPTY
                            ));
                            if ($.type(that.options.advanced) === OBJECT && $.type(that.options.advanced[service]) === OBJECT) {
                                that._addAdvancedProperties(button, service, that.options.advanced[service]);
                            }
                            toolbox.append(button);
                            i++;
                        }
                        index++;
                    } else if (i < max -1 || addthis) { //let addthis add services
                        toolbox.append(kendo.format(PREFERRED_BUTTON,
                            preferred
                        ));
                        i++;
                        preferred++;
                    } else { //add the addthis button if not already added
                        toolbox.append(kendo.format(ADDTHIS_BUTTON,
                            that.options.expanded ? EXPANDED : COMPACT,
                            that.options.useFonts ? kendo.format(AWESOME_FONT, SERVICE_CODES.addthis) : EMPTY
                        ));
                        if(that.options.addthisCounter) {
                            toolbox.append(ADDTHIS_COUNTER);
                        }
                        i++;
                        addthis = true;
                    }
                }
                if(that.options.useFonts) {
                    toolbox.find('a').css('text-decoration: none');
                }
                if ($.type(global.addthis_config) !== OBJECT) {
                    global.addthis_congig = {
                        data_track_clickback:true,
                        ui_508_compliant: true,
                        //data_ga_tracker
                        // See http://www.addthis.com/help/google-analytics-integration
                        data_ga_property: that.options.ga,
                        data_ga_social : true
                    };
                    var script = (document.location.protocol === 'https:' ? 'https:' : 'http:') + '//s7.addthis.com/js/300/addthis_widget.js#pubid=' + that.options.pubid;
                    $.getScript(script);
                }
                that.refresh();
            }
        },

        /**
         * Utility function to add advanced properties to a button
         * @method _addAdvancedProperties
         * @param element,
         * @param properties
         * @private
         */
        _addAdvancedProperties: function(element, service, properties) {
            //See: http://support.addthis.com/customer/portal/articles/381237-third-party-buttons
            var rx=/^xmlns:([^\:\=]*)="([^\"]*)"$/i,
                add = function(element, obj, prefix) {
                    for (var prop in obj) {
                        if (obj.hasOwnProperty(prop)) {
                            if($.type(obj[prop]) === OBJECT) {
                                add(element, obj[prop], prefix + ':' + prop);
                            } else {
                                element.attr(prefix + ':' + prop, obj[prop]);
                            }
                        }
                    }
                };
            if (rx.test(SERVICE_XMLNS[service])) {
                var matches = rx.exec(SERVICE_XMLNS[service]);
                //Add namespace to html
                $('html').attr('xmlns:' + matches[1], matches[2]);
                //Add properties to element
                add(element, properties, matches[1]);
            }
        },

        /**
         * Adds Open Graph meta tags to the page
         * @method _addOpenGraphMetaTags
         * @param graph
         * @private
         */
        _addOpenGraphMetaTags: function(graph) {
            //http://opengraphprotocol.org/
            //http://davidwalsh.name/facebook-meta-tags
            var addTag = function(key, value) {
                if($('meta[property="og:' + key + '"]').length === 0 && $.type(key) === STRING && value) {
                    $('head').append(kendo.format('<meta property="og:{0}" content="{1}" />', key, value));
                }
            };
            //Basic metadata
            if($.type(graph.title) === STRING) {
                addTag('title', graph.title);
            }
            if($.type(graph.type) === STRING) {
                addTag('type', graph.type);
            }
            if($.type(graph.image) === STRING) {
                addTag('image', graph.image);
            }
            if($.type(graph.url) === STRING) {
                addTag('url', graph.url);
            }
            //Optional metadata
            if($.type(graph.audio) === STRING) {
                addTag('audio', graph.audio);
            }
            if($.type(graph.description) === STRING) {
                addTag('description', graph.description);
            }
            if($.type(graph.determiner) === STRING) {
                addTag('determiner', graph.determiner);
            }
            if($.type(graph.locale) === STRING) {
                addTag('locale', graph.locale);
            }
            if($.type(graph.site_name) === STRING) {
                addTag('site_name', graph.site_name);
            }
            if($.type(graph.video) === STRING) {
                addTag('video', graph.video);
            }
        },

        /**
         * Refreshes the widget
         * @method: refresh
         */
        refresh: function() {
            var that = this;
            //TODO - See: http://support.addthis.com/customer/portal/articles/1365325-rendering-tools-with-javascript
            if(global.addthis) {
                if ($(that.element).hasClass(TOOLBOX_CLASS)) {
                    global.addthis.toolbox(that.element);
                } else {
                    var toolbox = $(that.element).find('div.' + TOOLBOX_CLASS);
                    if (toolbox.length > 0) {
                        global.addthis.toolbox(toolbox.get(0));
                    }
                }
            }
        },

        /**
         * Clears the DOM from modifications made by the widget
         * @method _clear
         * @private
         */
        _clear: function() {
            var that = this;
            //unbind descendant events
            $(that.element).find('*').off();
            //clear element
            $(that.element)
                .empty()
                .off()
                .css('display', EMPTY)
                .removeClass(WIDGET_CLASS);
        },

        /**
         * Destroys the widget
         * @method destroy
         */
        destroy: function () {
            var that = this;
            that._clear();
            Widget.fn.destroy.call(this);
        }

    });

    ui.plugin(AddThis);

} (jQuery));
;
//Copyright ©2012-2014 Memba® Sarl. All rights reserved.
/*jslint browser:true, jquery:true*/
/*jshint browser:true, jquery:true*/

(function ($, undefined) {

    "use strict";

    // shorten references to variables for uglification
    var fn = Function,
        global = fn('return this')(),
        kendo = global.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,

        //Types
        STRING = 'string',
        FUNCTION = 'function',

        //Misc.
        HASH = '#',

        //Events
        DATASENT = 'dataSent',
        DATARECEIVED = 'dataReceived',

        //DEBUG
        MODULE = 'Analytics Widget: ',
        DEBUG = false;

    /*******************************************************************************************
     * Google Analytics
     *******************************************************************************************/

    /**
     * Analytics (kendoAnalytics)
     * @class Analytics
     * @extend Widget
     */
    var Analytics = Widget.extend({

        /**
         * Initializes the widget
         * @method init
         * @param element
         * @param options
         */
        init: function (element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);
            that._addScript();
            if (that.options.autoSend) {
                that.send();
            } else if (that.options.debug && global.console) {
                global.console.log(MODULE + 'autoSend is false, use the send() method');
            }
        },

        /**
         * Widget options
         * @property options
         */
        options: {
            name: 'Analytics',
            trackingId: undefined,
            autoSend: true,
            ssl: false,
            debug: DEBUG
        },

        /**
         * Events triggered by the widget
         */
        events: [
            DATASENT,
            DATARECEIVED
        ],

        /**
         * Adds Google Analytics Script to the page
         * @method _addScript
         * @private
         */
        _addScript: function () {
            var that = this;
            $(that.element).css('display', 'none');
            if(global.ga === undefined && $.type(that.options.trackingId) === STRING && that.options.trackingId.indexOf('UA-') === 0) { //only do once with a proper tracking id
                //See https://support.google.com/analytics/?hl=en#topic=3544906
                //See https://developers.google.com/analytics/devguides/collection/analyticsjs/advanced
                var trackerObject = (global.location.hostname === 'localhost' || global.location.hostname === '127.0.0.1') ? '{\'cookieDomain\': \'none\'}' : 'auto',
                    script = '<script>';
                script += '(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){';
                script += '(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),';
                script += 'm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)';
                script += '})(window,document,"script","//www.google-analytics.com/analytics.js","ga");';
                script += '\n\n';
                if(that.options.debug && global.console) {
                    script += 'ga(function() {';
                    script += 'window.console.log("' + MODULE + 'tracking code successfully loaded");';
                    script += '});';
                    script += '\n\n';
                }
                script += 'ga("create", "' + that.options.trackingId + '", "' + trackerObject + '");';
                if (that.options.ssl) {
                    script += 'ga("set", "forceSSL", true);'; // Send all data using SSL, even from insecure (HTTP) pages.
                }
                //script += 'ga("send", "pageview");';
                script += '</script>';
                $('head').append(script);
            }
        },

        /**
         * Returns an Url to track in Google Analytics
         * @method _getTrackingUrl
         * @param url
         * @returns {string}
         * @private
         */
        _getTrackingUrl: function(url) {
            var that = this, pos, ret;
            if (!url || (url.indexOf(global.location.pathname) === -1 && url.indexOf('/') !== 0)) {
                //This occurs when you call http://localhost:63342/Widgets/src/memba.analytics.html#.Ut-TWBDFJ9M
                //kendo.Router thinks that .Ut-TWBDFJ9M is a route which is returned as url in the change event
                ret = global.location.protocol + '//' + global.location.host + global.location.pathname;
            } else if (url.indexOf('/') === 0) {
                //the Url is most probably a kendo.Router route like "/view1#.Ut-VwxDFJ9N"
                //where everything after the # (here an AddThis tracking code) should be removed
                //TODO: what about params? like in "/view1#.Ut-VwxDFJ9N?q=1&q=2"
                var route = url;
                pos = url.indexOf(HASH);
                if(pos >= 0) {
                    route = url.substr(0, pos);
                }
                ret = global.location.protocol + '//' + global.location.host + global.location.pathname + (route === '/' ? '' : '#' + route);
                //This also ensures that we wont track
                //http://localhost:63342/Widgets/src/memba.analytics.html#/
                //and
                //http://localhost:63342/Widgets/src/memba.analytics.html
                //as different Urls
            } else {
                //Now ret is supposedly complete: "http://localhost:63342/Widgets/src/memba.analytics.html#/view1#.Ut-VwxDFJ9N"
                //And we need to remove everything from the second hash, the first hash being our view, the second hash being an AddThis tracking code or else
                //TODO what about querystring params (see above)?
                ret = url;
                pos = url.indexOf(HASH);
                if(pos >= 0) {
                    ret = url.substr(0, pos);
                }
            }
            return ret;
        },

        /**
         * Send a hit to Google Analytics
         * Without title and url, we will trust Google to find them
         * @method send
         * @param url
         * @param title
         */
        //TODO we need to enhance this with event tracking - https://developers.google.com/analytics/devguides/collection/analyticsjs/events
        send: function(url, title) {
            if ($.type(global.ga) === FUNCTION) {
                var that = this, field = {};
                if($.type(url) === STRING || $.type(title) === STRING) {
                    var pageUrl = that._getTrackingUrl(url),
                        pageTitle = title || $('title').text();
                    //See https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference
                    field.page = pageUrl;
                    field.title = pageTitle;
                } //otherwise trust Google to get the url and title
                global.ga('send', 'pageview', $.extend(field, {
                    hitCallback: function() {
                        if (that.options.debug && global.console) {
                            global.console.log(MODULE + 'just sent a page view from widget with id = #' + $(that.element).attr('id'));
                            that.trigger(DATARECEIVED, field);
                        }
                    }
                }));
                that.trigger(DATASENT, field);
            }
        },

        /**
         * Clears the DOM from modifications made by the widget
         * @method _clear
         * @private
         */
        _clear: function() {
            var that = this;
            //clear element
            $(that.element)
                .css('display', '')
                .off()
            ;
        },

        /**
         * Destroys the widget
         * @method destroy
         */
        destroy: function () {
            var that = this;
            that._clear();
            Widget.fn.destroy.call(this);
        }

    });

    ui.plugin(Analytics);

} (jQuery));
;
//Copyright ©2012-2014 Memba® Sarl. All rights reserved.
/*jslint browser:true, jquery:true*/
/*jshint browser:true, jquery:true*/

(function ($, undefined) {

    "use strict";

    // shorten references to variables for uglification
    var fn = Function,
        global = fn('return this')(),
        kendo = global.kendo,
        ui = kendo.ui,
        FUNCTION = 'function';


    /**
     * Enable binding the active value of a Template widget
     * @type {*|void}
     */
    kendo.data.binders.widget.active = kendo.data.Binder.extend({
        init: function(widget, bindings, options) {
            //call the base constructor
            kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
        },
        refresh: function() {
            var that = this,
                value = that.bindings.active.get(), //get the value from the View-Model
                widget = kendo.widgetInstance($(that.element));
            if (widget instanceof ui.Template) {
                widget.active(value); //update our widget
            } else if ($.type(widget.active) === FUNCTION) { //try not to mess with other widgets
                try {
                    widget.active(value);
                } catch(err) {}
            }
        }
    });

    /**
     * Enable binding the identifier value of a Disqus widget
     * @type {*|void}
     */
    kendo.data.binders.widget.identifier = kendo.data.Binder.extend({
        init: function(widget, bindings, options) {
            //call the base constructor
            kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
        },
        refresh: function() {
            var that = this,
                value = that.bindings.identifier.get(), //get the value from the View-Model
                widget = kendo.widgetInstance($(that.element));
            if (widget instanceof ui.Disqus) {
                widget.identifier(value); //update our widget
            } else if ($.type(widget.identifier) === FUNCTION) { //try not to mess with other widgets
                try {
                    widget.identifier(value);
                } catch(err) {}
            }
        }
    });
    
    /**
     * Enable binding the title value of a Disqus widget
     * @type {*|void}
     */
    kendo.data.binders.widget.title = kendo.data.Binder.extend({
        init: function(widget, bindings, options) {
            //call the base constructor
            kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
        },
        refresh: function() {
            var that = this,
                value = that.bindings.title.get(), //get the value from the View-Model
                widget = kendo.widgetInstance($(that.element));
            if (widget instanceof ui.Disqus) {
                widget.title(value); //update our widget
            } else if ($.type(widget.title) === FUNCTION) { //try not to mess with other widgets
                try {
                    widget.title(value);
                } catch(err) {}
            }
        }
    });
    
    /**
     * Enable binding the type value of an InfoBox widget
     * @type {*|void}
     */
    kendo.data.binders.widget.type = kendo.data.Binder.extend({
        init: function(widget, bindings, options) {
            //call the base constructor
            kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
        },
        refresh: function() {
            var that = this,
                value = that.bindings.type.get(), //get the value from the View-Model
                widget = kendo.widgetInstance($(that.element));
            if (widget instanceof ui.InfoBox) {
               widget.type(value); //update our widget
            } else if ($.type(widget.type) === FUNCTION) { //try not to mess with other widgets
                try {
                    widget.type(value);
                } catch(err) {}
            }
        }
    });

    /**
     * Enable binding the url value of a Disqus or MarkDown widget
     * see http://docs.kendoui.com/getting-started/framework/mvvm/bindings/custom
     * @type {*|void}
     */
    kendo.data.binders.widget.url = kendo.data.Binder.extend({
        init: function(widget, bindings, options) {
            //call the base constructor
            kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
        },
        refresh: function() {
            var that = this,
                value = that.bindings.url.get(), //get the value from the View-Model
                widget = kendo.widgetInstance($(that.element));
            if (widget instanceof ui.Disqus || widget instanceof ui.MarkDown) {
                widget.url(value); //update our widget
            } else if ($.type(widget.url) === FUNCTION) { //try not to mess with other widgets
                try {
                    widget.url(value);
                } catch(err) {}
            }
        }
    });


} (jQuery));
;
//Copyright ©2012-2014 Memba® Sarl. All rights reserved.
/*jslint browser:true, jquery:true*/
/*jshint browser:true, jquery:true*/

(function ($, undefined) {

	"use strict";

    // shorten references to variables for uglification
    var fn = Function,
        global = fn('return this')(),
        //$ = global.jQuery,
        /**
         * @module kendo
         * @requires jQuery, kendo
         */
        kendo = global.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        STRING = 'string',
        //Events
        CHANGE = 'change';


    /*******************************************************************************************
     * Bread Crumb
     * TODO: Remove dataSource
     *******************************************************************************************/

    /**
     * Bread Crumb (kendoBreadCrumb)
     * @class BreadCrumb
     * @extend Widget
     */
    var BreadCrumb = Widget.extend({

        /**
         * Initializes the widget
         * @method init
         * @param element
         * @param options
         */
        init: function (element, options) {
            var that = this;
            options = options || {};
            kendo.logToConsole('Initializing kendoBreadCrumb custom widget');
            Widget.fn.init.call(that, element, options);
            that._dataSource();
            that._layout();
        },

        /**
         * Widget options
         * @property options
         */
        options: {
            name: "BreadCrumb",
            items: null, //Breadcrumb items have 2 properties: text and href
            dataSource: null //and not source (exception to the data-X parsing)
        },

        /**
         * Binds the widget to the change event of the data source
         * @method _dataSource
         * @private
         */
        _dataSource: function () {

            var that = this;

            if (that.options.dataSource) {
                if (that._refreshHandler) {
                    that.options.dataSource.unbind(CHANGE, that._refreshHandler);
                }
                else {
                    that._refreshHandler = $.proxy(that.refresh, that);
                }

                // bind to the change event to refresh the widget
                that.options.dataSource.bind(CHANGE, that._refreshHandler);
            }
        },

        /**
         * Sets the dataSource
         * @method setDataSource
         * @param dataSource
         */
        setDataSource: function(dataSource) {
            // set the internal datasource equal to the one passed in by MVVM
            // make sure it is observable though to subscribe to its change event
            this.options.dataSource = kendo.observable(dataSource);
            // rebuild the datasource if necessary, or just reassign
            this._dataSource();
        },

        /**
         * Template used to build the widget
         * SEE: http://www.jankoatwarpspeed.com/examples/breadcrumb/
         * @property _template
         * @private
         */
        _template: '<ul>' +
                   '# for (var i = 0; i < data.{0}.length; i++) { #' +
                        '# if (data[data.{0}[i].text]) { #' + //if this is a recognized property or method of app.viewModel, data-bind
                            '<li><a data-href="#= data.{0}[i].href #" data-bind="text: #= data.{0}[i].text #"></a></li>' +
                        '# } else { #' + //otherwise, simply display text
                            '<li><a data-href="#= data.{0}[i].href #">#= data.{0}[i].text #</a></li>' +
                        '# } #' +
                   '# } #' +
                   '<ul>',

        /**
         * Builds the widget layout
         * @method _layout
         * @private
         */
        _layout: function () {
            var that = this,
                template = null;
            that._clear();
            //TODO: Check that that.element si a DIV or UL, assuming a DIV here
            $(that.element).addClass('k-widget k-breadcrumb');
            if(that.options.dataSource) {
                if ($.type(that.options.items) === STRING && $.trim(that.options.items).length > 0) {
                    var items = that.options.dataSource.get(that.options.items);
                    //TODO: See if we can replace the isArray function
                    if (isArray(items) && items.length > 0) {
                        template = kendo.template(kendo.format(that._template, that.options.items));
                        $(that.element).html(template(that.options.dataSource));
                        //find the closest pane
                        var pane = that.element.closest(kendo.roleSelector('pane'));
                        if (pane) {
                            pane = pane.data('kendoMobilePane');
                            $(that.element).find('a').click(function(e) {
                                e.preventDefault();
                                pane.navigate($(e.delegateTarget).attr('data-href'));
                            });
                        } else {
                            $(that.element).find('a').click(function(e) {
                                e.preventDefault();
                                window.location.href = $(e.delegateTarget).attr('data-href');
                            });
                        }
                        kendo.bind($(that.element), that.options.dataSource);
                    }
                }
            } else {
                $.noop(); //TODO
                //if (isArray(that.options.items) && that.options.items.length > 0) {
                //    template = kendo.template(kendo.format(that._template, that.options.items));
                //    $(that.element).html(template(that.options.dataSource));
                //}
            }
        },

        /**
         * Refreshes the widget as changes are made to the data source
         * @method refresh
         * @param e {Object} the change event triggered by the observable dataSource
         */
        refresh: function (e) {
            var that = this;
            if (($.type(e.field) === STRING) && (e.field === that.options.items)) {
                that._layout();
            }
        },

        /**
         * Clears the DOM from modifications made by the widget
         * @method _clear
         * @private
         */
        _clear: function() {
            var that = this;
            //unbind descendant events
            $(that.element).find('*').off();
            //clear element
            $(that.element)
                .empty()
                .off()
                .removeClass('k-widget k-breadcrumb');
        },

        /**
         * Destroys the widget including bounds to the data source
         * @method destroy
         */
        destroy: function () {
            var that = this;
            that._clear();
            Widget.fn.destroy.call(this);
            if (that.options.dataSource) {
                if (that._refreshHandler) {
                    that.options.dataSource.unbind(CHANGE, that._refreshHandler);
                }
            }
        }
    });

    ui.plugin(BreadCrumb);


    /**
     * Tests whether arr is an array (works with kendo UI ObservableArray contrary to $.isArray)
     * @method isArray
     * @private
     * @param arr {*} the object or value to test
     * @return {Boolean}
     */
    function isArray(arr) {
        return ((typeof arr === 'object') && (arr.length) && (arr.pop) && (arr.push) && (arr.shift));
    }


} (jQuery));
;
//Copyright ©2012-2014 Memba® Sarl. All rights reserved.
/*jslint browser:true, jquery:true*/
/*jshint browser:true, jquery:true*/

(function ($, undefined) {

    "use strict";

    // shorten references to variables for uglification
    var fn = Function,
        global = fn('return this')(),
        kendo = global.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        STRING = 'string',
        FUNCTION = 'function',

        //Widget
        ENGLISH = 'en',
        TYPE_THREAD = 'thread',
        TYPE_COUNT = 'count',
        CONTAINER_THREAD = 'disqus_thread',
        CONTAINER_COUNT = 'disqus_count',

        DIV = '<div id="{0}"></div>',
        ANCHOR_WITH_HASH = '<a id="{0}" href="{1}#disqus_thread"></a>',
        ANCHOR_WITH_IDENTIFIER = '<a id="{0}" href="{1}" data-disqus-identifier="{2}"></a>',

        MSG_MISSING_SHORTNAME = 'Missing Disqus shortname',
        MSG_INCONSISTENT_SHORTNAME = 'Disqus shortname "{0}" inconsistent with shortname "{1}" on the same page',
        MSG_ONE_THREAD_ONLY= 'Disqus only allows one comment thread on a page',

        //Debug
        MODULE = 'Disqus Widget: ',
        DEBUG = false;

    /*******************************************************************************************
    * Disqus
    *******************************************************************************************/

    /**
     * Disqus (kendoDisqus)
     * @class Disqus
     * @extend Widget
     */
    var Disqus = Widget.extend({

        /**
         * Initializes the widget
         * @method init
         * @param element
         * @param options
         */
        init: function (element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);
            //A wrapper is required for visible and other bindings to work
            that.wrapper = that.element;
            that._layout();
        },

        /**
         * Widget options
         * @property options
         */
        options: {
            name: 'Disqus',
            shortname: 'example',
            type: TYPE_THREAD, //thread or count
            url: '',
            identifier: '',
            title: '',
            language: ENGLISH
            //Consider:
            //http://help.disqus.com/customer/portal/articles/466258-capturing-disqus-commenting-activity-via-callbacks
        },

        /**
         * The url of the page commented
         * @method url
         * @param value
         * @return {*}
         */
        url: function (value) {
            var that = this;
            if (value) {
                if($.type(value) !== STRING) {
                    throw new TypeError();
                }
                if(that.options.url !== value) {
                    that.options.url = value;
                    //that.refresh();
                }
            }
            else {
                return that.options.url;
            }
        },

        /**
         * The identifier of the page commented
         * @method identifier
         * @param value
         * @return {*}
         */
        identifier: function (value) {
            var that = this;
            if (value) {
                if($.type(value) !== STRING) {
                    throw new TypeError();
                }
                if(that.options.identifier !== value) {
                    that.options.identifier = value;
                    //that.refresh();
                }
            }
            else {
                return that.options.identifier;
            }
        },

        /**
         * The title of the page commented
         * @method title
         * @param value
         * @return {*}
         */
        title: function (value) {
            var that = this;
            if (value) {
                if($.type(value) !== STRING) {
                    throw new TypeError();
                }
                if(that.options.title !== value) {
                    that.options.title = value;
                    //that.refresh();
                }
            }
            else {
                return that.options.title;
            }
        },

        _containerId: undefined,
        /**
         * The disqus id of the container DOM element
         * @returns {string}
         */
        containerId: function() {
            var that = this;
            if (!that._containerId) {
                var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
                that._containerId = ($(that.element).attr('id') || (that.options.type.toLowerCase() === TYPE_COUNT ? CONTAINER_COUNT : CONTAINER_THREAD)) + '-';
                for (var i=0; i<4; i++) { //add some randomness to allow several components on a page
                    that._containerId += chars[Math.floor(chars.length*Math.random())];
                }
            }
            return that._containerId;
        },


        /**
         * Builds the widget layout
         * @method _layout
         * @private
         */
        _layout: function () {
            var that = this;
            that._clear();

            //Test shortname
            if ($.type(that.options.shortname) !== STRING) {
                $(that.element).html(MSG_MISSING_SHORTNAME);
                return;
            } else if ($.type(global.disqus_shortname) !== STRING){
                global.disqus_shortname = that.options.shortname;
            } else if (that.options.shortname !== global.disqus_shortname) {
                $(that.element).html(kendo.format(MSG_INCONSISTENT_SHORTNAME, that.options.shortname, global.disqus_shortname));
                return;
            }

            //Comment count
            if (that.options.type.toLowerCase() === TYPE_COUNT) {
                if ($.type(that.options.identifier) === STRING && that.options.identifier.length > 0) {
                    $(that.element).html(kendo.format(ANCHOR_WITH_IDENTIFIER, that.containerId(), that.options.url, that.options.identifier));
                } else {
                    $(that.element).html(kendo.format(ANCHOR_WITH_HASH, that.containerId(), that.options.url));
                }
                if (!global.DISQUSWIDGETS) { //First Disqus count widget on page loads Disqus count.js script
                    //At least we ensure this is not loaded twice but this script should preferably have been loaded by the last widget to initialize
                    $.ajax({
                        dataType: 'script',
                        cache: true,
                        url: (document.location.protocol === 'https:' ? 'https:' : 'http:') + '//' + global.disqus_shortname + '.disqus.com/count.js'
                    });
                }

            //Comment thread
            } else {
                $(that.element).addClass('k-widget k-disqus-thread');
                //See http://blog.slashpoundbang.com/post/2592867566/disqus-the-missing-manual
                if($.type(global.disqus_container_id) !== STRING) {
                    global.disqus_container_id = that.containerId();
                    $(that.element).html(kendo.format(DIV, global.disqus_container_id));
                } else {
                    $(that.element).html(MSG_ONE_THREAD_ONLY);
                }
                if(!global.DISQUS) { //First Disqus thread widget on page loads Disqus thread script
                    //this is only loaded once
                    //We do not use $.getScript which adds a dummy parameter to query string to avoid caching the script
                    //See: https://api.jquery.com/jQuery.getScript/
                    $.ajax({
                        dataType: 'script',
                        cache: true,
                        url: (document.location.protocol === 'https:' ? 'https:' : 'http:') + '//' + global.disqus_shortname + '.disqus.com/embed.js'
                    });
                    /*
                     (function() {
                     var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                     dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
                     (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                     })();
                     */
                }
            }
        },

        /**
         * Refreshes the widget
         * @method refresh
         */
        refresh: function() {
            var that = this;
            if (that.options.type.toLowerCase() === TYPE_COUNT) {
                if (global.DISQUSWIDGETS && $.type(global.DISQUSWIDGETS.displayCount) === FUNCTION) {
                    var param = ($.type(that.options.identifier) === STRING && that.options.identifier.length > 0) ? that.options.identifier : that.options.url;
                    $.getScript((document.location.protocol === 'https:' ? 'https:' : 'http:') + '//' + global.disqus_shortname + '.disqus.com/count-data.js?1=' + encodeURIComponent(param));
                }
            } else {
                if(global.DISQUS) {
                    //http://help.disqus.com/customer/portal/articles/472107-using-disqus-on-ajax-sites
                    DISQUS.reset({
                        reload: true,
                        config: function () {
                            //See http://blog.slashpoundbang.com/post/2592867566/disqus-the-missing-manual
                            this.language = that.options.language || ENGLISH;
                            this.container_id = that.containerId();
                            this.page.identifier = that.options.identifier;
                            this.page.url = that.options.url;
                            this.page.title = that.options.title;
                        }
                    });
                }
            }
        },

        /**
         * Clears the DOM from modifications made by the widget
         * @method _clear
         * @private
         */
        _clear: function() {
            var that = this;
            //unbind descendant events
            $(that.element).find('*').off();
            //clear element
            $(that.element)
                .empty()
                .off()
                .removeClass('k-widget k-disqus-thread k-disqus-count');
        },

        /**
         * Destroys the widget including bounds to the data source
         * @method destroy
         */
        destroy: function () {
            var that = this;
            that._clear();
            Widget.fn.destroy.call(this);
        }

    });

    ui.plugin(Disqus);

} (jQuery));
;
//Copyright ©2012-2014 Memba® Sarl. All rights reserved.
/*jslint browser:true, jquery:true*/
/*jshint browser:true, jquery:true*/

(function ($, undefined) {

    "use strict";

    // shorten references to variables for uglification
    var fn = Function,
        global = fn('return this')(),
        kendo = global.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,

        //Types
        NUMBER = 'number',
        STRING = 'string';

        //DEBUG
        //MODULE = 'Gravatar Widget: ',
        //DEBUG = false;

    /*******************************************************************************************
     * Gravatar
     *******************************************************************************************/

    /**
     * Gravatar (kendoGravatar)
     * @class Gravatar
     * @extend Widget
     */
    var Gravatar = Widget.extend({

        /**
         * Initializes the widget
         * @method init
         * @param element
         * @param options
         */
        init: function (element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);
            //A wrapper is required for visible and other bindings to work
            that.wrapper = that.element;
            that._layout();
        },

        /**
         * Widget options
         * @property options
         */
        options: {
            name: 'Gravatar',
            value: '',
            size: 80
        },

        /**
         * Value containing an email which can be used to find a Gravatar
         * @method value
         * @param value
         * @return {*}
         */
        value: function (value) {
            var that = this;
            if (value) {
                if($.type(value) !== STRING) {
                    throw new TypeError();
                }
                if(that.options.value !== value) {
                    that.options.value = value;
                    that.refresh();
                }
            }
            else {
                return that.options.value;
            }
        },

        /**
         * Size of the gravatar image
         * @method size
         * @param size
         * @return {*}
         */
        size: function (size) {
            var that = this;
            if (size) {
                if($.type(size) !== STRING && $.type(size) !== NUMBER) {
                    throw new TypeError();
                }
                size = parseInt(size);
                if(that.options.size !== size) {
                    that.options.size = size;
                    that.refresh();
                }
            }
            else {
                return that.options.size;
            }
        },

        /**
         * Builds the widget layout
         * @method _layout
         * @private
         */
        _layout: function () {
            var that = this;
            if ($(that.element).is('img')) {
                $(that.element).addClass('k-gravatar');
            } else {
                $(that.element).addClass('k-widget');
                $(that.element).html('<img class="k-gravatar">');
            }
            that.refresh();
        },

        /**
         * Gets the gravatar url
         * @param value
         * @param size
         * @returns {string}
         * @private
         */
        _getImageUrl: function(value, size) {
            //Parse value for a valid email
            var rx = /\b([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})\b/gi,
                //See http://sv.gravatar.com/site/implement/images/
                //See http://www.deluxeblogtips.com/2010/04/get-gravatar-using-only-javascript.html
                MD5 = function(s){
                    /* jshint ignore:start */
                    function L(k,d){return(k<<d)|(k>>>(32-d));}
                    function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H);}if(I|d){if(x&1073741824){return(x^3221225472^F^H);}else{return(x^1073741824^F^H);}}else{return(x^F^H);}}
                    function r(d,F,k){return(d&F)|((~d)&k);}
                    function q(d,F,k){return(d&k)|(F&(~k));}
                    function p(d,F,k){return(d^F^k);}
                    function n(d,F,k){return(F^(d|(~k)));}
                    function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F);}
                    function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F);}
                    function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F);}
                    function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F);}
                    function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]|(G.charCodeAt(H)<<d));H++;}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa;}
                    function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2);}return k;}
                    function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x);}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128);}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128);}}}return d;}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g);}
                    var i=B(Y)+B(X)+B(W)+B(V);
                    return i.toLowerCase();
                    /* jshint ignore:end */
                },
                matches = (value || '').match(rx);
            if (matches && matches.length > 0) {
                return (document.location.protocol === 'https:' ? 'https:' : 'http:') + '//www.gravatar.com/avatar/' + MD5(matches[0].toLowerCase()) + '.jpg?d=mm&s=' + (size || 80);
            }
            return (document.location.protocol === 'https:' ? 'https:' : 'http:') + '//www.gravatar.com/avatar/?d=mm&s=' + (size || 80);
        },

        /**
         * Refreshes the widget
         * @method refresh
         */
        refresh: function() {
            var that = this, img;
            if ($(that.element).is('img')) {
                img = $(that.element);
            } else {
                img = $(that.element).find('img').first();
            }
            img.attr('src', that._getImageUrl(that.value(), that.size()));
            img.attr('alt', that.value());
        },

        /**
         * Clears the DOM from modifications made by the widget
         * @method _clear
         * @private
         */
        _clear: function() {
            var that = this;
            //unbind descendant events
            $(that.element).find('*').off();
            //clear element
            $(that.element)
                .empty()
                .off()
                .removeClass('k-widget k-gravatar');
        },

        /**
         * Destroys the widget
         * @method destroy
         */
        destroy: function () {
            var that = this;
            that._clear();
            Widget.fn.destroy.call(this);
        }

    });

    ui.plugin(Gravatar);

} (jQuery));
;
//Copyright ©2012-2014 Memba® Sarl. All rights reserved.
/*jslint browser:true, jquery:true*/
/*jshint browser:true, jquery:true*/

(function ($, undefined) {

	"use strict";

    // shorten references to variables for uglification
    var fn = Function,
        global = fn('return this')(),
        //$ = global.jQuery,
        /**
         * @module kendo
         * @requires jQuery, kendo
         */
        kendo = global.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        //Events
        CHANGE = 'change',
        DBLCLICK = 'dblclick';

    /*******************************************************************************************
     * Icon Selector
     *******************************************************************************************/

    /**
     * Icon Selector (kendoIconSelector)
     * @class IconSelector
     * @extend Widget
     */
    var IconSelector = Widget.extend({

        /**
         * Initializes the widget
         * @method init
         * @param element
         * @param options
         */
        init: function (element, options) {
            var that = this;
            options = options || {};
            Widget.fn.init.call(that, element, options);
            that._dataSource();
            that._layout();
        },

        /**
         * Widget options
         * @property options
         */
        options: {
            name: "IconSelector",
            icon: null, //selected icon
            path: null,  //path to icons
            dataSource: null, //and not source (exception to the data-X parsing)
            autoBind: true //TODO: what is this used for?
        },

        /**
         * Get or sets the selected icon
         * @method icon
         * @param value
         * @returns {*}
         */
        icon: function (value) {
            var that = this;
            if (value) {
                //check value is of type string
                that.options.value = value;
                //that.refresh();
                return;
            }
            else {
                return that.options.value;
            }
        },

        /**
         * Gets or sets the path to an XML or JSON stream listing the icons to display
         * @method path
         * @param value
         * @returns {null}
         */
        path: function (value) {
            var that = this;
            if (value) {
                //check value is of type path + add '/' at the end
                that.options.path = value;
                //TODO: set the dataSource
                //that.refresh();
                return;
            }
            else {
                return that.options.path;
            }
        },

        /**
         * Binds the widget to the change event of the data source
         * @method _datasSource
         * @private
         */
        _dataSource: function () {

            var that = this;

            if (that.options.dataSource) {
                if (that._refreshHandler) {
                    that.options.dataSource.unbind(CHANGE, that._refreshHandler);
                }
                else {
                    that._refreshHandler = $.proxy(that.refresh, that);
                }

                // bind to the change event to refresh the widget
                that.options.dataSource.bind(CHANGE, that._refreshHandler);
            }
        },

        /**
         * Sets the dataSource
         * @method setDataSource
         * @param dataSource
         */
        setDataSource: function(dataSource) {
            // set the internal datasource equal to the one passed in by MVVM
            this.options.dataSource = dataSource;
            // rebuild the datasource if necessary, or just reassign
            this._dataSource();
        },

        /**
         * Builds the widget layout
         * @method _layout
         * @private
         */
        _layout: function () {
            var that = this;
            $('li > img', that.element).unbind(DBLCLICK);
            $(that.element).empty();
            $(that.element).addClass('k-widget k-iconselector');
            $(that.element).append('<ul>');
            var icons = [
                'error32.png',
                'info32.png',
                'success32.png',
                'warning32.png'
            ];
            //TODO: this Widget needs to get an array of icons
            //then it needs to calculate the space available on screen
            //to draw a maximum of icons without triggering an overflow
            //The result is the size of a page
            //Then we need to implement swipe events to swipe between pages
            //See http://demos.kendoui.com/mobile/swipe/index.html
            //Note the page displayed by default is the page
            //which has the icon selected (databinding)
            //we might consider displaying the IconSelector
            //in an action sheet or in a modal view
            //See: http://demos.kendoui.com/mobile/actionsheet/index.html
            //We will see which is the most usable
            //A pager like in the dataGrid would also be great
            $.each(icons, function(index, value) {
                $(that.element).append('<li class="k-iconselector-icon"><img src="' + that.options.path + value + '" /></li>');
            });
            $(that.element).append('</ul>');
            $('img[src="' + that.options.dataSource.get(that.options.icon) + '"]', that.element).closest('li').removeClass('k-iconselector-icon').addClass('k-iconselector-selected');
            $('li > img', that.element).bind(DBLCLICK, function(e) {
                if (that.options.dataSource.get(that.options.icon) !== $(e.currentTarget).attr('src')) {
                    $('li', $(that.element)).removeClass('k-iconselector-selected').addClass('k-iconselector-icon');
                    that.options.dataSource.set(that.options.icon, $(e.currentTarget).attr('src'));
                    $(e.currentTarget).closest('li').removeClass('k-iconselector-icon').addClass('k-iconselector-selected');
                }
            });
        },

        /**
         * Refreshes the widget as changes are made to the data source
         * @method refresh
         * @param e {Object} the change event triggered by the observable dataSource
         */
        refresh: function(e) {
            $.noop();
        },

        /**
         * Clears the DOM from modifications made by the widget
         * @method _clear
         * @private
         */
        _clear: function() {
            var that = this;
            //unbind descendant events
            $(that.element).find('*').off();
            //clear element
            $(that.element)
                .empty()
                .off()
                .removeClass('k-widget k-iconselector');
        },

        /**
         * Destroys the widget including bounds to the data source
         * @method destroy
         */
        destroy: function () {
            var that = this;
            that._clear();
            Widget.fn.destroy.call(this);
            if (that.options.dataSource) {
                if (that._refreshHandler) {
                    that.options.dataSource.unbind(CHANGE, that._refreshHandler);
                }
            }
        }
    });

    ui.plugin(IconSelector);

} (jQuery));
;
//Copyright ©2012-2014 Memba® Sarl. All rights reserved.
/*jslint browser:true, jquery:true*/
/*jshint browser:true, jquery:true*/

(function ($, undefined) {

	"use strict";

    // shorten references to variables for uglification
    var fn = Function,
        global = fn('return this')(),
        kendo = global.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,

        //Types
        STRING = 'string',

        //Type
        TYPE_HIDDEN = 'hidden',
        TYPE_INFO = 'info',
        TYPE_WARNING = 'warning',
        TYPE_ERROR = 'error',
        TYPE_SUCCESS = 'success',

        //Text
        DEFAULT_VALUE = 'Default message for an information box';

        //DEBUG
        //MODULE = 'Infobox Widget: ',
        //DEBUG = false;

    /*******************************************************************************************
     * Information Box
     *******************************************************************************************/

    /**
     * Information Box (kendoInfoBox)
     * @class InfoBox
     * @extend Widget
     */
    var InfoBox = Widget.extend({

        /**
         * Initializes the widget
         * @method init
         * @param element
         * @param options
         */
        init: function (element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);
            that._layout();
        },

        /**
         * Widget options
         * @property options
         */
        options: {
            name: "InfoBox",
            type: TYPE_INFO, //hidden, info, warning, error, success
            value: DEFAULT_VALUE
        },

        /**
         * Type defines the icon of the information box and can be any of 'hidden', 'info', 'warning', 'error', 'success' or a data bound value
         * @method type
         * @param value
         * @return {*}
         */
        type: function (value) {
            var that = this;
            if (value) {
                if($.type(value) !== STRING) {
                    throw new TypeError();
                }
                if ($.inArray(value, [TYPE_INFO, TYPE_WARNING, TYPE_ERROR, TYPE_SUCCESS]) < 0 ) {
                    value = TYPE_HIDDEN;
                }
                if(that.options.type !== value) {
                    that.options.type = value;
                    that.refresh();
                }
            }
            else {
                return that.options.type;
            }
        },

        /**
         * Text to be displayed in the information box
         * @method text
         * @param value
         * @return {*}
         */
        value: function (value) {
            var that = this;
            if (value) {
                if($.type(value) !== STRING) {
                    throw new TypeError();
                }
                if(that.options.value !== value) {
                    that.options.value = value;
                    that.refresh();
                }
            }
            else {
                return that.options.value;
            }
        },

        /**
         * Builds the widget layout
         * @method _layout
         * @private
         */
        _layout: function () {
            //CONSIDER check whether values have actually changed before executing and optimize in the case only text has changed
            //Styling inspired from http://www.jankoatwarpspeed.com/post/2008/05/22/CSS-Message-Boxes-for-different-message-types.aspx
            var that = this;
            that._clear();
            $(that.element).addClass('k-widget k-infobox');
            that.refresh();
        },

        /**
         * Refreshes the widget
         * @method refresh
         */
        refresh: function() {
            var that = this;
            //Update text
            $(that.element).html(that.value());
            //Update type
            switch(that.type()) {
                case TYPE_INFO:
                    $(that.element).addClass('k-infobox-info').removeClass('k-infobox-warning k-infobox-error k-infobox-success').show();
                    break;
                case TYPE_WARNING:
                    $(that.element).addClass('k-infobox-warning').removeClass('k-infobox-info k-infobox-error k-infobox-success').show();
                    break;
                case TYPE_ERROR:
                    $(that.element).addClass('k-infobox-error').removeClass('k-infobox-info k-infobox-warning k-infobox-success').show();
                    break;
                case TYPE_SUCCESS:
                    $(that.element).addClass('k-infobox-success').removeClass('k-infobox-info k-infobox-warning k-infobox-error').show();
                    break;
                //case TYPE_HIDDEN:
                default:
                    $(that.element).hide();
                    break;
            }
        },

        /**
         * Clears the DOM from modifications made by the widget
         * @method _clear
         * @private
         */
        _clear: function() {
            var that = this;
            //unbind descendant events
            $(that.element).find('*').off();
            //clear element
            $(that.element)
                .empty()
                .off()
                .removeClass('k-widget k-infobox');
        },

        /**
         * Destroys the widget including bounds to the data source
         * @method destroy
         */
        destroy: function () {
            var that = this;
            that._clear();
            Widget.fn.destroy.call(this);
        }

	});

	ui.plugin(InfoBox);

} (jQuery));
;
//Copyright ©2012-2014 Memba® Sarl. All rights reserved.
/*jslint browser:true, jquery:true*/
/*jshint browser:true, jquery:true*/

/*
 * We have looked at 3 libraries to parse markdown:
 * https://github.com/chjj/marked
 * https://github.com/evilstreak/markdown-js
 * https://github.com/coreyti/showdown
 *
 * Based on sole activity, we have discarded showdown.
 * Considering our ultimate goal is to use markdown in blogs
 * we have favoured marked.js over markdown.js because
 * marked.js permits embedding html, including video objects
 * See: See https://github.com/chjj/marked/issues/294
 * Also marked.js is used in reveal.js
 */

(function ($, undefined) {

    "use strict";

    // shorten references to variables for uglification
    var fn = Function,
        global = fn('return this')(),
        kendo = global.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        NULL = null,
        STRING = 'string',
        EMPTY_STRING = '',
        LF = '\n',
        COLON = ':',
        SCRIPT_SELECTOR = 'script[type="text/plain"]',
        SCRIPT_TAG = '<script type="text/plain"></script>',
        WRAP_TAG = '<wrap></wrap>',
        CLASS = 'k-markdown',
        METADATA = 'metadata',
        CHANGE = 'change';

    /**
     * Helper function form markedjs
     * @param html
     * @param encode
     * @returns {XML|string}
     */
    function escape(html, encode) {
        return html
            .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    /**
     * MarkDown Widget (kendoMarkDown)
     * @class MarkDown
     * @extend Widget
     */
    var MarkDown = Widget.extend({

        /**
         * Initializes the widget
         * @method init
         * @param element
         * @param options
         */
        init: function(element, options) {
            var that = this;
            that._initMarked();
            kendo.ui.Widget.fn.init.call(that, element, options);
            that.element.addClass(CLASS);
            that._inline();
            that.refresh();
        },

        /**
         * Initializes marked.js
         * @private
         */
        _renderer: undefined,
        _initMarked: function() {
            var that = this;
            if(!that._renderer) {
                that._renderer = new global.marked.Renderer();
                //hack: we need a renderer to add proper pre code classes
                //until markedjs catches up with highlighjs v0.8
                //See https://github.com/chjj/marked/issues/336
                that._renderer.code = function(code, lang, escaped, options) {
                    options = options || {};

                    if (options.highlight) {
                        var out = options.highlight(code, lang);
                        if (out !== null && out !== code) {
                            escaped = true;
                            code = out;
                        }
                    }

                    if (lang && hljs.getLanguage(lang)) {
                        return '<pre><code class="hljs ' +
                            (options.langPrefix || '') +
                            lang +
                            '">' +
                            (escaped ? code : escape(code)) +
                            '\n</code></pre>\n';
                    }


                    return '<pre><code class="hljs">' +
                        (escaped ? code : escape(code, true)) +
                        '\n</code></pre>';


                };
                //best options
                global.marked.setOptions({
                    gfm: true,
                    tables: true,
                    breaks: true,
                    pedantic: false,
                    sanitize: false,
                    smartLists: true,
                    smartypants: true,
                    highlight: function (code, lang) {
                        //lang = 'blabla';
                        try {
                            return hljs.highlight(lang, code).value;
                        } catch(err) {
                            return hljs.highlightAuto(code).value;
                        }
                    }
                });
            }
        },

        /**
         * Widget options
         * @property options
         */
        options: {
            name: 'MarkDown',
            value: NULL,
            url: NULL
        },

        /**
         * Widgets events
         * @property events
         */
        events: [
            /**
             * Changing the html display by changing the markdown raises the change event
             * if using a viewModel, wire to the change event of the kendo.observable
             * @event change
             */
            CHANGE
        ],

        /**
         * Url of external markdown to be displayed
         * @method url
         * @param value
         * @returns {null}
         */
        url: function (value) {
            var that = this;
            if (value) {
                if($.type(value) !== STRING) {
                    throw new TypeError();
                }
                if(that.options.url !== value) {
                    that.options.url = value;
                    $.get(that.options.url, function(data) {
                        that.value(data); //that.value does the UI refresh
                    });
                }
            }
            else {
                return that.options.url;
            }
        },

        /**
         * Markdown to be displayed
         * @method value
         * @param value
         * @returns {null}
         */
        value: function (value) {
            var that = this;
            if (value) {
                if($.type(value) !== STRING) {
                    throw new TypeError();
                }
                if(that.options.value !== value) {
                    that.options.value = value;
                    that.refresh();
                    that.trigger(CHANGE);
                    // trigger the DOM change event so any subscriber gets notified
                    that.element.trigger(CHANGE);
                }
            }
            else {
                return that.options.value || EMPTY_STRING;
            }
        },

        /**
         * metadata
         * @method metadata
         * @returns {*}
         */
        metadata: function () {
            var that = this,
                el = that.element;
            return el.data(METADATA) || {};
        },

        /**
         * Html displayed
         * @method html
         * @returns {*}
         */
        html: function () {
            var that = this,
                el = that.element,
                buf = that.value().trim().replace(/\r\n/gm, LF).replace(/\r/gm, LF),
                markdown = EMPTY_STRING;
            if ($.type(buf) === STRING) {
                markdown = buf;
                var posLFLF = buf.indexOf(LF + LF);
                //key value pairs need to be separated from markdown by two line feeds
                if(posLFLF>0) {
                    var hasMetaData = false,
                        rawMetaData = buf.substr(0, posLFLF).trim(),
                        lines = rawMetaData.split(LF).length,
                        //key value pairs are in the form key: value\n
                        regex = /^(?:\s*)(\w+)(?:\s*)\:(?:\s*)([^\r\n]+)(?:\s*)$/gm,//TODO: improve
                        matches = [];
                    if(regex.test(rawMetaData)) {
                        matches = rawMetaData.match(regex);
                        hasMetaData = (matches.length === lines);
                    }
                    if(hasMetaData) {
                        markdown = buf.substr(posLFLF + 2).trim();
                        var metaData = {};
                        $.each(matches, function(index, match) {
                            try {
                                var posCOL = match.indexOf(COLON);
                                metaData[match.substr(0,posCOL).trim()] = match.substr(posCOL+1).trim();
                            } catch (err) {}
                        });
                        el.data(METADATA, metaData);
                    }
                }
            }
            //Note: we need this renderer to add hljs style to pre code
            return global.marked(markdown, { renderer: that._renderer });
        },

        /**
         * Reads the markdown text in an inline script
         * @method _inline
         * @private
         */
        _inline: function() {
            var that = this,
                el = that.element,
                inline = el.find(SCRIPT_SELECTOR);
            if (inline.length > 0) {
                that.options.value = inline.first().html();
            }
        },

        /**
         * Refreshes the display
         * @method refresh
         */
        refresh: function() {
            var that = this,
                el = that.element,
                inline = el.find(SCRIPT_SELECTOR),
                script = '';
            if(inline.length > 0) {
                script = $(SCRIPT_TAG).html(inline.html()).wrapAll(WRAP_TAG).parent().html();
            }
            el.html(script + that.html());
        },

        /**
         * Destroys the widget
         * @method destroy
         */
        destroy: function() {
            var that = this,
                el = that.element;
            el.removeClass(CLASS);
            el.removeData();
            el.off();
            //TODO: keep script if any and remove content
            Widget.fn.destroy.call(that);
            //that._userEvents.destroy();
        }
    });

    ui.plugin(MarkDown);

})(jQuery);
;
//Copyright ©2012-2014 Memba® Sarl. All rights reserved.
/*jslint browser:true, jquery:true*/
/*jshint browser:true, jquery:true*/

(function($, undefined) {

    "use strict";

    // shorten references to variables for uglification
    var fn = Function,
        global = fn('return this')(),
        //$ = global.jQuery,
        /**
         * @module kendo
         * @requires jQuery, kendo
         */
        kendo = global.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        STRING = 'string',
        NUMBER = 'number',
        BOOLEAN = 'boolean',
        DATE = 'date',
        UNDEFINED = 'undefined',
        //Html
        SPAN = 'span',
        SPAN_ELEMENT = '<span/>',
        INPUT = 'input',
        INPUT_ELEMENT = '<input/>',
        INPUT_TYPES = 'color,date,datetime,datetime-local,email,month,number,range,search,tel,text,time,url,week',
        //We have left: button, checkbox, file, hidden, image, password, radio, reset, submit
        //SEE:http://www.w3schools.com/tags/att_input_type.asp
        INPUT_WIDGETS='colorpicker,datepicker,datetimepicker,numerictextbox,rating,slider,timepicker',
        TEXTAREA = 'textarea',
        TEXTAREA_ELEMENT = '<textarea/>',
        TBODY = 'tbody',
        //TBODY_ELEMENT = '<tbody/>',
        TYPE = 'type',
        //DATA_ID = 'data-id',
        DATA_ROLE = 'data-role',
        DATA_BIND = 'data-bind',
        DATA_BIND_VALUE = 'value: ';
        //DATA_SELECTED = 'data-selected';


    /**
     * PropertyGrid widget
     * @class PropertyGrid
     * @extend Widget
     */
    var PropertyGrid = Widget.extend({

        /**
         * Initializes the widget
         * @method init
         * @param element
         * @param options
         */
        init: function(element, options) {
            var that = this;
            // base call to widget initialization
            Widget.fn.init.call(this, element, options);
            that._layout();
        },

        /**
         * Widget options
         * @property options
         */
        options: {
            name: 'PropertyGrid',
            properties: null,
            schema: null,
            rows: null
        },

        /**
         * The row template
         * @property _rowTemplate
         * @private
         */
        _rowTemplate: '<tr role="row"><td role="gridcell">#: title #</td><td role="gridcell">#= editor #</td></tr>',

        /**
         * The alternate row template
         * @property _altRowTemplate
         * @private
         */
        _altRowTemplate: '<tr class="k-alt" role="row"><td role="gridcell">#: title #</td><td role="gridcell">#= editor #</td></tr>',

        /**
         * Builds the widget layout
         * @method _layout
         * @private
         */
        _layout: function () {
            var that = this;
            $(that.element)
                .addClass('k-grid k-widget')
            /*Add header
            The following is copied from the markup generated by a kendoGrid
            <div class="k-grid-header" style="padding-right: 17px;">
                <div class="k-grid-header-wrap">
                    <table role="grid">
                        <colgroup><col><col></colgroup>
                        <thead><tr>
                            <th role="columnheader" data-field="Property" class="k-header">Property</th>
                            <th role="columnheader" data-field="Value" class="k-header">Value</th>
                        </tr></thead>
                    </table>
                </div>
            </div>
            We are using this markup below after removing data-* attributes
            role attributes are used by WAI-ARIA capable screen readers to deduct content from the page
            */
                .append(
                    '<div class="k-grid-header" style="padding-right: 17px;">' +
                        '<div class="k-grid-header-wrap">' +
                            '<table role="grid">' +
                                '<colgroup><col><col></colgroup>' +
                                '<thead><tr>' +
                                    '<th role="columnheader" class="k-header">Property</th>' +  //TODO: Localize
                                    '<th role="columnheader" class="k-header">Value</th>' +  //TODO: Localize
                                '</tr></thead>' +
                            '</table>' +
                        '</div>' +
                    '</div>'
                )
            /*Add content - See refresh
            The following is copied from the markup generated by a kendoGrid
            <div class="k-grid-content">
                <table role="grid">
                    <colgroup><col><col></colgroup>
                    <tbody>
                        <tr data-uid="71c6856c-77dc-47a6-82b7-2c955c0c9794" role="row"><td role="gridcell">Title</td><td role="gridcell">Some Interesting Title</td></tr>
                        <tr class="k-alt" data-uid="a4cf188a-f5b6-40e1-b66c-296b7a7414ba" role="row"><td role="gridcell">Author</td><td role="gridcell">Me</td></tr>
                        <tr data-uid="36fb3065-da2b-4a30-b791-9c89907fe23f" role="row"><td role="gridcell">Version</td><td role="gridcell">1</td></tr>
                        <tr class="k-alt" data-uid="4945eeab-3074-4f97-8f25-fd9573453060" role="row"><td role="gridcell">Creation Date</td><td role="gridcell">14 Feb 2012</td></tr>
                        <tr data-uid="3d11ec9b-988f-428a-85d3-d39d0a61cf30" role="row"><td role="gridcell">Modification Date</td><td role="gridcell">14 Feb 2012</td></tr>
                        <tr class="k-alt" data-uid="4c175649-632d-44f3-8a05-36c0c81a590f" role="row"><td role="gridcell">Description</td><td role="gridcell">Some Essential Description</td></tr>
                        <tr data-uid="d9e7c873-4473-4b90-8b8a-cc0b7f92c2b4" role="row"><td role="gridcell">User Instructions</td><td role="gridcell">Some Key User Guidance</td></tr>
                        <tr class="k-alt" data-uid="0ae0cf0e-c597-4189-95b8-fb582f28c8ec" role="row"><td role="gridcell">Rating</td><td role="gridcell">Triple A</td></tr>
                        <tr data-uid="d71aba8e-f80e-4a92-afaf-1b9b61e5c524" role="row"><td role="gridcell">Views</td><td role="gridcell">1,000,000</td></tr>
                    </tbody>
                </table>
            </div>
             We are using this markup below after removing data-* attributes
             role attributes are used by WAI-ARIA capable screen readers to deduct content from the page
            */
                .append(
                    '<div class="k-grid-content">' +
                        '<table role="grid">' +
                            '<colgroup><col><col></colgroup>' +
                            '<tbody>' +
                            //This is where lines are added
                            '</tbody>' +
                        '</table>' +
                    '</div>'
                );

            //We need an observable object to display in the property grid
            if (that.options.properties instanceof kendo.data.ObservableObject) {
                //Ideally we need a schema to tell the property grid about types, default values, editable properties and validation
                if ($.isPlainObject(that.options.schema) && (that.options.schema.model)) {
                    if (that.options.properties instanceof that.options.schema.model) {
                        if($.isArray(that.options.rows) && that.options.rows.length > 0) { //If we also have row metadata
                            that._layoutWithSchemaAndRows();
                        } else { //without rows
                            that._layoutWithSchemaOnly();
                        }
                    }
                }
                else { //No schema
                    if($.isArray(that.options.rows) && that.options.rows.length > 0) { //If we have row metadata
                        that._layoutWithRowsOnly();
                    } else { //without rows
                        that._layoutFromValues();
                    }
                }
                kendo.bind($(that.element), that.options.properties);
            }
        },

        /**
         * Builds the widget when the object displayed in the property grid is supplied with schema and row metadata
         * @method _layoutWithSchemaAndRows
         * @private
         */
        _layoutWithSchemaAndRows: function() {
            var that = this,
                tbody = $(that.element).find(TBODY).first(),
                rowTemplate = kendo.template(that._rowTemplate),
                altRowTemplate = kendo.template(that._altRowTemplate),
                count = 0;
            //with rows
            $.each(that.options.rows, function(index, row){
                var template = (count % 2 === 1) ? altRowTemplate : rowTemplate,
                    field = that.options.properties.fields[row.field],
                    value = that.options.properties[row.field],
                    editor;
                if($.type(field.editable) === UNDEFINED || field.editable) { //field.editable is true by default (undefined)
                    //is there a custom editor?
                    if($.isFunction(window[row.editor])) {
                        tbody.append(template({title: row.title, editor: ''}));
                        var container = tbody.find('td[role=gridcell]').last(),
                            options = {
                                field: row.field,
                                editor: row.editor,
                                model: that.options.properties
                            };
                        window[row.editor](container, options);
                    //is there a named editor?
                    } else if ($.type(row.editor) === STRING) {
                        //if there is a kendo widget wrapping an input control, use it
                        if ((INPUT_WIDGETS.indexOf(row.editor.toLowerCase()) > -1) && kendo.rolesFromNamespaces(kendo.ui).hasOwnProperty(row.editor.toLowerCase())) {
                            tbody.append(template({title: row.title, editor: INPUT_ELEMENT}));
                            editor = tbody.find(INPUT).last();
                            editor
                                .attr(DATA_ROLE, row.editor)
                                .attr(DATA_BIND, DATA_BIND_VALUE + row.field);
                        } else if (INPUT_TYPES.indexOf(row.editor.toLowerCase()) > -1) {
                            tbody.append(template({title: row.title, editor: INPUT_ELEMENT}));
                            editor = tbody.find(INPUT).last();
                            editor
                                .attr(TYPE, row.editor.toLowerCase())
                                .attr(DATA_BIND, DATA_BIND_VALUE + row.field)
                                .addClass('k-textbox');
                        } else if (row.editor.toLowerCase() === TEXTAREA) {
                            tbody.append(template({title: row.title, editor: TEXTAREA_ELEMENT}));
                            editor = tbody.find(TEXTAREA).last();
                            editor
                                .attr(DATA_BIND, DATA_BIND_VALUE + row.field)
                                .addClass('k-textbox');
                        }
                    //is there a template?
                    } else if (row.template) {
                        $.noop();
                    } else if (field.type === NUMBER) {
                        tbody.append(template({title: row.title, editor: INPUT_ELEMENT}));
                        editor = tbody.find(INPUT).last();
                        editor.attr(DATA_BIND, DATA_BIND_VALUE + row.field);
                        editor.kendoNumericTextBox();
                        //TODO add formatting
                    } else if (field.type === BOOLEAN) {
                        //TODO
                    } else if (field.type === DATE) {
                        //TODO
                    //default field type is 'string' - See http://docs.kendoui.com/api/framework/model
                    } else {
                        tbody.append(template({title: row.title, editor: INPUT_ELEMENT}));
                        editor = tbody.find(INPUT).last();
                        editor
                            .attr(TYPE, 'text')
                            .attr(DATA_BIND, DATA_BIND_VALUE + row.field)
                            .addClass('k-textbox');
                    }
                } else { //readonly value
                    tbody.append(template({title: row.title, editor: SPAN_ELEMENT}));
                    editor = tbody.find(SPAN).last();
                    editor.attr(DATA_BIND, DATA_BIND_VALUE + row.field);
                    //TODO add formatting, sizing and validation
                }
                count++;
            });
        },

        /**
         * Builds the widget when the object displayed in the property grid is supplied with schema only
         * @method _layoutWithSchemaOnly
         * @private
         */
        _layoutWithSchemaOnly: function() {
            //TODO
            $.noop();
        },

        /**
         * Builds the widget when the object displayed in the property grid is supplied with row metadata only
         * @method _layoutWithRowsOnly
         * @private
         */
        _layoutWithRowsOnly: function() {
            //TODO
            $.noop();
        },

        /**
         * Builds the widget when the object displayed in the property grid is supplied raw
         * Without schema and row metadata, the property grid is built guessing types from values
         * Complex object types, undefined and nulls are hidden (better not displaying than messing with data)
         * Booleans are displayed as checkboxes
         * Numbers are displayed as kendoNumericTextBox
         * Dates are displayed as kendoDatePicker
         * Colors are displayed as kendoColorPicker
         * Urls and emails are displayed with validation rules
         * Other short strings are displayed in textboxes
         * Other long strings are displayed as textareas
         * @method _layoutFromValues
         * @private
         */
        _layoutFromValues: function() {
            //TODO
            $.noop();
        },

        /**
         * Clears the DOM from modifications made by the widget
         * @method _clear
         * @private
         */
        _clear: function() {
            var that = this;
            //TODO: Call destroy on all child widgets
            //unbind descendant events
            $(that.element).find('*').off();
            //clear element
            $(that.element)
                .empty()
                .off()
                .removeClass('k-widget k-grid');
        },


        /**
         * Destroys the widget
         * @method destroy
         */
        destroy: function() {
            var that = this;
            that._clear();
            Widget.fn.destroy.call(this);
        }

    });

    ui.plugin(PropertyGrid);

})(jQuery);
;
//Copyright ©2012-2013 Memba® Sarl. All rights reserved.
/*jslint browser:true, jquery:true*/
/*jshint browser:true, jquery:true*/

(function ($, undefined) {

    "use strict";

    // shorten references to variables for uglification
    var fn = Function,
        global = fn('return this')(),
        kendo = global.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        SPAN = 'span',
        NUMBER = 'number',
        //Rating
        RATING_MIN = 0,
        RATING_MAX = 5,
        RATING_STEP = 1,
        PRECISION = 3,
        //Events
        CHANGE = 'change';

    /*******************************************************************************************
     * Rating
     * SEE: http://www.fyneworks.com/jquery/star-rating/
     * SEE ALSO: http://www.enfew.com/5-best-jquery-star-rating-plugins-tutorials/
     *******************************************************************************************/

    /**
     * Rating (kendoRating)
     * @class Rating
     * @extend Widget
     */
    var Rating = Widget.extend({

        /**
         * Initializes the widget
         * @method init
         * @param element
         * @param options
         */
        init: function (element, options) {
            var that = this;
            element = $(element);

            element.type = 'text';
            options = $.extend({}, {
                value: parseFloat(element.attr('value')) || RATING_MIN,
                min: parseFloat(element.attr('min')) || RATING_MIN,
                max: parseFloat(element.attr('max')) || RATING_MAX,
                step: parseFloat(element.attr('step')) || RATING_STEP
            }, options);
            Widget.fn.init.call(that, element, options);
            that._layout();
            //Bind a handler for the change event to update stars when value is changed
            that.bind(CHANGE, $.proxy(that.refresh, that));
        },

        /**
         * Widget events
         * @property events
         */
        events: [
        /**
         * Changing the rating value by clicking a star raises the change event
         * @event change
         */
            CHANGE
        ],

        /**
         * Widget options
         * @property options
         */
        options: {
            name: "Rating",
            value: RATING_MIN,
            min: RATING_MIN,
            max: RATING_MAX,
            step: RATING_STEP
        },

        /**
         * Gets a sets the rating value
         * @method value
         * @param value
         * @return {*}
         */
        value: function (value) {
            var that = this,
                options = that.options;
            value = round(value);
            if (isNaN(value)) {
                return options.value;
            }
            if (value >= options.min && value <= options.max) {
                if (options.value !== value) {
                    that.element.attr('value', formatValue(value));
                    options.value = value;
                    that.trigger(CHANGE, { value: options.value });
                }
            }
        },

        /**
         * Builds the widget layout
         * @method _layout
         * @private
         */
        _wrapper: undefined,
        _layout: function() {
            var that = this,
                options = that.options,
                element = $(that.element);
            that._clear();
            element.wrap('<span class="k-widget k-rating"/>');
            element.hide();
            that._wrapper = element.parent();
            //Calculate the number of stars
            var n = round((options.max - options.min)/options.step);  //number of stars
            //Add stars to the DOM
            for(var i = 1; i <= n; i++) {
                that._wrapper.append('<span class="k-rating-star" data-star="' + (n + 1 - i) + '"></span>');
            }
            //Add click events to stars
            that._wrapper.find('span.k-rating-star').click(function(e){
                var i = parseFloat($(e.currentTarget).attr('data-star')),
                    value = round(options.min + i * options.step);
                that.value(value);
            });
        },

        /**
         * Refreshes the widget
         * @method refresh
         */
        refresh: function(e) {
            var that = this,
                options = that.options;
            if (that._wrapper && $.type(e.value) === NUMBER) {
                var i = round((e.value - options.min)/options.step);
                $.each(that._wrapper.find('span.k-rating-star'), function(index, star) {
                    if(parseFloat($(star).attr('data-star')) <= i) {
                        $(star).addClass('k-rating-selected');
                    } else {
                        $(star).removeClass('k-rating-selected');
                    }
                });
            }
        },


        /**
         * Clears the DOM from modifications made by the widget
         * @method _clear
         * @private
         */
        _clear: function() {
            var that = this,
                element = $(that.element),
                wrapper = element.parent();
            that.unbind(CHANGE);
            //remove wrapper and stars
            if (wrapper.length > 0 && wrapper[0].tagName.toLowerCase() === SPAN && wrapper.hasClass('k-rating')) {
                wrapper.find('span.k-rating-star').off().remove();
                wrapper.off();
                element.unwrap();
                element.show();
            }
        },

        /**
         * Destroys the widget
         * @method destroy
         */
        destroy: function () {
            var that = this;
            that._clear();
            Widget.fn.destroy.call(this);
        }
    });

    ui.plugin(Rating);

    /**
     * rounding numbers for the star rating widget
     * @method round
     * @param value {Number}
     * @return {Number}
     */
    function round(value) {
        value = parseFloat(value, 10);
        var power = Math.pow(10, PRECISION || 0);
        return Math.round(value * power) / power;
    }

    /**
     * Formatting numbers for the star rating widget
     * @method formatValue
     * @param value {Number}
     * @return {String}
     */
    function formatValue(value) {
        return (value + "").replace(".", kendo.cultures.current.numberFormat["."]);
    }

} (jQuery));
;
//Copyright ©2012-2014 Memba® Sarl. All rights reserved.
/*jslint browser:true, jquery:true*/
/*jshint browser:true, jquery:true*/

(function ($, undefined) {

    "use strict";

    // shorten references to variables for uglification
    var fn = Function,
        global = fn('return this')(),
        kendo = global.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,

        //Types
        BOOLEAN = 'boolean',
        STRING = 'string',
        FUNCTION = 'function',

        //Widget
        DISPLAY = 'display',
        NONE = 'none',
        DUMMY = function() { return ''; };

        //DEBUG
        //MODULE = 'memba.template.js: ',
        //DEBUG = false;

    /*******************************************************************************************
     * Template Widget
     *******************************************************************************************/

    /**
     * Template (kendoTemplate)
     * @class Template
     * @extend Widget
     */
    var Template = Widget.extend({

        /**
         * Initializes the widget
         * @method init
         * @param element
         * @param options
         */
        init: function (element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);
            //all widgets need a wrapper otherwise visible and other bindings do not work
            that.wrapper = that.element;
            //template initialized in code returns a string
            //template initialized with a data attribute return a proper kendo.template function
            //TODO: also consider loading external templates designated by a URL
            if ($.type(that.options.template) === STRING) {
                try {
                    //try to find a script tag on the page
                    var script = $('#' + that.options.template);
                    if (script.length > 0) {
                        that.options.template = kendo.template(script.html());
                    } else {
                        that.options.template = kendo.template(that.options.template);
                    }
                } catch(err) {
                    that.options.template = DUMMY;
                }
            }
            that._layout();
        },

        /**
         * Widget options
         * @property options
         */
        options: {
            name: "Template",
            template: DUMMY,
            value: {},
            active: true
        },

        /**
         * Data to be merged with the template
         * @method value
         * @param value
         * @return {*}
         */
        value: function (value) {
            var that = this;
            if (value !== undefined) {
                if(that.options.value !== value) {
                    that.options.value = value;
                    that.refresh();
                }
            }
            else {
                return that.options.value;
            }
        },

        /**
         * Activates/deactivates the template
         * @method active
         * @param value
         * @return {*}
         */
        active: function (value) {
            var that = this;
            if (value !== undefined) {
                if ($.type(value) !== BOOLEAN) {
                    throw new TypeError();
                }
                if(that.options.active !== value) {
                    that.options.active = value;
                    that.refresh();
                }
            }
            else {
                return that.options.active;
            }
        },

        /**
         * Builds the widget layout
         * @method _layout
         * @private
         */
        _layout: function () {
            //CONSIDER check whether values have actually changed before executing and optimize in the case only text has changed
            //Styling inspired from http://www.jankoatwarpspeed.com/post/2008/05/22/CSS-Message-Boxes-for-different-message-types.aspx
            var that = this;
            that._clear();
            //$(that.element).addClass('k-widget k-template');
            $(that.element).addClass('k-template');
            that.refresh();
        },

        /**
         * Refreshes the widget
         * @method refresh
         */
        refresh: function() {
            var that = this;
            if (that.active()) {
                var html = that.options.template(that.value());
                $(that.element).html(html);
            } else {
                $(that.element).find('*').off();
                $(that.element).empty();
            }
        },

        /**
         * Clears the DOM from modifications made by the widget
         * @method _clear
         * @private
         */
        _clear: function() {
            var that = this;
            //unbind descendant events
            $(that.element).find('*').off();
            //clear element
            $(that.element)
                .empty()
                .off()
                //.removeClass('k-widget k-template');
                .removeClass('k-template');
        },

        /**
         * Destroys the widget
         * @method destroy
         */
        destroy: function () {
            var that = this;
            that._clear();
            Widget.fn.destroy.call(this);
        }

    });

    ui.plugin(Template);

} (jQuery));
;
//Copyright ©2012-2014 Memba® Sarl. All rights reserved.
/*jslint browser:true, jquery:true*/
/*jshint browser:true, jquery:true*/

(function ($, undefined) {

    "use strict";

    // shorten references to variables for uglification
    var fn = Function,
        global = fn('return this')(),
        kendo = global.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        STRING = 'string',
        FUNCTION = 'function',

        //Widget
        DIV = '<div id="{0}"></div>',
        GOOGLE = 'google',
        BING = 'bing',

        //Events
        //CHANGE = 'change',
        RENDER = 'render.websearch';

    /*******************************************************************************************
     * Web Search
     *******************************************************************************************/

    /**
     * Web Search (kendoWebSearch)
     * @class WebSearch
     * @extend Widget
     */
    var WebSearch = Widget.extend({

        /**
         * Initializes the widget
         * @method init
         * @param element
         * @param options
         */
        init: function (element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);
            that._layout();
        },

        /**
         * Widget options
         * @property options
         */
        options: {
            name: 'WebSearch',
            engine: GOOGLE,
            key: '000888210889775888983:tmhkkjoq81m',
            value: 'test'
        },

        /**
         * The query to search for
         * @method type
         * @param value
         * @return {*}
         */
        value: function (value) {
            var that = this;
            if (value) {
                if($.type(value) !== STRING) {
                    throw new TypeError();
                }
                if(that.options.value !== value) {
                    that.options.value = value;
                    that.refresh();
                }
            }
            else {
                return that.options.value;
            }
        },

        _containerId: undefined,
        /**
         * The id of the DOM element containing search results
         * @returns {string}
         */
        containerId: function() {
            var that = this;
            if (!that._containerId) {
                var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
                that._containerId = ($(that.element).attr('id') || that.options.engine.toLowerCase() + '-websearch-results') + '-';
                for (var i=0; i<4; i++) { //add some randomness to allow several components on a page
                    that._containerId += chars[Math.floor(chars.length*Math.random())];
                }
            }
            return that._containerId;
        },

        /**
         * Builds the widget layout ann loads the script if not already loaded
         * @method _layout
         * @private
         */
        _layout: function () {
            var that = this;
            that._clear();
            //that.bind(RENDER, $.proxy(that._render, that));
            // We want all our widgets on the page be notified of the render event
            // when the search engine script is loaded (when the callback is executed)
            // Be aware, however, that jQuery's event binding subsystem assigns a unique id to each event handling function
            // in order to track it when it is used to specify the function to be unbound. The function represented by jQuery.proxy() is seen
            // as a single function by the event subsystem, even when it is used to bind different contexts.
            // To avoid unbinding the wrong handler, use a unique event namespace for binding and unbinding
            // (e.g., "click.myproxy1") rather than specifying the proxied function during unbinding.
            // See http://api.jquery.com/jquery.proxy/
            $(document).on(RENDER + '.' + that.containerId(), $.proxy(that._render, that));
            if (that.options.engine.toLowerCase() === GOOGLE) {
                //See https://developers.google.com/custom-search/docs/element
                //See https://developers.google.com/custom-search/docs/tutorial/implementingsearchbox
                $(that.element).addClass('k-widget k-websearch');
                //$(that.element).html('<gcse:searchresults-only></gcse:searchresults-only>');
                $(that.element).html(kendo.format(DIV, that.containerId()));
                if(!global.__gcse) { //First websearch widget on page loads Google script
                    global.__gcse = {
                        parsetags: 'explicit',
                        callback: function() {
                            //that.trigger(RENDER, {sender: that});
                            //We trigger the RENDER event on the document to notify all widgets on the same page
                            //that the one and only Google script shared between instances of the widget is loaded
                            $(document).trigger(RENDER);
                        }
                    };
                    //this is only loaded once
                    //We do not use $.getScript which adds a dummy parameter to query string to avoid caching the script
                    //See: https://api.jquery.com/jQuery.getScript/
                    $.ajax({
                        dataType: 'script',
                        cache: true,
                        url: (document.location.protocol === 'https:' ? 'https:' : 'http:') + '//www.google.com/cse/cse.js?cx=' + that.options.key
                    });
                }
            } //else if (that.options.engine.toLowerCase() === BING)
        },

        /**
         * Renders the widgets after the script is loaded
         * @private
         */
        _render: function() {
            var that = this;
            if (that.options.engine.toLowerCase() === GOOGLE && global.google) {
                global.google.search.cse.element.render(
                    {
                        div: that.containerId(),
                        tag: 'searchresults-only',
                        gname: that.containerId(),
                        attributes: { }
                    });
                that.refresh();
                //we need a refresh here because when the widget loads,
                //the refresh method might be explicitly called by the programmer
                //and execute before the callback when global.google is not yet available
            } //else if (that.options.engine.toLowerCase() === BING)
        },

        /**
         * Refreshes the widget anytime required
         * @method refresh
         */
        refresh: function() {
            var that = this;
            //kendo.logToConsole('refresh called on ' + that.containerId() + ' when ' + (global.google ? 'Google available' : 'Google not available' ));
            if (that.options.engine.toLowerCase() === GOOGLE && global.google) {
                var element = global.google.search.cse.element.getElement(that.containerId());
                element.execute(that.value());
            } //else if (that.options.engine.toLowerCase() === BING)
        },

        /**
         * Clears the DOM from modifications made by the widget
         * @method _clear
         * @private
         */
        _clear: function() {
            var that = this;
            //See the comment regarding $(document).on in the _layout method
            //we need an event namesapce to unbind the event only for the current widget
            $(document).off(RENDER + '.' + that.containerId());
            //unbind descendant events
            $(that.element).find('*').off();
            //clear element
            $(that.element)
                .empty()
                .off()
                .removeClass('k-widget k-websearch');
        },

        /**
         * Destroys the widget including bounds to the data source
         * @method destroy
         */
        destroy: function () {
            var that = this;
            that._clear();
            Widget.fn.destroy.call(this);
        }

    });

    ui.plugin(WebSearch);

} (jQuery));
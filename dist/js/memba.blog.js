//Copyright ©2013-2014 Memba® Sarl. All rights reserved.
/*jslint browser:true*/
/*jshint browser:true*/

(function ($, undefined) {

    "use strict";

    var fn = Function,
        global = fn('return this')(),
        app = global.app = global.app || {};

    /**
     * IMPORTANT: Nothing in this file should be language specific (localized)
     */

    /**
     * Constants
     * @type {*}
     */
    app.constants = $.extend(app.constants || {}, {
        URN: 'urn:',
        COLON: ':',
        DEFAULT_GUID: '00000000-0000-0000-0000-000000000000',
        MARKDOWN_EXT: '.md',
        PATH_SEP: '/',
        PAGE_SIZE: 'pageSize',
        DEFAULT_PAGE_SIZE: 5,
        DATE_FORMAT: 'dd MMM yyyy'
    });

    /**
     * Types
     * @type {*}
     */
    app.types = $.extend(app.types || {}, {
        BOOLEAN: 'boolean',
        DATE: 'date',
        FUNCTION: 'function',
        NUMBER: 'number',
        OBJECT: 'object',
        STRING: 'string',
        UNDEFINED: 'undefined'
    });

    /**
     * HREFs
     * @type {*}
     */
    app.hrefs = $.extend(app.hrefs || {}, {
        ARCHIVE: './archive/',
        RSS: 'index.rss',
        INDEX: './index.html',
        HEADER: './header.tmpl.html',
        FOOTER: './footer.tmpl.html'
    });

    /**
     * Routes
     * @type {*}
     */
    app.routes = $.extend(app.routes || {}, {
        HASH: '#',
        HOME: '/',
        CATEGORY: '/category/:category',
        CATEGORY_PARAMETER: ':category',
        ARCHIVE: '/archive/:period',
        PERIOD_PARAMETER: ':period',
        DETAIL: '/blog/:period/:slug',
        SLUG_PARAMETER: ':slug',
        GUID: '/guid/:guid',
        GUID_PARAMETER: ':guid',
        SEARCH: '/search',
        FAQS: '/faqs'
    });

    /**
     * Events
     * @type {*}
     */
    app.events = $.extend(app.events || {}, {
        CHANGE: 'change',
        CLICK: 'click',
        DBLCLICK: 'dblclick',
        DRAGSTART: 'dragstart',
        DRAGENTER: 'dragenter',
        DRAGOVER: 'dragover',
        DROP: 'drop',
        INITIALIZE: 'initialize',
        KEYUP: 'keyup'
    });

    /**
     * Html tags and attributes
     * @type {*}
     */
    app.tags = $.extend(app.tags || {}, {
        BODY: 'body',
        DATA_COLUMNS: 'data-columns',
        DIV: 'div',
        DIV_ELEMENT: '<div/>',
        ID: 'id',
        INPUT: 'input',
        INPUT_ELEMENT: '<input/>',
        PLACEHOLDER: 'placeholder',
        SPAN: 'span',
        SPAN_ELEMENT: '<span/>',
        TEXTAREA: 'textarea',
        TEXTAREA_ELEMENT: '<textarea/>'
        //TBODY: 'tbody',
        //TBODY_ELEMENT: '<tbody/>',
        //DISABLED: 'disabled',
        //DRAGGABLE: 'draggable',
        //TYPE: 'type',
        //URL: 'url',
        //COLOR: 'color',
        //DATA_ID: 'data-id',
        //DATA_BIND: 'data-bind',
        //DATA_BIND_VALUE: 'value: ',
        //DATA_SELECTED: 'data-selected',
    });

    /**
     * HTML Elements
     * @type {*}
     */
    app.elements = $.extend(app.elements || {}, {

        /**
         * Strip the element id from the # prefix
         * @param id
         * @returns {*}
         */
        strip: function(id) {
            if ((typeof id === app.types.STRING) && (id.charAt(0) === '#')) {
                return id.substr(1);
            } else {
                return id;
            }
        },

        //Application layout
        APPLICATION_ROOT: '#application',
        APPLICATION_LAYOUT: '#application-layout',
        APPLICATION_HEADER: '#application-header',
        APPLICATION_CONTAINER: '#application-container',
        APPLICATION_FOOTER: '#application-footer',
        CONTENT_SECTION: '#content',

        //Header
        HEADER_VIEW: '#header-view',
        HEADER_VIEW_NAVBAR_BRAND: '#header-view-navbar-brand',
        HEADER_VIEW_SEARCH_INPUT: '#header-view-navbar-search-input',
        HEADER_VIEW_SEARCH_BUTTON: '#header-view-navbar-search-button',

        //Header - Navigation Bar
        HEADER_VIEW_NAVBAR_TOGGLE: '#header-view-navbar-toggle',
        HEADER_VIEW_NAVBAR_SEARCH_INPUT: '#header-view-navbar-search-input',
        HEADER_VIEW_NAVBAR_SEARCH_BUTTON: '#header-view-navbar-search-button',
        HEADER_VIEW_NAVBAR_MENU: '#header-view-navbar-menu',

        //Footer
        FOOTER_VIEW: '#footer-view',
        FOOTER_VIEW_COPYRIGHT: '#footer-view-copyright',

        //Side sections
        ALL_POSTS_SECTION: '#all-posts',
        ALL_POSTS_SECTION_TITLE: '#all-posts-title > a',
        CATEGORIES_SECTION: '#categories',
        CATEGORIES_SECTION_TITLE: '#categories-title',
        CATEGORIES_VIEW: '#categories-view',
        ARCHIVE_SECTION: '#archive',
        ARCHIVE_SECTION_TITLE: '#archive-title',
        ARCHIVE_VIEW: '#archive-view',
        RSS_SECTION: '#rss',
        RSS_SECTION_TITLE: '#rss-title > a',

        //List View
        LIST_VIEW: '#list-view',
        INDEX_LIST_TEMPLATE: '#index-list-template',
        ARTICLE_READMORE: 'div.readmore > div.pull-right > a',
        INDEX_PAGER: '#index-pager',
        INDEX_PAGER_SIZES: 'span.k-pager-sizes select',

        //Detail View
        DETAIL_VIEW: '#detail-view',

        //Search View
        SEARCH_VIEW: '#search-view',

        //FAQs View
        FAQS_VIEW: '#faqs-view',

        DUMMY: 'dummy'
    });

}(jQuery));
;
//Copyright ©2013-2014 Memba® Sarl. All rights reserved.
/*jslint browser:true*/
/*jshint browser:true*/

(function ($, undefined) {

    "use strict";

    var fn = Function,
        global = fn('return this')(),
        kendo = global.kendo,
        app = global.app,
        constants = app.constants,
        elements = app.elements,
        events = app.events,
        hrefs = app.hrefs,
        routes = app.routes,
        tags = app.tags,
        types = app.types,
        //TITLE = 'title',
        DEBUG = true,
        MODULE = 'app.controller.js: ';

    var storage = {
        set: function(key, value) {
            if (Modernizr.localstorage) {
                global.localStorage[key] = value;
            }
        },
        get: function(key) {
            if (Modernizr.localstorage) {
                return global.localStorage[key];
            }
            return undefined;
        }
    }

    /**
     * Once document is ready and external (shared) templates are loaded
     * jQuery and kendo can safely be used against the DOM
     */
    $(document).bind(events.INITIALIZE, function(e /*, params*/) {

        //Localize
        app.localize(app.resources);

        // Views and layouts
        var applicationLayout = new kendo.Layout(elements.APPLICATION_LAYOUT),
            headerView = new kendo.View(elements.HEADER_VIEW, { model: app.searchViewModel }),
            footerView = new kendo.View(elements.FOOTER_VIEW),
            categoriesView = new kendo.View(elements.CATEGORIES_VIEW, { model: app.categoriesViewModel }),
            archiveView = new kendo.View(elements.ARCHIVE_VIEW, { model: app.archiveViewModel }),
            listView = new kendo.View(elements.LIST_VIEW, { model: app.listViewModel }),
            detailView = new kendo.View(elements.DETAIL_VIEW, { model: app.detailViewModel }),
            searchView = new kendo.View(elements.SEARCH_VIEW, { model: app.searchViewModel }),

        //Initialize router
            router = new kendo.Router({
                init: function () {
                    applicationLayout.render(elements.APPLICATION_ROOT);
                    applicationLayout.showIn(elements.APPLICATION_HEADER, headerView);
                    applicationLayout.showIn(elements.APPLICATION_FOOTER, footerView);
                    applicationLayout.showIn(elements.CATEGORIES_SECTION, categoriesView);
                    applicationLayout.showIn(elements.ARCHIVE_SECTION, archiveView);
                },
                change: function (e) {
                    if (DEBUG && global.console) {
                        global.console.log(MODULE + 'Open view ' + e.url);
                    }
                },
                routeMissing: function(e) {
                    if (DEBUG && global.console) {
                        global.console.log(MODULE + 'Route missing at ' + e.url);
                    }
                }
            });

        //Add routes
        //TODO: error 404 route missing????
        router.route(routes.HOME, function () {
            var listDataSource = app.listViewModel.get('list');
            listDataSource.filter(null);
            listDataSource.pageSize(storage.get(constants.PAGE_SIZE) || constants.DEFAULT_PAGE_SIZE);
            applicationLayout.showIn(elements.CONTENT_SECTION, listView);
        });
        router.route(routes.CATEGORY, function (category) {
            var listDataSource = app.listViewModel.get('list');
            listDataSource.filter( { field: 'category', operator: 'eq', value: category });
            listDataSource.pageSize(storage.get(constants.PAGE_SIZE) || constants.DEFAULT_PAGE_SIZE);
            applicationLayout.showIn(elements.CONTENT_SECTION, listView);
        });
        router.route(routes.ARCHIVE, function (period) {
            var listDataSource = app.listViewModel.get('list');
            if (period.length < 6) {
                listDataSource.filter({ field: 'period', operator: 'startswith', value: period });
            } else {
                listDataSource.filter({ field: 'period', operator: 'eq', value: period });
            }
            listDataSource.pageSize(storage.get(constants.PAGE_SIZE) || constants.DEFAULT_PAGE_SIZE);
            applicationLayout.showIn(elements.CONTENT_SECTION, listView);
        });
        router.route(routes.DETAIL, function (period, slug) {
            var listDataSource = app.listViewModel.get('list');
            var found = jQuery.grep(listDataSource.data(), function(item) {
                return item.link.indexOf(period + constants.PATH_SEP + slug) > 0;
            });
            if (found.length > 0) {
                app.detailViewModel.set('contentUrl', hrefs.ARCHIVE + period + constants.PATH_SEP + slug + constants.MARKDOWN_EXT);
                app.detailViewModel.set('title', found[0].title);
                app.detailViewModel.set('author', found[0].author);
                app.detailViewModel.set('pubDate', kendo.toString(found[0].pubDate, constants.DATE_FORMAT));
                applicationLayout.showIn(elements.CONTENT_SECTION, detailView);
            } else {
                //TODO
            }
        });
        router.route(routes.GUID, function (guid) {
            var listDataSource = app.listViewModel.get('list');
            var found = listDataSource.get(guid);
            if (found) {
                var rx = new RegExp(routes.HASH + routes.DETAIL.replace(routes.PERIOD_PARAMETER, '([^/]+)').replace(routes.SLUG_PARAMETER, '([^/]+)') + '$');
                var matches = rx.exec(found.link);
                app.detailViewModel.set('url', hrefs.ARCHIVE + matches[1] + constants.PATH_SEP + matches[2] + constants.MARKDOWN_EXT);
                app.detailViewModel.set('title', found.title);
                app.detailViewModel.set('author', found.author);
                app.detailViewModel.set('pubDate', kendo.toString(found.pubDate, constants.DATE_FORMAT));
                applicationLayout.showIn(elements.CONTENT_SECTION, detailView);
            } else {
                //TODO
            }
        });
        router.route(routes.SEARCH, function(params) {
            applicationLayout.showIn(elements.CONTENT_SECTION, searchView);

        });
        //Start router
        router.start();

        /**
         * Bind events
         */
        //Header
        $(elements.HEADER_VIEW_SEARCH_INPUT).bind(events.KEYUP, function(e) {
            if ($(e.target).val().trim().length > 0) {
                $(elements.HEADER_VIEW_SEARCH_BUTTON).removeClass('disabled');
            } else {
                $(elements.HEADER_VIEW_SEARCH_BUTTON).addClass('disabled');
            }
        });

        $(elements.HEADER_VIEW_SEARCH_BUTTON).bind(events.CLICK, function(e){
            router.navigate(routes.SEARCH);
            //window.location.assign(routes.HASH + routes.SEARCH + '?q=' + encodeURIComponent(app.searchViewModel.get('search')));
        });


        searchView.bind('show', function(e) {
            $.noop();
        });

        //Footer
        $(elements.INDEX_PAGER).find(elements.INDEX_PAGER_SIZES).bind(events.CHANGE, function(e) {
            storage.set(constants.PAGE_SIZE, kendo.parseInt(e.target.value));
        });

    });

    /**
     * once document is ready, load external templates (header and footer)
     * and trigger events.INITIALIZE when templates are loaded
     */
    $(document).ready(function () {

        $.when($.ajax(hrefs.HEADER), $.ajax(hrefs.FOOTER)).then(
            function(a1, a2) { //success callback
                //See: http://api.jquery.com/jQuery.when/
                //a1 and a2 are arrays where
                //aN[0] = data = response/template content
                //aN[1] = textStatus = 'success'
                //aN[2] = jqXHR
                //See: http://docs.kendoui.com/howto/load-templates-external-files
                $(tags.BODY).append(a1[0]);
                $(tags.BODY).append(a2[0]);
                $(document).trigger(events.INITIALIZE); //, [params]);
            },
            function(jqXHR, textStatus, errorThrown) { //error callback
                if (DEBUG && global.console && $.type(global.console.error) === types.FUNCTION) {
                   global.console.error(MODULE + hrefs.HEADER + ' or ' + hrefs.FOOTER + ' ' + errorThrown);
                }
            }
        );
    });

}(jQuery));

;
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
        KENDO_VERSION = '2013.3.1119',

        DEBUG = true,
        MODULE = 'app.init.js: ';


    if (DEBUG && global.console) {
        global.console.log(MODULE + global.navigator.userAgent);
        global.console.log(MODULE + global.location.href);
    }

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
                'http://cdnjs.cloudflare.com/ajax/libs/marked/0.2.9/marked.min.js', //markdown
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
                    Modernizr.load('./js/vendor/marked.js');
                }
            }
        },
        //Application libraries
        {
            load: [
                './styles/app.css',
                './js/app.constants.js',
                './js/cultures/app.culture.en.js', //default culture
                //TODO: http://stackoverflow.com/questions/1043339/javascript-for-detecting-browser-language-preference
                //Basically, this is not something you can get in Javascript; you need to read HTTP_USER_AGENT on the server
                './js/cultures/app.culture.' + (global.navigator.userLanguage || global.navigator.language).substring(0, 2) + '.js', //replace default culture
                './js/cultures/app.culture.fr.js', //TODO DEBUG
                './js/app.localizer.js',
                './js/app.viewmodels.js',
                './js/app.controller.js'
            ],
            callback: function (url) {
                if (DEBUG && global.console) {
                    global.console.log(MODULE + url + ' loading attempt');
                }
            }
        }
    ]);
}());;
//Copyright ©2013-2014 Memba® Sarl. All rights reserved.
/*jslint browser:true*/
/*jshint browser:true*/

(function ($, undefined) {

    "use strict";

    var fn = Function,
        global = fn('return this')(),
        kendo = global.kendo,
        app = global.app,
        elements = app.elements,
        tags = app.tags,
        DEBUG = true,
        MODULE = 'app.localizer.js: ',
        WRAP_OPEN = '<wrap>',
        WRAP_CLOSE = '</wrap>';

    /**
     * Localize the index page
     * @param resources
     */
    app.localize = function (resources) {        //TODO: maybe the localize function should load resources

        if (DEBUG && global.console) {
            global.console.log(MODULE + 'external templates should be loaded before starting localization');
            global.console.log(MODULE + 'starting localization in ' + (global.navigator.userLanguage || global.navigator.language));
        }

        //load kendo culture
        kendo.culture(resources.LOCALE || (global.navigator.userLanguage || global.navigator.language).substr(0, 2));

        /**
         * IMPORTANT: jQuery interprets the content of script tags (kendo templates) as free text and not DOM
         * i.e. jQuery DOM selectors do not work within script tags
         * In order to insert localized values and attributes, we need to:
         * (1) load the html within the script tag into an html variable,
         * (2) modify the html, and
         * (3) update the content of the script tag with the modified html.
         * In some instances, the kendo templates within script tags have no root element, for example
         *     <h1>My Title</h1>
         *     <p>MY Paragraph</p>
         * jQuery DOM selection methods like jQuery.find() won't work if there are several root elements
         * so we also need to wrap the template within a single root to traverse and manipulate it.
         *     <wrap>
         *         <h1>My Title</h1>
         *         <p>MY Paragraph</p>
         *     </wrap>
         * The wrapper is removed at the end before restoring the content of the template into the script tag.
         */

        //Application layout
        if($(elements.APPLICATION_LAYOUT).length === 1) {
            var wrap = $(WRAP_OPEN + $(elements.APPLICATION_LAYOUT).html() + WRAP_CLOSE);
            wrap.find(elements.ALL_POSTS_SECTION_TITLE).html(resources.ALL_POSTS_SECTION_TITLE);
            wrap.find(elements.RSS_SECTION_TITLE).html(resources.RSS_SECTION_TITLE);
            $(elements.APPLICATION_LAYOUT).html(wrap.html());
        }

        //Header - Navigation Bar
        if($(elements.HEADER_VIEW).length === 1) {
            var wrap = $(WRAP_OPEN + $(elements.HEADER_VIEW).html() + WRAP_CLOSE);
            wrap.find(elements.HEADER_VIEW_NAVBAR_BRAND).html(resources.HEADER_VIEW_NAVBAR_BRAND);
            wrap.find(elements.HEADER_VIEW_NAVBAR_TOGGLE).html(resources.HEADER_VIEW_NAVBAR_TOGGLE);
            if (Modernizr.input.placeholder) {
                wrap.find(elements.HEADER_VIEW_NAVBAR_SEARCH_INPUT).attr(tags.PLACEHOLDER, resources.HEADER_VIEW_NAVBAR_SEARCH_INPUT);
            }
            wrap.find(elements.HEADER_VIEW_NAVBAR_SEARCH_BUTTON).html(resources.HEADER_VIEW_NAVBAR_SEARCH_BUTTON);
            var menu = wrap.find(elements.HEADER_VIEW_NAVBAR_MENU);
            $.each(resources.HEADER_VIEW_NAVBAR_MENU, function (index, item) {
                var menuItem = $('<li class="dropdown"></li>');
                menuItem.append('<a href="#" class="dropdown-toggle" data-toggle="dropdown">' + item.text + '<b class="caret"></b></a>');
                var menuDropDown = $('<ul class="dropdown-menu"></ul>');
                $.each(item.items, function (subindex, subitem) {
                    if(subitem.text && subitem.href) {
                        menuDropDown.append('<li><a href="' + subitem.href + '">' + subitem.text + '</a></li>');
                    } else {
                        menuDropDown.append('<li class="divider"></li>');
                    }
                });
                menuItem.append(menuDropDown);
                menu.append(menuItem);
            });
            $(elements.HEADER_VIEW).html(wrap.html());
        }

        //Footer
        if($(elements.FOOTER_VIEW).length === 1) {
            var wrap = $(WRAP_OPEN + $(elements.FOOTER_VIEW).html() + WRAP_CLOSE);
            //wrap.find('label[for="' + elements.strip(elements.FOOTER_VIEW_LANGUAGE_SELECT)  + '"]').html(resources.FOOTER_VIEW_LANGUAGE_SELECT);
            //wrap.find('label[for="' + elements.strip(elements.FOOTER_VIEW_AGE_INPUT)  + '"]').html(resources.FOOTER_VIEW_AGE_INPUT);
            //wrap.find('label[for="' + elements.strip(elements.FOOTER_VIEW_THEME_SELECT)  + '"]').html(resources.FOOTER_VIEW_THEME_SELECT);
            wrap.find(elements.FOOTER_VIEW_COPYRIGHT).html(resources.FOOTER_VIEW_COPYRIGHT);
            $(elements.FOOTER_VIEW).html(wrap.html());
        }

        //Categories View
        if($(elements.CATEGORIES_VIEW).length === 1) {
            var wrap = $(WRAP_OPEN + $(elements.CATEGORIES_VIEW).html() + WRAP_CLOSE);
            wrap.find(elements.CATEGORIES_SECTION_TITLE).html(resources.CATEGORIES_SECTION_TITLE);
            $(elements.CATEGORIES_VIEW).html(wrap.html());
        }

        //Archive View
        if($(elements.ARCHIVE_VIEW).length === 1) {
            var wrap = $(WRAP_OPEN + $(elements.ARCHIVE_VIEW).html() + WRAP_CLOSE);
            wrap.find(elements.ARCHIVE_SECTION_TITLE).html(resources.ARCHIVE_SECTION_TITLE);
            $(elements.ARCHIVE_VIEW).html(wrap.html());
        }

        //List View
        /*
        if($(elements.LIST_VIEW).length === 1) {

        }
        */
        if($(elements.INDEX_LIST_TEMPLATE).length === 1) {
            var wrap = $(WRAP_OPEN + $(elements.INDEX_LIST_TEMPLATE).html() + WRAP_CLOSE);
            wrap.find(elements.ARTICLE_READMORE).html(resources.ARTICLE_READMORE);
            $(elements.INDEX_LIST_TEMPLATE).html(wrap.html());
        }

        //Detail View
        /*
        if($(elements.DETAIL_VIEW).length === 1) {
        }
        */

        //Search View
        /*
        if($(elements.SEARCH_VIEW).length === 1) {
        }
        */

        //FAQs View
        /*
        if($(elements.FAQS_VIEW).length === 1) {

        }
        */

    };

}(jQuery));;
//Copyright ©2013-2014 Memba® Sarl. All rights reserved.
/*jslint browser:true*/
/*jshint browser:true*/

;(function ($, undefined) {

    "use strict";

    var fn = Function,
        global = fn('return this')(),
        kendo = global.kendo,
        app = global.app,
        constants = app.constants,
        hrefs = app.hrefs,
        routes = app.routes,
        types = app.types,

        DEBUG = true,
        MODULE = 'app.index.viewmodels.js: ';

    /**
     * Blog Model
     * @type {*}
     */
    //TODO use a model
    var Blog = kendo.data.Model.define({});

    /**
     * Datasources
     * @type {DataSource}
     */
    var categoriesDataSource = new kendo.data.DataSource({}),
        archiveDataSource = new kendo.data.DataSource({}),
        listDataSource = new kendo.data.DataSource({}),
        blogDataSource = new kendo.data.DataSource({
        //schema: { model: {} },
        transport: { read: { url: hrefs.ARCHIVE + hrefs.RSS, dataType: 'xml' } },
        schema: {
            // specify the the schema is XML
            type: 'xml',
            // the XML element which represents a single data record
            data: '/rss/channel/item',
            // define the model - the object which will represent a single data record
            model: {
                id: 'guid',
                fields: {
                    guid: {
                        field: 'guid/text()',
                        type: types.STRING,
                        editable: false,
                        defaultValue: constants.DEFAULT_GUID,
                        parse: function(value) {
                            //<guid isPermaLink="false">urn:uuid:1225c695-cfb8-4ebb-aaaa-80da344efa6a</guid>
                            //See: http://en.wikipedia.org/wiki/Uniform_resource_name
                            if (value.indexOf(constants.URN) === 0 ) {
                                var pos = value.substr(constants.URN.length).indexOf(constants.COLON);
                                if (pos > 0) {
                                    return value.substr(constants.URN.length + pos + 1);
                                }
                            }
                            return value;
                        }
                    },
                    title: {
                        field: 'title/text()',
                        type: types.STRING,
                        editable: false
                    },
                    link: {
                        field: 'link/text()',
                        type: types.STRING,
                        editable: false
                    },
                    description: {
                        field: 'description/text()',
                        type: types.STRING,
                        editable: false
                    },
                    enclosure: {
                        //TODO: check that this is an image + default value
                        //<enclosure url="http://www.scripting.com/mp3s/weatherReportSuite.mp3" length="0" type="audio/mpeg" />
                        field: 'enclosure/@url',
                        type: types.STRING,
                        editable: false
                        //TODO defaultValue: ''
                    },
                    author: {
                        field: 'author/text()',
                        type: types.STRING,
                        editable: false
                    },
                    pubDate: {
                        field: 'pubDate/text()',
                        type: types.DATE,
                        editable: false,
                        parse: function(value) {
                            if (DEBUG && global.console.log) {
                                global.console.log(MODULE + 'parse value ' + value);
                            }
                            return kendo.parseDate(value);
                        }
                    },
                    displayPeriod: {
                        field: 'pubDate/text()',
                        type: types.STRING,
                        editable: false,
                        parse: function(value) {
                            var d = kendo.parseDate(value);
                            return kendo.toString(d, 'Y', app.resources.LOCALE);
                        }
                    },
                    period: {
                        field: 'pubDate/text()',
                        type: types.STRING,
                        editable: false,
                        parse: function(value) {
                            var d = kendo.parseDate(value);
                            return kendo.toString(d, 'yyyyMM');
                        }
                    },
                    periodLink: {
                        field: 'pubDate/text()',
                        type: types.STRING,
                        editable: false,
                        parse: function(value) {
                            var d = kendo.parseDate(value);
                            return hrefs.INDEX + routes.HASH + routes.ARCHIVE.replace(routes.PERIOD_PARAMETER, encodeURIComponent(kendo.toString(d, 'yyyyMM')));
                        }
                    },
                    //TODO: How to support multiple category tags according to RSS spec?
                    category: {
                        field: 'category/text()',
                        type: types.STRING,
                        editable: false
                    },
                    categoryLink: {
                        field: 'category/text()',
                        type: types.STRING,
                        editable: false,
                        parse: function(value) {
                            return hrefs.INDEX + routes.HASH + routes.CATEGORY.replace(routes.CATEGORY_PARAMETER, encodeURIComponent(value));
                        }
                    }
                }
            }
        },
        change: function(e) {
            if (DEBUG && global.console) {
                console.log(MODULE + 'Fetched ' + e.items.length + ' blogs');
            }
            if (e.sender instanceof kendo.data.DataSource) {
                categoriesDataSource.data(e.sender.data());
                categoriesDataSource.group({field: 'category'});

                archiveDataSource.data(e.sender.data());
                archiveDataSource.group({field: 'period'});

                listDataSource.data(e.sender.data());
            }
        },
        error: function (e) {
            if (DEBUG && global.console && $.type(global.console.error) === types.FUNCTION) {
                global.console.error(MODULE + 'Error %O',  e.errors);
            }
        }
    });

    blogDataSource.read();

    /**
     * ViewModel for headerView and searchView
     * @type {*}
     */
    app.searchViewModel = kendo.observable({
        search: ''
    });

    /**
     * ViewModel for categoriesView
     * @type {*}
     */
    app.categoriesViewModel = kendo.observable({
        _categories : categoriesDataSource,
        categories: function () {
            return this.get('_categories').view();
        }
    });

    /**
     * ViewModel for archiveView
     * @type {*}
     */
    app.archiveViewModel = kendo.observable({
        _archive: archiveDataSource,
        archive: function () {
            return this.get('_archive').view();
        }
    });

    /**
     * ViewModel for listView
     * @type {*}
     */
    app.listViewModel = kendo.observable({
        list: listDataSource
    });

    /**
     * ViewModel for detailView
     * @type {*}
     */
    app.detailViewModel = kendo.observable({
        contentUrl: '',
        title: '',
        author: '',
        pubDate: Date.now()
    });

    /**
     * url custom binding
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
                url = that.bindings['url'].get(), //get the value from detailViewModel
                widget = $(that.element).data('kendoMarkDown');
            if (widget instanceof kendo.ui.MarkDown) {
                widget.url(url); //update the widget url
            }
        }
    });

}(jQuery));


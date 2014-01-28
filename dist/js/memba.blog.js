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
        DATE_FORMAT: 'dd MMM yyyy',
        MAX_THUMBNAILS: 4
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
        ARCHIVE: './posts/',
        RSS: 'index.rss',
        INDEX: './index.html',
        HEADER: './header.tmpl.html',
        FOOTER: './footer.tmpl.html',
        THUMBNAIL: './styles/images/blog{0}.jpg'
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
        DETAIL: '/blog/:year/:month/:slug',
        YEAR_PARAMETER: ':year',
        MONTH_PARAMETER: ':month',
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
        HREF: 'href',
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
        //HEADER_VIEW_NAVBAR_BRAND: '#header-view-navbar-brand',
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

        //Error View
        ERROR_VIEW: '#error-view',
        ERROR_VIEW_TITLE: 'h1',
        ERROR_VIEW_MESSAGE: 'div.alert',

        DUMMY: 'dummy'
    });

}(jQuery));

;
//Copyright ©2013-2014 Memba® Sarl. All rights reserved.
/*jslint browser:true*/
/*jshint browser:true*/
/*global Modernizr: false, jQuery: false*/

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
        //tags = app.tags,
        types = app.types,
        //TITLE = 'title',
        DEBUG = false,
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
    };

    /**
     * Once document is ready and external (shared) templates are loaded
     * jQuery and kendo can safely be used against the DOM
     */
    $(document).bind(events.INITIALIZE, function(/*e , params*/) {

        if(DEBUG && global.console) {
            console.log(MODULE + 'initialize event fired');
        }

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
            errorView = new kendo.View(elements.ERROR_VIEW),

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
                    applicationLayout.showIn(elements.CONTENT_SECTION, errorView);
                }
            });

        if(DEBUG && global.console) {
            console.log(MODULE + 'views and router initialized');
        }

        //Routes like /
        router.route(routes.HOME, function () {
            var listDataSource = app.listViewModel.get('list');
            listDataSource.filter(null);
            if (!listDataSource.sort()) {
                listDataSource.sort({ field: 'pubDate', dir: 'desc' });
            }
            listDataSource.pageSize(storage.get(constants.PAGE_SIZE) || constants.DEFAULT_PAGE_SIZE);
            applicationLayout.showIn(elements.CONTENT_SECTION, listView);
        });

        //Routes like /category/Design
        router.route(routes.CATEGORY, function (category) {
            var listDataSource = app.listViewModel.get('list');
            listDataSource.filter( { field: 'category', operator: 'eq', value: category });
            listDataSource.pageSize(storage.get(constants.PAGE_SIZE) || constants.DEFAULT_PAGE_SIZE);
            applicationLayout.showIn(elements.CONTENT_SECTION, listView);
        });

        //Routes like /archive/201305
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

        //Routes like /blog/2013/11/vision-for-a-new-blog-engine
        router.route(routes.DETAIL,  function (year, month, slug) {
            var listDataSource = app.listViewModel.get('list');
            var found = $.grep(listDataSource.data(), function(item) {
                return item.link.indexOf(year + constants.PATH_SEP + month + constants.PATH_SEP + slug) > 0;
            });
            if (found.length > 0) {
                app.detailViewModel.set('contentUrl', hrefs.ARCHIVE + year + constants.PATH_SEP + month + constants.PATH_SEP + slug + constants.MARKDOWN_EXT);
                app.detailViewModel.set('title', found[0].title);
                app.detailViewModel.set('author', found[0].author);
                app.detailViewModel.set('pubDate', kendo.toString(found[0].pubDate, constants.DATE_FORMAT));
                applicationLayout.showIn(elements.CONTENT_SECTION, detailView);
            } else {
                //TODO
            }
        });

        //Routes like /guid/569114ED-9700-4439-825F-C4A5FE2DC42E
        router.route(routes.GUID, function (guid) {
            var listDataSource = app.listViewModel.get('list');
            var found = listDataSource.get(guid);
            if (found) {
                var rx = new RegExp(routes.HASH + routes.DETAIL
                    .replace(routes.YEAR_PARAMETER, '([^/]+)')
                    .replace(routes.MONTH_PARAMETER, '([^/]+)')
                    .replace(routes.SLUG_PARAMETER, '([^/]+)') + '$');
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

        //routes like /search
        router.route(routes.SEARCH, function() {
            applicationLayout.showIn(elements.CONTENT_SECTION, searchView);
        });

        if(DEBUG && global.console) {
            console.log(MODULE + 'routes configured');
        }

        //Start router
        router.start();

        if(DEBUG && global.console) {
            console.log(MODULE + 'router started');
        }

        /**
         * Bind events
         */
        //Window
        $(window).keydown(function(e){
            if(e.keyCode == 13) {
                if ($(elements.HEADER_VIEW_SEARCH_INPUT).val().trim().length > 0) {
                    $(elements.HEADER_VIEW_SEARCH_BUTTON).trigger(events.CLICK);
                }
                e.preventDefault();
                return false;
            }
            return true;
        });

        //Header
        $(elements.HEADER_VIEW_SEARCH_INPUT).bind(events.KEYUP, function(e) {
            if ($(e.target).val().trim().length > 0) {
                $(elements.HEADER_VIEW_SEARCH_BUTTON).removeClass('disabled');
            } else {
                $(elements.HEADER_VIEW_SEARCH_BUTTON).addClass('disabled');
            }
        });
        $(elements.HEADER_VIEW_SEARCH_BUTTON).bind(events.CLICK, function(/*e*/){
            router.navigate(routes.SEARCH);
            //window.location.assign(routes.HASH + routes.SEARCH + '?q=' + encodeURIComponent(app.searchViewModel.get('search')));
        });


        //Footer
        $(elements.INDEX_PAGER).find(elements.INDEX_PAGER_SIZES).bind(events.CHANGE, function(e) {
            storage.set(constants.PAGE_SIZE, kendo.parseInt(e.target.value));
        });

        if(DEBUG && global.console) {
            console.log(MODULE + 'events bound');
        }

    });

}(jQuery));


;
//Copyright ©2013-2014 Memba® Sarl. All rights reserved.
/*jslint browser:true*/
/*jshint browser:true*/
/*global Modernizr: false, jQuery: false*/

(function ($, undefined) {

    "use strict";

    var fn = Function,
        global = fn('return this')(),
        kendo = global.kendo,
        app = global.app,
        elements = app.elements,
        hrefs = app.hrefs,
        tags = app.tags,
        DEBUG = false,
        MODULE = 'app.localizer.js: ',
        WRAP_OPEN = '<wrap>',
        WRAP_CLOSE = '</wrap>';

    /**
     * Localize the index page
     * @param resources
     */
    app.localize = function (resources) {        //TODO: maybe the localize function should load resources

        var wrap, locale = resources.LOCALE || (global.navigator.userLanguage || global.navigator.language).substr(0, 2);
        if (DEBUG && global.console) {
            global.console.log(MODULE + 'external templates should be loaded before starting localization');
            global.console.log(MODULE + 'starting localization in ' + locale);
        }

        //load kendo culture
        kendo.culture(locale);

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
            wrap = $(WRAP_OPEN + $(elements.APPLICATION_LAYOUT).html() + WRAP_CLOSE);
            wrap.find(elements.ALL_POSTS_SECTION_TITLE).html(resources.ALL_POSTS_SECTION_TITLE);
            wrap.find(elements.RSS_SECTION_TITLE)
                .html(resources.RSS_SECTION_TITLE)
                .attr(tags.HREF, hrefs.ARCHIVE + hrefs.RSS);
            $(elements.APPLICATION_LAYOUT).html(wrap.html());
        }

        //Header - Navigation Bar
        if($(elements.HEADER_VIEW).length === 1) {
            wrap = $(WRAP_OPEN + $(elements.HEADER_VIEW).html() + WRAP_CLOSE);
            //wrap.find(elements.HEADER_VIEW_NAVBAR_BRAND).html(resources.HEADER_VIEW_NAVBAR_BRAND);
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
            wrap = $(WRAP_OPEN + $(elements.FOOTER_VIEW).html() + WRAP_CLOSE);
            //wrap.find('label[for="' + elements.strip(elements.FOOTER_VIEW_LANGUAGE_SELECT)  + '"]').html(resources.FOOTER_VIEW_LANGUAGE_SELECT);
            //wrap.find('label[for="' + elements.strip(elements.FOOTER_VIEW_AGE_INPUT)  + '"]').html(resources.FOOTER_VIEW_AGE_INPUT);
            //wrap.find('label[for="' + elements.strip(elements.FOOTER_VIEW_THEME_SELECT)  + '"]').html(resources.FOOTER_VIEW_THEME_SELECT);
            wrap.find(elements.FOOTER_VIEW_COPYRIGHT).html(resources.FOOTER_VIEW_COPYRIGHT);
            $(elements.FOOTER_VIEW).html(wrap.html());
        }

        //Categories View
        if($(elements.CATEGORIES_VIEW).length === 1) {
            wrap = $(WRAP_OPEN + $(elements.CATEGORIES_VIEW).html() + WRAP_CLOSE);
            wrap.find(elements.CATEGORIES_SECTION_TITLE).html(resources.CATEGORIES_SECTION_TITLE);
            $(elements.CATEGORIES_VIEW).html(wrap.html());
        }

        //Archive View
        if($(elements.ARCHIVE_VIEW).length === 1) {
            wrap = $(WRAP_OPEN + $(elements.ARCHIVE_VIEW).html() + WRAP_CLOSE);
            wrap.find(elements.ARCHIVE_SECTION_TITLE).html(resources.ARCHIVE_SECTION_TITLE);
            $(elements.ARCHIVE_VIEW).html(wrap.html());
        }

        //List View
        /*
        if($(elements.LIST_VIEW).length === 1) {

        }
        */
        if($(elements.INDEX_LIST_TEMPLATE).length === 1) {
            wrap = $(WRAP_OPEN + $(elements.INDEX_LIST_TEMPLATE).html() + WRAP_CLOSE);
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

        if($(elements.ERROR_VIEW).length === 1) {
            wrap = $(WRAP_OPEN + $(elements.ERROR_VIEW).html() + WRAP_CLOSE);
            wrap.find(elements.ERROR_VIEW_TITLE).html(resources.ERROR_VIEW_TITLE);
            wrap.find(elements.ERROR_VIEW_MESSAGE).html(resources.ERROR_VIEW_MESSAGE);
            $(elements.ERROR_VIEW).html(wrap.html());
        }

        if (DEBUG && global.console) {
            global.console.log(MODULE + 'done with localization in ' + locale);
        }
    };

}(jQuery));
;
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

        DEBUG = false,
        MODULE = 'app.index.viewmodels.js: ';

    /**
     * Blog Model
     * @type {*}
     */
    //TODO use a model
    var Blog = kendo.data.Model.define({});

    /**
     * Datasources
     * @type {kendo.data.DataSource}
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
                        editable: false,
                        parse: function(value) {
                            //This allows the web site to work both in the development environment and the production environment
                            //Be careful with the RSS index though
                            if ($.type(value) === types.STRING) {
                                var pos = value.indexOf(routes.HASH);
                                if (pos >= 0) {
                                    return value.substr(pos);
                                }
                            }
                            return value;
                        }
                    },
                    description: {
                        field: 'description/text()',
                        type: types.STRING,
                        editable: false
                    },
                    enclosure: {
                        field: 'enclosure/@url',
                        type: types.STRING,
                        editable: false,
                        parse: function(value) {
                            if($.type(value) === types.STRING) {
                                //TODO: check that value is an image (file extension and/or content type)
                                //<enclosure url="http://www.scripting.com/mp3s/weatherReportSuite.mp3" length="0" type="audio/mpeg" />
                                return value;
                            } else {
                                return kendo.format(hrefs.THUMBNAIL, Math.floor(1 + constants.MAX_THUMBNAILS* Math.random()));
                            }
                        }
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
                global.console.error(MODULE + 'error ' +  e.errorThrown);
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
                url = that.bindings.url.get(), //get the value from detailViewModel
                widget = $(that.element).data('kendoMarkDown');
            if (widget instanceof kendo.ui.MarkDown) {
                widget.url(url); //update the widget url
            }
        }
    });

}(jQuery));


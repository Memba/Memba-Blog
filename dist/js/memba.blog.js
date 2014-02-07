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
     * Routes
     * @type {*}
     */
    app.routes = $.extend(app.routes || {}, {
        HASH: '#',
        HOME: '/',
        PAGE: '/pages/:page',
        CATEGORY: '/category/:category',
        //CATEGORY_PARAMETER: ':category',
        BLOG: '/blog(/:year)(/:month)(/:slug)',
        YEAR_PARAMETER: ':year',
        MONTH_PARAMETER: ':month',
        SLUG_PARAMETER: ':slug',
        GUID: '/guid/:guid',
        //GUID_PARAMETER: ':guid',
        SEARCH: '/search'
    });

    /**
     * Events
     * @type {*}
     */
    app.events = $.extend(app.events || {}, {
        CHANGE: 'change',
        CLICK: 'click',
        //DBLCLICK: 'dblclick',
        //DRAGSTART: 'dragstart',
        //DRAGENTER: 'dragenter',
        //DRAGOVER: 'dragover',
        //DROP: 'drop',
        HIDE: 'hide',
        INIT: 'init',
        INITIALIZE: 'initialize',
        KEYUP: 'keyup',
        SHOW: 'show'
    });

    /**
     * Html tags and attributes
     * @type {*}
     */
    app.tags = $.extend(app.tags || {}, {
        ALT: 'alt',
        ARTICLE: 'article',
        BODY: 'body',
        DATA_COLUMNS: 'data-columns',
        DIV: 'div',
        DIV_ELEMENT: '<div/>',
        HEAD: 'head',
        HEADING1: 'h1',
        HREF: 'href',
        ID: 'id',
        IMG: 'img',
        INPUT: 'input',
        INPUT_ELEMENT: '<input/>',
        PLACEHOLDER: 'placeholder',
        SPAN: 'span',
        SPAN_ELEMENT: '<span/>',
        SRC: 'src',
        TEXTAREA: 'textarea',
        TEXTAREA_ELEMENT: '<textarea/>',
        TITLE: 'title',
        TITLE_ELEMENT: '<title></title>'
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
        APPLICATION_HEADER: '#header',
        APPLICATION_CONTAINER: '#container',
        APPLICATION_MAIN: '#main',
        APPLICATION_CONTENT: '#content',
        APPLICATION_COMMENTS: '#comments',
        APPLICATION_SIDE: '#side',
        APPLICATION_FOOTER: '#footer',

        //Header
        HEADER_VIEW: '#header-view',
        HEADER_VIEW_NAVBAR_BRAND: '#header-view-navbar-brand',
        HEADER_VIEW_NAVBAR_TOGGLE: '#header-view-navbar-toggle',
        HEADER_VIEW_NAVBAR_SEARCH_INPUT: '#header-view-navbar-search-input',
        HEADER_VIEW_NAVBAR_SEARCH_BUTTON: '#header-view-navbar-search-button',
        HEADER_VIEW_NAVBAR_MENU: '#header-view-navbar-menu',

        //Footer
        FOOTER_VIEW: '#footer-view',
        FOOTER_VIEW_COPYRIGHT: '#footer-view-copyright',

        //Page View
        PAGE_VIEW: '#page-view',

        //Search View
        SEARCH_VIEW: '#search-view',

        //Error View
        ERROR_VIEW: '#error-view',
        ERROR_VIEW_TITLE: 'h1',
        ERROR_VIEW_MESSAGE: 'div.alert',

        //Blog side navigation
        BLOG_NAVIGATION_VIEW: '#blog-navigation-view',
        ALL_POSTS_SECTION: '#all-posts',
        ALL_POSTS_SECTION_TITLE: '#all-posts-title > a',
        CATEGORIES_SECTION: '#categories',
        CATEGORIES_SECTION_TITLE: '#categories-title',
        ARCHIVE_SECTION: '#archive',
        ARCHIVE_SECTION_TITLE: '#archive-title',
        RSS_SECTION: '#rss',
        RSS_SECTION_TITLE: '#rss-title > a',

        //Blog list View
        BLOG_LIST_VIEW: '#blog-list-view',
        BLOG_LIST_TEMPLATE: '#blog-list-template',
        BLOG_PAGER: '#blog-pager',
        BLOG_PAGER_SIZES: 'span.k-pager-sizes select',
        BLOG_POST_READMORE: 'div.readmore > div.pull-right > a',

        //Blog Post View
        BLOG_POST_VIEW: '#post-view',

        //Commments View
        COMMENTS_VIEW: '#comments-view',

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
        config = app.config,
        constants = app.constants,
        elements = app.elements,
        events = app.events,
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

    //This controller only applies to the spa page
    if(window.location.pathname.indexOf(config.paths.index) === -1) { return; }

    /**
     * Once document is ready and external (shared) templates are loaded
     * jQuery and kendo can safely be used against the DOM
     */
    $(document).on(events.INITIALIZE, function(/*e , params*/) {

        if(DEBUG && global.console) {
            console.log(MODULE + 'initialize event fired');
        }

        //Localize
        app.localize(app.config);

        // Views and layouts
        var applicationLayout = new kendo.Layout(elements.APPLICATION_LAYOUT),
            headerView = new kendo.View(elements.HEADER_VIEW, { model: app.searchViewModel }),
            footerView = new kendo.View(elements.FOOTER_VIEW),
            pageView = new kendo.View(elements.PAGE_VIEW, { model: app.contentViewModel }),
            searchView = new kendo.View(elements.SEARCH_VIEW, { model: app.searchViewModel }),
            errorView = new kendo.View(elements.ERROR_VIEW),
            blogNavigationView = new kendo.View(elements.BLOG_NAVIGATION_VIEW, { model: app.blogNavigationViewModel }),
            blogListView = new kendo.View(elements.BLOG_LIST_VIEW, { model: app.blogListViewModel }),
            blogPostView = new kendo.View(elements.BLOG_POST_VIEW, { model: app.contentViewModel }),
            commentsView = new kendo.View(elements.COMMENTS_VIEW, { model: app.contentViewModel }),

            //Initialize router
            router = new kendo.Router({
                init: function () {
                    applicationLayout.render(elements.APPLICATION_ROOT);
                    applicationLayout.showIn(elements.APPLICATION_HEADER, headerView);
                    applicationLayout.showIn(elements.APPLICATION_FOOTER, footerView);
                    applicationLayout.showIn(elements.APPLICATION_COMMENTS, commentsView);
                    applicationLayout.showIn(elements.APPLICATION_SIDE, blogNavigationView);
                    //applicationLayout.showIn(elements.APPLICATION_CONTENT, blogListView);
                },
                change: function (e) {
                    if (DEBUG && global.console) {
                        global.console.log(MODULE + 'Open view ' + e.url);
                    }
                    //Call analytics
                    var analytics = $('#analytics').data('kendoAnalytics');
                    if ((analytics instanceof kendo.ui.Analytics) && ($.type(analytics.options.pubId) === types.STRING)) {
                        analytics.send(window.location.protocol + "//" + window.location.host + window.location.pathname + routes.HASH + e.url);
                    }
                },
                routeMissing: function(e) {
                    if (DEBUG && global.console) {
                        global.console.log(MODULE + 'Route missing at ' + e.url);
                    }
                    applicationLayout.showIn(elements.APPLICATION_CONTENT, errorView);
                }
            });

        if(DEBUG && global.console) {
            console.log(MODULE + 'views and router initialized');
        }

        //Routes like /
        router.route(routes.HOME, function () {
            //if config designates a home page, show it
            if($.type(app.config.paths.home) === types.STRING && app.config.paths.home.length > 0) {
                app.contentViewModel.set('contentUrl', config.paths.root + config.paths.pages + app.config.paths.home);
                applicationLayout.showIn(elements.APPLICATION_CONTENT, pageView);
                applicationLayout.showIn(elements.APPLICATION_COMMENTS, commentsView);
                blogNavigationView.hide();
            } else { //otherwise list blog posts (same as /blog)
                var blogListDataSource = app.blogListViewModel.get('list');
                blogListDataSource.filter(null);
                if (!blogListDataSource.sort()) {
                    blogListDataSource.sort({ field: 'pubDate', dir: 'desc' });
                }
                blogListDataSource.pageSize(storage.get(constants.PAGE_SIZE) || constants.DEFAULT_PAGE_SIZE);
                applicationLayout.showIn(elements.APPLICATION_CONTENT, blogListView);
                commentsView.hide();
                applicationLayout.showIn(elements.APPLICATION_SIDE, blogNavigationView);
            }
        });

        router.route(routes.PAGE, function(page) {
            app.contentViewModel.set('contentUrl', config.paths.root + config.paths.pages + page + constants.MARKDOWN_EXT);
            applicationLayout.showIn(elements.APPLICATION_CONTENT, pageView);
            applicationLayout.showIn(elements.APPLICATION_COMMENTS, commentsView);
            blogNavigationView.hide();
        });

        //Routes like /category/Design
        router.route(routes.CATEGORY, function (category) {
            var blogListDataSource = app.blogListViewModel.get('list');
            blogListDataSource.filter( { field: 'category', operator: 'eq', value: category });
            blogListDataSource.pageSize(storage.get(constants.PAGE_SIZE) || constants.DEFAULT_PAGE_SIZE);
            applicationLayout.showIn(elements.APPLICATION_CONTENT, blogListView);
            commentsView.hide();
            applicationLayout.showIn(elements.APPLICATION_SIDE, blogNavigationView);
        });

        //Routes like /blog/2013/11/vision-for-a-new-blog-engine
        router.route(routes.BLOG,  function (year, month, slug) {
            var blogListDataSource = app.blogListViewModel.get('list');
            if ($.type(slug) === types.STRING) {
                var found = $.grep(blogListDataSource.data(), function(item) {
                    return item.link.indexOf(year + constants.PATH_SEP + month + constants.PATH_SEP + slug) > 0;
                });
                if (found.length > 0) {
                    app.contentViewModel.set('contentUrl', config.paths.root + config.paths.posts + year + constants.PATH_SEP + month + constants.PATH_SEP + slug + constants.MARKDOWN_EXT);
                    applicationLayout.showIn(elements.APPLICATION_CONTENT, blogPostView);
                    applicationLayout.showIn(elements.APPLICATION_COMMENTS, commentsView);
                }
            } else {
                if (!isNaN(parseInt(month))) {
                    blogListDataSource.filter({ field: 'period', operator: 'eq', value: year + '/' + month});
                } else if (!isNaN(parseInt(year))) {
                    blogListDataSource.filter({ field: 'period', operator: 'startsWith', value: year });
                } else {
                    blogListDataSource.filter(null);
                }
                if (!blogListDataSource.sort()) {
                    blogListDataSource.sort({ field: 'pubDate', dir: 'desc' });
                }
                blogListDataSource.pageSize(storage.get(constants.PAGE_SIZE) || constants.DEFAULT_PAGE_SIZE);
                applicationLayout.showIn(elements.APPLICATION_CONTENT, blogListView);
                commentsView.hide();
            }
            applicationLayout.showIn(elements.APPLICATION_SIDE, blogNavigationView);
        });

        //Routes like /guid/569114ED-9700-4439-825F-C4A5FE2DC42E
        //TODO: check
        router.route(routes.GUID, function (guid) {
            var blogListDataSource = app.blogListViewModel.get('list');
            var found = blogListDataSource.get(guid);
            if (found) {
                var rx = new RegExp(routes.HASH + routes.BLOG
                    .replace(routes.YEAR_PARAMETER, '([^/]+)')
                    .replace(routes.MONTH_PARAMETER, '([^/]+)')
                    .replace(routes.SLUG_PARAMETER, '([^/]+)') + '$');
                var matches = rx.exec(found.link);
                app.contentViewModel.set('contentUrl', config.paths.root + config.paths.posts + matches[1] + constants.PATH_SEP + matches[2] + constants.MARKDOWN_EXT);
                applicationLayout.showIn(elements.APPLICATION_CONTENT, blogPostView);
                applicationLayout.showIn(elements.APPLICATION_COMMENTS, commentsView);
                applicationLayout.showIn(elements.APPLICATION_SIDE, blogNavigationView);
            }
        });

        //routes like /search
        router.route(routes.SEARCH, function() {
            applicationLayout.showIn(elements.APPLICATION_CONTENT, searchView);
            commentsView.hide();
            blogNavigationView.hide();
        });

        if(DEBUG && global.console) {
            global.console.log(MODULE + 'routes configured');
        }

        /**
         * Bind events
         */
        //Window
        $(window).keydown(function(e){
            if(e.keyCode == 13) {
                if ($(elements.HEADER_VIEW_NAVBAR_SEARCH_INPUT).val().trim().length > 0) {
                    $(elements.HEADER_VIEW_NAVBAR_SEARCH_BUTTON).trigger(events.CLICK);
                }
                e.preventDefault();
                return false;
            }
            return true;
        });

        //views
        var onMarkDownChange = function(e) {
            if (DEBUG && global.console.log) {
                global.console.log(MODULE + 'new markdown loaded');
            }
            var metaData = e.sender.metadata(),
                pubDate = new Date(metaData.pubDate);
            //Update view Model
            app.contentViewModel.set('title', $.type(metaData.title) === types.STRING ? metaData.title : '');
            app.contentViewModel.set('author', $.type(metaData.author) === types.STRING ? metaData.author : '');
            app.contentViewModel.set('pubDate', $.type(pubDate) === types.DATE && !isNaN(pubDate.getTime()) ? kendo.toString(pubDate, constants.DATE_FORMAT) : kendo.toString(new Date(), constants.DATE_FORMAT));
            app.contentViewModel.set('identifier', $.type(metaData.guid) === types.STRING ? metaData.guid : '');
            //Set page meta tags
            app.setMetaTags(metaData, app.config);
        };
        
        pageView.bind(events.INIT, function(e) {
            //Handler bound to the change event of the markdown widget to set the page meta tags
            e.sender.element.find('[data-role=markdown]').data('kendoMarkDown').bind(events.CHANGE, onMarkDownChange);
        });

        blogPostView.bind(events.INIT, function(e) {
            //Handler bound to the change event of the markdown widget to set the page meta tags
            e.sender.element.find('[data-role=markdown]').data('kendoMarkDown').bind(events.CHANGE, onMarkDownChange);
        });

        blogNavigationView.bind(events.SHOW, function(e) {
            if (DEBUG && global.console.log) {
                global.console.log(MODULE + 'blog navigation shown');
            }
            $(elements.APPLICATION_MAIN).removeClass('col-lg-12 col-md-12 col-sm-12');
            $(elements.APPLICATION_MAIN).addClass('col-lg-10 col-md-9 col-sm-8 spacing');
            $(elements.APPLICATION_SIDE).removeClass('hidden');
            $(elements.APPLICATION_SIDE).addClass('col-lg-2 col-md-3 col-sm-4');
        });

        blogNavigationView.bind(events.HIDE, function(e) {
            if (DEBUG && global.console.log) {
                global.console.log(MODULE + 'blog navigation hidden');
            }
            $(elements.APPLICATION_MAIN).removeClass('col-lg-10 col-md-9 col-sm-8 spacing');
            $(elements.APPLICATION_MAIN).addClass('col-lg-12 col-md-12 col-sm-12');
            $(elements.APPLICATION_SIDE).removeClass('col-lg-2 col-md-3 col-sm-4');
            $(elements.APPLICATION_SIDE).addClass('hidden');

        });

        //Header
        $(elements.HEADER_VIEW_NAVBAR_SEARCH_INPUT).bind(events.KEYUP, function(e) {
            if ($(e.target).val().trim().length > 0) {
                $(elements.HEADER_VIEW_NAVBAR_SEARCH_BUTTON).removeClass('disabled');
            } else {
                $(elements.HEADER_VIEW_NAVBAR_SEARCH_BUTTON).addClass('disabled');
            }
        });
        $(elements.HEADER_VIEW_NAVBAR_SEARCH_BUTTON).bind(events.CLICK, function(/*e*/){
            router.navigate(routes.SEARCH);
            //window.location.assign(routes.HASH + routes.SEARCH + '?q=' + encodeURIComponent(app.searchViewModel.get('search')));
        });


        //Pager
        $(elements.BLOG_PAGER).find(elements.BLOG_PAGER_SIZES).bind(events.CHANGE, function(e) {
            storage.set(constants.PAGE_SIZE, kendo.parseInt(e.target.value));
        });

        if(DEBUG && global.console) {
            console.log(MODULE + 'events bound');
        }


        //Start router
        router.start();

        if(DEBUG && global.console) {
            global.console.log(MODULE + 'router started');
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
        tags = app.tags,
        types = app.types,

        WRAP_OPEN = '<wrap>',
        WRAP_CLOSE = '</wrap>',

        DEBUG = false,
        MODULE = 'app.localizer.js: ';


    /**
    * Localize the index.html page
    * @method app.localize
    */
    app.localize = function (config) {

        if (DEBUG && global.console) {
            global.console.log(MODULE + 'starting localization; config and external templates should have been loaded beforehand');
        }

        //set kendo culture
        kendo.culture(config.language);

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

        var wrap;
        //Application layout
        /*
        if($(elements.APPLICATION_LAYOUT).length === 1) {
            wrap = $(WRAP_OPEN + $(elements.APPLICATION_LAYOUT).html() + WRAP_CLOSE);
            $(elements.APPLICATION_LAYOUT).html(wrap.html());
        }
        */

        //Header - Navigation Bar
        if($(elements.HEADER_VIEW).length === 1) {
            wrap = $(WRAP_OPEN + $(elements.HEADER_VIEW).html() + WRAP_CLOSE);
            //logo
            wrap.find(elements.HEADER_VIEW_NAVBAR_BRAND + ' ' + tags.IMG)
                .attr(tags.SRC, config.root + config.logo)
                .attr(tags.ALT, config.title);
            //toggle button (only displays on mobiles)
            wrap.find(elements.HEADER_VIEW_NAVBAR_TOGGLE).html(config.blog.navigation.toggle);
            //search box
            if (Modernizr.input.placeholder) {
                wrap.find(elements.HEADER_VIEW_NAVBAR_SEARCH_INPUT).attr(tags.PLACEHOLDER, config.search.placeholder);
            }
            wrap.find(elements.HEADER_VIEW_NAVBAR_SEARCH_BUTTON).html(config.search.button);
            //menu
            var menu = wrap.find(elements.HEADER_VIEW_NAVBAR_MENU);
            $.each(config.menu, function (index, item) {
                if ($.type(item.href) === types.STRING && !item.items) {
                    menu.append(kendo.format('<li><a href="{0}">{1}</a></li>', item.href, item.text));
                } else if (!item.href && $.isArray(item.items) && item.items.length > 0) {
                    var menuItem = $('<li class="dropdown"></li>');
                    menuItem.append(kendo.format('<a href="#" class="dropdown-toggle" data-toggle="dropdown">{0}<b class="caret"></b></a>', item.text));
                    var menuDropDown = $('<ul class="dropdown-menu"></ul>');
                    $.each(item.items, function (subindex, subitem) {
                        if(subitem.text && subitem.href) {
                            menuDropDown.append(kendo.format('<li><a href="{0}">{1}</a></li>', subitem.href, subitem.text));
                        } else {
                            menuDropDown.append('<li class="divider"></li>');
                        }
                    });
                    menuItem.append(menuDropDown);
                    menu.append(menuItem);
                }
            });
            $(elements.HEADER_VIEW).html(wrap.html());
        }

        //Footer
        if($(elements.FOOTER_VIEW).length === 1) {
            wrap = $(WRAP_OPEN + $(elements.FOOTER_VIEW).html() + WRAP_CLOSE);
            wrap.find(elements.FOOTER_VIEW_COPYRIGHT).html(config.copyright);
            $(elements.FOOTER_VIEW).html(wrap.html());
        }

        //Page View
        /*
        if($(elements.PAGE_VIEW).length === 1) {
        }
        */

        //Search View
        /*
        if($(elements.SEARCH_VIEW).length === 1) {
        }
        */

        //Error View
        if($(elements.ERROR_VIEW).length === 1) {
            wrap = $(WRAP_OPEN + $(elements.ERROR_VIEW).html() + WRAP_CLOSE);
            wrap.find(elements.ERROR_VIEW_TITLE).html(config.errors.error404.title);
            wrap.find(elements.ERROR_VIEW_MESSAGE).html(config.errors.error404.message);
            $(elements.ERROR_VIEW).html(wrap.html());
        }

        //Blog Navigation View
        if($(elements.BLOG_NAVIGATION_VIEW).length === 1) {
            wrap = $(WRAP_OPEN + $(elements.BLOG_NAVIGATION_VIEW).html() + WRAP_CLOSE);
            wrap.find(elements.ALL_POSTS_SECTION_TITLE).html(config.blog.navigation.allposts);
            wrap.find(elements.CATEGORIES_SECTION_TITLE).html(config.blog.navigation.categories);
            wrap.find(elements.ARCHIVE_SECTION_TITLE).html(config.blog.navigation.archive);
            wrap.find(elements.RSS_SECTION_TITLE)
                .html(config.blog.navigation.rssfeed)
                .attr(tags.HREF, config.paths.root + config.paths.posts + config.paths.rss);
            $(elements.BLOG_NAVIGATION_VIEW).html(wrap.html());
        }

        // Blog List View
        /*
        if($(elements.BLOG_LIST_VIEW).length === 1) {
        }
        */

        if($(elements.BLOG_LIST_TEMPLATE).length === 1) {
            wrap = $(WRAP_OPEN + $(elements.BLOG_LIST_TEMPLATE).html() + WRAP_CLOSE);
            wrap.find(elements.BLOG_POST_READMORE).html(config.blog.readmore);
            $(elements.BLOG_LIST_TEMPLATE).html(wrap.html());
        }

        //Blog Post View
        /*
        if($(elements.BLOG_POST_VIEW).length === 1) {
        }
        */

        if (DEBUG && global.console) {
            global.console.log(MODULE + 'localization completed');
        }
    };

    /**
     * Set page meta tags from metaData and application config
     * @method app.setMetaTags
     * @param metaData
     * @param config
     */
    app.setMetaTags = function(metaData, config) {
        var head = $(tags.HEAD);
        //set title
        if (head.length > 0 && (metaData.title || config.title)){
            var title = head.find(tags.TITLE);
            if (title.length === 0) {
                title = $(tags.TITLE_ELEMENT);
                head.prepend(title);
            }
            title.text(metaData.title || config.title);
        }
        //set page heading
        var heading = $(tags.ARTICLE + ' ' + tags.HEADING1);
        if (heading.length > 0  && (metaData.title || config.title)){
            heading.text(metaData.title || config.title);
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
        config = app.config,
        constants = app.constants,
        routes = app.routes,
        types = app.types,

        DEBUG = false,
        MODULE = 'app.index.viewmodels.js: ';


    //The following view models only applies to the spa page
    if(window.location.pathname.indexOf(config.paths.index) === -1) { return; }

    /**
     * Blog Model
     * @type {*}
     */
    //TODO use a model
    //var Blog = kendo.data.Model.define({});


    /**
     * Datasources
     * @type {kendo.data.DataSource}
     */
    var categoriesDataSource = new kendo.data.DataSource({}),
        archiveDataSource = new kendo.data.DataSource({}),
        blogListDataSource = new kendo.data.DataSource({}),
        blogDataSource = new kendo.data.DataSource({
        //schema: { model: {} },
        transport: { read: { url: config.paths.root + config.paths.posts + config.paths.rss, dataType: 'xml' } },
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
                                return kendo.format(config.paths.root + config.paths.thumbnail, Math.floor(1 + constants.MAX_THUMBNAILS* Math.random()));
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
                            return kendo.toString(d, 'yyyy/MM');
                        }
                    },
                    //TODO: How to support multiple category tags according to RSS spec?
                    category: {
                        field: 'category/text()',
                        type: types.STRING,
                        editable: false
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

                blogListDataSource.data(e.sender.data());
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
     * ViewModel for blogNavigationView
     * @type {*}
     */
    app.blogNavigationViewModel = kendo.observable({
        _categories : categoriesDataSource,
        categories: function () {
            return this.get('_categories').view();
        },
        _archive: archiveDataSource,
        archive: function () {
            return this.get('_archive').view();
        }
    });

    /**
     * ViewModel for blogListView
     * @type {*}
     */
    app.blogListViewModel = kendo.observable({
        list: blogListDataSource
    });

    /**
     * ViewModel for pageView and blogPostView
     * @type {*}
     */
    app.contentViewModel = kendo.observable({
        url: '', //the html page
        contentUrl: '', //the markdown file
        title: '',
        author: '',
        pubDate: Date.now(),
        identifier: ''
    });

}(jQuery));


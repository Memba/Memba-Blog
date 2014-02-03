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
        app.localize(app.config);

        // Views and layouts
        var applicationLayout = new kendo.Layout(elements.APPLICATION_LAYOUT),
            headerView = new kendo.View(elements.HEADER_VIEW, { model: app.searchViewModel }),
            footerView = new kendo.View(elements.FOOTER_VIEW),
            pageView = new kendo.View(elements.PAGE_VIEW, { model: app.pageViewModel }),
            searchView = new kendo.View(elements.SEARCH_VIEW, { model: app.searchViewModel }),
            errorView = new kendo.View(elements.ERROR_VIEW),
            blogNavigationView = new kendo.View(elements.BLOG_NAVIGATION_VIEW, { model: app.blogNavigationViewModel }),
            blogListView = new kendo.View(elements.BLOG_LIST_VIEW, { model: app.blogListViewModel }),
            blogPostView = new kendo.View(elements.DETAIL_VIEW, { model: app.blogPostViewModel }),

            //Initialize router
            router = new kendo.Router({
                init: function () {
                    applicationLayout.render(elements.APPLICATION_ROOT);
                    applicationLayout.showIn(elements.APPLICATION_HEADER, headerView);
                    applicationLayout.showIn(elements.APPLICATION_FOOTER, footerView);
                    applicationLayout.showIn(elements.APPLICATION_SIDE, blogNavigationView);
                    //applicationLayout.showIn(elements.APPLICATION_CONTENT, blogListView);
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
                    applicationLayout.showIn(elements.APPLICATION_CONTENT, errorView);
                }
            });

        if(DEBUG && global.console) {
            console.log(MODULE + 'views and router initialized');
        }

        //Routes like /
        router.route(routes.HOME, function () {
            //if config designates a home page, show it
            if($.type(app.config.home) === types.STRING && app.config.home.length > 0) {
                app.pageViewModel.set('contentUrl', app.config.home);
                applicationLayout.showIn(elements.APPLICATION_CONTENT, pageView);
                blogNavigationView.hide();
            } else { //otherwise list blog posts (same as /blog)
                var blogListDataSource = app.blogListViewModel.get('list');
                blogListDataSource.filter(null);
                if (!blogListDataSource.sort()) {
                    blogListDataSource.sort({ field: 'pubDate', dir: 'desc' });
                }
                blogListDataSource.pageSize(storage.get(constants.PAGE_SIZE) || constants.DEFAULT_PAGE_SIZE);
                applicationLayout.showIn(elements.APPLICATION_CONTENT, blogListView);
                applicationLayout.showIn(elements.APPLICATION_SIDE, blogNavigationView);
            }
        });

        router.route(routes.PAGE, function(page) {
            app.pageViewModel.set('contentUrl', './pages/' + page + constants.MARKDOWN_EXT);
            applicationLayout.showIn(elements.APPLICATION_CONTENT, pageView);
            blogNavigationView.hide();
        });

        //Routes like /category/Design
        router.route(routes.CATEGORY, function (category) {
            var blogListDataSource = app.blogListViewModel.get('list');
            blogListDataSource.filter( { field: 'category', operator: 'eq', value: category });
            blogListDataSource.pageSize(storage.get(constants.PAGE_SIZE) || constants.DEFAULT_PAGE_SIZE);
            applicationLayout.showIn(elements.APPLICATION_CONTENT, blogListView);
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
                    app.blogPostViewModel.set('contentUrl', hrefs.ARCHIVE + year + constants.PATH_SEP + month + constants.PATH_SEP + slug + constants.MARKDOWN_EXT);
                    app.blogPostViewModel.set('title', found[0].title);
                    app.blogPostViewModel.set('author', found[0].author);
                    app.blogPostViewModel.set('pubDate', kendo.toString(found[0].pubDate, constants.DATE_FORMAT));
                    applicationLayout.showIn(elements.APPLICATION_CONTENT, blogPostView);
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
            }
            applicationLayout.showIn(elements.APPLICATION_SIDE, blogNavigationView);
        });

        //Routes like /guid/569114ED-9700-4439-825F-C4A5FE2DC42E
        router.route(routes.GUID, function (guid) {
            var blogListDataSource = app.blogListViewModel.get('list');
            var found = blogListDataSource.get(guid);
            if (found) {
                var rx = new RegExp(routes.HASH + routes.BLOG
                    .replace(routes.YEAR_PARAMETER, '([^/]+)')
                    .replace(routes.MONTH_PARAMETER, '([^/]+)')
                    .replace(routes.SLUG_PARAMETER, '([^/]+)') + '$');
                var matches = rx.exec(found.link);
                app.blogPostViewModel.set('url', hrefs.ARCHIVE + matches[1] + constants.PATH_SEP + matches[2] + constants.MARKDOWN_EXT);
                app.blogPostViewModel.set('title', found.title);
                app.blogPostViewModel.set('author', found.author);
                app.blogPostViewModel.set('pubDate', kendo.toString(found.pubDate, constants.DATE_FORMAT));
                applicationLayout.showIn(elements.APPLICATION_CONTENT, blogPostView);
                applicationLayout.showIn(elements.APPLICATION_SIDE, blogNavigationView);
            }
        });

        //routes like /search
        router.route(routes.SEARCH, function() {
            applicationLayout.showIn(elements.APPLICATION_CONTENT, searchView);
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
        pageView.bind(events.INIT, function(e) {
            //Handler bound to the change event of the markdown widget to set the page meta tags
            e.sender.element.find('[data-role=markdown]').data('kendoMarkDown').bind(events.CHANGE, function(e) {
                if (DEBUG && global.console.log) {
                    global.console.log(MODULE + 'new markdown loaded');
                }
                app.setMetaTags(e.sender.metadata(), app.config);
            });
        });

        blogPostView.bind(events.INIT, function(e) {
            //Handler bound to the change event of the markdown widget to set the page meta tags
           e.sender.element.find('[data-role=markdown]').data('kendoMarkDown').bind(events.CHANGE, function(e) {
                if (DEBUG && global.console.log) {
                    global.console.log(MODULE + 'new markdown loaded');
                }
                app.setMetaTags(e.sender.metadata(), app.config);
            });
        });

        blogNavigationView.bind(events.SHOW, function(e) {
            if (DEBUG && global.console.log) {
                global.console.log(MODULE + 'blog navigation shown');
            }
            $(elements.APPLICATION_CONTENT).removeClass('col-lg-12 col-md-12 col-sm-12');
            $(elements.APPLICATION_CONTENT).addClass('col-lg-10 col-md-9 col-sm-8 spacing');
            $(elements.APPLICATION_SIDE).removeClass('hidden');
            $(elements.APPLICATION_SIDE).addClass('col-lg-2 col-md-3 col-sm-4');
        });

        blogNavigationView.bind(events.HIDE, function(e) {
            if (DEBUG && global.console.log) {
                global.console.log(MODULE + 'blog navigation hidden');
            }
            $(elements.APPLICATION_CONTENT).removeClass('col-lg-10 col-md-9 col-sm-8 spacing');
            $(elements.APPLICATION_CONTENT).addClass('col-lg-12 col-md-12 col-sm-12');
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


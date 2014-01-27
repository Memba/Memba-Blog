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

        //Add routes
        var homeRouteHandler = function () {
            var listDataSource = app.listViewModel.get('list');
            listDataSource.filter(null);
            if (!listDataSource.sort()) {
                listDataSource.sort({ field: 'pubDate', dir: 'desc' });
            }
            listDataSource.pageSize(storage.get(constants.PAGE_SIZE) || constants.DEFAULT_PAGE_SIZE);
            applicationLayout.showIn(elements.CONTENT_SECTION, listView);
        };
        router.route(routes.HOME, homeRouteHandler);
        var categoryRouteHandler = function (category) {
            var listDataSource = app.listViewModel.get('list');
            listDataSource.filter( { field: 'category', operator: 'eq', value: category });
            listDataSource.pageSize(storage.get(constants.PAGE_SIZE) || constants.DEFAULT_PAGE_SIZE);
            applicationLayout.showIn(elements.CONTENT_SECTION, listView);
        };
        router.route(routes.CATEGORY, categoryRouteHandler);
        var archiveRouteHandler = function (period) {
            var listDataSource = app.listViewModel.get('list');
            if (period.length < 6) {
                listDataSource.filter({ field: 'period', operator: 'startswith', value: period });
            } else {
                listDataSource.filter({ field: 'period', operator: 'eq', value: period });
            }
            listDataSource.pageSize(storage.get(constants.PAGE_SIZE) || constants.DEFAULT_PAGE_SIZE);
            applicationLayout.showIn(elements.CONTENT_SECTION, listView);
        };
        router.route(routes.ARCHIVE, archiveRouteHandler);
        var detailRouteHandler = function (year, month, slug) {
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
        };
        router.route(routes.DETAIL, detailRouteHandler);
        var guidRouteHandler = function (guid) {
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
        };
        router.route(routes.GUID, guidRouteHandler);
        var searchRouteHandler = function() {
            applicationLayout.showIn(elements.CONTENT_SECTION, searchView);
        };
        router.route(routes.SEARCH, searchRouteHandler);
        /*
         * We call the following rootRouteHandler but we might as well have called it googleRouteHandler
         * because it is all about compatibility with the Google Ajax crawling scheme
         * See: https://developers.google.com/webmasters/ajax-crawling/docs/getting-started
         * See http://ajax.rswebanalytics.com/
         */
        var rootRouteHandler = function(params) {
            if (!params[constants.ESC_FRAGMENT]
                && global.location.search.indexOf(constants.ESC_FRAGMENT) < 0) { //not a URL like index.html?_escaped_fragment=...............
                homeRouteHandler();
            } else { //URL like index.html?_escaped_fragment=...............
                var frag = params[constants.ESC_FRAGMENT]; //If kendo.Router was working properly, we should find params._escaped_fragment
                if(!frag) { //unfortunately, we need this hack because it does not return such value
                    var search = function() {
                        var s = global.location.search.substr(1),
                            p = s.split(/\&/), l = p.length, kv, r = {};
                        if (l === 0) {return false;}
                        while (l--) {
                            kv = p[l].split(/\=/);
                            r[kv[0]] = decodeURIComponent(kv[1] || '') || true;
                        }
                        return r;
                    }();
                    frag = search[constants.ESC_FRAGMENT];
                }
                //we need to compare frag against the router's existing routes
                $.each(router.routes, function(index, value) {
                    var rx = new RegExp(value.route.source.replace('^!/', '^/')),
                        matches = rx.exec(frag);
                    if($.isArray(matches)) {
                        value._callback(matches[1], matches[2], matches[3], matches[4]); //more matches required?
                        return false; //break for loop
                    }
                });
            }
        };
        router.route(routes.ROOT, rootRouteHandler);
        //Start router
        router.start();

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

    });

}(jQuery));


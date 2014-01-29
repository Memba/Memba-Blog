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
        types = app.types,

        WRAP_OPEN = '<wrap>',
        WRAP_CLOSE = '</wrap>',

        DEBUG = true,
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
            //TODO: logo
            //wrap.find(elements.HEADER_VIEW_NAVBAR_BRAND).html(resources.HEADER_VIEW_NAVBAR_BRAND);
            wrap.find(elements.HEADER_VIEW_NAVBAR_TOGGLE).html(config.navigation.toggle);
            if (Modernizr.input.placeholder) {
                wrap.find(elements.HEADER_VIEW_NAVBAR_SEARCH_INPUT).attr(tags.PLACEHOLDER, config.search.placeholder);
            }
            wrap.find(elements.HEADER_VIEW_NAVBAR_SEARCH_BUTTON).html(config.search.button);
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
            wrap.find(elements.ALL_POSTS_SECTION_TITLE).html(config.navigation.allposts);
            wrap.find(elements.CATEGORIES_SECTION_TITLE).html(config.navigation.categories);
            wrap.find(elements.ARCHIVE_SECTION_TITLE).html(config.navigation.archive);
            wrap.find(elements.RSS_SECTION_TITLE)
                .html(config.navigation.rssfeed)
                .attr(tags.HREF, hrefs.ARCHIVE + hrefs.RSS);
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
     * Used metaData and default form config to set page meta tags
     * @method app.setMetaTags
     * @param metaData
     * @param config
     */
    app.setMetaTags = function(metaData, config) {

    };

}(jQuery));
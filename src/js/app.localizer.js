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

        var locale = resources.LOCALE || (global.navigator.userLanguage || global.navigator.language).substr(0, 2);
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

}(jQuery));
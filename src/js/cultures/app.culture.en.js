/*Copyright ©2013-2014 Memba® Sarl. All rights reserved.*/
/*jslint browser:true*/
/*jshint browser:true*/

(function () {

    "use strict";

    var fn = Function,
        global = fn('return this')(),
        kendo = global.kendo,
        app = global.app,
        hrefs = app.hrefs,
        routes = app.routes;

    //application i18n resources
    app.resources =  $.extend(app.resources || {}, {
        LOCALE: 'en',

        //Application layout

        // Header - Navigation Bar
        HEADER_VIEW_NAVBAR_BRAND: 'Blog Engine', //TODO: add Memba Logo
        HEADER_VIEW_NAVBAR_TOGGLE: 'Toggle navigation',
        HEADER_VIEW_NAVBAR_SEARCH_INPUT: 'Search',
        HEADER_VIEW_NAVBAR_SEARCH_BUTTON: 'Go',
        HEADER_VIEW_NAVBAR_MENU: [
            { text: 'Explore', items: [
                { text: 'All Posts', href: hrefs.INDEX + routes.HASH + routes.HOME },
                { text: 'FAQs', href: hrefs.INDEX + routes.HASH + routes.FAQS }
            ] }
        ],

        //Footer
        FOOTER_VIEW_COPYRIGHT: 'Copyright &copy;Memba 2013-2014. All rights reserved.',

        //Side sections
        ALL_POSTS_SECTION_TITLE: '<i class="fa fa-home"></i>&nbsp;All Posts',
        CATEGORIES_SECTION_TITLE: '<i class="fa fa-tags"></i>&nbsp;Categories',
        ARCHIVE_SECTION_TITLE: '<i class="fa fa-calendar"></i>&nbsp;Archive',
        RSS_SECTION_TITLE: '<i class="fa fa-rss-square"></i>&nbsp;RSS Feed',

        //List View
        ARTICLE_READMORE: 'Read full article&nbsp;<i class="fa fa-caret-square-o-right"></i>',

        //Detail View

        //Search View

        //FAQs View

        //Error View
        ERROR_VIEW_TITLE: 'Error 404',
        ERROR_VIEW_MESSAGE: 'We are sorry, the page that you requested cannot be found. The URL may have been misspelled or the page that you\'re looking may no longer be available.',

        //Dummy
        DUMMY: 'dummy'
    });

}());
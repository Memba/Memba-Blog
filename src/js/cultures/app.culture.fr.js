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

    /**
     * Application i18n resources
     * @type {*}
     */
    app.resources =  $.extend(app.resources || {}, {
        LOCALE: 'fr', ////See special characters at http://www.ascii.cl/htmlcodes.htm

        //Application layout

        //Header - Navigation Bar
        HEADER_VIEW_NAVBAR_BRAND: 'Blog Engine', //TODO: Add Memba Logo
        HEADER_VIEW_NAVBAR_TOGGLE: 'Déployer la navigation',
        HEADER_VIEW_NAVBAR_SEARCH_INPUT: 'Recherche',
        HEADER_VIEW_NAVBAR_SEARCH_BUTTON: 'Go',
        HEADER_VIEW_NAVBAR_MENU: [
            { text: 'Explorer', items: [
                { text: 'Publications', href: hrefs.INDEX + routes.HASH + routes.HOME },
                { text: 'FAQs', href: hrefs.INDEX + routes.HASH + routes.FAQS }
            ] }
        ],

        //Footer
        FOOTER_VIEW_COPYRIGHT: 'Copyright &copy; Memba 2013-2014. Tous droits réservés.',

        //Side sections
        ALL_POSTS_SECTION_TITLE: '<i class="fa fa-home"></i>&nbsp;Publications',
        CATEGORIES_SECTION_TITLE: '<i class="fa fa-tags"></i>&nbsp;Catégories',
        ARCHIVE_SECTION_TITLE: '<i class="fa fa-calendar"></i>&nbsp;Archive',
        RSS_SECTION_TITLE: '<i class="fa fa-rss-square"></i>&nbsp;Flux RSS',

        //List View
        ARTICLE_READMORE: 'Lire l\'intgralité&nbsp;<i class="fa fa-caret-square-o-right"></i>',

        //Detail View

        //Search View

        //FAQs View

        //Dummy
        DUMMY: 'toto'
    });

}());
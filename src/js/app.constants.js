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

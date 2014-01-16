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
        ARCHIVE: './archive/',
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

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

        DEBUG = true,
        MODULE = 'app.index.viewmodels.js: ';

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
     * ViewModel for pageView
     * @type {*}
     */
    app.pageViewModel = kendo.observable({
        contentUrl: ''
    });

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
     * ViewModel for blogPostView
     * @type {*}
     */
    app.blogPostViewModel = kendo.observable({
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
                url = that.bindings.url.get(), //get the value from blogPostViewModel
                widget = $(that.element).data('kendoMarkDown');
            if (widget instanceof kendo.ui.MarkDown) {
                widget.url(url); //update the widget url
            }
        }
    });

}(jQuery));


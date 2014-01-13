//Copyright ©2012-2013 Memba® Sarl. All rights reserved.
/*jslint browser:true, jquery:true*/
/*jshint browser:true, jquery:true*/

(function ($, undefined) {

	"use strict";

    // shorten references to variables for uglification
    var fn = Function,
        global = fn('return this')(),
        //$ = global.jQuery,
        /**
         * @module kendo
         * @requires jQuery, kendo
         */
        kendo = global.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        STRING = 'string',
        //Events
        CHANGE = 'change';


    /*******************************************************************************************
     * Bread Crumb
     * TODO: Remove dataSource
     *******************************************************************************************/

    /**
     * Bread Crumb (kendoBreadCrumb)
     * @class BreadCrumb
     * @extend Widget
     */
    var BreadCrumb = Widget.extend({

        /**
         * Initializes the widget
         * @method init
         * @param element
         * @param options
         */
        init: function (element, options) {
            var that = this;
            options = options || {};
            kendo.logToConsole('Initializing kendoBreadCrumb custom widget');
            Widget.fn.init.call(that, element, options);
            that._dataSource();
            that._layout();
        },

        /**
         * Widget options
         * @property options
         */
        options: {
            name: "BreadCrumb",
            items: null, //Breadcrumb items have 2 properties: text and href
            dataSource: null //and not source (exception to the data-X parsing)
        },

        /**
         * Binds the widget to the change event of the data source
         * @method _dataSource
         * @private
         */
        _dataSource: function () {

            var that = this;

            if (that.options.dataSource) {
                if (that._refreshHandler) {
                    that.options.dataSource.unbind(CHANGE, that._refreshHandler);
                }
                else {
                    that._refreshHandler = $.proxy(that.refresh, that);
                }

                // bind to the change event to refresh the widget
                that.options.dataSource.bind(CHANGE, that._refreshHandler);
            }
        },

        /**
         * Sets the dataSource
         * @method setDataSource
         * @param dataSource
         */
        setDataSource: function(dataSource) {
            // set the internal datasource equal to the one passed in by MVVM
            // make sure it is observable though to subscribe to its change event
            this.options.dataSource = kendo.observable(dataSource);
            // rebuild the datasource if necessary, or just reassign
            this._dataSource();
        },

        /**
         * Template used to build the widget
         * SEE: http://www.jankoatwarpspeed.com/examples/breadcrumb/
         * @property _template
         * @private
         */
        _template: '<ul>' +
                   '# for (var i = 0; i < data.{0}.length; i++) { #' +
                        '# if (data[data.{0}[i].text]) { #' + //if this is a recognized property or method of app.viewModel, data-bind
                            '<li><a data-href="#= data.{0}[i].href #" data-bind="text: #= data.{0}[i].text #"></a></li>' +
                        '# } else { #' + //otherwise, simply display text
                            '<li><a data-href="#= data.{0}[i].href #">#= data.{0}[i].text #</a></li>' +
                        '# } #' +
                   '# } #' +
                   '<ul>',

        /**
         * Builds the widget layout
         * @method _layout
         * @private
         */
        _layout: function () {
            var that = this,
                template = null;
            that._clear();
            //TODO: Check that that.element si a DIV or UL, assuming a DIV here
            $(that.element).addClass('k-widget k-breadcrumb');
            if(that.options.dataSource) {
                if ($.type(that.options.items) === STRING && $.trim(that.options.items).length > 0) {
                    var items = that.options.dataSource.get(that.options.items);
                    //TODO: See if we can replace the isArray function
                    if (isArray(items) && items.length > 0) {
                        template = kendo.template(kendo.format(that._template, that.options.items));
                        $(that.element).html(template(that.options.dataSource));
                        //find the closest pane
                        var pane = that.element.closest(kendo.roleSelector('pane'));
                        if (pane) {
                            pane = pane.data('kendoMobilePane');
                            $(that.element).find('a').click(function(e) {
                                e.preventDefault();
                                pane.navigate($(e.delegateTarget).attr('data-href'));
                            });
                        } else {
                            $(that.element).find('a').click(function(e) {
                                e.preventDefault();
                                window.location.href = $(e.delegateTarget).attr('data-href');
                            });
                        }
                        kendo.bind($(that.element), that.options.dataSource);
                    }
                }
            } else {
                $.noop(); //TODO
                //if (isArray(that.options.items) && that.options.items.length > 0) {
                //    template = kendo.template(kendo.format(that._template, that.options.items));
                //    $(that.element).html(template(that.options.dataSource));
                //}
            }
        },

        /**
         * Refreshes the widget as changes are made to the data source
         * @method refresh
         * @param e {Object} the change event triggered by the observable dataSource
         */
        refresh: function (e) {
            var that = this;
            if (($.type(e.field) === STRING) && (e.field === that.options.items)) {
                that._layout();
            }
        },

        /**
         * Clears the DOM from modifications made by the widget
         * @method _clear
         * @private
         */
        _clear: function() {
            var that = this;
            //unbind descendant events
            $(that.element).find('*').off();
            //clear element
            $(that.element)
                .empty()
                .off()
                .removeClass('k-widget k-breadcrumb');
        },

        /**
         * Destroys the widget including bounds to the data source
         * @method destroy
         */
        destroy: function () {
            var that = this;
            that._clear();
            Widget.fn.destroy.call(this);
            if (that.options.dataSource) {
                if (that._refreshHandler) {
                    that.options.dataSource.unbind(CHANGE, that._refreshHandler);
                }
            }
        }
    });

    ui.plugin(BreadCrumb);


    /**
     * Tests whether arr is an array (works with kendo UI ObservableArray contrary to $.isArray)
     * @method isArray
     * @private
     * @param arr {*} the object or value to test
     * @return {Boolean}
     */
    function isArray(arr) {
        return ((typeof arr === 'object') && (arr.length) && (arr.pop) && (arr.push) && (arr.shift));
    }


} (jQuery));;
//Copyright ©2012-2013 Memba® Sarl. All rights reserved.
/*jslint browser:true, jquery:true*/
/*jshint browser:true, jquery:true*/

(function ($, undefined) {

	"use strict";

    // shorten references to variables for uglification
    var fn = Function,
        global = fn('return this')(),
        //$ = global.jQuery,
        /**
         * @module kendo
         * @requires jQuery, kendo
         */
        kendo = global.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        //Events
        CHANGE = 'change',
        DBLCLICK = 'dblclick';

    /*******************************************************************************************
     * Icon Selector
     *******************************************************************************************/

    /**
     * Icon Selector (kendoIconSelector)
     * @class IconSelector
     * @extend Widget
     */
    var IconSelector = Widget.extend({

        /**
         * Initializes the widget
         * @method init
         * @param element
         * @param options
         */
        init: function (element, options) {
            var that = this;
            options = options || {};
            Widget.fn.init.call(that, element, options);
            that._dataSource();
            that._layout();
        },

        /**
         * Widget options
         * @property options
         */
        options: {
            name: "IconSelector",
            icon: null, //selected icon
            path: null,  //path to icons
            dataSource: null, //and not source (exception to the data-X parsing)
            autoBind: true //TODO: what is this used for?
        },

        /**
         * Get or sets the selected icon
         * @method icon
         * @param value
         * @returns {*}
         */
        icon: function (value) {
            var that = this;
            if (value) {
                //check value is of type string
                that.options.value = value;
                //that.refresh();
                return;
            }
            else {
                return that.options.value;
            }
        },

        /**
         * Gets or sets the path to an XML or JSON stream listing the icons to display
         * @method path
         * @param value
         * @returns {null}
         */
        path: function (value) {
            var that = this;
            if (value) {
                //check value is of type path + add '/' at the end
                that.options.path = value;
                //TODO: set the dataSource
                //that.refresh();
                return;
            }
            else {
                return that.options.path;
            }
        },

        /**
         * Binds the widget to the change event of the data source
         * @method _datasSource
         * @private
         */
        _dataSource: function () {

            var that = this;

            if (that.options.dataSource) {
                if (that._refreshHandler) {
                    that.options.dataSource.unbind(CHANGE, that._refreshHandler);
                }
                else {
                    that._refreshHandler = $.proxy(that.refresh, that);
                }

                // bind to the change event to refresh the widget
                that.options.dataSource.bind(CHANGE, that._refreshHandler);
            }
        },

        /**
         * Sets the dataSource
         * @method setDataSource
         * @param dataSource
         */
        setDataSource: function(dataSource) {
            // set the internal datasource equal to the one passed in by MVVM
            this.options.dataSource = dataSource;
            // rebuild the datasource if necessary, or just reassign
            this._dataSource();
        },

        /**
         * Builds the widget layout
         * @method _layout
         * @private
         */
        _layout: function () {
            var that = this;
            $('li > img', that.element).unbind(DBLCLICK);
            $(that.element).empty();
            $(that.element).addClass('k-widget k-iconselector');
            $(that.element).append('<ul>');
            var icons = [
                'error32.png',
                'info32.png',
                'success32.png',
                'warning32.png'
            ];
            //TODO: this Widget needs to get an array of icons
            //then it needs to calculate the space available on screen
            //to draw a maximum of icons without triggering an overflow
            //The result is the size of a page
            //Then we need to implement swipe events to swipe between pages
            //See http://demos.kendoui.com/mobile/swipe/index.html
            //Note the page displayed by default is the page
            //which has the icon selected (databinding)
            //we might consider displaying the IconSelector
            //in an action sheet or in a modal view
            //See: http://demos.kendoui.com/mobile/actionsheet/index.html
            //We will see which is the most usable
            //A pager like in the dataGrid would also be great
            $.each(icons, function(index, value) {
                $(that.element).append('<li class="k-iconselector-icon"><img src="' + that.options.path + value + '" /></li>');
            });
            $(that.element).append('</ul>');
            $('img[src="' + that.options.dataSource.get(that.options.icon) + '"]', that.element).closest('li').removeClass('k-iconselector-icon').addClass('k-iconselector-selected');
            $('li > img', that.element).bind(DBLCLICK, function(e) {
                if (that.options.dataSource.get(that.options.icon) !== $(e.currentTarget).attr('src')) {
                    $('li', $(that.element)).removeClass('k-iconselector-selected').addClass('k-iconselector-icon');
                    that.options.dataSource.set(that.options.icon, $(e.currentTarget).attr('src'));
                    $(e.currentTarget).closest('li').removeClass('k-iconselector-icon').addClass('k-iconselector-selected');
                }
            });
        },

        /**
         * Refreshes the widget as changes are made to the data source
         * @method refresh
         * @param e {Object} the change event triggered by the observable dataSource
         */
        refresh: function(e) {
            $.noop();
        },

        /**
         * Clears the DOM from modifications made by the widget
         * @method _clear
         * @private
         */
        _clear: function() {
            var that = this;
            //unbind descendant events
            $(that.element).find('*').off();
            //clear element
            $(that.element)
                .empty()
                .off()
                .removeClass('k-widget k-iconselector');
        },

        /**
         * Destroys the widget including bounds to the data source
         * @method destroy
         */
        destroy: function () {
            var that = this;
            that._clear();
            Widget.fn.destroy.call(this);
            if (that.options.dataSource) {
                if (that._refreshHandler) {
                    that.options.dataSource.unbind(CHANGE, that._refreshHandler);
                }
            }
        }
    });

    ui.plugin(IconSelector);

} (jQuery));;
//Copyright ©2012-2013 Memba® Sarl. All rights reserved.
/*jslint browser:true, jquery:true*/
/*jshint browser:true, jquery:true*/

(function ($, undefined) {

	"use strict";

    // shorten references to variables for uglification
    var fn = Function,
        global = fn('return this')(),
        /**
         * @module kendo
         * @requires jQuery, kendo
         */
        kendo = global.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        STRING = 'string',
        //Type
        TYPE_HIDDEN = 'hidden',
        TYPE_INFO = 'info',
        TYPE_WARNING = 'warning',
        TYPE_ERROR = 'error',
        TYPE_SUCCESS = 'success',
        //Text
        DEFAULT_VALUE = 'Default message for an information box',
        //Events
        CHANGE = 'change';

    /**
     * Enable binding the type value of an InfoBox widget
     * @type {*|void}
     */
    kendo.data.binders.widget.type = kendo.data.Binder.extend({
        init: function(widget, bindings, options) {
            //call the base constructor
            kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
        },
        refresh: function() {
            var that = this,
                value = that.bindings.type.get(); //get the value from the View-Model
            $(that.element).data('kendoInfoBox').type(value); //update the widget
        }
    });

    /*******************************************************************************************
     * Information Box
     *******************************************************************************************/

    /**
     * Information Box (kendoInfoBox)
     * @class InfoBox
     * @extend Widget
     */
    var InfoBox = Widget.extend({

        /**
         * Initializes the widget
         * @method init
         * @param element
         * @param options
         */
        init: function (element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);
            that._layout();
        },

        /**
         * Widget options
         * @property options
         */
        options: {
            name: "InfoBox",
            type: TYPE_INFO, //hidden, info, warning, error, success
            value: DEFAULT_VALUE
        },

        /**
         * Type defines the icon of the information box and can be any of 'hidden', 'info', 'warning', 'error', 'success' or a data bound value
         * @method type
         * @param value
         * @return {*}
         */
        type: function (value) {
            var that = this;
            if (value) {
                if($.type(value) !== STRING) {
                    throw new TypeError();
                }
                if ($.inArray(value, [TYPE_INFO, TYPE_WARNING, TYPE_ERROR, TYPE_SUCCESS]) < 0 ) {
                    value = TYPE_HIDDEN;
                }
                if(that.options.type !== value) {
                    that.options.type = value;
                    that.refresh();
                }
            }
            else {
                return that.options.type;
            }
        },

        /**
         * Text to be displayed in the information box
         * @method text
         * @param value
         * @return {*}
         */
        value: function (value) {
            var that = this;
            if (value) {
                if($.type(value) !== STRING) {
                    throw new TypeError();
                }
                if(that.options.value !== value) {
                    that.options.value = value;
                    that.refresh();
                }
            }
            else {
                return that.options.value;
            }
        },


        /**
         * Binds the widget to the change event of the data source
         * @method _dataSource
         * @private
        _dataSource: function () {
            var that = this;
            if (that.options.dataSource) {
                if (that._refreshHandler) {
                    that.options.dataSource.unbind(CHANGE, that._refreshHandler);
                }
                else {
                    that._refreshHandler = $.proxy(that.refresh, that);
                }
                // bind to the change event to refresh the widget
                that.options.dataSource.bind(CHANGE, that._refreshHandler);
            }
        },

         * Sets the dataSource
         * @method setDataSource
         * @param dataSource
        setDataSource: function(dataSource) {
            // set the internal datasource equal to the one passed in by MVVM
            this.options.dataSource = dataSource;
            // rebuild the datasource if necessary, or just reassign
            this._dataSource();
        },
        */

        /**
         * Builds the widget layout
         * @method _layout
         * @private
         */
        _layout: function () {
            //CONSIDER check whether values have actually changed before executing and optimize in the case only text has changed
            //Styling inspired from http://www.jankoatwarpspeed.com/post/2008/05/22/CSS-Message-Boxes-for-different-message-types.aspx
            var that = this;
            that._clear();
            $(that.element).addClass('k-widget k-infobox');
            //Update text
            $(that.element).html(that.value());
            //Update type
            switch(that.type()) {
                case TYPE_INFO:
                    $(that.element).addClass('k-infobox-info').removeClass('k-infobox-warning k-infobox-error k-infobox-success').show();
                    break;
                case TYPE_WARNING:
                    $(that.element).addClass('k-infobox-warning').removeClass('k-infobox-info k-infobox-error k-infobox-success').show();
                    break;
                case TYPE_ERROR:
                    $(that.element).addClass('k-infobox-error').removeClass('k-infobox-info k-infobox-warning k-infobox-success').show();
                    break;
                case TYPE_SUCCESS:
                    $(that.element).addClass('k-infobox-success').removeClass('k-infobox-info k-infobox-warning k-infobox-error').show();
                    break;
                //case TYPE_HIDDEN:
                default:
                    $(that.element).hide();
                    break;
            }

            //Bind a handler for the change event to update stars when value is changed
            that.bind(CHANGE, $.proxy(that.refresh, that));
        },

        /**
         * Refreshes the widget
         * @method refresh
         * @param e {Object} the change event triggered by the observable dataSource
         */
        refresh: function(e) {
            var that = this;
            if (!e) {  //forced refresh
                that._layout();
            } else {
                //Changes to the dataSource affect the databound fields
                if(($.type(e.field) === STRING) && ((that.options.text.indexOf(e.field) > -1) || (that.options.type.indexOf(e.field) > -1))) {
                    that._layout();
                }
            }
        },

        /**
         * Clears the DOM from modifications made by the widget
         * @method _clear
         * @private
         */
        _clear: function() {
            var that = this;
            that.unbind(CHANGE);
            //unbind descendant events
            $(that.element).find('*').off();
            //clear element
            $(that.element)
                .empty()
                .off()
                .removeClass('k-widget k-infobox');
        },

        /**
         * Destroys the widget including bounds to the data source
         * @method destroy
         */
        destroy: function () {
            var that = this;
            that._clear();
            Widget.fn.destroy.call(this);
        }

	});

	ui.plugin(InfoBox);

} (jQuery));;
//Copyright ©2012-2013 Memba® Sarl. All rights reserved.
/*jslint browser:true, jquery:true*/
/*jshint browser:true, jquery:true*/

/*
 * We have looked at 3 libraries to parse markdown:
 * https://github.com/chjj/marked
 * https://github.com/evilstreak/markdown-js
 * https://github.com/coreyti/showdown
 *
 * Based on sole activity, we have discarded showdown.
 * Considering our ultimate goal is to use markdown in blogs
 * we have favoured marked.js over markdown.js because
 * marked.js permits embedding html, including video objects
 * See: See https://github.com/chjj/marked/issues/294
 * Also marked.js is used in reveal.js
 */

(function ($, undefined) {

    "use strict";

    // shorten references to variables for uglification
    var fn = Function,
        global = fn('return this')(),
        kendo = global.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        NULL = null,
        STRING = 'string',
        EMPTY_STRING = '',
        LF = '\n',
        COLON = ':',
        SCRIPT_SELECTOR = 'script[type="text/plain"]',
        SCRIPT_TAG = '<script type="text/plain"></script>',
        WRAP_TAG = '<wrap></wrap>',
        CLASS = 'k-markdown',
        METADATA = 'metadata',
        CHANGE = 'change';

    /**
     * MarkDown Widget (kendoMarkDown)
     * @class MarkDown
     * @extend Widget
     */
    var MarkDown = Widget.extend({

        /**
         * Initializes the widget
         * @method init
         * @param element
         * @param options
         */
        init: function(element, options) {
            var that = this;
            kendo.ui.Widget.fn.init.call(that, element, options);
            that.element.addClass(CLASS);
            that._inline();
            that.refresh();
        },

        /**
         * Widget options
         * @property options
         */
        options: {
            name: 'MarkDown',
            value: NULL,
            url: NULL
        },

        /**
         * Widgets events
         * @property events
         */
        events: [
            /**
             * Changing the html display by changing the markdown raises the change event
             * if using a viewModel, wire to the change event of the kendo.observable
             * @event change
             */
            CHANGE
        ],

        /**
         * Url of external markdown to be displayed
         * @method url
         * @param value
         * @returns {null}
         */
        url: function (value) {
            var that = this;
            if (value) {
                if($.type(value) !== STRING) {
                    throw new TypeError();
                }
                if(that.options.url !== value) {
                    that.options.url = value;
                    $.get(that.options.url, function(data) {
                        that.value(data); //that.value does the UI refresh
                    });
                }
            }
            else {
                return that.options.url;
            }
        },

        /**
         * Markdown to be displayed
         * @method value
         * @param value
         * @returns {null}
         */
        value: function (value) {
            var that = this;
            if (value) {
                if($.type(value) !== STRING) {
                    throw new TypeError();
                }
                if(that.options.value !== value) {
                    that.options.value = value;
                    that.refresh();
                    that.trigger(CHANGE);
                    // trigger the DOM change event so any subscriber gets notified
                    that.element.trigger(CHANGE);
                }
            }
            else {
                return that.options.value || EMPTY_STRING;
            }
        },

        /**
         * metadata
         * @method metadata
         * @returns {*}
         */
        metadata: function () {
            var that = this,
                el = that.element;
            return el.data(METADATA) || {};
        },

        /**
         * Html displayed
         * @method html
         * @returns {*}
         */
        html: function () {
            var that = this,
                el = that.element,
                buf = that.value().trim().replace(/\r\n/gm, LF).replace(/\r/gm, LF),
                markdown = EMPTY_STRING;
            if ($.type(buf) === STRING) {
                markdown = buf;
                var posLFLF = buf.indexOf(LF + LF);
                //key value pairs need to be separated from markdown by two line feeds
                if(posLFLF>0) {
                    var hasMetaData = false,
                        rawMetaData = buf.substr(0, posLFLF).trim(),
                        lines = rawMetaData.split(LF).length,
                        //key value pairs are in the form key: value\n
                        regex = /^(?:\s*)(\w+)(?:\s*)\:(?:\s*)([^\r\n]+)(?:\s*)$/gm,//TODO: improve
                        matches = [];
                    if(regex.test(rawMetaData)) {
                        matches = rawMetaData.match(regex);
                        hasMetaData = (matches.length === lines);
                    }
                    if(hasMetaData) {
                        markdown = buf.substr(posLFLF + 2).trim();
                        var metaData = {};
                        $.each(matches, function(index, match) {
                            try {
                                var posCOL = match.indexOf(COLON);
                                metaData[match.substr(0,posCOL).trim()] = match.substr(posCOL+1).trim();
                            } catch (err) {}
                        });
                        el.data(METADATA, metaData);
                    }
                }
            }
            global.marked.setOptions({
                highlight: function (code, lang) {
                    return hljs.highlightAuto(code).value;
                }
            });
            return global.marked(markdown);
        },

        /**
         * Reads the markdown text in an inline script
         * @method _inline
         * @private
         */
        _inline: function() {
            var that = this,
                el = that.element,
                inline = el.find(SCRIPT_SELECTOR);
            if (inline.length > 0) {
                that.options.value = inline.first().html();
            }
        },

        /**
         * Refreshes the display
         * @method refresh
         */
        refresh: function() {
            var that = this,
                el = that.element,
                inline = el.find(SCRIPT_SELECTOR),
                script = '';
            if(inline.length > 0) {
                script = $(SCRIPT_TAG).html(inline.html()).wrapAll(WRAP_TAG).parent().html();
            }
            el.html(script + that.html());
        },

        /**
         * Destroys the widget
         * @method destroy
         */
        destroy: function() {
            var that = this,
                el = that.element;
            el.removeClass(CLASS);
            el.removeData();
            el.off();
            //TODO: keep script if any and remove content
            Widget.fn.destroy.call(that);
            //that._userEvents.destroy();
        }
    });

    ui.plugin(MarkDown);

})(jQuery);;
//Copyright ©2012-2013 Memba® Sarl. All rights reserved.
/*jslint browser:true, jquery:true*/
/*jshint browser:true, jquery:true*/

(function($, undefined) {

    "use strict";

    // shorten references to variables for uglification
    var fn = Function,
        global = fn('return this')(),
        //$ = global.jQuery,
        /**
         * @module kendo
         * @requires jQuery, kendo
         */
        kendo = global.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        STRING = 'string',
        NUMBER = 'number',
        BOOLEAN = 'boolean',
        DATE = 'date',
        UNDEFINED = 'undefined',
        //Html
        SPAN = 'span',
        SPAN_ELEMENT = '<span/>',
        INPUT = 'input',
        INPUT_ELEMENT = '<input/>',
        INPUT_TYPES = 'color,date,datetime,datetime-local,email,month,number,range,search,tel,text,time,url,week',
        //We have left: button, checkbox, file, hidden, image, password, radio, reset, submit
        //SEE:http://www.w3schools.com/tags/att_input_type.asp
        INPUT_WIDGETS='colorpicker,datepicker,datetimepicker,numerictextbox,rating,slider,timepicker',
        TEXTAREA = 'textarea',
        TEXTAREA_ELEMENT = '<textarea/>',
        TBODY = 'tbody',
        //TBODY_ELEMENT = '<tbody/>',
        TYPE = 'type',
        //DATA_ID = 'data-id',
        DATA_ROLE = 'data-role',
        DATA_BIND = 'data-bind',
        DATA_BIND_VALUE = 'value: ';
        //DATA_SELECTED = 'data-selected';


    /**
     * PropertyGrid widget
     * @class PropertyGrid
     * @extend Widget
     */
    var PropertyGrid = Widget.extend({

        /**
         * Initializes the widget
         * @method init
         * @param element
         * @param options
         */
        init: function(element, options) {
            var that = this;
            // base call to widget initialization
            Widget.fn.init.call(this, element, options);
            that._layout();
        },

        /**
         * Widget options
         * @property options
         */
        options: {
            name: 'PropertyGrid',
            properties: null,
            schema: null,
            rows: null
        },

        /**
         * The row template
         * @property _rowTemplate
         * @private
         */
        _rowTemplate: '<tr role="row"><td role="gridcell">#: title #</td><td role="gridcell">#= editor #</td></tr>',

        /**
         * The alternate row template
         * @property _altRowTemplate
         * @private
         */
        _altRowTemplate: '<tr class="k-alt" role="row"><td role="gridcell">#: title #</td><td role="gridcell">#= editor #</td></tr>',

        /**
         * Builds the widget layout
         * @method _layout
         * @private
         */
        _layout: function () {
            var that = this;
            $(that.element)
                .addClass('k-grid k-widget')
            /*Add header
            The following is copied from the markup generated by a kendoGrid
            <div class="k-grid-header" style="padding-right: 17px;">
                <div class="k-grid-header-wrap">
                    <table role="grid">
                        <colgroup><col><col></colgroup>
                        <thead><tr>
                            <th role="columnheader" data-field="Property" class="k-header">Property</th>
                            <th role="columnheader" data-field="Value" class="k-header">Value</th>
                        </tr></thead>
                    </table>
                </div>
            </div>
            We are using this markup below after removing data-* attributes
            role attributes are used by WAI-ARIA capable screen readers to deduct content from the page
            */
                .append(
                    '<div class="k-grid-header" style="padding-right: 17px;">' +
                        '<div class="k-grid-header-wrap">' +
                            '<table role="grid">' +
                                '<colgroup><col><col></colgroup>' +
                                '<thead><tr>' +
                                    '<th role="columnheader" class="k-header">Property</th>' +  //TODO: Localize
                                    '<th role="columnheader" class="k-header">Value</th>' +  //TODO: Localize
                                '</tr></thead>' +
                            '</table>' +
                        '</div>' +
                    '</div>'
                )
            /*Add content - See refresh
            The following is copied from the markup generated by a kendoGrid
            <div class="k-grid-content">
                <table role="grid">
                    <colgroup><col><col></colgroup>
                    <tbody>
                        <tr data-uid="71c6856c-77dc-47a6-82b7-2c955c0c9794" role="row"><td role="gridcell">Title</td><td role="gridcell">Some Interesting Title</td></tr>
                        <tr class="k-alt" data-uid="a4cf188a-f5b6-40e1-b66c-296b7a7414ba" role="row"><td role="gridcell">Author</td><td role="gridcell">Me</td></tr>
                        <tr data-uid="36fb3065-da2b-4a30-b791-9c89907fe23f" role="row"><td role="gridcell">Version</td><td role="gridcell">1</td></tr>
                        <tr class="k-alt" data-uid="4945eeab-3074-4f97-8f25-fd9573453060" role="row"><td role="gridcell">Creation Date</td><td role="gridcell">14 Feb 2012</td></tr>
                        <tr data-uid="3d11ec9b-988f-428a-85d3-d39d0a61cf30" role="row"><td role="gridcell">Modification Date</td><td role="gridcell">14 Feb 2012</td></tr>
                        <tr class="k-alt" data-uid="4c175649-632d-44f3-8a05-36c0c81a590f" role="row"><td role="gridcell">Description</td><td role="gridcell">Some Essential Description</td></tr>
                        <tr data-uid="d9e7c873-4473-4b90-8b8a-cc0b7f92c2b4" role="row"><td role="gridcell">User Instructions</td><td role="gridcell">Some Key User Guidance</td></tr>
                        <tr class="k-alt" data-uid="0ae0cf0e-c597-4189-95b8-fb582f28c8ec" role="row"><td role="gridcell">Rating</td><td role="gridcell">Triple A</td></tr>
                        <tr data-uid="d71aba8e-f80e-4a92-afaf-1b9b61e5c524" role="row"><td role="gridcell">Views</td><td role="gridcell">1,000,000</td></tr>
                    </tbody>
                </table>
            </div>
             We are using this markup below after removing data-* attributes
             role attributes are used by WAI-ARIA capable screen readers to deduct content from the page
            */
                .append(
                    '<div class="k-grid-content">' +
                        '<table role="grid">' +
                            '<colgroup><col><col></colgroup>' +
                            '<tbody>' +
                            //This is where lines are added
                            '</tbody>' +
                        '</table>' +
                    '</div>'
                );

            //We need an observable object to display in the property grid
            if (that.options.properties instanceof kendo.data.ObservableObject) {
                //Ideally we need a schema to tell the property grid about types, default values, editable properties and validation
                if ($.isPlainObject(that.options.schema) && (that.options.schema.model)) {
                    if (that.options.properties instanceof that.options.schema.model) {
                        if($.isArray(that.options.rows) && that.options.rows.length > 0) { //If we also have row metadata
                            that._layoutWithSchemaAndRows();
                        } else { //without rows
                            that._layoutWithSchemaOnly();
                        }
                    }
                }
                else { //No schema
                    if($.isArray(that.options.rows) && that.options.rows.length > 0) { //If we have row metadata
                        that._layoutWithRowsOnly();
                    } else { //without rows
                        that._layoutFromValues();
                    }
                }
                kendo.bind($(that.element), that.options.properties);
            }
        },

        /**
         * Builds the widget when the object displayed in the property grid is supplied with schema and row metadata
         * @method _layoutWithSchemaAndRows
         * @private
         */
        _layoutWithSchemaAndRows: function() {
            var that = this,
                tbody = $(that.element).find(TBODY).first(),
                rowTemplate = kendo.template(that._rowTemplate),
                altRowTemplate = kendo.template(that._altRowTemplate),
                count = 0;
            //with rows
            $.each(that.options.rows, function(index, row){
                var template = (count % 2 === 1) ? altRowTemplate : rowTemplate,
                    field = that.options.properties.fields[row.field],
                    value = that.options.properties[row.field],
                    editor;
                if($.type(field.editable) === UNDEFINED || field.editable) { //field.editable is true by default (undefined)
                    //is there a custom editor?
                    if($.isFunction(window[row.editor])) {
                        tbody.append(template({title: row.title, editor: ''}));
                        var container = tbody.find('td[role=gridcell]').last(),
                            options = {
                                field: row.field,
                                editor: row.editor,
                                model: that.options.properties
                            };
                        window[row.editor](container, options);
                    //is there a named editor?
                    } else if ($.type(row.editor) === STRING) {
                        //if there is a kendo widget wrapping an input control, use it
                        if ((INPUT_WIDGETS.indexOf(row.editor.toLowerCase()) > -1) && kendo.rolesFromNamespaces(kendo.ui).hasOwnProperty(row.editor.toLowerCase())) {
                            tbody.append(template({title: row.title, editor: INPUT_ELEMENT}));
                            editor = tbody.find(INPUT).last();
                            editor
                                .attr(DATA_ROLE, row.editor)
                                .attr(DATA_BIND, DATA_BIND_VALUE + row.field);
                        } else if (INPUT_TYPES.indexOf(row.editor.toLowerCase()) > -1) {
                            tbody.append(template({title: row.title, editor: INPUT_ELEMENT}));
                            editor = tbody.find(INPUT).last();
                            editor
                                .attr(TYPE, row.editor.toLowerCase())
                                .attr(DATA_BIND, DATA_BIND_VALUE + row.field)
                                .addClass('k-textbox');
                        } else if (row.editor.toLowerCase() === TEXTAREA) {
                            tbody.append(template({title: row.title, editor: TEXTAREA_ELEMENT}));
                            editor = tbody.find(TEXTAREA).last();
                            editor
                                .attr(DATA_BIND, DATA_BIND_VALUE + row.field)
                                .addClass('k-textbox');
                        }
                    //is there a template?
                    } else if (row.template) {
                        $.noop();
                    } else if (field.type === NUMBER) {
                        tbody.append(template({title: row.title, editor: INPUT_ELEMENT}));
                        editor = tbody.find(INPUT).last();
                        editor.attr(DATA_BIND, DATA_BIND_VALUE + row.field);
                        editor.kendoNumericTextBox();
                        //TODO add formatting
                    } else if (field.type === BOOLEAN) {
                        //TODO
                    } else if (field.type === DATE) {
                        //TODO
                    //default field type is 'string' - See http://docs.kendoui.com/api/framework/model
                    } else {
                        tbody.append(template({title: row.title, editor: INPUT_ELEMENT}));
                        editor = tbody.find(INPUT).last();
                        editor
                            .attr(TYPE, 'text')
                            .attr(DATA_BIND, DATA_BIND_VALUE + row.field)
                            .addClass('k-textbox');
                    }
                } else { //readonly value
                    tbody.append(template({title: row.title, editor: SPAN_ELEMENT}));
                    editor = tbody.find(SPAN).last();
                    editor.attr(DATA_BIND, DATA_BIND_VALUE + row.field);
                    //TODO add formatting, sizing and validation
                }
                count++;
            });
        },

        /**
         * Builds the widget when the object displayed in the property grid is supplied with schema only
         * @method _layoutWithSchemaOnly
         * @private
         */
        _layoutWithSchemaOnly: function() {
            //TODO
            $.noop();
        },

        /**
         * Builds the widget when the object displayed in the property grid is supplied with row metadata only
         * @method _layoutWithRowsOnly
         * @private
         */
        _layoutWithRowsOnly: function() {
            //TODO
            $.noop();
        },

        /**
         * Builds the widget when the object displayed in the property grid is supplied raw
         * Without schema and row metadata, the property grid is built guessing types from values
         * Complex object types, undefined and nulls are hidden (better not displaying than messing with data)
         * Booleans are displayed as checkboxes
         * Numbers are displayed as kendoNumericTextBox
         * Dates are displayed as kendoDatePicker
         * Colors are displayed as kendoColorPicker
         * Urls and emails are displayed with validation rules
         * Other short strings are displayed in textboxes
         * Other long strings are displayed as textareas
         * @method _layoutFromValues
         * @private
         */
        _layoutFromValues: function() {
            //TODO
            $.noop();
        },

        /**
         * Clears the DOM from modifications made by the widget
         * @method _clear
         * @private
         */
        _clear: function() {
            var that = this;
            //TODO: Call destroy on all child widgets
            //unbind descendant events
            $(that.element).find('*').off();
            //clear element
            $(that.element)
                .empty()
                .off()
                .removeClass('k-widget k-grid');
        },


        /**
         * Destroys the widget
         * @method destroy
         */
        destroy: function() {
            var that = this;
            that._clear();
            Widget.fn.destroy.call(this);
        }

    });

    ui.plugin(PropertyGrid);

})(jQuery);;
//Copyright ©2012-2013 Memba® Sarl. All rights reserved.
/*jslint browser:true, jquery:true*/
/*jshint browser:true, jquery:true*/

(function ($, undefined) {

	"use strict";

    // shorten references to variables for uglification
    var fn = Function,
        global = fn('return this')(),
        //$ = global.jQuery,
        /**
         * @module kendo
         * @requires jQuery, kendo
         */
        kendo = global.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        SPAN = 'span',
        //Rating
        RATING_MIN = 0,
        RATING_MAX = 5,
        RATING_STEP = 1,
        PRECISION = 3,
        //Events
        CHANGE = 'change';

    /*******************************************************************************************
     * Rating
     * SEE: http://www.fyneworks.com/jquery/star-rating/
     * SEE ALSO: http://www.enfew.com/5-best-jquery-star-rating-plugins-tutorials/
     *******************************************************************************************/

    /**
     * Rating (kendoRating)
     * @class Rating
     * @extend Widget
     */
    var Rating = Widget.extend({

        /**
         * Initializes the widget
         * @method init
         * @param element
         * @param options
         */
        init: function (element, options) {
            var that = this;
            element = $(element);
            element.type = 'text';
            options = $.extend({}, {
                value: parseFloat(element.attr('value')),
                min: parseFloat(element.attr('min')) || RATING_MIN,
                max: parseFloat(element.attr('max')) || RATING_MAX,
                step: parseFloat(element.attr('step')) || RATING_STEP
            }, options);
            Widget.fn.init.call(that, element, options);
            that._layout();
        },

        /**
         * Widget events
         * @property events
         */
        events: [
            /**
             * Changing the rating value by clicking a star raises the change event
             * @event change
             */
            CHANGE
        ],

        /**
         * Widget options
         * @property options
         */
        options: {
            name: "Rating"
            //TODO: value, min, max, step
        },

        /**
         * Gets a sets the rating value
         * @method value
         * @param value
         * @return {*}
         */
        value: function (value) {
            var that = this,
                options = that.options;
            value = round(value);
            if (isNaN(value)) {
                return options.value;
            }
            if (value >= options.min && value <= options.max) {
                if (options.value !== value) {
                    that.element.attr('value', formatValue(value));
                    options.value = value;
                    that.trigger(CHANGE, { value: options.value });
                }
            }
        },

        /**
         * Builds the widget layout
         * @method _layout
         * @private
         */
        _layout: function() {
            var that = this,
                options = that.options,
                element = $(that.element);
            that._clear();
            element.wrap('<span class="k-widget k-rating"/>');
            element.hide();
            var wrapper = element.parent();
            //Calculate the number of stars
            var n = round((options.max - options.min)/options.step);  //number of stars
            //Add stars to the DOM
            for(var i = 1; i <= n; i++) {
                wrapper.append('<span class="k-rating-star" data-star="' + (n + 1 - i) + '"></span>');
            }
            //Add click events to stars
            wrapper.find('span.k-rating-star').click(function(e){
                var i = parseFloat($(e.currentTarget).attr('data-star')),
                    value = round(options.min + i * options.step);
                that.value(value);
            });
            //Bind a handler for the change event to update stars when value is changed
            that.bind(CHANGE, function(e){
                var i = round((e.value - options.min)/options.step);
                $.each(wrapper.find('span.k-rating-star'), function(index, star) {
                    if(parseFloat($(star).attr('data-star')) <= i) {
                        $(star).addClass('k-rating-selected');
                    } else {
                        $(star).removeClass('k-rating-selected');
                    }
                });
            });
        },

        /**
         * Clears the DOM from modifications made by the widget
         * @method _clear
         * @private
         */
        _clear: function() {
            var that = this,
                element = $(that.element),
                wrapper = element.parent();
            that.unbind(CHANGE);
            //remove wrapper and stars
            if (wrapper.length > 0 && wrapper[0].tagName.toLowerCase() === SPAN && wrapper.hasClass('k-rating')) {
                wrapper.find('span.k-rating-star').off().remove();
                wrapper.off();
                element.unwrap();
                element.show();
            }
        },

        /**
         * Destroys the widget
         * @method destroy
         */
        destroy: function () {
            var that = this;
            that._clear();
            Widget.fn.destroy.call(this);
        }
    });

    ui.plugin(Rating);

    /**
     * rounding numbers for the star rating widget
     * @method round
     * @param value {Number}
     * @return {Number}
     */
    function round(value) {
        value = parseFloat(value, 10);
        var power = Math.pow(10, PRECISION || 0);
        return Math.round(value * power) / power;
    }

    /**
     * Formatting numbers for the star rating widget
     * @method formatValue
     * @param value {Number}
     * @return {String}
     */
    function formatValue(value) {
        return (value + "").replace(".", kendo.cultures.current.numberFormat["."]);
    }

} (jQuery));;
//Copyright ©2012-2013 Memba® Sarl. All rights reserved.
/*jslint browser:true, jquery:true*/
/*jshint browser:true, jquery:true*/

(function ($, undefined) {

    "use strict";

    // shorten references to variables for uglification
    var fn = Function,
        global = fn('return this')(),
        kendo = global.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        STRING = 'string',

        //Events
        CHANGE = 'change',
        RENDER = 'websearch.render';

    /*******************************************************************************************
     * Web Search
     *******************************************************************************************/

    /**
     * Web Search (kendoWebSearch)
     * @class WebSearch
     * @extend Widget
     */
    var WebSearch = Widget.extend({

        /**
         * Initializes the widget
         * @method init
         * @param element
         * @param options
         */
        init: function (element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);
            //that.bind(RENDER, $.proxy(that._render, that));
            //We want all our widgets on the page be notified of the render event
            //when the search engine script is loaded (when the callback is executed)
            $(document).bind(RENDER, $.proxy(that._render, that));
            that._layout();
        },

        /**
         * Widget options
         * @property options
         */
        options: {
            name: 'WebSearch',
            engine: 'Google',
            key: '000888210889775888983:tmhkkjoq81m',
            value: 'test'
        },

        /**
         * The query to search for
         * @method type
         * @param value
         * @return {*}
         */
        value: function (value) {
            var that = this;
            if (value) {
                if($.type(value) !== STRING) {
                    throw new TypeError();
                }
                if(that.options.value !== value) {
                    that.options.value = value;
                    that.refresh();
                }
            }
            else {
                return that.options.value;
            }
        },

        _gname: undefined,
        /**
         * The google name of the search DOM element
         * @returns {string}
         */
        gname: function() {
            var that = this;
            if (!that._gname) {
                var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
                that._gname = ($(that.element).attr('id') || 'memba-websearch-results') + '-';
                for (var i=0; i<4; i++) { //add some randomness to allow several components on a page
                    that._gname += chars[Math.floor(chars.length*Math.random())];
                }
            }
            return that._gname;
        },

        /**
         * Builds the widget layout
         * @method _layout
         * @private
         */
        _layout: function () {
            var that = this;
            that._clear();
            if (that.options.engine === 'Google') {
                //See https://developers.google.com/custom-search/docs/element#supported_attributes
                //See https://developers.google.com/custom-search/docs/tutorial/implementingsearchbox
                $(that.element).addClass('k-widget k-websearch');
                //$(that.element).html('<gcse:searchresults-only></gcse:searchresults-only>');
                $(that.element).html('<div id="' + that.gname() + '"></div>');
                if(!global.__gcse) { //First websearch widget on page
                    global.__gcse = {
                        parsetags: 'explicit',
                        callback: function() {
                            //that.trigger(RENDER, {sender: that});
                            //We trigger the RENDER event on the document to notify all widgets on the same page
                            $(document).trigger(RENDER);
                        }
                    };
                    //this is only loaded once
                    var script = (document.location.protocol === 'https:' ? 'https:' : 'http:') + '//www.google.com/cse/cse.js?cx=' + that.options.key;
                    $.getScript(script);
                }
            } //else if (that.options.engine === 'Bing')
        },

        _render: function() {
            var that = this;
            if (that.options.engine === 'Google' && global.google) {
                global.google.search.cse.element.render(
                    {
                        div: that.gname(),
                        tag: 'searchresults-only',
                        gname: that.gname(),
                        attributes: {
                        }
                    });
                that.refresh();
                //we need a refresh here because when the widget loads,
                //the refresh method might be explicitly called by the programmer
                //and execute before the callback when global.google is not yet available
            } //else if (that.options.engine === 'Bing')
        },

        /**
         * Refreshes the widget
         * @method refresh
         * @param e {Object} the change event triggered by the observable dataSource
         */
        refresh: function() {
            var that = this;
            //kendo.logToConsole('refresh called on ' + that.gname() + ' when ' + (global.google ? 'Google available' : 'Google not available' ));
            if (that.options.engine === 'Google' && global.google) {
                var element = global.google.search.cse.element.getElement(that.gname());
                element.execute(that.value());
            } //else if (that.options.engine === 'Bing')
        },

        /**
         * Clears the DOM from modifications made by the widget
         * @method _clear
         * @private
         */
        _clear: function() {
            var that = this;
            //that.unbind(CHANGE);
            //unbind descendant events
            $(that.element).find('*').off();
            //clear element
            $(that.element)
                .empty()
                .off()
                .removeClass('k-widget k-websearch');
        },

        /**
         * Destroys the widget including bounds to the data source
         * @method destroy
         */
        destroy: function () {
            var that = this;
            that._clear();
            Widget.fn.destroy.call(this);
        }

    });

    ui.plugin(WebSearch);

} (jQuery));
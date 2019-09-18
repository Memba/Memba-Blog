/** 
 * Kendo UI v2019.3.917 (http://www.telerik.com/kendo-ui)                                                                                                                                               
 * Copyright 2019 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.                                                                                      
 *                                                                                                                                                                                                      
 * Kendo UI commercial licenses may be obtained at                                                                                                                                                      
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete                                                                                                                                  
 * If you do not own a commercial license, this file shall be governed by the trial license terms.                                                                                                      
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       

*/
(function (f, define) {
    define('kendo.timeline', [
        'kendo.fx',
        'kendo.data',
        'kendo.draganddrop'
    ], f);
}(function () {
    var __meta__ = {
        id: 'timeline',
        name: 'Timeline',
        category: 'web',
        description: 'The Kendo Timeline widget display events over time',
        depends: ['userevents']
    };
    (function ($, undefined) {
        var kendo = window.kendo, ui = kendo.ui, Widget = ui.Widget, DataSource = kendo.data.DataSource, Transition = kendo.effects.Transition, proxy = $.proxy, LEFT_PAGE = -1, CETER_PAGE = 0, RIGHT_PAGE = 1, VERTICAL = 'vertical', TRANSITION_END = 'transitionEnd', VIRTUAL_PAGE_COUNT = 3, VIRTUAL_PAGE_CLASS = 'timeline-event', FLAGWRAPCLASS = 'k-timeline-flag-wrap', TRACKITEMCLASS = 'k-timeline-track-item', SCROLLABLEWRAPCLASS = 'k-timeline-scrollable-wrap', DEFAULTHORIZONTALCARDTEMPLATE = '# var titleField = data.titleField, subtitleField = data.subtitleField, descriptionField = data.descriptionField, imagesField = data.imagesField, actionsField = data.actionsField, data = data.data; #' + '<div class="k-card-header">' + '# if(data[titleField]) { #' + '<h5 class="k-card-title">#= data[titleField] #</h5>' + '# }' + 'if(data[subtitleField]) { #' + '<h6 class="k-card-subtitle">#= data[subtitleField] #</h6>' + '# } #' + '</div>' + '<div class="k-card-body">' + '<div class="k-card-description">' + '# if(data[descriptionField]) { #' + '<p>#= data[descriptionField] #</p>' + '# }' + 'if(data[imagesField] && data[imagesField].length > 0) { #' + '<img src="#= data[imagesField][0].src #" class="k-card-image" />' + '# } #' + '</div>' + '</div>' + '# if(data[actionsField] && data[actionsField].length > 0) { #' + '<div class="k-card-actions">' + '# for (var i = 0; i < data[actionsField].length; i++) { #' + '<a class="k-button k-flat k-primary" href="#= data[actionsField][i].url ? data[actionsField][i].url : "\\#" #">#= data[actionsField][i].text #</a>' + '# } #' + '</div>' + '# } #', DEFAULTVERTICALCARDTEMPLATE = '# var titleField = data.titleField, subtitleField = data.subtitleField, descriptionField = data.descriptionField, imagesField = data.imagesField, actionsField = data.actionsField, data = data.data; #' + '<div class="k-card-header">' + '<h5 class="k-card-title">' + '# if(data[titleField]) { #' + '<span class="k-event-title">#= data[titleField] #</span>' + '# } #' + '<span class="k-event-collapse k-button k-button-icon k-flat">' + '<span class="k-icon k-i-arrow-chevron-right"></span>' + '</span></h5>' + '# if(data[subtitleField]) { #' + '<h6 class="k-card-subtitle">#= data[subtitleField] #</h6>' + '# } #' + '</div>' + '<div class="k-card-body">' + '<div class="k-card-description">' + '# if(data[descriptionField]) { #' + '<p>#= data[descriptionField] #</p>' + '# } #' + '# if(data[imagesField] && data[imagesField].length > 0) { #' + '<img src="#= data[imagesField][0].src #" class="k-card-image" />' + '# } #' + '</div>' + '</div>' + '# if(data[actionsField] && data[actionsField].length > 0) { #' + '<div class="k-card-actions">' + '# for (var i = 0; i < data[actionsField].length; i++) { #' + '<a class="k-button k-flat k-primary" href="#= data[actionsField][i].url ? data[actionsField][i].url : "\\#" #">#= data[actionsField][i].text #</a>' + '# } #' + '</div>' + '# } #', HORIZONTALTRACKTEMPLATE = '<div class="k-timeline-track">' + '<ul class="k-timeline-scrollable-wrap">' + '# var itemTemplate = data.itemTemplate, dateField = data.dateField, dateFormat = data.dateFormat, showDateLabels = data.showDateLabels, data = data.data, year = 0; #' + '# for (var i = 0; i < data.length; i++) {' + 'if(!(data[i][dateField] instanceof Date)) {' + 'continue;' + '}' + 'var currentYear = data[i][dateField].getFullYear();' + 'if(year != currentYear) {' + 'year = currentYear; #' + '<li class="k-timeline-track-item k-timeline-flag-wrap">' + '<span class="k-timeline-flag">#= year #</span>' + '</li>' + '# } #' + '<li class="k-timeline-track-item">' + '<div class="k-timeline-date-wrap">' + '# if(showDateLabels) { #' + '<span class="k-timeline-date">#= kendo.toString(data[i][dateField], dateFormat) #</span>' + '# } #' + '</div>' + '<a class="k-timeline-circle"></a>' + '</li>' + '# } #' + '</ul>' + '</div>', VERTICALEVENTSTEMPLATE = '# var itemTemplate = data.itemTemplate, dateField = data.dateField, titleField = data.titleField, descriptionField = data.descriptionField, subtitleField = data.subtitleField, imagesField = data.imagesField, actionsField = data.actionsField, alterMode = data.alterMode, collapsibleEvents = data.collapsibleEvents, dateFormat = data.dateFormat, showDateLabels = data.showDateLabels, data = data.data, counter = 0, year = 0, reverse = false; #' + '<ul>' + '# for (var i = 0; i < data.length; i++) {' + 'if(!(data[i][dateField] instanceof Date)) {' + 'continue;' + '}' + 'var currentYear = data[i][dateField].getFullYear();' + 'if(currentYear != year) {' + 'year = currentYear; #' + '<li class="k-timeline-flag-wrap">' + '<span class="k-timeline-flag">#= year #</span>' + '</li>' + '# } ' + 'reverse = counter % 2 === 0 && alterMode; #' + '<li class="#= reverse ? \'k-timeline-event k-reverse\' : \'k-timeline-event\' #" data-uid="#: data[i].uid #">' + '# if(showDateLabels) { #' + '<div class="k-timeline-date-wrap">' + '<span class="k-timeline-date">#= kendo.toString(data[i][dateField], dateFormat) #</span>' + '</div>' + '# } #' + '<a class="k-timeline-circle"></a>' + '<div class="#= collapsibleEvents ? \'k-timeline-card k-collapsed\' : \'k-timeline-card\' #">' + '<div class="k-card">' + '<span class="#= reverse ? \'k-timeline-card-callout k-card-callout k-callout-e\' : \'k-timeline-card-callout k-card-callout k-callout-w\' #"></span>' + '#= itemTemplate({titleField: titleField, subtitleField: subtitleField, descriptionField: descriptionField, imagesField: imagesField, actionsField: actionsField, data: data[i]}) #' + '</div>' + '</div>' + '</li>' + '# counter ++;' + '} #' + '</ul>', ARROWSHTML = '<a class="k-button k-timeline-arrow k-timeline-arrow-left k-state-disabled" title="previous">' + '<span class="k-icon k-i-arrow-60-left"></span>' + '</a>' + '<a class="k-button k-timeline-arrow k-timeline-arrow-right" title="next">' + '<span class="k-icon k-i-arrow-60-right"></span>' + '</a>';
        function className(name) {
            return 'k-' + name;
        }
        function calculateTransform(element) {
            var matrix = element.css('transform');
            var x;
            var values;
            if (matrix != 'none') {
                values = matrix.match(/-?[\d\.]+/g);
                x = values[4];
                return x / element.width() * 100;
            } else {
                return 0;
            }
        }
        function calculateOffset(element, parentElement) {
            return element.offset().left - parentElement.offset().left + element.width() / 2;
        }
        function applyCssStyles(element, property, value) {
            element.css(property, value);
        }
        var Page = kendo.Class.extend({
            init: function (container) {
                this.cardContainer = $('<div class=\'k-card\' />');
                var cardWrapper = $('<div class=\'k-timeline-card\'></div>').append(this.cardContainer);
                this.element = $('<li class=\'' + className(VIRTUAL_PAGE_CLASS) + '\'></li>').append(cardWrapper);
                container.append(this.element);
            },
            content: function (htmlContent, uid) {
                var callOut = $('<span class=\'k-timeline-card-callout k-card-callout k-callout-n\'></span>');
                this.cardContainer.html(htmlContent);
                this.cardContainer.append(callOut);
                this.element.attr('data-uid', uid);
            },
            position: function (position) {
                this.element.css('transform', 'translate3d(' + this.element.width() * position + 'px, 0, 0)');
            },
            setPageCallout: function (propery, value) {
                var element = this.element;
                var callOutElement = element.find('.k-timeline-card-callout');
                callOutElement.css(propery, value);
            },
            destroy: function () {
                var that = this;
                that.cardContainer = null;
                that.element.remove();
                that.element = null;
            }
        });
        var HorizontalPane = kendo.Observable.extend({
            init: function (element, options) {
                var that = this;
                kendo.Observable.fn.init.call(this);
                this.element = element;
                var movable, transition, pages;
                movable = new kendo.ui.Movable(that.element);
                transition = new Transition({
                    axis: 'x',
                    movable: movable,
                    onEnd: function () {
                        that.trigger(TRANSITION_END);
                    }
                });
                pages = [];
                $.extend(that, {
                    duration: options && options.duration || 1,
                    movable: movable,
                    transition: transition,
                    pages: pages,
                    eventTemplate: options.eventTemplate,
                    eventHeight: options.eventHeight,
                    dataFieldMappings: options.dataFieldMappings
                });
                this.bind([TRANSITION_END], options);
            },
            initPages: function () {
                var pages = this.pages, element = this.element, page;
                for (var i = 0; i < VIRTUAL_PAGE_COUNT; i++) {
                    page = new Page(element);
                    pages.push(page);
                }
            },
            repositionPages: function () {
                var pages = this.pages;
                pages[0].position(LEFT_PAGE);
                pages[1].position(CETER_PAGE);
                pages[2].position(RIGHT_PAGE);
            },
            setPageContent: function (page, data) {
                var template = typeof this.eventTemplate === Function ? this.eventTemplate : kendo.template(this.eventTemplate);
                var dataFieldMappings = this.dataFieldMappings;
                var html;
                html = template({
                    data: data,
                    titleField: dataFieldMappings.title,
                    subtitleField: dataFieldMappings.subtitle,
                    descriptionField: dataFieldMappings.description,
                    imagesField: dataFieldMappings.images,
                    actionsField: dataFieldMappings.actions
                });
                page.content(html, data.uid);
            },
            updatePage: function (isForward, data, calloutOffset) {
                var pages = this.pages;
                var page = isForward === null ? pages[1] : isForward ? pages[pages.length - 1] : pages[0];
                this.setPageContent(page, data);
                page.setPageCallout('left', calloutOffset / page.element.width() * 100 + '%');
            },
            moveTo: function (offset) {
                this.movable.moveAxis('x', -offset);
            },
            transitionTo: function (offset, ease) {
                this.transition.moveTo({
                    location: offset,
                    duration: this.duration,
                    ease: ease
                });
            },
            destroy: function () {
                var that = this;
                for (var index = 0; index < that.pages.length; index++) {
                    that.pages[index].destroy();
                }
                that.unbind();
                that.movable = that.tansition = that.pane = null;
            }
        });
        var Timeline = kendo.ui.Widget.extend({
            init: function (element, options) {
                var that = this;
                var orientation = options.orientation || that.options.orientation;
                Widget.fn.init.call(this, element, options);
                this.element.addClass(orientation === VERTICAL ? 'k-timeline k-widget k-timeline-vertical' : 'k-timeline k-widget k-timeline-horizontal');
                if (orientation != VERTICAL) {
                    that._horizontal();
                } else {
                    that._vertical();
                }
                this.element.on('click', '.k-card-actions', function () {
                    var action = $(event.target);
                    var dataItemUid = $(event.target).closest('.k-timeline-event').data('uid');
                    var dataItem = that.dataSource.getByUid(dataItemUid);
                    that.trigger('actionClick', {
                        sender: that,
                        element: action,
                        dataItem: dataItem
                    });
                });
                that.currentEventIndex = 0;
                that._forward = null;
                that._eventPage = 1;
                that._currentIndex = 0;
                that._firstIndexInView = 0;
                that._initDataFieldMappings();
                that.setDataSource(options.dataSource);
            },
            _horizontal: function () {
                var that = this;
                var element = this.element;
                var options = this.options;
                var trackWrap = $('<div />');
                var eventsWrap = $('<div />');
                var eventsList = $('<ul />');
                that._trackWrap = trackWrap;
                that._eventsWrap = eventsWrap;
                that._eventsList = eventsList;
                trackWrap.addClass('k-timeline-track-wrap');
                eventsWrap.addClass('k-timeline-events-list');
                eventsList.addClass('k-timeline-scrollable-wrap');
                if (options.eventHeight) {
                    eventsList.height(options.eventHeight);
                }
                trackWrap.append(ARROWSHTML);
                eventsWrap.append(eventsList);
                trackWrap.appendTo(element);
                eventsWrap.appendTo(element);
                $(window).on('resize', proxy(this, '_resizeHandler'));
                trackWrap.on('click', '.k-timeline-track-item:not(.k-timeline-flag-wrap)', proxy(this, '_setCurrentEvent'));
                trackWrap.on('click', '.k-timeline-arrow:not(.k-state-disabled)', proxy(this, '_navigateToView'));
            },
            _vertical: function () {
                var that = this;
                var options = this.options;
                var element = this.element;
                if (options.alternatingMode) {
                    element.addClass('k-timeline-alternating');
                }
                if (options.collapsibleEvents) {
                    element.addClass('k-timeline-collapsible');
                    this.element.on('click', '.k-card-header', function () {
                        var card = $(this).closest('.k-timeline-card');
                        var cardBody = card.find('.k-card-body');
                        var dataItem = that.dataSource.getByUid(card.closest('li').data('uid'));
                        if (card.hasClass('k-collapsed')) {
                            if (!that.trigger('expand', {
                                    sender: that,
                                    dataItem: dataItem
                                })) {
                                kendo.fx(cardBody).expand('vertical').stop().play();
                                card.toggleClass('k-collapsed');
                            }
                        } else {
                            if (!that.trigger('collapse', {
                                    sender: that,
                                    dataItem: dataItem
                                })) {
                                kendo.fx(cardBody).expand('vertical').stop().reverse();
                                card.toggleClass('k-collapsed');
                            }
                        }
                    });
                }
            },
            _renderContentVertical: function (data) {
                var that = this;
                var options = that.options;
                var html;
                var itemTemplate;
                if (typeof options.eventTemplate === Function) {
                    itemTemplate = options.eventTemplate;
                } else {
                    itemTemplate = options.eventTemplate ? kendo.template(options.eventTemplate) : kendo.template(DEFAULTVERTICALCARDTEMPLATE, { useWithBlock: false });
                }
                var template = kendo.template(VERTICALEVENTSTEMPLATE, { useWithBlock: false });
                html = template({
                    data: data,
                    dateField: options.dataDateField,
                    titleField: options.dataTitleField,
                    subtitleField: options.dataSubtitleField,
                    descriptionField: options.dataDescriptionField,
                    imagesField: options.dataImagesField,
                    actionsField: options.dataActionsField,
                    itemTemplate: itemTemplate,
                    alterMode: options.alternatingMode,
                    collapsibleEvents: options.collapsibleEvents,
                    dateFormat: options.dateFormat,
                    showDateLabels: options.showDateLabels
                });
                this.element.html(html);
                if (options.eventWidth) {
                    that.element.find('.k-card').width(options.eventWidth);
                }
            },
            _renderContentHorizontal: function (data) {
                var that = this;
                var options = that.options;
                var html;
                var itemTemplate;
                var dataFieldMappings = that._dataFieldMappings;
                if (typeof options.eventTemplate === Function) {
                    itemTemplate = options.eventTemplate;
                } else {
                    itemTemplate = options.eventTemplate ? kendo.template(options.eventTemplate) : kendo.template(DEFAULTHORIZONTALCARDTEMPLATE, { useWithBlock: false });
                }
                var trackTemplate = kendo.template(HORIZONTALTRACKTEMPLATE, { useWithBlock: false });
                html = trackTemplate({
                    data: data,
                    itemTemplate: itemTemplate,
                    dateFormat: options.dateFormat,
                    dateField: options.dataDateField,
                    showDateLabels: options.showDateLabels
                });
                if (options.initialEventIndex) {
                    that._trackWrap.append($(html).find('.k-timeline-scrollable-wrap').css('transform', 'translateX(-100%)').parent());
                } else {
                    if (that._trackWrap.find('.k-timeline-track').length > 0) {
                        that._trackWrap.find('.k-timeline-track').empty();
                    }
                    that._trackWrap.append(html);
                }
                if (that.pane) {
                    that.pane.destroy();
                }
                that.pane = new HorizontalPane(that._eventsList, {
                    transitionEnd: proxy(this, '_transitionEnd'),
                    eventTemplate: itemTemplate,
                    dataFieldMappings: dataFieldMappings,
                    eventHeight: options.eventHeight
                });
            },
            _initDataFieldMappings: function () {
                var that = this;
                var options = that.options;
                that._dataFieldMappings = {
                    'title': options.dataTitleField,
                    'subtitle': options.dataSubtitleField,
                    'date': options.dataDateField,
                    'description': options.dataDescriptionField,
                    'images': options.dataImagesField,
                    'actions': options.dataActionsField
                };
            },
            _transitionEnd: function () {
                if (this._forward) {
                    this.pane.pages.push(this.pane.pages.shift());
                } else {
                    this.pane.pages.unshift(this.pane.pages.pop());
                }
                this._forward = null;
                this.pane.repositionPages();
                this.pane.movable.moveAxis('x', 0);
                this._animationInProgress = false;
            },
            _setCurrentEvent: function (event) {
                var that = this;
                var trackItem = $(event.currentTarget);
                var eventContainer;
                var dataItem = that.dataSource.view()[trackItem.index('li[class=\'k-timeline-track-item\']')];
                eventContainer = that._forward ? that.pane.pages[2].element : that.pane.pages[0].element;
                if (!that.trigger('change', {
                        eventContainer: eventContainer,
                        dataItem: dataItem
                    })) {
                    that.open(trackItem);
                }
            },
            open: function (element) {
                var that = this;
                var trackItem = $(element);
                var trackItemCircle = trackItem.find('.k-timeline-circle');
                var itemIndex = trackItem.index('li[class=\'k-timeline-track-item\']');
                var forward;
                var dataItem = that.dataSource.view()[itemIndex];
                if (that.currentEventIndex === itemIndex) {
                    return;
                }
                that._currentIndex = trackItem.index();
                forward = that._forward = that.currentEventIndex < itemIndex;
                that.currentEventIndex = itemIndex;
                that.pane.updatePage(forward, dataItem, calculateOffset(trackItemCircle, that._trackWrap));
                if (that._forward) {
                    setTimeout(function () {
                        that.pane.transition.moveTo({
                            location: -that.pane.pages[2].element.width(),
                            duration: 800,
                            ease: Transition.easeOutExpo
                        });
                    }, 200);
                } else {
                    setTimeout(function () {
                        that.pane.transition.moveTo({
                            location: that.pane.pages[0].element.width(),
                            duration: 800,
                            ease: Transition.easeOutExpo
                        });
                    }, 200);
                }
                that._repositionEvents();
            },
            _navigateToView: function (event) {
                var that = this;
                var delta = $(event.currentTarget).hasClass('k-timeline-arrow-right') ? 1 : -1;
                if (!that.trigger('navigate', {
                        sender: that,
                        action: delta > 0 ? 'next' : 'previous'
                    }) && !that._animationInProgress) {
                    that._animationInProgress = true;
                    if (delta > 0) {
                        that.next();
                    } else {
                        that.previous();
                    }
                    that._updateArrows();
                }
            },
            _updateArrows: function () {
                var that = this;
                var arrows = that.element.find('.k-timeline-arrow');
                if (that._validateNavigation(false)) {
                    arrows.filter('.k-timeline-arrow-left').addClass('k-state-disabled');
                } else {
                    arrows.filter('.k-timeline-arrow-left').removeClass('k-state-disabled');
                }
                if (that._validateNavigation(true)) {
                    arrows.filter('.k-timeline-arrow-right').addClass('k-state-disabled');
                } else {
                    arrows.filter('.k-timeline-arrow-right').removeClass('k-state-disabled');
                }
            },
            _validateNavigation: function (next) {
                var that = this;
                var transform = that._end || 0;
                if (next) {
                    return that._firstIndexInView + that.numOfEvents >= that.maxEvents;
                } else {
                    return Math.abs(transform) <= 1;
                }
            },
            next: function () {
                var that = this;
                var options = that.options;
                if (!that._validateNavigation(true) && options.orientation != VERTICAL) {
                    that._forward = true;
                    that._navigate();
                }
                that._updateArrows();
            },
            _navigate: function () {
                var that = this;
                var firstEventInViewIndex;
                var firstEventInView;
                var dataItem;
                var width;
                var forward = that._forward;
                var end = calculateTransform(this._trackWrap.find('.' + SCROLLABLEWRAPCLASS));
                var leftOffset = forward ? -$('.' + SCROLLABLEWRAPCLASS).width() : $('.' + SCROLLABLEWRAPCLASS).width();
                var currentIndex = that._currentIndex;
                var currentPage;
                var firstIndexInView = that._firstIndexInView;
                end = forward ? end - 100 : end + 100;
                if (end >= 0) {
                    end = 0;
                }
                that._end = end;
                width = that._tackItemWidth;
                currentPage = Math.floor(currentIndex / that.numOfEvents);
                if (forward) {
                    if (that.numOfEvents === 1) {
                        firstEventInViewIndex = firstIndexInView === 0 ? 1 : firstIndexInView;
                        firstEventInView = this._trackWrap.find('.' + TRACKITEMCLASS).eq(firstEventInViewIndex).nextAll(':not(.' + FLAGWRAPCLASS + ')').first();
                        that._firstIndexInView = firstEventInView.index();
                    } else {
                        firstEventInViewIndex = firstIndexInView + that.numOfEvents - 1;
                        firstEventInView = this._trackWrap.find('.' + TRACKITEMCLASS).eq(firstEventInViewIndex).nextAll(':not(.' + FLAGWRAPCLASS + ')').first();
                        that._firstIndexInView = firstIndexInView + that.numOfEvents;
                    }
                } else {
                    if (that.numOfEvents === 1) {
                        firstEventInViewIndex = firstIndexInView;
                        firstEventInView = this._trackWrap.find('.' + TRACKITEMCLASS).eq(firstEventInViewIndex).prevAll(':not(.' + FLAGWRAPCLASS + ')').first();
                        that._firstIndexInView = firstEventInView.index();
                    } else {
                        firstEventInViewIndex = firstIndexInView;
                        firstEventInView = this._trackWrap.find('.' + TRACKITEMCLASS).eq(firstEventInViewIndex).prevAll(':not(.' + FLAGWRAPCLASS + ')').first();
                        firstEventInView = firstEventInView.length > 0 ? firstEventInView : this._trackWrap.find('.' + TRACKITEMCLASS + ':not(.' + FLAGWRAPCLASS + ')').first();
                        that._firstIndexInView = firstIndexInView - that.numOfEvents < 0 ? 0 : firstIndexInView - that.numOfEvents;
                    }
                }
                dataItem = that.dataSource.view()[firstEventInView.index('li[class=\'k-timeline-track-item\']')];
                this._trackWrap.find('.' + SCROLLABLEWRAPCLASS).css('transform', 'translateX(' + end + '%)');
                if (that._currentIndex != firstEventInView.index()) {
                    that.currentEventIndex = firstEventInView.index('li[class=\'k-timeline-track-item\']');
                    that._currentIndex = firstEventInView.index();
                    that.pane.updatePage(that._forward, dataItem, currentPage === 0 && !forward ? firstEventInView.find('.k-timeline-circle').offset().left + 15 : calculateOffset(firstEventInView.find('.k-timeline-circle'), that._trackWrap) + leftOffset);
                    setTimeout(function () {
                        if (forward) {
                            that.pane.transition.moveTo({
                                location: -that.pane.pages[2].element.width(),
                                duration: 800,
                                ease: Transition.easeOutExpo
                            });
                        } else {
                            that.pane.transition.moveTo({
                                location: that.pane.pages[0].element.width(),
                                duration: 800,
                                ease: Transition.easeOutExpo
                            });
                        }
                    }, 200);
                } else {
                    this._trackWrap.find('.' + SCROLLABLEWRAPCLASS)[0].addEventListener('transitionend', function () {
                        if (that.numOfEvents != 1) {
                            var page = that.pane.pages[1];
                            var calloutOffset = calculateOffset(firstEventInView.find('.k-timeline-circle'), that._trackWrap);
                            page.setPageCallout('left', calloutOffset / page.element.width() * 100 + '%');
                        }
                    });
                }
            },
            previous: function () {
                var that = this;
                var options = that.options;
                if (!that._validateNavigation(false) && options.orientation != VERTICAL) {
                    that._forward = false;
                    that._navigate();
                }
                that._updateArrows();
            },
            expand: function (event) {
                var cardWrapper = $(event).find('.k-timeline-card');
                var cardBody = $(event).find('.k-card-body');
                if (cardWrapper.hasClass('k-collapsed')) {
                    kendo.fx(cardBody).expand('vertical').stop().play();
                    cardWrapper.removeClass('k-collapsed');
                }
            },
            collapse: function (event) {
                var cardWrapper = $(event).find('.k-timeline-card');
                var cardBody = $(event).find('.k-card-body');
                if (!cardWrapper.hasClass('k-collapsed')) {
                    kendo.fx(cardBody).expand('vertical').stop().reverse();
                    cardWrapper.addClass('k-collapsed');
                }
            },
            items: function () {
                return this.element.find('li[data-uid]');
            },
            _resizeHandler: function () {
                var that = this;
                setTimeout(function () {
                    that._redrawEvents();
                    that.pane.repositionPages();
                });
            },
            redraw: function () {
                var options = this.options;
                if (options.orientation != VERTICAL) {
                    this._redrawEvents();
                    this.pane.repositionPages();
                }
            },
            _redrawEvents: function () {
                var that = this;
                var numOfEvents = Math.floor(that.element.find('.k-timeline-scrollable-wrap').width() / 150);
                var width;
                if (that.element.width() <= 480) {
                    that.element.addClass('k-timeline-mobile');
                    width = 100;
                    that.numOfEvents = 1;
                    that._tackItemWidth = width;
                    that.element.find('li.k-timeline-track-item').css('flex', '1 0 ' + width + '%');
                    that._repositionEvents();
                } else {
                    that.element.removeClass('k-timeline-mobile');
                    if (numOfEvents != that.numOfEvents) {
                        that.numOfEvents = numOfEvents;
                        width = 100 / numOfEvents;
                        applyCssStyles(that.element.find('li.k-timeline-track-item'), 'flex', '1 0 ' + width + '%');
                        that._tackItemWidth = width;
                        that._repositionEvents();
                    }
                }
                that._updateArrows();
            },
            _repositionEvents: function () {
                var that = this;
                var width = that._tackItemWidth;
                var page = that._forward === null ? that.pane.pages[1] : that._forward ? that.pane.pages[2] : that.pane.pages[0];
                var trackWrapScrollableElement = this._trackWrap.find('.' + SCROLLABLEWRAPCLASS);
                var end = calculateTransform(trackWrapScrollableElement);
                var calloutOffset;
                var offset;
                var leftOffset;
                var circleElement;
                if (that.numOfEvents === 1) {
                    offset = that.currentEventIndex * width;
                } else {
                    offset = that._currentIndex * width;
                }
                if (page) {
                    if (that.numOfEvents === 1) {
                        page.setPageCallout('left', '50%');
                        leftOffset = offset;
                        applyCssStyles(trackWrapScrollableElement, 'transform', 'translateX(-' + leftOffset + '%)');
                        that._firstIndexInView = that._currentIndex;
                        that._updateArrows();
                        return;
                    }
                    if (offset >= Math.abs(end) + 100) {
                        leftOffset = Math.abs(end) + (offset - (Math.abs(end) + 100) + width);
                        that._end = -leftOffset;
                        applyCssStyles(trackWrapScrollableElement, 'transform', 'translateX(-' + leftOffset + '%)');
                        that._firstIndexInView = that._currentIndex - that.numOfEvents + 1;
                    } else if (offset <= Math.abs(end)) {
                        leftOffset = offset;
                        that._end = -leftOffset;
                        applyCssStyles(trackWrapScrollableElement, 'transform', 'translateX(-' + leftOffset + '%)');
                        that._firstIndexInView = that._currentIndex;
                    } else {
                        circleElement = trackWrapScrollableElement.find('li.k-timeline-track-item').eq(that._currentIndex).find('.k-timeline-circle');
                        calloutOffset = calculateOffset(circleElement, that._trackWrap);
                        page.setPageCallout('left', calloutOffset / page.element.width() * 100 + '%');
                        that._firstIndexInView = Math.round(Math.abs(end) / width);
                    }
                    this._trackWrap.find('.' + SCROLLABLEWRAPCLASS)[0].addEventListener('transitionend', function () {
                        if (that.numOfEvents != 1) {
                            var page = that.pane.pages[1];
                            var eventElement = that._trackWrap.find('.' + TRACKITEMCLASS).eq(that._currentIndex);
                            var calloutOffset = calculateOffset(eventElement.find('.k-timeline-circle'), that._trackWrap);
                            page.setPageCallout('left', calloutOffset / page.element.width() * 100 + '%');
                        }
                    });
                }
                that._updateArrows();
            },
            _initHorizontal: function () {
                var that = this;
                var firstEventElement = that._trackWrap.find('.k-timeline-circle').first();
                var dataItem = that.dataSource.view()[0];
                that.maxEvents = that._trackWrap.find('.k-timeline-track-item').length;
                that._currentIndex = 1;
                that.pane.initPages();
                that.pane.repositionPages();
                that.pane.updatePage(that._forward, dataItem, calculateOffset(firstEventElement, that._trackWrap));
                that._updateArrows();
            },
            setDataSource: function (dataSource) {
                var that = this;
                var options = that.options;
                if (dataSource instanceof DataSource) {
                    this.dataSource = dataSource = new DataSource(dataSource.options);
                    if (this.dataSource._sort === undefined) {
                        this.dataSource._sort = [{
                                field: options.dataDateField,
                                dir: 'asc'
                            }];
                    }
                } else {
                    this.dataSource = DataSource.create(dataSource);
                    if (this.dataSource._sort === undefined) {
                        this.dataSource._sort = [{
                                field: options.dataDateField,
                                dir: 'asc'
                            }];
                    }
                }
                this.dataSource.fetch(function () {
                    var data = that.dataSource.view();
                    if (that.options.orientation === 'horizontal') {
                        that._renderContentHorizontal(data);
                        that._redrawEvents();
                        that._initHorizontal();
                    } else {
                        that._renderContentVertical(data);
                    }
                    that.trigger('dataBound', { sender: that });
                });
            },
            destroy: function () {
                var options = this.options;
                Widget.fn.destroy.call(this);
                if (options.orientation != VERTICAL) {
                    this.pane.destroy();
                }
                this.element.off();
                kendo.destroy(this.element);
            },
            options: {
                name: 'Timeline',
                orientation: 'vertical',
                dateFormat: 'MMM d, yyyy',
                showDateLabels: true,
                collapsibleEvents: false,
                alternatingMode: false,
                dataTitleField: 'title',
                dataDateField: 'date',
                dataSubtitleField: 'subtitle',
                dataDescriptionField: 'description',
                dataImagesField: 'images',
                dataActionsField: 'actions'
            },
            events: [
                'collapse',
                'dataBound',
                'expand',
                'actionClick',
                'change',
                'navigate'
            ]
        });
        kendo.ui.plugin(Timeline);
    }(window.kendo.jQuery));
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
/** 
 * Kendo UI v2020.2.513 (http://www.telerik.com/kendo-ui)                                                                                                                                               
 * Copyright 2020 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.                                                                                      
 *                                                                                                                                                                                                      
 * Kendo UI commercial licenses may be obtained at                                                                                                                                                      
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete                                                                                                                                  
 * If you do not own a commercial license, this file shall be governed by the trial license terms.                                                                                                      
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       

*/
(function (f, define) {
    define('kendo.timepicker', [
        'kendo.popup',
        'kendo.dateinput'
    ], f);
}(function () {
    var __meta__ = {
        id: 'timepicker',
        name: 'TimePicker',
        category: 'web',
        description: 'The TimePicker widget allows the end user to select a value from a list of predefined values or to type a new value.',
        depends: ['popup']
    };
    (function ($, undefined) {
        var kendo = window.kendo, keys = kendo.keys, parse = kendo.parseDate, activeElement = kendo._activeElement, extractFormat = kendo._extractFormat, support = kendo.support, browser = support.browser, ui = kendo.ui, Widget = ui.Widget, OPEN = 'open', CLOSE = 'close', CHANGE = 'change', ns = '.kendoTimePicker', CLICK = 'click' + ns, DEFAULT = 'k-state-default', DISABLED = 'disabled', READONLY = 'readonly', LI = 'li', SPAN = '<span></span>', FOCUSED = 'k-state-focused', HOVER = 'k-state-hover', HOVEREVENTS = 'mouseenter' + ns + ' mouseleave' + ns, MOUSEDOWN = 'mousedown' + ns, MS_PER_MINUTE = 60000, MS_PER_DAY = 86400000, SELECTED = 'k-state-selected', STATEDISABLED = 'k-state-disabled', ARIA_SELECTED = 'aria-selected', ARIA_EXPANDED = 'aria-expanded', ARIA_HIDDEN = 'aria-hidden', ARIA_DISABLED = 'aria-disabled', ARIA_ACTIVEDESCENDANT = 'aria-activedescendant', ID = 'id', isArray = $.isArray, extend = $.extend, proxy = $.proxy, DATE = Date, dateFormatRegExp = /d{1,2}|E{1,6}|e{1,6}|c{3,6}|c{1}|M{1,5}|L{1,5}|y{1,4}|H{1,2}|h{1,2}|k{1,2}|K{1,2}|m{1,2}|a{1,5}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|x{1,5}|X{1,5}|G{1,5}|q{1,5}|Q{1,5}|"[^"]*"|'[^']*'/g, LITERAL = 'literal', MONTH = 'month', HOUR = 'hour', ZONE = 'zone', WEEKDAY = 'weekday', QUARTER = 'quarter', DATE_FIELD_MAP = {
                'G': 'era',
                'y': 'year',
                'q': QUARTER,
                'Q': QUARTER,
                'M': MONTH,
                'L': MONTH,
                'd': 'day',
                'E': WEEKDAY,
                'c': WEEKDAY,
                'e': WEEKDAY,
                'h': HOUR,
                'H': HOUR,
                'k': HOUR,
                'K': HOUR,
                'm': 'minute',
                's': 'second',
                'a': 'dayperiod',
                'x': ZONE,
                'X': ZONE,
                'z': ZONE,
                'Z': ZONE
            }, NAME_TYPES = {
                month: {
                    type: 'months',
                    minLength: 3,
                    standAlone: 'L'
                },
                quarter: {
                    type: 'quarters',
                    minLength: 3,
                    standAlone: 'q'
                },
                weekday: {
                    type: 'days',
                    minLength: {
                        E: 0,
                        c: 3,
                        e: 3
                    },
                    standAlone: 'c'
                },
                dayperiod: {
                    type: 'dayPeriods',
                    minLength: 0
                },
                era: {
                    type: 'eras',
                    minLength: 0
                }
            }, TODAY = new DATE(), MODERN_RENDERING_TEMPLATE = '<div tabindex="0" class="k-timeselector">' + '<div class="k-time-header">' + '<span class="k-title"></span>' + '<button class="k-button k-flat k-time-now" title="Select now" aria-label="Select now">Now</button>' + '</div>' + '<div class="k-time-list-container">' + '<span class="k-time-highlight"></span>' + '</div>' + '</div>', NEW_RENDERING_FOOTER = '<div class="k-time-footer k-action-buttons">' + '<button class="k-button k-time-cancel" title="Cancel changes" aria-label="Cancel changes">Cancel</button>' + '<button class="k-time-accept k-button k-primary" title="Set time" aria-label="Set time">Set</button>' + '</div>', HIGHLIGHTCONTAINER = '<span class="k-time-highlight"></span>';
        TODAY = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate(), 0, 0, 0);
        var TimeView = function (options) {
            var that = this, id = options.id;
            that.options = options;
            that._dates = [];
            that._createList(options.timeView && options.timeView.list === 'scroll');
            if (id) {
                that._timeViewID = id + '_timeview';
                that._optionID = id + '_option_selected';
                that.ul.attr(ID, that._timeViewID);
            }
            that._heightHandler = proxy(that._height, that);
            that._popup();
        };
        TimeView.prototype = {
            _createList: function (scroll) {
                if (scroll) {
                    this._createScrollList();
                } else {
                    this._createClassicRenderingList();
                }
            },
            _createScrollList: function () {
                this.list = $(MODERN_RENDERING_TEMPLATE).on(MOUSEDOWN, preventDefault);
                if (!this.options.omitPopup) {
                    this.list.append(NEW_RENDERING_FOOTER);
                }
                this.ul = this.list.find('.k-time-list-container');
                this.list.on('click' + ns, '.k-time-header button.k-time-now', proxy(this._nowClickHandler, this));
                this.list.on('click' + ns, '.k-time-footer button.k-time-cancel', proxy(this._cancelClickHandler, this));
                this.list.on('click' + ns, '.k-time-footer button.k-time-accept', proxy(this._setClickHandler, this));
                this.list.on('mouseover' + ns, '.k-time-list-wrapper', proxy(this._mouseOverHandler, this));
                this.list.on('keydown' + ns, proxy(this._scrollerKeyDownHandler, this));
            },
            _scrollerKeyDownHandler: function (e) {
                var that = this, key = e.keyCode, list = $(e.currentTarget).find('.k-time-list-wrapper.k-state-focused'), lists = that.list.find('.k-time-list-wrapper'), length = lists.length, index = lists.index(list), isRtl = kendo.support.isRtl(that.wrapper), itemHeight = list.find('.k-item:visible:eq(0)').outerHeight(), container = list.find('.k-time-container.k-content.k-scrollable');
                if (!list.length) {
                    return;
                }
                if (key == keys.RIGHT && !isRtl || key == keys.LEFT && isRtl) {
                    if (index + 1 < length) {
                        that._focusList(lists.eq(index + 1));
                    }
                } else if (key == keys.LEFT && !isRtl || key == keys.RIGHT && isRtl) {
                    if (index - 1 >= 0) {
                        that._focusList(lists.eq(index - 1));
                    }
                } else if (key == keys.UP) {
                    container.scrollTop(container.scrollTop() - itemHeight);
                    e.preventDefault();
                } else if (key == keys.DOWN) {
                    container.scrollTop(container.scrollTop() + itemHeight);
                    e.preventDefault();
                } else if (key === keys.ENTER) {
                    that._setClickHandler();
                } else if (key === keys.ESC) {
                    that._cancelClickHandler();
                }
            },
            _mouseOverHandler: function (e) {
                this._focusList($(e.currentTarget));
            },
            _focusList: function (list) {
                this.list.find('.k-time-list-wrapper').removeClass(FOCUSED);
                list.addClass(FOCUSED);
                this.list.focus();
                this._scrollTop = list.find('.k-scrollable').scrollTop();
            },
            _createClassicRenderingList: function () {
                var that = this;
                that.ul = $('<ul tabindex="-1" role="listbox" aria-hidden="true" unselectable="on" class="k-list k-reset"/>').css({ overflow: support.kineticScrollNeeded ? '' : 'auto' }).on(CLICK, LI, proxy(that._click, that)).on('mouseenter' + ns, LI, function () {
                    $(this).addClass(HOVER);
                }).on('mouseleave' + ns, LI, function () {
                    $(this).removeClass(HOVER);
                });
                that.list = $('<div class=\'k-list-container k-list-scroller\' unselectable=\'on\'/>').append(that.ul).on(MOUSEDOWN, preventDefault);
                that.template = kendo.template('<li tabindex="-1" role="option" class="k-item" unselectable="on">#=data#</li>', { useWithBlock: false });
            },
            current: function (candidate) {
                var that = this, active = that.options.active;
                if (candidate !== undefined) {
                    if (that._current) {
                        that._current.removeClass(SELECTED);
                        if (that._current && that._current.length) {
                            that._current[0].removeAttribute(ID);
                            that._current[0].removeAttribute(ARIA_SELECTED);
                        }
                    }
                    if (candidate) {
                        candidate = $(candidate).addClass(SELECTED).attr(ID, that._optionID).attr(ARIA_SELECTED, true);
                        that.scroll(candidate[0]);
                    }
                    that._current = candidate;
                    if (active) {
                        active(candidate);
                    }
                } else {
                    return that._current;
                }
            },
            _updateTitle: function () {
                this.list.find('.k-time-header > .k-title').html(kendo.toString(this._value, this.options.format, this.options.culture));
            },
            applyValue: function (value) {
                if (!value) {
                    return;
                }
                var is12hourFormat = includes(this.options.format.toLowerCase(), 't');
                var hours = value.getHours();
                var minutes = value.getMinutes();
                var seconds = value.getSeconds();
                var designator;
                var hoursList = this.ul.find('[data-index="1"]');
                var minutessList = this.ul.find('[data-index="2"]');
                var secondsList = this.ul.find('[data-index="3"]');
                var designatorList = this.ul.find('[data-index="4"]');
                var item;
                if (is12hourFormat) {
                    if (hours > 12) {
                        designator = 'PM';
                        hours -= 12;
                    } else {
                        designator = 'AM';
                    }
                }
                if (hoursList.length) {
                    item = hoursList.find('.k-item[data-value="' + pad(hours) + '"]');
                    hoursList.scrollTop(hoursList.find('.k-item:visible').index(item) * item.outerHeight());
                }
                if (minutessList.length) {
                    item = minutessList.find('.k-item[data-value="' + pad(minutes) + '"]');
                    minutessList.scrollTop(minutessList.find('.k-item:visible').index(item) * item.outerHeight());
                }
                if (secondsList.length) {
                    item = secondsList.find('.k-item[data-value="' + pad(seconds) + '"]');
                    secondsList.scrollTop(secondsList.find('.k-item:visible').index(item) * item.outerHeight());
                }
                if (designatorList.length) {
                    item = designatorList.find('.k-item[data-value="' + pad(designator) + '"]');
                    designatorList.scrollTop(designatorList.find('.k-item:visible').index(item) * item.outerHeight());
                }
            },
            close: function () {
                this.popup.close();
            },
            destroy: function () {
                var that = this;
                that.ul.off(ns);
                that.list.off(ns);
                if (this.popup) {
                    that.popup.destroy();
                }
            },
            open: function () {
                var that = this;
                var popupHovered;
                if (!that.ul[0].firstChild || that.ul.find('li').length < 1) {
                    that.bind();
                }
                popupHovered = that.popup._hovered;
                that.popup._hovered = true;
                that.popup.open();
                setTimeout(function () {
                    that.popup._hovered = popupHovered;
                }, 1);
                if (that._current) {
                    that.scroll(that._current[0]);
                }
            },
            dataBind: function (dates) {
                var that = this, options = that.options, format = options.format, toString = kendo.toString, template = that.template, length = dates.length, idx = 0, date, html = '';
                for (; idx < length; idx++) {
                    date = dates[idx];
                    if (isInRange(date, options.min, options.max)) {
                        html += template(toString(date, format, options.culture));
                    }
                }
                that._html(html);
            },
            refresh: function () {
                var that = this, options = that.options, format = options.format, offset = dst(), ignoreDST = offset < 0, value = kendo.parseDate(that._value), parsedValue = value ? mergeDateAndTime(value, options.min) : mergeDateAndTime(new Date(), options.min), min = options.min, max = options.max, msMin = getMilliseconds(min), msMax = getMilliseconds(max), msLastTime = getMilliseconds(lastTimeOption(options.interval)), msInterval = options.interval * MS_PER_MINUTE, toString = kendo.toString, template = that.template, start = options.useValueToRender ? parsedValue : new Date(+options.min), startDate = new DATE(start), msStart, length, html = '';
                if (ignoreDST) {
                    length = (MS_PER_DAY + offset * MS_PER_MINUTE) / msInterval;
                } else {
                    length = MS_PER_DAY / msInterval;
                }
                if (msMin != msMax || msLastTime === msMax) {
                    if (msMin > msMax) {
                        msMax += MS_PER_DAY;
                    }
                    length = (msMax - msMin) / msInterval + 1;
                }
                if (options.timeView && options.timeView.list === 'scroll') {
                    html = that._createListContent(splitDateFormat(format));
                } else {
                    that.getDatesInRange(msStart, msMax, startDate, max, msInterval, start).forEach(function (date) {
                        html += template(toString(date, format, options.culture));
                    });
                }
                that._html(html);
            },
            _updateListBottomOffset: function (list) {
                var itemHeight = list.find('.k-item:visible:eq(0)').outerHeight();
                var listHeight = list.outerHeight();
                var bottomOffset = listHeight - itemHeight;
                list.find('.k-scrollable-placeholder').css({ height: list.find('ul').height() + bottomOffset });
            },
            _updateHoursRange: function () {
                var that = this;
                var hoursList = this.ul.find('[data-index="1"]');
                var minHours = this._minHours;
                var maxHours = this._maxHours;
                var is12hourFormat = includes(this.options.format.toLowerCase(), 't');
                var useMax;
                var useMin;
                var firstHourIndex;
                if (!hoursList.length) {
                    return;
                }
                firstHourIndex = firstItemIndex(hoursList.scrollTop(), hoursList.find('.k-item:visible:eq(0)').outerHeight());
                this._selectedHour = +hoursList.find('.k-item:visible').eq(firstHourIndex).attr('data-value');
                if (is12hourFormat && this._selectedDesignator) {
                    if (this._selectedDesignator === 'AM') {
                        if (minHours < 12) {
                            useMin = true;
                        }
                        if (maxHours < 12) {
                            useMax = true;
                        }
                    } else if (this._selectedDesignator === 'PM') {
                        if (minHours > 12) {
                            useMin = true;
                            minHours -= 12;
                        }
                        if (maxHours > 12) {
                            useMax = true;
                            maxHours -= 12;
                        }
                    }
                    hoursList.find('.k-item').each(function (_, item) {
                        item = $(item);
                        var value = +item.attr('data-value');
                        if (that._validateMin && useMin && value < minHours || that._validateMax && useMax && value > maxHours) {
                            item.hide();
                        } else {
                            item.show();
                        }
                    });
                } else {
                    hoursList.find('.k-item').each(function (_, item) {
                        item = $(item);
                        var value = +item.attr('data-value');
                        if (that._validateMin && value < minHours || that._validateMax && value > maxHours) {
                            item.hide();
                        } else {
                            item.show();
                        }
                    });
                }
                this._updateListBottomOffset(hoursList);
            },
            _updateMinutesRange: function () {
                var that = this;
                var minutesList = this.ul.find('[data-index="2"]');
                var minHours = this._minHours;
                var maxHours = this._maxHours;
                var minMinutes = this._minMinutes;
                var maxMinutes = this._maxMinutes;
                var selectedHour = this._selectedHour;
                var firstIndex;
                if (!minutesList.length) {
                    return;
                }
                firstIndex = firstItemIndex(minutesList.scrollTop(), minutesList.find('.k-item:visible:eq(0)').outerHeight());
                this._selectedMinutes = +minutesList.find('.k-item:visible').eq(firstIndex).attr('data-value');
                minutesList.find('.k-item').each(function (_, item) {
                    item = $(item);
                    var value = +item.attr('data-value');
                    if (that._validateMin && value < minMinutes && minHours && selectedHour === minHours || that._validateMax && value > maxMinutes && maxHours && selectedHour === maxHours) {
                        item.hide();
                    } else {
                        item.show();
                    }
                });
                this._updateListBottomOffset(minutesList);
            },
            _updateSecondsRange: function () {
                var that = this;
                var secondsList = this.ul.find('[data-index="3"]');
                var minSeconds = this._minSeconds;
                var maxSeconds = this._minSeconds;
                var minMinutes = this._minMinutes;
                var maxMinutes = this._maxMinutes;
                var selectedMinutes = this._selectedMinutes;
                if (!secondsList.length) {
                    return;
                }
                secondsList.find('.k-item').each(function (_, item) {
                    item = $(item);
                    var value = +item.attr('data-value');
                    if (that._validateMin && value < minSeconds && minMinutes && selectedMinutes === minMinutes || that._validateMax && value > maxSeconds && maxMinutes && selectedMinutes === maxMinutes) {
                        item.hide();
                    } else {
                        item.show();
                    }
                });
                this._updateListBottomOffset(secondsList);
            },
            _updateDesignatorRange: function () {
                var minHours = this._minHours;
                var maxHours = this._maxHours;
                var designatorList = this.ul.find('[data-index="4"]');
                var firstIndex;
                if (!designatorList.length) {
                    return;
                }
                firstIndex = firstItemIndex(designatorList.scrollTop(), designatorList.find('.k-item:visible:eq(0)').outerHeight());
                this._selectedDesignator = designatorList.find('.k-item:visible').eq(firstIndex).attr('data-value');
                if (this._validateMin && minHours >= 12) {
                    designatorList.find('.k-item[data-value="AM"]').hide();
                } else {
                    designatorList.find('.k-item[data-value="AM"]').show();
                }
                if (this._validateMax && maxHours < 12) {
                    designatorList.find('.k-item[data-value="PM"]').hide();
                } else {
                    designatorList.find('.k-item[data-value="PM"]').show();
                }
            },
            _updateRanges: function () {
                if (!this.options.specifiedRange) {
                    return;
                }
                if (!this._value) {
                    this._value = new Date();
                }
                var max = this.options.max;
                var min = this.options.min;
                this._selectedDesignator = this._selectedHour = this._selectedMinutes = this._selectedSeconds = null;
                if (this.options.validateDate) {
                    if (max.getFullYear() === this._value.getFullYear() && max.getMonth() === this._value.getMonth() && max.getDate() === this._value.getDate()) {
                        this._validateMax = true;
                    } else {
                        this._validateMax = false;
                    }
                    if (min.getFullYear() === this._value.getFullYear() && min.getMonth() === this._value.getMonth() && min.getDate() === this._value.getDate()) {
                        this._validateMin = true;
                    } else {
                        this._validateMax = true;
                    }
                    if (!this._validateMax && !this._validateMin) {
                        return;
                    }
                } else {
                    this._validateMax = true;
                    this._validateMin = true;
                }
                this._minMinutes = min.getMinutes();
                this._maxMinutes = max.getMinutes();
                this._minHours = min.getHours();
                this._maxHours = max.getHours();
                this._minSeconds = min.getSeconds();
                this._maxSeconds = max.getSeconds();
                this._updateDesignatorRange();
                this._updateHoursRange();
                this._updateMinutesRange();
                this._updateSecondsRange();
            },
            addTranslate: function () {
                var lists = this.ul.find('.k-time-container.k-content.k-scrollable');
                var length = lists.length;
                var list;
                var itemHeight;
                var listHeight;
                var topOffset;
                var translate;
                var bottomOffset;
                for (var i = 0; i < length; i++) {
                    list = lists.eq(i);
                    itemHeight = list.find('.k-item:visible:eq(0)').outerHeight();
                    listHeight = list.outerHeight();
                    topOffset = (listHeight - itemHeight) / 2;
                    translate = 'translateY(' + topOffset + 'px)';
                    bottomOffset = listHeight - itemHeight;
                    list.find('ul').css({
                        transform: translate,
                        '-ms-transform': translate
                    });
                    list.find('.k-scrollable-placeholder').css({ height: list.find('ul').height() + bottomOffset });
                    list.off(ns).on('click' + ns, '.k-item', proxy(this._itemClickHandler, this)).on('scroll' + ns, proxy(this._listScrollHandler, this));
                }
            },
            _nowClickHandler: function () {
                var now = new Date();
                this.value(now);
                this.options.change(kendo.toString(now, this.options.format, this.options.culture));
            },
            _cancelClickHandler: function () {
                this.value(this._value);
                this.popup.close();
            },
            _setClickHandler: function () {
                this._value = new Date(this._currentlySelected);
                this._updateCurrentlySelected();
                this.options.change(kendo.toString(this._value, this.options.format, this.options.culture), true);
                this.popup.close();
            },
            _listScrollHandler: function (e) {
                var itemHeight = Math.floor($(e.currentTarget).find('.k-item:visible:eq(0)').outerHeight());
                if (e.currentTarget.scrollTop % itemHeight !== 0) {
                    if (e.currentTarget.scrollTop > this._scrollTop) {
                        e.currentTarget.scrollTop = Math.ceil(e.currentTarget.scrollTop / itemHeight) * itemHeight;
                    } else {
                        e.currentTarget.scrollTop = Math.floor(e.currentTarget.scrollTop / itemHeight) * itemHeight;
                    }
                }
                this._scrollTop = e.currentTarget.scrollTop;
                this._updateRanges();
                this._updateCurrentlySelected();
            },
            _updateCurrentlySelected: function () {
                var is12hourFormat = includes(this.options.format.toLowerCase(), 't');
                var hoursList = this.ul.find('[data-index="1"]');
                var minutesList = this.ul.find('[data-index="2"]');
                var secondsList = this.ul.find('[data-index="3"]');
                var designatorList = this.ul.find('[data-index="4"]');
                var selectedHour;
                var selectedMinutes;
                var firstOccurence;
                var selectedSeconds;
                var selectedDesignator;
                if (!this._currentlySelected) {
                    this._currentlySelected = this._value ? new Date(this._value) : new Date();
                }
                if (hoursList.length) {
                    firstOccurence = firstItemIndex(hoursList.scrollTop(), Math.floor(hoursList.find('.k-item:visible:eq(0)').outerHeight()));
                    selectedHour = +hoursList.find('.k-item:visible').eq(firstOccurence).attr('data-value');
                }
                if (minutesList.length) {
                    firstOccurence = firstItemIndex(minutesList.scrollTop(), Math.floor(minutesList.find('.k-item:visible:eq(0)').outerHeight()));
                    selectedMinutes = +minutesList.find('.k-item:visible').eq(firstOccurence).attr('data-value');
                }
                if (secondsList.length) {
                    firstOccurence = firstItemIndex(secondsList.scrollTop(), Math.floor(secondsList.find('.k-item:visible:eq(0)').outerHeight()));
                    selectedSeconds = +secondsList.find('.k-item:visible').eq(firstOccurence).attr('data-value');
                }
                if (designatorList.length) {
                    firstOccurence = firstItemIndex(designatorList.scrollTop(), Math.floor(designatorList.find('.k-item:visible:eq(0)').outerHeight()));
                    selectedDesignator = designatorList.find('.k-item:visible').eq(firstOccurence).attr('data-value');
                }
                if (is12hourFormat) {
                    if (selectedDesignator == 'PM') {
                        selectedHour += 12;
                    }
                    if (selectedDesignator === 'AM' && selectedHour === 12) {
                        selectedHour = 0;
                    }
                }
                if (selectedHour !== undefined) {
                    this._currentlySelected.setHours(selectedHour);
                }
                if (selectedMinutes !== undefined) {
                    this._currentlySelected.setMinutes(selectedMinutes);
                }
                if (selectedSeconds !== undefined) {
                    this._currentlySelected.setSeconds(selectedSeconds);
                }
            },
            _itemClickHandler: function (e) {
                var list = $(e.originalEvent.currentTarget);
                var index = list.find('.k-item:visible').index($(e.currentTarget));
                var itemHeight = list.find('.k-item:visible:eq(0)').outerHeight();
                list.scrollTop(index * itemHeight);
            },
            getDatesInRange: function (msStart, msMax, startDate, max, msInterval, start) {
                var result = [];
                while (true) {
                    if (msMax && (getMilliseconds(start) >= msMax || startDate.getDate() != start.getDate())) {
                        msStart = getMilliseconds(start);
                        if (startDate < start) {
                            msStart += MS_PER_DAY;
                        }
                        if (msStart > msMax) {
                            start = new DATE(+max);
                        }
                        if (getMilliseconds(start) > 0) {
                            result.push(new Date(start));
                        }
                        break;
                    }
                    if (startDate.getDate() != start.getDate()) {
                        break;
                    }
                    result.push(new Date(start));
                    start.setTime(start.getTime() + msInterval);
                }
                return result;
            },
            _createListContent: function (parts) {
                var length = parts.length;
                var result = '';
                var part;
                var values;
                for (var i = 0; i < length; i++) {
                    part = parts[i];
                    if (part.type === 'literal') {
                        result += this._literalTemplate(part);
                    } else {
                        values = this._getValues(part, true);
                        result += this._itemTemplate(values.values, part, part.type, values.index);
                    }
                }
                return result;
            },
            _itemTemplate: function (values, part, title, index) {
                var result = '';
                var length = values.length;
                result += '<div class="k-time-list-wrapper" role="presentation">' + '<span class="k-title">' + (title || part.type) + '</span>' + '<div class="k-time-list">' + '<div class="k-time-container k-content k-scrollable" role="presentation" data-index="' + index + '">' + '<ul class="k-reset">';
                for (var i = 0; i < length; i++) {
                    result += '<li class="k-item" data-value="' + values[i] + '">' + '<span>' + values[i] + '</span>' + '</li>';
                }
                result += '</ul>' + '<div class="k-scrollable-placeholder"></div>' + '</div>' + '</div>' + '</div>';
                return result;
            },
            _getValues: function (part, shouldPad) {
                var result = [];
                var index;
                var start = 0;
                var end;
                if (part.type === 'hour') {
                    index = 1;
                    end = part.hour12 ? 12 : 23;
                } else if (part.type === 'minute') {
                    index = 2;
                    end = 59;
                } else if (part.type === 'second') {
                    index = 3;
                    end = 59;
                }
                for (; start <= end; start++) {
                    result.push(shouldPad ? pad(start) : start);
                }
                return {
                    values: result,
                    index: index
                };
            },
            _literalTemplate: function (part) {
                var result = '<div class="k-time-separator">' + (part.pattern === ' tt' ? ':' : part.pattern) + '</div>';
                if (part.pattern === ' tt') {
                    result += this._itemTemplate([
                        'AM',
                        'PM'
                    ], part, 'AM/PM', 4);
                }
                return result;
            },
            bind: function () {
                var that = this, dates = that.options.dates;
                if (dates && dates[0]) {
                    that.dataBind(dates);
                } else {
                    that.refresh();
                }
            },
            _html: function (html) {
                var that = this;
                if (that.options.timeView && that.options.timeView.list === 'scroll') {
                    html = HIGHLIGHTCONTAINER + html;
                    that.ul.html(html);
                } else {
                    that.ul[0].innerHTML = html;
                    that.popup.unbind(OPEN, that._heightHandler);
                    that.popup.one(OPEN, that._heightHandler);
                    that.current(null);
                    that.select(that._value);
                }
            },
            scroll: function (item) {
                if (!item) {
                    return;
                }
                var content = this.list[0], itemOffsetTop = item.offsetTop, itemOffsetHeight = item.offsetHeight, contentScrollTop = content.scrollTop, contentOffsetHeight = content.clientHeight, bottomDistance = itemOffsetTop + itemOffsetHeight;
                if (contentScrollTop > itemOffsetTop) {
                    contentScrollTop = itemOffsetTop;
                } else if (bottomDistance > contentScrollTop + contentOffsetHeight) {
                    contentScrollTop = bottomDistance - contentOffsetHeight;
                }
                content.scrollTop = contentScrollTop;
            },
            select: function (li) {
                var that = this, options = that.options, current = that._current, selection;
                if (li instanceof Date) {
                    li = kendo.toString(li, options.format, options.culture);
                }
                if (typeof li === 'string') {
                    if (!current || current.text() !== li) {
                        li = $.grep(that.ul[0].childNodes, function (node) {
                            return (node.textContent || node.innerText) == li;
                        });
                        li = li[0] ? li : null;
                    } else {
                        li = current;
                    }
                }
                selection = that._distinctSelection(li);
                that.current(selection);
            },
            _distinctSelection: function (selection) {
                var that = this, currentValue, selectionIndex;
                if (selection && selection.length > 1) {
                    currentValue = getMilliseconds(that._value);
                    selectionIndex = $.inArray(currentValue, that._dates);
                    selection = that.ul.children()[selectionIndex];
                }
                return selection;
            },
            setOptions: function (options) {
                var old = this.options;
                options.min = parse(options.min);
                options.max = parse(options.max);
                this.options = extend(old, options, {
                    active: old.active,
                    change: old.change,
                    close: old.close,
                    open: old.open
                });
                this.bind();
            },
            toggle: function () {
                var that = this;
                if (that.popup.visible()) {
                    that.close();
                } else {
                    that.open();
                }
            },
            value: function (value) {
                var that = this;
                that._value = value;
                if (that.ul[0].firstChild) {
                    if (that.options.timeView && that.options.timeView.list === 'scroll') {
                        that.applyValue(value);
                    } else {
                        that.select(value);
                    }
                }
            },
            _click: function (e) {
                var that = this, li = $(e.currentTarget), date = li.text(), dates = that.options.dates;
                if (dates && dates.length > 0) {
                    date = dates[li.index()];
                }
                if (!e.isDefaultPrevented()) {
                    that.select(li);
                    that.options.change(date, true);
                    that.close();
                }
            },
            _height: function () {
                var that = this;
                var list = that.list;
                var parent = list.parent('.k-animation-container');
                var height = that.options.height;
                if (that.ul[0].children.length) {
                    list.add(parent).show().height(that.ul[0].scrollHeight > height ? height : 'auto').hide();
                }
            },
            _parse: function (value) {
                var that = this, options = that.options, min = getMilliseconds(options.min) != getMilliseconds(TODAY) ? options.min : null, max = getMilliseconds(options.max) != getMilliseconds(TODAY) ? options.max : null, current = that._value || min || max || TODAY;
                if (value instanceof DATE) {
                    return value;
                }
                value = parse(value, options.parseFormats, options.culture);
                if (value) {
                    value = new DATE(current.getFullYear(), current.getMonth(), current.getDate(), value.getHours(), value.getMinutes(), value.getSeconds(), value.getMilliseconds());
                }
                return value;
            },
            _adjustListWidth: function () {
                var list = this.list, width = list[0].style.width, wrapper = this.options.anchor, computedStyle, computedWidth, outerWidth = kendo._outerWidth;
                if (!list.data('width') && width) {
                    return;
                }
                computedStyle = window.getComputedStyle ? window.getComputedStyle(wrapper[0], null) : 0;
                computedWidth = computedStyle ? parseFloat(computedStyle.width) : outerWidth(wrapper);
                if (computedStyle && (browser.mozilla || browser.msie)) {
                    computedWidth += parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight) + parseFloat(computedStyle.borderLeftWidth) + parseFloat(computedStyle.borderRightWidth);
                }
                width = computedWidth - (outerWidth(list) - list.width());
                list.css({
                    fontFamily: wrapper.css('font-family'),
                    width: width
                }).data('width', width);
            },
            _popup: function () {
                var that = this, list = that.list, options = that.options, anchor = options.anchor;
                if (!this.options.omitPopup) {
                    that.popup = new ui.Popup(list, extend(options.popup, {
                        anchor: anchor,
                        open: options.open,
                        close: options.close,
                        animation: options.animation,
                        isRtl: support.isRtl(options.anchor),
                        activate: function () {
                            if (that.options.timeView && that.options.timeView.list === 'scroll') {
                                that.addTranslate();
                                that.applyValue(that._value);
                                that._updateRanges();
                                that._focusList(that.list.find('.k-time-list-wrapper:eq(0)'));
                            }
                        }
                    }));
                } else {
                    list.appendTo(options.timeDiv);
                }
            },
            move: function (e) {
                var that = this, key = e.keyCode, ul = that.ul[0], current = that._current, down = key === keys.DOWN;
                if (key === keys.UP || down) {
                    if (e.altKey) {
                        that.toggle(down);
                        return;
                    } else if (down) {
                        current = current ? current[0].nextSibling : ul.firstChild;
                    } else {
                        current = current ? current[0].previousSibling : ul.lastChild;
                    }
                    if (current) {
                        that.select(current);
                    }
                    that.options.change(that._current.text());
                    e.preventDefault();
                } else if (key === keys.ENTER || key === keys.TAB || key === keys.ESC) {
                    e.preventDefault();
                    if (current) {
                        that.options.change(current.text(), true);
                    }
                    that.close();
                }
            }
        };
        function dst() {
            var today = new DATE(), midnight = new DATE(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0), noon = new DATE(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0, 0);
            return -1 * (midnight.getTimezoneOffset() - noon.getTimezoneOffset());
        }
        function getMilliseconds(date) {
            return date.getHours() * 60 * MS_PER_MINUTE + date.getMinutes() * MS_PER_MINUTE + date.getSeconds() * 1000 + date.getMilliseconds();
        }
        function lastTimeOption(interval) {
            var date = new Date(2100, 0, 1);
            date.setMinutes(-interval);
            return date;
        }
        function isInRange(value, min, max) {
            var msMin = getMilliseconds(min), msMax = getMilliseconds(max), msValue;
            if (!value || msMin == msMax) {
                return true;
            }
            msValue = getMilliseconds(value);
            if (msMin > msValue) {
                msValue += MS_PER_DAY;
            }
            if (msMax < msMin) {
                msMax += MS_PER_DAY;
            }
            return msValue >= msMin && msValue <= msMax;
        }
        TimeView.getMilliseconds = getMilliseconds;
        kendo.TimeView = TimeView;
        var TimePicker = Widget.extend({
            init: function (element, options) {
                var that = this, ul, timeView, disabled;
                options = options || {};
                options.componentType = options.componentType || 'classic';
                Widget.fn.init.call(that, element, options);
                element = that.element;
                options = that.options;
                options.min = parse(element.attr('min')) || parse(options.min);
                options.max = parse(element.attr('max')) || parse(options.max);
                if (+options.max != +TODAY || +options.min != +TODAY) {
                    this._specifiedRange = true;
                }
                normalize(options);
                that._initialOptions = extend({}, options);
                that._wrapper();
                if (that.options.timeView && that.options.timeView.list === 'scroll') {
                    that.options.height = null;
                }
                that.timeView = timeView = new TimeView(extend({}, options, {
                    id: element.attr(ID),
                    anchor: that.wrapper,
                    format: options.format,
                    change: function (value, trigger) {
                        if (trigger) {
                            that._change(value);
                        } else {
                            element.val(value);
                        }
                    },
                    open: function (e) {
                        if (that.options.timeView && that.options.timeView.list !== 'scroll') {
                            that.timeView._adjustListWidth();
                        } else {
                            that.timeView._updateTitle();
                        }
                        if (that.trigger(OPEN)) {
                            e.preventDefault();
                        } else {
                            element.attr(ARIA_EXPANDED, true);
                            ul.attr(ARIA_HIDDEN, false);
                        }
                    },
                    close: function (e) {
                        if (that.trigger(CLOSE)) {
                            e.preventDefault();
                        } else {
                            element.attr(ARIA_EXPANDED, false);
                            ul.attr(ARIA_HIDDEN, true);
                        }
                    },
                    active: function (current) {
                        if (element && element.length) {
                            element[0].removeAttribute(ARIA_ACTIVEDESCENDANT);
                        }
                        if (current) {
                            element.attr(ARIA_ACTIVEDESCENDANT, timeView._optionID);
                        }
                    },
                    specifiedRange: that._specifiedRange
                }));
                ul = timeView.ul;
                that._icon();
                that._reset();
                try {
                    element[0].setAttribute('type', 'text');
                } catch (e) {
                    element[0].type = 'text';
                }
                element.addClass('k-input').attr({
                    'role': 'combobox',
                    'aria-expanded': false,
                    'aria-owns': timeView._timeViewID,
                    'autocomplete': 'off'
                });
                disabled = element.is('[disabled]') || $(that.element).parents('fieldset').is(':disabled');
                if (disabled) {
                    that.enable(false);
                } else {
                    that.readonly(element.is('[readonly]'));
                }
                if (options.dateInput) {
                    var min = options.min;
                    var max = options.max;
                    var today = new DATE();
                    if (getMilliseconds(min) == getMilliseconds(max)) {
                        min = new DATE(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
                        max = new DATE(today.getFullYear(), today.getMonth(), today.getDate(), 24, 0, 0);
                    }
                    that._dateInput = new ui.DateInput(element, {
                        culture: options.culture,
                        format: options.format,
                        min: min,
                        max: max,
                        value: options.value,
                        interval: options.interval
                    });
                }
                that._old = that._update(options.value || that.element.val());
                that._oldText = element.val();
                kendo.notify(that);
            },
            options: {
                name: 'TimePicker',
                min: TODAY,
                max: TODAY,
                format: '',
                dates: [],
                parseFormats: [],
                value: null,
                interval: 30,
                height: 200,
                animation: {},
                dateInput: false
            },
            events: [
                OPEN,
                CLOSE,
                CHANGE
            ],
            componentTypes: {
                'classic': { timeView: { list: 'list' } },
                'modern': { timeView: { list: 'scroll' } }
            },
            setOptions: function (options) {
                var that = this;
                var value = that._value;
                Widget.fn.setOptions.call(that, options);
                options = that.options;
                normalize(options);
                that.timeView.setOptions(options);
                if (value) {
                    that.element.val(kendo.toString(value, options.format, options.culture));
                }
            },
            dataBind: function (dates) {
                if (isArray(dates)) {
                    this.timeView.dataBind(dates);
                }
            },
            _editable: function (options) {
                var that = this, disable = options.disable, readonly = options.readonly, arrow = that._arrow.off(ns), element = that.element.off(ns), wrapper = that._inputWrapper.off(ns);
                if (that._dateInput) {
                    that._dateInput._unbindInput();
                }
                if (!readonly && !disable) {
                    wrapper.addClass(DEFAULT).removeClass(STATEDISABLED).on(HOVEREVENTS, that._toggleHover);
                    if (element && element.length) {
                        element[0].removeAttribute(DISABLED);
                        element[0].removeAttribute(READONLY);
                    }
                    element.attr(ARIA_DISABLED, false).on('keydown' + ns, proxy(that._keydown, that)).on('focusout' + ns, proxy(that._blur, that)).on('focus' + ns, function () {
                        that._inputWrapper.addClass(FOCUSED);
                    });
                    if (that._dateInput) {
                        that._dateInput._bindInput();
                    }
                    arrow.on(CLICK, proxy(that._click, that)).on(MOUSEDOWN, preventDefault);
                } else {
                    wrapper.addClass(disable ? STATEDISABLED : DEFAULT).removeClass(disable ? DEFAULT : STATEDISABLED);
                    element.attr(DISABLED, disable).attr(READONLY, readonly).attr(ARIA_DISABLED, disable);
                }
            },
            readonly: function (readonly) {
                this._editable({
                    readonly: readonly === undefined ? true : readonly,
                    disable: false
                });
            },
            enable: function (enable) {
                this._editable({
                    readonly: false,
                    disable: !(enable = enable === undefined ? true : enable)
                });
            },
            destroy: function () {
                var that = this;
                Widget.fn.destroy.call(that);
                that.timeView.destroy();
                that.element.off(ns);
                that._arrow.off(ns);
                that._inputWrapper.off(ns);
                if (that._form) {
                    that._form.off('reset', that._resetHandler);
                }
            },
            close: function () {
                this.timeView.close();
            },
            open: function () {
                this.timeView.open();
            },
            min: function (value) {
                return this._option('min', value);
            },
            max: function (value) {
                return this._option('max', value);
            },
            value: function (value) {
                var that = this;
                if (value === undefined) {
                    return that._value;
                }
                that._old = that._update(value);
                if (that._old === null) {
                    that.element.val('');
                }
                that._oldText = that.element.val();
            },
            _blur: function () {
                var that = this, value = that.element.val();
                if (!(that.options.timeView && that.options.timeView.list === 'scroll')) {
                    that.close();
                }
                if (value !== that._oldText) {
                    that._change(value);
                }
                that._inputWrapper.removeClass(FOCUSED);
            },
            _click: function () {
                var that = this, element = that.element;
                that.timeView.toggle();
                if (!support.touch && element[0] !== activeElement()) {
                    element.trigger('focus');
                }
            },
            _change: function (value) {
                var that = this, oldValue = that.element.val(), dateChanged;
                value = that._update(value);
                dateChanged = !kendo.calendar.isEqualDate(that._old, value);
                var valueUpdated = dateChanged && !that._typing;
                var textFormatted = oldValue !== that.element.val();
                if (valueUpdated || textFormatted) {
                    that.element.trigger(CHANGE);
                }
                if (dateChanged) {
                    that._old = value;
                    that._oldText = that.element.val();
                    that.trigger(CHANGE);
                }
                that._typing = false;
            },
            _icon: function () {
                var that = this, element = that.element, arrow;
                arrow = element.next('span.k-select');
                if (!arrow[0]) {
                    arrow = $('<span unselectable="on" class="k-select" aria-label="select"><span class="k-icon k-i-clock"></span></span>').insertAfter(element);
                }
                that._arrow = arrow.attr({
                    'role': 'button',
                    'aria-controls': that.timeView._timeViewID
                });
            },
            _keydown: function (e) {
                var that = this, key = e.keyCode, timeView = that.timeView, value = that.element.val();
                if (timeView.popup.visible() || e.altKey) {
                    timeView.move(e);
                    if (that._dateInput && e.stopImmediatePropagation) {
                        e.stopImmediatePropagation();
                    }
                } else if (key === keys.ENTER && value !== that._oldText) {
                    that._change(value);
                } else {
                    that._typing = true;
                }
            },
            _option: function (option, value) {
                var that = this, options = that.options;
                if (value === undefined) {
                    return options[option];
                }
                value = that.timeView._parse(value);
                if (!value) {
                    return;
                }
                value = new DATE(+value);
                options[option] = value;
                that.timeView.options[option] = value;
                that.timeView.bind();
            },
            _toggleHover: function (e) {
                $(e.currentTarget).toggleClass(HOVER, e.type === 'mouseenter');
            },
            _update: function (value) {
                var that = this, options = that.options, timeView = that.timeView, date = timeView._parse(value);
                if (!isInRange(date, options.min, options.max)) {
                    date = null;
                }
                that._value = date;
                that._currentlySelected = date;
                if (that._dateInput && date) {
                    that._dateInput.value(date || value);
                } else {
                    that.element.val(kendo.toString(date || value, options.format, options.culture));
                }
                timeView.value(date);
                return date;
            },
            _wrapper: function () {
                var that = this, element = that.element, wrapper;
                wrapper = element.parents('.k-timepicker');
                if (!wrapper[0]) {
                    wrapper = element.wrap(SPAN).parent().addClass('k-picker-wrap k-state-default');
                    wrapper = wrapper.wrap(SPAN).parent();
                }
                wrapper[0].style.cssText = element[0].style.cssText;
                that.wrapper = wrapper.addClass('k-widget k-timepicker').addClass(element[0].className);
                element.css({
                    width: '100%',
                    height: element[0].style.height
                });
                that._inputWrapper = $(wrapper[0].firstChild);
            },
            _reset: function () {
                var that = this, element = that.element, formId = element.attr('form'), form = formId ? $('#' + formId) : element.closest('form');
                if (form[0]) {
                    that._resetHandler = function () {
                        that.value(element[0].defaultValue);
                        that.max(that._initialOptions.max);
                        that.min(that._initialOptions.min);
                    };
                    that._form = form.on('reset', that._resetHandler);
                }
            }
        });
        function normalize(options) {
            var parseFormats = options.parseFormats;
            options.format = extractFormat(options.format || kendo.getCulture(options.culture).calendars.standard.patterns.t);
            parseFormats = isArray(parseFormats) ? parseFormats : [parseFormats];
            parseFormats.splice(0, 0, options.format);
            options.parseFormats = parseFormats;
        }
        function preventDefault(e) {
            e.preventDefault();
        }
        function mergeDateAndTime(date, time) {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
        }
        function datePattern(format, info) {
            var calendar = info.calendar;
            var result;
            if (typeof format === 'string') {
                if (calendar.patterns[format]) {
                    result = calendar.patterns[format];
                } else {
                    result = format;
                }
            }
            if (!result) {
                result = calendar.patterns.d;
            }
            return result;
        }
        function addLiteral(parts, value) {
            var lastPart = parts[parts.length - 1];
            if (lastPart && lastPart.type === 'LITERAL') {
                lastPart.pattern += value;
            } else {
                parts.push({
                    type: LITERAL,
                    pattern: value
                });
            }
        }
        function isHour12(pattern) {
            return pattern === 'h' || pattern === 'K';
        }
        function dateNameType(formatLength) {
            var nameType;
            if (formatLength <= 3) {
                nameType = 'abbreviated';
            } else if (formatLength === 4) {
                nameType = 'wide';
            } else if (formatLength === 5) {
                nameType = 'narrow';
            } else if (formatLength === 6) {
                nameType = 'short';
            }
            return nameType;
        }
        function startsWith(text, searchString, position) {
            position = position || 0;
            return text.indexOf(searchString, position) === position;
        }
        function includes(text, subStr) {
            var returnValue = false;
            if (text.indexOf(subStr) !== -1) {
                returnValue = true;
            }
            return returnValue;
        }
        function splitDateFormat(format) {
            var info = kendo.culture();
            var pattern = datePattern(format, info);
            var parts = [];
            var lastIndex = dateFormatRegExp.lastIndex = 0;
            var match = dateFormatRegExp.exec(pattern);
            var specifier;
            var type;
            var part;
            var names;
            var minLength;
            var patternLength;
            while (match) {
                var value = match[0];
                if (lastIndex < match.index) {
                    addLiteral(parts, pattern.substring(lastIndex, match.index));
                }
                if (startsWith(value, '"') || startsWith(value, '\'')) {
                    addLiteral(parts, value);
                } else {
                    specifier = value[0];
                    type = DATE_FIELD_MAP[specifier];
                    part = {
                        type: type,
                        pattern: value
                    };
                    if (type === 'hour') {
                        part.hour12 = isHour12(value);
                    }
                    names = NAME_TYPES[type];
                    if (names) {
                        minLength = typeof names.minLength === 'number' ? names.minLength : names.minLength[specifier];
                        patternLength = value.length;
                        if (patternLength >= minLength) {
                            part.names = {
                                type: names.type,
                                nameType: dateNameType(patternLength),
                                standAlone: names.standAlone === specifier
                            };
                        }
                    }
                    parts.push(part);
                }
                lastIndex = dateFormatRegExp.lastIndex;
                match = dateFormatRegExp.exec(pattern);
            }
            if (lastIndex < pattern.length) {
                addLiteral(parts, pattern.substring(lastIndex));
            }
            return parts;
        }
        function pad(value, size) {
            var s = String(value);
            while (s.length < (size || 2)) {
                s = '0' + s;
            }
            return s;
        }
        function firstItemIndex(scrollTop, itemHeight) {
            return Math.max(Math.floor(scrollTop / itemHeight), 0);
        }
        ui.plugin(TimePicker);
    }(window.kendo.jQuery));
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
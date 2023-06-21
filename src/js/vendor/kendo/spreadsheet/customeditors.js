/**
 * Kendo UI v2023.2.606 (http://www.telerik.com/kendo-ui)
 * Copyright 2023 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
import "../kendo.core.js";
import "../kendo.popup.js";
import "../kendo.calendar.js";
import "../kendo.listview.js";
import "./sheet.js";

(function(kendo) {

    "use strict";



    var $ = kendo.jQuery;

    var EDITORS = {};

    var registerEditor = kendo.spreadsheet.registerEditor = function(name, editor) {
        EDITORS[name] = editor;
    };

    kendo.spreadsheet.Sheet.prototype.activeCellCustomEditor = function() {
        var cell = this.activeCell().first();

        if (this.range(cell).enable()) {
            var val = this.validation(cell);
            var key = this._properties.get("editor", this._grid.cellRefIndex(cell));
            var editor;

            if (key != null) {
                editor = EDITORS[key];
            }
            else if (val && val.showButton) {
                key = "_validation_" + val.dataType;
                editor = EDITORS[key];
            }

            if (typeof editor == "function") {
                editor = EDITORS[key] = editor();
            }

            return editor;
        }
    };

    registerEditor("_validation_date", function(){
        var context, calendar, popup;

        function create() {
            if (!calendar) {
                calendar = $("<div>").kendoCalendar();
                popup = $("<div>").kendoPopup();
                calendar.appendTo(popup);
                calendar = calendar.getKendoCalendar();
                popup = popup.getKendoPopup();

                calendar.bind("change", function(){
                    popup.close();
                    var date = calendar.value();
                    if (!context.range.format()) {
                        context.range.format("yyyy-mm-dd");
                    }
                    context.callback(kendo.spreadsheet.dateToNumber(date));
                });
            }
            popup.setOptions({
                anchor: context.view.element.find(".k-spreadsheet-editor-button")
            });
        }

        function open() {
            create();

            var date = context.range.value();
            var sheet = context.range.sheet();
            if (date != null) {
                calendar.value(kendo.spreadsheet.numberToDate(date));
            } else {
                calendar.value(null);
            }
            var val = context.validation;
            if (val) {
                var min = kendo.ui.Calendar.fn.options.min;
                var max = kendo.ui.Calendar.fn.options.max;
                var fromValidation = val.from;
                var toValidation = val.to;
                var formula = kendo.spreadsheet.calc.runtime.Formula;

                if (/^(?:greaterThan|between)/.test(val.comparerType)) {
                    if(fromValidation instanceof formula && _rowAndColPresent(fromValidation.value)) {
                        min = kendo.spreadsheet.numberToDate(sheet.range(fromValidation.value.row, fromValidation.value.col).value());
                    } else {
                        min = kendo.spreadsheet.numberToDate(fromValidation.value);
                    }
                }
                if (val.comparerType == "between") {
                    if(toValidation instanceof formula && _rowAndColPresent(toValidation.value)) {
                        max = kendo.spreadsheet.numberToDate(sheet.range(toValidation.value.row, toValidation.value.col).value());
                    } else {
                        max = kendo.spreadsheet.numberToDate(val.to.value);
                    }
                }
                if (val.comparerType == "lessThan" || val.comparerType == "lessThanOrEqualTo") {
                    if(fromValidation instanceof formula && _rowAndColPresent(fromValidation.value)) {
                        max = kendo.spreadsheet.numberToDate(sheet.range(fromValidation.value.row, fromValidation.value.col).value());
                    } else {
                        max = kendo.spreadsheet.numberToDate(val.from.value);
                    }
                }
                calendar.setOptions({
                    disableDates: function(date) {
                        var from, to;

                        if(fromValidation && fromValidation instanceof formula && _rowAndColPresent(fromValidation.value)) {
                            from = sheet.range(fromValidation.value.row, fromValidation.value.col).value();
                        } else {
                            from = fromValidation ? fromValidation.value|0 : 0;
                        }

                        if(toValidation && toValidation instanceof formula && _rowAndColPresent(toValidation.value)) {
                            to = sheet.range(toValidation.value.row, toValidation.value.col).value();
                        } else {
                            to = toValidation ? toValidation.value|0 : 0;
                        }

                        date = kendo.spreadsheet.dateToNumber(date) | 0;
                        return !kendo.spreadsheet.validation
                            .validationComparers[val.comparerType](date, from, to);
                    },
                    min: min,
                    max: max
                });
            } else {
                calendar.setOptions({ disableDates: null, min: null, max: null });
            }
            popup.open();
        }

        function _rowAndColPresent(value) {
            return (value && value.row !== null && value.col !== null && value.row > -1 && value.col > -1);
        }

        return {
            edit: function(options) {
                context = options;
                open();
            },
            icon: "calendar"
        };
    });

    registerEditor("_validation_list", function(){
        var context, list, popup;
        function create() {
            if (!list) {
                list = $("<ul class='k-list k-reset'/>").kendoStaticList({
                    template   : "#:value#",
                    selectable : true,
                    autoBind   : false
                });
                popup = $("<div class='k-spreadsheet-list-popup'>").kendoPopup();
                list.appendTo(popup);
                popup = popup.getKendoPopup();
                list = list.getKendoStaticList();

                list.bind("change", function(){
                    popup.close();
                    var item = list.value()[0];
                    if (item) {
                        context.callback(item.value);
                    }
                });
            }
            popup.setOptions({
                anchor: context.view.element.find(".k-spreadsheet-editor-button")
            });
        }
        function open() {
            create();
            var items = context.validation.from.value;
            var data = [], add = function(el){ data.push({ value: el }); };
            if (items instanceof kendo.spreadsheet.calc.runtime.Matrix) {
                items.each(add);
            } else {
                // actually Excel expects a simple string for list
                // validation (comma-separated labels).
                (items+"").split(/\s*,\s*/).forEach(add);
            }
            var dataSource = new kendo.data.DataSource({ data: data });
            list.setDataSource(dataSource);
            dataSource.read();
            popup.open();
        }
        return {
            edit: function(options) {
                context = options;
                open();
            },
            icon: "caret-alt-down"
        };
    });

})(window.kendo);

/**
 * Kendo UI v2023.3.1010 (http://www.telerik.com/kendo-ui)
 * Copyright 2023 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
import "./kendo.popup.js";
import "./kendo.tabstrip.js";
import "./kendo.filtermenu.js";
import "./kendo.menu.js";
import "./kendo.expansionpanel.js";
import "./kendo.html.button.js";
import "./kendo.icons.js";

var __meta__ = {
    id: "columnmenu",
    name: "Column Menu",
    category: "framework",
    depends: [ "popup", "tabstrip", "filtermenu", "menu", 'expansionpanel', 'html.button', "icons" ],
    advanced: true
};

(function($, undefined) {
    var kendo = window.kendo,
        encode = kendo.htmlEncode,
        ui = kendo.ui,
        extend = $.extend,
        grep = $.grep,
        encode = kendo.htmlEncode,
        map = $.map,
        inArray = $.inArray,
        Comparer = kendo.data.Comparer,
        ACTIVE = "k-selected",
        ASC = "asc",
        DESC = "desc",
        CHANGE = "change",
        INIT = "init",
        OPEN = "open",
        SELECT = "select",
        STICK = "stick",
        UNSTICK = "unstick",
        POPUP = "kendoPopup",
        FILTERMENU = "kendoFilterMenu",
        TABSTRIP = "kendoTabStrip",
        MENU = "kendoMenu",
        EXPANSIONPANEL = "kendoExpansionPanel",
        NS = ".kendoColumnMenu",
        COLUMN_HEADER_SELECTOR = ".k-table-th",
        Widget = ui.Widget;

    function trim(text) {
        return kendo.trim(text).replace(/&nbsp;/gi, "");
    }

    function toHash(arr, key) {
        var result = {};
        var idx, len, current;
        for (idx = 0, len = arr.length; idx < len; idx ++) {
            current = arr[idx];
            result[current[key]] = current;
        }
        return result;
    }

    function columnsGroupFilterHandler(column) {
        return this.columns.indexOf(column.title) >= 0 || this.columns.indexOf(column.field) >= 0;
    }

    function leafColumns(columns) {
        var result = [];

        for (var idx = 0; idx < columns.length; idx++) {
            if (!columns[idx].columns) {
                result.push(columns[idx]);
                continue;
            }
            result = result.concat(leafColumns(columns[idx].columns));
        }

        return result;
    }

    function attrEquals(attrName, attrValue) {
        return "[" + kendo.attr(attrName) + "='" + (attrValue || "").replace(/'/g, "\"") + "']";
    }

    function insertElementAt(index, element, container) {
        if (index > 0) {
            element.insertAfter(container.children().eq(index - 1));
        } else {
            container.prepend(element);
        }
    }

    function columnOccurrences(columns) {
        var columnDict = {};
        var signature;

        for (var i = 0; i < columns.length; i++) {
            signature = JSON.stringify(columns[i]);

            if (columnDict[signature]) {
                columnDict[signature].push(i);
            } else {
                columnDict[signature] = [i];
            }
        }

        return columnDict;
    }

    function oldColumnOccurrences(renderedListElements, checkBoxes) {
        var indexAttr = kendo.attr("index");
        var fieldAttr = kendo.attr("field");
        var columnDict = {};
        var signature;
        var columCheckbox;
        var index;
        var field;
        var title;

        for (var j = 0; j < renderedListElements.length; j++) {
            columCheckbox = checkBoxes.eq(j);
            index = parseInt(columCheckbox.attr(indexAttr), 10);
            field = columCheckbox.attr(fieldAttr);
            title = columCheckbox.attr("title");
            signature = field ? field : title;

            if (columnDict[signature]) {
                columnDict[signature].push(index);
            } else {
                columnDict[signature] = [index];
            }
        }

        return columnDict;
    }

    var ColumnMenu = Widget.extend({
        init: function(element, options) {
            var that = this,
                columnHeader;

            options = options || {};
            options.componentType = options.componentType || "classic";
            Widget.fn.init.call(that, element, options);

            element = that.element;
            options = that.options;
            that.owner = options.owner;
            that.dataSource = options.dataSource;

            that.field = element.attr(kendo.attr("field"));
            that.title = element.attr(kendo.attr("title"));

            columnHeader = $(element.closest(COLUMN_HEADER_SELECTOR));
            if (columnHeader.length) {
                that.appendTo = columnHeader.find(options.appendTo);
            } else {
                that.appendTo = $(options.appendTo);
            }

            that.link = that._createLink();

            that.wrapper = $('<div />');

            that._applyCssClasses();

            that._refreshHandler = that.refresh.bind(that);

            that.dataSource.bind(CHANGE, that._refreshHandler);
        },

        _init: function() {
            var that = this;

            that.pane = that.options.pane;
            if (that.pane) {
                that._isMobile = true;
            }

            if (that._isMobile) {
                that._createMobileMenu();
            } else {
                that._createMenu();
            }

            that.owner._muteAngularRebind(function() {
                that._angularItems("compile");
            });

            that._sort();

            that._columns();

            that._filter();

            that._lockColumns();

            that._reorderColumns();

            that._stickyColumns();

            that._sizeColumns();

            that._groupColumn();

            that.trigger(INIT, { field: that.field, container: that.wrapper });
        },

        events: [ INIT, OPEN, "sort", "filtering", STICK, UNSTICK ],

        options: {
            name: "ColumnMenu",
            messages: {
                sortAscending: "Sort Ascending",
                sortDescending: "Sort Descending",
                filter: "Filter",
                column: "Column",
                columns: "Columns",
                columnVisibility: "Column Visibility",
                clear: "Clear",
                cancel: "Cancel",
                done: "Done",
                settings: "Edit Column Settings",
                lock: "Lock Column",
                unlock: "Unlock Column",
                stick: "Stick Column",
                unstick: "Unstick Column",
                setColumnPosition: "Set Column Position",
                apply: "Apply",
                reset: "Reset",
                buttonTitle: "{0} edit column settings",
                movePrev: "Move previous",
                moveNext: "Move next",
                groupColumn: "Group column",
                ungroupColumn: "Ungroup column",
                autoSizeColumn: "Autosize This Column",
                autoSizeAllColumns: "Autosize All Columns"
            },
            filter: "",
            columns: true,
            sortable: true,
            filterable: true,
            autoSize: false,
            animations: {
                left: "slide"
            },
            encodeTitles: false,
            componentType: "classic",
            appendTo: null
        },

        _applyCssClasses: function() {
            var that = this,
                componentType = that.options.componentType,
                wrapper = that.wrapper;

            if (componentType === "tabbed") {
                wrapper.addClass("k-column-menu-tabbed");
            }

            wrapper.addClass("k-column-menu");
        },

        _createMenu: function() {
            var that = this,
                options = that.options,
                columns = that._ownerColumns(),
                flattenMenuCols,
                menuTemplate,
                menuElement;

            if (that._hasGroups()) {
                columns = that._groupColumns(columns);
                flattenMenuCols = that._flattenMenuCols(columns);
                if (flattenMenuCols.length !== that.owner.columns.length) {
                    that._syncMenuCols(flattenMenuCols, that.owner.columns);
                }
            }

            if (that._isModernComponentType()) {
                menuTemplate = kendo.template(modernTemplate);
            } else if (that._isTabbedComponentType()) {
                menuTemplate = kendo.template(tabbedTemplate);
            } else {
                menuTemplate = kendo.template(template);
            }

            menuElement = $(menuTemplate({
                uid: kendo.guid(),
                ns: kendo.ns,
                messages: options.messages,
                sortable: options.sortable,
                filterable: options.filterable,
                columns: columns,
                showColumns: options.columns,
                hasLockableColumns: options.hasLockableColumns,
                hasStickableColumns: options.hasStickableColumns,
                encodeTitles: options.encodeTitles,
                omitWrapAttribute: kendo.attr("omit-wrap"),
                reorderable: options.reorderable,
                groupable: options.groupable,
                autoSize: options.autoSize
            }));

            kendo.applyStylesFromKendoAttributes(menuElement, ["display"]);
            that.wrapper.empty().append(menuElement);

            that.popup = that.wrapper[POPUP]({
                anchor: that.link,
                copyAnchorStyles: false,
                open: that._open.bind(that),
                activate: that._activate.bind(that),
                deactivate: that._deactivate.bind(that),
                close: function(e) {
                    if (that.menu) {
                        that.menu._closing = e.sender.element;
                    }
                    if (that.options.closeCallback) {
                        that.options.closeCallback(that.element);
                    }
                }
            }).data(POPUP);

            if (that._isModernComponentType() || that._isTabbedComponentType()) {
                that.popup.element.addClass("k-grid-columnmenu-popup");
                that._createExpanders();
            } else {
                that.menu = that.wrapper.children()[MENU]({
                    orientation: "vertical",
                    closeOnClick: false,
                    open: function() {
                        that._updateMenuItems();
                    }
                }).data(MENU);
            }

            if (that._isTabbedComponentType()) {
                that.tabStrip = menuElement[TABSTRIP]({
                    applyMinHeight: false,
                    animation: {
                        open: {
                            effects: "fadeIn"
                        }
                    }
                }).data(TABSTRIP);

                that.tabStrip.activateTab(that.tabStrip.tabGroup.find("li:first"));
            }
        },

        _createLink: function() {
            var that = this,
                element = that.element,
                appendTarget = that.appendTo.length ? element.find(that.appendTo) : element,
                link = element.find(".k-grid-column-menu"),
                title = encode(kendo.format(that.options.messages.buttonTitle, that.title || that.field));

            if (!link[0]) {
                element.addClass("k-filterable");

                link = appendTarget
                    .append('<a class="k-grid-column-menu k-grid-header-menu" href="#" aria-hidden="true" title="' +
                                title + '">' + kendo.ui.icon("more-vertical") + '</a>')
                    .find(".k-grid-column-menu");
            }

            link.attr("tabindex", -1)
                .on("click" + NS, that._click.bind(that));

            return link;
        },

        _createExpanders: function() {
            var that = this;
            var options = that.options;
            var expanderOptions = {
                expanded: false,
                headerClass: "k-columnmenu-item",
                useBareTemplate: true
            };

            if (that._isModernComponentType()) {
                that.wrapper.find(".k-columns-item")[EXPANSIONPANEL]($.extend(true, {}, expanderOptions,{
                    title: kendo.ui.icon("columns") + '<span>' + encode(options.messages.columns) + '</span>'
                }));
                that.wrapper.find(".k-column-menu-filter")[EXPANSIONPANEL]($.extend(true, {}, expanderOptions,{
                    title: kendo.ui.icon("filter") + '<span>' + encode(options.messages.filter) + '</span>'
                }));
            }

            that.wrapper.find(".k-column-menu-position")[EXPANSIONPANEL]($.extend(true, {}, expanderOptions,{
                title: kendo.ui.icon("set-column-position") + '<span>' + encode(options.messages.setColumnPosition) + '</span>'
            }));
        },

        _syncMenuCols: function(menuCols, ownerCols) {
            var length = ownerCols.length;
            var ownerCol;
            var menuColsFields = menuCols.map(function(col) {
                return col.field;
            });

            for (var i = 0; i < length; i++) {
                ownerCol = ownerCols[i];
                if (menuColsFields.indexOf(ownerCol.field) < 0) {
                    ownerCol.menu = false;
                }
            }
        },

        _flattenMenuCols: function(cols) {
            var result = [];
            var length = cols.length;

            for (var i = 0; i < length; i++) {
                if (cols[i].columns) {
                    result = result.concat(this._flattenMenuCols(cols[i].columns));
                } else if (!cols[i].groupHeader) {
                    result.push(cols[i]);
                }
            }
            return result;
        },

        _groupColumns: function(columns, nest) {
            var result = [];
            var groups = this.options.columns.groups;
            var length = groups.length;
            var i;
            var currGroup;
            var filterHandler;
            var group;
            var groupColumns;

            for (i = 0; i < length; i++) {
                currGroup = groups[i];
                filterHandler = columnsGroupFilterHandler.bind(currGroup);
                group = { title: currGroup.title, groupHeader: true };
                groupColumns = columns.filter(filterHandler);
                result.push(group);

                if (nest) {
                    group.columns = groupColumns;
                } else {
                    result = result.concat(groupColumns);
                }
            }

            return result;
        },

        _hasGroups: function() {
            return this.options.columns && this.options.columns.groups && this.options.columns.groups.length;
        },

        _isModernComponentType: function() {
            return this.options.componentType === 'modern' && !this._isMobile;
        },

        _isTabbedComponentType: function() {
            return this.options.componentType === 'tabbed' && !this._isMobile;
        },

        _deactivate: function() {
            if (this.menu) {
                this.menu._closing = false;
            }
        },

        _createMobileMenu: function() {
            var that = this,
                options = that.options,
                columns = that._ownerColumns(),
                groups,
                flattenMenuCols;

            if (that._hasGroups()) {
                groups = that._groupColumns(columns, true);
                flattenMenuCols = that._flattenMenuCols(groups);
                if (flattenMenuCols.length !== that.owner.columns.length) {
                    that._syncMenuCols(flattenMenuCols, that.owner.columns);
                }
            }

            var html = kendo.template(mobileTemplate)({
                ns: kendo.ns,
                field: that.field,
                title: that.title || that.field,
                messages: options.messages,
                sortable: options.sortable,
                filterable: options.filterable,
                columns: columns,
                showColumns: options.columns,
                hasLockableColumns: options.hasLockableColumns,
                hasStickableColumns: options.hasStickableColumns,
                hasGroups: that._hasGroups(),
                groups: groups,
                reorderable: options.reorderable,
                groupable: options.groupable
            });

            that.view = that.pane.append(html);
            that.view.state = { columns: {} };

            that.wrapper = that.view.element.find(".k-column-menu");

            that.menu = new MobileMenu(that.wrapper.children(), {
                pane: that.pane,
                columnMenu: that
            });

            // The toggle animation of the switches should not propagate to the view
            that.menu.element.on("transitionend" + NS, function(e) {
                e.stopPropagation();
            });

            var viewElement = that.view.wrapper && that.view.wrapper[0] ? that.view.wrapper : that.view.element;

            viewElement.on("click", ".k-header-done", function(e) {
                e.preventDefault();

                that.menu._applyChanges();
                that.menu._cancelChanges(false);
                that.close();
            });

            viewElement.on("click", ".k-header-cancel", function(e) {
                e.preventDefault();

                that.menu._cancelChanges(true);
                that.close();
            });

            that.view.bind("showStart", function() {
                var view = that.view || { columns: {} };

                if (that.options.hasLockableColumns) {
                    that._updateLockedColumns();
                }

                if (that.options.hasStickableColumns) {
                    that._updateStickyColumns();
                }

                if (that.options.reorderable) {
                    that._updateReorderColumns();
                }

                if (that.options.groupable) {
                    that._updateGroupColumns();
                }

                if (view.element.find(".k-sort-asc.k-selected").length) {
                    view.state.initialSort = "asc";
                } else if (view.element.find(".k-sort-desc.k-selected").length) {
                    view.state.initialSort = "desc";
                }
            });
        },

        _angularItems: function(action) {
            var that = this;
            that.angular(action, function() {
                var items = that.wrapper.find(".k-columns-item input[" + kendo.attr("field") + "]").map(function() {
                    return $(this).closest("li");
                });
                var data = map(that._ownerColumns(), function(col) {
                    return { column: col._originalObject };
                });
                return {
                    elements: items,
                    data: data
                };
            });
        },

        destroy: function() {
            var that = this;

            that._angularItems("cleanup");

            Widget.fn.destroy.call(that);

            if (that.filterMenu) {
                that.filterMenu.destroy();
            }

            if (that._refreshHandler) {
                that.dataSource.unbind(CHANGE, that._refreshHandler);
            }

            if (that.options.columns && that.owner) {
                if (that._updateColumnsMenuHandler) {
                    that.owner.unbind("columnShow", that._updateColumnsMenuHandler);
                    that.owner.unbind("columnHide", that._updateColumnsMenuHandler);
                }

                if (that._updateColumnsLockedStateHandler) {
                    that.owner.unbind("columnLock", that._updateColumnsLockedStateHandler);
                    that.owner.unbind("columnUnlock", that._updateColumnsLockedStateHandler);
                }
            }

            if (that.menu) {
                that.menu.element.off(NS);
                that.menu.destroy();
            }

            that.wrapper.off(NS);

            if (that.popup) {
                that.popup.destroy();
            }

            if (that.view) {
                that.view.purge();
            }

            that.link.off(NS);
            that.owner = null;
            that.wrapper = null;
            that.element = null;
        },

        close: function() {
            if (this.menu) {
                this.menu.close();
            }
            if (this.popup) {
                this.popup.close();
                this.popup.element.off("keydown" + NS);
            }
        },

        _click: function(e) {
            var that = this;

            e.preventDefault();
            e.stopPropagation();

            var options = this.options;

            if (options.filter && this.element.is(!options.filter)) {
                return;
            }

            if (!this.popup && !this.pane) {
                this._init();
            } else {
                that._updateMenuItems();
            }

            if (this._isMobile) {
                this.pane.navigate(this.view, this.options.animations.left);
            } else {
                this.popup.toggle();
            }
        },

        _updateMenuItems: function() {
            var that = this;
            if (that.options.columns) {
                that._setMenuItemsVisibility();
                if (!that.options.columns.sort && !that.options.columns.groups) {
                    that._reorderMenuItems();
                } else {
                    that._updateDataIndexes();
                }
            }
        },

        _setMenuItemsVisibility: function() {
            var that = this;

            that._eachRenderedMenuItem(function(index, column, renderedListElement) {
                if (column.matchesMedia === false) {
                    renderedListElement.hide();
                } else {
                    renderedListElement.show();
                }
            });
        },

        _reorderMenuItems: function() {
            var that = this;

            that._eachRenderedMenuItem(function(index, column, renderedListElement, renderedList) {
                if (renderedListElement[0] && renderedListElement.index() !== index) {
                    insertElementAt(index, renderedListElement, renderedList);
                }
            });
            that._updateDataIndexes();
        },

        _updateDataIndexes: function() {
            var that = this;
            var renderedList = that._isMobile && that.view ?
                $(that.view.element).find(".k-columns-item").children("ul") :
                $(that.wrapper).find(".k-menu-group").first(),
                mappedColumns = that._ownerColumns(true).map(function(x) {
                    return x.title || x.field;
                });

            renderedList.find("span." + (this._isMobile ? "k-listgroup-form-field-wrapper" : "k-menu-link") +
                " input").each(function(i) {
                var columns;
                var index;
                if (that.options.columns.sort) {
                    columns = that._ownerColumns();
                    index = mappedColumns.indexOf(columns[i].title);
                    $(this).attr(kendo.attr("index"), index);
                } else {
                    $(this).attr(kendo.attr("index"), i);
                }
            });
        },

        _eachRenderedMenuItem: function(callback) {
            var that = this;
            var renderedListElement;
            var duplicateColumnIndex;
            var fieldValue;
            var currentColumn;
            var columns = grep(leafColumns(that.owner.columns), function(col) {
                var result = true,
                    title = trim(col.title || "");

                if (col.menu === false || (!col.field && !title.length)) {
                    result = false;
                }

                return result;
            }).map(function(col) {
                return {
                     field: col.field,
                     title: col.title,
                     matchesMedia: col.matchesMedia
                   };
            });
            var renderedList = that._getRenderedList();
            var renderedListElements = that._getRenderedListElements(renderedList);
            var oldOccurances = oldColumnOccurrences(renderedListElements, renderedList.find("input[type=checkbox]"));
            var columnOccurrence = columnOccurrences(columns);
            var columnElements;

            for (var i = 0; i < columns.length; i++) {
                currentColumn = columns[i];
                fieldValue = currentColumn.field ? currentColumn.field : currentColumn.title;
                duplicateColumnIndex = $.inArray(i, columnOccurrence[JSON.stringify(currentColumn)]);
                columnElements = $();

                for (var idx = 0; idx < oldOccurances[fieldValue].length; idx++) {
                    columnElements = columnElements.add(renderedListElements.eq(oldOccurances[fieldValue][idx]));
                }
                renderedListElement = columnElements.find(attrEquals("field", fieldValue)).closest(that._isModernComponentType() ? "label" : "li").eq(duplicateColumnIndex);
                callback(i, currentColumn, renderedListElement, renderedList);
            }
        },

        _getRenderedList: function() {
            var that = this;

            if (that._isModernComponentType() || that._isTabbedComponentType()) {
                return $(that.wrapper).find('.k-columns-item');
            } else {
                return that._isMobile && that.view ?
                $(that.view.element).find(".k-columns-item").children("ul") :
                $(that.wrapper).find(".k-menu-group").first();
            }
        },

        _getRenderedListElements: function(renderedList) {
            var that = this;

            if (that._isModernComponentType() || that._isTabbedComponentType()) {
                return renderedList.find('label');
            } else {
                return renderedList.find("span." + (this._isMobile ? "k-listgroup-form-field-wrapper" : "k-menu-link"));
            }
        },

        _open: function() {
            var that = this,
                instance, menuitem;

            $(".k-column-menu").not(that.wrapper).each(function() {
                $(this).data(POPUP).close();
            });
            that.popup.element.off("keydown" + NS).on("keydown" + NS, function(e) {
                var target = $(e.target);

                if ((that._isModernComponentType() || that._isTabbedComponentType()) && e.keyCode === kendo.keys.ENTER) {
                    target.click();
                }
                if (e.keyCode == kendo.keys.ESC) {
                    instance = kendo.widgetInstance(target.find("select"));

                    if (target.hasClass("k-picker") &&
                        instance &&
                        instance.popup.visible()) {
                            e.stopPropagation();
                            return;
                    }

                    menuitem = target.closest(".k-popup").closest(".k-menu-item");

                    if (menuitem.length > 0) {
                        menuitem.addClass("k-focus");

                        if (that.menu) {
                            that.menu.element.trigger("focus");
                        } else {
                            that.popup.element.find('[tabindex=0]').eq(0).trigger("focus");
                        }
                    }

                    target.closest(".k-popup").getKendoPopup().close();
                }
            });

            if (that.options.hasLockableColumns) {
                that._updateLockedColumns();
            }

            if (that.options.hasStickableColumns) {
                that._updateStickyColumns();
            }

            if (that.options.reorderable) {
                that._updateReorderColumns();
            }

            if (that.options.groupable) {
                that._updateGroupColumns();
            }
        },

        _activate: function() {
            if (this.menu) {
                this.menu.element.trigger("focus");
            } else {
                this.popup.element.find('[tabindex=0]').eq(0).trigger("focus");
            }

            this.trigger(OPEN, { field: this.field, container: this.wrapper });
        },

        _ownerColumns: function(omitSort) {
            var columns = leafColumns(this.owner.columns),
                menuColumns = grep(columns, function(col) {
                    var result = true,
                        title = trim(col.title || "");

                    if (col.menu === false || (!col.field && !title.length)) {
                        result = false;
                    }

                    return result;
                }),
                result,
                sort = this.options.columns.sort;

            result = map(menuColumns, function(col) {
                return {
                    originalField: col.field,
                    field: col.field || col.title,
                    title: col.title || col.field,
                    hidden: col.hidden,
                    matchesMedia: col.matchesMedia,
                    index: inArray(col, columns),
                    locked: !!col.locked,
                    _originalObject: col,
                    uid: col.headerAttributes.id
                };
            });

            if (sort && !omitSort) {
                result.sort(Comparer.create({ field: "title", dir: sort }));
            }

            return result;
        },

        _sort: function() {
            var that = this;

            if (that.options.sortable) {
                that.refresh();

                if (that._isModernComponentType() || that._isTabbedComponentType()) {
                    that.wrapper.on("click" + NS, ".k-sort-asc, .k-sort-desc", that._sortHandler.bind(that));
                } else {
                    that.menu.bind(SELECT, that._sortHandler.bind(that));
                }
            }
        },

        _sortHandler: function(e) {
            var that = this,
                item = e.item ? $(e.item) : $(e.target),
                dir;

            if (item.hasClass("k-sort-asc")) {
                dir = ASC;
            } else if (item.hasClass("k-sort-desc")) {
                dir = DESC;
            }

            if (!dir) {
                return;
            }

            that._getSortItemsContainer(item).find(".k-sort-" + (dir == ASC ? DESC : ASC)).removeClass(ACTIVE);

            that._sortDataSource(item, dir);

            if (!that._isMobile) {
                that.close();
            }
        },

        _getSortItemsContainer: function(item) {
            return this._isModernComponentType() || this._isTabbedComponentType() ? item.parents('.k-columnmenu-item-wrapper').first() : item.parent();
        },

        _sortDataSource: function(item, dir) {
            var that = this,
                sortable = that.options.sortable,
                compare = sortable.compare === null ? undefined : sortable.compare,
                dataSource = that.dataSource,
                idx,
                length,
                sort = dataSource.sort() || [];

            var removeClass = item.hasClass(ACTIVE) && sortable && sortable.allowUnsort !== false;

            dir = !removeClass ? dir : undefined;

            if (that.trigger("sort", { sort: { field: that.field, dir: dir, compare: compare } })) {
                return;
            }

            if (removeClass) {
                item.removeClass(ACTIVE);
            } else {
                item.addClass(ACTIVE);
            }

            if (sortable.mode === "multiple") {
                for (idx = 0, length = sort.length; idx < length; idx++) {
                    if (sort[idx].field === that.field) {
                        sort.splice(idx, 1);
                        break;
                    }
                }
                sort.push({ field: that.field, dir: dir, compare: compare });
            } else {
                sort = [ { field: that.field, dir: dir, compare: compare } ];
            }

            dataSource.sort(sort);
        },

        _columns: function() {
            var that = this;

            if (that.options.columns) {

                that._updateColumnsMenu();

                that._updateColumnsMenuHandler = that._updateColumnsMenu.bind(that);

                that.owner.bind(["columnHide", "columnShow"], that._updateColumnsMenuHandler);

                that._updateColumnsLockedStateHandler = that._updateColumnsLockedState.bind(that);

                that.owner.bind(["columnUnlock", "columnLock" ], that._updateColumnsLockedStateHandler);

                if (that._isModernComponentType() || that._isTabbedComponentType()) {
                    that.wrapper.on("click" + NS, '.k-columns-item .k-button:not(.k-button-solid-primary)', function() {
                        that._updateColumnsMenu();
                    });
                    that.wrapper.on("click" + NS, '.k-columns-item .k-button.k-button-solid-primary', that._applyColumnVisibility.bind(that));
                    that.wrapper.on("click" + NS, '.k-columns-item .k-checkbox', function() {
                        that._updateColumnsMenu(true);
                    });
                } else {
                    that.menu.bind(SELECT, function(e) {
                        var item = $(e.item),
                            input,
                            column,
                            uidAttr = kendo.attr("uid"),
                            colIdx = 0,
                            columns = grep(leafColumns(that.owner.columns), function(col) {
                                var result = true,
                                    title = trim(col.title || "");

                                if (col.menu === false || (!col.field && !title.length)) {
                                    result = false;
                                }

                                return result;
                            });

                        if (that._isMobile) {
                            e.preventDefault();
                        }

                        if (!item.parent().closest("li.k-columns-item")[0]) {
                            return;
                        }

                        input = item.find(":checkbox");
                        if (input.attr("disabled")) {
                            return;
                        }

                        colIdx = columns.map(function(col) {
                            return col.headerAttributes.id;
                        }).indexOf(input.attr(uidAttr));
                        column = columns[colIdx];

                        if (column.hidden === true) {
                            that.owner.showColumn(column);
                        } else {
                            that.owner.hideColumn(column);
                        }
                    });
                }
            }
        },

        _applyColumnVisibility: function() {
            var that = this;
            var fieldAttr = kendo.attr("field");
            var uidAttr = kendo.attr("uid");
            var checkboxes = that.wrapper.find(".k-columns-item input[" + fieldAttr + "]");
            var columnsInMenu = grep(leafColumns(this.owner.columns), function(col) {
                var result = true,
                    title = trim(col.title || "");

                if (col.menu === false || (!col.field && !title.length)) {
                    result = false;
                }

                return result;
            });
            var length = checkboxes.length;
            var idx;
            var colIdx;
            var checkbox;
            var column;

            that.owner.unbind("columnShow", that._updateColumnsMenuHandler);
            that.owner.unbind("columnHide", that._updateColumnsMenuHandler);

            for (idx = 0; idx < length; idx++) {
                checkbox = $(checkboxes[idx]);
                colIdx = columnsInMenu.map(function(col) {
                    return col.headerAttributes.id;
                }).indexOf(checkbox.attr(uidAttr));
                column = columnsInMenu[colIdx];

               if (checkbox.is(":checked") && column.hidden) {
                   that.owner.showColumn(column);
               } else if (checkbox.is(":not(:checked)") && !column.hidden) {
                   that.owner.hideColumn(column);
               }
            }
            that.popup.close();
            that.owner.bind(["columnHide", "columnShow"], that._updateColumnsMenuHandler);
        },

        _sizeColumns: function() {
            var that = this;

            if (that._isTabbedComponentType()) {
                that.wrapper.on("click" + NS, ".k-auto-size-column, .k-auto-size-all", that._autoSizeHandler.bind(that));
            }
        },

        _autoSizeHandler: function(e) {
            var that = this,
                item = e.item ? $(e.item) : $(e.target);

            if (item.hasClass("k-auto-size-column")) {
                that.owner.autoFitColumn(that.field);
            } else if (item.hasClass("k-auto-size-all")) {
                that.owner.autoFitColumns();
            }
        },

        _updateColumnsMenu: function(omitCheckState) {
            var idx, length, current, checked, locked, that = this;
            var fieldAttr = kendo.attr("field"),
                lockedAttr = kendo.attr("locked"),
                uidAttr = kendo.attr("uid"),
                columnIndexMap = {},
                columnsCount = 0,
                colIdx = 0;
                omitCheckState = omitCheckState === true;
                var columnsInMenu = grep(leafColumns(this.owner.columns), function(col, idx) {
                    var result = true,
                        title = trim(col.title || "");

                    if (col.menu === false || (!col.field && !title.length)) {
                        result = false;
                    }

                    if (result) {
                        columnIndexMap[idx] = columnsCount;
                        columnsCount++;
                    }

                    return result;
                }),
                visibleFields = grep(this._ownerColumns(), function(field) {
                    if (omitCheckState) {
                         return that.wrapper.find("[role='menuitemcheckbox'] [" + uidAttr + "='" + field.uid + "']").prop('checked');
                    }
                    return !field.hidden && field.matchesMedia !== false;
                }),
                visibleDataFields = grep(visibleFields, function(field) {
                    return field.originalField;
                }),
                lockedCount = grep(visibleDataFields, function(col) {
                    return col.locked === true;
                }).length,
                nonLockedCount = grep(visibleDataFields, function(col) {
                    return col.locked !== true;
                }).length,
                columnsNotInMenu = grep(this.owner.columns, function(col) {
                    return col.menu === false;
                }),
                hiddenColumnsNotInMenu = grep(columnsNotInMenu, function(col) {
                    return col.hidden;
                });

            this.wrapper.find("[role='menuitemcheckbox']").attr("aria-checked", false);

            var checkboxes = this.wrapper
                .find(".k-columns-item input[" + fieldAttr + "]")
                .prop("disabled", false);

            if (!omitCheckState) {
                checkboxes.prop("checked", false);
            }

            var switchWidget;

            for (idx = 0, length = checkboxes.length; idx < length; idx ++) {
                current = checkboxes.eq(idx);
                locked = current.attr(lockedAttr) === "true";
                checked = false;
                switchWidget = current.data("kendoSwitch");
                colIdx = columnsInMenu.map(function(col) {
                    return col.headerAttributes.id;
                }).indexOf(current.attr(uidAttr));

                checked = omitCheckState ? current.prop('checked') : !columnsInMenu[colIdx].hidden && columnsInMenu[colIdx].matchesMedia !== false;
                current.prop("checked", checked);

                if (switchWidget) {
                    switchWidget.enable(true);
                    switchWidget.check(checked);
                }

                current.closest("[role='menuitemcheckbox']").attr("aria-checked", checked);

                if (checked) {
                    if (lockedCount == 1 && locked) {
                        current.prop("disabled", true);

                        if (switchWidget) {
                            switchWidget.enable(false);
                        }
                    }

                    if ((columnsNotInMenu.length === 0 || (columnsNotInMenu.length === hiddenColumnsNotInMenu.length)) && nonLockedCount == 1 && !locked) {
                        current.prop("disabled", true);

                        if (switchWidget) {
                            switchWidget.enable(false);
                        }
                    }
                }
            }
        },

        _updateColumnsLockedState: function() {
            var idx, length, current, column;
            var fieldAttr = kendo.attr("field");
            var lockedAttr = kendo.attr("locked");
            var columns = toHash(this._ownerColumns(), "field");
            var checkboxes = this.wrapper
                .find(".k-columns-item input[type=checkbox]");

            for (idx = 0, length = checkboxes.length; idx < length; idx ++ ) {
                current = checkboxes.eq(idx);
                column = columns[current.attr(fieldAttr)];
                if (column) {
                    current.attr(lockedAttr, column.locked);
                }
            }

            this._updateColumnsMenu();
        },

        _filter: function() {
            var that = this,
                widget = FILTERMENU,
                options = that.options;

            if (options.filterable !== false) {

                if (options.filterable.multi) {
                    widget = "kendoFilterMultiCheck";
                    if (options.filterable.dataSource) {
                        options.filterable.checkSource = options.filterable.dataSource;
                        delete options.filterable.dataSource;
                    }
                }
                that.filterMenu = that.wrapper.find(".k-filterable")[widget](
                    extend(true, {}, {
                        appendToElement: true,
                        dataSource: options.dataSource,
                        values: options.values,
                        field: that.field,
                        title: that.title,
                        change: function(e) {
                            if (that.trigger("filtering", { filter: e.filter, field: e.field })) {
                                e.preventDefault();
                            }
                        },
                        componentType: that.options.componentType,
                        cycleForm: !that._isModernComponentType() && !that._isTabbedComponentType()
                    },
                    options.filterable)
                    ).data(widget);

                if (that._isMobile) {
                    that.menu.bind(SELECT, function(e) {
                        var item = $(e.item);

                        if (item.hasClass("k-filter-item")) {
                            that.pane.navigate(that.filterMenu.view, that.options.animations.left);
                        }
                    });
                }
            }
        },

        _lockColumns: function() {
            var that = this;

            if (that._isModernComponentType() || that._isTabbedComponentType()) {
                that.wrapper.on("click" + NS, ".k-lock, .k-unlock", that._lockableHandler.bind(that));
            } else {
                that.menu.bind(SELECT, that._lockableHandler.bind(that));
            }
        },

        _lockableHandler: function(e) {
            var that = this;
            var item = e.item ? $(e.item) : $(e.target);

            if (item.hasClass("k-lock")) {
                that.owner.lockColumn(that.field);
                if (!that._isMobile) {
                    that.close();
                }
            } else if (item.hasClass("k-unlock")) {
                that.owner.unlockColumn(that.field);
                if (!that._isMobile) {
                    that.close();
                }
            }
        },

        _reorderColumns: function() {
            var that = this;

            if (that._isModernComponentType() || that._isTabbedComponentType()) {
                that.wrapper.on("click" + NS, ".k-move-prev, .k-move-next", that._reorderHandler.bind(that));
            } else {
                that.menu.bind(SELECT, that._reorderHandler.bind(that));
            }
        },

        _reorderHandler: function(e) {
            var that = this;
            var item = e.item ? $(e.item) : $(e.target);

            if (item.hasClass("k-move-prev")) {
                that.owner._moveColumn(that.element, true);
                if (!that._isMobile) {
                    that.close();
                }
            } else if (item.hasClass("k-move-next")) {
                that.owner._moveColumn(that.element, false);
                if (!that._isMobile) {
                    that.close();
                }
            }
        },

        _groupColumn: function() {
            var that = this;

            if (that._isModernComponentType() || that._isTabbedComponentType()) {
                that.wrapper.on("click" + NS, ".k-group, .k-ungroup", that._groupHandler.bind(that));
            } else {
                that.menu.bind(SELECT, that._groupHandler.bind(that));
            }
        },

        _groupHandler: function(e) {
            var that = this,
                item = e.item ? $(e.item) : $(e.target);

            if (item.hasClass("k-group") || item.hasClass("k-ungroup")) {
                that.owner._handleSpaceKey(that.element, true);

                if (!that._isMobile) {
                    that.close();
                }
            }
        },

        _stickyColumns: function() {
            var that = this;

            if (that._isModernComponentType() || that._isTabbedComponentType()) {
                that.wrapper.on("click" + NS, ".k-stick, .k-unstick", that._stickableHandler.bind(that));
            } else {
                that.menu.bind(SELECT, that._stickableHandler.bind(that));
            }
        },

        _stickableHandler: function(e) {
            var that = this;
            var item = e.item ? $(e.item) : $(e.target);
            var field = that.field;
            var columns = that.owner.columns;
            var column = grep(columns, function(column) {
                return column.field == field || column.title == field;
            })[0];

            if (item.hasClass("k-stick")) {
                that.owner.stickColumn(that.field);
                that.trigger(STICK, { column: column });
                if (!that._isMobile) {
                    that.close();
                }
            } else if (item.hasClass("k-unstick")) {
                that.owner.unstickColumn(that.field);
                that.trigger(UNSTICK, { column: column });
                if (!that._isMobile) {
                    that.close();
                }
            }
        },

        _updateLockedColumns: function() {
            var field = this.field;
            var columns = this.owner.columns;
            var column = grep(columns, function(column) {
                return column.field == field || column.title == field;
            })[0];

            if (!column) {
                return;
            }

            var locked = column.locked === true;
            var length = grep(columns, function(column) {
                return !column.hidden && ((column.locked && locked) || (!column.locked && !locked));
            }).length;
            var notLockable = column.lockable === false;

            var lockItem = this.wrapper.find(".k-lock").removeClass("k-disabled").removeAttr("aria-disabled");
            var unlockItem = this.wrapper.find(".k-unlock").removeClass("k-disabled").removeAttr("aria-disabled");

            if (locked || length == 1 || notLockable) {
                lockItem.addClass("k-disabled").attr("aria-disabled", "true");
            }

            if (!locked || length == 1 || notLockable) {
                unlockItem.addClass("k-disabled").attr("aria-disabled", "true");
            }

            this._updateColumnsLockedState();
        },

        _updateStickyColumns: function() {
            var field = this.field;
            var columns = this.owner.columns;
            var column = grep(columns, function(column) {
                return column.field == field || column.title == field;
            })[0];

            if (!column) {
                return;
            }

            var sticky = column.sticky === true;
            var stickable = column.stickable === true;
            var locked = column.locked === true;
            var length = grep(columns, function(column) {
                return !column.hidden && ((column.locked && locked) || (!column.locked && !locked));
            }).length;

            var stickItem = this.wrapper.find(".k-stick").removeClass("k-disabled").removeAttr("aria-disabled");
            var unstickItem = this.wrapper.find(".k-unstick").removeClass("k-disabled").removeAttr("aria-disabled");

            if (sticky || !stickable || (locked && length === 1)) {
                stickItem.addClass("k-disabled").attr("aria-disabled", "true");
            }

            if (!sticky || !stickable) {
                unstickItem.addClass("k-disabled").attr("aria-disabled", "true");
            }
        },

        _updateReorderColumns: function() {
            var element = this.element,
                elementIndex = element.index(),
                numberOfSiblings = element.parent().children().length;

            var prevItem = this.wrapper.find(".k-move-prev").removeClass("k-disabled").removeAttr("aria-disabled");
            var nextItem = this.wrapper.find(".k-move-next").removeClass("k-disabled").removeAttr("aria-disabled");

            if (this.element.index() === 0) {
                prevItem.addClass("k-disabled").attr("aria-disabled", "true");
            }

            if (elementIndex + 1 === numberOfSiblings) {
                nextItem.addClass("k-disabled").attr("aria-disabled", "true");
            }
        },

        _updateGroupColumns: function() {
            var element = this.element,
                wrapper = this.wrapper,
                groupEl = wrapper.find(".k-group"),
                ungroupEl = wrapper.find(".k-ungroup");

            if (this.owner.groupable._canDrag(element)) {
                groupEl.removeClass("k-hidden");
                ungroupEl.addClass("k-hidden");
            } else {
                groupEl.addClass("k-hidden");
                ungroupEl.removeClass("k-hidden");
            }
        },

        refresh: function() {
            var that = this,
                sort = that.options.dataSource.sort() || [],
                descriptor,
                field = that.field,
                idx,
                length;

            that.wrapper.find(".k-sort-asc, .k-sort-desc").removeClass(ACTIVE);

            for (idx = 0, length = sort.length; idx < length; idx++) {
               descriptor = sort[idx];

               if (field == descriptor.field) {
                    that.wrapper.find(".k-sort-" + descriptor.dir).addClass(ACTIVE);
               }
            }

            that.link[that._filterExist(that.dataSource.filter()) ? "addClass" : "removeClass"]("k-active");
        },

        _filterExist: function(filters) {
            var found = false;
            var filter;

            if (!filters) {
                return;
            }

            filters = filters.filters;

            for (var idx = 0, length = filters.length; idx < length; idx++) {
                filter = filters[idx];

                if (filter.field == this.field) {
                    found = true;
                } else if (filter.filters) {
                    found = found || this._filterExist(filter);
                }
            }

            return found;
        }
    });

    /* ------------------------- MODERN TEMPLATE ------------------------- */

    function modernColumnsTemplateIterator(columns, encodeTitles, ns) {
        return columns.map((column) => {
            if (column.groupHeader) {
                return `<span class="k-column-menu-group-header"><span class="k-column-menu-group-header-text">${column.title}</span></span>`;
            } else {
                return `<label class="k-column-list-item" role="menuitemcheckbox" aria-checked="false" ${column.matchesMedia === false ? `${kendo.attr("style-display")}="none"` : ""}><input class="k-checkbox k-checkbox-md k-rounded-md" type="checkbox" title="${encodeTitles ? encode(column.title) : column.title}" data-${ns}field="${column.field.replace(/\"/g, "&#34;")}" data-${ns}index="${column.index} data-${ns}locked="${column.locked}" data-${ns}uid="${column.uid}" /><span class="k-checkbox-label">${encodeTitles ? encode(column.title) : column.title}</span></label>`;
            }
        }).join("");
    }

const SIZING_PARTIAL_MODERN = ({ messages }) => `<div class="k-columnmenu-item-wrapper">\
<div>\
<div class="k-columnmenu-item k-auto-size-column" tabindex="0">\
${kendo.ui.icon("max-width")}${encode(messages.autoSizeColumn)}\
</div>\
</div>\
<div>\
<div class="k-columnmenu-item k-auto-size-all" tabindex="0">\
${kendo.ui.icon("display-inline-flex")}${encode(messages.autoSizeAllColumns)}\
</div>\
</div>\
</div>`;

const SORTABLE_PARTIAL_MODERN = ({ messages }) => `<div class="k-columnmenu-item-wrapper">\
<div>\
<div class="k-columnmenu-item k-sort-asc" tabindex="0">\
${kendo.ui.icon("sort-asc-small")}${encode(messages.sortAscending)}\
</div>\
</div>\
<div>\
<div class="k-columnmenu-item k-sort-desc" tabindex="0">\
${kendo.ui.icon("sort-desc-small")}${encode(messages.sortDescending)}\
</div>\
</div>\
</div>`;

    const COLUMNS_PARTIAL_MODERN = ({ columns, messages, encodeTitles, ns }) => `<div class="k-columnmenu-item-wrapper">\
<div>\
<div class="k-columnmenu-item-content k-columns-item">\
<div class="k-column-list-wrapper">\
<div class="k-column-list" role="menu">\
${modernColumnsTemplateIterator(columns, encodeTitles, ns)}\
</div>\
</div>\
<div class="k-actions-stretched k-columnmenu-actions">` +
kendo.html.renderButton(`<button>${encode(messages.apply)}</button>`, { themeColor: "primary", icon: "check" }) +
kendo.html.renderButton(`<button>${encode(messages.reset)}</button>`, { icon: "undo" }) +
`</div>\
</div>\
</div>\
</div>`;

    const GROUPABLE_PARTIAL_MODERN = ({ messages }) => `<div class="k-columnmenu-item-wrapper">\
<div>\
<div class="k-columnmenu-item k-group" tabindex="0">\
${kendo.ui.icon("group")}${encode(messages.groupColumn)}\
</div>\
</div>\
</div>
<div class="k-columnmenu-item-wrapper">\
<div>\
<div class="k-columnmenu-item k-ungroup" tabindex="0">\
${kendo.ui.icon("ungroup")}${encode(messages.ungroupColumn)}\
</div>\
</div>\
</div>`;

    const LOCKABLE_COLUMNS_PARTIAL_MODERN = ({ messages }) => `<div class="k-columnmenu-item k-lock" tabindex="0">\
${kendo.ui.icon("lock")}${encode(messages.lock)}\
</div>\
<div class="k-columnmenu-item k-unlock" tabindex="0">\
${kendo.ui.icon("unlock")}${encode(messages.unlock)}\
</div>`;

    const STICKABLE_COLUMNS_PARTIAL_MODERN = ({ messages }) => `<div class="k-columnmenu-item k-stick" tabindex="0">\
${kendo.ui.icon("stick")}${encode(messages.stick)}\
</div>\
<div class="k-columnmenu-item k-unstick" tabindex="0">\
${kendo.ui.icon("unstick")}${encode(messages.unstick)}\
</div>`;

    const REORDERABLE_COLUMNS_PARTIAL_MODERN = ({ messages }) => `<div class="k-columnmenu-item k-move-prev" tabindex="0">\
${kendo.ui.icon("caret-alt-left")}${encode(messages.movePrev)}\
</div>\
<div class="k-columnmenu-item k-move-next" tabindex="0">\
${kendo.ui.icon("caret-alt-right")}${encode(messages.moveNext)}\
</div>`;

    const LOCK_STICK_COLUMNS_PARTIAL_MODERN = ({ hasLockableColumns, hasStickableColumns, messages, reorderable }) => `<div class="k-columnmenu-item-wrapper">\
<div class="k-column-menu-position">\
${hasLockableColumns ? LOCKABLE_COLUMNS_PARTIAL_MODERN({ messages }) : ''}\
${hasStickableColumns ? STICKABLE_COLUMNS_PARTIAL_MODERN({ messages }) : ''}\
${reorderable ? REORDERABLE_COLUMNS_PARTIAL_MODERN({ messages }) : ''}\
</div>\
</div>`;

    var modernTemplate = ({ sortable, filterable, showColumns, messages, columns, hasLockableColumns, hasStickableColumns, encodeTitles, ns, reorderable, groupable }) => `\
${sortable ? SORTABLE_PARTIAL_MODERN({ messages }) : ''}\
${showColumns ? COLUMNS_PARTIAL_MODERN({ columns, messages, encodeTitles, ns }) : ''}\
${filterable ? '<div class="k-columnmenu-item-wrapper"><div class="k-columnmenu-item-content k-column-menu-filter"><div class="k-filterable"></div></div></div>' : ''}\
${groupable ? GROUPABLE_PARTIAL_MODERN({ messages }) : ''}\
${hasLockableColumns || hasStickableColumns || reorderable ? LOCK_STICK_COLUMNS_PARTIAL_MODERN({ hasLockableColumns, hasStickableColumns, messages, reorderable }) : ''}`;

    /* ------------------------- TABBED TEMPLATE ------------------------- */

    function tabbedTemplateGeneralSettings(sortable, hasLockableColumns, hasStickableColumns, reorderable, groupable, autoSize, messages) {
        var result = "<div>";

        if (sortable) {
            result += SORTABLE_PARTIAL_MODERN({ messages });
        }

        if (groupable) {
            result += GROUPABLE_PARTIAL_MODERN({ messages });
        }

        if (hasLockableColumns || hasStickableColumns || reorderable) {
            result += LOCK_STICK_COLUMNS_PARTIAL_MODERN({ hasLockableColumns, hasStickableColumns, messages, reorderable });
        }

        if (autoSize) {
            result += SIZING_PARTIAL_MODERN({ messages });
        }

        result += "</div>";
        return result;
    }

    var tabbedTemplate = ({ sortable, filterable, showColumns, messages, columns, hasLockableColumns, hasStickableColumns, encodeTitles, ns, reorderable, groupable, autoSize }) => `<div>
                            <ul>
                                ${ filterable ? `<li>${kendo.ui.icon("filter")}</li>` : ''}
                                ${ sortable || hasLockableColumns || hasStickableColumns || reorderable || groupable || autoSize ? `<li>${kendo.ui.icon("sliders")}</li>` : ''}
                                ${ showColumns ? `<li>${kendo.ui.icon("columns")}</li>` : ''}
                            </ul>
                            ${filterable ? '<div><div class="k-columnmenu-item-wrapper"><div class="k-columnmenu-item-content k-column-menu-filter"><div class="k-filterable"></div></div></div></div>' : ''}
                            ${ sortable || hasLockableColumns || hasStickableColumns || reorderable || groupable || autoSize ? tabbedTemplateGeneralSettings(sortable, hasLockableColumns, hasStickableColumns, reorderable, groupable, autoSize, messages) : '' }
                            ${ showColumns ? `<div>${ COLUMNS_PARTIAL_MODERN({ columns, messages, encodeTitles, ns }) }</div>` : '' }
                        </div>`;

    /* ------------------------- CLASSIC TEMPLATE ------------------------- */

    function classicColumnsTemplateIterator(columns, encodeTitles, ns, omitWrapAttribute) {
        return columns.map((column) => {
            if (column.groupHeader) {
                return `<li class="k-column-menu-group-header" ${omitWrapAttribute}="true" ><span class="k-column-menu-group-header-text">${column.title}</span></li>`;
            } else {
                return `<li role="menuitemcheckbox" aria-checked="false" ${column.matchesMedia === false ? `${kendo.attr("style-display")}="none"` : ""}><input type="checkbox" class="k-checkbox k-checkbox-md k-rounded-md" title="${encodeTitles ? encode(column.title) : column.title}" data-${ns}field="${column.field.replace(/\"/g,"&#34;")}" data-${ns}index="${column.index}" data-${ns}locked="${column.locked}" data-${ns}uid="${column.uid}"/>${encodeTitles ? encode(column.title) : column.title}</li>`;
            }
        }).join("");
    }

    const SORTABLE_PARTIAL_CLASSIC = ({ messages, showColumns, filterable }) => `\
<li class="k-item k-menu-item k-sort-asc"><span class="k-link k-menu-link">${kendo.ui.icon("sort-asc-small")}<span class="k-menu-link-text">${encode(messages.sortAscending)}</span></span></li>\
<li class="k-item k-menu-item k-sort-desc"><span class="k-link k-menu-link">${kendo.ui.icon("sort-desc-small")}<span class="k-menu-link-text">${encode(messages.sortDescending)}</span></span></li>\
${showColumns || filterable ? '<li class="k-separator k-menu-separator" role="presentation"></li>' : ''}`;

    const COLUMNS_PARTIAL_CLASSIC = ({ columns, messages, encodeTitles, ns, omitWrapAttribute, filterable, hasLockableColumns, hasStickableColumns }) => `\
<li class="k-item k-menu-item k-columns-item" aria-haspopup="true"><span class="k-link k-menu-link">${kendo.ui.icon("columns")}<span class="k-menu-link-text">${encode(messages.columns)}</span></span><ul>\
${classicColumnsTemplateIterator(columns, encodeTitles, ns, omitWrapAttribute)}\
</ul></li>\
${filterable || hasLockableColumns || hasStickableColumns ? '<li class="k-separator k-menu-separator" role="presentation"></li>' : ''}`;

const FILTERABLE_PARTIAL_CLASSIC = ({ messages, hasLockableColumns, hasStickableColumns, reorderable }) => `<li class="k-item k-menu-item k-filter-item" aria-haspopup="true"><span class="k-link k-menu-link">${kendo.ui.icon("filter")}<span class="k-menu-link-text">${encode(messages.filter)}</span></span><ul>\
<li><div class="k-filterable"></div></li>\
</ul></li>\
${hasLockableColumns || hasStickableColumns || reorderable ? '<li class="k-separator k-menu-separator" role="presentation"></li>' : ''}`;

    const GROUPABLE_PARTIAL_CLASSIC = ({ messages, hasLockStickMove }) => `\
<li class="k-item k-menu-item k-group"><span class="k-link k-menu-link">${kendo.ui.icon("group")}<span class="k-menu-link-text">${encode(messages.groupColumn)}</span></span></li>\
<li class="k-item k-menu-item k-ungroup"><span class="k-link k-menu-link">${kendo.ui.icon("ungroup")}<span class="k-menu-link-text">${encode(messages.ungroupColumn)}</span></span></li>\
${hasLockStickMove ? '<li class="k-separator k-menu-separator" role="presentation"></li>' : ''}`;

    const LOCKABLE_COLUMNS_PARTIAL_CLASSIC = ({ messages, hasStickableColumns }) => `\
<li class="k-item k-menu-item k-lock"><span class="k-link k-menu-link">${kendo.ui.icon("lock")}<span class="k-menu-link-text">${encode(messages.lock)}</span></span></li>\
<li class="k-item k-menu-item k-unlock"><span class="k-link k-menu-link">${kendo.ui.icon("unlock")}<span class="k-menu-link-text">${encode(messages.unlock)}</span></span></li>\
${hasStickableColumns ? '<li class="k-separator k-menu-separator" role="presentation"></li>' : ''}`;

    const STICKABLE_COLUMNS_PARTIAL_CLASSIC = ({ messages }) => `\
<li class="k-item k-menu-item k-stick"><span class="k-link k-menu-link">${kendo.ui.icon("stick")}<span class="k-menu-link-text">${encode(messages.stick)}</span></span></li>\
<li class="k-item k-menu-item k-unstick"><span class="k-link k-menu-link">${kendo.ui.icon("unstick")}<span class="k-menu-link-text">${encode(messages.unstick)}</span></span></li>`;

    const REORDERABLE_COLUMNS_PARTIAL_CLASSIC = ({ messages }) => `\
<li class="k-item k-menu-item k-move-prev"><span class="k-link k-menu-link">${kendo.ui.icon("caret-alt-left")}<span class="k-menu-link-text">${encode(messages.movePrev)}</span></span></li>\
<li class="k-item k-menu-item k-move-next"><span class="k-link k-menu-link">${kendo.ui.icon("caret-alt-right")}<span class="k-menu-link-text">${encode(messages.moveNext)}</span></span></li>`;

    const LOCK_STICK_COLUMNS_PARTIAL_CLASSIC = ({ messages, hasLockableColumns, hasStickableColumns, reorderable }) => `\
<li class="k-item k-menu-item k-position-item" aria-haspopup="true"><span class="k-link k-menu-link">${kendo.ui.icon("set-column-position")}<span class="k-menu-link-text">${encode(messages.setColumnPosition)}</span></span><ul>\
${hasLockableColumns ? LOCKABLE_COLUMNS_PARTIAL_CLASSIC({ messages, hasStickableColumns }) : ''}\
${hasStickableColumns ? STICKABLE_COLUMNS_PARTIAL_CLASSIC({ messages }) : ''}\
${reorderable ? REORDERABLE_COLUMNS_PARTIAL_CLASSIC({ messages }) : ''}\
</ul></li>`;

    var template = ({ uid, sortable, filterable, showColumns, messages, columns, hasLockableColumns, hasStickableColumns, encodeTitles, ns, omitWrapAttribute, reorderable, groupable }) => `\
<ul id="${uid}">\
${sortable ? SORTABLE_PARTIAL_CLASSIC({ messages, showColumns, filterable }) : '' }\
${showColumns ? COLUMNS_PARTIAL_CLASSIC({ columns, messages, encodeTitles, ns, omitWrapAttribute, filterable, hasLockableColumns, hasStickableColumns }) : ''}\
${filterable ? FILTERABLE_PARTIAL_CLASSIC({ messages, hasLockableColumns, hasStickableColumns, reorderable }) : ''}\
${groupable ? GROUPABLE_PARTIAL_CLASSIC({ messages, hasLockStickMove: hasLockableColumns || hasStickableColumns || reorderable }) : ''}\
${hasLockableColumns || hasStickableColumns || reorderable ? LOCK_STICK_COLUMNS_PARTIAL_CLASSIC({ messages, hasLockableColumns, hasStickableColumns, reorderable }) : ''}
</ul>`;

    /* ------------------------- MOBILE TEMPLATE ------------------------- */

    function mobileColumnsTemplateIterator(columns, groups, ns, hasGroups) {
        var result = "";

        if (hasGroups) {
            for (var i = 0; i < groups.length; i++) {
                result += `<span class="k-list-group-header k-pb-1">${encode(groups[i].title)}</span><ul class="k-listgroup k-listgroup-flush k-mb-4">`;

                for (var idx = 0; idx < groups[i].columns.length; idx++) {
                    result += `<li id="${kendo.guid()}" class="k-item k-listgroup-item"><span class="k-listgroup-form-row"><span class="k-listgroup-form-field-label k-item-title">${groups[i].columns[idx].title}</span><span class="k-listgroup-form-field-wrapper"><input type="checkbox" title="${groups[i].columns[idx].title}" data-${ns}field="${groups[i].columns[idx].field.replace(/\"/g,"&#34;")}" data-${ns}index="${groups[i].columns[idx].index}" data-${ns}uid="${groups[i].columns[idx].uid}" data-${ns}locked="${groups[i].columns[idx].locked}"/></span></span></li>"`;
                }

                result += `</ul>`;
            }
        } else {
            result += `<ul class="k-listgroup k-listgroup-flush k-mb-4">`;

            for (var idx = 0; idx < columns.length; idx++) {
                result += `<li id="${kendo.guid()}" class="k-item k-listgroup-item"><span class="k-listgroup-form-row"><span class="k-listgroup-form-field-label k-item-title">${columns[idx].title}</span><span class="k-listgroup-form-field-wrapper"><input type="checkbox" title="${columns[idx].title}" data-${ns}field="${columns[idx].field.replace(/\"/g,"&#34;")}" data-${ns}index="${columns[idx].index}" data-${ns}uid="${columns[idx].uid}" data-${ns}locked="${columns[idx].locked}"/></span></span></li>`;
            }

            result += `</ul>`;
        }

        return result;
    }

    const SORTABLE_PARTIAL_MOBILE = ({ messages }) => `<li id="${kendo.guid()}" class="k-item k-listgroup-item k-sort-asc"><span class="k-link">${kendo.ui.icon("sort-asc-small")}<span class="k-item-title">${encode(messages.sortAscending)}</span></span></li>\
<li id="${kendo.guid()}" class="k-item k-listgroup-item k-sort-desc"><span class="k-link">${kendo.ui.icon("sort-desc-small")}<span class="k-item-title">${encode(messages.sortDescending)}</span></span></li>`;

    const LOCKABLE_COLUMNS_PARTIAL_MOBILE = ({ messages }) => `<li id="${kendo.guid()}" class="k-item k-listgroup-item k-lock"><span class="k-link">${kendo.ui.icon("lock")}<span class="k-item-title">${encode(messages.lock)}</span></span></li>\
<li id="${kendo.guid()}" class="k-item k-listgroup-item k-unlock"><span class="k-link">${kendo.ui.icon("unlock")}<span class="k-item-title">${encode(messages.unlock)}</span></span></li>`;

    const STICKABLE_COLUMNS_PARTIAL_MOBILE = ({ messages }) => `<li id="${kendo.guid()}" class="k-item k-listgroup-item k-stick"><span class="k-link">${kendo.ui.icon("stick")}<span class="k-item-title">${encode(messages.stick)}</span></span></li>\
<li id="${kendo.guid()}" class="k-item k-listgroup-item k-unstick"><span class="k-link">${kendo.ui.icon("unstick")}<span class="k-item-title">${encode(messages.unstick)}</span></span></li>`;

    const REORDERABLE_COLUMNS_PARTIAL_MOBILE = ({ messages }) => `<li id="${kendo.guid()}" class="k-item k-listgroup-item k-move-prev"><span class="k-link">${kendo.ui.icon("caret-alt-left")}<span class="k-item-title">${encode(messages.movePrev)}</span></span></li>\
<li id="${kendo.guid()}" class="k-item k-listgroup-item k-move-next"><span class="k-link">${kendo.ui.icon("caret-alt-right")}<span class="k-item-title">${encode(messages.moveNext)}</span></span></li>`;

    const FILTERABLE_PARTIAL_MOBILE = ({ messages }) => `<li id="${kendo.guid()}" class="k-item k-listgroup-item k-filter-item">\
<span class="k-link k-filterable">\
${kendo.ui.icon("filter")}\
<span class="k-item-title">${encode(messages.filter)}</span>\
<span class="k-select">${kendo.ui.icon("chevron-right")}</span>\
</span>\
</li>`;

    const GROPABLE_PARTIAL_MOBILE = ({ messages }) => `\
<li id="${kendo.guid()}" class="k-item k-listgroup-item k-group"><span class="k-link">${kendo.ui.icon("group")}<span class="k-item-title">${encode(messages.groupColumn)}</span></span></li>\
<li id="${kendo.guid()}" class="k-item k-listgroup-item k-ungroup"><span class="k-link">${kendo.ui.icon("ungroup")}<span class="k-item-title">${encode(messages.ungroupColumn)}</span></span></li>`;

    const COLUMNS_PARTIAL_MOBILE = ({ messages, hasGroups, columns, groups, ns }) => `\
<li class="k-columns-item"><span class="k-list-title">${messages.columnVisibility}</span>\
${mobileColumnsTemplateIterator(columns, groups, ns, hasGroups)}\
</li>`;

    var mobileTemplate = ({ messages, title, sortable, filterable, showColumns, hasLockableColumns, hasStickableColumns, hasGroups, columns, groups, ns, reorderable, groupable }) => `\
<div data-${ns}role="view" class="k-grid-column-menu">\
<div data-${ns}role="header" class="k-header">\
<a href="#" class="k-header-cancel k-link" title="${messages.cancel}" aria-label="${messages.cancel}">${kendo.ui.icon("chevron-left")}</a>\
${encode(messages.settings)}\
<a href="#" class="k-header-done k-link" title="${messages.done}" aria-label="${messages.done}">${kendo.ui.icon("check")}</a>\
</div>\
<div class="k-column-menu">\
<ul class="k-reset">\
<li>\
<span class="k-list-title">${encode(messages.column)}: ${title}</span>\
<ul class="k-listgroup k-listgroup-flush k-mb-4">\
${sortable ? SORTABLE_PARTIAL_MOBILE({ messages }) : ''}\
${hasLockableColumns ? LOCKABLE_COLUMNS_PARTIAL_MOBILE({ messages }) : ''}\
${hasStickableColumns ? STICKABLE_COLUMNS_PARTIAL_MOBILE({ messages }) : ''}\
${reorderable ? REORDERABLE_COLUMNS_PARTIAL_MOBILE({ messages }) : ''}\
${filterable ? FILTERABLE_PARTIAL_MOBILE({ messages }) : ''}\
${groupable ? GROPABLE_PARTIAL_MOBILE({ messages }) : ''}\
</ul>\
</li>\
${showColumns ? COLUMNS_PARTIAL_MOBILE({ messages, hasGroups, columns, groups, ns }) : ''}\
<li class="k-item k-clear-wrap">\
<ul class="k-listgroup k-listgroup-flush">\
<li class="k-listgroup-item">\
<span class="k-link k-label k-clear" title="${messages.clear}" aria-label="${messages.clear}">\
${encode(messages.clear)}\
</span></li></ul></li></ul></div></div>`;

    var MobileMenu = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that._createCheckBoxes();

            that.element.on("click" + NS, "li.k-item:not(.k-separator):not(.k-disabled):not(:has(.k-switch))", "_click");
        },

        events: [ SELECT ],

        _click: function(e) {
            var that = this;

            if (!$(e.target).is("[type=checkbox]")) {
                e.preventDefault();
            }

            if ($(e.target).hasClass("k-clear")) {
                that._cancelChanges(true);

                return;
            }

            if ($(e.target).hasClass("k-filterable")) {
                that._cancelChanges(true);
                that.trigger(SELECT, { item: e.currentTarget });

                return;
            }

            that._updateSelectedItems(e.currentTarget);
        },

        _updateSelectedItems: function(el) {
            var that = this;
            var item = $(el);
            var state = that.options.columnMenu.view.state || { columns: {} };
            var id = item.prop("id");

            if (item.hasClass("k-filter-item")) {
                return;
            }

            if (state[id]) {
                state[id] = false;
            } else {
                state[id] = true;
            }

            if (item.hasClass("k-sort-asc") || item.hasClass("k-sort-desc")) {
                var dir;
                var otherItem;
                var otherItemId;

                if (item.hasClass("k-sort-asc")) {
                    dir = "asc";
                    otherItem = that.element.find(".k-sort-desc");
                } else {
                    dir = "desc";
                    otherItem = that.element.find(".k-sort-asc");
                }

                otherItemId = otherItem.prop("id");

                if (dir === state.initialSort && !item.hasClass("k-selected")) {
                    state[id] = false;
                }

                if (state[otherItemId]) {
                    state[otherItemId] = false;
                }

                otherItem.removeClass(ACTIVE);
            }

            if (item.hasClass(ACTIVE)) {
                item.removeClass(ACTIVE);
            } else {
                item.addClass(ACTIVE);
            }
        },

        _cancelChanges: function(force) {
            var that = this;
            var menu = that.options.columnMenu;
            var view = menu.view;
            var state = view.state || { columns: {} };
            var columns = state.columns;

            that.element.find("." + ACTIVE).removeClass(ACTIVE);
            menu.refresh();

            if (force) {
                var selectedItems = [];

                for (var key in columns) {
                    if (columns.hasOwnProperty(key)) {
                        if (columns[key] === true) {
                            var item = view.element.find("#" + key);

                            selectedItems.push(item[0]);
                        }
                    }
                }
                // In order to use the columns hide/show validation,
                // triggering the Select event must be done backwards
                for (var i = selectedItems.length - 1; i >= 0; i--) {
                    that.trigger(SELECT, { item: selectedItems[i] });
                }

                if (menu.options.hasLockableColumns) {
                    menu._updateLockedColumns();
                }

                if (menu.options.hasStickableColumns) {
                    menu._updateStickyColumns();
                }

                if (menu.options.reorderable) {
                    menu._updateReorderColumns();
                }

                if (menu.options.groupable) {
                    menu._updateGroupColumns();
                }
            }

            that.options.columnMenu.view.state = { columns: {} };
        },

        _applyChanges: function() {
            var that = this;
            var view = that.options.columnMenu.view;
            var state = view.state || { columns: {} };

            for (var key in state) {
                if (state.hasOwnProperty(key)) {
                    if (key !== "initialSort" && key !== "columns" && state[key] === true) {
                        var item = view.element.find("#" + key);

                        if (item.hasClass(ACTIVE)) {
                            item.removeClass(ACTIVE);
                        } else {
                            item.addClass(ACTIVE);
                        }

                        that.trigger(SELECT, { item: item[0] });
                    }
                }
            }
        },

        _createCheckBoxes: function() {
            var that = this;

            that.element.find(".k-columns-item").find("[type='checkbox']").kendoSwitch({
                messages: {
                    checked: "",
                    unchecked: ""
                },
                change: function(e) {
                    var item = e.sender.element.closest(".k-item");
                    var state = that.options.columnMenu.view.state || { columns: {} };
                    var id = item.prop("id");

                    if (state.columns[id]) {
                        state.columns[id] = false;
                    } else {
                        state.columns[id] = true;
                    }

                    that.trigger(SELECT, { item: item });
                }
            });
        },

        _destroyCheckBoxes: function() {
            var that = this;
            var elements = that.element.find(".k-columns-item").find("[type='checkbox']");
            var switchWidget;

            for (var i = 0; i < elements.length; i++) {
                switchWidget = elements.eq(i).data("kendoSwitch");

                if (switchWidget) {
                    switchWidget.destroy();
                }
            }
        },

        close: function() {
            this.options.pane.navigate("");
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            that.element.off(NS);
            that._destroyCheckBoxes();
        }
    });

    ui.plugin(ColumnMenu);
})(window.kendo.jQuery);
export default kendo;


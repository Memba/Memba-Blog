/**
 * Kendo UI v2023.3.1010 (http://www.telerik.com/kendo-ui)
 * Copyright 2023 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
import "../kendo.treeview.js";

(function($, undefined) {

    var kendo = window.kendo,
        ui = kendo.ui,
        keys = kendo.keys,
        DISABLED = "k-disabled",
        SELECT = "select",
        CHECKED = "checked",
        DATABOUND = "dataBound",
        CLICK = "click",
        NS = ".kendoTreeView",
        INDETERMINATE = "indeterminate",
        NAVIGATE = "navigate",
        subGroup,
        TreeView = ui.TreeView;

        function contentChild(filter) {
            return function(node) {
                var result = node.children(".k-animation-container");

                if (!result.length) {
                    result = node;
                }

                return result.children(filter);
            };
        }

        subGroup = contentChild(".k-group");

    var Tree = TreeView.extend({
        init: function(element, options, dropdowntree) {
            var that = this;

            that.dropdowntree = dropdowntree;

            TreeView.fn.init.call(that, element, options);
            if (that.dropdowntree._isMultipleSelection()) {
                that.wrapper.on(CLICK + NS, '.k-in.k-selected', that._clickSelectedItem.bind(that));
            }
        },

        _checkOnSelect: function(e) {
            if (!e.isDefaultPrevented()) {
                var dataItem = this.dataItem(e.node);

                dataItem.set("checked", !dataItem.checked);
            }
        },

        _setCheckedValue: function(node, value) {
            node.set(CHECKED, value);
        },

        _click: function(e) {
            var that = this;

            if (that.dropdowntree._isMultipleSelection()) {
                that.one("select", that._checkOnSelect);
            }
            TreeView.fn._click.call(that, e);
        },

        _clickSelectedItem: function(e) {
            var that = this,
            node = $(e.currentTarget);

            that.one("select", that._checkOnSelect);
            if (!that._trigger(SELECT, node)) {
                that.dataItem(node).set("selected", false);
            }
        },

        defaultrefresh: function(e) {
            var that = this;
            var node = e.node;
            var action = e.action;
            var items = e.items;
            var parentNode = this.wrapper;
            var options = this.options;
            var loadOnDemand = options.loadOnDemand;
            var checkChildren = options.checkboxes && options.checkboxes.checkChildren;
            var i;

            if (this._skip) {
                return;
            }

            if (e.field) {
                if (!items[0] || !items[0].level) {
                    return;
                }

                return this._updateNodes(items, e.field);
            }

            if (node) {
                parentNode = this.findByUid(node.uid);
                this._progress(parentNode, false);
            }

            if (checkChildren && action != "remove") {
                var bubble = false;

                for (i = 0; i < items.length; i++) {
                    if ("checked" in items[i]) {
                        bubble = true;
                        break;
                    }
                }

                if (!bubble && node && node.checked) {
                    for (i = 0; i < items.length; i++) {
                        items[i].checked = true;
                    }
                }
            }

            if (action == "add") {
                this._appendItems(e.index, items, parentNode);
            } else if (action == "remove") {
                this._remove(this.findByUid(items[0].uid), false);
            } else if (action == "itemchange") {
                this._updateNodes(items);
            } else if (action == "itemloaded") {
                this._refreshChildren(parentNode, items, e.index);
            } else {
                this._refreshRoot(items);
            }

            if (action != "remove") {
                for (i = 0; i < items.length; i++) {
                    if (!loadOnDemand || items[i].expanded) {
                        items[i].load();
                    }
                }
            }

            that.wrapper.find(">ul").attr("role", "tree");

            this.trigger(DATABOUND, { node: node ? parentNode : undefined });
            this.dropdowntree._treeViewDataBound({ node: node ? parentNode : undefined, sender: this });
            if (this.options.checkboxes.checkChildren) {
                this.updateIndeterminate();
            }
        },

        _previousVisible: function(node) {
            var that = this,
                lastChild,
                result;

            if (!node.length || node.prev().length) {
                if (node.length) {
                    result = node.prev();
                } else {
                    result = that.root.children().last();
                }

                while (that._expanded(result)) {
                    lastChild = subGroup(result).children().last();

                    if (!lastChild.length) {
                        break;
                    }

                    result = lastChild;
                }
            } else {
                result = that.parent(node) || node;

                if (!result.length) {
                    if (that.dropdowntree.checkAll && that.dropdowntree.checkAll.is(":visible")) {
                        that.dropdowntree.checkAll.find(".k-checkbox").trigger("focus");
                    } else if (that.dropdowntree.filterInput) {
                        that.dropdowntree.filterInput.trigger("focus");
                    } else {
                        that.dropdowntree.wrapper.trigger("focus");
                    }
                }
            }

            return result;
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode,
                target,
                focused = that.current(),
                expanded = that._expanded(focused),
                checkbox = focused.find(".k-checkbox-wrapper").first().find(":checkbox"),
                rtl = kendo.support.isRtl(that.element);

            if (e.target != e.currentTarget) {
                return;
            }

            if ((!rtl && key == keys.RIGHT) || (rtl && key == keys.LEFT)) {
                if (expanded) {
                    target = that._nextVisible(focused);
                } else if (!focused.find(".k-in").first().hasClass(DISABLED)) {
                    that.expand(focused);
                }
            } else if ((!rtl && key == keys.LEFT) || (rtl && key == keys.RIGHT)) {
                if (expanded && !focused.find(".k-in").first().hasClass(DISABLED)) {
                    that.collapse(focused);
                } else {
                    target = that.parent(focused);

                    if (!that._enabled(target)) {
                        target = undefined;
                    }
                }
            } else if (key == keys.DOWN) {
                target = that._nextVisible(focused);
            } else if (key == keys.UP && !e.altKey) {
                target = that._previousVisible(focused);
            } else if (key == keys.HOME) {
                target = that._nextVisible($());
            } else if (key == keys.END) {
                target = that._previousVisible($());
            } else if (key == keys.ENTER && !focused.find(".k-in").first().hasClass(DISABLED)) {
                if (!focused.find(".k-in").first().hasClass("k-selected")) {
                    if (!that._trigger(SELECT, focused)) {
                        that.select(focused);
                    }
                }
            } else if (key == keys.SPACEBAR && checkbox.length && !focused.find(".k-in").first().hasClass(DISABLED)) {
                checkbox.prop(CHECKED, !checkbox.prop(CHECKED))
                    .data(INDETERMINATE, false)
                    .prop(INDETERMINATE, false);

                that._checkboxChange({ target: checkbox });

                target = focused;
            } else if ((e.altKey && key === keys.UP) || key === keys.ESC) {
                that._closePopup();
            } else if ( key === keys.TAB) {
                e.preventDefault();
                that._closePopup();
            }

            if (target) {
                e.preventDefault();

                if (focused[0] != target[0]) {
                    that._trigger(NAVIGATE, target);
                    that.current(target);
                }
            }
        },

        _closePopup: function() {
            this.dropdowntree.close();
            this.dropdowntree.wrapper.trigger("focus");
        },

        refresh: function(e) {
            this.defaultrefresh(e);

            if (this.dropdowntree.options.skipUpdateOnBind) {
                return;
            }

            if (e.action === "itemchange") {
                if (this.dropdowntree._isMultipleSelection()) {
                    if (e.field === "checked") {
                        this.dropdowntree._checkValue(e.items[0]);
                    }
                } else {
                    if (e.field !== "checked" && e.field !== "expanded" && e.items[0].selected) {
                        this.dropdowntree._selectValue(e.items[0]);
                    }
                }
            } else {
                this.dropdowntree.refresh(e);
            }
        }

    });

    kendo.ui._dropdowntree = Tree;

})(window.kendo.jQuery);


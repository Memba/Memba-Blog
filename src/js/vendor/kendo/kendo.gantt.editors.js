/**
 * Kendo UI v2022.2.802 (http://www.telerik.com/kendo-ui)
 * Copyright 2022 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
(function(f, define) {
    define('kendo.gantt.editors',["kendo.data", "kendo.popup", "kendo.window", "kendo.gantt.data", "kendo.grid", "kendo.datetimepicker", "kendo.numerictextbox", "kendo.textbox", "kendo.form"], f);
})(function() {

var __meta__ = {
    id: "gantt.editors",
    name: "GanttEditors",
    category: "web",
    description: "The Gantt component editors.",
    depends: [ "data", "popup", "window", "gantt.data", "grid", "datetimepicker", "numerictextbox", "textbox", "form"],
    hidden: true
};

(function($, undefined) {

    var kendo = window.kendo,
        ui = kendo.ui,
        browser = kendo.support.browser,
        Observable = kendo.Observable,
        Widget = ui.Widget,
        outerWidth = kendo._outerWidth,

        keys = $.extend({ F10: 121 }, kendo.keys),

        extend = $.extend,
        isPlainObject = $.isPlainObject,

        NS = ".kendoGantt",
        PERCENTAGE_FORMAT = "p0",
        CLICK = "click",
        WIDTH = "width",
        STRING = "string",
        DOT = ".",

        DIRECTIONS = {
            "down": {
                origin: "bottom left",
                position: "top left"
            },
            "up": {
                origin: "top left",
                position: "bottom left"
            }
        },

        TASK_DROPDOWN_TEMPLATE = kendo.template('<div class="#=styles.popupWrapper#">' +
            '<ul class="#=styles.popupList#" role="listbox" aria-label="Add dropdown">' +
                '#for(var i = 0, l = actions.length; i < l; i++){#' +
                    '<li tabindex="0" class="#=styles.item#" data-action="#=actions[i].data#" role="option">' +
                        '<span class="k-link k-menu-link">' +
                            '<span class="k-menu-link-text">#=actions[i].text#</span>' +
                        '</span>' +
                    '</li>' +
                '#}#' +
            '</ul>' +
        '</div>');

    var ganttStyles = {
        buttonDelete: "k-gantt-delete",
        buttonCancel: "k-gantt-cancel",
        buttonSave: "k-gantt-update",
        focused: "k-focus",
        gridContent: "k-grid-content",
        hovered: "k-hover",
        item: "k-item k-menu-item",
        popupWrapper: "k-popup k-menu-popup",
        popupList: "k-menu-group k-menu-group-md k-reset",
        popup: {
            form: "k-popup-edit-form",
            editForm: "k-gantt-edit-form",
            formContainer: "k-edit-form-container",
            resourcesFormContainer: "k-resources-form-container",
            message: "k-popup-message",
            buttonsContainer: "k-edit-buttons",
            button: "k-button",
            buttonDefaults: "k-button-md k-rounded-md k-button-solid k-button-solid-base",
            editField: "k-edit-field",
            editLabel: "k-edit-label",
            resourcesField: "k-gantt-resources"
        },
        primary: "k-button-solid-primary",
        toolbar: {
            appendButton: "k-gantt-create"
        }
    };

    var DATERANGEEDITOR = function(container, options) {
        var attr = { name: options.field, title: options.title };
        var validationRules = options.model.fields[options.field].validation;

        if (validationRules && isPlainObject(validationRules) && validationRules.message) {
            attr[kendo.attr("dateCompare-msg")] = validationRules.message;
        }

        $('<input type="text" required ' +
                'id="' + options.field + '"' +
                kendo.attr("type") + '="date" ' +
                kendo.attr("role") + '="datetimepicker" ' +
                kendo.attr("bind") + '="value:' +
                options.field + '" ' +
                kendo.attr("validate") + "='true' />")
            .attr(attr)
            .appendTo(container);

        $('<span ' + kendo.attr("for") + '="' + options.field + '" class="k-invalid-msg"/>')
            .hide()
            .appendTo(container);
    };

    var RESOURCESEDITOR = function(container, options) {
        $('<div class="' + ganttStyles.popup.resourcesField + '" style="display:none"></div><a href="#" class="' + options.styles.button + ' ' + options.styles.buttonDefaults + '"><span class="k-button-text">' + options.messages.assignButton + '</span></a>').on("click", options.click).appendTo(container);
    };

    var READONLYEDITOR = function(container, options) {
        var field = options.field;
        var value = '';

        if (options.model.get(field) !== null) {
            value = options.model.get(field);
        }

        container.append("<span>" + value + "</span>");
    };

    var TaskDropDown = Observable.extend({
        init: function(element, options) {

            Observable.fn.init.call(this);

            this.element = element;
            this.options = extend(true, {}, this.options, options);

            this._popup();
        },

        options: {
            direction: "down"
        },

        destroy: function() {
            clearTimeout(this._focusTimeout);
            this.popup.destroy();
            this.element.off(NS);
            this.list.off(NS);
            this.unbind();
        },

        _adjustListWidth: function() {
            var list = this.list;
            var width = list[0].style.width;
            var wrapper = this.element;
            var listOuterWidth = outerWidth(list);
            var computedStyle;
            var computedWidth;

            if (!list.data(WIDTH) && width) {
                return;
            }

            computedStyle = window.getComputedStyle ? window.getComputedStyle(wrapper[0], null) : 0;
            computedWidth = computedStyle ? parseFloat(computedStyle.width) : outerWidth(wrapper);

            if (computedStyle && (browser.mozilla || browser.msie)) { // getComputedStyle returns different box in FF and IE.
                computedWidth += parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight) + parseFloat(computedStyle.borderLeftWidth) + parseFloat(computedStyle.borderRightWidth);
            }

            if (list.css("box-sizing") !== "border-box") {
                width = computedWidth - (outerWidth(list) - list.width());
            } else {
                width = computedWidth;
            }

            if (listOuterWidth > width) {
                width = listOuterWidth;
            }

            list.css({
                fontFamily: wrapper.css("font-family"),
                width: width
            })
            .data(WIDTH, width);
        },

        _current: function(method) {
            var current = this.list
                .find(DOT + ganttStyles.focused);
            var sibling = current[method]();

            if (sibling.length) {
                current
                    .removeClass(ganttStyles.focused)
                    .removeAttr("id");
                sibling
                    .addClass(ganttStyles.focused)
                    .trigger("focus");
            }
        },

        _popup: function() {
            var that = this;
            var itemSelector = "li" + DOT + "k-item";
            var actions = this.options.messages.actions;

            this.list = $(TASK_DROPDOWN_TEMPLATE({
                styles: ganttStyles,
                actions: [
                    {
                        data: "add",
                        text: actions.addChild
                    },
                    {
                        data: "insert-before",
                        text: actions.insertBefore
                    },
                    {
                        data: "insert-after",
                        text: actions.insertAfter
                    }
                ]
            }));

            this.element.append(this.list);

            this.popup = new kendo.ui.Popup(this.list,
                extend({
                    anchor: this.element,
                    open: function() {
                        that._adjustListWidth();
                    },
                    animation: this.options.animation
                }, DIRECTIONS[this.options.direction])
            );

            this.element
                .on(CLICK + NS, function(e) {
                    var target = $(this);
                    var action = target.attr(kendo.attr("action"));

                    e.preventDefault();

                    if (action) {
                        that.trigger("command", { type: action });
                    } else {
                        that.popup.open();

                        that.list
                            .find("li:first")
                            .addClass(ganttStyles.focused)
                            .trigger("focus");
                    }
                });

            this.list
                .find(itemSelector)
                .hover(function() {
                    $(this).addClass(ganttStyles.hovered);
                }, function() {
                    $(this).removeClass(ganttStyles.hovered);
                })
                .end()
                .on(CLICK + NS, itemSelector, function() {
                    that.trigger("command", { type: $(this).attr(kendo.attr("action")) });
                    that.popup.close();
                });

            this.popup
                .bind("close", function() {
                    that.list
                        .find(itemSelector)
                        .removeClass(ganttStyles.focused);

                    that.element
                        .parents('[' + kendo.attr("role") + '="gantt"]')
                        .find(DOT + ganttStyles.gridContent + " > table").first()
                        .trigger("focus");
                });

            this.list
                .find("ul")
                .on("keydown" + NS, function(e) {
                    var key = e.keyCode;

                    switch (key) {
                        case keys.UP:
                            e.preventDefault();
                            that._current("prev");
                            break;
                        case keys.DOWN:
                            e.preventDefault();
                            that._current("next");
                            break;
                        case keys.ENTER:
                            that.list
                                .find(DOT + ganttStyles.focused)
                                .click();
                            break;
                        case keys.ESC:
                            e.preventDefault();
                            that.popup.close();
                            break;
                    }
                });
        }
    });

    var editors = {
        desktop: {
            dateRange: DATERANGEEDITOR,
            resources: RESOURCESEDITOR,
            readonly: READONLYEDITOR
        }
    };

    var Editor = kendo.Observable.extend({
        init: function(element, options) {
            kendo.Observable.fn.init.call(this);

            this.element = element;
            this.options = extend(true, {}, this.options, options);
            this.createButton = this.options.createButton;
        },

        fields: function(editors, model, plannedEditors) {
            var that = this;
            var options = this.options;
            var messages = options.messages.editor;
            var resources = options.resources;
            var fields;

            var click = function(e) {
                e.preventDefault();
                resources.editor(that.container.find(DOT + ganttStyles.popup.resourcesField), model);
            };

            if (options.editable.template) {
                fields = $.map(model.fields, function(value, key) {
                            return { field: key };
                        });
            } else {
                fields = [
                    { field: "title", title: messages.title },
                    { field: "start", title: messages.start, editor: editors.dateRange },
                    { field: "end", title: messages.end, editor: editors.dateRange },
                    { field: "percentComplete", title: messages.percentComplete, format: PERCENTAGE_FORMAT }
                ];

                if (plannedEditors) {
                    fields.splice.apply(fields, [1, 0].concat([
                        { field: "plannedStart", title: messages.plannedStart, editor: editors.dateRange },
                        { field: "plannedEnd", title: messages.plannedEnd, editor: editors.dateRange }
                    ]));
                }

                if (model.get(resources.field)) {
                    fields.push({ field: resources.field, title: messages.resources, messages: messages, editor: editors.resources, click: click, styles: ganttStyles.popup });
                }


                fields = fields.map(function(item) {
                    if (!model.editable || model.editable(item.field)) {
                        return item;
                    } else {
                        return extend(true, item, {
                            editor: editors.readonly
                        });
                    }
                });

            }

            return fields.map(function(item) {
                return extend(true, item, {
                    label: item.title
                });
            });
        },

        _buildEditTemplate: function(model) {
            var template = this.options.editable.template;
            var settings = extend({}, kendo.Template, this.options.templateSettings);
            var html = "";

            if (template) {
                if (typeof template === STRING) {
                    template = kendo.unescape(template);
                }

                html += (kendo.template(template, settings))(model);
            } else {
                this.renderForm = true;
                html += '<div class="k-gantt-form"></div>';
            }

            return html;
        }
    });

    var PopupEditor = Editor.extend({
        destroy: function() {
            this.close();
            this.unbind();
        },

        close: function() {
            var that = this;

            var destroy = function() {
                if (that.editable) {
                    that.container.data("kendoWindow").destroy();
                    that.editable = null;
                    that.container = null;
                }

                if (that.popup) {
                    that.popup.destroy();
                    that.popup = null;
                }
            };

            if (that.editable && that.container.is(":visible")) {
                that.trigger("close", { window: that.container });
                that.container.data("kendoWindow").bind("deactivate", destroy).close();
            } else {
                destroy();
            }
        },

        editTask: function(task, plannedEditors) {
            this.editable = this._createPopupEditor(task, plannedEditors);
        },

        showDialog: function(options) {
            var buttons = options.buttons;
            var popupStyles = ganttStyles.popup;

            var html = kendo.format('<div class="{0}"><div class="{1}"><p class="{2}">{3}</p><div class="{4}">',
                popupStyles.form, popupStyles.formContainer, popupStyles.message, options.text, popupStyles.buttonsContainer);

            for (var i = 0, length = buttons.length; i < length; i++) {
                html += this.createButton(buttons[i]);
            }

            html += '</div></div></div>';

            var wrapper = this.element;

            if (this.popup) {
                this.popup.destroy();
            }

            var popup = this.popup = $(html).appendTo(wrapper)
                .eq(0)
                .on("click", DOT + popupStyles.button, function(e) {
                    e.preventDefault();

                    popup.close();

                    var buttonIndex = $(e.currentTarget).index();

                    buttons[buttonIndex].click();
                })
                .kendoWindow({
                    modal: true,
                    autoFocus: false,
                    resizable: false,
                    draggable: false,
                    title: options.title,
                    visible: false,
                    deactivate: function() {
                        this.destroy();
                        wrapper.trigger("focus");
                    }
                })
                .getKendoWindow();

            popup.center().open();

            popup.element.find(".k-button-solid-primary").trigger("focus");
        },

        _createPopupEditor: function(task, plannedEditors) {
            var that = this;
            var options = {};
            var messages = this.options.messages;
            var popupStyles = ganttStyles.popup;
            var editableWidget;

            var html = kendo.format('<div {0}="{1}" class="{2} {3}"><div class="{4}">',
                kendo.attr("uid"), task.uid, popupStyles.form, popupStyles.editForm, popupStyles.formContainer);

            var fields = this.fields(editors.desktop, task, plannedEditors);

            html += this._buildEditTemplate(task);

            html += '<div class="' + popupStyles.buttonsContainer + '">';
            html += this.createButton({ name: "update", text: messages.save, className: ganttStyles.primary });
            html += this.createButton({ name: "cancel", text: messages.cancel });
            if (that.options.editable.destroy !== false) {
                html += this.createButton({ name: "delete", text: messages.destroy });
            }

            html += '</div></div></div>';

            var container = this.container = $(html).appendTo(this.element)
                .eq(0)
                .kendoWindow(extend({
                    modal: true,
                    resizable: false,
                    draggable: true,
                    title: messages.editor.editorTitle,
                    visible: false,
                    close: function(e) {
                        if (e.userTriggered) {
                            if (that.trigger("cancel", { container: container, model: task })) {
                                e.preventDefault();
                            }
                        }
                    }
                }, options));

            if (this.renderForm) {
                this.form = container.find(".k-gantt-form").kendoForm({
                    items: fields,
                    formData: task,
                    buttonsTemplate: "",
                    validatable: {
                        validateOnBlur: true
                    }
                }).data("kendoForm");

                editableWidget = this.form.editable;
            } else {
                editableWidget = container
                .kendoEditable({
                    model: task,
                    clearContainer: false,
                    validateOnBlur: true,
                    target: that.options.target
                })
                .data("kendoEditable");
            }

            kendo.cycleForm(container);

            if (!this.trigger("edit", { container: container, model: task })) {
                container.data("kendoWindow").center().open();

                container.on(CLICK + NS, DOT + ganttStyles.buttonCancel, function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    that.trigger("cancel", { container: container, model: task });
                });

                container.on(CLICK + NS, DOT + ganttStyles.buttonSave, function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    var fields = that.fields(editors.desktop, task, plannedEditors);
                    var updateInfo = {};
                    var field;

                    for (var i = 0, length = fields.length; i < length; i++) {
                        field = fields[i].field;
                        updateInfo[field] = task.get(field);
                    }

                    that.trigger("save", { container: container, model: task, updateInfo: updateInfo });
                });

                container.on(CLICK + NS, DOT + ganttStyles.buttonDelete, function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    that.trigger("remove", { container: container, model: task });
                });
            } else {
                that.trigger("cancel", { container: container, model: task });
            }

            return editableWidget;
        }
    });

    var ResourceEditor = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            this.wrapper = this.element;
            this.model = this.options.model;
            this.resourcesField = this.options.resourcesField;
            this.createButton = this.options.createButton;

            this._initContainer();
            this._attachHandlers();
        },

        events: [
            "save"
        ],

        close: function() {
            this.window.bind("deactivate", this.destroy.bind(this)).close();
        },

        destroy: function() {
            this._dettachHandlers();

            this.grid.destroy();
            this.grid = null;

            this.window.destroy();
            this.window = null;

            Widget.fn.destroy.call(this);

            kendo.destroy(this.wrapper);

            this.element = this.wrapper = null;
        },

        open: function() {
            this.window.center().open();
        },

        _attachHandlers: function() {
            var grid = this.grid;

            var closeHandler = this._cancelProxy = this._cancel.bind(this);
            this.container.on(CLICK + NS, DOT + ganttStyles.buttonCancel, this._cancelProxy);

            this._saveProxy = this._save.bind(this);
            this.container.on(CLICK + NS, DOT + ganttStyles.buttonSave, this._saveProxy);

            this.window.bind("close", function(e) {
                if (e.userTriggered) {
                    closeHandler(e);
                }
            });

            grid.wrapper.on(CLICK + NS, "input[type='checkbox']", function() {
                var element = $(this);
                var row = $(element).closest("tr");
                var model = grid.dataSource.getByUid(row.attr(kendo.attr("uid")));
                var value = $(element).is(":checked") ? 1 : "";

                model.set("value", value);
            });
        },

        _cancel: function(e) {
            e.preventDefault();
            this.close();
        },

        _createButtons: function() {
            var buttons = this.options.buttons;
            var html = '<div class="' + ganttStyles.popup.buttonsContainer + '">';

            for (var i = 0, length = buttons.length; i < length; i++) {
                html += this.createButton(buttons[i]);
            }

            html += "</div>";

            this.container.append(html);
        },

        _dettachHandlers: function() {
            this._cancelProxy = null;
            this._saveProxy = null;
            this.container.off(NS);
            this.grid.wrapper.off();
        },

        _initContainer: function() {
            var that = this;
            var popupStyles = ganttStyles.popup;
            var dom = kendo.format('<div class="{0} {1}"><div class="{2} {3}"></div></div>"',
                popupStyles.form, popupStyles.editForm, popupStyles.formContainer, popupStyles.resourcesFormContainer);

            dom = $(dom);

            this.container = dom.find(DOT + popupStyles.resourcesFormContainer);

            this.window = dom.kendoWindow({
                modal: true,
                resizable: false,
                draggable: true,
                visible: false,
                title: this.options.messages.resourcesEditorTitle,
                open: function() {
                      that.grid.resize(true);
                }
            }).data("kendoWindow");

            this._resourceGrid();
            this._createButtons();
        },

        _resourceGrid: function() {
            var that = this;
            var messages = this.options.messages;
            var element = $('<div id="resources-grid"/>').appendTo(this.container);

            this.grid = new kendo.ui.Grid(element, {
                columns: [
                    {
                        field: "name",
                        title: messages.resourcesHeader,
                        template:
                            "<label><input type='checkbox' value='#=name#'" +
                                "# if (value > 0 && value !== null) {#" +
                                       "checked='checked'" +
                                "# } #" +
                            "/>#=name#</labe>"
                    },
                    {
                        field: "value",
                        title: messages.unitsHeader,
                        template: function(dataItem) {
                            var valueFormat = dataItem.format;
                            var value = dataItem.value !== null ? dataItem.value : "";

                            return valueFormat ? kendo.toString(value, valueFormat) : value;
                        }
                    }
                ],
                height: 280,
                sortable: true,
                editable: true,
                filterable: true,
                dataSource: {
                    data: that.options.data,
                    schema: {
                        model: {
                            id: "id",
                            fields: {
                                id: { from: "id" },
                                name: { from: "name", type: "string", editable: false },
                                value: { from: "value", type: "number", validation: this.options.unitsValidation },
                                format: { from: "format", type: "string" }
                            }
                        }
                    }
                },
                save: function(e) {
                    var value = !!e.values.value;
                    e.container.parent().find("input[type='checkbox']").prop("checked", value);
                }
            });
        },

        _save: function(e) {
            e.preventDefault();

            this._updateModel();

            if (!this.wrapper.is(DOT + ganttStyles.popup.resourcesField)) {
                this.trigger("save", { container: this.wrapper, model: this.model });
            }

            this.close();
        },

        _updateModel: function() {
            var resources = [];
            var value;
            var data = this.grid.dataSource.data();

            for (var i = 0, length = data.length; i < length; i++) {
                value = data[i].get("value");
                if (value !== null && value > 0) {
                    resources.push(data[i]);
                }
            }

            this.model[this.resourcesField] = resources;
        }
    });

    kendo.gantt = {
        TaskDropDown: TaskDropDown,
        Editor: Editor,
        PopupEditor: PopupEditor,
        ResourceEditor: ResourceEditor
    };
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3) { (a3 || a2)(); });

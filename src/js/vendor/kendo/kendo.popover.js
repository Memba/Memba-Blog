/**
 * Kendo UI v2022.3.1109 (http://www.telerik.com/kendo-ui)
 * Copyright 2022 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
import "./kendo.tooltip.js";

var __meta__ = {
    id: "popover",
    name: "Popover",
    category: "web",
    description: "The Popover widget displays a popup with additional information for an element.",
    depends: [ "tooltip"],
    features: [ {
        id: "popover-fx",
        name: "Animation",
        description: "Support for animation",
        depends: [ "fx" ]
    } ]
};

(function($, undefined) {
    var kendo = window.kendo,
        Popup = kendo.ui.Popup,
        TooltipBase = kendo.ui.TooltipBase,
        extend = $.extend,
        DOCUMENT = $(document),
        NS = ".kendoPopover",
        ARROWWIDTH = 28,
        TEXTBUTTONTEMPLATE = '<button #=index# class="k-button k-button-md k-rounded-md k-button-flat k-button-flat-primary"><span class="k-button-text">#=text#</span></button>',
        ICONTEXTBUTTONTEMPLATE = '<button #=index# class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">' +
            '<span class="k-button-icon #=iconClass#"></span>' +
            '<span class="k-button-text">#=text#</span>' +
        '</button>',
        ICONBUTTON = '<button #=index# class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-icon-button"><span class="k-button-icon #=iconClass#"></span></button>',
        CARDTEMPLATE = '#if (header) {# <div class="k-popover-header">#=header#</div> #}#' +
        '<div class="k-popover-body">#=body#</div>' +
        '#if (actions){ #<div class="k-popover-actions k-actions k-hstack k-justify-content-#=positioning#">#=actions#</div>#}#',
        TEMPLATE = '<div role="tooltip" class="k-popover k-widget">' +
        '#if (callout){ #<div class="k-popover-callout k-callout-#=dir#"></div><div class="k-popover-inner"></div>#}#' +
        '</div>',
        SHOW = "show",
        HIDE = "hide",
        REVERSE = {
            "top": "bottom",
            "bottom": "top",
            "left": "right",
            "right": "left",
            "center": "center"
        },
        POSITIONS = {
            bottom: {
                origin: "bottom center",
                position: "top center"
            },
            top: {
                origin: "top center",
                position: "bottom center"
            },
            left: {
                origin: "center left",
                position: "center right",
                collision: "fit flip"
            },
            right: {
                origin: "center right",
                position: "center left",
                collision: "fit flip"
            },
            center: {
                position: "center center",
                origin: "center center"
            }
        },
        DIRCLASSES = {
            bottom: "n",
            top: "s",
            left: "e",
            right: "w",
            center: "n"
        },
        EVENTSCOUNTERPART = {
            "mouseenter": "mouseleave",
            "focus": "blur",
            "focusin": "focusout"
        },
        DIMENSIONS = {
            "horizontal": { offset: "top", size: "outerHeight" },
            "vertical": { offset: "left", size: "outerWidth" }
        };

    var Popover = TooltipBase.extend({
        init: function(element, options) {
            var that = this,
                axis;

            TooltipBase.fn.init.call(that, element, options);

            axis = that.options.position.match(/left|right/) ? "horizontal" : "vertical";

            that.dimensions = DIMENSIONS[axis];
            that._saveTitle = $.noop;

            that._documentKeyDownHandler = that._documentKeyDown.bind(that);
            that._actionsHandler = that._actionsClick.bind(that);

            if (that.options.toggleOnClick && that._isShownOnClick()) {
                that.element.on((kendo.support.touch ? kendo.support.mousedown : that.options.showOn) + NS, that.options.filter, that._showAction.bind(that));
            }

            if (!that._isShownOnClick()) {
                that.element.on(EVENTSCOUNTERPART[that.options.showOn], that.options.filter, that._dismissAction.bind(that));
            }
        },

        options: {
            name: "Popover",
            filter: "",
            actions: [],
            actionsLayout: "center",
            position: "bottom",
            showOn: "mouseenter",
            toggleOnClick: false,
            width: null,
            height: null,
            animation: {
                open: {
                    effects: "fade:in",
                    duration: 0
                },
                close: {
                    duration: 40,
                    hide: true
                }
            }
        },

        events: [ SHOW, HIDE ],

        _addAria: function() {
            var that = this;
            var options = that.options;
            var id;

            if (that._isShownOnClick() && that.wrapper.find("a,input,select,textarea,button").length) {
                that.wrapper.attr("role", "dialog");
                that._isDialog = true;

                if (options.header) {
                    id = kendo.guid();
                    that.wrapper
                        .attr("aria-labelledby", id)
                        .find(".k-popover-header").attr("id", id);
                }

                if (options.body) {
                    id = kendo.guid();
                    that.wrapper
                        .attr("aria-describedby", id)
                        .find(".k-popover-body").attr("id", id);
                }
            } else {
                that.wrapper.attr("role", "tooltip");
            }
        },

        _appendContent: function(target) {
            var that = this,
                options = that.options,
                element = that.wrapper.find(".k-popover-inner"),
                template = that.options.template;

            if (element.length) {
                element.children().remove();
            } else {
                that.wrapper.children(":not(.k-popover-callout)").remove();
            }

            element = element.length ? element : that.wrapper;

            if (template) {
                element.append(kendo.template(template)({ target: target }));
            } else {
                element.append(kendo.template(CARDTEMPLATE)({
                    header: kendo.template(options.header || "")({ target: target }),
                    body: kendo.template(options.body || "")({ target: target }),
                    actions: that._buildActions(options.actions),
                    positioning: options.actionsLayout
                }));
            }
        },

        _actionsClick: function(e) {
            var that = this;
            var actions = that.options.actions;
            var button = $(e.currentTarget);

            var action = actions[parseInt(button.attr(kendo.attr("index")), 10)];

            if (action.click) {
                action.click.call(that, {
                    sender: that,
                    target: button
                });
            }
        },

        _attachActions: function() {
            var that = this;

            that.wrapper.on("click" + NS, ".k-popover-actions .k-button", that._actionsHandler);
        },

        _dettachActions: function() {
            var that = this;

            if (that.wrapper) {
                that.wrapper.off("click" + NS, that._actionsHandler);
            }
        },

        _buildActions: function(actions) {
            if (!actions.length) {
                return;
            }

            var html = "";
            var action;
            for (var index = 0; index < actions.length; index++) {
                action = actions[index];

                if (action.text && action.iconClass) {
                    html += kendo.template(ICONTEXTBUTTONTEMPLATE)( { text: action.text, index: kendo.attr("index") + "=" + index, iconClass: action.iconClass });
                } else if (action.iconClass && !action.text) {
                    html += kendo.template(ICONBUTTON)( { index: kendo.attr("index") + "=" + index, iconClass: action.iconClass });
                } else {
                    html += kendo.template(TEXTBUTTONTEMPLATE)( { text: action.text, index: kendo.attr("index") + "=" + index });
                }
            }

            return html;
        },

        _documentKeyDown: function(e) {
            if (e.keyCode === kendo.keys.ESC) {
                this._shown = false;
                this._dismissAction();
            }

            if (e.keyCode === kendo.keys.TAB) {
                var allFocusables = this.wrapper.find(":kendoFocusable");
                var firstFocusable = allFocusables.first();
                var lastFocusable = allFocusables.last();
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable[0]) {
                        lastFocusable.trigger("focus");
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable[0]) {
                        firstFocusable.trigger("focus");
                        e.preventDefault();
                    }
                }
            }
        },

        _initPopup: function() {
            var that = this,
                options = that.options,
                wrapper = $(kendo.template(TEMPLATE)({
                    callout: options.callout && options.position !== "center",
                    dir: DIRCLASSES[options.position]
                }));

            that.wrapper = wrapper;
            that.popup = new Popup(wrapper, extend({
                activate: function() {
                    that._offset(that.options.position, that.options.offset, ARROWWIDTH);
                    that._positionCallout();

                    that._attachActions();

                    DOCUMENT.on("keydown" + NS, that._documentKeyDownHandler);
                    if (that._isDialog) {
                        that.wrapper.find(":kendoFocusable").first().trigger("focus");
                    } else {
                        that._addDescribedBy();
                    }
                    that.trigger(SHOW);
                    that.popup._hovered = undefined;
                },
                close: function(e) {
                    if (that.options.toggleOnClick && that._shown) {
                        e.preventDefault();
                        return;
                    }
                    that.trigger(HIDE);
                },
                copyAnchorStyles: false,
                animation: options.animation
            }, POSITIONS[options.position]));

            wrapper.css({
                width: options.width,
                height: options.height
            });

            if (that._isShownOnMouseEnter()) {
                wrapper.on("mouseleave" + NS, that._dismissAction.bind(that));
            }

            that.arrow = wrapper.find(".k-popover-callout");
        },

        _dismissAction: function() {
            var that = this;

            clearTimeout(that.timeout);

            that.timeout = setTimeout(function() {
                if (that.popup && !that.popup._hovered) {
                    that.popup.close();
                }
            }, that.options.hideAfter);
        },

        _showAction: function() {
            var that = this;
            that._shown = !that._shown;

            if (!that._shown) {
                that.popup.close();
            }
        },

        _show: function(target) {
            var that = this,
                current = that.target();

            if (!that.popup) {
                that._initPopup();
            }

            if (current && current[0] != target[0]) {
                that.popup.close();
                that.popup.element.kendoStop(true, true);
            }

            if (!current || current[0] != target[0]) {
                that._appendContent(target);
                that._addAria();
                that.popup.options.anchor = target;
            }

            that.popup.one("deactivate", function() {
                DOCUMENT.off("keydown" + NS, that._documentKeyDownHandler);

                if (!that._isDialog) {
                    that._removeDescribedBy(that.target());
                    this.element.removeAttr("id");
                }
                that._dettachActions();
            });

            that._openPopup();
        },

        _positionCallout: function() {
            var that = this,
                position = that.options.position,
                popup = that.popup,
                cssClass = DIRCLASSES[popup.flipped ? REVERSE[position] : position];

            that.arrow.removeClass("k-callout-s k-callout-w k-callout-e k-callout-n")
               .addClass("k-callout-" + cssClass);
        },

        destroy: function() {
            this.element.off(NS);

            this._dettachActions();
            clearTimeout(this.timeout);
            DOCUMENT.off("keydown" + NS, this._documentKeyDownHandler);
            TooltipBase.fn.destroy.call(this);
        }
    });

    kendo.ui.plugin(Popover);
})(window.kendo.jQuery);


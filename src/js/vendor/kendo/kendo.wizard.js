/** 
 * Kendo UI v2020.2.617 (http://www.telerik.com/kendo-ui)                                                                                                                                               
 * Copyright 2020 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.                                                                                      
 *                                                                                                                                                                                                      
 * Kendo UI commercial licenses may be obtained at                                                                                                                                                      
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete                                                                                                                                  
 * If you do not own a commercial license, this file shall be governed by the trial license terms.                                                                                                      
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       

*/
(function (f, define) {
    define('kendo.wizard', [
        'kendo.stepper',
        'kendo.button',
        'kendo.form'
    ], f);
}(function () {
    var __meta__ = {
        id: 'wizard',
        name: 'Wizard',
        category: 'web',
        description: 'The Wizard widget serves as a container of stepped process.',
        depends: [
            'stepper',
            'button',
            'form'
        ],
        features: [
            {
                id: 'wizard-form-dropdowns',
                name: 'DropDowns',
                description: 'Support for DropDown editors in Wizard From',
                depends: [
                    'autocomplete',
                    'combobox',
                    'multiselect',
                    'dropdowntree',
                    'multicolumncombobox'
                ]
            },
            {
                id: 'wizard-form-datepickers',
                name: 'DatePickers',
                description: 'Support for DatePicker editors in Wizard From',
                depends: [
                    'dateinput',
                    'datepicker',
                    'datetimepicker',
                    'timepicker'
                ]
            },
            {
                id: 'wizard-form-inputs',
                name: 'Inputs',
                description: 'Support for Input editors in Wizard From',
                depends: [
                    'numerictextbox',
                    'maskedtextbox',
                    'switch',
                    'rating',
                    'slider',
                    'colorpicker'
                ]
            },
            {
                id: 'wizard-form-editor',
                name: 'Editor',
                description: 'Support for Editor editor in Wizard From',
                depends: ['editor']
            }
        ]
    };
    (function ($, undefined) {
        var kendo = window.kendo, Widget = kendo.ui.Widget, extend = $.extend, proxy = $.proxy, WIZARD = '.kendoWizard', CLICK = 'click', ACTIVATE = 'activate', SELECT = 'select', RESET = 'reset', SUBMIT = 'submit', PREVIOUS = 'previous', NEXT = 'next', DONE = 'done', ERROR = 'error', CONTENTLOAD = 'contentLoad', FORM_VALIDATE_FAILED = 'formValidateFailed', HIDDEN = 'k-hidden', PRIMARY = 'k-primary', STEPPER_STEP_LINK = 'k-step-link', ARIA_SELECTED = 'aria-selected', ARIA_CONTROLS = 'aria-controls', ARIA_HIDDEN = 'aria-hidden', ARIA_EXPANDED = 'aria-expanded', ARIA_LABEL = 'aria-label', VERTICAL = 'vertical', HORIZONTAL = 'horizontal', BOTTOM = 'bottom', RIGHT = 'right', LEFT = 'left', DOT = '.', SPACE = ' ', DASH = '-', ID = 'id', TABINDEX = 'tabindex', ROLE = 'role', DATA_WIZARD_PREFIX = 'data-wizard-';
        var wizardClasses = {
            wizard: 'k-widget k-wizard',
            horizontalWizard: 'k-wizard-horizontal',
            verticalWizard: 'k-wizard-vertical',
            rightWizard: 'k-wizard-right',
            leftWizard: 'k-wizard-left',
            wizardStepsContainer: 'k-wizard-steps',
            wizardStep: 'k-wizard-step',
            wizardContent: 'k-wizard-content',
            wizardButtons: 'k-wizard-buttons',
            wizardLeftButtons: 'k-wizard-buttons-left',
            wizardRightButtons: 'k-wizard-buttons-right',
            wizardPager: 'k-wizard-pager'
        };
        var Step = kendo.Class.extend({
            init: function (options) {
                this.options = extend({}, this.options, options);
                if (this.options.actionBar) {
                    this._processButtons();
                }
                this._render();
            },
            options: {
                name: 'WizardStep',
                index: 0,
                content: '',
                contentUrl: null,
                contentId: null,
                markupContainer: null,
                form: null,
                actionBar: true,
                buttons: [],
                pager: true,
                selected: false,
                enabled: true,
                className: '',
                totalSteps: 1,
                wizardId: 'wizard',
                formTag: 'form',
                messages: {}
            },
            _defaultButtonsConfiguration: {
                first: [
                    RESET,
                    NEXT
                ],
                middle: [
                    RESET,
                    PREVIOUS,
                    NEXT
                ],
                last: [
                    RESET,
                    PREVIOUS,
                    DONE
                ]
            },
            _pagerTemplate: '<span class="k-wizard-pager">' + '#: step # ' + '#: currentStep # ' + '#: of # ' + '#: totalSteps #' + '</span>',
            buttons: function () {
                return this._buttons;
            },
            load: function () {
                if (this.options.contentUrl) {
                    this._ajaxRequest();
                }
            },
            resetButtons: function () {
                var buttonsContainer = this.element.find(DOT + wizardClasses.wizardButtons);
                kendo.destroy(buttonsContainer);
                buttonsContainer.remove();
                this.options.buttons = [];
                this._processButtons();
                this._buttonsContainer();
            },
            _ajaxRequest: function (wizard, triggerActivate) {
                var that = this, url = that.options.contentUrl, data = {}, element = that.element;
                var ajaxOptions = {
                    type: 'GET',
                    cache: false,
                    url: url,
                    dataType: 'html',
                    data: data,
                    error: function (xhr, status) {
                        if (wizard) {
                            wizard._triggerError(xhr, status, that);
                        }
                    },
                    complete: function () {
                        if (wizard && triggerActivate) {
                            wizard._triggerActivate(that);
                        }
                    },
                    success: function (content) {
                        var contentElement = element.find(DOT + wizardClasses.wizardContent);
                        try {
                            if (wizard) {
                                wizard.angular('cleanup', function () {
                                    return { elements: element.get() };
                                });
                            }
                            kendo.destroy(contentElement);
                            contentElement.html(content);
                            if (wizard) {
                                wizard._triggerContentLoad(that);
                            }
                        } catch (e) {
                            this.error(this.xhr, 'error');
                        }
                        if (wizard) {
                            wizard.angular('compile', function () {
                                return { elements: element.get() };
                            });
                        }
                    }
                };
                if (typeof url === 'object') {
                    ajaxOptions = $.extend(true, {}, ajaxOptions, url);
                }
                $.ajax(ajaxOptions);
            },
            _ariaAttributes: function () {
                var element = this.element, options = this.options, messages = options.messages, label = messages.step + ' ' + (options.index + 1) + ' ' + messages.of + ' ' + options.totalSteps;
                element.attr(ROLE, 'tabpanel').attr(TABINDEX, 0).attr(ID, options.wizardId + DASH + options.index).attr(ARIA_EXPANDED, options.selected).attr(ARIA_LABEL, label);
            },
            _buttonFactory: function (buttonOptions) {
                var button = $('<button type=\'button\'>').kendoButton().getKendoButton(), buttonElement = button.element;
                buttonElement.attr(DATA_WIZARD_PREFIX + buttonOptions.name, '');
                buttonElement.text(buttonOptions.text);
                if (buttonOptions.click) {
                    button.bind(CLICK, buttonOptions.click);
                }
                if (buttonOptions.enabled === false) {
                    button.enable(false);
                }
                if (buttonOptions.primary) {
                    buttonElement.addClass(PRIMARY);
                }
                if (buttonOptions.position === LEFT) {
                    this._leftButtonsContainer.append(buttonElement);
                } else {
                    this._rightButtonsContainer.append(buttonElement);
                }
                if (buttonOptions.name === 'done' && this.options.formTag !== 'form') {
                    button.element.attr('type', SUBMIT);
                }
                this._buttons.push(button);
            },
            _buttonsContainer: function () {
                var buttonsContainer = $('<div>').addClass(wizardClasses.wizardButtons);
                this._leftButtonsContainer = $('<span>').addClass(wizardClasses.wizardLeftButtons);
                this._rightButtonsContainer = $('<span>').addClass(wizardClasses.wizardRightButtons);
                buttonsContainer.append(this._leftButtonsContainer);
                buttonsContainer.append(this._rightButtonsContainer);
                this.element.append(buttonsContainer);
                this._buttons = [];
                this.options.buttons.map(proxy(this._buttonFactory, this));
                if (this.options.pager) {
                    this._pager();
                }
            },
            _content: function () {
                var options = this.options, loadFromRemote = !!options.contentUrl, contentElement = $('<div>').addClass(wizardClasses.wizardContent);
                if (!loadFromRemote && options.contentId) {
                    contentElement.html($('#' + options.contentId).html());
                } else if (!loadFromRemote && options.content) {
                    contentElement.append(options.content);
                }
                if (options.markupContainer) {
                    if (!loadFromRemote && !options.contentId && !options.content) {
                        contentElement.append(options.markupContainer.html());
                    }
                    kendo.destroy(options.markupContainer);
                    options.markupContainer.remove();
                }
                this.element.prepend(contentElement);
            },
            _form: function () {
                var formTag = '<' + this.options.formTag + '>', formElement = $(formTag).hide(), contentElement = $('<div>').addClass(wizardClasses.wizardContent), formOptions = this.options.form;
                $('body').append(formElement);
                this.element.prepend(contentElement);
                formOptions.buttonsTemplate = formOptions.buttonsTemplate || '';
                this.form = formElement.kendoForm(formOptions).getKendoForm();
                contentElement.append(formElement.show());
            },
            _iterateButton: function (button) {
                var messages = this.options.messages;
                if (typeof button === 'string') {
                    button = { name: button };
                }
                if (!button.text) {
                    button.text = messages[button.name] || button.name.charAt(0).toUpperCase() + button.name.slice(1);
                }
                if (button.name === DONE || button.name === NEXT) {
                    button.primary = true;
                }
                if (!button.position && button.name === RESET) {
                    button.position = LEFT;
                } else if (!button.position) {
                    button.position = RIGHT;
                }
                return button;
            },
            _pager: function () {
                var options = this.options, messages = options.messages, pagerData = {
                        step: messages.step,
                        currentStep: options.index + 1,
                        of: messages.of,
                        totalSteps: options.totalSteps
                    }, pager = kendo.template(this._pagerTemplate)(pagerData);
                this._leftButtonsContainer.append(pager);
            },
            _processButtons: function () {
                var options = this.options, buttonsOptions = options.buttons, defaultButtons = this._defaultButtonsConfiguration;
                if (!buttonsOptions || !buttonsOptions.length || buttonsOptions.length <= 0) {
                    if (options.index === 0) {
                        buttonsOptions = defaultButtons.first;
                    } else if (options.index + 1 === options.totalSteps) {
                        buttonsOptions = defaultButtons.last;
                    } else {
                        buttonsOptions = defaultButtons.middle;
                    }
                }
                this.options.buttons = buttonsOptions.map(proxy(this._iterateButton, this));
            },
            _render: function () {
                this.element = $('<div>').addClass(wizardClasses.wizardStep);
                if (this.options.className) {
                    this.element.addClass(this.options.className);
                }
                this._ariaAttributes();
                if (!this.options.selected) {
                    this.element.addClass(HIDDEN);
                    this.element.attr(ARIA_HIDDEN, true);
                }
                if (this.options.actionBar) {
                    this._buttonsContainer();
                }
                if (this.options.form) {
                    this._form();
                } else {
                    this._content();
                }
            }
        });
        var Wizard = Widget.extend({
            init: function (element, options) {
                var that = this;
                options = options || {};
                Widget.fn.init.call(that, element, options);
                that._wrapper();
                that._createSteps();
                that._stepper();
                that._attachEvents();
            },
            options: {
                name: 'Wizard',
                contentPosition: BOTTOM,
                actionBar: true,
                pager: true,
                loadOnDemand: false,
                reloadOnSelect: false,
                validateForms: true,
                stepper: {},
                steps: [],
                messages: {
                    reset: 'Reset',
                    previous: 'Previous',
                    next: 'Next',
                    done: 'Done',
                    step: 'Step',
                    of: 'of'
                }
            },
            events: [
                ACTIVATE,
                SELECT,
                RESET,
                DONE,
                ERROR,
                CONTENTLOAD,
                FORM_VALIDATE_FAILED
            ],
            destroy: function () {
                var that = this;
                Widget.fn.destroy.call(that.stepper);
                Widget.fn.destroy.call(that);
                that.wrapper.off(WIZARD);
            },
            activeStep: function () {
                return this.currentStep;
            },
            enableStep: function (stepIndex, value) {
                var that = this, targetStep;
                if (stepIndex === undefined || stepIndex === null || isNaN(stepIndex) || stepIndex >= that._steps.length || stepIndex < 0) {
                    return;
                }
                stepIndex = Number(stepIndex);
                targetStep = that._steps[stepIndex];
                if (targetStep.options.enabled === value) {
                    return;
                } else {
                    targetStep.options.enabled = value;
                    that.stepper.steps()[stepIndex].enable(value);
                }
            },
            insertAt: function (index, stepOptions) {
                var steps = this._steps, numberOfSteps = steps.length, step, stepperStepOptions, alteredStepIndex, alteredStep, iterateStep = function (step, i) {
                        if (i >= index) {
                            step.options.index += 1;
                        }
                        step.options.totalSteps += 1;
                        step.element.find(DOT + wizardClasses.wizardPager).remove();
                        step._pager();
                    };
                if (index === null || index === undefined || isNaN(index) || index < 0 || index > numberOfSteps) {
                    return;
                }
                if (!stepOptions) {
                    return;
                }
                stepperStepOptions = this._mapStepForStepper(stepOptions);
                this.stepper.insertAt(index, stepperStepOptions);
                stepOptions.totalSteps = numberOfSteps + 1;
                stepOptions.messages = this.options.messages;
                stepOptions.index = index;
                stepOptions.formTag = this.wrapper.is('form') ? 'div' : 'form';
                if (this.options.pager === false && stepOptions.pager !== true) {
                    stepOptions.pager = false;
                }
                step = new Step(stepOptions);
                steps.forEach(iterateStep);
                steps.splice(index, 0, step);
                if (index === 0 || index === numberOfSteps) {
                    alteredStepIndex = index === 0 ? 1 : numberOfSteps - 1;
                    alteredStep = steps[alteredStepIndex];
                    alteredStep.resetButtons();
                }
                this._insertStepElementAtIndex(index, step.element);
            },
            next: function () {
                var that = this, stepsLength = that._steps.length, currentStepIndex = that.currentStep.options.index;
                if (currentStepIndex + 1 === stepsLength) {
                    return;
                } else if (!that.steps()[currentStepIndex + 1].options.enabled) {
                    return;
                } else {
                    that._select(currentStepIndex + 1);
                    that._selectStepper(currentStepIndex + 1);
                }
            },
            previous: function () {
                var that = this, currentStepIndex = that.currentStep.options.index;
                if (currentStepIndex === 0) {
                    return;
                } else if (!that.steps()[currentStepIndex - 1].options.enabled) {
                    return;
                } else {
                    that._select(currentStepIndex - 1);
                    that._selectStepper(currentStepIndex - 1);
                }
            },
            removeAt: function (index) {
                var steps = this._steps, numberOfSteps = steps.length, removedStep, newSelectedStepIndex, alteredStepIndex, alteredStep, i, step;
                if (index === null || index === undefined || isNaN(index) || index < 0 || index > numberOfSteps || numberOfSteps === 1) {
                    return;
                }
                this.stepper.removeAt(index);
                removedStep = steps.splice(index, 1)[0];
                if (removedStep === this.selectedStep) {
                    newSelectedStepIndex = index > 0 ? index - 1 : 0;
                    this.selectedStep = steps[newSelectedStepIndex];
                }
                for (i = 0; i < numberOfSteps - 1; i += 1) {
                    step = steps[i];
                    step.options.index = i;
                    step.options.totalSteps = numberOfSteps - 1;
                    step.element.find(DOT + wizardClasses.wizardPager).remove();
                    step._pager();
                }
                if (index === 0 || index === numberOfSteps - 2) {
                    alteredStepIndex = index === 0 ? 0 : numberOfSteps - 2;
                    alteredStep = steps[alteredStepIndex];
                    alteredStep.resetButtons();
                }
            },
            select: function (stepIndex) {
                var that = this, stepper = that.stepper, targetStep;
                if (stepIndex === undefined || stepIndex === null || isNaN(stepIndex) || stepIndex >= that._steps.length || stepIndex < 0) {
                    return;
                }
                stepIndex = Number(stepIndex);
                targetStep = that._steps[stepIndex];
                if (!targetStep.options.enabled) {
                    return;
                }
                that._select(stepIndex);
                if (stepper.options.linear) {
                    stepper.setOptions({ linear: false });
                    that._selectStepper(stepIndex);
                    stepper.setOptions({ linear: true });
                } else {
                    that._selectStepper(stepIndex);
                }
            },
            steps: function () {
                return this._steps;
            },
            _attachEvents: function () {
                var that = this;
                that.stepper.bind(SELECT, proxy(that._stepperSelectHandler, that));
                that.wrapper.on(CLICK + WIZARD, '[' + DATA_WIZARD_PREFIX + RESET + ']', proxy(that._resetClickHandler, that)).on(CLICK + WIZARD, '[' + DATA_WIZARD_PREFIX + PREVIOUS + ']', proxy(that._previousClickHandler, that)).on(CLICK + WIZARD, '[' + DATA_WIZARD_PREFIX + NEXT + ']', proxy(that._nextClickHandler, that));
                if (that.wrapper.is('form')) {
                    that.wrapper.on(SUBMIT + WIZARD, proxy(that._doneHandler, that));
                } else {
                    that.wrapper.on(CLICK + WIZARD, '[' + DATA_WIZARD_PREFIX + DONE + ']', proxy(that._doneHandler, that));
                }
            },
            _changeStep: function (step) {
                var steps = this.wrapper.find(DOT + wizardClasses.wizardStep);
                this.currentStep = step;
                steps.addClass(HIDDEN);
                steps.attr(ARIA_HIDDEN, true);
                steps.attr(ARIA_EXPANDED, false);
                step.element.removeClass(HIDDEN);
                step.element.removeAttr(ARIA_HIDDEN);
                step.element.attr(ARIA_EXPANDED, true);
            },
            _createStep: function (options, index, stepsFromMarkup, total) {
                var wrapper = this.wrapper, stepsFromMarkupTitles = this.wrapper.children('ol, ul').children('li');
                if (typeof options === 'string') {
                    options = { title: options };
                }
                options.totalSteps = total;
                options.messages = this.options.messages;
                options.index = index;
                options.formTag = this.wrapper.is('form') ? 'div' : 'form';
                if (index === 0) {
                    options.selected = true;
                }
                if (this.options.actionBar === false) {
                    options.actionBar = false;
                }
                if (stepsFromMarkup.length > 0 && stepsFromMarkup[index]) {
                    options.markupContainer = $(stepsFromMarkup[index]);
                    if (!options.title) {
                        options.title = stepsFromMarkupTitles[index] ? stepsFromMarkupTitles[index].textContent : (index + 1).toString();
                        if (!this.options.steps) {
                            this.options.steps = [];
                        }
                    }
                }
                if (wrapper.attr(ID)) {
                    options.wizardId = wrapper.attr(ID);
                }
                if (this.options.pager === false && options.pager !== true) {
                    options.pager = false;
                }
                this.options.steps[index] = extend(true, {}, options);
                return new Step(options);
            },
            _createSteps: function () {
                var that = this, wrapper = that.wrapper, stepsOptions = that.options.steps, stepsFromMarkup = wrapper.children('div'), stepsContainer, i, stepOptions, step;
                stepsContainer = $('<div>').addClass(wizardClasses.wizardStepsContainer);
                that._steps = [];
                if (!stepsOptions || stepsOptions.length === 0) {
                    stepsOptions = [];
                    for (i = 0; i < stepsFromMarkup.length; i += 1) {
                        stepsOptions.push({});
                    }
                }
                for (i = 0; i < stepsOptions.length; i += 1) {
                    stepOptions = stepsOptions[i];
                    step = that._createStep(stepOptions, i, stepsFromMarkup, stepsOptions.length);
                    if (stepOptions.contentUrl && (i === 0 || !that.options.loadOnDemand)) {
                        kendo.ui.progress(that.wrapper, true);
                        step._ajaxRequest(that);
                    }
                    stepsContainer.append(step.element);
                    that._steps.push(step);
                }
                wrapper.children('ol, ul').remove();
                wrapper.empty();
                wrapper.append(stepsContainer);
                that._refreshEditorWidgets();
                that.currentStep = that._steps[0];
            },
            _doneHandler: function (e) {
                var steps = this._steps, currentStep = this.currentStep, forms = [], form, i;
                if (this.options.validateForms && !!currentStep.form && !currentStep.form.validator.validate()) {
                    e.preventDefault();
                    this.trigger(FORM_VALIDATE_FAILED, {
                        sender: this,
                        step: currentStep,
                        form: currentStep.form
                    });
                    return;
                }
                for (i = 0; i < steps.length; i += 1) {
                    form = steps[i].form;
                    if (form) {
                        forms.push(form);
                    }
                }
                this.trigger(DONE, {
                    sender: this,
                    forms: forms,
                    originalEvent: e,
                    button: $(e.target).getKendoButton()
                });
            },
            _insertStepElementAtIndex: function (index, stepElement) {
                var stepsContainer = this.wrapper.find(DOT + wizardClasses.wizardStepsContainer);
                if (index === 0) {
                    stepsContainer.prepend(stepElement);
                } else {
                    stepsContainer.find(DOT + wizardClasses.wizardStep + ':nth-child(' + index + ')').after(stepElement);
                }
            },
            _isEmpty: function (element) {
                return !$.trim(element.html());
            },
            _mapStepForStepper: function (step) {
                var stepperStep = extend(true, {}, step);
                stepperStep.label = stepperStep.title;
                delete stepperStep.title;
                delete stepperStep.buttons;
                delete stepperStep.pager;
                delete stepperStep.content;
                delete stepperStep.contentUrl;
                delete stepperStep.contentId;
                return stepperStep;
            },
            _select: function (index) {
                var targetStep = this._steps[index], options = this.options;
                if (targetStep.options.contentUrl && (options.reloadOnSelect || options.loadOnDemand && this._isEmpty(targetStep.element.find(DOT + wizardClasses.wizardContent)))) {
                    this.ajaxLoad = true;
                    kendo.ui.progress(this.wrapper, true);
                    targetStep._ajaxRequest(this, true);
                } else {
                    this._changeStep(targetStep);
                }
            },
            _nextClickHandler: function (e) {
                var that = this, steps = that._steps, numberOfSteps = that._steps.length, currentStep = that.currentStep, currentStepIndex = currentStep.options.index, button = $(e.target).getKendoButton(), targetStep = steps[currentStepIndex + 1];
                if (numberOfSteps === currentStepIndex + 1 || !targetStep.options.enabled) {
                    return;
                }
                if (that.options.validateForms && !!currentStep.form && !currentStep.form.validator.validate()) {
                    that.trigger(FORM_VALIDATE_FAILED, {
                        sender: that,
                        step: currentStep,
                        form: currentStep.form
                    });
                    return;
                }
                if (!that.trigger(SELECT, {
                        sender: that,
                        originalEvent: e.originalEvent,
                        step: targetStep,
                        button: button
                    })) {
                    that._select(currentStepIndex + 1);
                    that._selectStepper(currentStepIndex + 1);
                    if (!that.ajaxLoad) {
                        that.trigger(ACTIVATE, {
                            sender: that,
                            step: targetStep
                        });
                    }
                    that.ajaxLoad = false;
                }
            },
            _previousClickHandler: function (e) {
                var that = this, steps = that._steps, currentStep = that.currentStep, currentStepIndex = currentStep.options.index, button = $(e.target).getKendoButton(), targetStep = steps[currentStepIndex - 1];
                if (currentStepIndex === 0 || !targetStep.options.enabled) {
                    return;
                }
                if (that.options.validateForms && !!currentStep.form && !currentStep.form.validator.validate()) {
                    that.trigger(FORM_VALIDATE_FAILED, {
                        sender: that,
                        step: currentStep,
                        form: currentStep.form
                    });
                    return;
                }
                if (!that.trigger(SELECT, {
                        sender: that,
                        originalEvent: e.originalEvent,
                        step: targetStep,
                        button: button
                    })) {
                    that._select(currentStepIndex - 1);
                    that._selectStepper(currentStepIndex - 1);
                    if (!that.ajaxLoad) {
                        that.trigger(ACTIVATE, {
                            sender: that,
                            step: targetStep
                        });
                    }
                    that.ajaxLoad = false;
                }
            },
            _refreshEditorWidgets: function () {
                var editorElements = this.wrapper.find('[data-role=\'editor\']'), i, element;
                for (i = 0; i < editorElements.length; i += 1) {
                    element = $(editorElements[i]);
                    element.getKendoEditor().refresh();
                }
            },
            _resetClickHandler: function (e) {
                this.trigger(RESET, {
                    sender: this,
                    originalEvent: e,
                    button: $(e.target).getKendoButton()
                });
            },
            _selectStepper: function (index) {
                var stepper = this.stepper, targetStep = stepper.steps()[index], targetLink = targetStep.element.find(DOT + STEPPER_STEP_LINK);
                stepper.select(index);
                stepper.wrapper.find(DOT + STEPPER_STEP_LINK).attr(ARIA_SELECTED, false);
                targetLink.attr(ARIA_SELECTED, true).focus();
            },
            _stepper: function () {
                var wrapper = this.wrapper, stepperElement = $('<nav>').prependTo(wrapper), options = this.options, stepperOptions = options.stepper, stepsOptions = options.steps.map(this._mapStepForStepper);
                stepperOptions.steps = stepsOptions;
                stepperOptions.orientation = options.contentPosition === BOTTOM ? HORIZONTAL : VERTICAL;
                stepperOptions.selectOnFocus = true;
                stepperOptions.kendoKeydown = function (e) {
                    if (e.keyCode === kendo.keys.TAB) {
                        e.preventKendoKeydown = true;
                    }
                };
                this.stepper = stepperElement.kendoStepper(stepperOptions).getKendoStepper();
                this._stepperAriaAttributes();
            },
            _stepperAriaAttributes: function () {
                var stepper = this.stepper, wrapperId = this.wrapper.attr(ID) || 'wizard', stepperSteps = stepper.steps(), selected = false, step, i;
                if (!stepperSteps) {
                    return;
                }
                for (i = 0; i < stepperSteps.length; i += 1) {
                    if (i === 0) {
                        selected = true;
                    }
                    step = stepperSteps[i];
                    step.element.find(DOT + STEPPER_STEP_LINK).attr(ROLE, 'tab').attr(ARIA_CONTROLS, wrapperId + DASH + i).attr(ARIA_SELECTED, selected);
                }
            },
            _stepperSelectHandler: function (e) {
                var that = this, stepper = e.sender, stepperStep = e.step, stepIndex = stepperStep.getIndex(), wizardSteps = that._steps, step = wizardSteps[stepIndex], currentStep = that.currentStep;
                if (that.options.validateForms && !!currentStep.form && !currentStep.form.validator.validate()) {
                    e.preventDefault();
                    that.trigger(FORM_VALIDATE_FAILED, {
                        sender: that,
                        step: currentStep,
                        form: currentStep.form
                    });
                    return;
                }
                if (!that.trigger(SELECT, {
                        sender: that,
                        originalEvent: e.originalEvent,
                        step: step,
                        stepper: stepper
                    })) {
                    that._select(stepIndex);
                    stepper.wrapper.find(DOT + STEPPER_STEP_LINK).attr(ARIA_SELECTED, false);
                    stepperStep.element.find(DOT + STEPPER_STEP_LINK).attr(ARIA_SELECTED, true);
                    if (!that.ajaxLoad) {
                        that.trigger(ACTIVATE, {
                            sender: that,
                            step: step
                        });
                    }
                    that.ajaxLoad = false;
                } else {
                    e.preventDefault();
                }
            },
            _triggerActivate: function (step) {
                this._changeStep(step);
                this.trigger(ACTIVATE, {
                    sender: this,
                    step: step
                });
            },
            _triggerError: function (xhr, status, step) {
                kendo.ui.progress(this.wrapper, false);
                this.trigger(ERROR, {
                    sender: this,
                    xhr: xhr,
                    status: status,
                    step: step
                });
            },
            _triggerContentLoad: function (step) {
                kendo.ui.progress(this.wrapper, false);
                this.trigger(CONTENTLOAD, {
                    sender: this,
                    step: step
                });
            },
            _wrapper: function () {
                var that = this, element = that.element, contentPosition = that.options.contentPosition;
                that.wrapper = element;
                that.wrapper.addClass(wizardClasses.wizard);
                that.wrapper.attr(ROLE, 'tablist');
                if (contentPosition === RIGHT) {
                    that.wrapper.addClass(wizardClasses.verticalWizard + SPACE + wizardClasses.rightWizard);
                } else if (contentPosition === LEFT) {
                    that.wrapper.addClass(wizardClasses.verticalWizard + SPACE + wizardClasses.leftWizard);
                } else {
                    that.wrapper.addClass(wizardClasses.horizontalWizard);
                }
            }
        });
        kendo.wizard = { Step: Step };
        kendo.ui.plugin(Wizard);
    }(window.kendo.jQuery));
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
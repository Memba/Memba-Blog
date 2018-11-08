/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser:true */
/* globals define: false, require: false */

(function (f, define) {
    'use strict';
    define([
        '../vendor/kendo/cultures/kendo.culture.fr-FR.js',
        '../vendor/kendo/messages/kendo.messages.fr-FR.js',
        '../messages/widgets.fr.es6',
        '../messages/tools.fr.es6',
        '../messages/dialogs.fr.es6'
    ], f);
})(function () {

    'use strict';

    (function () {
        var app = window.app = window.app || {};
        app.cultures = app.cultures || {};
        app.cultures.fr = require('../../../webapp/locales/fr.json');
        window.kendo.culture('fr-FR');
    }());

    return window.app;

}, typeof define === 'function' && define.amd ? define : function (_, f) { 'use strict'; f(); });

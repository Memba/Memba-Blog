/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser:true */
/* globals define: false */

(function(f, define){
    define(['../vendor/kendo/cultures/kendo.culture.fr-FR.js', '../vendor/kendo/messages/kendo.messages.fr-FR.js'], f);
})(function() {

    'use strict';

    (function () {
        var app = window.app || {};
        app.cultures = app.cultures || {};
        app.cultures['fr'] = require('../../webapp/locales/fr.json');
    }());

    return window.app;

}, typeof define === 'function' && define.amd ? define : function(_, f){ 'use strict'; f(); });

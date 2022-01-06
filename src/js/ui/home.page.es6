/**
 * Copyright (c) 2013-2021 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-extraneous-dependencies, import/no-unresolved
// import $ from 'jquery';
import $ from 'jquery';
import AppController from '../app/app.controller.es6';
import app from '../common/window.global.es6';

// Imported shared features
import initializers from '../app/app.initializers.es6';
import appbar from './ui.appbar.es6';
import drawer from './ui.drawer.es6';
import footer from './ui.footer.es6';
import reveal from './ui.reveal.es6';

// Page features
const page = {
    /**
     * Name
     */
    _name: 'page',

    /**
     * View
     */
    VIEW: {},

    /**
     * Reveal page
     * @method
     */
    do() {},
};

// Create the viewModel with all features
app.viewModel = new AppController([
    initializers, // TODO split into them and locale
    appbar,
    drawer,
    footer,
    reveal,
    page,
]);

// Run the page
$(() => {
    app.viewModel.ready();
});

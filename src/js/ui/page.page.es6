/**
 * Copyright (c) 2013-2021 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-extraneous-dependencies, import/no-unresolved
import $ from 'jquery';
import 'kendo.validator'; // For page forms
import AppController from '../app/app.controller.es6';
import app from '../common/window.global.es6';
// import Logger from '../common/window.logger.es6';

// Import page styles
// import '../../styles/ui/page.page.scss';

// Imported shared features
import initializers from '../app/app.initializers.es6';
import appbar from './ui.appbar.es6';
import drawer from './ui.drawer.es6';
import footer from './ui.footer.es6';
import reveal from './ui.reveal.es6';

// const logger = new Logger('page.page');

// Page features
// const page = { _name: 'page', };

// Create the viewModel with all features
app.viewModel = new AppController([
    initializers, // TODO split into theme and locale
    appbar,
    drawer,
    footer,
    reveal,
    // page,
]);

// Run the page
$(() => {
    app.viewModel.ready();
});

/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// Load common styles
import '../../styles/themes/bootstrap.custom.less';
import '../../styles/vendor/kendo/web/kendo.common.less';
import '../../styles/fonts/kidoju.less';
import '../../styles/ui/app.common.less';
import '../../styles/dialogs/kidoju.tools.less'; // <-- Consider merging with app.page.common.less

// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-unresolved
import $ from 'jquery';
// Bootstrap files for navbar (toggle button)
import '../vendor/bootstrap/collapse';
import '../vendor/bootstrap/dropdown';
// Kendo UI files for footer
import 'kendo.binder';
import 'kendo.dropdownlist';
// TODO ---------------------> Review app.* files
import './app.i18n.es6';
import './app.logger.es6';
import './app.theme.es6';
import './app.navbar.es6';
import viewModel from './app.viewmodel.es6';
import CONSTANTS from '../common/window.constants.es6';
import Logger from '../common/window.logger.es6';

const { i18n } = window.app;
const { bind, mobile, ui } = window.kendo;
const logger = new Logger('app.common');

/**
 * Wait until document is ready to initialize UI
 */
$(document).one(CONSTANTS.LOADED, () => {
    // LOADED occurs after document ready event

    // Init using kendo ui and kendo mobile ui (scollers)
    // kendo.init('body', kendo.ui, kendo.mobile.ui);
    bind('footer', viewModel, ui, mobile.ui);

    // Log page readiness
    logger.debug({
        message: `common elements initialized in ${i18n.locale()}`,
        method: CONSTANTS.LOADED
    });
});

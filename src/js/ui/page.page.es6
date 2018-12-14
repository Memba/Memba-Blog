/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-unresolved
import $ from 'jquery';
import 'kendo.validator';
import '../app/app.common.es6';
import i18n from '../app/app.i18n.es6';
import Logger from '../common/window.logger.es6';

// Import page styles
import '../../styles/ui/page.page.less';

const logger = new Logger('page.page');

/**
 * Wait for document to be ready to initialize UI
 * Note: no need to use the i18n.loaded event here
 */
$(() => {
    // Log page readiness
    logger.info({
        message: `site page initialized in ${i18n.locale()}`,
        method: 'document.ready'
    });
});

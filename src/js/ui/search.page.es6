/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-unresolved
import $ from 'jquery';
// import assert from '../common/window.assert.es6';
import Logger from '../common/window.logger.es6';

// TODO Review app.* files
import '../app.logger';
import '../app.i18n';
import '../app/app.common';
import '../app/app.menu.es6';

import '../../styles/page.search.less';

const { i18n } = window.app;
const logger = new Logger('page.search');

/**
 * Wait for document to be ready to initialize UI
 * Note: no need to use the i18n.loaded event here
 */
$(() => {
    // Log page readiness
    logger.info({
        message: `search page initialized in ${i18n.locale()}`,
        method: 'document.ready'
    });
});

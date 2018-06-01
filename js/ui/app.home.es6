/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-unresolved
import $ from 'jquery';
// import '../common/window.assert.es6';
import '../common/window.logger.es6';
import '../app.logger';
import '../app.i18n';
import '../app.common';
import '../app.menu';

import '../../styles/app.page.home.less';

const {
    app: { i18n },
    Logger
} = window;
const logger = new Logger('app.home');

$(() => {
    // Log page readiness
    logger.info({
        message: `home page initialized in ${i18n.locale()}`,
        method: 'document.ready'
    });
});

/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-unresolved
import $ from 'jquery';
import __ from '../app/app.i18n.es6';
import AppController from '../app/app.controller.es6';
import Logger from '../common/window.logger.es6';

const logger = new Logger('page.home');

/**
 * Controller
 * @class Controller
 * @extends AppController
 */
const Controller = AppController.extend({
    /**
     * init
     * @constructor init
     */
    init() {
        AppController.fn.init.call(this);
        // Wait until document is ready to initialize UI
        this.ready().then(() => {
            logger.info({
                message: `home page initialized in ${__.locale}`,
                method: 'init',
            });
        });
    },
});

/**
 * Initialize page controller
 */
const controller = new Controller();

/**
 * Default export
 */
export default controller;

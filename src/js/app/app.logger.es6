/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-unresolved
import $ from 'jquery';
import assert from '../common/window.assert.es6';
import CONSTANTS from '../common/window.constants.es6';
import Logger from '../common/window.logger.es6';
import config from './app.config.jsx';

/*
 * The following need to be defined in app.config.jsx
 * config.logger.level = <number>
 * config.logger.endPoint = <url>
 * otherwise the plugin won't work
 */

/**
 * The plugin with a single log function
 */
const plugin = {
    log(entry, level) {
        // Note: assert.type discards an entry of type Error, the processing is supposed to be done in windows.Logger
        assert.type(
            CONSTANTS.OBJECT,
            entry,
            assert.format(
                assert.messages.type.default,
                'entry',
                CONSTANTS.OBJECT
            )
        );
        assert.type(
            CONSTANTS.OBJECT,
            Logger.levels[level],
            assert.format(
                assert.messages.type.default,
                'Logger.levels[level]',
                CONSTANTS.OBJECT
            )
        );
        const dfd = $.Deferred();
        if ((config.logger.level || 0) > Logger.levels[level].value) {
            // Return false if the ajax call was not made, considering the logging level
            dfd.resolve(false);
        } else {
            $.ajax({
                type: 'POST',
                url: config.logger.endPoint,
                contentType: 'application/json',
                // dataType: 'json', // <-- do not set the dataType since the response is always empty
                data: JSON.stringify(
                    $.extend(entry, {
                        date: new Date(),
                        level: level.toLowerCase(),
                    })
                ),
            })
                .then(() =>
                    // Return true if the ajax call was successful
                    dfd.resolve(true)
                )
                .catch(dfd.reject);
        }
        return dfd.promise();
    },
};

/**
 * Register plug-in with Logger
 */
if (config.logger) {
    Logger.register(plugin);
}

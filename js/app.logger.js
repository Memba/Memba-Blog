/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true */
/* globals define: false */

(function(f, define){
    'use strict';
    define(['./vendor/logentries/le.js'], f);
})(function(le) {

    'use strict';

    (function (undefined) {

        var LE = window.LE || le, // We need `le` for webpack and `window.LE` for grunt mocha
            app = window.app = window.app || {},
            logger = app.logger = app.logger || {
                token: 'e78bac0b-377a-49e2-ad91-20bb4ec7cedc', // Our localhost value (basically junk)
                level: 0 //log evenrything
            },
            FUNCTION = 'function',
            LABEL = {
                DEBUG: '[DEBUG]',
                INFO: '[INFO] ',
                WARN: '[WARN] ',
                ERROR: '[ERROR]',
                CRIT: '[CRIT] '
            },
            LEVEL = {
                //See https://github.com/logentries/le_node#log-levels
                DEBUG: 1,
                INFO: 2,
                WARN: 4,
                ERROR: 5,
                CRIT: 6
            },
            EQUAL = ' = ',
            FIRST = '  ',
            SEPARATOR = '  |  ';

        // Intialize LogEntries
        // see https://logentries.com/doc/javascript/
        // see https://github.com/logentries/le_js
        LE.init({
            token: logger.token,
            ssl: true,
            /**
             * Important: catchall: true is equivalent to setting window.onerror
             * See https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
             */
            catchall: false, //we have our own global handler below
            trace: false, //not as good as our own trace
            page_info: 'never',
            print: false //let's print to the console ourselves
        });

        /**
         * Process a log entry with additional information
         * @param entry
         */
        function process(entry) {
            if (typeof entry === 'string') {
                entry = { message: entry };
            } else if (entry instanceof Error) {
                entry = { error: entry };
            } else if (Object.prototype.toString.call(entry) !== '[object Object]') {
                entry = { data: entry };
            }
            if (entry.error instanceof Error) {
                //We need to do that because JSON.stringify(new Error('Oops)) === {} and is not sent to logentries
                entry.message = entry.error.message;
                if (entry.error.originalError instanceof Error) {
                    entry.originalError = entry.error.originalError;
                    delete entry.error.originalError;
                    entry.originalMessage = entry.originalError.message;
                    entry.stack = entry.originalError.stack;
                } else {
                    entry.stack = entry.error.stack;
                }
            }
            //If there is a hidden input field named `trace` on the page, read it
            var input = document.getElementById('trace');
            if (input instanceof HTMLInputElement) {
                entry.trace = input.value;
            }
            return entry;
        }

        /**
         * Print a log entry to the console
         * Note: we have discarded pretty solutions because they do not print well in Webstorm console
         * @param entry
         * @param label
         */
        function print(entry, label) {
            if (app.DEBUG && window.console && typeof window.console.log === FUNCTION) {
                var message = label,
                    first = true;
                if (entry.message) {
                    message += (first ? FIRST : SEPARATOR) + 'message' + EQUAL + entry.message;
                    first = false;
                }
                if (entry.originalMessage) {
                    message += (first ? FIRST : SEPARATOR) + 'originalMessage' + EQUAL + entry.originalMessage;
                    first = false;
                }
                if (entry.module) {
                    message += (first ? FIRST : SEPARATOR) + 'module' + EQUAL + entry.module;
                    first = false;
                }
                if (entry.method) {
                    message += (first ? FIRST : SEPARATOR) + 'method' + EQUAL + entry.method;
                    first = false;
                }
                if (entry.stack) {
                    message += (first ? FIRST : SEPARATOR) + 'stack' + EQUAL + entry.stack;
                    first = false;
                }
                if (entry.data) {
                    try {
                        message += (first ? FIRST : SEPARATOR) + 'data' + EQUAL + JSON.stringify(entry.data);
                    } catch(exception) {
                        if(typeof entry.data.toString === FUNCTION) {
                            message += (first ? FIRST : SEPARATOR) + 'data' + EQUAL + entry.data.toString();
                        }
                    }
                }
                if (entry.trace) {
                    message += (first ? FIRST : SEPARATOR) + 'trace' + EQUAL + entry.trace;
                    first = false;
                }
                window.console.log(message);
                if (entry.error instanceof Error) {
                    if (typeof window.console.error === FUNCTION) {
                        window.console.error(entry.error);
                    } else if (typeof window.console.dir === FUNCTION) {
                        window.console.dir(entry.error);
                    }
                }
                if (entry.originalError instanceof Error) {
                    if (typeof window.console.error === FUNCTION) {
                        window.console.error(entry.originalError);
                    } else if (typeof window.console.dir === FUNCTION) {
                        window.console.dir(entry.originalError);
                    }
                }
            }
        }

        /**
         * Log a debug entry
         * @param entry
         */
        logger.debug = function(entry) {
            if (logger.level > LEVEL.DEBUG) {
                return false;
            }
            entry = process(entry);
            print(entry, LABEL.DEBUG);
            setTimeout(function() {
                //Note: LE has no debug logging as of June 2015
                LE.log(entry);
            }, 0);
            return true;
        };

        /**
         * Log an info entry
         * @param entry
         */
        logger.info = function(entry) {
            if (logger.level > LEVEL.INFO) {
                return false;
            }
            entry = process(entry);
            print(entry, LABEL.INFO);
            setTimeout(function() {
                LE.info(entry);
            }, 0);
            return true;
        };

        /**
         * Log a warn entry
         * @param entry
         */
        logger.warn = function(entry) {
            if (logger.level > LEVEL.WARN) {
                return false;
            }
            entry = process(entry);
            print(entry, LABEL.WARN);
            setTimeout(function() {
                LE.warn(entry);
            }, 0);
            return true;
        };

        /**
         * Log an error entry (the application can survive an error entry)
         * @param entry
         */
        logger.error = function(entry) {
            if (logger.level > LEVEL.ERROR) {
                return false;
            }
            entry = process(entry);
            print(entry, LABEL.ERROR);
            setTimeout(function() {
                LE.error(entry);
            }, 0);
            return true;
        };

        /**
         * Log a critical entry (the application cannot survive a critical entry)
         * @param entry
         */
        logger.critical = function(entry) {
            if (logger.level > LEVEL.CRIT) {
                return false;
            }
            entry = process(entry);
            print(entry, LABEL.CRIT);
            setTimeout(function() {
                //Note: LE has no critical logging as of June 2015
                LE.error(entry);
            }, 0);
            return true;
        };

        /**
         * Global error handler
         * @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
         * @type {Function|*}
         */
        //var onError = window.onerror;
        window.onerror = function(msg, url, line) {
            // Format log entry
            var message = msg + ' at ' + url + ' (line ' + line + ')',
                entry = {
                    message: message,
                    module: 'app.logger',
                    method: 'window.onerror',
                    error: new Error(message)
                };
            // Print to console and log to logentries
            logger.critical(entry);
            //if (typeof onError === FUNCTION) {
                // Call previous handler
                // by initializing LE with catchall:false we disable logentries global error handler and avoid double logging
                //return onError(message, url, line);
            //}
            // Otherwise just let default handler run
            return false;
        };

    }());

    return window.app;

}, typeof define === 'function' && define.amd ? define : function(_, f){ 'use strict'; f(); });

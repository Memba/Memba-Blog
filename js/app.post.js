/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true, jquery: true */
/* globals define: false, require: false */

require('../styles/app.page.post.less');

(function (f, define) {
    'use strict';
    define([
        './window.assert',
        './window.logger',
        './app.logger',
        './app.i18n',
        './app.common',
        './app.menu'
    ], f);
})(function () {

    'use strict';

    (function ($, undefined) {

        var kendo = window.kendo;
        var app = window.app;
        var assert = window.assert;
        var logger = new window.Logger('app.post');
        var i18n = app.i18n;
        var CLICK = 'click';
        var POST_WRAPPER_SELECTOR = '#post-wrapper';
        var SOCIAL_SELECTOR = '.social';
        var COMMAND = {
            FACEBOOK: 'facebook',
            GOOGLE: 'google',
            LINKEDIN: 'linkedin',
            PINTEREST: 'pinterest',
            TWITTER: 'twitter',
            EMAIL: 'email'
        };

        /**
         * Initialize social buttons
         * @see http://www.sharelinkgenerator.com/
         * Also check Kidoju.WebApp -> app.summary.js
         */
        function initSocialButtons() {

            /* This function's cyclomatic complexity is too high. */
            /* jshint -W074 */

            $(POST_WRAPPER_SELECTOR).find(SOCIAL_SELECTOR)
                .on(CLICK, function (e) {
                    assert.instanceof($.Event, e, kendo.format(assert.messages.instanceof.default, 'e', 'default'));
                    assert.instanceof(window.HTMLAnchorElement, e.currentTarget, kendo.format(assert.messages.instanceof.default, 'e.currentTarget', 'window.HTMLAnchorElement'));
                    var sharedUrl = window.encodeURIComponent(window.location.href);
                    var command = $(e.currentTarget).attr(kendo.attr('command'));
                    var openUrl;
                    var height = 600;
                    var width = 800;
                    switch (command) {
                        case COMMAND.FACEBOOK:
                            // We shall use the feed dialog
                            // @ see https://developers.facebook.com/docs/sharing/web
                            // @ see https://developers.facebook.com/docs/sharing/reference/feed-dialog/v2.5
                            // @see https://developers.facebook.com/tools/debug/ <---------------- DEBUG
                            // openUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + sharedUrl;
                            openUrl = 'https://www.facebook.com/dialog/feed?app_id=' + app.facebook.clientID +
                                '&display=popup&caption=' + 'coucou' + '&link=' + sharedUrl + '&redirect_uri=' + sharedUrl; // + picture + name + description + ref
                            break;
                        case COMMAND.GOOGLE:
                            // @see https://developers.google.com/+/web/share/
                            openUrl = 'https://plus.google.com/share?url=' + sharedUrl;
                            break;
                        case COMMAND.LINKEDIN:
                            openUrl = 'https://www.linkedin.com/shareArticle?mini=true&url=http%3A//localhost%3A3000/fr/s/566ea23acf5049e04b81702e&title=My%20Title&summary=Beat%20me%20if%20you%20can!&source=Kidoju';
                            break;
                        case COMMAND.PINTEREST:
                            openUrl = 'https://pinterest.com/pin/create/button/?url=Kidoju&media=http%3A//localhost%3A3000/fr/s/566ea23acf5049e04b81702e&description=Can%20you%20beat%20me%20at%20http%3A//www.kidoju.com';
                            break;
                        case COMMAND.TWITTER:
                            openUrl = 'https://twitter.com/home?' +
                                'status=' + 'Can%20you%20beat%20me%20at%' + sharedUrl;
                            break;
                        case COMMAND.EMAIL:
                            // TODO add icon in summary.ejs
                            openUrl = 'mailto:fastlec@memba.org?&subject=Shared Link&body=Hey%20loojk%20at%20that';
                            break;
                    }
                    if (socialWindow === null || socialWindow.closed || socialUrl !== openUrl) {
                        socialWindow = window.open(openUrl, 'social', kendo.format('toolbar=0,height={0},width={1}', height, width));
                    }
                    socialUrl = openUrl;
                    socialWindow.focus();
                });

            /* jshint +W074 */
        }
        var socialWindow = null;
        var socialUrl;

        $(document).ready(function () {

            initSocialButtons();

            // Log page readiness
            logger.info({
                message: 'post page initialized in ' + i18n.locale(),
                method: '$(document).ready'
            });

        });

    }(window.jQuery));

    return window.app;

}, typeof define === 'function' && define.amd ? define : function (_, f) { 'use strict'; f(); });

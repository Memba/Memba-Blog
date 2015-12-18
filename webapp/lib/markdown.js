/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var util = require('util');
var MarkdownIt = require('markdown-it');
var hljs = require('highlight.js');
var markdown = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: true,
    // See https://github.com/markdown-it/markdown-it#syntax-highlighting
    highlight: function (code, lang) {
        try {
            return hljs.highlight(lang, code).value;
        } catch (err) {
            return hljs.highlightAuto(code).value;
        }
    }
});
// Add videos - @[youtube](dQw4w9WgXcQ)
markdown.use(require('markdown-it-video'));
// Add the .img-responsive class to all images - see https://github.com/markdown-it/markdown-it/blob/master/docs/architecture.md
markdown.renderer.defaults = {
    image: markdown.renderer.rules.image
};
markdown.renderer.rules.image = function (tokens, idx, options, env, slf) {
    tokens[idx].attrPush(['class', 'img-responsive']);
    return markdown.renderer.defaults.image(tokens, idx, options, env, slf);
};
var RX_YML = /^---\n([\s\S]*)\n---/;
var RX_KEYVAL = /([^:\n]+):([^\n]+)/g;
var KEY_BLACKLIST = /[-\s]/g;
var RX_VIDEO = /@\[youtube\]\(([^\(\)]+)\)/i;
var RX_IMAGE = /!\[[^\[\]]+\]\((http[^\(\)]+)\)/i;
var YOUTUBE_IMG = 'http://img.youtube.com/vi/%s/0.jpg'; // @see http://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api

module.exports = {

    /**
     * Render markdown as HTML
     * Note: extract markdown body first -- see below
     * @param body
     * @returns {*}
     */
    render: function (body) {
        return markdown.render(body);
    },

    /**
     * Extract key/value pairs from yml section at the top of content
     * @param content
     * @returns {{title: string, description: string}}
     */
    head: function (content) {
        var yml = {};
        var ymlMatches = content.match(RX_YML);
        if (Array.isArray(ymlMatches) && ymlMatches.length > 1) {
            var keyvalMatches = ymlMatches[1].match(RX_KEYVAL);
            if (Array.isArray(keyvalMatches) && keyvalMatches.length) {
                for (var i = 0; i < keyvalMatches.length; i++) {
                    var keyval = keyvalMatches[i];
                    var pos = keyval.indexOf(':');
                    var key = keyval.substr(0, pos).trim().replace(KEY_BLACKLIST, '_');
                    var val = keyval.substr(pos + 1).trim();
                    yml[key] = val;
                }
            }
        }
        return yml;
    },

    /**
     * Remove yml section from content
     * @param content
     * @returns {*}
     */
    body: function (content) {
        return content.replace(RX_YML, '').trim();
    },

    /**
     * Return first content image
     * @param content
     * @returns {Array.<T>}
     */
    image: function (content) {
        // rx.exec returns null without match
        var video = RX_VIDEO.exec(content);
        if (Array.isArray(video) && video.length === 2) {
            return util.format(YOUTUBE_IMG, video[1]);
        } else {
            var image = RX_IMAGE.exec(content);
            if (Array.isArray(image) && image.length === 2) {
                return image[1];
            }
        }
    }

};


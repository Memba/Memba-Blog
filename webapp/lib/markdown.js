/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var MarkdownIt = require('markdown-it'),
    hljs = require('highlight.js'),
    markdown = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        //See https://github.com/markdown-it/markdown-it#syntax-highlighting
        highlight: function (code, lang) {
            try {
                return hljs.highlight(lang, code).value;
            } catch(err) {
                return hljs.highlightAuto(code).value;
            }
        }
    });

var RX_YML = /^---\n([\s\S]*)\n---/,
    RX_KEYVAL = /([^:\n]+):([^\n]+)/g,
    KEY_BLACKLIST = /[-\s]/g;


module.exports = {

    /**
     * Render markdown as HTML
     * Note: extract markdown body first -- see below
     * @param body
     * @returns {*}
     */
    render: function(body) {
        return markdown.render(body);
    },

    /**
     * Extract key/value pairs from yml section at the top of content
     * @param content
     * @returns {{title: string, description: string}}
     */
    head: function(content) {
        var yml = {},
            ymlMatches = content.match(RX_YML);
        if (Array.isArray(ymlMatches) && ymlMatches.length > 1) {
            var keyvalMatches = ymlMatches[1].match(RX_KEYVAL);
            if (Array.isArray(keyvalMatches) && keyvalMatches.length) {
                for (var i = 0; i < keyvalMatches.length; i++) {
                    var keyval = keyvalMatches[i],
                        pos = keyval.indexOf(':'),
                        key = keyval.substr(0, pos).trim().replace(KEY_BLACKLIST, '_'),
                        val = keyval.substr(pos + 1).trim();
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
    body: function(content) {
        return content.replace(RX_YML, '').trim();
    }

};


/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var marked = require('marked'),
    hljs = require('highlight.js'),
    renderer = new marked.Renderer();

var RX_YML = /^---\n([\s\S]*)\n---/,
    RX_KEYVAL = /([^:\n]+):([^\n]+)/g,
    KEY_BLACKLIST = /[-\s]/g;

//hack: we need a renderer to add proper pre code classes until markedjs catches up with highlighjs v0.8x
//See https://github.com/chjj/marked/issues/336
renderer.code = function(code, lang) {

    var highlight = this.options.highlight,
        html = highlight(code, lang);

    return '<pre><code' +
        (lang ? ' class="hljs ' + this.options.langPrefix + lang + '"' : ' class="hljs"') +
        '>' +
        html +
        '\n</code></pre>\n';

};

marked.setOptions({
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: function (code, lang) {
        try {
            return hljs.highlight(lang, code).value;
        } catch(err) {
            return hljs.highlightAuto(code).value;
        }
    }
});

module.exports = {

    /**
     * Render markdown as HTML after removing yml
     * Note: clean first
     * @param markdown
     * @returns {*}
     */
    render: function(markdown) {
        return marked(markdown);
    },

    /**
     * Extract key/value pairs from yml at the top of markdown
     * @param markdown
     * @returns {{title: string, description: string}}
     */
    head: function(markdown) {
        var yml = {},
            ymlMatches = markdown.match(RX_YML);
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
     * Clean markdown from yml
     * @param markdown
     * @returns {*}
     */
    body: function(markdown) {
        return markdown.replace(RX_YML, '').trim();
    }

};


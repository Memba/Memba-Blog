/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jslint node: true */
/* jshint node: true */

'use strict';

var marked = require('marked'),
    hljs = require('highlight.js'),
    renderer = new marked.Renderer();

//hack: we need a renderer to add proper pre code classes until markedjs catches up with highlighjs v0.8x
//See https://github.com/chjj/marked/issues/336
renderer.code = function(code, lang) {

    var highlight = this.options.highlight,
        html = highlight(code, lang);

    return '<pre><code'
        + (lang ? ' class="hljs ' + this.options.langPrefix + lang + '"' : ' class="hljs"')
        + '>'
        + html
        + '\n</code></pre>\n';

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
     * Render markdown as HTML
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
    yml: function(markdown) {
        return {
            title: '',
            description: ''
        };
    },

    /**
     * Preprocess a page (adds yml)
     * @param markdown
     * @private
     */
    _page: function(markdown) {

    },

    /**
     * Preprocess a blog post (adds yml)
     * @param markdown
     * @private
     */
    _post: function(markdown) {

    }
};


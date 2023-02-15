/**
 * Kendo UI v2023.1.117 (http://www.telerik.com/kendo-ui)
 * Copyright 2023 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
import "./formatblock.js";

(function($) {

// Imports ================================================================
var kendo = window.kendo,
    extend = $.extend,
    editorNS = kendo.ui.editor,
    dom = editorNS.Dom,
    Command = editorNS.Command,
    Tool = editorNS.Tool,
    BlockFormatter = editorNS.BlockFormatter,
    normalize = dom.normalize,
    RangeUtils = editorNS.RangeUtils,
    registerTool = editorNS.EditorUtils.registerTool;

var ParagraphCommand = Command.extend({
    init: function(options) {
        this.options = options;
        Command.fn.init.call(this, options);
    },

    _insertMarker: function(doc, range) {
        var marker = dom.create(doc, 'a'), container;
        marker.className = "k-marker";

        range.insertNode(marker);

        if (!marker.parentNode) {
            // inserting paragraph in Firefox full body range
            container = range.commonAncestorContainer;
            container.innerHTML = "";
            container.appendChild(marker);
        }

        normalize(marker.parentNode);

        return marker;
    },

    _moveFocus: function(range, candidate) {
        if (dom.isEmpty(candidate)) {
            range.setStartBefore(candidate);
        } else {
            range.selectNodeContents(candidate);

            var focusNode = RangeUtils.textNodes(range)[0];

            if (!focusNode) {
                while (candidate.childNodes.length && !dom.is(candidate.firstChild, "br")) {
                    candidate = candidate.firstChild;
                }

                focusNode = candidate;
            }

            if (dom.isEmpty(focusNode)) {
                range.setStartBefore(focusNode);
            } else {
                if (dom.emptyNode(focusNode)) {
                    focusNode.innerHTML = "\ufeff";
                }
                var startNode = focusNode.firstChild || focusNode;
                if (dom.isDataNode(startNode)) {
                    range.setStart(startNode, 0);
                } else {
                    range.setStartBefore(startNode);
                }
            }
        }
    },

    shouldTrim: function(range) {
        var blocks = 'p,h1,h2,h3,h4,h5,h6'.split(','),
            startInBlock = dom.parentOfType(range.startContainer, blocks),
            endInBlock = dom.parentOfType(range.endContainer, blocks);
        return (startInBlock && !endInBlock) || (!startInBlock && endInBlock);
    },

    _blankAfter: function(node) {
        while (node && (dom.isMarker(node) || dom.stripBom(node.nodeValue) === "")) {
            node = node.nextSibling;
        }

        return !node;
    },

    exec: function() {
        var range = this.getRange(),
            doc = RangeUtils.documentFromRange(range),
            parent, previous, next,
            emptyParagraphContent = editorNS.emptyElementContent,
            paragraph, marker, li, heading, tableNode, rng,
            shouldTrim;

        this.expandImmutablesIn(range);

        shouldTrim = this.shouldTrim(range);

        range.deleteContents();
        marker = this._insertMarker(doc, range);

        dom.stripBomNode(marker.previousSibling);
        dom.stripBomNode(marker.nextSibling);

        li = dom.closestEditableOfType(marker, ['li']);
        heading = dom.closestEditableOfType(marker, 'h1,h2,h3,h4,h5,h6'.split(','));
        tableNode = dom.is(marker.parentNode, 'table') && marker.parentNode;

        if (li) {
            // hitting 'enter' in empty li
            if (dom.emptyNode(li)) {
                paragraph = dom.create(doc, 'p');

                if (dom.next(li)) {
                    rng = range.cloneRange();
                    rng.selectNode(li);

                    RangeUtils.split(rng, li.parentNode);
                }

                var br = $("br", li);
                if (br.length == 1) {
                    br.remove();
                }

                var parentNode = li.parentNode;
                var parentChildrenLength = li.parentNode.children.length;
                var firstChild = parentChildrenLength > 1 && li.childNodes.length == 1 && li.children[0];

                dom.insertAfter(paragraph, parentNode);
                dom.remove(parentChildrenLength == 1 ? li.parentNode : li);

                if (firstChild && firstChild !== marker) {
                    paragraph.appendChild(firstChild);
                    paragraph.appendChild(marker);
                } else {
                    paragraph.innerHTML = emptyParagraphContent;
                }
                next = paragraph;
            }
        } else if (heading && this._blankAfter(marker)) {
            paragraph = this._insertParagraphAfter(heading);
            dom.remove(marker);
            next = paragraph;
        } else if (tableNode) {
            paragraph = this._insertParagraphAfter(tableNode);
            dom.remove(marker);
            next = paragraph;
        }

        if (!next) {
            if (!(li || heading)) {
                new BlockFormatter([{ tags: ['p'] }]).apply([marker]);
            }

            range.selectNode(marker);

            parent = dom.parentOfType(marker, [li ? 'li' : heading ? dom.name(heading) : 'p']);

            RangeUtils.split(range, parent, shouldTrim);

            previous = parent.previousSibling;

            if (dom.is(previous, 'li') && previous.firstChild && !dom.is(previous.firstChild, 'br')) {
                previous = previous.firstChild;
            }

            next = parent.nextSibling;

            this.clean(previous, { links: true });
            this.clean(next, { links: true });

            if (dom.is(next, 'li') && next.firstChild && !dom.is(next.firstChild, 'br')) {
                next = next.firstChild;
            }

            dom.remove(parent);

            // normalize updates the caret display in Gecko
            normalize(previous);
        }

        normalize(next);

        this._moveFocus(range, next);

        range.collapse(true);

        dom.scrollTo(next, true);

        RangeUtils.selectRange(range);
    },

    _insertParagraphAfter: function(node) {
        var range = this.getRange();
        var doc = RangeUtils.documentFromRange(range);
        var emptyElementContent = editorNS.emptyElementContent;
        var paragraph = dom.create(doc, 'p');

        dom.insertAfter(paragraph, node);
        paragraph.innerHTML = emptyElementContent;

        return paragraph;
    },

    clean: function(node, options) {
        var root = node;

        if (node.firstChild && dom.is(node.firstChild, 'br')) {
            dom.remove(node.firstChild);
        }

        if (dom.isDataNode(node) && !node.nodeValue) {
            node = node.parentNode;
        }

        if (node) {
            var siblings = false;
            while (node.firstChild && node.firstChild.nodeType == 1) {
                siblings = siblings || (dom.significantNodes(node.childNodes).length > 1);
                node = node.firstChild;
            }

            if (!dom.isEmpty(node) && node.className != "k-br" && /^\s*$/.test(node.innerHTML) && !siblings) {
                $(root).find(".k-br").remove();
                node.innerHTML = editorNS.emptyElementContent;
            }

            if (options && options.links) {
                while (node != root) {
                    if (dom.is(node, "a") && dom.emptyNode(node)) {
                        dom.unwrap(node);
                        break;
                    }
                    node = node.parentNode;
                }
            }
        }
    }
});

var NewLineCommand = Command.extend({
    init: function(options) {
        this.options = options;
        Command.fn.init.call(this, options);
    },

    exec: function() {
        var range = this.getRange();
        this.expandImmutablesIn(range);

        var br = dom.create(RangeUtils.documentFromRange(range), 'br');
        var node = range.startContainer;
        var filler;
        var browser = kendo.support.browser;
        var oldIE = browser.msie && browser.version < 11;
        var tableNode = dom.is(node, 'table') && node;
        var kbrParent;

        range.deleteContents();
        if (tableNode) {
            dom.insertAfter(br, tableNode);
        } else {
            kbrParent = $(node).closest('.k-br');
            range.insertNode(br);

            if (kbrParent.length) {
                // pressing enter in an k-br node
                dom.unwrap(kbrParent[0]);
            }
        }

        normalize(br.parentNode);

        if (!oldIE && (!br.nextSibling || dom.isWhitespace(br.nextSibling))) {
            // Gecko and WebKit cannot put the caret after only one br.
            if (!!br.nextSibling && dom.isWhitespace(br.nextSibling)) {
                $(br.nextSibling).remove();
            }
            filler = br.cloneNode(true);
            filler.className = 'k-br';
            dom.insertAfter(filler, br);
        }

        range.setStartAfter(br);
        range.collapse(true);

        dom.scrollTo(br.nextSibling || br, true);

        RangeUtils.selectRange(range);
    }
});

extend(editorNS, {
    ParagraphCommand: ParagraphCommand,
    NewLineCommand: NewLineCommand
});

registerTool("insertLineBreak", new Tool({ key: 13, shift: true, command: NewLineCommand }));
registerTool("insertParagraph", new Tool({ key: 13, command: ParagraphCommand }));

})(window.kendo.jQuery);

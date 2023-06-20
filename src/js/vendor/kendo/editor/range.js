/**
 * Kendo UI v2023.1.425 (http://www.telerik.com/kendo-ui)
 * Copyright 2023 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
(function($) {

    // Imports ================================================================
    var kendo = window.kendo,
        Class = kendo.Class,
        extend = $.extend,
        Editor = kendo.ui.editor,
        browser = kendo.support.browser,
        dom = Editor.Dom,
        findNodeIndex = dom.findNodeIndex,
        isDataNode = dom.isDataNode,
        findClosestAncestor = dom.findClosestAncestor,
        getNodeLength = dom.getNodeLength,
        normalize = dom.normalize;

var SelectionUtils = {
    selectionFromWindow: function(window) {
        if (!window) {
            return;
        }

        if (!("getSelection" in window)) {
            return new W3CSelection(window.document);
        }

        return window.getSelection();
    },

    selectionFromRange: function(range) {
        var rangeDocument = RangeUtils.documentFromRange(range);
        return SelectionUtils.selectionFromDocument(rangeDocument);
    },

    selectionFromDocument: function(document) {
        return SelectionUtils.selectionFromWindow(dom.windowFromDocument(document));
    }
};

var W3CRange = Class.extend({
    init: function(doc) {
        $.extend(this, {
            ownerDocument: doc, /* not part of the spec; used when cloning ranges, traversing the dom and creating fragments */
            startContainer: doc,
            endContainer: doc,
            commonAncestorContainer: doc,
            startOffset: 0,
            endOffset: 0,
            collapsed: true
        });
    },

    // Positioning Methods
    setStart: function(node, offset) {
        this.startContainer = node;
        this.startOffset = offset;
        updateRangeProperties(this);
        fixIvalidRange(this, true);
    },

    setEnd: function(node, offset) {
        this.endContainer = node;
        this.endOffset = offset;
        updateRangeProperties(this);
        fixIvalidRange(this, false);
    },

    setStartBefore: function(node) {
        this.setStart(node.parentNode, findNodeIndex(node));
    },

    setStartAfter: function(node) {
        this.setStart(node.parentNode, findNodeIndex(node) + 1);
    },

    setEndBefore: function(node) {
        this.setEnd(node.parentNode, findNodeIndex(node));
    },

    setEndAfter: function(node) {
        this.setEnd(node.parentNode, findNodeIndex(node) + 1);
    },

    selectNode: function(node) {
        this.setStartBefore(node);
        this.setEndAfter(node);
    },

    selectNodeContents: function(node) {
        this.setStart(node, 0);
        this.setEnd(node, node[node.nodeType === 1 ? 'childNodes' : 'nodeValue'].length);
    },

    collapse: function(toStart) {
        var that = this;

        if (toStart) {
            that.setEnd(that.startContainer, that.startOffset);
        } else {
            that.setStart(that.endContainer, that.endOffset);
        }
    },

    // Editing Methods

    deleteContents: function() {
        var that = this,
            range = that.cloneRange();

        if (that.startContainer != that.commonAncestorContainer) {
            that.setStartAfter(findClosestAncestor(that.commonAncestorContainer, that.startContainer));
        }

        that.collapse(true);

        (function deleteSubtree(iterator) {
            while (iterator.next()) {
                if (iterator.hasPartialSubtree()) {
                    deleteSubtree(iterator.getSubtreeIterator());
                } else {
                    iterator.remove();
                }
            }
        })(new RangeIterator(range));
    },

    cloneContents: function() {
        // clone subtree
        var document = RangeUtils.documentFromRange(this);
        return (function cloneSubtree(iterator) {
                var node, frag = document.createDocumentFragment();

                while (node = iterator.next()) {
                    node = node.cloneNode(!iterator.hasPartialSubtree());

                    if (iterator.hasPartialSubtree()) {
                        node.appendChild(cloneSubtree(iterator.getSubtreeIterator()));
                    }

                    frag.appendChild(node);
                }

                return frag;
        })(new RangeIterator(this));
    },

    extractContents: function() {
        var that = this,
            range = that.cloneRange();

        if (that.startContainer != that.commonAncestorContainer) {
            that.setStartAfter(findClosestAncestor(that.commonAncestorContainer, that.startContainer));
        }

        that.collapse(true);

        var document = RangeUtils.documentFromRange(that);

        return (function extractSubtree(iterator) {
            var node, frag = document.createDocumentFragment();

            while (node = iterator.next()) {
                if (iterator.hasPartialSubtree()) {
                    node = node.cloneNode(false);
                    node.appendChild(extractSubtree(iterator.getSubtreeIterator()));
                } else {
                    iterator.remove(that.originalRange);
                }

                frag.appendChild(node);
            }

            return frag;
        })(new RangeIterator(range));
    },

    insertNode: function(node) {
        var that = this;

        if (isDataNode(that.startContainer)) {
            if (that.startOffset != that.startContainer.nodeValue.length) {
                dom.splitDataNode(that.startContainer, that.startOffset);
            }

            dom.insertAfter(node, that.startContainer);
        } else {
            dom.insertAt(that.startContainer, node, that.startOffset);
        }

        that.setStart(that.startContainer, that.startOffset);
    },

    cloneRange: function() {
        // fast copy
        return $.extend(new W3CRange(this.ownerDocument), {
            startContainer: this.startContainer,
            endContainer: this.endContainer,
            commonAncestorContainer: this.commonAncestorContainer,
            startOffset: this.startOffset,
            endOffset: this.endOffset,
            collapsed: this.collapsed,

            originalRange: this /* not part of the spec; used to update the original range when calling extractContents() on clones */
        });
    },

    // used for debug purposes
    toString: function() {
        var startNodeName = this.startContainer.nodeName,
            endNodeName = this.endContainer.nodeName;

        return [startNodeName == "#text" ? this.startContainer.nodeValue : startNodeName, '(', this.startOffset, ') : ',
                endNodeName == "#text" ? this.endContainer.nodeValue : endNodeName, '(', this.endOffset, ')'].join('');
    }
});

W3CRange.fromNode = function(node) {
    return new W3CRange(node.ownerDocument);
};

/* can be used in Range.compareBoundaryPoints if we need it one day */
function compareBoundaries(start, end, startOffset, endOffset) {
    if (start == end) {
        return endOffset - startOffset;
    }

    // end is child of start
    var container = end;
    while (container && container.parentNode != start) {
        container = container.parentNode;
    }

    if (container) {
        return findNodeIndex(container) - startOffset;
    }

    // start is child of end
    container = start;
    while (container && container.parentNode != end) {
        container = container.parentNode;
    }

    if (container) {
        return endOffset - findNodeIndex(container) - 1;
    }

    // deep traversal
    var root = dom.commonAncestor(start, end);
    var startAncestor = start;

    while (startAncestor && startAncestor.parentNode != root) {
        startAncestor = startAncestor.parentNode;
    }

    if (!startAncestor) {
        startAncestor = root;
    }

    var endAncestor = end;
    while (endAncestor && endAncestor.parentNode != root) {
        endAncestor = endAncestor.parentNode;
    }

    if (!endAncestor) {
        endAncestor = root;
    }

    if (startAncestor == endAncestor) {
        return 0;
    }

    return findNodeIndex(endAncestor) - findNodeIndex(startAncestor);
}

function fixIvalidRange(range, toStart) {
    function isInvalidRange(range) {
        try {
            return compareBoundaries(range.startContainer, range.endContainer, range.startOffset, range.endOffset) < 0;
        } catch (ex) {
            // range was initially invalid (e.g. when cloned from invalid range) - it must be fixed
            return true;
        }
    }

    if (isInvalidRange(range)) {
        if (toStart) {
            range.commonAncestorContainer = range.endContainer = range.startContainer;
            range.endOffset = range.startOffset;
        } else {
            range.commonAncestorContainer = range.startContainer = range.endContainer;
            range.startOffset = range.endOffset;
        }

        range.collapsed = true;
    }
}

function updateRangeProperties(range) {
    range.collapsed = range.startContainer == range.endContainer && range.startOffset == range.endOffset;

    var node = range.startContainer;
    while (node && node != range.endContainer && !dom.isAncestorOf(node, range.endContainer)) {
        node = node.parentNode;
    }

    range.commonAncestorContainer = node;
}

var RangeIterator = Class.extend({
    init: function(range) {
        $.extend(this, {
            range: range,
            _current: null,
            _next: null,
            _end: null
        });

        if (range.collapsed) {
            return;
        }

        var root = range.commonAncestorContainer;

        this._next = range.startContainer == root && !isDataNode(range.startContainer) ?
        range.startContainer.childNodes[range.startOffset] :
        findClosestAncestor(root, range.startContainer);

        this._end = range.endContainer == root && !isDataNode(range.endContainer) ?
        range.endContainer.childNodes[range.endOffset] :
        findClosestAncestor(root, range.endContainer).nextSibling;
    },

    hasNext: function() {
        return !!this._next;
    },

    next: function() {
        var that = this,
            current = that._current = that._next;
        that._next = that._current && that._current.nextSibling != that._end ?
        that._current.nextSibling : null;

        if (isDataNode(that._current)) {
            if (that.range.endContainer == that._current) {
                current = current.cloneNode(true);
                current.deleteData(that.range.endOffset, current.length - that.range.endOffset);
            }

            if (that.range.startContainer == that._current) {
                current = current.cloneNode(true);
                current.deleteData(0, that.range.startOffset);
            }
        }

        return current;
    },

    traverse: function(callback) {
        var that = this,
            current;

        function next() {
            that._current = that._next;
            that._next = that._current && that._current.nextSibling != that._end ? that._current.nextSibling : null;
            return that._current;
        }

        while (current = next()) {
            if (that.hasPartialSubtree()) {
                that.getSubtreeIterator().traverse(callback);
            } else {
                callback(current);
            }
        }

        return current;
    },

    remove: function(originalRange) {
        var that = this,
            inStartContainer = that.range.startContainer == that._current,
            inEndContainer = that.range.endContainer == that._current,
            start, end, delta;

        if (isDataNode(that._current) && (inStartContainer || inEndContainer)) {
            start = inStartContainer ? that.range.startOffset : 0;
            end = inEndContainer ? that.range.endOffset : that._current.length;
            delta = end - start;

            if (originalRange && (inStartContainer || inEndContainer)) {
                if (that._current == originalRange.startContainer && start <= originalRange.startOffset) {
                    originalRange.startOffset -= delta;
                }

                if (that._current == originalRange.endContainer && end <= originalRange.endOffset) {
                    originalRange.endOffset -= delta;
                }
            }

            that._current.deleteData(start, delta);
        } else {
            var parent = that._current.parentNode;

            if (originalRange && (that.range.startContainer == parent || that.range.endContainer == parent)) {
                var nodeIndex = findNodeIndex(that._current);

                if (parent == originalRange.startContainer && nodeIndex <= originalRange.startOffset) {
                    originalRange.startOffset -= 1;
                }

                if (parent == originalRange.endContainer && nodeIndex < originalRange.endOffset) {
                    originalRange.endOffset -= 1;
                }
            }

            dom.remove(that._current);
        }
    },

    hasPartialSubtree: function() {
        return !isDataNode(this._current) &&
        (dom.isAncestorOrSelf(this._current, this.range.startContainer) ||
            dom.isAncestorOrSelf(this._current, this.range.endContainer));
    },

    getSubtreeIterator: function() {
        return new RangeIterator(this.getSubRange());
    },

    getSubRange: function() {
        var that = this,
            subRange = that.range.cloneRange();
        subRange.selectNodeContents(that._current);
        if (dom.isAncestorOrSelf(that._current, that.range.startContainer)) {
            subRange.setStart(that.range.startContainer, that.range.startOffset);
        }
        if (dom.isAncestorOrSelf(that._current, that.range.endContainer)) {
            subRange.setEnd(that.range.endContainer, that.range.endOffset);
        }

        return subRange;
    }
});

var W3CSelection = Class.extend({
    init: function(doc) {
        this.ownerDocument = doc;
        this.rangeCount = 1;
    },

    addRange: function(range) {
        var textRange = this.ownerDocument.body.createTextRange();

        // end container should be adopted first in order to prevent selection with negative length
        adoptContainer(textRange, range, false);
        adoptContainer(textRange, range, true);

        textRange.select();
    },

    removeAllRanges: function() {
        var selection = this.ownerDocument.selection;

        if (selection.type != "None") {
            selection.empty();
        }
    },

    getRangeAt: function() {
        var textRange,
            range = new W3CRange(this.ownerDocument),
            selection = this.ownerDocument.selection,
            element, commonAncestor;

        try {
            textRange = selection.createRange();
            element = textRange.item ? textRange.item(0) : textRange.parentElement();
            if (element.ownerDocument != this.ownerDocument) {
                return range;
            }
        } catch (ex) {
            return range;
        }

        if (selection.type == "Control") {
            range.selectNode(textRange.item(0));
        } else {
            commonAncestor = textRangeContainer(textRange);
            adoptEndPoint(textRange, range, commonAncestor, true);
            adoptEndPoint(textRange, range, commonAncestor, false);

            if (range.startContainer.nodeType == 9) {
                range.setStart(range.endContainer, range.startOffset);
            }

            if (range.endContainer.nodeType == 9) {
                range.setEnd(range.startContainer, range.endOffset);
            }

            if (textRange.compareEndPoints("StartToEnd", textRange) === 0) {
                range.collapse(false);
            }

            var startContainer = range.startContainer,
                endContainer = range.endContainer,
                body = this.ownerDocument.body;

            if (!range.collapsed && range.startOffset === 0 && range.endOffset == getNodeLength(range.endContainer) && // check for full body selection
                !(startContainer == endContainer && isDataNode(startContainer) && startContainer.parentNode == body)) { // but not when single textnode is selected
                var movedStart = false,
                    movedEnd = false;

                while (findNodeIndex(startContainer) === 0 && startContainer == startContainer.parentNode.firstChild && startContainer != body) {
                    startContainer = startContainer.parentNode;
                    movedStart = true;
                }

                while (findNodeIndex(endContainer) == getNodeLength(endContainer.parentNode) - 1 && endContainer == endContainer.parentNode.lastChild && endContainer != body) {
                    endContainer = endContainer.parentNode;
                    movedEnd = true;
                }

                if (startContainer == body && endContainer == body && movedStart && movedEnd) {
                    range.setStart(startContainer, 0);
                    range.setEnd(endContainer, getNodeLength(body));
                }
            }
        }

        return range;
    }
});

function textRangeContainer(textRange) {
    var left = textRange.duplicate(),
        right = textRange.duplicate();

    left.collapse(true);
    right.collapse(false);

    return dom.commonAncestor(textRange.parentElement(), left.parentElement(), right.parentElement());
}

function adoptContainer(textRange, range, start) {
    // find anchor node and offset
    var container = range[start ? "startContainer" : "endContainer"],
        offset = range[start ? "startOffset" : "endOffset"],
        textOffset = 0,
        isData = isDataNode(container),
        anchorNode = isData ? container : container.childNodes[offset] || null,
        anchorParent = isData ? container.parentNode : container,
        doc = range.ownerDocument,
        cursor = doc.body.createTextRange(),
        cursorNode;

    // visible data nodes need a text offset
    if (container.nodeType == 3 || container.nodeType == 4) {
        textOffset = offset;
    }

    if (!anchorParent) {
        anchorParent = doc.body;
    }

    if (anchorParent.nodeName.toLowerCase() == "img") {
        cursor.moveToElementText(anchorParent);
        cursor.collapse(false);
        textRange.setEndPoint(start ? "StartToStart" : "EndToStart", cursor);
    } else {
        // create a cursor element node to position range (since we can't select text nodes)
        cursorNode = anchorParent.insertBefore(dom.create(doc, "a"), anchorNode);

        cursor.moveToElementText(cursorNode);
        dom.remove(cursorNode);
        cursor[start ? "moveStart" : "moveEnd"]("character", textOffset);
        cursor.collapse(false);
        textRange.setEndPoint(start ? "StartToStart" : "EndToStart", cursor);
    }
}

function adoptEndPoint(textRange, range, commonAncestor, start) {
    var cursorNode = dom.create(range.ownerDocument, "a"),
        cursor = textRange.duplicate(),
        comparison = start ? "StartToStart" : "StartToEnd",
        result, parent, target,
        previous, next,
        args, index,
        appended = false;

    cursorNode.innerHTML = "\ufeff";
    cursor.collapse(start);

    parent = cursor.parentElement();

    if (!dom.isAncestorOrSelf(commonAncestor, parent)) {
        parent = commonAncestor;
    }

    // detect range end points
    // insert cursorNode within the textRange parent and move the cursor until it gets outside of the textRange
    do {
        if (appended) {
            parent.insertBefore(cursorNode, cursorNode.previousSibling);
        } else {
            parent.appendChild(cursorNode);
            appended = true;
        }
        cursor.moveToElementText(cursorNode);
    } while ((result = cursor.compareEndPoints(comparison, textRange)) > 0 && cursorNode.previousSibling);

    target = cursorNode.nextSibling;

    if (result == -1 && isDataNode(target)) {
        cursor.setEndPoint(start ? "EndToStart" : "EndToEnd", textRange);

        dom.remove(cursorNode);

        args = [target, cursor.text.length];
    } else {
        previous = !start && cursorNode.previousSibling;
        next = start && cursorNode.nextSibling;

        if (isDataNode(next)) {
            args = [next, 0];
        } else if (isDataNode(previous)) {
            args = [previous, previous.length];
        } else {
            index = findNodeIndex(cursorNode);

            if (parent.nextSibling && index == parent.childNodes.length - 1) {
                args = [parent.nextSibling, 0];
            } else {
                args = [parent, index];
            }
        }

        dom.remove(cursorNode);
    }

    range[start ? "setStart" : "setEnd"].apply(range, args);
}

var RangeEnumerator = Class.extend({
    init: function(range) {
        this.enumerate = function() {
            var nodes = [];

            function visit(node) {
                if (dom.is(node, "img") || (node.nodeType == 3 && (!dom.isEmptyspace(node) || node.nodeValue == "\ufeff"))) {
                    nodes.push(node);
                } else {
                    node = node.firstChild;
                    while (node) {
                        visit(node);
                        node = node.nextSibling;
                    }
                }
            }

            new RangeIterator(range).traverse(visit);

            return nodes;
        };
    }
});

var ImmutablesRangeIterator = RangeIterator.extend({
    hasPartialSubtree: function() {
        var immutable = Editor.Immutables && Editor.Immutables.immutable;
        return immutable && !immutable(this._current) && RangeIterator.fn.hasPartialSubtree.call(this);
    },

    getSubtreeIterator: function() {
        return new ImmutablesRangeIterator(this.getSubRange());
    }
});

var ImmutablesRangeEnumerator = Class.extend({
    init: function(range) {
        this.enumerate = function() {
            var nodes = [];
            var immutable = Editor.Immutables && Editor.Immutables.immutable;
            function visit(node) {
                if (immutable && !immutable(node)) {
                    if (dom.is(node, "img") || (node.nodeType == 3 && (!dom.isEmptyspace(node) || node.nodeValue == "\ufeff"))) {
                        nodes.push(node);
                    } else {
                        node = node.firstChild;
                        while (node) {
                            visit(node);
                            node = node.nextSibling;
                        }
                    }
                }
            }

            new ImmutablesRangeIterator(range).traverse(visit);

            return nodes;
        };
    }
});

var RestorePoint = Class.extend({
    init: function(range, body, options) {
        var that = this;
        that.range = range;
        that.rootNode = RangeUtils.documentFromRange(range);
        that.body = body || that.getEditable(range);
        if (dom.name(that.body) != "body") {
            that.rootNode = that.body;
        }

        that.startContainer = that.nodeToPath(range.startContainer);
        that.endContainer = that.nodeToPath(range.endContainer);
        that.startOffset = that.offset(range.startContainer, range.startOffset);
        that.endOffset = that.offset(range.endContainer, range.endOffset);

        that.immutables = options && options.immutables;

        if (that.immutables) {
            that.serializedImmutables = Editor.Immutables.removeImmutables(that.body);
        }

        that.html = that.body.innerHTML;

        if (that.immutables && !that.serializedImmutables.empty) {
            Editor.Immutables.restoreImmutables(that.body, that.serializedImmutables);
        }
    },

    index: function(node) {
        var result = 0,
            lastType = node.nodeType;

        while (node = node.previousSibling) {
            var nodeType = node.nodeType;

            if (nodeType != 3 || lastType != nodeType) {
                result ++;
            }

            lastType = nodeType;
        }

        return result;
    },

    getEditable: function(range) {
        var root = range.commonAncestorContainer;

        while (root && (root.nodeType == 3 || root.attributes && (!root.attributes.contentEditable || root.attributes.contentEditable.nodeValue.toLowerCase() == "false"))) {
            root = root.parentNode;
        }

        return root;
    },

    restoreHtml: function() {
        var that = this;

        dom.removeChildren(that.body);
        that.body.innerHTML = that.html;
        if (that.immutables && !that.serializedImmutables.empty) {
            Editor.Immutables.restoreImmutables(that.body, that.serializedImmutables);
        }
    },

    offset: function(node, value) {
        if (node.nodeType == 3) {
            while ((node = node.previousSibling) && node.nodeType == 3) {
                value += node.nodeValue.length;
            }
        }

        return value;
    },

    nodeToPath: function(node) {
        var path = [];

        while (node != this.rootNode) {
            path.push(this.index(node));
            node = node.parentNode;
        }

        return path;
    },

    toRangePoint: function(range, start, path, denormalizedOffset) {
        var node = this.rootNode,
            length = path.length,
            offset = denormalizedOffset;

        while (length-- && node) {
            node = node.childNodes[path[length]];
        }

        while (node && node.nodeType == 3 && node.nodeValue.length < offset) {
            offset -= node.nodeValue.length;
            node = node.nextSibling;
        }

        if (node && offset >= 0) {
            range[start ? 'setStart' : 'setEnd'](node, offset);
        }
    },

    toRange: function() {
        var that = this,
            result = that.range.cloneRange();

        that.toRangePoint(result, true, that.startContainer, that.startOffset);
        that.toRangePoint(result, false, that.endContainer, that.endOffset);

        return result;
    }

});

var Marker = Class.extend({
    init: function() {
        this.caret = null;
    },

    addCaret: function(range) {
        var that = this;
        var caret = that.caret = dom.create(RangeUtils.documentFromRange(range), 'span', { className: 'k-marker' });
        range.insertNode(caret);

        dom.stripBomNode(caret.previousSibling);
        dom.stripBomNode(caret.nextSibling);

        range.selectNode(caret);
        return caret;
    },

    removeCaret: function(range) {
        var that = this,
            previous = that.caret.previousSibling,
            startOffset = 0;

        if (previous) {
            startOffset = isDataNode(previous) ? previous.nodeValue.length : findNodeIndex(previous);
        }

        var container = that.caret.parentNode;
        var containerIndex = previous ? findNodeIndex(previous) : 0;

        dom.remove(that.caret);
        normalize(container);

        var node = container.childNodes[containerIndex];

        if (isDataNode(node)) {
            range.setStart(node, startOffset);
        } else if (node) {
            var textNode = dom.lastTextNode(node);
            if (textNode) {
                range.setStart(textNode, textNode.nodeValue.length);
            } else {
                range[previous ? 'setStartAfter' : 'setStartBefore'](node);
            }
        } else {
            if (!browser.msie && !container.innerHTML) {
                container.innerHTML = '<br _moz_dirty="" />';
            }

            range.selectNodeContents(container);
        }
        range.collapse(true);
    },

    add: function(range, expand) {
        var that = this;

        var collapsed = range.collapsed && !RangeUtils.isExpandable(range);
        var doc = RangeUtils.documentFromRange(range);

        if (expand && range.collapsed) {
            that.addCaret(range);
            range = RangeUtils.expand(range);
        }

        var rangeBoundary = range.cloneRange();

        rangeBoundary.collapse(false);
        that.end = dom.create(doc, 'span', { className: 'k-marker' });
        rangeBoundary.insertNode(that.end);

        rangeBoundary = range.cloneRange();
        rangeBoundary.collapse(true);
        that.start = that.end.cloneNode(true);
        rangeBoundary.insertNode(that.start);

        that._removeDeadMarkers(that.start, that.end);

        if (collapsed) {
            var bom = doc.createTextNode("\ufeff");
            dom.insertAfter(bom.cloneNode(), that.start);
            dom.insertBefore(bom, that.end);
        }

        normalize(range.commonAncestorContainer);

        range.setStartBefore(that.start);
        range.setEndAfter(that.end);

        return range;
    },

    _removeDeadMarkers: function(start, end) {
        if (start.previousSibling && start.previousSibling.nodeValue == "\ufeff") {
            dom.remove(start.previousSibling);
        }

        if (end.nextSibling && end.nextSibling.nodeValue == "\ufeff") {
            dom.remove(end.nextSibling);
        }
    },

    _normalizedIndex: function(node) {
        var index = findNodeIndex(node);
        var pointer = node;

        while (pointer.previousSibling) {
            if (pointer.nodeType == 3 && pointer.previousSibling.nodeType == 3) {
                index--;
            }

            pointer = pointer.previousSibling;
        }

        return index;
    },

    remove: function(range) {
        var that = this,
            start = that.start,
            end = that.end,
            shouldNormalizeStart,
            shouldNormalizeEnd,
            shouldNormalize;

        normalize(range.commonAncestorContainer);

        while (!start.nextSibling && start.parentNode) {
            start = start.parentNode;
        }

        while (!end.previousSibling && end.parentNode) {
            end = end.parentNode;
        }

        // merely accessing the siblings will solve range issues in IE
        shouldNormalizeStart = (start.previousSibling && start.previousSibling.nodeType == 3) &&
                               (start.nextSibling && start.nextSibling.nodeType == 3);

        shouldNormalizeEnd = (end.previousSibling && end.previousSibling.nodeType == 3) &&
                             (end.nextSibling && end.nextSibling.nodeType == 3);

        shouldNormalize = shouldNormalizeStart && shouldNormalizeEnd;

        start = start.nextSibling;
        end = end.previousSibling;

        var isBomSelected = start === end && dom.isBom(start);
        if (isBomSelected && start.length > 1) {
            start.nodeValue = start.nodeValue.charAt(0);
        }

        var collapsed = isBomSelected;
        var collapsedToStart = false;
        // collapsed range
        if (start == that.end) {
            collapsedToStart = !!that.start.previousSibling;
            start = end = that.start.previousSibling || that.end.nextSibling;
            collapsed = true;
        }

        dom.remove(that.start);
        dom.remove(that.end);

        if (!start || !end) {
            range.selectNodeContents(range.commonAncestorContainer);
            range.collapse(true);
            return;
        }

        var startOffset = collapsed ? isDataNode(start) ? start.nodeValue.length : start.childNodes.length : 0;
        var endOffset = isDataNode(end) ? end.nodeValue.length : end.childNodes.length;

        if (start.nodeType == 3) {
            while (start.previousSibling && start.previousSibling.nodeType == 3) {
                start = start.previousSibling;
                startOffset += start.nodeValue.length;
            }
        }

        if (end.nodeType == 3) {
            while (end.previousSibling && end.previousSibling.nodeType == 3) {
                end = end.previousSibling;
                endOffset += end.nodeValue.length;
            }
        }

        var startParent = start.parentNode;
        var endParent = end.parentNode;
        var startIndex = this._normalizedIndex(start);
        var endIndex = this._normalizedIndex(end);

        normalize(startParent);
        if (start.nodeType == 3) {
            start = startParent.childNodes[startIndex];
        }

        normalize(endParent);
        if (end.nodeType == 3) {
            end = endParent.childNodes[endIndex];
        }

        if (collapsed) {
            if (start.nodeType == 3) {
                range.setStart(start, startOffset);
            } else {
                range[collapsedToStart ? 'setStartAfter' : 'setStartBefore'](start);
            }

            range.collapse(true);

        } else {
            if (start.nodeType == 3) {
                range.setStart(start, startOffset);
            } else {
                range.setStartBefore(start);
            }

            if (end.nodeType == 3) {
                range.setEnd(end, endOffset);
            } else {
                range.setEndAfter(end);
            }
        }

        if (that.caret) {
            that.removeCaret(range);
        }
    }
});

var boundary = /[\u0009-\u000d]|\u0020|\u00a0|\ufeff|\.|,|;|:|!|\(|\)|\?/;

var RangeUtils = {
    nodes: function(range) {
        var nodes = RangeUtils.textNodes(range);
        if (!nodes.length) {
            range.selectNodeContents(range.commonAncestorContainer);
            nodes = RangeUtils.textNodes(range);
            if (!nodes.length) {
                nodes = dom.significantChildNodes(range.commonAncestorContainer);
            }
        }
        return nodes;
    },

    textNodes: function(range) {
        var allNodes = new RangeEnumerator(range).enumerate(),
            result = allNodes.filter(function(node) {
                return dom.allowsTextContent(node.parentElement);
            });

        return result;
    },

    editableTextNodes: function(range) {
        var nodes = [],
            immutableParent = Editor.Immutables && Editor.Immutables.immutableParent,
            result = [];

        if (immutableParent && !immutableParent(range.commonAncestorContainer)) {
            nodes = new ImmutablesRangeEnumerator(range).enumerate();
            result = nodes.filter(function(node) {
                return dom.allowsTextContent(node.parentElement);
            });
        }

        return result;
    },

    documentFromRange: function(range) {
        var startContainer = range.startContainer;
        return startContainer.nodeType == 9 ? startContainer : startContainer.ownerDocument;
    },

    createRange: function(document) {
        return document.createRange();
    },

    selectRange: function(range) {
        var image = RangeUtils.image(range);
        if (image) {
            range.setStartAfter(image);
            range.setEndAfter(image);
        }
        var selection = SelectionUtils.selectionFromRange(range);
        selection.removeAllRanges();
        selection.addRange(range);
    },

    stringify: function(range) {
        return kendo.format(
            "{0}:{1} - {2}:{3}",
            dom.name(range.startContainer), range.startOffset,
            dom.name(range.endContainer), range.endOffset
        );
    },

    split: function(range, node, trim) {
        function partition(start) {
            var partitionRange = range.cloneRange();
            partitionRange.collapse(start);
            partitionRange[start ? 'setStartBefore' : 'setEndAfter'](node);
            var contents = partitionRange.extractContents();
            if (trim) {
                contents = dom.trim(contents);
            }
            dom[start ? 'insertBefore' : 'insertAfter'](contents, node);
        }
        partition(true);
        partition(false);
    },

    mapAll: function(range, map) {
        var nodes = [];

        new RangeIterator(range).traverse(function(node) {
            var mapped = map(node);

            if (mapped && $.inArray(mapped, nodes) < 0) {
                nodes.push(mapped);
            }
        });

        return nodes;
    },

    getAll: function(range, predicate) {
        var selector = predicate;

        if (typeof predicate == "string") {
            predicate = function(node) {
                return dom.is(node, selector);
            };
        }

        return RangeUtils.mapAll(range, function(node) {
            if (predicate(node)) {
                return node;
            }
        });
    },

    getMarkers: function(range) {
        return RangeUtils.getAll(range, function(node) {
            return node.className == 'k-marker';
        });
    },

    image: function(range) {
        var nodes = RangeUtils.getAll(range, "img");

        if (nodes.length == 1) {
            return nodes[0];
        }
    },

    isStartOf: function(originalRange, node) {
        if (originalRange.startOffset !== 0) {
            return false;
        }

        var range = originalRange.cloneRange();

        while (range.startOffset === 0 && range.startContainer != node) {
            var index = dom.findNodeIndex(range.startContainer);
            var parent = range.startContainer.parentNode;

            while (index > 0 && parent[index - 1] && dom.insignificant(parent[index - 1])) {
                index--;
            }

            range.setStart(parent, index);
        }

        return range.startOffset === 0 && range.startContainer == node;
    },

    isEndOf: function(originalRange, node) {
        var range = originalRange.cloneRange();

        range.collapse(false);

        var start = range.startContainer;

        if (dom.isDataNode(start) && range.startOffset == dom.getNodeLength(start)) {
            range.setStart(start.parentNode, dom.findNodeIndex(start) + 1);
            range.collapse(true);
        }

        range.setEnd(node, dom.getNodeLength(node));

        var nodes = [];

        function visit(node) {
            if (!dom.insignificant(node) && !(dom.isDataNode(node) && /^[\ufeff]*$/.test(node.nodeValue))) {
                nodes.push(node);
            }
        }

        new RangeIterator(range).traverse(visit);

        return !nodes.length;
    },

    wrapSelectedElements: function(range) {
        var startEditable = dom.editableParent(range.startContainer);
        var endEditable = dom.editableParent(range.endContainer);

        while (range.startOffset === 0 && range.startContainer != startEditable) {
            range.setStart(range.startContainer.parentNode, dom.findNodeIndex(range.startContainer));
        }

        function isEnd(offset, container) {
            var length = dom.getNodeLength(container);

            if (offset == length) {
                return true;
            }

            for (var i = offset; i < length; i++) {
                if (!dom.insignificant(container.childNodes[i])) {
                    return false;
                }
            }

            return true;
        }

        while (isEnd(range.endOffset, range.endContainer) && range.endContainer != endEditable) {
            range.setEnd(range.endContainer.parentNode, dom.findNodeIndex(range.endContainer) + 1);
        }

        return range;
    },

    expand: function(range) {
        var result = range.cloneRange();

        var startContainer = result.startContainer.childNodes[result.startOffset === 0 ? 0 : result.startOffset - 1];
        var endContainer = result.endContainer.childNodes[result.endOffset];

        if (!isDataNode(startContainer) || !isDataNode(endContainer)) {
            return result;
        }

        var beforeCaret = startContainer.nodeValue;
        var afterCaret = endContainer.nodeValue;

        if (!beforeCaret || !afterCaret) {
            return result;
        }

        var startOffset = beforeCaret.split('').reverse().join('').search(boundary);
        var endOffset = afterCaret.search(boundary);

        if (!startOffset || !endOffset) {
            return result;
        }

        endOffset = endOffset == -1 ? afterCaret.length : endOffset;
        startOffset = startOffset == -1 ? 0 : beforeCaret.length - startOffset;

        result.setStart(startContainer, startOffset);
        result.setEnd(endContainer, endOffset);

        return result;
    },

    isExpandable: function(range) {
        var node = range.startContainer;
        var rangeDocument = RangeUtils.documentFromRange(range);

        if (node == rangeDocument || node == rangeDocument.body) {
            return false;
        }

        var result = range.cloneRange();

        var value = node.nodeValue;
        if (!value) {
            return false;
        }

        var beforeCaret = value.substring(0, result.startOffset);
        var afterCaret = value.substring(result.startOffset);

        var startOffset = 0, endOffset = 0;

        if (beforeCaret) {
            startOffset = beforeCaret.split('').reverse().join('').search(boundary);
        }

        if (afterCaret) {
            endOffset = afterCaret.search(boundary);
        }

        return startOffset && endOffset;
    }
};

extend(Editor, {
    SelectionUtils: SelectionUtils,
    W3CRange: W3CRange,
    RangeIterator: RangeIterator,
    W3CSelection: W3CSelection,
    RangeEnumerator: RangeEnumerator,
    RestorePoint: RestorePoint,
    Marker: Marker,
    RangeUtils: RangeUtils
});

})(window.kendo.jQuery);
